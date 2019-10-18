/// <reference types="@rbxts/types/plugin" />

import Roact from "@rbxts/roact";
import IStudioComponentState = require("./IStudioComponentState");
import { DeriveColorModifier } from "./StudioComponentUtilities";
import IStudioComponentProperties = require("./IStudioComponentProperties");

interface IProps extends IStudioComponentProperties {
	AnchorPoint?: Vector2;
	ClearTextOnFocus?: boolean;
    Events?: {
        ValueChanged?: (actualInstance: TextBox, newValue: string) => void
	};
	InputValidationCallback?: (newValue: string) => boolean;
    PlaceholderText?: string;
    Position?: UDim2;
    Text?: string;
    TextXAlignment?: Enum.TextXAlignment;
    Width?: UDim;
}

interface IState extends IStudioComponentState {
	CurrentText: string;
}

export = class StudioTextBox extends Roact.Component<IProps, IState> {
    public static readonly HeightUDim = new UDim(0, 22);
    public static readonly defaultProps = {
        Active: true,
		AnchorPoint: new Vector2(0, 0),
		ClearTextOnFocus: true,
        LayoutOrder: 0,
        PlaceholderText: "",
        Position: new UDim2(0, 0, 0, 0),
		Rotation: 0,
		Text: "",
        TextXAlignment: Enum.TextXAlignment.Center,
        Width: new UDim(1, 0),
        Visible: true,
	} as IProps;
	
	private _PreviousValidValue?: string;

    constructor(props: IProps) {
        super(props);
        
        this.setState({
			CurrentText: this.props.Text,
            IsMouseOver: false,
            IsPressed: false,
            IsSelected: false
		} as IStudioComponentState);
		
		if (props.Text !== undefined) {
			this._PreviousValidValue = props.Text;
		}
    }

    public render(): Roact.Element {
        const theme = settings().Studio.Theme;
        const styleGuideModifier = DeriveColorModifier(this.props, this.state);

        return <frame
            Active={this.props.Active}
            AnchorPoint={this.props.AnchorPoint}
            BackgroundColor3={theme.GetColor(Enum.StudioStyleGuideColor.InputFieldBackground, styleGuideModifier)}
            BorderColor3={theme.GetColor(Enum.StudioStyleGuideColor.InputFieldBorder, styleGuideModifier)}
            BorderSizePixel={1}
            LayoutOrder={this.props.LayoutOrder}
            Position={this.props.Position}
            Rotation={this.props.Rotation}
            Size={new UDim2(this.props.Width, StudioTextBox.HeightUDim)}
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
            }}>
				<textbox
					Key={"TextBox"}
					Active={true}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					BorderSizePixel={0}
					ClearTextOnFocus={this.props.ClearTextOnFocus}
					Font={Enum.Font.SourceSans}
					PlaceholderColor3={theme.GetColor(Enum.StudioStyleGuideColor.MainText, Enum.StudioStyleGuideModifier.Disabled)}
					PlaceholderText={this.props.PlaceholderText}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					Size={new UDim2(1, -4, 1, -4)}
					Text={this.props.Text}
					TextColor3={theme.GetColor(Enum.StudioStyleGuideColor.MainText, styleGuideModifier)}
					TextSize={16}
					TextXAlignment={this.props.TextXAlignment}
					TextYAlignment={Enum.TextYAlignment.Center}
					Visible={this.props.Active}

					// Events
					Event={{
						FocusLost: (actualInstance) => {
							if (this.props.InputValidationCallback !== undefined) {
								const isCurrentInputValid = this.props.InputValidationCallback(actualInstance.Text);
								if (isCurrentInputValid) {
									this._PreviousValidValue = actualInstance.Text;
								}
								else {
									actualInstance.Text = this._PreviousValidValue;
								}
							}
		
							if (this.props.Events !== undefined && this.props.Events.ValueChanged !== undefined) {
								this.props.Events.ValueChanged(actualInstance, actualInstance.Text);
							}

							this.setState({
								CurrentText: actualInstance.Text
							} as IState);
						}
					}} />
				<textlabel
					Key={"DisabledTextLabel"} 
					Active={false}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					BorderSizePixel={0}
					Font={Enum.Font.SourceSans}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					Size={new UDim2(1, -4, 1, -4)}
					Text={this.state.CurrentText !== undefined && this.state.CurrentText !== "" ? this.state.CurrentText : this.props.PlaceholderText}
					TextColor3={theme.GetColor(Enum.StudioStyleGuideColor.MainText, Enum.StudioStyleGuideModifier.Disabled)}
					TextSize={16}
					TextXAlignment={this.props.TextXAlignment}
					TextYAlignment={Enum.TextYAlignment.Center}
					Visible={!this.props.Active} />
			</frame>;
    }
}