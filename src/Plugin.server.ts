/// <reference types="@rbxts/types/plugin" />

import MainDockWidgetManager = require("UI/MainDockWidget/MainDockWidgetManager");
import PluginSharedState = require("PluginSharedState");
import PluginActions = require("PluginActions");
import PreviewManager = require("UI/PreviewManager");

PluginSharedState.Plugin = plugin;

const toolbar = plugin.CreateToolbar("Path Generator");

const openButton = toolbar.CreateButton("Toggle_Main", "Open/close path generator", "", "Open/close path generator");

PluginActions.Initialize();

const mainDockWidgetGuiInfo = new DockWidgetPluginGuiInfo(
    Enum.InitialDockState.Bottom,
    true,
    true,
    600,
    150,
    150,
    150
);
const mainDockWidgetGuiId = "DockWidget_Main";
const mainDockWidgetGui = plugin.CreateDockWidgetPluginGui(mainDockWidgetGuiId, mainDockWidgetGuiInfo);
const mainDockWidgetManager = new MainDockWidgetManager(plugin, mainDockWidgetGui);
const previewManager = new PreviewManager();

openButton.Click.Connect(() => {
    mainDockWidgetGui.Enabled = !mainDockWidgetGui.Enabled;
});