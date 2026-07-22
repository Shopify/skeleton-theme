/**
 * @publicDocs
 */
export interface Storage<BaseStorageTypes extends Record<string, any> = Record<string, unknown>> {
    /**
     * Sets the value of a key in the storage. Use this to save individual data items like user preferences, form state, or cached values. The value is serialized using `JSON.stringify`, so it can be any primitive type, object, or array that JSON supports.
     *
     * @param key - The key to set the value for. Use descriptive keys to organize your stored data.
     * @param value - The value to set for the key. Can be any primitive type supported by `JSON.stringify`.
     *
     * @throws {StorageExceededError} Rejects with a `StorageExceededError` if the extension exceeds its allotted storage limit.
     */
    set<StorageTypes extends BaseStorageTypes = BaseStorageTypes, Keys extends keyof StorageTypes = keyof StorageTypes>(key: Keys, value: StorageTypes[Keys]): Promise<void>;
    /**
     * Sets multiple key-value pairs in the storage at once. Use this for efficient batch operations when you need to save multiple related values together, such as form data or configuration settings.
     *
     * @param entries - An object containing key-value pairs to store. Values can be any primitive type supported by `JSON.stringify`.
     *
     * @throws {StorageExceededError} Rejects with a `StorageExceededError` if the extension exceeds its allotted storage limit.
     */
    setMany<StorageTypes extends BaseStorageTypes = BaseStorageTypes>(entries: Partial<StorageTypes>): Promise<void>;
    /**
     * Gets the value of a key in the storage. Use this to retrieve previously saved data when your extension loads or when you need to access stored values. The value is automatically deserialized from JSON to its original type.
     *
     * @param key - The key to get the value for.
     * @returns The value of the key, or `undefined` if no value exists for the key.
     */
    get<StorageTypes extends BaseStorageTypes = BaseStorageTypes, Keys extends keyof StorageTypes = keyof StorageTypes>(key: Keys): Promise<StorageTypes[Keys] | undefined>;
    /**
     * Gets the values of multiple keys in the storage at once. Use this to efficiently retrieve related data in a single operation, reducing overhead when loading multiple stored values. The returned array is in the same order as the provided keys, with `undefined` values for keys that don't exist in storage.
     *
     * @param keys - An array of keys to get the values for.
     * @returns An array containing values for the requested keys, in the same order as the input keys.
     */
    getMany<StorageTypes extends BaseStorageTypes = BaseStorageTypes, Keys extends keyof StorageTypes = keyof StorageTypes>(keys: Keys[]): Promise<(StorageTypes[Keys] | undefined)[]>;
    /**
     * Clears all data from the storage. Use this to reset your extension's storage, such as when implementing a logout flow, clearing cached data, or resetting to defaults. This operation removes all stored key-value pairs.
     */
    clear(): Promise<void>;
    /**
     * Deletes a specific key from the storage. Use this to remove individual data items that are no longer needed, freeing up storage space and maintaining data hygiene.
     *
     * @param key - The key to delete.
     * @returns A promise that resolves to `true` if the key existed and was deleted, or `false` if the key did not exist.
     */
    delete<StorageTypes extends BaseStorageTypes = BaseStorageTypes, Keys extends keyof StorageTypes = keyof StorageTypes>(key: Keys): Promise<boolean>;
    /**
     * Deletes multiple keys from the storage at once. Use this to efficiently remove several related data items in a single operation, such as clearing expired cache entries or removing a group of related settings.
     *
     * @param keys - An array of keys to delete.
     * @returns A promise that resolves to an object mapping each key to a boolean value: `true` if the key existed and was deleted, or `false` if the key did not exist.
     */
    deleteMany<StorageTypes extends BaseStorageTypes = BaseStorageTypes, Keys extends keyof StorageTypes = keyof StorageTypes>(keys: Keys[]): Promise<Record<Keys, boolean>>;
    /**
     * Gets all the keys and values in the storage. Use this to iterate over all stored data, useful for debugging, data migration, or displaying all stored settings. The returned iterator provides entries as `[key, value]` tuples.
     *
     * @returns A promise that resolves to an iterator containing all key-value pairs in the storage.
     */
    entries<StorageTypes extends BaseStorageTypes = BaseStorageTypes, Keys extends keyof StorageTypes = keyof StorageTypes>(): Promise<IterableIterator<[Keys, StorageTypes[Keys]]>>;
}
/**
 * Error thrown when storage operations exceed the available storage quota. This can occur during `set()` or `setMany()` operations when the total stored data size exceeds the limit allocated to your extension.
 * @publicDocs
 */
export interface StorageExceededError extends Error {
    name: 'StorageExceededError';
}
//# sourceMappingURL=storage.d.ts.map