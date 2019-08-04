-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:48 PM Pacific Daylight Time

local TS = require(script.Parent.Parent.include.RuntimeLib);
local exports;
local Workspace = TS.import(TS.getModule("services")).Workspace;
local PluginSharedConstants = TS.import(script.Parent.Parent, "PluginSharedConstants");
local _SELECTION_BOX_COLOR3 = Color3.fromRGB(0, 202, 255);
local _SELECTION_BOX_SURFACE_COLOR3 = Color3.fromRGB(0, 160, 255);
local _SELECTION_BOX_LINE_THICKNESS = 0.1;
local _SELECTION_BOX_SURFACE_TRANSPARENCY = 0;
local _SELECTION_SPHERE_COLOR3 = Color3.fromRGB(0, 100, 170);
local _SELECTION_SPHERE_SURFACE_COLOR3 = Color3.fromRGB(0, 0, 0);
local _SELECTION_SPHERE_SURFACE_TRANSPARENCY = 0.8;
local _VISUALIZATIONS_FOLDER = Instance.new("Folder");
_VISUALIZATIONS_FOLDER.Archivable = false;
_VISUALIZATIONS_FOLDER.Name = PluginSharedConstants.VisualizationsFolderName;
_VISUALIZATIONS_FOLDER.Parent = Workspace;
exports = function()
	local part = Instance.new("Part");
	part.Anchored = true;
	part.Archivable = false;
	part.CanCollide = false;
	part.Shape = Enum.PartType.Ball;
	part.Size = Vector3.new(1, 1, 1);
	part.Transparency = 1;
	local selectionBox = Instance.new("SelectionBox");
	selectionBox.Adornee = part;
	selectionBox.Archivable = false;
	selectionBox.Color3 = _SELECTION_BOX_COLOR3;
	selectionBox.LineThickness = _SELECTION_BOX_LINE_THICKNESS;
	selectionBox.Parent = part;
	selectionBox.SurfaceColor3 = _SELECTION_BOX_SURFACE_COLOR3;
	selectionBox.SurfaceTransparency = _SELECTION_BOX_SURFACE_TRANSPARENCY;
	selectionBox.Visible = true;
	local selectionSphere = Instance.new("SelectionSphere");
	selectionSphere.Adornee = part;
	selectionSphere.Archivable = false;
	selectionSphere.Color3 = _SELECTION_SPHERE_COLOR3;
	selectionSphere.Parent = part;
	selectionSphere.SurfaceColor3 = _SELECTION_SPHERE_SURFACE_COLOR3;
	selectionSphere.SurfaceTransparency = _SELECTION_SPHERE_SURFACE_TRANSPARENCY;
	selectionSphere.Visible = false;
	local exitingAttachment = Instance.new("Attachment");
	exitingAttachment.Archivable = false;
	exitingAttachment.CFrame = CFrame.new(0, 0, 0);
	exitingAttachment.Name = "ExitingAttachment";
	exitingAttachment.Parent = part;
	local enteringAttachment = Instance.new("Attachment");
	enteringAttachment.Archivable = false;
	enteringAttachment.CFrame = CFrame.new(0, 0, 0);
	enteringAttachment.Name = "EnteringAttachment";
	enteringAttachment.Parent = part;
	part.Parent = _VISUALIZATIONS_FOLDER;
	return part;
end;
return exports;
