-- Compiled with https://roblox-ts.github.io v0.2.14
-- July 31, 2019, 10:09 PM GMT-08:00

local TS = _G[script];
local exports;
local tPathData = TS.import(script, "Interfaces", "tPathData");
local t = TS.import(TS.getModule("t").lib.ts);
local tWaypoint = TS.import(script, "Interfaces", "tWaypoint");
local _0 = TS.import(script, "BezierCurves");
local ComputeCubicBezierPoint, ComputeQuadraticBezierPoint = _0.ComputeCubicBezierPoint, _0.ComputeQuadraticBezierPoint;
local _1 = {};
function _1:FindStartAndEndWaypoints(pathData, distanceProgress)
	assert(tPathData(pathData));
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
function _1:CalculatePositionByDistanceProgress(pathData, distanceProgress)
	assert(tPathData(pathData));
	assert(t.numberConstrained(0, 1)(distanceProgress));
	local startWaypoint, endWaypoint = self:FindStartAndEndWaypoints(pathData, distanceProgress);
	if startWaypoint == nil then
		error("Cannot find waypoints");
		return Vector3.new();
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
		return ComputeCubicBezierPoint(points, segmentProgress);
	else
		local curveHandleRelativePosition;
		if isStartWaypointLinear then
			curveHandleRelativePosition = startWaypoint.ExitingHandleRelativePosition;
		else
			curveHandleRelativePosition = endWaypoint.EnteringHandleRelativePosition;
		end;
		local points = { startWaypoint.RelativePosition, curveHandleRelativePosition, endWaypoint.RelativePosition };
		return ComputeQuadraticBezierPoint(points, segmentProgress);
	end;
end;
function _1:CalculatePositionByDistance(pathData, distance)
	assert(tPathData(pathData));
	assert(t.numberMin(0)(distance));
	return self:CalculatePositionByDistanceProgress(pathData, distance / pathData.TotalDistance);
end;
exports = _1;
return exports;
