-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:48 PM Pacific Daylight Time

local exports;
local _0;
do
	local EditablePathGenWaypoint = setmetatable({}, {
		__tostring = function() return "EditablePathGenWaypoint" end;
	});
	EditablePathGenWaypoint.__index = EditablePathGenWaypoint;
	function EditablePathGenWaypoint.new(...)
		local self = setmetatable({}, EditablePathGenWaypoint);
		self:constructor(...);
		return self;
	end;
	function EditablePathGenWaypoint:constructor(...)
		self.Name = "";
	end;
	_0 = EditablePathGenWaypoint;
end;
exports = _0;
return exports;
