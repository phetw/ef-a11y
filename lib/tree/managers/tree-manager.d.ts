import { CollectionComposer } from '@refinitiv-ui/utils';
import { TreeDataItem } from '../helpers/types';
export declare enum CheckedState {
    CHECKED = 1,
    UNCHECKED = 0,
    INDETERMINATE = -1
}
export declare enum TreeManagerMode {
    /**
     * Maintains relationship states across children and parents.
     */
    RELATIONAL = 1,
    /**
     * Items are independent of each other and do not maintain relationship states.
     */
    INDEPENDENT = 0
}
export declare class TreeManager<T extends TreeDataItem> {
    /**
     * Internal composer used for managing the data
     */
    private composer;
    /**
     * Mode (algorithm) the tree manage is using
     */
    private mode;
    constructor(composer: CollectionComposer<T>, mode?: TreeManagerMode);
    /**
     * Is the manager maintaining parent/child relationships
     */
    private get manageRelationships();
    /**
     * Returns all items in the tree
     */
    private get items();
    /**
     * Return all items which have children
     */
    private get parentItems();
    /**
     * Returns all checked items.
     * When managing relationships, this excludes groups/parents from the result.
     */
    get checkedItems(): readonly T[];
    /**
     * Items which should be visibly displayed.
     * This can be used to render items.
     */
    get editableItems(): readonly T[];
    /**
     * Internal query for getting visible items/nodes
     * @param items Data item collection
     * @param result Resulting array of visible items
     * @returns Collection of visible items
     */
    private getEditableItems;
    /**
     * Items which should be visibly displayed.
     * This can be used to render items.
     */
    get visibleItems(): readonly T[];
    /**
     * Internal query for getting visible items/nodes
     * @param items Data item collection
     * @param result Resulting array of visible items
     * @returns Collection of visible items
     */
    private getVisibleItems;
    /**
     * Is the item hidden?
     * @param item Original data item
     * @returns `True` if the item is hidden
     */
    private isItemHidden;
    /**
     * Is the item visible?
     * @param item Original data item
     * @returns `True` if the item is visible
     */
    private isItemVisible;
    /**
     * Is the item checked?
     * @param item Original data item
     * @returns `True` if the item is checked
     */
    private isItemChecked;
    /**
     * Makes an item visible
     * @param item Original data item
     * @returns {void}
     */
    private showItem;
    /**
     * Hides an item from the visible collection
     * @param item Original data item
     * @returns {void}
     */
    private hideItem;
    /**
     * Forces a modification event, so that the renderer can update.
     * @param item Item of which to find ancestors
     * @returns {void}
     */
    private forceUpdateOnAncestors;
    /**
     * Sets the mode (algorithm) the manager should use
     * @param mode Tree manager mode
     * @returns {void}
     */
    setMode(mode: TreeManagerMode): void;
    /**
     * Updates the data item, forcing a render
     * @param item Original data item
     * @returns {void}
     */
    updateItem(item: T): void;
    /**
     * Includes an item as part of the tree.
     * @param item Item to include
     * @returns `True` if the item is newly included
     */
    includeItem(item: T): boolean;
    /**
     * Excludes an item as part of the tree.
     * @param item Item to exclude
     * @returns `True` if the item is newly excluded
     */
    excludeItem(item: T): boolean;
    /**
     * Is the item checkable?
     * @param item Original data item
     * @returns `True` if the item is not disabled or readonly
     */
    isItemCheckable(item: T): boolean;
    /**
     * Is the item expanded?
     * @param item Original data item
     * @returns `True` if the item is expanded and its children should be visible
     */
    isItemExpanded(item: T): boolean;
    /**
     * Is the item a parent?
     * @param item Original data item
     * @returns `True` if the item has children
     */
    isItemParent(item: T): boolean;
    /**
     * Is the item a child?
     * @param item Original data item
     * @returns `True` if the item has a parent
     */
    isItemChild(item: T): boolean;
    /**
     * Calculates the checked stated of the item
     * @param item Original data item
     * @returns Checked state of the item
     */
    getItemCheckedState(item: T): CheckedState;
    /**
     * Gets an item's ancestors
     * @param item Original data item
     * @returns A list of ancestors
     */
    getItemAncestors(item: T): readonly T[];
    /**
     * Gets an item's descendants
     * @param item Original data item
     * @param depth Depth to retrieve
     * @returns A list of descendants
     */
    getItemDescendants(item: T, depth?: number): readonly T[];
    /**
     * Gets an item's parent, if it has one.
     * @param item Original data item
     * @returns Item parent or `null`
     */
    getItemParent(item: T): T | null;
    /**
     * Gets an item's child collection
     * @param item Original data item
     * @returns A list of children
     */
    getItemChildren(item: T): readonly T[];
    /**
     * Expand an item to show its children
     * @param item Original data item
     * @returns {void}
     */
    expandItem(item: T): void;
    /**
     * Collapse an item to hide its children
     * @param item Original data item
     * @returns {void}
     */
    collapseItem(item: T): void;
    /**
     * Expands all items in the tree
     * @returns {void}
     */
    expandAllItems(): void;
    /**
     * Collapses all items in the tree
     * @returns {void}
     */
    collapseAllItems(): void;
    /**
     * Checks the item
     * @param item Original data item
     * @returns `True` if the item is modified
     */
    checkItem(item: T): boolean;
    private _checkItem;
    /**
     * Unchecks the item
     * @param item Original data item
     * @returns `True` if the item is modified
     */
    uncheckItem(item: T): boolean;
    private _uncheckItem;
    /**
     * Toggles the item checked state
     * @param item Original data item
     * @returns `True` if the item is modified
     */
    toggleItem(item: T): boolean;
    /**
     * Checks all items
     * @returns {void}
     */
    checkAllItems(): void;
    /**
     * Unchecks all items
     * @returns {void}
     */
    uncheckAllItems(): void;
}
