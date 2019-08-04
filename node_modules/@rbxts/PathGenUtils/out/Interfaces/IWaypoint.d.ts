/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/t" />
import t from "@rbxts/t";
declare const IWaypoint: (value: unknown) => value is {
    DistanceProgress: number;
    RelativePosition: Vector3;
    ExitingHandleRelativePosition: Vector3 | undefined;
    EnteringHandleRelativePosition: Vector3 | undefined;
};
declare type IWaypoint = t.static<typeof IWaypoint>;
export = IWaypoint;
