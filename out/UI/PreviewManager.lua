-- Compiled with https://roblox-ts.github.io v0.1.16
-- July 10, 2019, 9:26 PM GMT-08:00

local TS = require(script.Parent.Parent.include.RuntimeLib);
local _exports;
local PluginSharedState = TS.import(script.Parent.Parent, "PluginSharedState");
local Workspace = TS.import(TS.getModule("services")).Workspace;
local _0;
do
	local PreviewManager = {};
	PreviewManager.__index = PreviewManager;
	function PreviewManager.new(...)
		local self = setmetatable({}, PreviewManager);
		self:constructor(...);
		return self;
	end;
	function PreviewManager:constructor()
		self._beamsFolder = nil;
		self:_setUpBeamsFolder();
		self:_connectHandlers();
	end;
	function PreviewManager:_connectHandlers()
		PluginSharedState.Updated:bind(function()
			if PluginSharedState.PathInfo == nil then
				return nil;
			end;
			self._beamsFolder:ClearAllChildren();
			local waypoints = PluginSharedState.PathInfo.Waypoints;
			do
				local i = 0;
				while i < #waypoints - 1 do
					local exitingWaypoint = waypoints[i + 1];
					local enteringWaypoint = waypoints[i + 1 + 1];
					local exitingAttachment = exitingWaypoint.VisualizationPart:FindFirstChild("ExitingAttachment");
					local exitingCurveSize = 0;
					if exitingWaypoint.ExitingHandleVisualizationPart ~= nil then
						local relativeCurvePointDisplacement = (exitingWaypoint.ExitingHandleVisualizationPart.Position - exitingWaypoint.VisualizationPart.Position);
						exitingAttachment.CFrame = self:_createDesiredCFrame(relativeCurvePointDisplacement);
						exitingCurveSize = relativeCurvePointDisplacement.Magnitude;
					end;
					local enteringAttachment = enteringWaypoint.VisualizationPart:FindFirstChild("EnteringAttachment");
					local enteringCurveSize = 0;
					if enteringWaypoint.EnteringHandleVisualizationPart ~= nil then
						local relativeCurvePointDisplacement = (enteringWaypoint.EnteringHandleVisualizationPart.Position - enteringWaypoint.VisualizationPart.Position);
						enteringAttachment.CFrame = self:_createDesiredCFrame((relativeCurvePointDisplacement * -1));
						enteringCurveSize = relativeCurvePointDisplacement.Magnitude;
					end;
					local beam = Instance.new("Beam");
					beam.Archivable = false;
					beam.Attachment0 = exitingAttachment;
					beam.Attachment1 = enteringAttachment;
					beam.CurveSize0 = exitingCurveSize;
					beam.CurveSize1 = enteringCurveSize;
					beam.Color = ColorSequence.new(Color3.fromRGB(128, 0, 0), Color3.fromRGB(0, 128, 0));
					beam.FaceCamera = true;
					beam.LightEmission = 1;
					beam.LightInfluence = 0;
					beam.Name = "Beam_" .. tostring(i);
					beam.Parent = self._beamsFolder;
					beam.Segments = 100;
					beam.Width0 = 1;
					beam.Width1 = 1;
					i = i + 1;
				end;
			end;
		end);
	end;
	function PreviewManager:_createDesiredCFrame(relativePointOnRightAxis)
		if relativePointOnRightAxis.Magnitude == 0 then
			return CFrame.new();
		end;
		local rightUnit = relativePointOnRightAxis.Unit;
		local slightlyOffsetUnit = (rightUnit + Vector3.new(1, 0, 0)).Unit;
		local upUnit = rightUnit:Cross(slightlyOffsetUnit).Unit;
		return CFrame.fromMatrix(Vector3.new(0, 0, 0), rightUnit, upUnit);
	end;
	function PreviewManager:_setUpBeamsFolder()
		local beamsFolder = Instance.new("Folder");
		beamsFolder.Archivable = false;
		beamsFolder.Name = "PathGenPreviewBeams";
		beamsFolder.Parent = Workspace;
		self._beamsFolder = beamsFolder;
	end;
	_0 = PreviewManager;
end;
_exports = _0;
return _exports;
