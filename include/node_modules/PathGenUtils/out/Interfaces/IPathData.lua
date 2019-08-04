-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:47 PM Pacific Daylight Time

local TS = _G[script];
local exports;
local t = TS.import(TS.getModule("t").lib.ts);
local tWaypoint = TS.import(script.Parent, "IWaypoint");
local IPathData = t.interface({
	Name = t.string;
	TotalDistance = t.numberMinExclusive(0);
	Waypoints = t.array(tWaypoint);
});
exports = IPathData;
return exports;
