-- Compiled with https://roblox-ts.github.io v0.2.14
-- July 31, 2019, 10:14 PM GMT-08:00

local TS = require(script.Parent.include.RuntimeLib);
local exports;
local Cue = TS.import(TS.getModule("cue"));
local sharedState = {
	IsPlacingNewWaypoint = false;
	PathInfo = nil;
	Plugin = nil;
	PluginMenus = {};
	Updated = Cue.new();
};
exports = sharedState;
return exports;
