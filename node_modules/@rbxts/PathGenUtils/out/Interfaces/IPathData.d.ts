/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/t" />
import t from "@rbxts/t";
declare const IPathData: (value: unknown) => value is {
    Name: string;
    TotalDistance: number;
    Waypoints: {
        DistanceProgress: number;
        RelativePosition: Vector3;
        ExitingHandleRelativePosition: Vector3 | undefined;
        EnteringHandleRelativePosition: Vector3 | undefined;
    }[];
};
declare type IPathData = t.static<typeof IPathData>;
export = IPathData;
