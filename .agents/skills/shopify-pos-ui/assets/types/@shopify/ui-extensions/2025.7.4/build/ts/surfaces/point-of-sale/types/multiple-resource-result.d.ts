/**
 * Represents the result of a bulk resource lookup operation. Contains successfully found resources and identifiers for resources that were not found.
 */
export interface MultipleResourceResult<T> {
    /**
     * The resources that were fetched using the IDs provided.
     */
    fetchedResources: T[];
    /**
     * The IDs for which a resource was not found.
     */
    idsForResourcesNotFound: number[];
}
//# sourceMappingURL=multiple-resource-result.d.ts.map