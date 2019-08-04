/// <reference types="@rbxts/types" />
import IPathData from "Interfaces/IPathData";
import IWaypoint = require("Interfaces/IWaypoint");
import ICalculateOptions = require("Interfaces/ICalculateOptions");
/**
 * Finds the start and end waypoints for a given progress value
 * Implemented using a modified binary search, resulting in a runtime complexity of O(log(n))
 * @param pathData The pathData to search through
 * @param distanceProgress The distance progress value, a number in the range [0, 1]
 * @returns A tuple of the start and end waypoints or nil
 */
export declare function FindStartAndEndWaypoints(pathData: IPathData, distanceProgress: number): LuaTuple<[undefined, undefined] | [IWaypoint, IWaypoint?]>;
/**
 * Maps distance progress to position
 * @param pathData The pathData to search through
 * @param distanceProgress The distance progress value, a number in the range [0, 1]
 * @param options An optional set of flags and settings to use in the calculation
 * @returns The resulting position
 */
export declare function CalculatePositionByDistanceProgress(pathData: IPathData, distanceProgress: number, options?: ICalculateOptions): Vector3;
/**
 * Maps distance along path to position
 * @param pathData The pathData to search through
 * @param distance The distance along the path, a number >= 0
 * @param options An optional set of flags and settings to use in the calculation
 * @returns The resulting position
 */
export declare function CalculatePositionByDistance(pathData: IPathData, distance: number, options?: ICalculateOptions): Vector3;
