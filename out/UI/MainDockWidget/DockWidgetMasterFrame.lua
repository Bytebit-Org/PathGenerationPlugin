-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:48 PM Pacific Daylight Time

local TS = require(script.Parent.Parent.Parent.include.RuntimeLib);
local exports;
local Roact = TS.import(TS.getModule("roact").roact.src);
local StartScreen = TS.import(script.Parent, "StartScreen");
local WaypointsListScreen = TS.import(script.Parent, "WaypointsListScreen");
local PlaceNewWaypointScreen = TS.import(script.Parent, "PlaceNewWaypointScreen");
local PluginSharedState = TS.import(script.Parent.Parent.Parent, "PluginSharedState");
local DeleteWaypoint = TS.import(script.Parent.Parent.Parent, "HelperFunctions", "DeleteWaypoint");
Screen = Screen or {};
do
	Screen.StartScreen = 0;
	Screen[0] = "StartScreen";
	Screen.WaypointsListScreen = 1;
	Screen[1] = "WaypointsListScreen";
end;
local _0;
do
	local DockWidgetMasterFrame = Roact.Component:extend("DockWidgetMasterFrame");
	function DockWidgetMasterFrame:init(props)
		self:setState({
			CurrentScreen = Screen.StartScreen;
			ShouldShowPlaceNewWaypointScreen = false;
		});
		PluginSharedState.Updated:bind(function()
			if PluginSharedState.IsPlacingNewWaypoint ~= self.state.ShouldShowPlaceNewWaypointScreen then
				self:setState({
					ShouldShowPlaceNewWaypointScreen = PluginSharedState.IsPlacingNewWaypoint;
				});
			end;
		end);
	end;
	function DockWidgetMasterFrame:render()
		local theme = settings().Studio.Theme;
		return Roact.createElement("Frame", {
			BackgroundColor3 = theme:GetColor(Enum.StudioStyleGuideColor.MainBackground),
			Size = UDim2.new(1, 0, 1, 0) 
		}		, {
			["PlaceNewWaypointScreen"] = Roact.createElement(PlaceNewWaypointScreen, {
				Visible = self.state.ShouldShowPlaceNewWaypointScreen 
			}),
			["StartScreen"] = Roact.createElement(StartScreen, {
				PathOpenedCallback = function()
					self:setState({
						CurrentScreen = Screen.WaypointsListScreen;
					});
				end,
				Visible = self.state.CurrentScreen == Screen.StartScreen and not self.state.ShouldShowPlaceNewWaypointScreen 
			}),
			["WaypointsListScreen"] = Roact.createElement(WaypointsListScreen, {
				CloseButtonPressedCallback = function()
					if PluginSharedState.PathInfo ~= nil then
						while #PluginSharedState.PathInfo.Waypoints > 0 do
							DeleteWaypoint(PluginSharedState.PathInfo.Waypoints[1]);
						end;
					end;
					PluginSharedState.PathInfo = nil;
					self:setState({
						CurrentScreen = Screen.StartScreen;
					});
				end,
				Visible = self.state.CurrentScreen == Screen.WaypointsListScreen and not self.state.ShouldShowPlaceNewWaypointScreen 
			})
		});
	end;
	_0 = DockWidgetMasterFrame;
end;
exports = _0;
return exports;
