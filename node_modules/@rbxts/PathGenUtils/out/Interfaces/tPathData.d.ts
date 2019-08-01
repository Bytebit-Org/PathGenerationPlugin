/// <reference types="@rbxts/types" />
declare const _default: (value: unknown) => value is {
    Name: string;
    TotalDistance: number;
    Waypoints: {
        DistanceProgress: number;
        RelativePosition: Vector3;
        ExitingHandleRelativePosition: Vector3 | undefined;
        EnteringHandleRelativePosition: Vector3 | undefined;
    }[];
};
export = _default;
