var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property } from '@refinitiv-ui/core';
import { VERSION } from '../../';
import { List } from '../../list';
import { TreeRenderer } from '../helpers/renderer';
import { TreeManager, TreeManagerMode } from '../managers/tree-manager';
const EXPAND_TOGGLE_ATTR = 'expand-toggle';
/**
 * Displays a tree structure
 * to be used for menus and group selections
 *
 * @fires value-changed - Fired when the users changed selection item.
 * @fires expanded-changed - Fired when an item's expanded state has changed.
 *
 * @attr {boolean} [stateless=false] - Disable selections
 * @prop {boolean} [stateless=false] - Disable selections
 *
 */
let Tree = class Tree extends List {
    constructor() {
        super(...arguments);
        /**
         * Tree manager used for manipulation
         */
        this.manager = new TreeManager(this.composer);
        /**
         * Allows multiple items to be selected
         */
        this.multiple = false;
        /**
         * Breaks the relationship when multiple
         * selection mode is enabled
         */
        this.noRelation = false;
        /**
         * Renderer used for generating tree items
         * @type {TreeRenderer}
         */
        this.renderer = new TreeRenderer(this);
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
        return VERSION;
    }
    /**
     * Expands all groups
     * @returns {void}
     */
    expandAll() {
        this.manager.expandAllItems();
    }
    /**
     * Collapses all groups
     * @returns {void}
     */
    collapseAll() {
        this.manager.collapseAllItems();
    }
    /**
     * Checks all editable items
     * @returns {void}
     */
    checkAll() {
        if (!this.multiple) {
            throw new RangeError('You cannot check all items in single selection mode');
        }
        this.manager.checkAllItems();
    }
    /**
     * Unchecks all editable items
     * @returns {void}
     */
    uncheckAll() {
        this.manager.uncheckAllItems();
    }
    /**
     * @override
     * @ignore
     */
    selectItem(item) {
        // Stateless tree
        if (this.stateless) {
            return false;
        }
        // Multiple selection
        if (this.multiple) {
            return this.manager.toggleItem(item);
        }
        // Single selection - expand/collapse group (parent)
        if (this.manager.isItemParent(item)) {
            this.toggleExpandedState(item);
            return false;
        }
        // Single selection - check item
        if (this.manager.checkItem(item)) {
            this.manager.checkedItems.forEach(checkedItem => {
                checkedItem !== item && this.manager.uncheckItem(checkedItem);
            });
            return true;
        }
        return false;
    }
    /**
     * Dispatches an event, detailing which item has recently changed it's expanded state.
     * @param item Data item of which the expanded property changed
     * @returns {void}
     */
    dispatchExpandedChangedEvent(item) {
        /**
        * Property `detail.value` is the current expanded state.
        * Property `detail.item` is the original data item of which the property has been modified.
        */
        const event = new CustomEvent('expanded-changed', {
            bubbles: false,
            cancelable: false,
            composed: true,
            detail: {
                value: this.manager.isItemExpanded(item),
                item
            }
        });
        this.dispatchEvent(event);
    }
    /**
     * Handles tap event when composed path contains
     * an element with an `expand-toggle` attribute.
     * @param event Tap event to try and handle
     * @returns True or False depending if the event was handled
     */
    handleExpandCollapse(event) {
        const containsToggle = event.composedPath().some((target) => target instanceof HTMLElement && target.hasAttribute(EXPAND_TOGGLE_ATTR));
        const itemElement = containsToggle && this.findItemElementFromTarget(event.target);
        const item = itemElement && this.itemFromElement(itemElement);
        if (item) {
            this.toggleExpandedState(item);
            return true;
        }
        return false;
    }
    /**
     * @override
     */
    onTap(event) {
        if (this.handleExpandCollapse(event)) {
            return;
        }
        super.onTap(event);
    }
    /**
     * @override
     */
    onKeyDown(event) {
        switch (event.key) {
            case 'Left':
            case 'ArrowLeft':
                this.left();
                break;
            case 'Right':
            case 'ArrowRight':
                this.right();
                break;
            default:
                return super.onKeyDown(event);
        }
        event.preventDefault();
    }
    /**
     * Performs left arrow keyboard action,
     * collapsing a group item if possible.
     * @returns {void}
     */
    left() {
        const item = this.highlightElement && this.itemFromElement(this.highlightElement);
        if (item && this.manager.isItemExpanded(item)) {
            this.manager.collapseItem(item);
            this.dispatchExpandedChangedEvent(item);
        }
    }
    /**
     * Performs right arrow keyboard action,
     * expanding a group item if possible.
     * @returns {void}
     */
    right() {
        const item = this.highlightElement && this.itemFromElement(this.highlightElement);
        if (item && !this.manager.isItemExpanded(item)) {
            this.manager.expandItem(item);
            this.dispatchExpandedChangedEvent(item);
        }
    }
    /**
     * Toggles the expanded state of an item.
     * Executed when a user taps on an item to expand/collapse the group.
     * @param item Original data item
     * @returns {void}
     */
    toggleExpandedState(item) {
        if (this.manager.isItemExpanded(item)) {
            this.manager.collapseItem(item);
        }
        else {
            this.manager.expandItem(item);
        }
        this.dispatchExpandedChangedEvent(item);
    }
    /**
     * @override
     */
    queryItems(engine) {
        return this.composer.queryItems(engine, Infinity);
    }
    /**
     * @override
     */
    queryItemsByPropertyValue(property, value) {
        return this.composer.queryItemsByPropertyValue(property, value, Infinity);
    }
    /**
     * @override
     */
    update(changedProperties) {
        if (changedProperties.has('noRelation') || changedProperties.has('multiple')) {
            this.manager.setMode(this.mode);
        }
        super.update(changedProperties);
    }
    /**
     * Selected items in tree
     * @override
     * @type {string[]}
     */
    get values() {
        return this.manager.checkedItems.map(item => {
            return this.composer.getItemPropertyValue(item, 'value') || '';
        });
    }
    set values(value) {
        super.values = value;
    }
    /**
     * Data object to be used for creating tree
     * @override
     * @type {TreeData<T>}
     */
    get data() {
        return super.data;
    }
    set data(data) {
        super.data = data;
        this.manager = new TreeManager(this.composer, this.mode);
    }
    /**
     * @override
     */
    get renderItems() {
        return this.manager.visibleItems;
    }
    /**
     * Mode to use in the tree manager
     */
    get mode() {
        return !this.multiple || !this.noRelation
            ? TreeManagerMode.RELATIONAL : TreeManagerMode.INDEPENDENT;
    }
};
__decorate([
    property({ type: Boolean })
], Tree.prototype, "multiple", void 0);
__decorate([
    property({ attribute: 'no-relation', type: Boolean })
], Tree.prototype, "noRelation", void 0);
__decorate([
    property({ attribute: false })
], Tree.prototype, "renderer", void 0);
Tree = __decorate([
    customElement('ef-tree')
], Tree);
export { Tree };
//# sourceMappingURL=tree.js.map