import Roact from "@rbxts/roact";
import EditablePathGenWaypoint = require("PathGen/EditablePathGenWaypoint");
import StudioTextButton = require("UI/RoactStudioComponents/StudioTextButton");
import StudioTextBox = require("UI/RoactStudioComponents/StudioTextBox");
import PluginSharedState = require("PluginSharedState");
import PluginSharedConstants = require("PluginSharedConstants");
import { Workspace } from "@rbxts/services";
import StudioImageButton = require("UI/RoactStudioComponents/StudioImageButton");
import CreateBezierControls = require("HelperFunctions/CreateBezierControls");

interface IWaypointListItemProperties {
	ExpansionChangeCallback: (addedHeight: number) => void,
	IsExpanded: boolean,
	Waypoint: EditablePathGenWaypoint,
	WaypointIndex: number,
}

// PathGen Spritesheet Info
const _PATHGEN_SPRITESHEET_IMAGE = PluginSharedConstants.AssetPaths.IconSpritesheetAsset;
const _BEZIER_WAYPOINT_ICON_RECT_OFFSET = new Vector2(18, 0);
const _LINEAR_WAYPOINT_ICON_RECT_OFFSET = new Vector2(0, 0);
const _WAYPOINT_TYPE_ICON_RECT_SIZE = new Vector2(18, 18);

// Studio Spritesheet Info
const _STUDIO_ARROWS_SPRITESHEET_IMAGE = PluginSharedConstants.AssetPaths.StudioArrowsSpritesheetAsset;
const _STUDIO_RIGHT_ARROW_RECT_OFFSET = new Vector2(12, 0);
const _STUDIO_DOWN_ARROW_RECT_OFFSET = new Vector2(24, 0);
const _STUDIO_ARROW_RECT_SIZE = new Vector2(12, 12);

const _PROPERTY_LINE_HEIGHT_OFFSET = StudioTextBox.HeightUDim.Offset + 4;
const _NUMBER_OF_PROPERTY_LINES = 1;

export = class WaypointListItem extends Roact.Component<IWaypointListItemProperties> {
	public static UnexpandedHeightOffset = 30;

	constructor(props: IWaypointListItemProperties) {
		super(props);
	}

	private _GetHeight(): number {
		if (this.props.IsExpanded) {
			return WaypointListItem.UnexpandedHeightOffset + _NUMBER_OF_PROPERTY_LINES * _PROPERTY_LINE_HEIGHT_OFFSET;
		}
		else {
			return WaypointListItem.UnexpandedHeightOffset;
		}
	}

	public render(): Roact.Element {
		const theme = settings().Studio.Theme;

		const buttonSize = StudioTextButton.HeightUDim.Offset;
		const expansionHeightDelta = _NUMBER_OF_PROPERTY_LINES * _PROPERTY_LINE_HEIGHT_OFFSET;
		const listItemName = `Waypoint_${this.props.WaypointIndex}`;
		const isWaypointLinear = this.props.Waypoint.ExitingHandleVisualizationPart === undefined && this.props.Waypoint.EnteringHandleVisualizationPart === undefined;
		const waypointTypeIconRectOffset = isWaypointLinear ? _LINEAR_WAYPOINT_ICON_RECT_OFFSET : _BEZIER_WAYPOINT_ICON_RECT_OFFSET;

		return <frame
			Key={listItemName}
			Active={true}
			BackgroundColor3={theme.GetColor(Enum.StudioStyleGuideColor.MainBackground)}
			BorderSizePixel={0}
			LayoutOrder={this.props.WaypointIndex}
			Size={new UDim2(1, 0, 0, this._GetHeight())}
			Visible={true}>
			<frame
				Key={"InnerFrame"}
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				Position={new UDim2(0.5, 0, 0, 4)}
				Size={new UDim2(1, -8, 1, -8)}>
				<frame
					Key={"MainInfo"}
					Active={true}
					BackgroundTransparency={1}
					Position={new UDim2(0, 0, 0, 0)}
					Size={new UDim2(1, 0, 0, WaypointListItem.UnexpandedHeightOffset - 8)}>
					<textbutton
						Active={false}
						BackgroundTransparency={1}
						Position={new UDim2(0, 0, 0, 0)}
						Size={new UDim2(1, 0, 1, 0)}
						TextTransparency={1}

						Event={{
							MouseButton2Click: () => {
								PluginSharedState.PathInfo.SelectedWaypointIndex = this.props.WaypointIndex;
								PluginSharedState.PluginMenus[PluginSharedConstants.MenuNames.InsertWaypointMenuName].ShowAsync();
							}
						}} />
					<imagebutton
						Key={"ExpandButton"}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundTransparency={1}
						Image={_STUDIO_ARROWS_SPRITESHEET_IMAGE}
						ImageRectOffset={_STUDIO_RIGHT_ARROW_RECT_OFFSET}
						ImageRectSize={_STUDIO_ARROW_RECT_SIZE}
						Position={new UDim2(0, 10, 0.5, 0)}
						Size={new UDim2(0, 12, 0, 12)}
						Visible={!this.props.IsExpanded && false}
						Event={{
							MouseButton1Click: () => {
								this.props.ExpansionChangeCallback(expansionHeightDelta);
							}
						}} />
					<imagebutton
						Key={"CollapseButton"}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundTransparency={1}
						Image={_STUDIO_ARROWS_SPRITESHEET_IMAGE}
						ImageRectOffset={_STUDIO_DOWN_ARROW_RECT_OFFSET}
						ImageRectSize={_STUDIO_ARROW_RECT_SIZE}
						Position={new UDim2(0, 10, 0.5, 0)}
						Size={new UDim2(0, 12, 0, 12)}
						Visible={this.props.IsExpanded && false}
						Event={{
							MouseButton1Click: () => {
								this.props.ExpansionChangeCallback(-1 * expansionHeightDelta);
							}
						}} />
					<StudioImageButton
						Key={"WaypointTypeIcon"}
						AnchorPoint={new Vector2(0, 0.5)}
						Image={_PATHGEN_SPRITESHEET_IMAGE}
						ImageRectOffset={waypointTypeIconRectOffset}
						ImageRectSize={_WAYPOINT_TYPE_ICON_RECT_SIZE}
						Position={new UDim2(0, 20, 0.5, 0)}
						Width={new UDim(0, buttonSize)}

						Events={{
							MouseButton1Click: () => {
								if (isWaypointLinear) {
									this.props.Waypoint.VisualizationPart.FindFirstChildOfClass("SelectionBox").Visible = false;
									this.props.Waypoint.VisualizationPart.FindFirstChildOfClass("SelectionSphere").Visible = true;
									CreateBezierControls(this.props.Waypoint);
								}
								else {
									this.props.Waypoint.VisualizationPart.FindFirstChildOfClass("SelectionBox").Visible = true;
									this.props.Waypoint.VisualizationPart.FindFirstChildOfClass("SelectionSphere").Visible = false;

									if (this.props.Waypoint.ExitingHandleVisualizationPart !== undefined) {
										this.props.Waypoint.ExitingHandleVisualizationPart.Destroy();
										this.props.Waypoint.ExitingHandleVisualizationPart = undefined;
									}

									if (this.props.Waypoint.EnteringHandleVisualizationPart !== undefined) {
										this.props.Waypoint.EnteringHandleVisualizationPart.Destroy();
										this.props.Waypoint.EnteringHandleVisualizationPart = undefined;
									}
								}

								PluginSharedState.Updated.go();
							}
						}} />
					<textbox
						Key={"NameTextBox"}
						Active={true}
						AnchorPoint={new Vector2(0, 0.5)}
						BackgroundTransparency={1}
						PlaceholderColor3={theme.GetColor(Enum.StudioStyleGuideColor.MainText, Enum.StudioStyleGuideModifier.Disabled)}
						PlaceholderText={listItemName}
						Position={new UDim2(0, 48, 0.5, 0)}
						Size={new UDim2(1, -1 * (48 + 1 * (buttonSize + 4) + 4), 1, 0)}
						Text={this.props.Waypoint.Name}
						TextColor3={theme.GetColor(Enum.StudioStyleGuideColor.MainText)}
						TextSize={10}
						TextXAlignment={Enum.TextXAlignment.Left}
						TextYAlignment={Enum.TextYAlignment.Center}
						Visible={true}

						Event={{
							FocusLost: (actualInstance) => {
								this.props.Waypoint.Name = actualInstance.Text;
							},
						}} />
					<StudioTextButton
						Key={"LocateButton"}
						Active={true}
						AnchorPoint={new Vector2(0, 0.5)}
						Text={"📍"}
						Position={new UDim2(1, -1 * (buttonSize + 2), 0.5, 0)}
						Width={new UDim(0, buttonSize)}

						Events={{
							MouseButton1Click: () => {
								// TODO: Improve this
								let currentCameraCFrame = Workspace.CurrentCamera.CFrame
								let newCameraPosition = this.props.Waypoint.VisualizationPart.Position.add(currentCameraCFrame.LookVector.mul(10))
								Workspace.CurrentCamera.CFrame = new CFrame(newCameraPosition, this.props.Waypoint.VisualizationPart.Position)
							}
						}} />
				</frame>
				<frame
					Key={"Properties"}
					BackgroundTransparency={1}
					Position={new UDim2(0, 60, 0, WaypointListItem.UnexpandedHeightOffset - 4)}
					Size={new UDim2(1, -60, 0, _NUMBER_OF_PROPERTY_LINES * _PROPERTY_LINE_HEIGHT_OFFSET)}
					Visible={this.props.IsExpanded}>
					<uilistlayout
						Key={"UIListLayout"}
						Padding={new UDim(0, 0)}
						FillDirection={Enum.FillDirection.Vertical}
						HorizontalAlignment={Enum.HorizontalAlignment.Center}
						SortOrder={Enum.SortOrder.LayoutOrder}
						VerticalAlignment={Enum.VerticalAlignment.Top} />
					<frame
						Key={"DistanceBetweenNodes"}
						BackgroundTransparency={1}
						LayoutOrder={1}
						Size={new UDim2(1, 0, 0, _PROPERTY_LINE_HEIGHT_OFFSET)}>
						<textlabel
							Key={"TextLabel"}
							AnchorPoint={new Vector2(0, 0.5)}
							BackgroundTransparency={1}
							Position={new UDim2(0, 0, 0.5, 0)}
							Size={new UDim2(1, -88, 1, 0)}
							Text={"Distance between nodes"}
							TextColor3={theme.GetColor(Enum.StudioStyleGuideColor.MainText)}
							TextSize={10}
							TextXAlignment={Enum.TextXAlignment.Left}
							TextYAlignment={Enum.TextYAlignment.Center} />
					</frame>
				</frame>
			</frame>
		</frame>
	}
}