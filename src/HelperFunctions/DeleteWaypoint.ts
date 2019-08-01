import EditablePathGenWaypoint = require("PathGen/EditablePathGenWaypoint");
import PluginSharedState = require("PluginSharedState");

export = function (waypoint: EditablePathGenWaypoint) {
    assert(PluginSharedState.PathInfo !== undefined, "No path info to delete waypoint from");

    for (let i = 0; i < PluginSharedState.PathInfo.Waypoints.size(); i++) {
        if (waypoint === PluginSharedState.PathInfo.Waypoints[i]) {
            PluginSharedState.PathInfo.Waypoints.remove(i);

            if (waypoint.VisualizationPart && waypoint.VisualizationPart.Parent) {
                waypoint.VisualizationPart.Destroy();
                waypoint.VisualizationPart = undefined;
            }
        
            if (waypoint.ExitingHandleVisualizationPart && waypoint.ExitingHandleVisualizationPart.Parent) {
                waypoint.ExitingHandleVisualizationPart.Destroy();
                waypoint.ExitingHandleVisualizationPart = undefined;
            }
        
            if (waypoint.EnteringHandleVisualizationPart && waypoint.EnteringHandleVisualizationPart.Parent) {
                waypoint.EnteringHandleVisualizationPart.Destroy();
                waypoint.EnteringHandleVisualizationPart = undefined;
            }

            PluginSharedState.Updated.go();

            break;
        }
    }
}