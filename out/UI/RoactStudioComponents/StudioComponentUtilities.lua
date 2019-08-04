-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 3, 2019, 7:48 PM Pacific Daylight Time

local exports = {};
local function DeriveColorModifier(props, state)
	if not props.Active then
		return Enum.StudioStyleGuideModifier.Disabled;
	end;
	if state.IsPressed then
		return Enum.StudioStyleGuideModifier.Pressed;
	end;
	if state.IsSelected then
		return Enum.StudioStyleGuideModifier.Selected;
	end;
	if state.IsMouseOver then
		return Enum.StudioStyleGuideModifier.Hover;
	end;
	return Enum.StudioStyleGuideModifier.Default;
end;
exports.DeriveColorModifier = DeriveColorModifier;
return exports;
