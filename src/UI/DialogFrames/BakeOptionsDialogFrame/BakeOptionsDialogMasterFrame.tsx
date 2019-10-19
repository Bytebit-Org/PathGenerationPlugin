import BakeCurrentPathToModuleScriptRelativeToSelectedModel from "HelperFunctions/BakeCurrentPathToModuleScriptRelativeToSelectedModel";
import LayoutOrderGenerator from "UI/Tooling/LayoutOrderGenerator";
import PluginSharedState from "PluginSharedState";
import Roact from "@rbxts/roact";
import { Selection } from "@rbxts/services";
import { StudioFrame, StudioTextBox, StudioTextButton, StudioTextLabel, StudioToggle } from "@rbxts/roblox-RoactStudioComponents";

interface IProps {
	OnOptionsConfirmedCallback?: () => void
}

interface IState {
	BakeScriptName: string;
	BezierApproximation: {
		IsEnabled: boolean;
		MinDistanceBetweenCurvePoints?: number;
	};
	ErrorMessages?: Array<string>;
}

export = class BakeOptionsDialogMasterFrame extends Roact.Component<IProps, IState> {
	private readonly _SelectionChangedConnection: RBXScriptConnection;

    constructor(props: any) {
		super(props);
		
		this.setState({
			BakeScriptName: "PathGenBake",
			BezierApproximation: {
				IsEnabled: false,
				MinDistanceBetweenCurvePoints: 2
			},
			ErrorMessages: this.getErrorMessages(),
		} as IState);

		this._SelectionChangedConnection = Selection.SelectionChanged.Connect(() => {
			this.setState({
				ErrorMessages: this.getErrorMessages()
			} as IState);
		});
	}

	public render() : Roact.Element {
		const theme = settings().Studio.Theme;
		const layoutOrderGenertor = new LayoutOrderGenerator();
		
		return <StudioFrame
			Key={"MasterFrame"}>
			<uilistlayout
				Key={"UIListLayout"}
				Padding={new UDim(0, 1)}
				FillDirection={Enum.FillDirection.Vertical}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				SortOrder={Enum.SortOrder.LayoutOrder}
				VerticalAlignment={Enum.VerticalAlignment.Top} />
			<textlabel
				Key={"TitleLabel"}
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				Font={Enum.Font.SourceSansBold}
				LayoutOrder={layoutOrderGenertor.GetNextLayoutOrder()}
				Position={new UDim2(0.5, 0, 0, 0)}
				TextColor3={theme.GetColor(Enum.StudioStyleGuideColor.TitlebarText)}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextYAlignment={Enum.TextYAlignment.Center}
				Text={"Bake options"}
				TextSize={24}
				Size={new UDim2(1, -8, 0, 28)} />
			<frame
				Key={"MarginFrame1"}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				LayoutOrder={layoutOrderGenertor.GetNextLayoutOrder()}
				Size={new UDim2(1, 0, 0, 8)} />
			<frame
				Key={"BasicDetailsOptionsFrame"}
				BackgroundTransparency={1}
				LayoutOrder={layoutOrderGenertor.GetNextLayoutOrder()}
				Size={new UDim2(0.9, 0, 0, 25)}>
				<uilistlayout
					Key={"UIListLayout"}
					Padding={new UDim(0, 1)}
					FillDirection={Enum.FillDirection.Vertical}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Top} />
				<frame
					Key={"NameFrame"}
					BackgroundTransparency={1}
					LayoutOrder={1}
					Size={new UDim2(1, 0, 1, 0)}>
					<uilistlayout
						Key={"UIListLayout"}
						Padding={new UDim(0, 1)}
						FillDirection={Enum.FillDirection.Horizontal}
						HorizontalAlignment={Enum.HorizontalAlignment.Left}
						SortOrder={Enum.SortOrder.LayoutOrder}
						VerticalAlignment={Enum.VerticalAlignment.Center} />
					<StudioTextLabel
						LayoutOrder={1}
						Text={"Bake script name"}
						TextXAlignment={Enum.TextXAlignment.Left}
						Width={new UDim(0.7, 0)} />
					<StudioTextBox
						Key={"NameTextBox"}
						Active={true}
						ClearTextOnFocus={false}
						InputValidationCallback={(newValue: string) => {
							return newValue !== undefined && newValue !== "";
						}}
						LayoutOrder={2}
						Text={this.state.BakeScriptName}
						TextXAlignment={Enum.TextXAlignment.Left}
						Width={new UDim(0.3, 0)}

						// Events
						Events={{
							ValueChanged: (actualInstance: TextBox, newValue: string) => {
								this.setState({
									BakeScriptName: newValue
								} as IState);
							}
						}} />
				</frame>
			</frame>
			<frame
				Key={"MarginFrame2"}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				LayoutOrder={layoutOrderGenertor.GetNextLayoutOrder()}
				Size={new UDim2(1, 0, 0, 8)} />
			<frame
				Key={"BezierApproximationOptionsFrame"}
				BackgroundTransparency={1}
				LayoutOrder={layoutOrderGenertor.GetNextLayoutOrder()}
				Size={new UDim2(0.9, 0, 0, 50)}>
				<uilistlayout
					Key={"UIListLayout"}
					Padding={new UDim(0, 1)}
					FillDirection={Enum.FillDirection.Vertical}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Top} />
				<frame
					Key={"EnabledOptionFrame"}
					BackgroundTransparency={1}
					LayoutOrder={1}
					Size={new UDim2(1, 0, 0.5, 0)}>
					<uilistlayout
						Key={"UIListLayout"}
						Padding={new UDim(0, 1)}
						FillDirection={Enum.FillDirection.Horizontal}
						HorizontalAlignment={Enum.HorizontalAlignment.Left}
						SortOrder={Enum.SortOrder.LayoutOrder}
						VerticalAlignment={Enum.VerticalAlignment.Center} />
					<StudioTextLabel
						LayoutOrder={1}
						Text={"Is bezier approximation enabled?"}
						TextXAlignment={Enum.TextXAlignment.Left}
						Width={new UDim(0.7, 0)} />
					<StudioToggle
						IsOnByDefault={this.state.BezierApproximation.IsEnabled}
						LayoutOrder={2}

						// Events
						Events={{
							Toggled: (isOn: boolean) => {
								this.setState({
									BezierApproximation: {
										IsEnabled: isOn,
										MinDistanceBetweenCurvePoints: this.state.BezierApproximation.MinDistanceBetweenCurvePoints
									}
								} as IState);
							}
						}} />
				</frame>
				<frame
					Key={"DistanceBetweenCurvePointsFrame"}
					BackgroundTransparency={1}
					LayoutOrder={layoutOrderGenertor.GetNextLayoutOrder()}
					Size={new UDim2(1, 0, 0.5, 0)}>
					<uilistlayout
						Key={"UIListLayout"}
						Padding={new UDim(0, 1)}
						FillDirection={Enum.FillDirection.Horizontal}
						HorizontalAlignment={Enum.HorizontalAlignment.Left}
						SortOrder={Enum.SortOrder.LayoutOrder}
						VerticalAlignment={Enum.VerticalAlignment.Center} />
					<frame
						Key={"InsettingFrame"}
						BackgroundTransparency={1}
						BorderSizePixel={0}
						LayoutOrder={1}
						Size={new UDim2(0, 8, 1, 0)} />
					<StudioTextLabel
						LayoutOrder={2}
						Active={this.state.BezierApproximation.IsEnabled}
						Text={"Distance between curve sample points (in studs)"}
						TextXAlignment={Enum.TextXAlignment.Left}
						Width={new UDim(0.7, -8)} />
					<StudioTextBox
						Active={this.state.BezierApproximation.IsEnabled}
						ClearTextOnFocus={false}
						InputValidationCallback={(newValue: string) => {
							return tonumber(newValue, 10) !== undefined;
						}}
						LayoutOrder={3}
						Text={tostring(this.state.BezierApproximation.MinDistanceBetweenCurvePoints)}
						TextXAlignment={Enum.TextXAlignment.Left}
						Width={new UDim(0.3, 0)}

						// Events
						Events={{
							ValueChanged: (actualInstance: TextBox, newValue: string) => {
								this.setState({
									BezierApproximation: {
										IsEnabled: this.state.BezierApproximation.IsEnabled,
										MinDistanceBetweenCurvePoints: tonumber(newValue)
									}
								} as IState);
							}
						}} />
				</frame>
			</frame>
			<frame
				Key={"MarginFrame3"}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				LayoutOrder={layoutOrderGenertor.GetNextLayoutOrder()}
				Size={new UDim2(1, 0, 0, 8)} />
			<StudioTextLabel
				Key={"ErrorMessageLabel"}
				LayoutOrder={layoutOrderGenertor.GetNextLayoutOrder()}
				Text={this.state.ErrorMessages.size() > 0 ? this.state.ErrorMessages[0] : ""}
				TextColorEnum={Enum.StudioStyleGuideColor.ErrorText} />
			<StudioTextButton
				Key={"ConfirmButton"}
				Active={this.state.ErrorMessages.size() === 0}
				AnchorPoint={new Vector2(0.5, 0)}
				LayoutOrder={layoutOrderGenertor.GetNextLayoutOrder()}
				Text={"Bake"}
				Width={new UDim(0.9, 0)}
				
				Events={{
					MouseButton1Click: () => {
						BakeCurrentPathToModuleScriptRelativeToSelectedModel({
							BezierApproximation: {
								IsEnabled: this.state.BezierApproximation.IsEnabled,
								MinDistanceBetweenCurvePoints: this.state.BezierApproximation.MinDistanceBetweenCurvePoints,
							},
							ScriptName: this.state.BakeScriptName
						});

						if (this.props.OnOptionsConfirmedCallback !== undefined) {
							this.props.OnOptionsConfirmedCallback();
						}
					}
				}}/>
		</StudioFrame>;
	}

	public willUnmount() {
		this._SelectionChangedConnection.Disconnect();
	}

	private getErrorMessages() : Array<string> {
		const errorMessages = new Array<string>();

		if (PluginSharedState.PathInfo === undefined) {
			errorMessages.push("No path to bake");
		}
		
		if (Selection.Get().size() === 0) {
			errorMessages.push("No model selected, cannot bake");
		}
		else {
			const firstSelection = Selection.Get()[0];
			if (!firstSelection.IsA("Model")) {
				errorMessages.push("Model must be selected first, cannot bake");
			}
			else {	
				const model = firstSelection as Model;
				if (model.PrimaryPart === undefined) {
					errorMessages.push("Model has no primary part, cannot bake");
				}
			}
		}

		return errorMessages;
	}
}