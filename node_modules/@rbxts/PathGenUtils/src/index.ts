import tPathData = require("Interfaces/tPathData");
import t = require("@rbxts/t");
import tWaypoint = require("Interfaces/tWaypoint");
import { ComputeCubicBezierPoint, ComputeQuadraticBezierPoint } from "BezierCurves";

type IWaypoint = t.static<typeof tWaypoint>;
type IPathData = t.static<typeof tPathData>;

export = {
    /**
     * Finds the start and end waypoints for a given progress value
     * Implemented using a modified binary search, resulting in a runtime complexity of O(log(n))
     * @param pathData The pathData to search through
     * @param distanceProgress The distance progress value, a number in the range [0, 1]
     * @returns A tuple of the start and end waypoints or nil
     */
    FindStartAndEndWaypoints(pathData: IPathData, distanceProgress: number) : LuaTuple<[undefined, undefined] | [IWaypoint, IWaypoint?]> {
        assert(tPathData(pathData));
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
    },

    /**
     * Maps distance progress to position
     * @param pathData The pathData to search through
     * @param distanceProgress The distance progress value, a number in the range [0, 1]
     * @returns The resulting position
     */
    CalculatePositionByDistanceProgress(pathData: IPathData, distanceProgress: number) : Vector3 {
        assert(tPathData(pathData));
        assert(t.numberConstrained(0, 1)(distanceProgress));

        const [ startWaypoint, endWaypoint ] = this.FindStartAndEndWaypoints(pathData, distanceProgress);
        
        if (startWaypoint === undefined) {
            error("Cannot find waypoints");
            return new Vector3();
        }

        if (endWaypoint === undefined) {
            assert(distanceProgress === 1, "Could not find end waypoint, was not at the end of path");
            return startWaypoint!.RelativePosition;
        }

        const segmentProgress = (distanceProgress - startWaypoint.DistanceProgress) / (endWaypoint.DistanceProgress - startWaypoint.DistanceProgress);
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
            return ComputeCubicBezierPoint(points, segmentProgress);
        }
        else {
            let curveHandleRelativePosition = isStartWaypointLinear ? startWaypoint.ExitingHandleRelativePosition! : endWaypoint.EnteringHandleRelativePosition!;
            const points = [
                startWaypoint.RelativePosition,
                curveHandleRelativePosition,
                endWaypoint.RelativePosition
            ];
            return ComputeQuadraticBezierPoint(points, segmentProgress);
        }
    },

    /**
     * Maps distance along path to position
     * @param pathData The pathData to search through
     * @param distance The distance along the path, a number >= 0
     * @returns The resulting position
     */
    CalculatePositionByDistance(pathData: IPathData, distance: number) : Vector3 {
        assert(tPathData(pathData));
        assert(t.numberMin(0)(distance));

        return this.CalculatePositionByDistanceProgress(pathData, distance / pathData.TotalDistance);
    }
};