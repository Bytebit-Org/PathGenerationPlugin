-- Compiled with https://roblox-ts.github.io v0.1.16
-- July 10, 2019, 9:26 PM GMT-08:00

local _exports;
local _0;
do
	local SavedPathGenWaypoint = {};
	SavedPathGenWaypoint.__index = SavedPathGenWaypoint;
	function SavedPathGenWaypoint.new(...)
		local self = setmetatable({}, SavedPathGenWaypoint);
		self:constructor(...);
		return self;
	end;
	function SavedPathGenWaypoint:constructor(...)
		self.ExitingHandleWorldPosition = nil;
		self.EnteringHandleWorldPosition = nil;
		self.Name = "";
		self.WorldPosition = nil;
	end;
	_0 = SavedPathGenWaypoint;
end;
_exports = _0;
return _exports;
