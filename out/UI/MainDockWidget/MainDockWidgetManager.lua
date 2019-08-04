-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:48 PM Pacific Daylight Time

local TS = require(script.Parent.Parent.Parent.include.RuntimeLib);
local exports;
local Roact = TS.import(TS.getModule("roact").roact.src);
local DockWidgetMasterFrame = TS.import(script.Parent, "DockWidgetMasterFrame");
local _0;
do
	local MainDockWidgetManager = setmetatable({}, {
		__tostring = function() return "MainDockWidgetManager" end;
	});
	MainDockWidgetManager.__index = MainDockWidgetManager;
	function MainDockWidgetManager.new(...)
		local self = setmetatable({}, MainDockWidgetManager);
		self:constructor(...);
		return self;
	end;
	function MainDockWidgetManager:constructor(plugin, dockWidgetGui)
		self._Plugin = plugin;
		self._DockWidgetGui = dockWidgetGui;
		self._DockWidgetGui.Name = "PathGenDockGui";
		self._DockWidgetGui.Title = "Path Generator";
		self._Handle = Roact.mount(Roact.createElement(DockWidgetMasterFrame, {}), self._DockWidgetGui);
		settings().Studio.ThemeChanged:Connect(function()
			self._Handle = Roact.update(self._Handle, Roact.createElement(DockWidgetMasterFrame, {}));
		end);
	end;
	_0 = MainDockWidgetManager;
end;
exports = _0;
return exports;
