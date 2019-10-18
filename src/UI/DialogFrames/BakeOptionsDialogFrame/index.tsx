import Roact from "@rbxts/roact";
import StudioDialogFrame from "UI/RoactStudioComponents/StudioDialogFrame";
import PluginSharedState from "PluginSharedState";
import BakeOptionsDialogMasterFrame from "./BakeOptionsDialogMasterFrame";
import IDialogFrame from "../IDialogFrame";

export = class BakeOptionsDialogFrame implements IDialogFrame {
	private readonly _StudioDialogFrame: StudioDialogFrame;

	constructor() {
		this._StudioDialogFrame = new StudioDialogFrame(
			PluginSharedState.Plugin,
			"Bake Options",
			new Vector2(500, 125),
			"PathGen_BakeOptionsDialog");
	}

	public Prompt() {
		this._StudioDialogFrame.SetContents(<BakeOptionsDialogMasterFrame
			Key={"MasterFrame"}
			OnOptionsConfirmedCallback={() => this._StudioDialogFrame.Close()} />);
		this._StudioDialogFrame.Open();
	}
}