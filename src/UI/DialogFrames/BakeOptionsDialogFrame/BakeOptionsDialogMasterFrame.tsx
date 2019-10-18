import Roact from "@rbxts/roact";
import StudioFrame from "UI/RoactStudioComponents/StudioFrame";
import StudioTextBox from "UI/RoactStudioComponents/StudioTextBox";
import StudioTextLabel from "UI/RoactStudioComponents/StudioTextLabel";
import StudioToggle from "UI/RoactStudioComponents/StudioToggle";
import StudioTextButton from "UI/RoactStudioComponents/StudioTextButton";
import LayoutOrderGenerator from "UI/Tooling/LayoutOrderGenerator";
import BakeCurrentPathToModuleScriptRelativeToSelectedModel from "HelperFunctions/BakeCurrentPathToModuleScriptRelativeToSelectedModel";

interface IProps {
	OnOptionsConfirmedCallback?: () => void
}

interface IState {
	BezierApproximation: {
		IsEnabled: boolean;
		MinDistanceBetweenCurvePoints?: number;
	}
}

export = class BakeOptionsDialogMasterFrame extends Roact.Component<IProps, IState> {
    constructor(props: any) {
		super(props);
		
		this.setState({
			BezierApproximation: {
				IsEnabled: false,
				MinDistanceBetweenCurvePoints: 2
			}
		} as IState);
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
				Key={"MarginFrame"}
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
						VerticalAlignment={Enum.VerticalAlignment.Top} />
					<StudioTextLabel
						LayoutOrder={1}
						Text={"Is bezier approximation enabled?"}
						TextXAlignment={Enum.TextXAlignment.Left}
						Width={new UDim(0.75, 0)} />
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
						VerticalAlignment={Enum.VerticalAlignment.Top} />
					<StudioTextLabel
						LayoutOrder={1}
						Active={this.state.BezierApproximation.IsEnabled}
						Text={"Distance between curve sample points (in studs)"}
						TextXAlignment={Enum.TextXAlignment.Left}
						Width={new UDim(0.75, 0)} />
					<StudioTextBox
						Active={this.state.BezierApproximation.IsEnabled}
						ClearTextOnFocus={false}
						InputValidationCallback={(newValue: string) => {
							return tonumber(newValue, 10) !== undefined;
						}}
						LayoutOrder={2}
						Text={tostring(this.state.BezierApproximation.MinDistanceBetweenCurvePoints)}
						TextXAlignment={Enum.TextXAlignment.Left}
						Width={new UDim(0.25, 0)}

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
				<frame
					Key={"MarginFrame"}
					BackgroundTransparency={1}
					BorderSizePixel={0}
					LayoutOrder={layoutOrderGenertor.GetNextLayoutOrder()}
					Size={new UDim2(1, 0, 0, 8)} />
				<StudioTextButton
					Key={"ConfirmButton"}
					LayoutOrder={layoutOrderGenertor.GetNextLayoutOrder()}
					Text={"Bake"}
					Width={new UDim(1, 0)}
					
					Events={{
						MouseButton1Click: () => {
							BakeCurrentPathToModuleScriptRelativeToSelectedModel({
								BezierApproximation: {
									IsEnabled: this.state.BezierApproximation.IsEnabled,
									MinDistanceBetweenCurvePoints: this.state.BezierApproximation.MinDistanceBetweenCurvePoints,
								}
							});

							if (this.props.OnOptionsConfirmedCallback !== undefined) {
								this.props.OnOptionsConfirmedCallback();
							}
						}
					}}/>
			</frame>
		</StudioFrame>;
	}
}