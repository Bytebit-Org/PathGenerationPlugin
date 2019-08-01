-- Compiled with https://roblox-ts.github.io v0.1.16
-- July 10, 2019, 9:37 PM GMT-08:00

local TS = require(script.Parent.Parent.include.RuntimeLib);
local _exports;
local SavedPathGenWaypoint = TS.import(script.Parent.Parent, "PathGen", "SavedPathGenWaypoint");
local PluginSharedState = TS.import(script.Parent.Parent, "PluginSharedState");
local _0 = TS.import(TS.getModule("services"));
local HttpService, Selection, ServerStorage = _0.HttpService, _0.Selection, _0.ServerStorage;
_exports = function()
	assert(PluginSharedState.PathInfo ~= nil, "No path to save");
	local saveablePath = {
		Name = PluginSharedState.PathInfo.Name;
		Waypoints = {};
	};
	do
		local i = 0;
		while i < #PluginSharedState.PathInfo.Waypoints do
			local waypoint = PluginSharedState.PathInfo.Waypoints[i + 1];
			local saveableWaypoint = SavedPathGenWaypoint.new();
			if waypoint.ExitingHandleVisualizationPart ~= nil then
				saveableWaypoint.ExitingHandleWorldPosition = { waypoint.ExitingHandleVisualizationPart.Position.X, waypoint.ExitingHandleVisualizationPart.Position.Y, waypoint.ExitingHandleVisualizationPart.Position.Z };
			end;
			if waypoint.EnteringHandleVisualizationPart ~= nil then
				saveableWaypoint.EnteringHandleWorldPosition = { waypoint.EnteringHandleVisualizationPart.Position.X, waypoint.EnteringHandleVisualizationPart.Position.Y, waypoint.EnteringHandleVisualizationPart.Position.Z };
			end;
			saveableWaypoint.Name = waypoint.Name;
			saveableWaypoint.WorldPosition = { waypoint.VisualizationPart.Position.X, waypoint.VisualizationPart.Position.Y, waypoint.VisualizationPart.Position.Z };
			local _1 = saveablePath.Waypoints;
			_1[#_1 + 1] = saveableWaypoint;
			i = i + 1;
		end;
	end;
	local serializedPathData = HttpService:JSONEncode(saveablePath);
	local moduleScript = Instance.new("ModuleScript");
	if saveablePath.Name ~= nil and saveablePath.Name ~= "" then
		moduleScript.Name = saveablePath.Name;
	else
		moduleScript.Name = "PathGenSave";
	end;
	moduleScript.Source = serializedPathData;
	if #Selection:Get() > 0 then
		moduleScript.Parent = Selection:Get()[1];
	else
		moduleScript.Parent = ServerStorage;
	end;
end;
return _exports;
