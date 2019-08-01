-- Compiled with https://roblox-ts.github.io v0.1.16
-- July 10, 2019, 9:54 PM GMT-08:00

local TS = require(script.Parent.include.RuntimeLib);
local _exports;
local Cue = TS.import(TS.getModule("cue"));
local sharedState = {
	IsPlacingNewWaypoint = false;
	PathInfo = nil;
	Plugin = nil;
	PluginMenus = {};
	Updated = Cue.new();
};
_exports = sharedState;
return _exports;
