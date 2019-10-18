/// <reference types="@rbxts/types/plugin" />

import Roact from "@rbxts/roact";
import IStudioComponentState = require("./IStudioComponentState");
import { DeriveColorModifier } from "./StudioComponentUtilities";
import IStudioComponentProperties = require("./IStudioComponentProperties");

interface IStudioTextButtonProperties extends IStudioComponentProperties {
    AnchorPoint?: Vector2,
    BackgroundColorEnum?: Enum.StudioStyleGuideColor,
    BorderColorEnum?: Enum.StudioStyleGuideColor,
    Events?: {
        MouseButton1Click?: () => void
    },
    Position?: UDim2,
    Text: string,
    TextColorEnum?: Enum.StudioStyleGuideColor,
    Width?: UDim,
}

export = class StudioTextButton extends Roact.Component<IStudioTextButtonProperties, IStudioComponentState> {
    public static readonly HeightUDim = new UDim(0, 22);
    public static readonly defaultProps = {
        Active: true,
        AnchorPoint: new Vector2(0, 0),
        BackgroundColorEnum: Enum.StudioStyleGuideColor.Button,
        BorderColorEnum: Enum.StudioStyleGuideColor.ButtonBorder,
        LayoutOrder: 0,
        Position: new UDim2(0, 0, 0, 0),
        Rotation: 0,
        TextColorEnum: Enum.StudioStyleGuideColor.ButtonText,
        Width: new UDim(1, 0),
        Visible: true,
    } as IStudioTextButtonProperties;

    constructor(props: IStudioTextButtonProperties) {
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

        return <textbutton
            Active={this.props.Active}
            AnchorPoint={this.props.AnchorPoint}
            AutoButtonColor={false}
            BackgroundColor3={theme.GetColor(this.props.BackgroundColorEnum, styleGuideModifier)}
            BorderColor3={theme.GetColor(this.props.BorderColorEnum, styleGuideModifier)}
			BorderSizePixel={1}
			Font={Enum.Font.SourceSans}
            LayoutOrder={this.props.LayoutOrder}
            Position={this.props.Position}
            Rotation={this.props.Rotation}
            Size={new UDim2(this.props.Width, StudioTextButton.HeightUDim)}
            Text={this.props.Text}
            TextColor3={theme.GetColor(this.props.TextColorEnum, styleGuideModifier)}
            TextSize={16}
            TextXAlignment={Enum.TextXAlignment.Center}
            TextYAlignment={Enum.TextYAlignment.Center}
            Visible={this.props.Visible}

            // Events
            Event={{
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
                MouseButton1Down: () => {
                    this.setState({
                        IsPressed: true
                    } as IStudioComponentState);
                },
                MouseButton1Up: () => {
                    this.setState({
                        IsPressed: false
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
                },
                MouseButton1Click: () => {
                    if (this.props.Events === undefined || this.props.Events.MouseButton1Click === undefined) {
                        return;
                    }
                    this.props.Events.MouseButton1Click();
                }
            }} />;
    }
}