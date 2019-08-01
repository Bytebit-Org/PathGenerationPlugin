-- Compiled with https://roblox-ts.github.io v0.1.16
-- July 10, 2019, 9:26 PM GMT-08:00

local TS = require(script.Parent.Parent.Parent.include.RuntimeLib);
local _exports;
local ComputeCubicBezierPoint = TS.import(script.Parent.Parent, "BezierCurves").ComputeCubicBezierPoint;
local _STEP_SIZE = 0.0001;
_exports = function(startPosition, exitingHandlePosition, enteringHandlePosition, endPosition)
	local bezierPoints = { startPosition, exitingHandlePosition, enteringHandlePosition, endPosition };
	local previousPosition = startPosition;
	local totalDistance = 0;
	local currentStep = 0;
	while currentStep <= 1 do
		currentStep = currentStep + (_STEP_SIZE);
		local currentPosition = ComputeCubicBezierPoint(bezierPoints, currentStep);
		local stepDisplacement = (currentPosition - previousPosition);
		totalDistance = totalDistance + (stepDisplacement.Magnitude);
	end;
	return totalDistance;
end;
return _exports;
