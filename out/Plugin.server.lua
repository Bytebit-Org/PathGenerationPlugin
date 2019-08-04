-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:48 PM Pacific Daylight Time

local TS = require(script.Parent.include.RuntimeLib);
local MainDockWidgetManager = TS.import(script.Parent, "UI", "MainDockWidget", "MainDockWidgetManager");
local PluginSharedState = TS.import(script.Parent, "PluginSharedState");
local PluginActions = TS.import(script.Parent, "PluginActions");
local PreviewManager = TS.import(script.Parent, "UI", "PreviewManager");
PluginSharedState.Plugin = plugin;
local toolbar = plugin:CreateToolbar("Path Generator");
local openButton = toolbar:CreateButton("Toggle_Main", "Open/close path generator", "", "Open/close path generator");
PluginActions.Initialize();
local mainDockWidgetGuiInfo = DockWidgetPluginGuiInfo.new(Enum.InitialDockState.Bottom, true, true, 600, 150, 150, 150);
local mainDockWidgetGuiId = "DockWidget_Main";
local mainDockWidgetGui = plugin:CreateDockWidgetPluginGui(mainDockWidgetGuiId, mainDockWidgetGuiInfo);
local mainDockWidgetManager = MainDockWidgetManager.new(plugin, mainDockWidgetGui);
local previewManager = PreviewManager.new();
openButton.Click:Connect(function()
	mainDockWidgetGui.Enabled = not mainDockWidgetGui.Enabled;
end);
