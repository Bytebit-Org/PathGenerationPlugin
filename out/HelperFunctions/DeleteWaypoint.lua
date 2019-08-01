-- Compiled with https://roblox-ts.github.io v0.1.16
-- July 10, 2019, 9:26 PM GMT-08:00

local TS = require(script.Parent.Parent.include.RuntimeLib);
local _exports;
local PluginSharedState = TS.import(script.Parent.Parent, "PluginSharedState");
_exports = function(waypoint)
	assert(PluginSharedState.PathInfo ~= nil, "No path info to delete waypoint from");
	do
		local i = 0;
		while i < #PluginSharedState.PathInfo.Waypoints do
			if waypoint == PluginSharedState.PathInfo.Waypoints[i + 1] then
				table.remove(PluginSharedState.PathInfo.Waypoints, i + 1);
				if waypoint.VisualizationPart and waypoint.VisualizationPart.Parent then
					waypoint.VisualizationPart:Destroy();
					waypoint.VisualizationPart = nil;
				end;
				if waypoint.ExitingHandleVisualizationPart and waypoint.ExitingHandleVisualizationPart.Parent then
					waypoint.ExitingHandleVisualizationPart:Destroy();
					waypoint.ExitingHandleVisualizationPart = nil;
				end;
				if waypoint.EnteringHandleVisualizationPart and waypoint.EnteringHandleVisualizationPart.Parent then
					waypoint.EnteringHandleVisualizationPart:Destroy();
					waypoint.EnteringHandleVisualizationPart = nil;
				end;
				PluginSharedState.Updated:go();
				break;
			end;
			i = i + 1;
		end;
	end;
end;
return _exports;
