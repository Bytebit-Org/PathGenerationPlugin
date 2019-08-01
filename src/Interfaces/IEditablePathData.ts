import EditablePathGenWaypoint = require("PathGen/EditablePathGenWaypoint");

interface IEditablePathData {
    SelectedWaypointIndex: number,
    Name: string,
    Waypoints: Array<EditablePathGenWaypoint>
}

export = IEditablePathData;