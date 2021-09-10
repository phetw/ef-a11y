declare type UnknownObject = {
    [key: string]: unknown;
};
declare type MergeObject = UnknownObject | Array<unknown>;
/**
 * Merge objects recursively
 *
 * @param {MergeObject} object The destination object.
 * @param {MergeObject} sources The source objects.
 * @param {boolean} force Force merge if a key of destination object is already exists and a value is not object
 * @param {MergeObject[]} record The record object which record merged objects recursively
 * @returns voids
 */
declare const merge: (object: MergeObject, sources: MergeObject, force?: boolean, record?: Array<unknown>) => void;
export { merge, MergeObject };
//# sourceMappingURL=merge.d.ts.map