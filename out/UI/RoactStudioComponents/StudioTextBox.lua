-- Compiled with https://roblox-ts.github.io v0.2.14
-- July 31, 2019, 10:14 PM GMT-08:00

local TS = require(script.Parent.Parent.Parent.include.RuntimeLib);
local exports;
local Roact = TS.import(TS.getModule("roact").roact.src);
local DeriveColorModifier = TS.import(script.Parent, "StudioComponentUtilities").DeriveColorModifier;
local IStudioComponentProperties = TS.import(script.Parent, "IStudioComponentProperties");
local _0;
do
	local StudioTextBox = Roact.Component:extend("StudioTextBox");
	function StudioTextBox:init(props)
		self:setState({
			IsMouseOver = false;
			IsPressed = false;
			IsSelected = false;
		});
	end;
	function StudioTextBox:render()
		local theme = settings().Studio.Theme;
		local styleGuideModifier = DeriveColorModifier(self.props, self.state);
		return Roact.createElement("TextBox", {
			Active = self.props.Active,
			AnchorPoint = self.props.AnchorPoint,
			BackgroundColor3 = theme:GetColor(Enum.StudioStyleGuideColor.InputFieldBackground, styleGuideModifier),
			BorderColor3 = theme:GetColor(Enum.StudioStyleGuideColor.InputFieldBorder, styleGuideModifier),
			BorderSizePixel = 1,
			LayoutOrder = self.props.LayoutOrder,
			PlaceholderColor3 = theme:GetColor(Enum.StudioStyleGuideColor.MainText, Enum.StudioStyleGuideModifier.Disabled),
			PlaceholderText = self.props.PlaceholderText,
			Position = self.props.Position,
			Rotation = self.props.Rotation,
			Size = UDim2.new(self.props.Width, StudioTextBox.HeightUDim),
			Text = self.props.Text,
			TextColor3 = theme:GetColor(Enum.StudioStyleGuideColor.MainText, styleGuideModifier),
			TextSize = 10,
			TextXAlignment = self.props.TextXAlignment,
			TextYAlignment = Enum.TextYAlignment.Center,
			Visible = self.props.Visible,
			[Roact.Event.FocusLost] = function(actualInstance)
				if self.props.Events == nil or self.props.Events.ValueChanged == nil then
					return nil;
				end;
				self.props.Events.ValueChanged(actualInstance, actualInstance.Text);
			end,
			[Roact.Event.MouseEnter] = function()
				self:setState({
					IsMouseOver = true;
				});
			end,
			[Roact.Event.MouseLeave] = function()
				self:setState({
					IsMouseOver = false;
				});
			end,
			[Roact.Event.SelectionGained] = function()
				self:setState({
					IsSelected = true;
				});
			end,
			[Roact.Event.SelectionLost] = function()
				self:setState({
					IsSelected = false;
				});
			end 
		});
	end;
	StudioTextBox.HeightUDim = UDim.new(0, 22);
	StudioTextBox.defaultProps = {
		Active = true;
		AnchorPoint = Vector2.new(0, 0);
		LayoutOrder = 0;
		PlaceholderText = "";
		Position = UDim2.new(0, 0, 0, 0);
		Rotation = 0;
		TextXAlignment = Enum.TextXAlignment.Center;
		Width = UDim.new(1, 0);
		Visible = true;
	};
	_0 = StudioTextBox;
end;
exports = _0;
return exports;
