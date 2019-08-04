-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:48 PM Pacific Daylight Time

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
