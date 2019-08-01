-- Compiled with https://roblox-ts.github.io v0.1.16
-- July 10, 2019, 9:26 PM GMT-08:00

local TS = require(script.Parent.Parent.include.RuntimeLib);
local _exports;
local PluginSharedState = TS.import(script.Parent.Parent, "PluginSharedState");
local PlaceNewWaypointAsync = TS.import(script.Parent, "PlaceNewWaypointAsync");
_exports = function(shouldInsertBeforeCurrentWaypointIndex)
	if PluginSharedState.PathInfo == nil then
		warn("Path Generator: No path initialized yet");
		return nil;
	end;
	if PluginSharedState.PathInfo.SelectedWaypointIndex == -1 then
		warn("Path Generator: No waypoint selected");
		return nil;
	end;
	local newWaypoint = PlaceNewWaypointAsync();
	local insertIndex;
	if shouldInsertBeforeCurrentWaypointIndex then
		insertIndex = PluginSharedState.PathInfo.SelectedWaypointIndex - 1;
	else
		insertIndex = PluginSharedState.PathInfo.SelectedWaypointIndex;
	end;
	if insertIndex <= 0 then
		insertIndex = 0;
	end;
	PluginSharedState.PathInfo.SelectedWaypointIndex = -1;
	table.insert(PluginSharedState.PathInfo.Waypoints, insertIndex + 1, newWaypoint);
	PluginSharedState.Updated:go();
end;
return _exports;
