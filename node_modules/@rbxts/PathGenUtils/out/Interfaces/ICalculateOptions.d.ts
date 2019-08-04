/// <reference types="@rbxts/t" />
import t = require("@rbxts/t");
declare const ICalculateOptions: (value: unknown) => value is {
    BezierTravelSpeedUniformityApproximationLength: number | undefined;
};
declare type ICalculateOptions = t.static<typeof ICalculateOptions>;
export = ICalculateOptions;
