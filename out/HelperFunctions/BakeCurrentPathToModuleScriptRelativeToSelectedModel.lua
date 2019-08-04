-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:48 PM Pacific Daylight Time

local TS = require(script.Parent.Parent.include.RuntimeLib);
local exports;
local PluginSharedState = TS.import(script.Parent.Parent, "PluginSharedState");
local Selection = TS.import(TS.getModule("services")).Selection;
local EstimateCubicBezierPathDistance = TS.import(script.Parent, "PathCalculators", "EstimateCubicBezierPathDistance");
local CalculateLinearPathDistance = TS.import(script.Parent, "PathCalculators", "CalculateLinearPathDistance");
local EstimateQuadraticBezierPathDistance = TS.import(script.Parent, "PathCalculators", "EstimateQuadraticBezierPathDistance");
exports = function()
	assert(PluginSharedState.PathInfo ~= nil, "No path to bake");
	assert(#Selection:Get() > 0, "No model selected, cannot bake");
	local firstSelection = Selection:Get()[1];
	assert(firstSelection:IsA("Model"), "Model must be selected first, cannot bake");
	local model = firstSelection;
	assert(model.PrimaryPart ~= nil, "Model has no primary part, cannot bake");
	local segmentLengths = {};
	local totalPathLength = 0;
	do
		local i = 0;
		while i < #PluginSharedState.PathInfo.Waypoints - 1 do
			local startWaypoint = PluginSharedState.PathInfo.Waypoints[i + 1];
			local startPosition = startWaypoint.VisualizationPart.Position;
			local isStartWaypointLinear = startWaypoint.ExitingHandleVisualizationPart == nil;
			local endWaypoint = PluginSharedState.PathInfo.Waypoints[i + 1 + 1];
			local endPosition = endWaypoint.VisualizationPart.Position;
			local isEndWaypointLinear = endWaypoint.EnteringHandleVisualizationPart == nil;
			local segmentLength;
			if isStartWaypointLinear and isEndWaypointLinear then
				segmentLength = CalculateLinearPathDistance(startPosition, endPosition);
			elseif not isStartWaypointLinear and not isEndWaypointLinear then
				local exitingHandlePosition = startWaypoint.ExitingHandleVisualizationPart.Position;
				local enteringHandlePosition = endWaypoint.EnteringHandleVisualizationPart.Position;
				segmentLength = EstimateCubicBezierPathDistance(startPosition, exitingHandlePosition, enteringHandlePosition, endPosition);
			else
				local curveHandlePosition;
				if not isStartWaypointLinear then
					curveHandlePosition = startWaypoint.ExitingHandleVisualizationPart.Position;
				else
					curveHandlePosition = endWaypoint.EnteringHandleVisualizationPart.Position;
				end;
				segmentLength = EstimateQuadraticBezierPathDistance(startPosition, curveHandlePosition, endPosition);
			end;
			segmentLengths[#segmentLengths + 1] = segmentLength;
			totalPathLength = totalPathLength + (segmentLength);
			i = i + 1;
		end;
	end;
	segmentLengths[#segmentLengths + 1] = 0;
	local relativeOrigin = model.PrimaryPart.Position;
	local bakedStrings = {};
	bakedStrings[#bakedStrings + 1] = "return {\n";
	local traveledDistance = 0;
	do
		local i = 0;
		while i < #PluginSharedState.PathInfo.Waypoints do
			local waypoint = PluginSharedState.PathInfo.Waypoints[i + 1];
			local waypointRelativePosition = (waypoint.VisualizationPart.Position - (relativeOrigin));
			bakedStrings[#bakedStrings + 1] = "\t{\n";
			bakedStrings[#bakedStrings + 1] = "\t\tDistanceProgress = " .. tostring(traveledDistance / totalPathLength) .. ",\n";
			bakedStrings[#bakedStrings + 1] = "\t\tRelativePosition = Vector3.new(" .. tostring(waypointRelativePosition.X) .. ", " .. tostring(waypointRelativePosition.Y) .. ", " .. tostring(waypointRelativePosition.Z) .. "),\n";
			bakedStrings[#bakedStrings + 1] = "\t},\n";
			traveledDistance = traveledDistance + (segmentLengths[i + 1]);
			i = i + 1;
		end;
	end;
	bakedStrings[#bakedStrings + 1] = "}";
	local serializedPathData = table.concat(bakedStrings, "");
	local moduleScript = Instance.new("ModuleScript");
	if PluginSharedState.PathInfo.Name ~= nil and PluginSharedState.PathInfo.Name ~= "" then
		moduleScript.Name = PluginSharedState.PathInfo.Name;
	else
		moduleScript.Name = "PathGenBake";
	end;
	moduleScript.Source = serializedPathData;
	moduleScript.Parent = model;
end;
return exports;
