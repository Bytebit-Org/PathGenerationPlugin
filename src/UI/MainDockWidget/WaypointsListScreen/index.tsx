/// <reference types="@rbxts/types/plugin" />

import Roact from "@rbxts/roact";
import { StudioScrollingFrame, StudioTextButton } from "@rbxts/roblox-RoactStudioComponents";
import Header = require("./Header");
import WaypointListItem = require("./WaypointListItem");
import EditablePathGenWaypoint = require("PathGen/EditablePathGenWaypoint");
import PluginSharedState = require("PluginSharedState");
import InsertWaypoint = require("HelperFunctions/InsertWaypoint");

interface IWaypointsListScreenProperties {
    CloseButtonPressedCallback: () => void,
    Visible: boolean,
}

interface IWaypointsListScreenState {
    CanvasHeightAddend: number,
    ExpandedWaypoints: Array<EditablePathGenWaypoint>,
    Waypoints: Array<EditablePathGenWaypoint>,
}

export = class WaypointsListScreen extends Roact.Component<IWaypointsListScreenProperties, IWaypointsListScreenState> {
    constructor(props: IWaypointsListScreenProperties) {
        super(props);

        this.setState({
            CanvasHeightAddend: 0,
            ExpandedWaypoints: [],
            Waypoints: [],
        } as IWaypointsListScreenState);

        PluginSharedState.Updated.bind(() => this._OnPluginSharedStateUpdate());
    }

    private _OnPluginSharedStateUpdate() {
        if (PluginSharedState.PathInfo === undefined) {
            this.setState({
                CanvasHeightAddend: 0,
                ExpandedWaypoints: [],
                Waypoints: [],
            } as IWaypointsListScreenState);

            return;
        }

        this.setState({
            Waypoints: PluginSharedState.PathInfo.Waypoints.copy(),
        } as IWaypointsListScreenState);
    }

    public shouldUpdate() {
        return true;
    }

    public render() : Roact.Element {
        const theme = settings().Studio.Theme;

        if (PluginSharedState.PathInfo === undefined) {
            return <textlabel
                BackgroundTransparency={1}
                Position={new UDim2(0, 0, 0, 0)}
                Size={new UDim2(1, 0, 1, 0)}
                Text={"No path loaded"}
                TextColor3={theme.GetColor(Enum.StudioStyleGuideColor.WarningText)}
                TextSize={10}
                TextXAlignment={Enum.TextXAlignment.Center}
                TextYAlignment={Enum.TextYAlignment.Center}
                Visible={this.props.Visible} />;
        }

        const scrollingFrameHeight = new UDim(
            1 - (Header.Position.Height.Scale + Header.Size.Height.Scale),
            -1 * (Header.Position.Height.Offset + Header.Size.Height.Offset)
        );
        const scrollingFramePosY = Header.Size.Height;

        const canvasHeightOffset = (PluginSharedState.PathInfo.Waypoints.size() * WaypointListItem.UnexpandedHeightOffset) + this.state.CanvasHeightAddend + StudioTextButton.HeightUDim.Offset*2;

        return <frame
            BackgroundTransparency={1}
            Position={new UDim2(0, 0, 0, 0)}
            Size={new UDim2(1, 0, 1, 0)}
            Visible={this.props.Visible}>
            <Header
                Key={"Header"}
                Name={PluginSharedState.PathInfo.Name}
                CloseButtonPressedCallback={this.props.CloseButtonPressedCallback} />
            <StudioScrollingFrame
                Key={"WaypointsScrollingFrame"}
                Active={false}
                CanvasSize={new UDim2(1, 0, 0, canvasHeightOffset)}
                Position={new UDim2(new UDim(0, 0), scrollingFramePosY)}
                Size={new UDim2(new UDim(1, 0), scrollingFrameHeight)}
                VerticalScrollBarInset={Enum.ScrollBarInset.Always}
                Visible={true}>
                <uilistlayout
                    Key={"UIListLayout"}
                    Padding={new UDim(0, 1)}
                    FillDirection={Enum.FillDirection.Vertical}
                    HorizontalAlignment={Enum.HorizontalAlignment.Center}
                    SortOrder={Enum.SortOrder.LayoutOrder}
                    VerticalAlignment={Enum.VerticalAlignment.Top} />
                {
                    this.state.Waypoints.map((waypoint: EditablePathGenWaypoint, index: number) =>
                        <WaypointListItem
                            ExpansionChangeCallback={(heightDelta: number) => {
                                this.setState((currentState: IWaypointsListScreenState) => {
                                    const newHeightAddend = currentState.CanvasHeightAddend + heightDelta;
                                    const newExpandedWaypoints = this.state.ExpandedWaypoints.copy()
                                    if (newHeightAddend > 0) {
                                        newExpandedWaypoints.push(waypoint);
                                    }
                                    else {
                                        for (let i = 0; i < newExpandedWaypoints.size(); i++) {
                                            if (newExpandedWaypoints[i] === waypoint) {
                                                newExpandedWaypoints.remove(i);
                                            }
                                        }
                                    }

                                    return {
                                        CanvasHeightAddend: newHeightAddend,
                                        ExpandedWaypoints: newExpandedWaypoints,
                                    } as IWaypointsListScreenState;
                                });
                            }}
                            IsExpanded={(() => {
                                for (let i = 0; i < this.state.ExpandedWaypoints.size(); i++) {
                                    if (this.state.ExpandedWaypoints[i] === waypoint) {
                                        return true;
                                    }
                                }

                                return false;
                            })()}
                            Waypoint={waypoint}
                            WaypointIndex={index + 1} />)
                }
                <StudioTextButton
                    Key={"AddWaypointButton"}
                    LayoutOrder={PluginSharedState.PathInfo.Waypoints.size() + 1}
                    Text={"Add waypoint"}
                    Width={new UDim(0.4, 0)}
                    
                    Events={{
                        MouseButton1Click: () => {
                            PluginSharedState.PathInfo.SelectedWaypointIndex = PluginSharedState.PathInfo.Waypoints.size();
                            InsertWaypoint(false);
                        }
                    }}/>
            </StudioScrollingFrame>
        </frame>
    }
}