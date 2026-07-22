export interface Location {
    /**
     * A unique identifier for the location.
     */
    id: string;
    /**
     * The name of the location.
     */
    name: string;
}
export interface LocationGroup {
    /**
     * An array of locations within the group.
     */
    locations: Location[];
    /**
     * The label for the location group.
     */
    label: string;
    /**
     * A unique identifier for the location group.
     */
    id: string;
}
export interface InternalLocationListProps {
    /**
     * An array of location groups.
     */
    locationGroups: LocationGroup[];
    /**
     * Callback when a location group is moved.
     * It receives the old index and the new index as parameters.
     */
    onMoveGroup: (oldIndex: number, newIndex: number) => void;
    /**
     * Callback when a location group is renamed.
     * It receives the id of the group and the new name as parameters.
     */
    onRenameGroup: (id: string, name: string) => void;
    /**
     * Callback when a location group is deleted.
     * It receives the id of the group as a parameter.
     */
    onDeleteGroup: (id: string) => void;
    /**
     * Callback when a tag is moved from one group to another.
     * It receives the id of the tag, the old group index, and the new group index as parameters.
     */
    onMoveTag: (tagId: number, oldGroupIndex: number, newGroupIndex: number) => void;
    /**
     * Callback when a new group is created.
     * It receives the id of the new group as a parameter.
     */
    onCreateGroup: (id: string) => void;
}
export declare const InternalLocationList: "InternalLocationList" & {
    readonly type?: "InternalLocationList" | undefined;
    readonly props?: InternalLocationListProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=InternalLocationList.d.ts.map