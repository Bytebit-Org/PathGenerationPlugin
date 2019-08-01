-- Compiled with https://roblox-ts.github.io v0.1.16
-- July 10, 2019, 9:26 PM GMT-08:00

local _exports = {};
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
_exports.DeriveColorModifier = DeriveColorModifier;
return _exports;
