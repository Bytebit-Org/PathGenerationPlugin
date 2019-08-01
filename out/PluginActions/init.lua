-- Compiled with https://roblox-ts.github.io v0.1.16
-- July 10, 2019, 9:26 PM GMT-08:00

local TS = require(script.Parent.include.RuntimeLib);
local _exports = {};
local AddWaypointAction = TS.import(script, "AddWaypointAction");
local function Initialize()
	AddWaypointAction.RegisterActions();
	AddWaypointAction.RegisterMenus();
end;
_exports.Initialize = Initialize;
return _exports;
