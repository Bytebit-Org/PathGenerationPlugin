-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:48 PM Pacific Daylight Time

local TS = require(script.Parent.Parent.Parent.include.RuntimeLib);
local exports;
local Roact = TS.import(TS.getModule("roact").roact.src);
local StudioTextButton = TS.import(script.Parent.Parent, "RoactStudioComponents", "StudioTextButton");
local PluginSharedState = TS.import(script.Parent.Parent.Parent, "PluginSharedState");
local PlaceNewWaypointAsync = TS.import(script.Parent.Parent.Parent, "HelperFunctions", "PlaceNewWaypointAsync");
local LoadPathFromModuleScriptToPluginSharedState = TS.import(script.Parent.Parent.Parent, "HelperFunctions", "LoadPathFromModuleScriptToPluginSharedState");
local _0;
do
	local StartScreen = Roact.Component:extend("StartScreen");
	function StartScreen:render()
		return Roact.createElement("Frame", {
			Size = UDim2.new(1, 0, 1, 0),
			Transparency = 1,
			Visible = self.props.Visible 
		}		, {
			["UIGridLayout"] = Roact.createElement("UIGridLayout", {
				CellPadding = UDim2.new(0.1, 0, 1 - StudioTextButton.HeightUDim.Scale, -StudioTextButton.HeightUDim.Offset),
				CellSize = UDim2.new(0.4, 0, StudioTextButton.HeightUDim.Scale, StudioTextButton.HeightUDim.Offset),
				HorizontalAlignment = Enum.HorizontalAlignment.Center,
				VerticalAlignment = Enum.VerticalAlignment.Center 
			}			, {

			}),
			["CreateButton"] = Roact.createElement(StudioTextButton, {
				Active = true,
				BackgroundColorEnum = Enum.StudioStyleGuideColor.DialogMainButton,
				BorderColorEnum = Enum.StudioStyleGuideColor.DialogButtonBorder,
				Text = "Create new",
				TextColorEnum = Enum.StudioStyleGuideColor.DialogMainButtonText,
				Width = UDim.new(1, 0),
				Visible = true,
				Events = {
					MouseButton1Click = function()
						local newWaypoints = {};
						newWaypoints[#newWaypoints + 1] = PlaceNewWaypointAsync();
						wait();
						newWaypoints[#newWaypoints + 1] = PlaceNewWaypointAsync();
						PluginSharedState.PathInfo = {
							Name = "";
							SelectedWaypointIndex = -1;
							Waypoints = newWaypoints;
						};
						PluginSharedState.Updated:go();
						self.props.PathOpenedCallback();
					end;
				} 
			}),
			["LoadButton"] = Roact.createElement(StudioTextButton, {
				Active = true,
				BackgroundColorEnum = Enum.StudioStyleGuideColor.DialogMainButton,
				BorderColorEnum = Enum.StudioStyleGuideColor.DialogButtonBorder,
				Text = "Load",
				TextColorEnum = Enum.StudioStyleGuideColor.DialogMainButtonText,
				Width = UDim.new(1, 0),
				Visible = true,
				Events = {
					MouseButton1Click = function()
						LoadPathFromModuleScriptToPluginSharedState();
						self.props.PathOpenedCallback();
					end;
				} 
			})
		});
	end;
	_0 = StartScreen;
end;
exports = _0;
return exports;
