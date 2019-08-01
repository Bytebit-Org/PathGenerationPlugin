import EditablePathGenWaypoint = require("PathGen/EditablePathGenWaypoint");
import PluginSharedState = require("PluginSharedState");
import { Workspace } from "@rbxts/services";

const _ENTERING_SELECTION_SPHERE_COLOR3 = Color3.fromRGB(0, 128, 0);
const _EXITING_SELECTION_SPHERE_COLOR3 = Color3.fromRGB(128, 0, 0);

const _SELECTION_SPHERE_SURFACE_COLOR3 = Color3.fromRGB(0, 0, 0);
const _SELECTION_SPHERE_SURFACE_TRANSPARENCY = 0.8;

const _BEZIER_HANDLE_VISUALIZATIONS_FOLDER = new Instance("Folder");
_BEZIER_HANDLE_VISUALIZATIONS_FOLDER.Archivable = false;
_BEZIER_HANDLE_VISUALIZATIONS_FOLDER.Name = "EditablePathGenWaypointBezierHandleVisualizations";
_BEZIER_HANDLE_VISUALIZATIONS_FOLDER.Parent = Workspace;

function _createHandleVisualization(selectionSphereColor3: Color3): BasePart {
    const part = new Instance("Part");
    part.Anchored = true;
    part.Archivable = false;
    part.CanCollide = false;
    part.Shape = Enum.PartType.Ball;
    part.Size = new Vector3(0.5, 0.5, 0.5);
    part.Transparency = 1;

    const selectionSphere = new Instance("SelectionSphere");
    selectionSphere.Adornee = part;
    selectionSphere.Archivable = false;
    selectionSphere.Color3 = selectionSphereColor3;
    selectionSphere.Parent = part;
    selectionSphere.SurfaceColor3 = _SELECTION_SPHERE_SURFACE_COLOR3;
    selectionSphere.SurfaceTransparency = _SELECTION_SPHERE_SURFACE_TRANSPARENCY;

    part.GetPropertyChangedSignal("Position").Connect(() => {
        PluginSharedState.Updated.go();
    });

    part.Parent = _BEZIER_HANDLE_VISUALIZATIONS_FOLDER;

    return part;
}

export = function (waypoint: EditablePathGenWaypoint) {
    const exitingHandleVisualization = _createHandleVisualization(_EXITING_SELECTION_SPHERE_COLOR3);
    exitingHandleVisualization.Position = waypoint.VisualizationPart.Position.add(waypoint.VisualizationPart.CFrame.LookVector.mul(2));
    waypoint.ExitingHandleVisualizationPart = exitingHandleVisualization;

    const enteringHandleVisualization = _createHandleVisualization(_ENTERING_SELECTION_SPHERE_COLOR3);
    enteringHandleVisualization.Position = waypoint.VisualizationPart.Position.add(waypoint.VisualizationPart.CFrame.LookVector.mul(-2));
    waypoint.EnteringHandleVisualizationPart = enteringHandleVisualization;
}