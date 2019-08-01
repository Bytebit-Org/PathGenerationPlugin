import SavedPathGenWaypoint = require("PathGen/SavedPathGenWaypoint");

interface ISaveablePathData {
    Name: string,
    Waypoints: Array<SavedPathGenWaypoint>,
}

export = ISaveablePathData;