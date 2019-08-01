-- Compiled with https://roblox-ts.github.io v0.1.16
-- July 10, 2019, 9:26 PM GMT-08:00

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
