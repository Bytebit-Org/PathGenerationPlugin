-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:48 PM Pacific Daylight Time

local TS = require(script.Parent.Parent.include.RuntimeLib);
local exports = {};
local PluginSharedState = TS.import(script.Parent.Parent, "PluginSharedState");
local PluginSharedConstants = TS.import(script.Parent.Parent, "PluginSharedConstants");
local InsertWaypoint = TS.import(script.Parent.Parent, "HelperFunctions", "InsertWaypoint");
local _InsertAfterAction;
local _InsertBeforeAction;
local function RegisterActions()
	_InsertBeforeAction = PluginSharedState.Plugin:CreatePluginAction(PluginSharedConstants.ActionConfigurations.InsertWaypointBefore.ActionId, PluginSharedConstants.ActionConfigurations.InsertWaypointBefore.Text, PluginSharedConstants.ActionConfigurations.InsertWaypointBefore.StatusTip, PluginSharedConstants.AssetPaths.ActionIconAssets.InsertWaypointBefore, false);
	_InsertBeforeAction.Triggered:Connect(function()
		InsertWaypoint(true);
	end);
	_InsertAfterAction = PluginSharedState.Plugin:CreatePluginAction(PluginSharedConstants.ActionConfigurations.InsertWaypointAfter.ActionId, PluginSharedConstants.ActionConfigurations.InsertWaypointAfter.Text, PluginSharedConstants.ActionConfigurations.InsertWaypointAfter.StatusTip, PluginSharedConstants.AssetPaths.ActionIconAssets.InsertWaypointAfter, false);
	_InsertAfterAction.Triggered:Connect(function()
		InsertWaypoint(false);
	end);
end;
local function RegisterMenus()
	local pluginMenu = PluginSharedState.Plugin:CreatePluginMenu(PluginSharedConstants.MenuNames.InsertWaypointMenuName);
	pluginMenu:AddAction(_InsertBeforeAction);
	pluginMenu:AddAction(_InsertAfterAction);
	local _0 = PluginSharedState.PluginMenus;
	_0[PluginSharedConstants.MenuNames.InsertWaypointMenuName] = pluginMenu;
end;
exports.RegisterActions, exports.RegisterMenus = RegisterActions, RegisterMenus;
return exports;
