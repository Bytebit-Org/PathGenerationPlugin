-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:47 PM Pacific Daylight Time

local TS = _G[script];
local exports;
local t = TS.import(TS.getModule("t").lib.ts);
local ICalculateOptions = t.interface({
	BezierTravelSpeedUniformityApproximationLength = t.optional(t.numberMinExclusive(0));
});
exports = ICalculateOptions;
return exports;
