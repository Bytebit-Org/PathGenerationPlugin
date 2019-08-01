import EditablePathGenWaypoint = require("PathGen/EditablePathGenWaypoint");
import PluginSharedState = require("PluginSharedState");
import DeleteWaypoint = require("./DeleteWaypoint");

export = function (waypoint: EditablePathGenWaypoint, visualizationPart: BasePart) {
    waypoint.VisualizationPart = visualizationPart;

    visualizationPart.AncestryChanged.Connect((childInstance: Instance, parentInstance: Instance) => {
        if (parentInstance === undefined) {
            DeleteWaypoint(waypoint);
        }
    });

    visualizationPart.GetPropertyChangedSignal("Position").Connect(() => {
        PluginSharedState.Updated.go();
    });
}