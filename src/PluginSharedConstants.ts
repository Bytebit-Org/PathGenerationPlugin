import { HttpService } from "@rbxts/services";

const baseFolder = new Instance("Folder");
baseFolder.Archivable = false;
baseFolder.Name = "PathGenPluginVisualizations";

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
	BaseFolder: baseFolder,
	FolderNames: {
		Beams: "Beams",
		BezierHandles: "BezierHandleVisualizations",
		WaypointVisualizations: "WaypointVisualizations",
	},
    MenuNames: {
        InsertWaypointMenuName: HttpService.GenerateGUID(),
    },
};

export = sharedConstants;