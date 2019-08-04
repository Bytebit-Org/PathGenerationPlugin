import t = require("@rbxts/t");

const ICalculateOptions = t.interface({
    /**
     * When calculating the position in a Bezier segment, this value will be used for smoothing the speed along the curve
     * e.g. if this value is set to L, then the t value along the bezier curve will get updated as follows:
     * t = t + (L / ||dB(t)/dt||)
     */
    BezierTravelSpeedUniformityApproximationLength: t.optional(t.numberMinExclusive(0))
});

type ICalculateOptions = t.static<typeof ICalculateOptions>;

export = ICalculateOptions;