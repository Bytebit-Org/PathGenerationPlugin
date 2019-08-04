-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:48 PM Pacific Daylight Time

local TS = require(script.Parent.Parent.Parent.include.RuntimeLib);
local exports;
local Roact = TS.import(TS.getModule("roact").roact.src);
local StudioScrollingFrame = TS.import(script.Parent.Parent, "RoactStudioComponents", "StudioScrollingFrame");
local Header = TS.import(script, "Header");
local WaypointListItem = TS.import(script, "WaypointListItem");
local StudioTextButton = TS.import(script.Parent.Parent, "RoactStudioComponents", "StudioTextButton");
local PluginSharedState = TS.import(script.Parent.Parent.Parent, "PluginSharedState");
local InsertWaypoint = TS.import(script.Parent.Parent.Parent, "HelperFunctions", "InsertWaypoint");
local _0;
do
	local WaypointsListScreen = Roact.Component:extend("WaypointsListScreen");
	function WaypointsListScreen:init(props)
		self:setState({
			CanvasHeightAddend = 0;
			ExpandedWaypoints = {};
			Waypoints = {};
		});
		PluginSharedState.Updated:bind(function()
			return self:_OnPluginSharedStateUpdate();
		end);
	end;
	function WaypointsListScreen:_OnPluginSharedStateUpdate()
		if PluginSharedState.PathInfo == nil then
			self:setState({
				CanvasHeightAddend = 0;
				ExpandedWaypoints = {};
				Waypoints = {};
			});
			return nil;
		end;
		self:setState({
			Waypoints = TS.array_copy(PluginSharedState.PathInfo.Waypoints);
		});
	end;
	function WaypointsListScreen:shouldUpdate()
		return true;
	end;
	function WaypointsListScreen:render()
		local theme = settings().Studio.Theme;
		if PluginSharedState.PathInfo == nil then
			return Roact.createElement("TextLabel", {
				BackgroundTransparency = 1,
				Position = UDim2.new(0, 0, 0, 0),
				Size = UDim2.new(1, 0, 1, 0),
				Text = "No path loaded",
				TextColor3 = theme:GetColor(Enum.StudioStyleGuideColor.WarningText),
				TextSize = 10,
				TextXAlignment = Enum.TextXAlignment.Center,
				TextYAlignment = Enum.TextYAlignment.Center,
				Visible = self.props.Visible 
			});
		end;
		local scrollingFrameHeight = UDim.new(1 - (Header.Position.Height.Scale + Header.Size.Height.Scale), -1 * (Header.Position.Height.Offset + Header.Size.Height.Offset));
		local scrollingFramePosY = Header.Size.Height;
		local canvasHeightOffset = (#PluginSharedState.PathInfo.Waypoints * WaypointListItem.UnexpandedHeightOffset) + self.state.CanvasHeightAddend + StudioTextButton.HeightUDim.Offset * 2;
		return Roact.createElement("Frame", {
			BackgroundTransparency = 1,
			Position = UDim2.new(0, 0, 0, 0),
			Size = UDim2.new(1, 0, 1, 0),
			Visible = self.props.Visible 
		}		, {
			["Header"] = Roact.createElement(Header, {
				Name = PluginSharedState.PathInfo.Name,
				CloseButtonPressedCallback = self.props.CloseButtonPressedCallback 
			}),
			["WaypointsScrollingFrame"] = Roact.createElement(StudioScrollingFrame, {
				Active = false,
				CanvasSize = UDim2.new(1, 0, 0, canvasHeightOffset),
				Position = UDim2.new(UDim.new(0, 0), scrollingFramePosY),
				Size = UDim2.new(UDim.new(1, 0), scrollingFrameHeight),
				VerticalScrollBarInset = Enum.ScrollBarInset.Always,
				Visible = true 
			}, TS.Roact_combine({
							["UIListLayout"] = Roact.createElement("UIListLayout", {
					Padding = UDim.new(0, 1),
					FillDirection = Enum.FillDirection.Vertical,
					HorizontalAlignment = Enum.HorizontalAlignment.Center,
					SortOrder = Enum.SortOrder.LayoutOrder,
					VerticalAlignment = Enum.VerticalAlignment.Top 
				}),
				["AddWaypointButton"] = Roact.createElement(StudioTextButton, {
					LayoutOrder = #PluginSharedState.PathInfo.Waypoints + 1,
					Text = "Add waypoint",
					Width = UDim.new(0.4, 0),
					Events = {
						MouseButton1Click = function()
							PluginSharedState.PathInfo.SelectedWaypointIndex = #PluginSharedState.PathInfo.Waypoints;
							InsertWaypoint(false);
						end;
					} 
				})
			}, 
				TS.array_map(self.state.Waypoints, function(waypoint, index)
					return Roact.createElement(WaypointListItem, {
						ExpansionChangeCallback = function(heightDelta)
							self:setState(function(currentState)
								local newHeightAddend = currentState.CanvasHeightAddend + heightDelta;
								local newExpandedWaypoints = TS.array_copy(self.state.ExpandedWaypoints);
								if newHeightAddend > 0 then
									newExpandedWaypoints[#newExpandedWaypoints + 1] = waypoint;
								else
									do
										local i = 0;
										while i < #newExpandedWaypoints do
											if newExpandedWaypoints[i + 1] == waypoint then
												table.remove(newExpandedWaypoints, i + 1);
											end;
											i = i + 1;
										end;
									end;
								end;
								return {
									CanvasHeightAddend = newHeightAddend;
									ExpandedWaypoints = newExpandedWaypoints;
								};
							end);
						end,
						IsExpanded = (function()
							do
								local i = 0;
								while i < #self.state.ExpandedWaypoints do
									if self.state.ExpandedWaypoints[i + 1] == waypoint then
										return true;
									end;
									i = i + 1;
								end;
							end;
							return false;
						end)(),
						Waypoint = waypoint,
						WaypointIndex = index + 1 
					});
				end)
			))
		});
	end;
	_0 = WaypointsListScreen;
end;
exports = _0;
return exports;
