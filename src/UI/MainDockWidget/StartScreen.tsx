/// <reference types="@rbxts/types/plugin" />

import Roact from "@rbxts/roact";
import StudioTextButton = require("UI/RoactStudioComponents/StudioTextButton");
import EditablePathGenWaypoint = require("PathGen/EditablePathGenWaypoint");
import PluginSharedState = require("PluginSharedState");
import PlaceNewWaypointAsync = require("HelperFunctions/PlaceNewWaypointAsync");
import LoadPathFromModuleScriptToPluginSharedState = require("HelperFunctions/LoadPathFromModuleScriptToPluginSharedState");

interface IStartScreenProperties {
    PathOpenedCallback: () => void,
    Visible: boolean,
}

export = class StartScreen extends Roact.Component<IStartScreenProperties> {
    public render() : Roact.Element {
        return <frame
            Key={"StartScreenFrame"}
            Size={new UDim2(1, 0, 1, 0)}
            Transparency={1}
            Visible={this.props.Visible}>
            <uigridlayout
                Key={"UIGridLayout"}
                CellPadding={new UDim2(0.1, 0, 1 - StudioTextButton.HeightUDim.Scale, -StudioTextButton.HeightUDim.Offset)}
                CellSize={new UDim2(0.4, 0, StudioTextButton.HeightUDim.Scale, StudioTextButton.HeightUDim.Offset)}
                HorizontalAlignment={Enum.HorizontalAlignment.Center}
                VerticalAlignment={Enum.VerticalAlignment.Center} >
            </uigridlayout>
            <StudioTextButton
                Key={"CreateButton"}
                Active={true}
                BackgroundColorEnum={Enum.StudioStyleGuideColor.DialogMainButton}
                BorderColorEnum={Enum.StudioStyleGuideColor.DialogButtonBorder}
                Text={"Create new"}
                TextColorEnum={Enum.StudioStyleGuideColor.DialogMainButtonText}
                Width={new UDim(1, 0)}
                Visible={true}
                
                // Events
                Events={{
                    MouseButton1Click: () => {
                        const newWaypoints = new Array<EditablePathGenWaypoint>();
                        newWaypoints.push(PlaceNewWaypointAsync());
                        wait();
                        newWaypoints.push(PlaceNewWaypointAsync());

                        PluginSharedState.PathInfo = {
                            Name: "",
                            SelectedWaypointIndex: -1,
                            Waypoints: newWaypoints
                        };
                        PluginSharedState.Updated.go();
                        this.props.PathOpenedCallback();
                    }
                }} />
            <StudioTextButton
                Key={"LoadButton"}
                Active={true}
                BackgroundColorEnum={Enum.StudioStyleGuideColor.DialogMainButton}
                BorderColorEnum={Enum.StudioStyleGuideColor.DialogButtonBorder}
                Text={"Load"}
                TextColorEnum={Enum.StudioStyleGuideColor.DialogMainButtonText}
                Width={new UDim(1, 0)}
                Visible={true}
                
                // Events
                Events={{
                    MouseButton1Click: () => {
                        LoadPathFromModuleScriptToPluginSharedState();
                        this.props.PathOpenedCallback();
                    }
                }} />
        </frame>
    }
}