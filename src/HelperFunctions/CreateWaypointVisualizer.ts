import PluginSharedConstants = require("PluginSharedConstants");

const _SELECTION_BOX_COLOR3 = Color3.fromRGB(0, 202, 255);
const _SELECTION_BOX_SURFACE_COLOR3 = Color3.fromRGB(0, 160, 255);
const _SELECTION_BOX_LINE_THICKNESS = 0.1;
const _SELECTION_BOX_SURFACE_TRANSPARENCY = 0;

const _SELECTION_SPHERE_COLOR3 = Color3.fromRGB(0, 100, 170);
const _SELECTION_SPHERE_SURFACE_COLOR3 = Color3.fromRGB(0, 0, 0);
const _SELECTION_SPHERE_SURFACE_TRANSPARENCY = 0.8;

const _VISUALIZATIONS_FOLDER = new Instance("Folder");
_VISUALIZATIONS_FOLDER.Archivable = false;
_VISUALIZATIONS_FOLDER.Name = PluginSharedConstants.FolderNames.WaypointVisualizations;
_VISUALIZATIONS_FOLDER.Parent = PluginSharedConstants.BaseFolder;

export = function () : BasePart {
    const part = new Instance("Part");
    part.Anchored = true;
    part.Archivable = false;
    part.CanCollide = false;
    part.Shape = Enum.PartType.Ball;
    part.Size = new Vector3(1, 1, 1);
    part.Transparency = 1;

    const selectionBox = new Instance("SelectionBox");
    selectionBox.Adornee = part;
    selectionBox.Archivable = false;
    selectionBox.Color3 = _SELECTION_BOX_COLOR3;
    selectionBox.LineThickness = _SELECTION_BOX_LINE_THICKNESS;
    selectionBox.Parent = part;
    selectionBox.SurfaceColor3 = _SELECTION_BOX_SURFACE_COLOR3;
    selectionBox.SurfaceTransparency = _SELECTION_BOX_SURFACE_TRANSPARENCY;
    selectionBox.Visible = true;

    const selectionSphere = new Instance("SelectionSphere");
    selectionSphere.Adornee = part;
    selectionSphere.Archivable = false;
    selectionSphere.Color3 = _SELECTION_SPHERE_COLOR3;
    selectionSphere.Parent = part;
    selectionSphere.SurfaceColor3 = _SELECTION_SPHERE_SURFACE_COLOR3;
    selectionSphere.SurfaceTransparency = _SELECTION_SPHERE_SURFACE_TRANSPARENCY;
    selectionSphere.Visible = false;

    const exitingAttachment = new Instance("Attachment");
    exitingAttachment.Archivable = false;
    exitingAttachment.CFrame = new CFrame(0, 0, 0);
    exitingAttachment.Name = "ExitingAttachment";
    exitingAttachment.Parent = part;

    const enteringAttachment = new Instance("Attachment");
    enteringAttachment.Archivable = false;
    enteringAttachment.CFrame = new CFrame(0, 0, 0);
    enteringAttachment.Name = "EnteringAttachment";
    enteringAttachment.Parent = part;

    part.Parent = _VISUALIZATIONS_FOLDER;

    return part;
}