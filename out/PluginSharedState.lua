-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:48 PM Pacific Daylight Time

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
