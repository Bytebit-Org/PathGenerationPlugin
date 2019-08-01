import PluginSharedState = require("PluginSharedState");
import { Selection } from "@rbxts/services";
import EstimateCubicBezierPathDistance = require("./PathCalculators/EstimateCubicBezierPathDistance");
import CalculateLinearPathDistance = require("./PathCalculators/CalculateLinearPathDistance");
import EstimateQuadraticBezierPathDistance = require("./PathCalculators/EstimateQuadraticBezierPathDistance");

export = function () {
    assert(PluginSharedState.PathInfo !== undefined, "No path to bake");
    assert(Selection.Get().size() > 0, "No model selected, cannot bake");

    const firstSelection = Selection.Get()[0];
    assert(firstSelection.IsA("Model"), "Model must be selected first, cannot bake");

    const model = firstSelection as Model;
    assert(model.PrimaryPart !== undefined, "Model has no primary part, cannot bake");

    const segmentLengths = new Array<number>();
    let totalPathLength = 0;
    for (let i = 0; i < PluginSharedState.PathInfo.Waypoints.size() - 1; i++) {
        const startWaypoint = PluginSharedState.PathInfo.Waypoints[i];
        const startPosition = startWaypoint.VisualizationPart.Position;
        const isStartWaypointLinear = startWaypoint.ExitingHandleVisualizationPart === undefined;

        const endWaypoint = PluginSharedState.PathInfo.Waypoints[i + 1];
        const endPosition = endWaypoint.VisualizationPart.Position;
        const isEndWaypointLinear = endWaypoint.EnteringHandleVisualizationPart === undefined;

        let segmentLength: number;
        if (isStartWaypointLinear && isEndWaypointLinear) {
            segmentLength = CalculateLinearPathDistance(startPosition, endPosition);
        }
        else if (!isStartWaypointLinear && !isEndWaypointLinear) {
            const exitingHandlePosition = startWaypoint.ExitingHandleVisualizationPart.Position;
            const enteringHandlePosition = endWaypoint.EnteringHandleVisualizationPart.Position;
            segmentLength = EstimateCubicBezierPathDistance(startPosition, exitingHandlePosition, enteringHandlePosition, endPosition);
        }
        else {
            const curveHandlePosition = !isStartWaypointLinear ? startWaypoint.ExitingHandleVisualizationPart.Position : endWaypoint.EnteringHandleVisualizationPart.Position;
            segmentLength = EstimateQuadraticBezierPathDistance(startPosition, curveHandlePosition, endPosition);
        }

        segmentLengths.push(segmentLength);
        totalPathLength += segmentLength;
    }
    segmentLengths.push(0);

    const relativeOrigin = model.PrimaryPart.Position;

    const bakedStrings = new Array<string>();
    bakedStrings.push(`return {\n`);

    let traveledDistance = 0;
    for (let i = 0; i < PluginSharedState.PathInfo.Waypoints.size(); i++) {
        const waypoint = PluginSharedState.PathInfo.Waypoints[i];
        const waypointRelativePosition = waypoint.VisualizationPart.Position.sub(relativeOrigin);

        bakedStrings.push(`\t{\n`);
        bakedStrings.push(`\t\tDistanceProgress = ${traveledDistance / totalPathLength},\n`);
        bakedStrings.push(`\t\tRelativePosition = Vector3.new(${waypointRelativePosition.X}, ${waypointRelativePosition.Y}, ${waypointRelativePosition.Z}),\n`);
        bakedStrings.push(`\t},\n`);

        traveledDistance += segmentLengths[i];
    }

    bakedStrings.push(`}`);

    const serializedPathData = bakedStrings.join("");

    const moduleScript = new Instance("ModuleScript");
    moduleScript.Name = PluginSharedState.PathInfo.Name !== undefined && PluginSharedState.PathInfo.Name !== "" ? PluginSharedState.PathInfo.Name : "PathGenBake";
    moduleScript.Source = serializedPathData;
    moduleScript.Parent = model;
}