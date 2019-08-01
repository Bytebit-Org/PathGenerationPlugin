import t from "@rbxts/t";
import tWaypoint = require("./tWaypoint");

export = t.interface({
    Name: t.string,
    TotalDistance: t.numberMinExclusive(0),
    Waypoints: t.array(tWaypoint)
});