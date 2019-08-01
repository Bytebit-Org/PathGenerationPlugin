import AddWaypointAction = require("./AddWaypointAction");

function Initialize() {
    AddWaypointAction.RegisterActions();
    AddWaypointAction.RegisterMenus();
}

export { Initialize };