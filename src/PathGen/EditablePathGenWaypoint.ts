export = class EditablePathGenWaypoint {
    /**
     * The exiting handle visualization part
     */
    public ExitingHandleVisualizationPart?: BasePart;

    /**
     * The entering handle visualization part
     */
    public EnteringHandleVisualizationPart?: BasePart;

    /**
     * The name of the waypoint, used for debugging and the interface design
     */
    public Name?: string = "";

    /**
     * The visualization part of the waypoint
     */
    public VisualizationPart: BasePart;
}