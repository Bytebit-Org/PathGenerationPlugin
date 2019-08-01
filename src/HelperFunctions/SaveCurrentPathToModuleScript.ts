import SavedPathGenWaypoint = require("PathGen/SavedPathGenWaypoint");
import PluginSharedState = require("PluginSharedState");
import { HttpService, Selection, ServerStorage } from "@rbxts/services";
import ISaveablePathData = require("Interfaces/ISaveablePathData");

export = function () {
    assert(PluginSharedState.PathInfo !== undefined, "No path to save");

    const saveablePath = {
        Name: PluginSharedState.PathInfo.Name,
        Waypoints: new Array<SavedPathGenWaypoint>()
    } as ISaveablePathData;

    for (let i = 0; i < PluginSharedState.PathInfo.Waypoints.size(); i++) {
        const waypoint = PluginSharedState.PathInfo.Waypoints[i];
        const saveableWaypoint = new SavedPathGenWaypoint();
        
        if (waypoint.ExitingHandleVisualizationPart !== undefined) {
            saveableWaypoint.ExitingHandleWorldPosition = [
                waypoint.ExitingHandleVisualizationPart.Position.X,
                waypoint.ExitingHandleVisualizationPart.Position.Y,
                waypoint.ExitingHandleVisualizationPart.Position.Z,
            ];
        }
        
        if (waypoint.EnteringHandleVisualizationPart !== undefined) {
            saveableWaypoint.EnteringHandleWorldPosition = [
                waypoint.EnteringHandleVisualizationPart.Position.X,
                waypoint.EnteringHandleVisualizationPart.Position.Y,
                waypoint.EnteringHandleVisualizationPart.Position.Z,
            ];
        }

        saveableWaypoint.Name = waypoint.Name;
        saveableWaypoint.WorldPosition = [
            waypoint.VisualizationPart.Position.X,
            waypoint.VisualizationPart.Position.Y,
            waypoint.VisualizationPart.Position.Z,
        ];

        saveablePath.Waypoints.push(saveableWaypoint);
    }

    const serializedPathData = HttpService.JSONEncode(saveablePath);

    const moduleScript = new Instance("ModuleScript");
    moduleScript.Name = saveablePath.Name !== undefined && saveablePath.Name !== "" ? saveablePath.Name : "PathGenSave";
    moduleScript.Source = serializedPathData;
    moduleScript.Parent = Selection.Get().size() > 0 ? Selection.Get()[0] : ServerStorage;
}