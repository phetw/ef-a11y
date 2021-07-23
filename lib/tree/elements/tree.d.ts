import { PropertyValues, TapEvent } from '@refinitiv-ui/core';
import { CollectionComposer } from '@refinitiv-ui/utils';
import { List } from '../../list';
import { TreeRenderer } from '../helpers/renderer';
import { TreeData, TreeDataItem } from '../helpers/types';
import { TreeManagerMode } from '../managers/tree-manager';
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
export declare class Tree<T extends TreeDataItem = TreeDataItem> extends List<T> {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * Tree manager used for manipulation
     */
    private manager;
    /**
     * Allows multiple items to be selected
     */
    multiple: boolean;
    /**
     * Breaks the relationship when multiple
     * selection mode is enabled
     */
    noRelation: boolean;
    /**
     * Renderer used for generating tree items
     * @type {TreeRenderer}
     */
    renderer: TreeRenderer;
    /**
     * Expands all groups
     * @returns {void}
     */
    expandAll(): void;
    /**
     * Collapses all groups
     * @returns {void}
     */
    collapseAll(): void;
    /**
     * Checks all editable items
     * @returns {void}
     */
    checkAll(): void;
    /**
     * Unchecks all editable items
     * @returns {void}
     */
    uncheckAll(): void;
    /**
     * @override
     * @ignore
     */
    selectItem(item: T): boolean;
    /**
     * Dispatches an event, detailing which item has recently changed it's expanded state.
     * @param item Data item of which the expanded property changed
     * @returns {void}
     */
    protected dispatchExpandedChangedEvent(item: T): void;
    /**
     * Handles tap event when composed path contains
     * an element with an `expand-toggle` attribute.
     * @param event Tap event to try and handle
     * @returns True or False depending if the event was handled
     */
    protected handleExpandCollapse(event: TapEvent): boolean;
    /**
     * @override
     */
    protected onTap(event: TapEvent): void;
    /**
     * @override
     */
    protected onKeyDown(event: KeyboardEvent): void;
    /**
     * Performs left arrow keyboard action,
     * collapsing a group item if possible.
     * @returns {void}
     */
    protected left(): void;
    /**
     * Performs right arrow keyboard action,
     * expanding a group item if possible.
     * @returns {void}
     */
    protected right(): void;
    /**
     * Toggles the expanded state of an item.
     * Executed when a user taps on an item to expand/collapse the group.
     * @param item Original data item
     * @returns {void}
     */
    protected toggleExpandedState(item: T): void;
    /**
     * @override
     */
    protected queryItems(engine: (item: T, composer: CollectionComposer<T>) => boolean): readonly T[];
    /**
     * @override
     */
    protected queryItemsByPropertyValue<K extends keyof T>(property: K, value: T[K]): readonly T[];
    /**
     * @override
     */
    protected update(changedProperties: PropertyValues): void;
    /**
     * Selected items in tree
     * @override
     * @type {string[]}
     */
    get values(): string[];
    set values(value: string[]);
    /**
     * Data object to be used for creating tree
     * @override
     * @type {TreeData<T>}
     */
    get data(): TreeData<T>;
    set data(data: TreeData<T>);
    /**
     * @override
     */
    protected get renderItems(): readonly T[];
    /**
     * Mode to use in the tree manager
     */
    protected get mode(): TreeManagerMode;
}
