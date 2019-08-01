/// <reference types="@rbxts/types" />
declare const _default: {
    /**
     * Finds the start and end waypoints for a given progress value
     * Implemented using a modified binary search, resulting in a runtime complexity of O(log(n))
     * @param pathData The pathData to search through
     * @param distanceProgress The distance progress value, a number in the range [0, 1]
     * @returns A tuple of the start and end waypoints or nil
     */
    FindStartAndEndWaypoints(pathData: {
        Name: string;
        TotalDistance: number;
        Waypoints: {
            DistanceProgress: number;
            RelativePosition: Vector3;
            ExitingHandleRelativePosition: Vector3 | undefined;
            EnteringHandleRelativePosition: Vector3 | undefined;
        }[];
    }, distanceProgress: number): LuaTuple<[undefined, undefined] | [{
        DistanceProgress: number;
        RelativePosition: Vector3;
        ExitingHandleRelativePosition: Vector3 | undefined;
        EnteringHandleRelativePosition: Vector3 | undefined;
    }, ({
        DistanceProgress: number;
        RelativePosition: Vector3;
        ExitingHandleRelativePosition: Vector3 | undefined;
        EnteringHandleRelativePosition: Vector3 | undefined;
    } | undefined)?]>;
    /**
     * Maps distance progress to position
     * @param pathData The pathData to search through
     * @param distanceProgress The distance progress value, a number in the range [0, 1]
     * @returns The resulting position
     */
    CalculatePositionByDistanceProgress(pathData: {
        Name: string;
        TotalDistance: number;
        Waypoints: {
            DistanceProgress: number;
            RelativePosition: Vector3;
            ExitingHandleRelativePosition: Vector3 | undefined;
            EnteringHandleRelativePosition: Vector3 | undefined;
        }[];
    }, distanceProgress: number): Vector3;
    /**
     * Maps distance along path to position
     * @param pathData The pathData to search through
     * @param distance The distance along the path, a number >= 0
     * @returns The resulting position
     */
    CalculatePositionByDistance(pathData: {
        Name: string;
        TotalDistance: number;
        Waypoints: {
            DistanceProgress: number;
            RelativePosition: Vector3;
            ExitingHandleRelativePosition: Vector3 | undefined;
            EnteringHandleRelativePosition: Vector3 | undefined;
        }[];
    }, distance: number): Vector3;
};
export = _default;
