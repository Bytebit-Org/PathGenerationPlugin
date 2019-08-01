export function ComputeQuadraticBezierPoint(points: Array<Vector3>, timestamp: number) : Vector3 {
    if (points.size() < 3) {
        error("Cannot compute a quadratic bezier without three points");
    }

    const firstTerm = points[0].mul((1 - timestamp)**2);
    const secondTerm = points[1].mul(2 * (1 - timestamp) * timestamp);
    const thirdTerm = points[2].mul(timestamp**2);

    return firstTerm.add(secondTerm).add(thirdTerm);
}

export function ComputeCubicBezierPoint(points: Array<Vector3>, timestamp: number) : Vector3 {
    if (points.size() < 4) {
        error("Cannot compute a cubic bezier without four points");
    }

    const firstTerm = ComputeQuadraticBezierPoint(points.slice(0, 3), timestamp).mul(1 - timestamp);
    const secondTerm = ComputeQuadraticBezierPoint(points.slice(1, 4), timestamp).mul(timestamp);

    return firstTerm.add(secondTerm);
}