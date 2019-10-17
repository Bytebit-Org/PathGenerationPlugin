import { ComputeQuadraticBezierPoint } from "@rbxts/roblox-BezierFunctions";

const _STEP_SIZE = 0.0001;

/**
 * Estimates the distance along a quadratic bezier path
 * @param startPosition The position to start at
 * @param curveHandlePosition The position of the curve handle
 * @param endPosition The position to end at
 * @returns The estimated distance along this path
 */
export = function (startPosition: Vector3, curveHandlePosition: Vector3, endPosition: Vector3): number {
    const bezierPoints = [
        startPosition,
        curveHandlePosition,
        endPosition
    ];

    let previousPosition = startPosition;
    let totalDistance = 0;
    let currentStep = 0;
    while (currentStep <= 1 - _STEP_SIZE) {
        currentStep += _STEP_SIZE;

        const currentPosition = ComputeQuadraticBezierPoint(bezierPoints, currentStep);
        const stepDisplacement = currentPosition.sub(previousPosition);
		totalDistance += stepDisplacement.Magnitude;
		
		previousPosition = currentPosition;
    }

    return totalDistance;
}