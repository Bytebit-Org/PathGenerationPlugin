-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:47 PM Pacific Daylight Time

local TS = _G[script];
local exports = {};
local _0 = TS.import(script.Parent, "BezierCurves");
local ComputeCubicBezierPoint, ComputeQuadraticBezierPoint, ComputeCubicBezierDerivativeWithRespectToTimestamp, ComputeQuadraticBezierDerivativeWithRespectToTimestamp = _0.ComputeCubicBezierPoint, _0.ComputeQuadraticBezierPoint, _0.ComputeCubicBezierDerivativeWithRespectToTimestamp, _0.ComputeQuadraticBezierDerivativeWithRespectToTimestamp;
local IPathData = TS.import(script.Parent, "Interfaces", "IPathData");
local t = TS.import(TS.getModule("t").lib.ts);
local ICalculateOptions = TS.import(script.Parent, "Interfaces", "ICalculateOptions");
local function FindStartAndEndWaypoints(pathData, distanceProgress)
	assert(IPathData(pathData));
	assert(t.numberConstrained(0, 1)(distanceProgress));
	local minIndex = 1;
	local maxIndex = #pathData.Waypoints;
	while minIndex <= maxIndex do
		local currentIndex = minIndex + math.floor((maxIndex - minIndex) / 2);
		local currentStartWaypoint = pathData.Waypoints[currentIndex - 1 + 1];
		local currentEndWaypoint;
		if #pathData.Waypoints > currentIndex then
			currentEndWaypoint = pathData.Waypoints[currentIndex + 1];
		else
			currentEndWaypoint = nil;
		end;
		if distanceProgress < currentStartWaypoint.DistanceProgress then
			maxIndex = currentIndex - 1;
		elseif currentEndWaypoint ~= nil and distanceProgress >= currentEndWaypoint.DistanceProgress then
			minIndex = currentIndex + 1;
		else
			return currentStartWaypoint, currentEndWaypoint;
		end;
	end;
	return nil, nil;
end;
local function CalculatePositionByDistanceProgress(pathData, distanceProgress, options)
	assert(IPathData(pathData));
	assert(t.numberConstrained(0, 1)(distanceProgress));
	assert(t.optional(ICalculateOptions)(options));
	local startWaypoint, endWaypoint = FindStartAndEndWaypoints(pathData, distanceProgress);
	if startWaypoint == nil then
		error("Cannot find waypoints");
	end;
	if endWaypoint == nil then
		assert(distanceProgress == 1, "Could not find end waypoint, was not at the end of path");
		return startWaypoint.RelativePosition;
	end;
	local segmentProgress = (distanceProgress - startWaypoint.DistanceProgress) / (endWaypoint.DistanceProgress - startWaypoint.DistanceProgress);
	local isStartWaypointLinear = startWaypoint.ExitingHandleRelativePosition == nil;
	local isEndWaypointLinear = endWaypoint.EnteringHandleRelativePosition == nil;
	if isStartWaypointLinear and isEndWaypointLinear then
		return (startWaypoint.RelativePosition + (((endWaypoint.RelativePosition - (startWaypoint.RelativePosition)) * (segmentProgress))));
	elseif not isStartWaypointLinear and not isEndWaypointLinear then
		local points = { startWaypoint.RelativePosition, startWaypoint.ExitingHandleRelativePosition, endWaypoint.EnteringHandleRelativePosition, endWaypoint.RelativePosition };
		if options ~= nil and options.BezierTravelSpeedUniformityApproximationLength ~= nil then
			local derivative = ComputeCubicBezierDerivativeWithRespectToTimestamp(points, segmentProgress);
			segmentProgress = segmentProgress + (options.BezierTravelSpeedUniformityApproximationLength / derivative.Magnitude);
		end;
		return ComputeCubicBezierPoint(points, segmentProgress);
	else
		local curveHandleRelativePosition;
		if isStartWaypointLinear then
			curveHandleRelativePosition = startWaypoint.ExitingHandleRelativePosition;
		else
			curveHandleRelativePosition = endWaypoint.EnteringHandleRelativePosition;
		end;
		local points = { startWaypoint.RelativePosition, curveHandleRelativePosition, endWaypoint.RelativePosition };
		if options ~= nil and options.BezierTravelSpeedUniformityApproximationLength ~= nil then
			local derivative = ComputeQuadraticBezierDerivativeWithRespectToTimestamp(points, segmentProgress);
			segmentProgress = segmentProgress + (options.BezierTravelSpeedUniformityApproximationLength / derivative.Magnitude);
		end;
		return ComputeQuadraticBezierPoint(points, segmentProgress);
	end;
end;
local function CalculatePositionByDistance(pathData, distance, options)
	assert(IPathData(pathData));
	assert(t.numberMin(0)(distance));
	assert(t.optional(ICalculateOptions)(options));
	return CalculatePositionByDistanceProgress(pathData, distance / pathData.TotalDistance);
end;
exports.FindStartAndEndWaypoints = FindStartAndEndWaypoints;
exports.CalculatePositionByDistanceProgress = CalculatePositionByDistanceProgress;
exports.CalculatePositionByDistance = CalculatePositionByDistance;
return exports;
