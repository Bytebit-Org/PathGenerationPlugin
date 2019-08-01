-- Compiled with https://roblox-ts.github.io v0.1.16
-- July 10, 2019, 9:55 PM GMT-08:00

local TS = require(script.Parent.Parent.include.RuntimeLib);
local _exports;
local PluginSharedState = TS.import(script.Parent.Parent, "PluginSharedState");
local EditablePathGenWaypoint = TS.import(script.Parent.Parent, "PathGen", "EditablePathGenWaypoint");
local Workspace = TS.import(TS.getModule("services")).Workspace;
local CreateWaypointVisualizer = TS.import(script.Parent, "CreateWaypointVisualizer");
local ConnectWaypointAndVisualizer = TS.import(script.Parent, "ConnectWaypointAndVisualizer");
local PluginSharedConstants = TS.import(script.Parent.Parent, "PluginSharedConstants");
_exports = function()
	PluginSharedState.IsPlacingNewWaypoint = true;
	PluginSharedState.Updated:go();
	PluginSharedState.Plugin:Activate(true);
	local mouse = PluginSharedState.Plugin:GetMouse();
	local previousTargetFilter = mouse.TargetFilter;
	mouse.TargetFilter = Workspace:WaitForChild(PluginSharedConstants.VisualizationsFolderName);
	local visualizationPart = CreateWaypointVisualizer();
	visualizationPart.Position = mouse.Hit.Position;
	local movedConnection = mouse.Move:Connect(function()
		local hitOffset = (mouse.UnitRay.Direction * -0.5);
		visualizationPart.Position = (mouse.Hit.Position + hitOffset);
	end);
	mouse.Button1Up:Wait();
	local newWaypoint = EditablePathGenWaypoint.new();
	ConnectWaypointAndVisualizer(newWaypoint, visualizationPart);
	movedConnection:Disconnect();
	mouse.TargetFilter = previousTargetFilter;
	PluginSharedState.Plugin:Deactivate();
	PluginSharedState.IsPlacingNewWaypoint = false;
	PluginSharedState.Updated:go();
	return newWaypoint;
end;
return _exports;
