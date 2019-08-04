export function ComputeQuadraticBezierPoint(points: Array<Vector3>, timestamp: number) : Vector3 {
    if (points.size() !== 3) {
        throw `Expected 3 points, got ${points.size()}`;
    }
    
    if (timestamp < 0 || timestamp > 1) {
        throw "Timestamp must be in the range [0, 1]"
    }

    const firstTerm = points[0].mul((1 - timestamp)**2);
    const secondTerm = points[1].mul(2 * (1 - timestamp) * timestamp);
    const thirdTerm = points[2].mul(timestamp**2);

    return firstTerm.add(secondTerm).add(thirdTerm);
}

export function ComputeQuadraticBezierDerivativeWithRespectToTimestamp(points: Array<Vector3>, timestamp: number) {
    if (points.size() !== 3) {
        throw `Expected 3 points, got ${points.size()}`;
    }
    
    if (timestamp < 0 || timestamp > 1) {
        throw "Timestamp must be in the range [0, 1]"
    }

    const firstTerm = points[0].mul(2).add(points[1].mul(-4)).add(points[2].mul(2)).mul(timestamp);
    const secondTerm = points[0].mul(-2).add(points[1].mul(2));

    return firstTerm.add(secondTerm);
}

export function ComputeCubicBezierPoint(points: Array<Vector3>, timestamp: number) : Vector3 {
    if (points.size() !== 4) {
        throw `Expected 4 points, got ${points.size()}`;
    }
    
    if (timestamp < 0 || timestamp > 1) {
        throw "Timestamp must be in the range [0, 1]"
    }

    const firstTerm = ComputeQuadraticBezierPoint(points.slice(0, 3), timestamp).mul(1 - timestamp);
    const secondTerm = ComputeQuadraticBezierPoint(points.slice(1, 4), timestamp).mul(timestamp);

    return firstTerm.add(secondTerm);
}

export function ComputeCubicBezierDerivativeWithRespectToTimestamp(points: Array<Vector3>, timestamp: number) {
    if (points.size() !== 4) {
        throw `Expected 4 points, got ${points.size()}`;
    }
    
    if (timestamp < 0 || timestamp > 1) {
        throw "Timestamp must be in the range [0, 1]"
    }

    const firstTerm = points[0].mul(-3).add(points[1].mul(9)).add(points[2].mul(-9)).add(points[3].mul(3)).mul(timestamp ** 2);
    const secondTerm = points[0].mul(6).add(points[1].mul(-12)).add(points[2].mul(6)).mul(timestamp);
    const thirdTerm = points[0].mul(-3).add(points[1].mul(3));

    return firstTerm.add(secondTerm).add(thirdTerm);
}