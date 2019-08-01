import Cue from "@rbxts/cue";
import IEditablePathData = require("Interfaces/IEditablePathData");

interface IPluginSharedState {
    IsPlacingNewWaypoint: boolean,
    PathInfo?: IEditablePathData,
    Plugin: Plugin,
    PluginMenus: {
        [key: string]: PluginMenu
    },
    Updated: Cue<() => void>,
}

const sharedState = {
    IsPlacingNewWaypoint: false,
    PathInfo: undefined,
    Plugin: undefined,
    PluginMenus: {},
    Updated: new Cue<() => void>(),
} as IPluginSharedState;

export = sharedState;