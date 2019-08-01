-- Compiled with https://roblox-ts.github.io v0.2.14
-- July 31, 2019, 10:14 PM GMT-08:00

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
