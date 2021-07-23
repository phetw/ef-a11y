export var CheckedState;
(function (CheckedState) {
    CheckedState[CheckedState["CHECKED"] = 1] = "CHECKED";
    CheckedState[CheckedState["UNCHECKED"] = 0] = "UNCHECKED";
    CheckedState[CheckedState["INDETERMINATE"] = -1] = "INDETERMINATE";
})(CheckedState || (CheckedState = {}));
export var TreeManagerMode;
(function (TreeManagerMode) {
    /**
     * Maintains relationship states across children and parents.
     */
    TreeManagerMode[TreeManagerMode["RELATIONAL"] = 1] = "RELATIONAL";
    /**
     * Items are independent of each other and do not maintain relationship states.
     */
    TreeManagerMode[TreeManagerMode["INDEPENDENT"] = 0] = "INDEPENDENT";
})(TreeManagerMode || (TreeManagerMode = {}));
export class TreeManager {
    constructor(composer, mode = TreeManagerMode.RELATIONAL) {
        /**
         * Mode (algorithm) the tree manage is using
         */
        this.mode = TreeManagerMode.RELATIONAL;
        this.composer = composer;
        this.mode = mode;
    }
    /**
     * Is the manager maintaining parent/child relationships
     */
    get manageRelationships() {
        return this.mode === TreeManagerMode.RELATIONAL;
    }
    /**
     * Returns all items in the tree
     */
    get items() {
        return this.composer.queryItems(() => true, Infinity);
    }
    /**
     * Return all items which have children
     */
    get parentItems() {
        return this.items.filter(item => this.isItemParent(item));
    }
    /**
     * Returns all checked items.
     * When managing relationships, this excludes groups/parents from the result.
     */
    get checkedItems() {
        return this.composer.queryItems((item) => {
            return this.isItemChecked(item) && (!this.manageRelationships || !this.getItemChildren(item).length);
        }, Infinity);
    }
    /**
     * Items which should be visibly displayed.
     * This can be used to render items.
     */
    get editableItems() {
        const topLevel = this.composer.queryItems(() => true, 0);
        return this.getEditableItems(topLevel);
    }
    /**
     * Internal query for getting visible items/nodes
     * @param items Data item collection
     * @param result Resulting array of visible items
     * @returns Collection of visible items
     */
    getEditableItems(items, result = []) {
        for (const item of items) {
            if (this.isItemCheckable(item)) {
                result.push(item);
                const children = this.getItemChildren(item);
                children.length && this.getEditableItems(children, result);
            }
        }
        return result;
    }
    /**
     * Items which should be visibly displayed.
     * This can be used to render items.
     */
    get visibleItems() {
        const topLevel = this.composer.queryItems(() => true, 0);
        return this.getVisibleItems(topLevel);
    }
    /**
     * Internal query for getting visible items/nodes
     * @param items Data item collection
     * @param result Resulting array of visible items
     * @returns Collection of visible items
     */
    getVisibleItems(items, result = []) {
        for (const item of items) {
            if (this.isItemVisible(item)) {
                result.push(item);
                const children = this.getItemChildren(item);
                children.length && this.getVisibleItems(children, result);
            }
        }
        return result;
    }
    /**
     * Is the item hidden?
     * @param item Original data item
     * @returns `True` if the item is hidden
     */
    isItemHidden(item) {
        return this.composer.getItemPropertyValue(item, 'hidden') === true;
    }
    /**
     * Is the item visible?
     * @param item Original data item
     * @returns `True` if the item is visible
     */
    isItemVisible(item) {
        return !this.isItemHidden(item)
            && !this.composer.getItemAncestors(item)
                .some(ancestor => !this.isItemExpanded(ancestor));
    }
    /**
     * Is the item checked?
     * @param item Original data item
     * @returns `True` if the item is checked
     */
    isItemChecked(item) {
        return this.composer.getItemPropertyValue(item, 'selected') === true;
    }
    /**
     * Makes an item visible
     * @param item Original data item
     * @returns {void}
     */
    showItem(item) {
        this.composer.setItemPropertyValue(item, 'hidden', false);
        this.updateItem(item); // Make sure the item is updated
    }
    /**
     * Hides an item from the visible collection
     * @param item Original data item
     * @returns {void}
     */
    hideItem(item) {
        this.composer.setItemPropertyValue(item, 'hidden', true);
    }
    /**
     * Forces a modification event, so that the renderer can update.
     * @param item Item of which to find ancestors
     * @returns {void}
     */
    forceUpdateOnAncestors(item) {
        this.composer.getItemAncestors(item).forEach(ancestor => {
            const allSelected = !this.getItemChildren(ancestor).some(child => this.isItemCheckable(child) && !this.isItemChecked(child));
            this.composer.setItemPropertyValue(ancestor, 'selected', allSelected);
            this.updateItem(ancestor);
        });
    }
    /**
     * Sets the mode (algorithm) the manager should use
     * @param mode Tree manager mode
     * @returns {void}
     */
    setMode(mode) {
        this.mode = mode;
        // Force update of all visible parent items, making sure any indeterminate states are remove.
        this.parentItems.forEach(item => this.updateItem(item));
    }
    /**
     * Updates the data item, forcing a render
     * @param item Original data item
     * @returns {void}
     */
    updateItem(item) {
        this.composer.updateItemTimestamp(item);
    }
    /**
     * Includes an item as part of the tree.
     * @param item Item to include
     * @returns `True` if the item is newly included
     */
    includeItem(item) {
        const result = this.composer.unlockItem(item);
        this.showItem(item); // Item must be unlocked first
        return result;
    }
    /**
     * Excludes an item as part of the tree.
     * @param item Item to exclude
     * @returns `True` if the item is newly excluded
     */
    excludeItem(item) {
        this.hideItem(item);
        return this.composer.lockItem(item);
    }
    /**
     * Is the item checkable?
     * @param item Original data item
     * @returns `True` if the item is not disabled or readonly
     */
    isItemCheckable(item) {
        return !this.composer.isItemLocked(item)
            && this.composer.getItemPropertyValue(item, 'disabled') !== true
            && this.composer.getItemPropertyValue(item, 'readonly') !== true;
    }
    /**
     * Is the item expanded?
     * @param item Original data item
     * @returns `True` if the item is expanded and its children should be visible
     */
    isItemExpanded(item) {
        return this.isItemParent(item)
            && this.composer.getItemPropertyValue(item, 'expanded') === true;
    }
    /**
     * Is the item a parent?
     * @param item Original data item
     * @returns `True` if the item has children
     */
    isItemParent(item) {
        return this.composer.isItemParent(item);
    }
    /**
     * Is the item a child?
     * @param item Original data item
     * @returns `True` if the item has a parent
     */
    isItemChild(item) {
        return this.composer.isItemChild(item);
    }
    /**
     * Calculates the checked stated of the item
     * @param item Original data item
     * @returns Checked state of the item
     */
    getItemCheckedState(item) {
        const descendants = this.getItemDescendants(item).filter(descendant => !this.composer.isItemLocked(descendant));
        const isParent = descendants.length > 0;
        if (isParent && this.manageRelationships) {
            const checkedCount = descendants.reduce((count, item) => {
                return count + (this.isItemChecked(item) === true ? 1 : 0);
            }, 0);
            return !checkedCount ? CheckedState.UNCHECKED
                : checkedCount === descendants.length ? CheckedState.CHECKED : CheckedState.INDETERMINATE;
        }
        return this.isItemChecked(item) === true ? CheckedState.CHECKED : CheckedState.UNCHECKED;
    }
    /**
     * Gets an item's ancestors
     * @param item Original data item
     * @returns A list of ancestors
     */
    getItemAncestors(item) {
        return this.composer.getItemAncestors(item);
    }
    /**
     * Gets an item's descendants
     * @param item Original data item
     * @param depth Depth to retrieve
     * @returns A list of descendants
     */
    getItemDescendants(item, depth) {
        return this.composer.getItemDescendants(item, depth);
    }
    /**
     * Gets an item's parent, if it has one.
     * @param item Original data item
     * @returns Item parent or `null`
     */
    getItemParent(item) {
        return this.composer.getItemParent(item);
    }
    /**
     * Gets an item's child collection
     * @param item Original data item
     * @returns A list of children
     */
    getItemChildren(item) {
        return this.composer.getItemChildren(item);
    }
    /**
     * Expand an item to show its children
     * @param item Original data item
     * @returns {void}
     */
    expandItem(item) {
        if (this.isItemParent(item)) {
            this.composer.setItemPropertyValue(item, 'expanded', true);
        }
    }
    /**
     * Collapse an item to hide its children
     * @param item Original data item
     * @returns {void}
     */
    collapseItem(item) {
        if (this.isItemParent(item)) {
            this.composer.setItemPropertyValue(item, 'expanded', false);
        }
    }
    /**
     * Expands all items in the tree
     * @returns {void}
     */
    expandAllItems() {
        this.parentItems.forEach(item => this.expandItem(item));
    }
    /**
     * Collapses all items in the tree
     * @returns {void}
     */
    collapseAllItems() {
        this.parentItems.forEach(item => this.collapseItem(item));
    }
    /**
     * Checks the item
     * @param item Original data item
     * @returns `True` if the item is modified
     */
    checkItem(item) {
        return this._checkItem(item);
    }
    _checkItem(item, manageRelationships = this.manageRelationships) {
        if (this.isItemCheckable(item) && !this.isItemChecked(item)) {
            this.composer.setItemPropertyValue(item, 'selected', true);
            if (manageRelationships) {
                this.forceUpdateOnAncestors(item);
                this.getItemDescendants(item).forEach(descendant => this._checkItem(descendant, false));
            }
            return true;
        }
        if (this.isItemParent(item)) {
            this.updateItem(item); // update parent checked state
        }
        return false;
    }
    /**
     * Unchecks the item
     * @param item Original data item
     * @returns `True` if the item is modified
     */
    uncheckItem(item) {
        return this._uncheckItem(item);
    }
    _uncheckItem(item, manageRelationships = this.manageRelationships) {
        if (this.isItemCheckable(item) && this.isItemChecked(item)) {
            this.composer.setItemPropertyValue(item, 'selected', false);
            if (manageRelationships) {
                this.forceUpdateOnAncestors(item);
                this.getItemDescendants(item).forEach(descendant => this._uncheckItem(descendant, false));
            }
            return true;
        }
        if (this.isItemParent(item)) {
            this.updateItem(item); // update parent checked state
        }
        return false;
    }
    /**
     * Toggles the item checked state
     * @param item Original data item
     * @returns `True` if the item is modified
     */
    toggleItem(item) {
        return this.isItemChecked(item) ? this.uncheckItem(item) : this.checkItem(item);
    }
    /**
     * Checks all items
     * @returns {void}
     */
    checkAllItems() {
        this.editableItems.forEach(item => this.checkItem(item));
    }
    /**
     * Unchecks all items
     * @returns {void}
     */
    uncheckAllItems() {
        this.editableItems.forEach(item => this.uncheckItem(item));
    }
}
//# sourceMappingURL=tree-manager.js.map