-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:48 PM Pacific Daylight Time

local TS = require(script.Parent.Parent.Parent.Parent.include.RuntimeLib);
local exports;
local Roact = TS.import(TS.getModule("roact").roact.src);
local StudioTextButton = TS.import(script.Parent.Parent.Parent, "RoactStudioComponents", "StudioTextButton");
local StudioTextBox = TS.import(script.Parent.Parent.Parent, "RoactStudioComponents", "StudioTextBox");
local PluginSharedState = TS.import(script.Parent.Parent.Parent.Parent, "PluginSharedState");
local PluginSharedConstants = TS.import(script.Parent.Parent.Parent.Parent, "PluginSharedConstants");
local Workspace = TS.import(TS.getModule("services")).Workspace;
local StudioImageButton = TS.import(script.Parent.Parent.Parent, "RoactStudioComponents", "StudioImageButton");
local CreateBezierControls = TS.import(script.Parent.Parent.Parent.Parent, "HelperFunctions", "CreateBezierControls");
local _PATHGEN_SPRITESHEET_IMAGE = PluginSharedConstants.AssetPaths.IconSpritesheetAsset;
local _BEZIER_WAYPOINT_ICON_RECT_OFFSET = Vector2.new(18, 0);
local _LINEAR_WAYPOINT_ICON_RECT_OFFSET = Vector2.new(0, 0);
local _WAYPOINT_TYPE_ICON_RECT_SIZE = Vector2.new(18, 18);
local _STUDIO_ARROWS_SPRITESHEET_IMAGE = PluginSharedConstants.AssetPaths.StudioArrowsSpritesheetAsset;
local _STUDIO_RIGHT_ARROW_RECT_OFFSET = Vector2.new(12, 0);
local _STUDIO_DOWN_ARROW_RECT_OFFSET = Vector2.new(24, 0);
local _STUDIO_ARROW_RECT_SIZE = Vector2.new(12, 12);
local _PROPERTY_LINE_HEIGHT_OFFSET = StudioTextBox.HeightUDim.Offset + 4;
local _NUMBER_OF_PROPERTY_LINES = 1;
local _0;
do
	local WaypointListItem = Roact.Component:extend("WaypointListItem");
	function WaypointListItem:init(props)
	end;
	function WaypointListItem:_GetHeight()
		if self.props.IsExpanded then
			return WaypointListItem.UnexpandedHeightOffset + _NUMBER_OF_PROPERTY_LINES * _PROPERTY_LINE_HEIGHT_OFFSET;
		else
			return WaypointListItem.UnexpandedHeightOffset;
		end;
	end;
	function WaypointListItem:render()
		local theme = settings().Studio.Theme;
		local buttonSize = StudioTextButton.HeightUDim.Offset;
		local expansionHeightDelta = _NUMBER_OF_PROPERTY_LINES * _PROPERTY_LINE_HEIGHT_OFFSET;
		local listItemName = "Waypoint_" .. tostring(self.props.WaypointIndex);
		local isWaypointLinear = self.props.Waypoint.ExitingHandleVisualizationPart == nil and self.props.Waypoint.EnteringHandleVisualizationPart == nil;
		local waypointTypeIconRectOffset;
		if isWaypointLinear then
			waypointTypeIconRectOffset = _LINEAR_WAYPOINT_ICON_RECT_OFFSET;
		else
			waypointTypeIconRectOffset = _BEZIER_WAYPOINT_ICON_RECT_OFFSET;
		end;
		return Roact.createElement("Frame", {
			Active = true,
			BackgroundColor3 = theme:GetColor(Enum.StudioStyleGuideColor.MainBackground),
			BorderSizePixel = 0,
			LayoutOrder = self.props.WaypointIndex,
			Size = UDim2.new(1, 0, 0, self:_GetHeight()),
			Visible = true 
		}		, {
			["InnerFrame"] = Roact.createElement("Frame", {
				AnchorPoint = Vector2.new(0.5, 0),
				BackgroundTransparency = 1,
				Position = UDim2.new(0.5, 0, 0, 4),
				Size = UDim2.new(1, -8, 1, -8) 
			}			, {
				["MainInfo"] = Roact.createElement("Frame", {
					Active = true,
					BackgroundTransparency = 1,
					Position = UDim2.new(0, 0, 0, 0),
					Size = UDim2.new(1, 0, 0, WaypointListItem.UnexpandedHeightOffset - 8) 
				}				, {
					Roact.createElement("TextButton", {
						Active = false,
						BackgroundTransparency = 1,
						Position = UDim2.new(0, 0, 0, 0),
						Size = UDim2.new(1, 0, 1, 0),
						TextTransparency = 1,
						[Roact.Event.MouseButton2Click] = function()
							PluginSharedState.PathInfo.SelectedWaypointIndex = self.props.WaypointIndex;
							PluginSharedState.PluginMenus[PluginSharedConstants.MenuNames.InsertWaypointMenuName]:ShowAsync();
						end 
					}),
					["ExpandButton"] = Roact.createElement("ImageButton", {
						AnchorPoint = Vector2.new(0.5, 0.5),
						BackgroundTransparency = 1,
						Image = _STUDIO_ARROWS_SPRITESHEET_IMAGE,
						ImageRectOffset = _STUDIO_RIGHT_ARROW_RECT_OFFSET,
						ImageRectSize = _STUDIO_ARROW_RECT_SIZE,
						Position = UDim2.new(0, 10, 0.5, 0),
						Size = UDim2.new(0, 12, 0, 12),
						Visible = not self.props.IsExpanded and false,
						[Roact.Event.MouseButton1Click] = function()
							self.props.ExpansionChangeCallback(expansionHeightDelta);
						end 
					}),
					["CollapseButton"] = Roact.createElement("ImageButton", {
						AnchorPoint = Vector2.new(0.5, 0.5),
						BackgroundTransparency = 1,
						Image = _STUDIO_ARROWS_SPRITESHEET_IMAGE,
						ImageRectOffset = _STUDIO_DOWN_ARROW_RECT_OFFSET,
						ImageRectSize = _STUDIO_ARROW_RECT_SIZE,
						Position = UDim2.new(0, 10, 0.5, 0),
						Size = UDim2.new(0, 12, 0, 12),
						Visible = self.props.IsExpanded and false,
						[Roact.Event.MouseButton1Click] = function()
							self.props.ExpansionChangeCallback(-1 * expansionHeightDelta);
						end 
					}),
					["WaypointTypeIcon"] = Roact.createElement(StudioImageButton, {
						AnchorPoint = Vector2.new(0, 0.5),
						Image = _PATHGEN_SPRITESHEET_IMAGE,
						ImageRectOffset = waypointTypeIconRectOffset,
						ImageRectSize = _WAYPOINT_TYPE_ICON_RECT_SIZE,
						Position = UDim2.new(0, 20, 0.5, 0),
						Width = UDim.new(0, buttonSize),
						Events = {
							MouseButton1Click = function()
								if isWaypointLinear then
									self.props.Waypoint.VisualizationPart:FindFirstChildOfClass("SelectionBox").Visible = false;
									self.props.Waypoint.VisualizationPart:FindFirstChildOfClass("SelectionSphere").Visible = true;
									CreateBezierControls(self.props.Waypoint);
								else
									self.props.Waypoint.VisualizationPart:FindFirstChildOfClass("SelectionBox").Visible = true;
									self.props.Waypoint.VisualizationPart:FindFirstChildOfClass("SelectionSphere").Visible = false;
									if self.props.Waypoint.ExitingHandleVisualizationPart ~= nil then
										self.props.Waypoint.ExitingHandleVisualizationPart:Destroy();
										self.props.Waypoint.ExitingHandleVisualizationPart = nil;
									end;
									if self.props.Waypoint.EnteringHandleVisualizationPart ~= nil then
										self.props.Waypoint.EnteringHandleVisualizationPart:Destroy();
										self.props.Waypoint.EnteringHandleVisualizationPart = nil;
									end;
								end;
								PluginSharedState.Updated:go();
							end;
						} 
					}),
					["NameTextBox"] = Roact.createElement("TextBox", {
						Active = true,
						AnchorPoint = Vector2.new(0, 0.5),
						BackgroundTransparency = 1,
						PlaceholderColor3 = theme:GetColor(Enum.StudioStyleGuideColor.MainText, Enum.StudioStyleGuideModifier.Disabled),
						PlaceholderText = listItemName,
						Position = UDim2.new(0, 48, 0.5, 0),
						Size = UDim2.new(1, -1 * (48 + 1 * (buttonSize + 4) + 4), 1, 0),
						Text = self.props.Waypoint.Name,
						TextColor3 = theme:GetColor(Enum.StudioStyleGuideColor.MainText),
						TextSize = 10,
						TextXAlignment = Enum.TextXAlignment.Left,
						TextYAlignment = Enum.TextYAlignment.Center,
						Visible = true,
						[Roact.Event.FocusLost] = function(actualInstance)
							self.props.Waypoint.Name = actualInstance.Text;
						end 
					}),
					["LocateButton"] = Roact.createElement(StudioTextButton, {
						Active = true,
						AnchorPoint = Vector2.new(0, 0.5),
						Text = "📍",
						Position = UDim2.new(1, -1 * (buttonSize + 2), 0.5, 0),
						Width = UDim.new(0, buttonSize),
						Events = {
							MouseButton1Click = function()
								local currentCameraCFrame = Workspace.CurrentCamera.CFrame;
								local newCameraPosition = (self.props.Waypoint.VisualizationPart.Position + ((currentCameraCFrame.LookVector * (10))));
								Workspace.CurrentCamera.CFrame = CFrame.new(newCameraPosition, self.props.Waypoint.VisualizationPart.Position);
							end;
						} 
					})
				}),
				["Properties"] = Roact.createElement("Frame", {
					BackgroundTransparency = 1,
					Position = UDim2.new(0, 60, 0, WaypointListItem.UnexpandedHeightOffset - 4),
					Size = UDim2.new(1, -60, 0, _NUMBER_OF_PROPERTY_LINES * _PROPERTY_LINE_HEIGHT_OFFSET),
					Visible = self.props.IsExpanded 
				}				, {
					["UIListLayout"] = Roact.createElement("UIListLayout", {
						Padding = UDim.new(0, 0),
						FillDirection = Enum.FillDirection.Vertical,
						HorizontalAlignment = Enum.HorizontalAlignment.Center,
						SortOrder = Enum.SortOrder.LayoutOrder,
						VerticalAlignment = Enum.VerticalAlignment.Top 
					}),
					["DistanceBetweenNodes"] = Roact.createElement("Frame", {
						BackgroundTransparency = 1,
						LayoutOrder = 1,
						Size = UDim2.new(1, 0, 0, _PROPERTY_LINE_HEIGHT_OFFSET) 
					}					, {
						["TextLabel"] = Roact.createElement("TextLabel", {
							AnchorPoint = Vector2.new(0, 0.5),
							BackgroundTransparency = 1,
							Position = UDim2.new(0, 0, 0.5, 0),
							Size = UDim2.new(1, -88, 1, 0),
							Text = "Distance between nodes",
							TextColor3 = theme:GetColor(Enum.StudioStyleGuideColor.MainText),
							TextSize = 10,
							TextXAlignment = Enum.TextXAlignment.Left,
							TextYAlignment = Enum.TextYAlignment.Center 
						})
					})
				})
			})
		});
	end;
	WaypointListItem.UnexpandedHeightOffset = 30;
	_0 = WaypointListItem;
end;
exports = _0;
return exports;
