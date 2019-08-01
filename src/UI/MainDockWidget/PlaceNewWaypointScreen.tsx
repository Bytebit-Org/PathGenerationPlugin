/// <reference types="@rbxts/types/plugin" />

import Roact from "@rbxts/roact";

interface IPlaceNewWaypointScreenProperties {
    Visible: boolean
}

export = class PlaceNewWaypointScreen extends Roact.Component<IPlaceNewWaypointScreenProperties> {
    public render() : Roact.Element {
        const theme = settings().Studio.Theme;

        return <frame
            Key={"PlaceNewWaypointScreenFrame"}
            Size={new UDim2(1, 0, 1, 0)}
            Transparency={1}
            Visible={this.props.Visible}>
            <textlabel
                Key={"PromptLabel"}
                BackgroundTransparency={1}
                Size={new UDim2(1, 0, 1, 0)}
                Text={"Click to place new waypoint"}
                TextColor3={theme.GetColor(Enum.StudioStyleGuideColor.MainText)} />
        </frame>
    }
}