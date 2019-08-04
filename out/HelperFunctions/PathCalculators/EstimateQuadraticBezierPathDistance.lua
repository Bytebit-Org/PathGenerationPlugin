-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:48 PM Pacific Daylight Time

local TS = require(script.Parent.Parent.Parent.include.RuntimeLib);
local exports;
local ComputeQuadraticBezierPoint = TS.import(TS.getModule("PathGenUtils").out.PathGenUtils).ComputeQuadraticBezierPoint;
local _STEP_SIZE = 0.0001;
exports = function(startPosition, curveHandlePosition, endPosition)
	local bezierPoints = { startPosition, curveHandlePosition, endPosition };
	local previousPosition = startPosition;
	local totalDistance = 0;
	local currentStep = 0;
	while currentStep <= 1 do
		currentStep = currentStep + (_STEP_SIZE);
		local currentPosition = ComputeQuadraticBezierPoint(bezierPoints, currentStep);
		local stepDisplacement = (currentPosition - (previousPosition));
		totalDistance = totalDistance + (stepDisplacement.Magnitude);
	end;
	return totalDistance;
end;
return exports;
