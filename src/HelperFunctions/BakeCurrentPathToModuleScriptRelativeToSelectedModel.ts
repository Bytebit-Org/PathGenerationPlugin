import PluginSharedState = require("PluginSharedState");
import { Selection } from "@rbxts/services";
import EstimateCubicBezierPathDistance = require("./PathCalculators/EstimateCubicBezierPathDistance");
import CalculateLinearPathDistance = require("./PathCalculators/CalculateLinearPathDistance");
import EstimateQuadraticBezierPathDistance = require("./PathCalculators/EstimateQuadraticBezierPathDistance");
import { ComputeCubicBezierPoint, ComputeCubicBezierDerivativeWithRespectToTimestamp, ComputeQuadraticBezierPoint } from "@rbxts/PathGenUtils/out/BezierCurves";
import EditablePathGenWaypoint = require("PathGen/EditablePathGenWaypoint");
import StringBuilder = require("Implementation/StringBuilder");
import IStringBuilder = require("Interfaces/IStringBuilder");

interface IBakeOptions {
	BezierApproximationLinearSegmentCount: number
};

function _renderBezierLinearApproximationRelativePointStrings(
	startWaypoint: EditablePathGenWaypoint,
	endWaypoint: EditablePathGenWaypoint,
	approximateCurveLength: number,
	relativeOrigin: Vector3,
	stringBuilder: IStringBuilder,
	segmentCount: number,
	linePrefix: string) {
	const startRelativePosition = startWaypoint.VisualizationPart.Position.sub(relativeOrigin);
	const isStartWaypointLinear = startWaypoint.ExitingHandleVisualizationPart === undefined;

	const endRelativePosition = endWaypoint.VisualizationPart.Position.sub(relativeOrigin);
	const isEndWaypointLinear = endWaypoint.EnteringHandleVisualizationPart === undefined;

	if (isStartWaypointLinear && isEndWaypointLinear) {
		return;
	}

	let timestampToPointGetter: (t: number) => Vector3;
	let timestampToDerivativeGetter: (t: number) => Vector3;

	if (!isStartWaypointLinear && !isEndWaypointLinear) {
		const points = [
			startRelativePosition,
			startWaypoint.ExitingHandleVisualizationPart.Position.sub(relativeOrigin),
			endWaypoint.EnteringHandleVisualizationPart.Position.sub(relativeOrigin),
			endRelativePosition
		];

		timestampToPointGetter = (t: number) =>  ComputeCubicBezierPoint(points, t);
		timestampToDerivativeGetter = (t: number) =>  ComputeCubicBezierDerivativeWithRespectToTimestamp(points, t);
	}
	else if (isStartWaypointLinear) {
		const points = [
			startRelativePosition,
			endWaypoint.EnteringHandleVisualizationPart.Position.sub(relativeOrigin),
			endRelativePosition
		];

		timestampToPointGetter = (t: number) =>  ComputeQuadraticBezierPoint(points, t);
		timestampToDerivativeGetter = (t: number) =>  ComputeQuadraticBezierPoint(points, t);
	}
	else {
		const points = [
			startRelativePosition,
			startWaypoint.ExitingHandleVisualizationPart.Position.sub(relativeOrigin),
			endRelativePosition
		];

		timestampToPointGetter = (t: number) =>  ComputeQuadraticBezierPoint(points, t);
		timestampToDerivativeGetter = (t: number) =>  ComputeQuadraticBezierPoint(points, t);
	}

	stringBuilder.Add(`${linePrefix}LinearApproximationPoints = {\n`);

	let previousTimestampDelta = 0;
	let timestamp = 0;
	for (let i = 0; i < segmentCount; i++) {
		const point = timestampToPointGetter(timestamp);
		stringBuilder.Add(`${linePrefix}\tVector3.new(${point.X}, ${point.Y}, ${point.Z}),\n`);

		const derivative = timestampToDerivativeGetter(timestamp);
		if (derivative.Magnitude > 0) {
			const timestampDelta = derivative.Magnitude / approximateCurveLength;
			timestamp += timestampDelta;
			previousTimestampDelta = derivative.Magnitude / approximateCurveLength;
		}
		else {
			timestamp += previousTimestampDelta;
		}
	}

	stringBuilder.Add(`${linePrefix}},\n`);
}

export = function (options: IBakeOptions) {
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

    const stringBuilder = new StringBuilder();
    stringBuilder.Add(`return {\n`);
	stringBuilder.Add(`\tTotalDistance = ${totalPathLength},\n`);
	stringBuilder.Add(`\tWaypoints = {\n`);

    let traveledDistance = 0;
    for (let i = 0; i < PluginSharedState.PathInfo.Waypoints.size(); i++) {
        const waypoint = PluginSharedState.PathInfo.Waypoints[i];
        const waypointRelativePosition = waypoint.VisualizationPart.Position.sub(relativeOrigin);

        stringBuilder.Add(`\t\t{\n`);
        stringBuilder.Add(`\t\t\tDistanceProgress = ${traveledDistance / totalPathLength},\n`);
		stringBuilder.Add(`\t\t\tRelativePosition = Vector3.new(${waypointRelativePosition.X}, ${waypointRelativePosition.Y}, ${waypointRelativePosition.Z}),\n`);

		if (waypoint.ExitingHandleVisualizationPart !== undefined) {
			const exitingHandleRelativePosition = waypoint.ExitingHandleVisualizationPart.Position.sub(relativeOrigin);
			stringBuilder.Add(`\t\t\tExitingHandleRelativePosition = Vector3.new(${exitingHandleRelativePosition.X}, ${exitingHandleRelativePosition.Y}, ${exitingHandleRelativePosition.Z})),\n`);
		}

		if (waypoint.EnteringHandleVisualizationPart !== undefined) {
			const enteringHandleRelativePosition = waypoint.EnteringHandleVisualizationPart.Position.sub(relativeOrigin);
			stringBuilder.Add(`\t\t\tEnteringHandleRelativePosition = Vector3.new(${enteringHandleRelativePosition.X}, ${enteringHandleRelativePosition.Y}, ${enteringHandleRelativePosition.Z})),\n`);
		}

		if (i < PluginSharedState.PathInfo.Waypoints.size() - 1 && options.BezierApproximationLinearSegmentCount > 0) {
			_renderBezierLinearApproximationRelativePointStrings(
				waypoint,
				PluginSharedState.PathInfo.Waypoints[i + 1],
				segmentLengths[i],
				relativeOrigin,
				stringBuilder,
				options.BezierApproximationLinearSegmentCount,
				`\t\t\t`
			);
		}

        stringBuilder.Add(`\t\t},\n`);

        traveledDistance += segmentLengths[i];
    }

    stringBuilder.Add(`\t},\n`);
    stringBuilder.Add(`}`);

    const serializedPathData = stringBuilder.Render();

    const moduleScript = new Instance("ModuleScript");
    moduleScript.Name = PluginSharedState.PathInfo.Name !== undefined && PluginSharedState.PathInfo.Name !== "" ? PluginSharedState.PathInfo.Name : "PathGenBake";
    moduleScript.Source = serializedPathData;
    moduleScript.Parent = model;
}