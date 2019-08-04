-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:48 PM Pacific Daylight Time

local TS = require(script.Parent.Parent.Parent.Parent.include.RuntimeLib);
local exports;
local Roact = TS.import(TS.getModule("roact").roact.src);
local StudioTextButton = TS.import(script.Parent.Parent.Parent, "RoactStudioComponents", "StudioTextButton");
local SaveCurrentPathToModuleScript = TS.import(script.Parent.Parent.Parent.Parent, "HelperFunctions", "SaveCurrentPathToModuleScript");
local BakeCurrentPathToModuleScriptRelativeToSelectedModel = TS.import(script.Parent.Parent.Parent.Parent, "HelperFunctions", "BakeCurrentPathToModuleScriptRelativeToSelectedModel");
local _0;
do
	local Header = Roact.Component:extend("Header");
	function Header:render()
		local theme = settings().Studio.Theme;
		local buttonSize = StudioTextButton.HeightUDim.Offset;
		local buttonOffsetY = (Header.Size.Y.Offset - buttonSize) / 2;
		return Roact.createElement("Frame", {
			Active = true,
			BackgroundColor3 = theme:GetColor(Enum.StudioStyleGuideColor.Titlebar),
			BorderColor3 = theme:GetColor(Enum.StudioStyleGuideColor.Border),
			BorderSizePixel = 1,
			Position = Header.Position,
			Size = Header.Size,
			Visible = true 
		}		, {
			["NameTextBox"] = Roact.createElement("TextBox", {
				Active = true,
				BackgroundTransparency = 1,
				PlaceholderColor3 = theme:GetColor(Enum.StudioStyleGuideColor.TitlebarText, Enum.StudioStyleGuideModifier.Disabled),
				PlaceholderText = "Insert path name",
				Position = UDim2.new(0, 4, 0, 0),
				Size = UDim2.new(1, -1 * (buttonSize * 2 + 54), 1, 0),
				Text = self.props.Name,
				TextColor3 = theme:GetColor(Enum.StudioStyleGuideColor.TitlebarText),
				TextSize = 14,
				TextXAlignment = Enum.TextXAlignment.Left,
				TextYAlignment = Enum.TextYAlignment.Center,
				Visible = true 
			}),
			["BakeButton"] = Roact.createElement(StudioTextButton, {
				Active = true,
				Text = "Bake",
				Position = UDim2.new(1, -1 * (buttonSize * 2 + 50), 0, buttonOffsetY),
				Width = UDim.new(0, 40),
				Events = {
					MouseButton1Click = BakeCurrentPathToModuleScriptRelativeToSelectedModel;
				} 
			}),
			["SaveButton"] = Roact.createElement(StudioTextButton, {
				Active = true,
				Text = "💾",
				Position = UDim2.new(1, -1 * (buttonSize * 2 + 6), 0, buttonOffsetY),
				Width = UDim.new(0, buttonSize),
				Events = {
					MouseButton1Click = SaveCurrentPathToModuleScript;
				} 
			}),
			["CloseButton"] = Roact.createElement(StudioTextButton, {
				Active = true,
				Text = "X",
				Position = UDim2.new(1, -1 * (buttonSize + 4), 0, buttonOffsetY),
				Width = UDim.new(0, buttonSize),
				Events = {
					MouseButton1Click = self.props.CloseButtonPressedCallback;
				} 
			})
		});
	end;
	Header.Position = UDim2.new(0, 1, 0, 1);
	Header.Size = UDim2.new(1, -2, 0, 30);
	_0 = Header;
end;
exports = _0;
return exports;
