/// <reference types="@rbxts/types/plugin" />

import Roact from "@rbxts/roact";
import IStudioComponentState = require("./IStudioComponentState");
import IStudioComponentProperties = require("./IStudioComponentProperties");

interface IStudioTextLabelProperties extends IStudioComponentProperties {
    AnchorPoint?: Vector2,
    PlaceholderText?: string,
    Position?: UDim2,
	StyleGuideModifier?: Enum.StudioStyleGuideModifier,
    Text?: string,
	TextColorEnum?: Enum.StudioStyleGuideColor,
    TextXAlignment?: Enum.TextXAlignment,
    Width?: UDim,
}

export = class StudioTextLabel extends Roact.Component<IStudioTextLabelProperties, IStudioComponentState> {
    public static readonly HeightUDim = new UDim(0, 22);
    public static readonly defaultProps = {
        Active: true,
        AnchorPoint: new Vector2(0, 0),
        LayoutOrder: 0,
        Position: new UDim2(0, 0, 0, 0),
		Rotation: 0,
		StyleGuideModifier: Enum.StudioStyleGuideModifier.Default,
		Text: "",
		TextColorEnum: Enum.StudioStyleGuideColor.MainText,
        TextXAlignment: Enum.TextXAlignment.Center,
        Width: new UDim(1, 0),
        Visible: true,
    } as IStudioTextLabelProperties;

    constructor(props: IStudioTextLabelProperties) {
        super(props);
    }

    public render(): Roact.Element {
        const theme = settings().Studio.Theme;

        return <textlabel
            Active={this.props.Active}
			AnchorPoint={this.props.AnchorPoint}
			BackgroundTransparency={1}
			BorderSizePixel={0}
			Font={Enum.Font.SourceSans}
            LayoutOrder={this.props.LayoutOrder}
            Position={this.props.Position}
            Rotation={this.props.Rotation}
            Size={new UDim2(this.props.Width, StudioTextLabel.HeightUDim)}
            Text={this.props.Text}
            TextColor3={theme.GetColor(this.props.TextColorEnum, this.props.StyleGuideModifier)}
            TextSize={16}
            TextXAlignment={this.props.TextXAlignment}
            TextYAlignment={Enum.TextYAlignment.Center}
            Visible={this.props.Visible} />;
    }
}