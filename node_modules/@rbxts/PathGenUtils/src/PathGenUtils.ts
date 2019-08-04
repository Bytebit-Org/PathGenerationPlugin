import { ComputeCubicBezierPoint, ComputeQuadraticBezierPoint, ComputeCubicBezierDerivativeWithRespectToTimestamp, ComputeQuadraticBezierDerivativeWithRespectToTimestamp } from "BezierCurves";
import IPathData from "Interfaces/IPathData";
import IWaypoint = require("Interfaces/IWaypoint");
import t = require("@rbxts/t");
import ICalculateOptions = require("Interfaces/ICalculateOptions");

/**
 * Finds the start and end waypoints for a given progress value
 * Implemented using a modified binary search, resulting in a runtime complexity of O(log(n))
 * @param pathData The pathData to search through
 * @param distanceProgress The distance progress value, a number in the range [0, 1]
 * @returns A tuple of the start and end waypoints or nil
 */
export function FindStartAndEndWaypoints(pathData: IPathData, distanceProgress: number) : LuaTuple<[undefined, undefined] | [IWaypoint, IWaypoint?]> {
    assert(IPathData(pathData));
    assert(t.numberConstrained(0, 1)(distanceProgress));

    let minIndex = 1;
    let maxIndex = pathData.Waypoints.size();

    while (minIndex <= maxIndex) {
        const currentIndex = minIndex + math.floor((maxIndex - minIndex) / 2);
        const currentStartWaypoint = pathData.Waypoints[currentIndex - 1];
        const currentEndWaypoint = pathData.Waypoints.size() > currentIndex ? pathData.Waypoints[currentIndex] : undefined;

        if (distanceProgress < currentStartWaypoint.DistanceProgress) {
            maxIndex = currentIndex - 1;
        }
        else if (currentEndWaypoint !== undefined && distanceProgress >= currentEndWaypoint.DistanceProgress) {
            minIndex = currentIndex + 1;
        }
        else {
            return [currentStartWaypoint, currentEndWaypoint];
        }
    }

    return [ undefined, undefined ];
}

/**
 * Maps distance progress to position
 * @param pathData The pathData to search through
 * @param distanceProgress The distance progress value, a number in the range [0, 1]
 * @param options An optional set of flags and settings to use in the calculation
 * @returns The resulting position
 */
export function CalculatePositionByDistanceProgress(pathData: IPathData, distanceProgress: number, options?: ICalculateOptions) : Vector3 {
    assert(IPathData(pathData));
    assert(t.numberConstrained(0, 1)(distanceProgress));
    assert(t.optional(ICalculateOptions)(options));

    const [ startWaypoint, endWaypoint ] = FindStartAndEndWaypoints(pathData, distanceProgress);
    
    if (startWaypoint === undefined) {
        throw "Cannot find waypoints";
    }

    if (endWaypoint === undefined) {
        assert(distanceProgress === 1, "Could not find end waypoint, was not at the end of path");
        return startWaypoint!.RelativePosition;
    }

    let segmentProgress = (distanceProgress - startWaypoint.DistanceProgress) / (endWaypoint.DistanceProgress - startWaypoint.DistanceProgress);
    const isStartWaypointLinear = startWaypoint.ExitingHandleRelativePosition === undefined;
    const isEndWaypointLinear = endWaypoint.EnteringHandleRelativePosition === undefined;

    if (isStartWaypointLinear && isEndWaypointLinear) {
        return startWaypoint.RelativePosition.add(endWaypoint.RelativePosition.sub(startWaypoint.RelativePosition).mul(segmentProgress));
    }
    else if (!isStartWaypointLinear && !isEndWaypointLinear) {
        const points = [
            startWaypoint.RelativePosition,
            startWaypoint.ExitingHandleRelativePosition!,
            endWaypoint.EnteringHandleRelativePosition!,
            endWaypoint.RelativePosition
        ];

        if (options !== undefined && options.BezierTravelSpeedUniformityApproximationLength !== undefined) {
            const derivative = ComputeCubicBezierDerivativeWithRespectToTimestamp(points, segmentProgress);
            segmentProgress = segmentProgress + (options.BezierTravelSpeedUniformityApproximationLength / derivative.Magnitude);
        }

        return ComputeCubicBezierPoint(points, segmentProgress);
    }
    else {
        let curveHandleRelativePosition = isStartWaypointLinear ? startWaypoint.ExitingHandleRelativePosition! : endWaypoint.EnteringHandleRelativePosition!;
        const points = [
            startWaypoint.RelativePosition,
            curveHandleRelativePosition,
            endWaypoint.RelativePosition
        ];

        if (options !== undefined && options.BezierTravelSpeedUniformityApproximationLength !== undefined) {
            const derivative = ComputeQuadraticBezierDerivativeWithRespectToTimestamp(points, segmentProgress);
            segmentProgress = segmentProgress + (options.BezierTravelSpeedUniformityApproximationLength / derivative.Magnitude);
        }

        return ComputeQuadraticBezierPoint(points, segmentProgress);
    }
}

/**
 * Maps distance along path to position
 * @param pathData The pathData to search through
 * @param distance The distance along the path, a number >= 0
 * @param options An optional set of flags and settings to use in the calculation
 * @returns The resulting position
 */
export function CalculatePositionByDistance(pathData: IPathData, distance: number, options?: ICalculateOptions) : Vector3 {
    assert(IPathData(pathData));
    assert(t.numberMin(0)(distance));
    assert(t.optional(ICalculateOptions)(options));

    return CalculatePositionByDistanceProgress(pathData, distance / pathData.TotalDistance);
}