import { TemplateResult, CSSResult } from '@refinitiv-ui/core';
import { TranslateDirective } from '@refinitiv-ui/translate';
import { CollectionComposer, TimeoutTaskRunner } from '@refinitiv-ui/utils';
import '@refinitiv-ui/phrasebook/lib/locale/en/tree-select';
import '../icon';
import '../text-field';
import '../pill';
import '../button';
import '../checkbox';
import '../tree';
import { Overlay } from '../overlay';
import { ComboBox, ComboBoxFilter as TreeSelectFilter } from '../combo-box';
import { CheckChangedEvent } from '../events';
import { TreeRenderer as TreeSelectRenderer } from '../tree';
import { TreeManager, TreeManagerMode } from '../tree/managers/tree-manager';
import { TreeSelectData, TreeSelectDataItem } from './helpers/types';
export { TreeSelectRenderer, TreeSelectData, TreeSelectDataItem, TreeSelectFilter };
/**
 * Dropdown control that allows selection from the tree list
 *
 * @attr {boolean} [opened=false] - Set dropdown to open
 * @prop {boolean} [opened=false] - Set dropdown to open
 * @attr {string} placeholder - Set placeholder text
 * @prop {string} placeholder - Set placeholder text
 * @fires confirm - Fired when selection is confirmed
 * @fires cancel - Fired when selection is cancelled
 * @fires query-changed - Fired when query in input box changed
 * @fires value-changed - Fired when value of control changed
 * @fires opened-changed - Fires when opened state changes
 */
export declare class TreeSelect extends ComboBox<TreeSelectDataItem> {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    constructor();
    static get styles(): CSSResult | CSSResult[];
    /**
     * Tracks the number of filter matches
     *
     * Only needed if internal filtering is unused
     */
    filterCount: number;
    /**
     * Memoized selection and expansion stats
     * Used for displaying counts and calculating control visibility/content
     */
    protected memo: {
        selected: number;
        selectable: number;
        expanded: number;
        expandable: number;
    };
    /**
     * Extracted values from {@link this.checkedGroupedItems}
     */
    protected pillsData: TreeSelectDataItem[];
    /**
     * Are there pills visible
     */
    protected hasPills: boolean;
    /**
     * Store references to items selected and visible at point of selection filter being applied
     * Allow for items to be removed from the selection, but still be visible
     */
    protected editSelectionItems: Set<TreeSelectDataItem>;
    /**
     * Composer used for live changes
     */
    protected composer: CollectionComposer<TreeSelectDataItem>;
    /**
     * Provide access to tree interface
     */
    protected treeManager: TreeManager<TreeSelectDataItem>;
    /**
     * Modification updates are called a lot
     *
     * This throttles the memo updates to reduce lookups
     */
    protected memoUpdateThrottle: TimeoutTaskRunner;
    /**
     * Used for translations
     * Beware tPromise!: TranslatePromise from Combo-box. It's different type from this translation.
     */
    protected t: TranslateDirective;
    /**
     * Breaks the relationship when multiple
     * selection mode is enabled
     */
    noRelation: boolean;
    /**
     * Should the control show pills
     */
    showPills: boolean;
    private _values;
    /**
     * Returns a values collection of the currently
     * selected item values
     * @type {string[]}
     */
    get values(): string[];
    set values(values: string[]);
    /**
     * Renderer used to render tree item elements
     * @type {TreeSelectRenderer}
     */
    renderer: TreeSelectRenderer;
    /**
     * Internal reference to selection area element
     */
    protected selectionAreaEl?: Overlay;
    /**
     * Internal reference to popup element
     */
    protected popupEl?: Overlay;
    /**
     * Set resolved data
     * @param value resolved data
     */
    protected set resolvedData(value: TreeSelectDataItem[]);
    protected get resolvedData(): TreeSelectDataItem[];
    /**
     * The the values from composer ignoring freeTextValue
     * @override
     */
    protected get composerValues(): string[];
    /**
     * Provide list of currently selected items
     */
    protected get selection(): TreeSelectDataItem[];
    /**
     * Get a list of selected item labels
     * @returns Has selection
     * @override
     */
    protected get selectedLabels(): string[];
    /**
     * Returns memoized selected state
     * @returns Has selection
     */
    protected get hasActiveSelection(): boolean;
    /**
     * Returns memoized all selected count
     * @returns Is all selected
     */
    protected get allSelected(): boolean;
    /**
     * Returns memoized expansion state
     * @returns Are all expanded
     */
    protected get hasExpansion(): boolean;
    /**
     * Determines if the expansion controls should be displayed
     *
     * @returns Control visible state
     */
    protected get expansionControlVisible(): boolean;
    /**
     * Determine if the selection filter is active
     * @returns Selection filter on/off
     */
    protected get selectionFilterState(): boolean;
    /**
     * Mode to use in the tree manager
     */
    protected get mode(): TreeManagerMode;
    /**
     * Get a list of selected items.
     * If all leaves are selected, a parent becomes selected
     * If mode is INDEPENDENT, grouping is not applied
     */
    protected get checkedGroupedItems(): readonly TreeSelectDataItem[];
    /**
     * Persist the current selection
     * Takes the current selection and uses it for {@link TreeSelect.values}
     * Also uses current selection as a revert position for future changes
     * @returns {void}
     */
    protected persistSelection(): void;
    /**
     * Reverse selection. Run on Esc or Cancel
     * @returns {void}
     */
    protected cancelSelection(): void;
    /**
     * Update memoized track
     *
     * Update states for expansion and selection
     *
     * @returns {void}
     */
    protected updateMemo(): void;
    /**
     * Utility method - closes and resets changes such as query
     * @returns {void}
     */
    protected closeAndReset(): void;
    /**
     * Save the current selection
     * @returns {void}
     */
    protected save(): void;
    /**
     * Discard the current selection
     * @returns {void}
     */
    protected cancel(): void;
    /**
     * Toggle tree level expansion action
     * @returns {void}
     */
    protected expansionToggleClickHandler(): void;
    /**
     * Toggle Selection of all tree items
     * @param event checked-change event
     * @returns {void}
     */
    protected selectionToggleHandler(event: CheckChangedEvent): void;
    /**
     * Remove selection filter
     * @returns {void}
     */
    protected fullClickHandler(): void;
    /**
     * Apply selection filter
     * @returns {void}
     */
    protected selectedClickHandler(): void;
    /**
     * Apply the selection filter by entering edit selection mode
     * @returns {void}
     */
    protected enterEditSelection(): void;
    /**
     * Remove selection filtering by exiting edit selection mode
     * @returns {void}
     */
    protected exitEditSelection(): void;
    /**
     * Executed when the popup is fully opened
     * @returns {void}
     */
    protected onPopupOpened(): void;
    /**
     * Clear selection filter
     * @returns {void}
     */
    protected clearSelectionFilter(): void;
    /**
     * Executed when the popup is fully closed
     * @returns {void}
     */
    protected onPopupClosed(): void;
    /**
     * Filter the internal items by query
     * Changes items' hidden state
     *
     * @returns {void}
     */
    protected filterItems(): void;
    /**
     * Utility method
     * @param items List of child items
     * Adds ancestors for each item passed and expand
     *
     * @returns {void}
     */
    protected addExpandedAncestorsToRender(items: TreeSelectDataItem[]): void;
    /**
     * Utility method
     * @param ancestor parent item
     * Adds parent and expands
     *
     * @returns {void}
     */
    protected addExpandedAncestorToRender(ancestor: TreeSelectDataItem): void;
    /**
     * Reacts to pill removal by de-selecting the related item
     * @param event Event containing the pill item
     *
     * @returns {void}
     */
    protected onPillRemoved(event: CustomEvent): void;
    /**
     * Handles key input
     * @param event Key down event object
     * @returns {void}
     */
    protected onKeyDown(event: KeyboardEvent): void;
    /**
     * Navigates up the list.
     * Opens the list if closed.
     * @param event keyboard event
     * @returns {void}
     */
    protected up(event: KeyboardEvent): void;
    /**
     * Navigates down the list.
     * Opens the list if closed.
     * @param event keyboard event
     * @returns {void}
     */
    protected down(event: KeyboardEvent): void;
    /**
     * Make sure that after up/down keys the focus gracefully moves to selection area
     * so the user can then use left/right/Enter keys for keyboard navigation
     * @returns {void}
     */
    private focusOnSelectionArea;
    /**
     * Adds a throttled update for pills and memo
     * @returns {void}
     */
    protected modificationUpdate(): void;
    /**
     * Update pills if {@link TreeSelect.showPills} showPills is applied
     *
     * @returns {void}
     */
    protected updatePills(): void;
    /**
     * Queries the composer for data items. Uses Infinity depth
     * @param engine Composer query engine
     * @returns Collection of matched items
     * @override
     */
    protected queryItems(engine: (item: TreeSelectDataItem, composer: CollectionComposer<TreeSelectDataItem>) => boolean): readonly TreeSelectDataItem[];
    /**
     * Queries the composer for data items,
     * matching by property value. Uses Infinity depth
     * @param property Property name to query
     * @param value Property value to match against
     * @returns Collection of matched items
     * @override
     */
    protected queryItemsByPropertyValue<K extends keyof TreeSelectDataItem>(property: K, value: TreeSelectDataItem[K]): readonly TreeSelectDataItem[];
    /**
     * Filter template
     * @returns Render template
     */
    protected get filtersTemplate(): TemplateResult;
    /**
     * Tree control template
     * @returns Render template
     */
    protected get treeControlsTemplate(): TemplateResult;
    /**
     * Conditional filter matches template
     * @returns Render template
     */
    protected get matchCountTemplate(): TemplateResult;
    /**
     * Commit controls template
     * @returns Render template
     */
    protected get commitControlsTemplate(): TemplateResult;
    /**
     * Pills template
     * @returns Render template
     */
    protected get pillsTemplate(): TemplateResult | undefined;
    /**
     * Returns template for popup
     * Lazy loads the popup
     * @returns Popup template or undefined
     */
    protected get popupTemplate(): TemplateResult | undefined;
}
