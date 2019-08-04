-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:48 PM Pacific Daylight Time

local TS = require(script.Parent.Parent.Parent.include.RuntimeLib);
local exports;
local ComputeCubicBezierPoint = TS.import(TS.getModule("PathGenUtils").out.PathGenUtils).ComputeCubicBezierPoint;
local _STEP_SIZE = 0.0001;
exports = function(startPosition, exitingHandlePosition, enteringHandlePosition, endPosition)
	local bezierPoints = { startPosition, exitingHandlePosition, enteringHandlePosition, endPosition };
	local previousPosition = startPosition;
	local totalDistance = 0;
	local currentStep = 0;
	while currentStep <= 1 do
		currentStep = currentStep + (_STEP_SIZE);
		local currentPosition = ComputeCubicBezierPoint(bezierPoints, currentStep);
		local stepDisplacement = (currentPosition - (previousPosition));
		totalDistance = totalDistance + (stepDisplacement.Magnitude);
	end;
	return totalDistance;
end;
return exports;
