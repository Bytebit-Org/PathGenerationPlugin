/**
 * Calculates the distance along a linear path
 * @param startPosition The position to start at
 * @param endPosition The position to end at
 * @returns The distance along this path
 */
export = function (startPosition: Vector3, endPosition: Vector3): number {
    return endPosition.sub(startPosition).Magnitude;
}