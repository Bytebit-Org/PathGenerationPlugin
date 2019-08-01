-- Compiled with https://roblox-ts.github.io v0.2.14
-- July 31, 2019, 10:14 PM GMT-08:00

local TS = require(script.Parent.Parent.include.RuntimeLib);
local exports;
local _0 = TS.import(TS.getModule("services"));
local Selection, HttpService = _0.Selection, _0.HttpService;
local EditablePathGenWaypoint = TS.import(script.Parent.Parent, "PathGen", "EditablePathGenWaypoint");
local CreateWaypointVisualizer = TS.import(script.Parent, "CreateWaypointVisualizer");
local ConnectWaypointAndVisualizer = TS.import(script.Parent, "ConnectWaypointAndVisualizer");
local CreateBezierControls = TS.import(script.Parent, "CreateBezierControls");
local PluginSharedState = TS.import(script.Parent.Parent, "PluginSharedState");
exports = function()
	assert(#Selection:Get() > 0, "Nothing selected, cannot load");
	local firstSelection = Selection:Get()[1];
	assert(firstSelection:IsA("ModuleScript"), "ModuleScript must be selected first, cannot load");
	local _1 = pcall(function()
		local moduleScript = firstSelection;
		local serializedPathData = moduleScript.Source;
		local deserializedPathData = HttpService:JSONDecode(serializedPathData);
		local editablePathData = {
			SelectedWaypointIndex = -1;
			Name = deserializedPathData.Name;
			Waypoints = {};
		};
		do
			local i = 0;
			while i < #deserializedPathData.Waypoints do
				local deserializedWaypoint = deserializedPathData.Waypoints[i + 1];
				local editableWaypoint = EditablePathGenWaypoint.new();
				local visualizationPart = CreateWaypointVisualizer();
				visualizationPart.Position = Vector3.new(deserializedWaypoint.WorldPosition[1], deserializedWaypoint.WorldPosition[2], deserializedWaypoint.WorldPosition[3]);
				ConnectWaypointAndVisualizer(editableWaypoint, visualizationPart);
				local isWaypointLinear = deserializedWaypoint.ExitingHandleWorldPosition == nil and deserializedWaypoint.EnteringHandleWorldPosition == nil;
				if not isWaypointLinear then
					CreateBezierControls(editableWaypoint);
					if deserializedWaypoint.ExitingHandleWorldPosition ~= nil then
						editableWaypoint.ExitingHandleVisualizationPart.Position = Vector3.new(deserializedWaypoint.ExitingHandleWorldPosition[1], deserializedWaypoint.ExitingHandleWorldPosition[2], deserializedWaypoint.ExitingHandleWorldPosition[3]);
					end;
					if deserializedWaypoint.EnteringHandleWorldPosition ~= nil then
						editableWaypoint.EnteringHandleVisualizationPart.Position = Vector3.new(deserializedWaypoint.EnteringHandleWorldPosition[1], deserializedWaypoint.EnteringHandleWorldPosition[2], deserializedWaypoint.EnteringHandleWorldPosition[3]);
					end;
				end;
				local _3 = editablePathData.Waypoints;
				_3[#_3 + 1] = editableWaypoint;
				i = i + 1;
			end;
		end;
		PluginSharedState.PathInfo = editablePathData;
		PluginSharedState.Updated:go();
	end);
	if not _1 then
		error("Malformed ModuleScript, cannot load");
	end;
end;
return exports;
