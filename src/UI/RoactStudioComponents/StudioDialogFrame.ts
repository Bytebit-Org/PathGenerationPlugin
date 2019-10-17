import Roact from "@rbxts/roact";
import Signal from "Implementation/Signal";
import { HttpService } from "@rbxts/services";

/**
 * Controls a dialog frame
 */
export = class StudioDialogFrame {
	private _DockWidgetPluginGui: DockWidgetPluginGui;
    private _Handle: Roact.ComponentInstanceHandle;

	public readonly Opened = new Signal<[]>();
	public readonly Closed = new Signal<[]>();

	constructor(title: string, size: Vector2, contents: Roact.Element) {
		const dockWidgetGuiId = HttpService.GenerateGUID();
		const dockWidgetPluginGuiInfo = new DockWidgetPluginGuiInfo(
			Enum.InitialDockState.Float,
			false,
			true,
			size.X,
			size.Y,
			size.X,
			size.Y);
		const dockWidgetPluginGui = plugin.CreateDockWidgetPluginGui(dockWidgetGuiId, dockWidgetPluginGuiInfo);
		dockWidgetPluginGui.GetPropertyChangedSignal("Enabled").Connect(() => {
			if (dockWidgetPluginGui.Enabled) {
				this.Opened.Fire();
			}
			else {
				this.Closed.Fire();
			}
		});
		dockWidgetPluginGui.Title = title;

		this._Handle = Roact.mount(contents, dockWidgetPluginGui);
		this._DockWidgetPluginGui = dockWidgetPluginGui;
	}

	/**
	 * Opens the dialog frame.
	 */
	public Open() {
		this._DockWidgetPluginGui.Enabled = true;
	}

	/**
	 * Closes the dialog frame.
	 */
	public Close() {
		this._DockWidgetPluginGui.Enabled = false;
	}

	/**
	 * Destroys the dialog frame.
	 */
	public Destroy() {
		this.Opened.DisconnectAll();
		this.Closed.DisconnectAll();

		Roact.unmount(this._Handle);
		this._DockWidgetPluginGui.Destroy();
	}
}