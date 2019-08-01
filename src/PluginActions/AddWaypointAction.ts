import PluginSharedState = require("PluginSharedState");
import PluginSharedConstants = require("PluginSharedConstants");
import InsertWaypoint = require("HelperFunctions/InsertWaypoint");

let _InsertAfterAction: PluginAction;
let _InsertBeforeAction: PluginAction;

function RegisterActions() {
    _InsertBeforeAction = PluginSharedState.Plugin.CreatePluginAction(
        PluginSharedConstants.ActionConfigurations.InsertWaypointBefore.ActionId,
        PluginSharedConstants.ActionConfigurations.InsertWaypointBefore.Text,
        PluginSharedConstants.ActionConfigurations.InsertWaypointBefore.StatusTip,
        PluginSharedConstants.AssetPaths.ActionIconAssets.InsertWaypointBefore,
        false);
    _InsertBeforeAction.Triggered.Connect(() => {
        InsertWaypoint(true);
    });

    _InsertAfterAction = PluginSharedState.Plugin.CreatePluginAction(
        PluginSharedConstants.ActionConfigurations.InsertWaypointAfter.ActionId,
        PluginSharedConstants.ActionConfigurations.InsertWaypointAfter.Text,
        PluginSharedConstants.ActionConfigurations.InsertWaypointAfter.StatusTip,
        PluginSharedConstants.AssetPaths.ActionIconAssets.InsertWaypointAfter,
        false);
    _InsertAfterAction.Triggered.Connect(() => {
        InsertWaypoint(false);
    });
}

function RegisterMenus() {
    let pluginMenu = PluginSharedState.Plugin.CreatePluginMenu(PluginSharedConstants.MenuNames.InsertWaypointMenuName);
    pluginMenu.AddAction(_InsertBeforeAction);
    pluginMenu.AddAction(_InsertAfterAction);

    PluginSharedState.PluginMenus[PluginSharedConstants.MenuNames.InsertWaypointMenuName] = pluginMenu;
}

export { RegisterActions, RegisterMenus };