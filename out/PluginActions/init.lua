-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:48 PM Pacific Daylight Time

local TS = require(script.Parent.include.RuntimeLib);
local exports = {};
local AddWaypointAction = TS.import(script, "AddWaypointAction");
local function Initialize()
	AddWaypointAction.RegisterActions();
	AddWaypointAction.RegisterMenus();
end;
exports.Initialize = Initialize;
return exports;
