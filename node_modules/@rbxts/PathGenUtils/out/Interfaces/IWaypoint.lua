-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:47 PM Pacific Daylight Time

local TS = _G[script];
local exports;
local t = TS.import(TS.getModule("t").lib.ts);
local IWaypoint = t.interface({
	DistanceProgress = t.numberConstrained(0, 1);
	RelativePosition = t.Vector3;
	ExitingHandleRelativePosition = t.optional(t.Vector3);
	EnteringHandleRelativePosition = t.optional(t.Vector3);
});
exports = IWaypoint;
return exports;
