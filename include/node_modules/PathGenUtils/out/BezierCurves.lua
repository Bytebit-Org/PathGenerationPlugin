-- Compiled with https://roblox-ts.github.io v0.2.14
-- July 31, 2019, 7:51 PM GMT-08:00

local TS = _G[script];
local exports = {};
local function ComputeQuadraticBezierPoint(points, timestamp)
	if #points < 3 then
		error("Cannot compute a quadratic bezier without three points");
	end;
	local firstTerm = (points[1] * ((1 - timestamp) ^ 2));
	local secondTerm = (points[2] * (2 * (1 - timestamp) * timestamp));
	local thirdTerm = (points[3] * (timestamp ^ 2));
	return ((firstTerm + (secondTerm)) + (thirdTerm));
end;
local function ComputeCubicBezierPoint(points, timestamp)
	if #points < 4 then
		error("Cannot compute a cubic bezier without four points");
	end;
	local firstTerm = (ComputeQuadraticBezierPoint(TS.array_slice(points, 0, 3), timestamp) * (1 - timestamp));
	local secondTerm = (ComputeQuadraticBezierPoint(TS.array_slice(points, 1, 4), timestamp) * (timestamp));
	return (firstTerm + (secondTerm));
end;
exports.ComputeQuadraticBezierPoint = ComputeQuadraticBezierPoint;
exports.ComputeCubicBezierPoint = ComputeCubicBezierPoint;
return exports;
