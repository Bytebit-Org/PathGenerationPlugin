-- Compiled with https://roblox-ts.github.io v0.1.16
-- July 10, 2019, 9:26 PM GMT-08:00

local TS = require(script.Parent.Parent.Parent.include.RuntimeLib);
local _exports;
local Roact = TS.import(TS.getModule("roact").roact.src);
local IStudioComponentProperties = TS.import(script.Parent, "IStudioComponentProperties");
local _POSITION_ADDER = UDim2.new(0, 1, 0, 1);
local _SIZE_ADDER = UDim2.new(0, -2, 0, -2);
local _0;
do
	local StudioFrame = Roact.Component:extend("StudioFrame");
	StudioFrame.defaultProps = {
		Active = true;
		AnchorPoint = Vector2.new(0, 0);
		Position = UDim2.new(0, 0, 0, 0);
		Size = UDim2.new(1, 0, 1, 0);
		Visible = true;
	};
	function StudioFrame:render()
		local theme = settings().Studio.Theme;
			local _1;
			if self.props.LayoutOrder ~= nil then
				_1 = self.props.LayoutOrder;
			else
				_1 = 0;
			end;
			local _2;
			if self.props.Rotation ~= nil then
				_2 = self.props.Rotation;
			else
				_2 = 0;
			end;
		return Roact.createElement("Frame", {
			Active = self.props.Active,
			BackgroundColor3 = theme:GetColor(Enum.StudioStyleGuideColor.MainBackground),
			BorderColor3 = theme:GetColor(Enum.StudioStyleGuideColor.Border),
			BorderSizePixel = 1,
			LayoutOrder = _1,
			Position = (self.props.Position + _POSITION_ADDER),
			Rotation = _2,
			Size = (self.props.Size + _SIZE_ADDER),
			Visible = self.props.Visible 
		}, TS.Roact_combine(
self.props[Roact.Children]
		));
	end;
	_0 = StudioFrame;
end;
_exports = _0;
return _exports;
