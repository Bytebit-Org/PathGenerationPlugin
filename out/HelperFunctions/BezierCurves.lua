-- Compiled with https://roblox-ts.github.io v0.1.16
-- July 10, 2019, 9:26 PM GMT-08:00

local TS = require(script.Parent.Parent.include.RuntimeLib);
local _exports = {};
local function ComputeQuadraticBezierPoint(points, timestamp)
	if #points < 3 then
		error("Cannot compute a quadratic bezier without three points");
	end;
	local firstTerm = (points[1] * (1 - timestamp) ^ 2);
	local secondTerm = (points[2] * 2 * (1 - timestamp) * timestamp);
	local thirdTerm = (points[3] * timestamp ^ 2);
	return ((firstTerm + secondTerm) + thirdTerm);
end;
local function ComputeCubicBezierPoint(points, timestamp)
	if #points < 4 then
		error("Cannot compute a cubic bezier without four points");
	end;
	local firstTerm = (ComputeQuadraticBezierPoint(TS.array_slice(points, 0, 3), timestamp) * 1 - timestamp);
	local secondTerm = (ComputeQuadraticBezierPoint(TS.array_slice(points, 1, 4), timestamp) * timestamp);
	return (firstTerm + secondTerm);
end;
_exports.ComputeQuadraticBezierPoint = ComputeQuadraticBezierPoint;
_exports.ComputeCubicBezierPoint = ComputeCubicBezierPoint;
return _exports;
