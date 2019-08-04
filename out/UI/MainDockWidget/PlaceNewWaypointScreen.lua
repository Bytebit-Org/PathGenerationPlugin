-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:48 PM Pacific Daylight Time

local TS = require(script.Parent.Parent.Parent.include.RuntimeLib);
local exports;
local Roact = TS.import(TS.getModule("roact").roact.src);
local _0;
do
	local PlaceNewWaypointScreen = Roact.Component:extend("PlaceNewWaypointScreen");
	function PlaceNewWaypointScreen:render()
		local theme = settings().Studio.Theme;
		return Roact.createElement("Frame", {
			Size = UDim2.new(1, 0, 1, 0),
			Transparency = 1,
			Visible = self.props.Visible 
		}		, {
			["PromptLabel"] = Roact.createElement("TextLabel", {
				BackgroundTransparency = 1,
				Size = UDim2.new(1, 0, 1, 0),
				Text = "Click to place new waypoint",
				TextColor3 = theme:GetColor(Enum.StudioStyleGuideColor.MainText) 
			})
		});
	end;
	_0 = PlaceNewWaypointScreen;
end;
exports = _0;
return exports;
