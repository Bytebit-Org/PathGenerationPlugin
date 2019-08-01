/// <reference types="@rbxts/types/plugin" />

import Roact from "@rbxts/roact";
import IStudioComponentState = require("./IStudioComponentState");
import { DeriveColorModifier } from "./StudioComponentUtilities";
import IStudioComponentProperties = require("./IStudioComponentProperties");

interface IStudioTextBoxProperties extends IStudioComponentProperties {
    AnchorPoint?: Vector2,
    Events?: {
        ValueChanged?: (actualInstance: TextBox, newValue: string) => void
    },
    PlaceholderText?: string,
    Position?: UDim2,
    Text: string,
    TextXAlignment?: Enum.TextXAlignment,
    Width?: UDim,
}

export = class StudioTextBox extends Roact.Component<IStudioTextBoxProperties, IStudioComponentState> {
    public static readonly HeightUDim = new UDim(0, 22);
    public static readonly defaultProps = {
        Active: true,
        AnchorPoint: new Vector2(0, 0),
        LayoutOrder: 0,
        PlaceholderText: "",
        Position: new UDim2(0, 0, 0, 0),
        Rotation: 0,
        TextXAlignment: Enum.TextXAlignment.Center,
        Width: new UDim(1, 0),
        Visible: true,
    } as IStudioTextBoxProperties;

    constructor(props: IStudioTextBoxProperties) {
        super(props);
        
        this.setState({
            IsMouseOver: false,
            IsPressed: false,
            IsSelected: false
        } as IStudioComponentState);
    }

    public render(): Roact.Element {
        const theme = settings().Studio.Theme;
        const styleGuideModifier = DeriveColorModifier(this.props, this.state);

        return <textbox
            Active={this.props.Active}
            AnchorPoint={this.props.AnchorPoint}
            BackgroundColor3={theme.GetColor(Enum.StudioStyleGuideColor.InputFieldBackground, styleGuideModifier)}
            BorderColor3={theme.GetColor(Enum.StudioStyleGuideColor.InputFieldBorder, styleGuideModifier)}
            BorderSizePixel={1}
            LayoutOrder={this.props.LayoutOrder}
            PlaceholderColor3={theme.GetColor(Enum.StudioStyleGuideColor.MainText, Enum.StudioStyleGuideModifier.Disabled)}
            PlaceholderText={this.props.PlaceholderText}
            Position={this.props.Position}
            Rotation={this.props.Rotation}
            Size={new UDim2(this.props.Width, StudioTextBox.HeightUDim)}
            Text={this.props.Text}
            TextColor3={theme.GetColor(Enum.StudioStyleGuideColor.MainText, styleGuideModifier)}
            TextSize={10}
            TextXAlignment={this.props.TextXAlignment}
            TextYAlignment={Enum.TextYAlignment.Center}
            Visible={this.props.Visible}

            // Events
            Event={{
                FocusLost: (actualInstance) => {
                    if (this.props.Events === undefined || this.props.Events.ValueChanged === undefined) {
                        return;
                    }
                    this.props.Events.ValueChanged(actualInstance, actualInstance.Text);
                },
                MouseEnter: () => {
                    this.setState({
                        IsMouseOver: true
                    } as IStudioComponentState);
                },
                MouseLeave: () => {
                    this.setState({
                        IsMouseOver: false
                    } as IStudioComponentState);
                },
                SelectionGained: () => {
                    this.setState({
                        IsSelected: true
                    } as IStudioComponentState);
                },
                SelectionLost: () => {
                    this.setState({
                        IsSelected: false
                    } as IStudioComponentState);
                }
            }} />;
    }
}