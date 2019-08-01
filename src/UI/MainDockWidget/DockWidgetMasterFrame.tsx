/// <reference types="@rbxts/types/plugin" />

import Roact from "@rbxts/roact";
import StartScreen = require("./StartScreen");
import WaypointsListScreen = require("./WaypointsListScreen");
import PlaceNewWaypointScreen = require("./PlaceNewWaypointScreen");
import PluginSharedState = require("PluginSharedState");
import DeleteWaypoint = require("HelperFunctions/DeleteWaypoint");

enum Screen {
    StartScreen,
    WaypointsListScreen
}

interface IDockWidgetMasterFrameState {
    CurrentScreen: Screen,
    ShouldShowPlaceNewWaypointScreen: boolean,
}

export = class DockWidgetMasterFrame extends Roact.Component<{}, IDockWidgetMasterFrameState> {
    constructor(props: any) {
        super(props);

        this.setState({
            CurrentScreen: Screen.StartScreen,
            ShouldShowPlaceNewWaypointScreen: false,
        } as IDockWidgetMasterFrameState);

        PluginSharedState.Updated.bind(() => {
            if (PluginSharedState.IsPlacingNewWaypoint !== this.state.ShouldShowPlaceNewWaypointScreen) {
                this.setState({
                    ShouldShowPlaceNewWaypointScreen: PluginSharedState.IsPlacingNewWaypoint
                } as IDockWidgetMasterFrameState);
            }
        })
    }

    public render() : Roact.Element {
        const theme = settings().Studio.Theme;

        return <frame
            BackgroundColor3={theme.GetColor(Enum.StudioStyleGuideColor.MainBackground)}
            Size={new UDim2(1, 0, 1, 0)}>
            <PlaceNewWaypointScreen
                Key={"PlaceNewWaypointScreen"}
                Visible={this.state.ShouldShowPlaceNewWaypointScreen} />
            <StartScreen
                Key={"StartScreen"}
                PathOpenedCallback={() => {
                    this.setState({
                        CurrentScreen: Screen.WaypointsListScreen
                    } as IDockWidgetMasterFrameState);
                }}
                Visible={this.state.CurrentScreen === Screen.StartScreen && !this.state.ShouldShowPlaceNewWaypointScreen} />
            <WaypointsListScreen
                Key={"WaypointsListScreen"}
                CloseButtonPressedCallback={() => {
                    if (PluginSharedState.PathInfo !== undefined) {
                        while (PluginSharedState.PathInfo.Waypoints.size() > 0) {
                            DeleteWaypoint(PluginSharedState.PathInfo.Waypoints[0]);
                        }
                    }

                    PluginSharedState.PathInfo = undefined;
                    
                    this.setState({
                        CurrentScreen: Screen.StartScreen
                    } as IDockWidgetMasterFrameState);
                }}
                Visible={this.state.CurrentScreen === Screen.WaypointsListScreen && !this.state.ShouldShowPlaceNewWaypointScreen} />
        </frame>
    }
}