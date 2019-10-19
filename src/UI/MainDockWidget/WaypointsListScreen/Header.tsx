import Roact from "@rbxts/roact";
import { StudioTextButton } from "@rbxts/roblox-RoactStudioComponents";
import SaveCurrentPathToModuleScript = require("HelperFunctions/SaveCurrentPathToModuleScript");
import DialogFrames = require("UI/DialogFrames");

interface IHeaderProperties {
    CloseButtonPressedCallback: () => void,
    Name: string,
}

export = class Header extends Roact.Component<IHeaderProperties> {
    public static Position = new UDim2(0, 1, 0, 1);
    public static Size = new UDim2(1, -2, 0, 30);

    public render() : Roact.Element {
        const theme = settings().Studio.Theme;

        const buttonSize = StudioTextButton.HeightUDim.Offset;
        const buttonOffsetY = (Header.Size.Y.Offset - buttonSize) / 2;

        return <frame
            Active={true}
            BackgroundColor3={theme.GetColor(Enum.StudioStyleGuideColor.Titlebar)}
            BorderColor3={theme.GetColor(Enum.StudioStyleGuideColor.Border)}
            BorderSizePixel={1}
            Position={Header.Position}
            Size={Header.Size}
            Visible={true}>
            <textbox
                Key={"NameTextBox"}
                Active={true}
                BackgroundTransparency={1}
                PlaceholderColor3={theme.GetColor(Enum.StudioStyleGuideColor.TitlebarText, Enum.StudioStyleGuideModifier.Disabled)}
                PlaceholderText={"Insert path name"}
                Position={new UDim2(0, 4, 0, 0)}
                Size={new UDim2(1, -1 * (buttonSize * 2 + 54), 1, 0)}
                Text={this.props.Name}
                TextColor3={theme.GetColor(Enum.StudioStyleGuideColor.TitlebarText)}
                TextSize={14}
                TextXAlignment={Enum.TextXAlignment.Left}
                TextYAlignment={Enum.TextYAlignment.Center}
                Visible={true} />
            <StudioTextButton
                Key={"BakeButton"}
                Active={true}
                Text={"Bake"}
                Position={new UDim2(1, -1 * (buttonSize * 2 + 50), 0, buttonOffsetY)}
                Width={new UDim(0, 40)}
                
                Events={{
					MouseButton1Click: () => {
						DialogFrames.GetByType(DialogFrames.Type.BakeOptions).Prompt();
					}
                }} />
            <StudioTextButton
                Key={"SaveButton"}
                Active={true}
                Text={"💾"}
                Position={new UDim2(1, -1 * (buttonSize * 2 + 6), 0, buttonOffsetY)}
                Width={new UDim(0, buttonSize)}
                
                Events={{
                    MouseButton1Click: SaveCurrentPathToModuleScript
                }} />
            <StudioTextButton
                Key={"CloseButton"}
                Active={true}
                Text={"X"}
                Position={new UDim2(1, -1 * (buttonSize + 4), 0, buttonOffsetY)}
                Width={new UDim(0, buttonSize)}

                Events={{
                    MouseButton1Click: this.props.CloseButtonPressedCallback
                }} />
        </frame>
    }
}