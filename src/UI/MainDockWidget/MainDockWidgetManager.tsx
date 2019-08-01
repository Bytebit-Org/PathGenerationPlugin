import Roact from "@rbxts/roact";
import DockWidgetMasterFrame = require("./DockWidgetMasterFrame");

export = class MainDockWidgetManager {
    private readonly _Plugin: Plugin;
    private readonly _DockWidgetGui: DockWidgetPluginGui;
    private _Handle: Roact.ComponentInstanceHandle;

    constructor(plugin: Plugin, dockWidgetGui: DockWidgetPluginGui) {
        this._Plugin = plugin;
        this._DockWidgetGui = dockWidgetGui;

        this._DockWidgetGui.Name = "PathGenDockGui";
        this._DockWidgetGui.Title = "Path Generator";

        this._Handle = Roact.mount(<DockWidgetMasterFrame />, this._DockWidgetGui);
        settings().Studio.ThemeChanged.Connect(() => {
            this._Handle = Roact.update(this._Handle, <DockWidgetMasterFrame />);
        });
    }
}