-- Compiled with https://roblox-ts.github.io v0.2.14
-- July 31, 2019, 10:14 PM GMT-08:00

local TS = require(script.Parent.include.RuntimeLib);
local exports = {};
local AddWaypointAction = TS.import(script, "AddWaypointAction");
local function Initialize()
	AddWaypointAction.RegisterActions();
	AddWaypointAction.RegisterMenus();
end;
exports.Initialize = Initialize;
return exports;
