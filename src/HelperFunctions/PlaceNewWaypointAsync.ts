import PluginSharedState = require("PluginSharedState");
import EditablePathGenWaypoint = require("PathGen/EditablePathGenWaypoint");
import { Workspace } from "@rbxts/services";
import CreateWaypointVisualizer = require("./CreateWaypointVisualizer");
import ConnectWaypointAndVisualizer = require("./ConnectWaypointAndVisualizer");
import PluginSharedConstants = require("PluginSharedConstants");

export = function () {
    PluginSharedState.IsPlacingNewWaypoint = true;
    PluginSharedState.Updated.go();

    PluginSharedState.Plugin.Activate(true);
    const mouse = PluginSharedState.Plugin.GetMouse();

    const previousTargetFilter = mouse.TargetFilter;
    mouse.TargetFilter = PluginSharedConstants.BaseFolder.WaitForChild(PluginSharedConstants.FolderNames.WaypointVisualizations) as Folder;

    const visualizationPart = CreateWaypointVisualizer();
    visualizationPart.Position = mouse.Hit.Position;

    const movedConnection = mouse.Move.Connect(() => {
        const hitOffset = mouse.UnitRay.Direction.mul(-0.5);
        visualizationPart.Position = mouse.Hit.Position.add(hitOffset);
    });

    mouse.Button1Up.Wait();

    let newWaypoint = new EditablePathGenWaypoint();
    ConnectWaypointAndVisualizer(newWaypoint, visualizationPart);

    movedConnection.Disconnect();
    mouse.TargetFilter = previousTargetFilter;
    PluginSharedState.Plugin.Deactivate();

    PluginSharedState.IsPlacingNewWaypoint = false;
    PluginSharedState.Updated.go();

    return newWaypoint;
}