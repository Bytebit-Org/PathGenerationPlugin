export = class SavedPathGenWaypoint {
    /**
     * The exiting handle world position, if any
     */
    public ExitingHandleWorldPosition?: number[] = undefined;

    /**
     * The entering handle world position, if any
     */
    public EnteringHandleWorldPosition?: number[] = undefined;

    /**
     * The name of the waypoint, if any
     */
    public Name?: string = "";

    /**
     * The world position of the waypoint
     */
    public WorldPosition: number[];
}