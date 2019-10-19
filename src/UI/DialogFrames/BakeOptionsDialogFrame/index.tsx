import Roact from "@rbxts/roact";
import { StudioDialogFrame } from "@rbxts/roblox-RoactStudioComponents";
import PluginSharedState from "PluginSharedState";
import BakeOptionsDialogMasterFrame from "./BakeOptionsDialogMasterFrame";
import IDialogFrame from "../IDialogFrame";

export = class BakeOptionsDialogFrame implements IDialogFrame {
	private readonly _StudioDialogFrame: StudioDialogFrame;

	constructor() {
		this._StudioDialogFrame = new StudioDialogFrame(
			PluginSharedState.Plugin,
			"PathGenBakeOptionsDialogFrame",
			"Bake Options",
			new Vector2(500, 210),
			"PathGen_BakeOptionsDialog");
	}

	public Prompt() {
		this._StudioDialogFrame.SetContents(<BakeOptionsDialogMasterFrame
			Key={"MasterFrame"}
			OnOptionsConfirmedCallback={() => this._StudioDialogFrame.Close()} />);
		this._StudioDialogFrame.Open();
	}
}