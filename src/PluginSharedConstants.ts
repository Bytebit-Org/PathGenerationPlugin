import { HttpService } from "@rbxts/services";

const sharedConstants = {
    ActionConfigurations: {
        InsertWaypointAfter: {
            ActionId: HttpService.GenerateGUID(),
            Text: "Insert a new waypoint after",
            StatusTip: "Inserts a new waypoint after the current waypoint"
        },
        InsertWaypointBefore: {
            ActionId: HttpService.GenerateGUID(),
            Text: "Insert a new waypoint before",
            StatusTip: "Inserts a new waypoint before the current waypoint"
        }
    },
    AssetPaths: {
        ActionIconAssets: {
            InsertWaypointAfter: "rbxassetid://3450465779",
            InsertWaypointBefore: "rbxassetid://3450466106"
        },
        IconSpritesheetAsset: "rbxassetid://3450467031",
        StudioArrowsSpritesheetAsset: "rbxasset://textures/StudioSharedUI/arrowSpritesheet.png",
    },
    MenuNames: {
        InsertWaypointMenuName: HttpService.GenerateGUID(),
    },
    VisualizationsFolderName: "EditablePathGenWaypointVisualizations",
};

export = sharedConstants;