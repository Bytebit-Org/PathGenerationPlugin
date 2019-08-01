import PluginSharedState = require("PluginSharedState");
import { Workspace } from "@rbxts/services";

export = class PreviewManager {
    private _beamsFolder: Folder;
    
    constructor() {
        this._setUpBeamsFolder();
        this._connectHandlers();
    }

    private _connectHandlers() {
        PluginSharedState.Updated.bind(() => {
            if (PluginSharedState.PathInfo === undefined) {
                return;
            }

            this._beamsFolder.ClearAllChildren();

            const waypoints = PluginSharedState.PathInfo.Waypoints;
            for (let i = 0; i < waypoints.size() - 1; i++) {
                const exitingWaypoint = waypoints[i];
                const enteringWaypoint = waypoints[i + 1];

                let exitingAttachment = exitingWaypoint.VisualizationPart.FindFirstChild("ExitingAttachment") as Attachment;
                let exitingCurveSize = 0;
                if (exitingWaypoint.ExitingHandleVisualizationPart !== undefined) {
                    const relativeCurvePointDisplacement = exitingWaypoint.ExitingHandleVisualizationPart.Position.sub(exitingWaypoint.VisualizationPart.Position);
                    exitingAttachment.CFrame = this._createDesiredCFrame(relativeCurvePointDisplacement);
                    exitingCurveSize = relativeCurvePointDisplacement.Magnitude;
                }

                let enteringAttachment = enteringWaypoint.VisualizationPart.FindFirstChild("EnteringAttachment") as Attachment;
                let enteringCurveSize = 0;
                if (enteringWaypoint.EnteringHandleVisualizationPart !== undefined) {
                    const relativeCurvePointDisplacement = enteringWaypoint.EnteringHandleVisualizationPart.Position.sub(enteringWaypoint.VisualizationPart.Position);
                    enteringAttachment.CFrame = this._createDesiredCFrame(relativeCurvePointDisplacement.mul(-1));
                    enteringCurveSize = relativeCurvePointDisplacement.Magnitude;
                }

                const beam = new Instance("Beam");
                beam.Archivable = false;
                beam.Attachment0 = exitingAttachment;
                beam.Attachment1 = enteringAttachment;
                beam.CurveSize0 = exitingCurveSize;
                beam.CurveSize1 = enteringCurveSize;
                beam.Color = new ColorSequence(Color3.fromRGB(128, 0, 0), Color3.fromRGB(0, 128, 0));
                beam.FaceCamera = true;
                beam.LightEmission = 1;
                beam.LightInfluence = 0;
                beam.Name = `Beam_${i}`;
                beam.Parent = this._beamsFolder;
                beam.Segments = 100;
                beam.Width0 = 1;
                beam.Width1 = 1;
            }
        });
    }

    private _createDesiredCFrame(relativePointOnRightAxis: Vector3) {
        if (relativePointOnRightAxis.Magnitude === 0) {
            return new CFrame();
        }

        const rightUnit = relativePointOnRightAxis.Unit;
        const slightlyOffsetUnit = rightUnit.add(new Vector3(1, 0, 0)).Unit;
        const upUnit = rightUnit.Cross(slightlyOffsetUnit).Unit;

        return CFrame.fromMatrix(new Vector3(0, 0, 0), rightUnit, upUnit);
    }

    private _setUpBeamsFolder() {
        const beamsFolder = new Instance("Folder");
        beamsFolder.Archivable = false;
        beamsFolder.Name = "PathGenPreviewBeams";
        beamsFolder.Parent = Workspace;

        this._beamsFolder = beamsFolder;
    }
}