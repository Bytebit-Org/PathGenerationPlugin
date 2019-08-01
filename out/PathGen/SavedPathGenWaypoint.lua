-- Compiled with https://roblox-ts.github.io v0.2.14
-- July 31, 2019, 10:14 PM GMT-08:00

local exports;
local _0;
do
	local SavedPathGenWaypoint = setmetatable({}, {
		__tostring = function() return "SavedPathGenWaypoint" end;
	});
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
	end;
	_0 = SavedPathGenWaypoint;
end;
exports = _0;
return exports;
