-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:47 PM Pacific Daylight Time

local TS = _G[script];
local exports = {};
local function ComputeQuadraticBezierPoint(points, timestamp)
	if #points ~= 3 then
		error("Expected 3 points, got " .. tostring(#points));
	end;
	if timestamp < 0 or timestamp > 1 then
		error("Timestamp must be in the range [0, 1]");
	end;
	local firstTerm = (points[1] * ((1 - timestamp) ^ 2));
	local secondTerm = (points[2] * (2 * (1 - timestamp) * timestamp));
	local thirdTerm = (points[3] * (timestamp ^ 2));
	return ((firstTerm + (secondTerm)) + (thirdTerm));
end;
local function ComputeQuadraticBezierDerivativeWithRespectToTimestamp(points, timestamp)
	if #points ~= 3 then
		error("Expected 3 points, got " .. tostring(#points));
	end;
	if timestamp < 0 or timestamp > 1 then
		error("Timestamp must be in the range [0, 1]");
	end;
	local firstTerm = ((((points[1] * (2)) + ((points[2] * (-4)))) + ((points[3] * (2)))) * (timestamp));
	local secondTerm = ((points[1] * (-2)) + ((points[2] * (2))));
	return (firstTerm + (secondTerm));
end;
local function ComputeCubicBezierPoint(points, timestamp)
	if #points ~= 4 then
		error("Expected 4 points, got " .. tostring(#points));
	end;
	if timestamp < 0 or timestamp > 1 then
		error("Timestamp must be in the range [0, 1]");
	end;
	local firstTerm = (ComputeQuadraticBezierPoint(TS.array_slice(points, 0, 3), timestamp) * (1 - timestamp));
	local secondTerm = (ComputeQuadraticBezierPoint(TS.array_slice(points, 1, 4), timestamp) * (timestamp));
	return (firstTerm + (secondTerm));
end;
local function ComputeCubicBezierDerivativeWithRespectToTimestamp(points, timestamp)
	if #points ~= 4 then
		error("Expected 4 points, got " .. tostring(#points));
	end;
	if timestamp < 0 or timestamp > 1 then
		error("Timestamp must be in the range [0, 1]");
	end;
	local firstTerm = (((((points[1] * (-3)) + ((points[2] * (9)))) + ((points[3] * (-9)))) + ((points[4] * (3)))) * (timestamp ^ 2));
	local secondTerm = ((((points[1] * (6)) + ((points[2] * (-12)))) + ((points[3] * (6)))) * (timestamp));
	local thirdTerm = ((points[1] * (-3)) + ((points[2] * (3))));
	return ((firstTerm + (secondTerm)) + (thirdTerm));
end;
exports.ComputeQuadraticBezierPoint = ComputeQuadraticBezierPoint;
exports.ComputeQuadraticBezierDerivativeWithRespectToTimestamp = ComputeQuadraticBezierDerivativeWithRespectToTimestamp;
exports.ComputeCubicBezierPoint = ComputeCubicBezierPoint;
exports.ComputeCubicBezierDerivativeWithRespectToTimestamp = ComputeCubicBezierDerivativeWithRespectToTimestamp;
return exports;
