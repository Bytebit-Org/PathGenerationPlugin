import t from "@rbxts/t";
import tWaypoint = require("./IWaypoint");

const IPathData = t.interface({
    Name: t.string,
    TotalDistance: t.numberMinExclusive(0),
    Waypoints: t.array(tWaypoint)
});

type IPathData = t.static<typeof IPathData>;

export = IPathData;