import PluginSharedState = require("PluginSharedState");
import PlaceNewWaypointAsync = require("./PlaceNewWaypointAsync");

export = function (shouldInsertBeforeCurrentWaypointIndex: boolean) {
    if (PluginSharedState.PathInfo === undefined) {
        warn("Path Generator: No path initialized yet");
        return;
    }

    if (PluginSharedState.PathInfo.SelectedWaypointIndex === -1) {
        warn("Path Generator: No waypoint selected");
        return;
    }

    const newWaypoint = PlaceNewWaypointAsync();
    let insertIndex = shouldInsertBeforeCurrentWaypointIndex ? PluginSharedState.PathInfo.SelectedWaypointIndex - 1 : PluginSharedState.PathInfo.SelectedWaypointIndex;
    if (insertIndex <= 0) { // Using <= instead of < for Lua
        insertIndex = 0;
    }

    PluginSharedState.PathInfo.SelectedWaypointIndex = -1;
    PluginSharedState.PathInfo.Waypoints.insert(insertIndex, newWaypoint);
    PluginSharedState.Updated.go();
}