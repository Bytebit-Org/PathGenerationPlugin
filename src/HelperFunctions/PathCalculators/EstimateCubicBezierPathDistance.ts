import { ComputeCubicBezierPoint } from "@rbxts/roblox-BezierFunctions";

const _STEP_SIZE = 0.0001;

/**
 * Estimates the distance along a cubic bezier path
 * @param startPosition The position to start at
 * @param exitingHandlePosition The position of the exiting handle
 * @param enteringHandlePosition The position of the exiting handle
 * @param endPosition The position to end at
 * @returns The estimated distance along this path
 */
export = function (startPosition: Vector3, exitingHandlePosition: Vector3, enteringHandlePosition: Vector3, endPosition: Vector3): number {
    const bezierPoints = [
        startPosition,
        exitingHandlePosition,
        enteringHandlePosition,
        endPosition
    ];

    let previousPosition = startPosition;
    let totalDistance = 0;
    let currentStep = 0;
    while (currentStep <= 1 - _STEP_SIZE) {
        currentStep += _STEP_SIZE;

        const currentPosition = ComputeCubicBezierPoint(bezierPoints, currentStep);
        const stepDisplacement = currentPosition.sub(previousPosition);
		totalDistance += stepDisplacement.Magnitude;
		
		previousPosition = currentPosition;
    }

    return totalDistance;
}