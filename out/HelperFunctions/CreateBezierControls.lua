-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:48 PM Pacific Daylight Time

local TS = require(script.Parent.Parent.include.RuntimeLib);
local exports;
local PluginSharedState = TS.import(script.Parent.Parent, "PluginSharedState");
local Workspace = TS.import(TS.getModule("services")).Workspace;
local _ENTERING_SELECTION_SPHERE_COLOR3 = Color3.fromRGB(0, 128, 0);
local _EXITING_SELECTION_SPHERE_COLOR3 = Color3.fromRGB(128, 0, 0);
local _SELECTION_SPHERE_SURFACE_COLOR3 = Color3.fromRGB(0, 0, 0);
local _SELECTION_SPHERE_SURFACE_TRANSPARENCY = 0.8;
local _BEZIER_HANDLE_VISUALIZATIONS_FOLDER = Instance.new("Folder");
_BEZIER_HANDLE_VISUALIZATIONS_FOLDER.Archivable = false;
_BEZIER_HANDLE_VISUALIZATIONS_FOLDER.Name = "EditablePathGenWaypointBezierHandleVisualizations";
_BEZIER_HANDLE_VISUALIZATIONS_FOLDER.Parent = Workspace;
local function _createHandleVisualization(selectionSphereColor3)
	local part = Instance.new("Part");
	part.Anchored = true;
	part.Archivable = false;
	part.CanCollide = false;
	part.Shape = Enum.PartType.Ball;
	part.Size = Vector3.new(0.5, 0.5, 0.5);
	part.Transparency = 1;
	local selectionSphere = Instance.new("SelectionSphere");
	selectionSphere.Adornee = part;
	selectionSphere.Archivable = false;
	selectionSphere.Color3 = selectionSphereColor3;
	selectionSphere.Parent = part;
	selectionSphere.SurfaceColor3 = _SELECTION_SPHERE_SURFACE_COLOR3;
	selectionSphere.SurfaceTransparency = _SELECTION_SPHERE_SURFACE_TRANSPARENCY;
	part:GetPropertyChangedSignal("Position"):Connect(function()
		PluginSharedState.Updated:go();
	end);
	part.Parent = _BEZIER_HANDLE_VISUALIZATIONS_FOLDER;
	return part;
end;
exports = function(waypoint)
	local exitingHandleVisualization = _createHandleVisualization(_EXITING_SELECTION_SPHERE_COLOR3);
	exitingHandleVisualization.Position = (waypoint.VisualizationPart.Position + ((waypoint.VisualizationPart.CFrame.LookVector * (2))));
	waypoint.ExitingHandleVisualizationPart = exitingHandleVisualization;
	local enteringHandleVisualization = _createHandleVisualization(_ENTERING_SELECTION_SPHERE_COLOR3);
	enteringHandleVisualization.Position = (waypoint.VisualizationPart.Position + ((waypoint.VisualizationPart.CFrame.LookVector * (-2))));
	waypoint.EnteringHandleVisualizationPart = enteringHandleVisualization;
end;
return exports;
