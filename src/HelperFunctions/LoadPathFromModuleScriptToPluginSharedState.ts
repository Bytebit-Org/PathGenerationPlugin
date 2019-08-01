import { Selection, HttpService } from "@rbxts/services";
import ISaveablePathData = require("Interfaces/ISaveablePathData");
import EditablePathGenWaypoint = require("PathGen/EditablePathGenWaypoint");
import IEditablePathData = require("Interfaces/IEditablePathData");
import CreateWaypointVisualizer = require("./CreateWaypointVisualizer");
import ConnectWaypointAndVisualizer = require("./ConnectWaypointAndVisualizer");
import CreateBezierControls = require("./CreateBezierControls");
import PluginSharedState = require("PluginSharedState");

export = function () {
    assert(Selection.Get().size() > 0, "Nothing selected, cannot load");

    const firstSelection = Selection.Get()[0];
    assert(firstSelection.IsA("ModuleScript"), "ModuleScript must be selected first, cannot load");

    try {
        const moduleScript = firstSelection as ModuleScript;
        const serializedPathData = moduleScript.Source;
        const deserializedPathData = HttpService.JSONDecode(serializedPathData) as ISaveablePathData;

        const editablePathData = {
            SelectedWaypointIndex: -1,
            Name: deserializedPathData.Name,
            Waypoints: new Array<EditablePathGenWaypoint>()
        } as IEditablePathData;

        for (let i = 0; i < deserializedPathData.Waypoints.size(); i++) {
            const deserializedWaypoint = deserializedPathData.Waypoints[i];

            const editableWaypoint = new EditablePathGenWaypoint();
            const visualizationPart = CreateWaypointVisualizer();
            visualizationPart.Position = new Vector3(deserializedWaypoint.WorldPosition[0], deserializedWaypoint.WorldPosition[1], deserializedWaypoint.WorldPosition[2]);
            ConnectWaypointAndVisualizer(editableWaypoint, visualizationPart);

            const isWaypointLinear = deserializedWaypoint.ExitingHandleWorldPosition === undefined && deserializedWaypoint.EnteringHandleWorldPosition === undefined;
            if (!isWaypointLinear) {
                CreateBezierControls(editableWaypoint);

                if (deserializedWaypoint.ExitingHandleWorldPosition !== undefined) {
                    editableWaypoint.ExitingHandleVisualizationPart.Position = new Vector3(deserializedWaypoint.ExitingHandleWorldPosition[0], deserializedWaypoint.ExitingHandleWorldPosition[1], deserializedWaypoint.ExitingHandleWorldPosition[2]);
                }

                if (deserializedWaypoint.EnteringHandleWorldPosition !== undefined) {
                    editableWaypoint.EnteringHandleVisualizationPart.Position = new Vector3(deserializedWaypoint.EnteringHandleWorldPosition[0], deserializedWaypoint.EnteringHandleWorldPosition[1], deserializedWaypoint.EnteringHandleWorldPosition[2]);
                }
            }

            editablePathData.Waypoints.push(editableWaypoint);
        }

        PluginSharedState.PathInfo = editablePathData;
        PluginSharedState.Updated.go();
    }
    catch {
        error("Malformed ModuleScript, cannot load");
    }
}