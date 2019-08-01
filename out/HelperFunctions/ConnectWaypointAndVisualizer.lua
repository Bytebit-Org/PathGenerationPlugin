-- Compiled with https://roblox-ts.github.io v0.1.16
-- July 10, 2019, 9:42 PM GMT-08:00

local TS = require(script.Parent.Parent.include.RuntimeLib);
local _exports;
local PluginSharedState = TS.import(script.Parent.Parent, "PluginSharedState");
local DeleteWaypoint = TS.import(script.Parent, "DeleteWaypoint");
_exports = function(waypoint, visualizationPart)
	waypoint.VisualizationPart = visualizationPart;
	visualizationPart.AncestryChanged:Connect(function(childInstance, parentInstance)
		if parentInstance == nil then
			DeleteWaypoint(waypoint);
		end;
	end);
	visualizationPart:GetPropertyChangedSignal("Position"):Connect(function()
		PluginSharedState.Updated:go();
	end);
end;
return _exports;
