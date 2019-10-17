import PluginSharedState = require("PluginSharedState");
import { Selection } from "@rbxts/services";
import EstimateCubicBezierPathDistance = require("./PathCalculators/EstimateCubicBezierPathDistance");
import CalculateLinearPathDistance = require("./PathCalculators/CalculateLinearPathDistance");
import EstimateQuadraticBezierPathDistance = require("./PathCalculators/EstimateQuadraticBezierPathDistance");
import { ComputeCubicBezierPoint, ComputeQuadraticBezierPoint } from "@rbxts/roblox-BezierFunctions";
import EditablePathGenWaypoint = require("PathGen/EditablePathGenWaypoint");
import StringBuilder = require("Implementation/StringBuilder");
import IStringBuilder = require("Interfaces/IStringBuilder");

interface IBakeOptions {
	BezierApproximation: {
		IsEnabled: boolean;
		MinDistanceBetweenCurvePoints: number;
	};
};

interface IArcPoint {
	ArcLength: number;
	Point: Vector3;
}

function _getArcPoints(startRelativePosition: Vector3, pointsCount: number, timestampToPointGetter: (t: number) => Vector3) : Array<IArcPoint> {
	const arcPoints = new Array<IArcPoint>();

	let previousPoint = startRelativePosition;
	let totalArcLength = 0;
	for (let i = 0; i < pointsCount; i++) {
		const point = timestampToPointGetter(i / (pointsCount));
		const cumulativeArcLength = totalArcLength + point.sub(previousPoint).Magnitude;

		arcPoints.push({
			ArcLength: cumulativeArcLength,
			Point: point
		});
		
		previousPoint = point;
		totalArcLength = cumulativeArcLength;
	}

	return arcPoints
}

function _getApproximateCurveWaypointPositionFromDistanceAndArcPoints(distanceAlongSegment: number, arcPoints: Array<IArcPoint>) : Vector3 {
	let low = 0
	let high = arcPoints.size();
	let currentIndex = 0;

	while (low < high) {
		currentIndex = low + math.floor((high - low) / 2);
		if (arcPoints[currentIndex].ArcLength < distanceAlongSegment) {
			low = currentIndex + 1;
		}
		else {
			high = currentIndex;
		}
	}
	if (arcPoints[currentIndex].ArcLength > distanceAlongSegment) {
		currentIndex--;
	}

	if (arcPoints[currentIndex].ArcLength === distanceAlongSegment || currentIndex + 1 >= arcPoints.size()) {
		return arcPoints[currentIndex].Point;
	}
	else {
		const distanceFromTargetForPointA = distanceAlongSegment - arcPoints[currentIndex].ArcLength;
		const pointA = arcPoints[currentIndex].Point;
		
		const distanceFromTargetForPointB = arcPoints[currentIndex + 1].ArcLength - distanceAlongSegment;
		const pointB = arcPoints[currentIndex + 1].Point;

		const weightForPointA = distanceFromTargetForPointA / (distanceFromTargetForPointA + distanceFromTargetForPointB);

		return pointA.mul(weightForPointA).add(pointB.mul(1 - weightForPointA));
	}
}

function _renderBezierLinearApproximationRelativePointStrings(
	startWaypoint: EditablePathGenWaypoint,
	endWaypoint: EditablePathGenWaypoint,
	initialDistanceProgress: number,
	finalDistanceProgress: number,
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

	if (!isStartWaypointLinear && !isEndWaypointLinear) {
		const points = [
			startRelativePosition,
			startWaypoint.ExitingHandleVisualizationPart.Position.sub(relativeOrigin),
			endWaypoint.EnteringHandleVisualizationPart.Position.sub(relativeOrigin),
			endRelativePosition
		];

		timestampToPointGetter = (t: number) =>  ComputeCubicBezierPoint(points, t);
	}
	else if (isStartWaypointLinear) {
		const points = [
			startRelativePosition,
			endWaypoint.EnteringHandleVisualizationPart.Position.sub(relativeOrigin),
			endRelativePosition
		];

		timestampToPointGetter = (t: number) =>  ComputeQuadraticBezierPoint(points, t);
	}
	else {
		const points = [
			startRelativePosition,
			startWaypoint.ExitingHandleVisualizationPart.Position.sub(relativeOrigin),
			endRelativePosition
		];

		timestampToPointGetter = (t: number) =>  ComputeQuadraticBezierPoint(points, t);
	}

	const arcPoints = _getArcPoints(startRelativePosition, segmentCount * 2, timestampToPointGetter);
	const distanceProgressDelta = finalDistanceProgress - initialDistanceProgress;
	for (let i = 1; i <= segmentCount; i++) {
		const segmentProgress = i / (segmentCount + 1);
		const distanceProgress = initialDistanceProgress + (distanceProgressDelta * segmentProgress);
		const point = _getApproximateCurveWaypointPositionFromDistanceAndArcPoints(segmentProgress * approximateCurveLength, arcPoints);

        stringBuilder.Add(`${linePrefix}{\n`);
        stringBuilder.Add(`${linePrefix}\tDistanceProgress = ${distanceProgress},\n`);
		stringBuilder.Add(`${linePrefix}\tRelativePosition = Vector3.new(${point.X}, ${point.Y}, ${point.Z}),\n`);
		stringBuilder.Add(`${linePrefix}},\n`);
	}
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
		const distanceProgress = traveledDistance / totalPathLength;

        stringBuilder.Add(`\t\t{\n`);
        stringBuilder.Add(`\t\t\tDistanceProgress = ${distanceProgress},\n`);
		stringBuilder.Add(`\t\t\tRelativePosition = Vector3.new(${waypointRelativePosition.X}, ${waypointRelativePosition.Y}, ${waypointRelativePosition.Z}),\n`);

		const isWaypointLinear = waypoint.ExitingHandleVisualizationPart === undefined && waypoint.EnteringHandleVisualizationPart === undefined;
		if (isWaypointLinear) {
			stringBuilder.Add(`\t\t},\n`);
		}
		else if (options.BezierApproximation.IsEnabled) {
			stringBuilder.Add(`\t\t},\n`);
			
			_renderBezierLinearApproximationRelativePointStrings(
				waypoint,
				PluginSharedState.PathInfo.Waypoints[i + 1],
				distanceProgress,
				(traveledDistance + segmentLengths[i]) / totalPathLength,
				segmentLengths[i],
				relativeOrigin,
				stringBuilder,
				math.ceil(segmentLengths[i] / options.BezierApproximation.MinDistanceBetweenCurvePoints),
				`\t\t`
			);
		}
		else if (i < PluginSharedState.PathInfo.Waypoints.size() - 1) {
			if (waypoint.ExitingHandleVisualizationPart !== undefined) {
				const exitingHandleRelativePosition = waypoint.ExitingHandleVisualizationPart.Position.sub(relativeOrigin);
				stringBuilder.Add(`\t\t\tExitingHandleRelativePosition = Vector3.new(${exitingHandleRelativePosition.X}, ${exitingHandleRelativePosition.Y}, ${exitingHandleRelativePosition.Z}),\n`);
			}

			if (waypoint.EnteringHandleVisualizationPart !== undefined) {
				const enteringHandleRelativePosition = waypoint.EnteringHandleVisualizationPart.Position.sub(relativeOrigin);
				stringBuilder.Add(`\t\t\tEnteringHandleRelativePosition = Vector3.new(${enteringHandleRelativePosition.X}, ${enteringHandleRelativePosition.Y}, ${enteringHandleRelativePosition.Z}),\n`);
			}

			stringBuilder.Add(`\t\t},\n`);
		}

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