-- Compiled with https://roblox-ts.github.io v0.1.16
-- July 10, 2019, 9:26 PM GMT-08:00

local _exports;
local _0;
do
	local EditablePathGenWaypoint = {};
	EditablePathGenWaypoint.__index = EditablePathGenWaypoint;
	function EditablePathGenWaypoint.new(...)
		local self = setmetatable({}, EditablePathGenWaypoint);
		self:constructor(...);
		return self;
	end;
	function EditablePathGenWaypoint:constructor(...)
		self.ExitingHandleVisualizationPart = nil;
		self.EnteringHandleVisualizationPart = nil;
		self.Name = "";
		self.VisualizationPart = nil;
	end;
	_0 = EditablePathGenWaypoint;
end;
_exports = _0;
return _exports;
