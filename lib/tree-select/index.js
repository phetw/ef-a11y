var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, html, property, styleMap, css, repeat, query, ifDefined } from '@refinitiv-ui/core';
import { translate } from '@refinitiv-ui/translate';
import { CollectionComposer, TimeoutTaskRunner } from '@refinitiv-ui/utils';
import '@refinitiv-ui/phrasebook/lib/locale/en/tree-select';
import '../icon';
import '../text-field';
import '../pill';
import '../button';
import '../checkbox';
import '../tree';
import { ComboBox } from '../combo-box';
import { TreeRenderer as TreeSelectRenderer } from '../tree';
import { CheckedState, TreeManager, TreeManagerMode } from '../tree/managers/tree-manager';
import { VERSION } from '..';
export { TreeSelectRenderer };
const MEMO_THROTTLE = 16;
const POPUP_POSITION = ['bottom-start', 'top-start'];
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
let TreeSelect = class TreeSelect extends ComboBox {
    constructor() {
        super();
        /**
         * Tracks the number of filter matches
         *
         * Only needed if internal filtering is unused
         */
        this.filterCount = 0;
        /**
         * Memoized selection and expansion stats
         * Used for displaying counts and calculating control visibility/content
         */
        this.memo = {
            selected: 0,
            selectable: 0,
            expanded: 0,
            expandable: 0
        };
        /**
         * Extracted values from {@link this.checkedGroupedItems}
         */
        this.pillsData = [];
        /**
         * Are there pills visible
         */
        this.hasPills = false;
        /**
         * Store references to items selected and visible at point of selection filter being applied
         * Allow for items to be removed from the selection, but still be visible
         */
        this.editSelectionItems = new Set();
        /**
         * Composer used for live changes
         */
        this.composer = new CollectionComposer([]);
        /**
         * Provide access to tree interface
         */
        this.treeManager = new TreeManager(this.composer);
        /**
         * Modification updates are called a lot
         *
         * This throttles the memo updates to reduce lookups
         */
        this.memoUpdateThrottle = new TimeoutTaskRunner(MEMO_THROTTLE);
        /**
         * Breaks the relationship when multiple
         * selection mode is enabled
         */
        this.noRelation = false;
        /**
         * Should the control show pills
         */
        this.showPills = false;
        this._values = [];
        /**
         * Renderer used to render tree item elements
         * @type {TreeSelectRenderer}
         */
        this.renderer = new TreeSelectRenderer(this);
        /**
         * TODO:
         * @ignore
         */
        this.multiple = true;
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
        return VERSION;
    }
    static get styles() {
        return css `
      [part=list] {
        display: flex;
        flex-direction: row;
        box-sizing: content-box;
        cursor: default;
      }

      [part=section] {
        display: flex;
        flex-direction: column;
        width: inherit;
        height: inherit;
        max-height: inherit;
        min-height: inherit;
        max-width: inherit;
        min-width: inherit;
        overflow: hidden;
      }

      [part=selection-area] {
        min-height: 0;
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: auto;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        outline: none;
      }

      [part~=control-container] {
        box-sizing: border-box;
        display: flex;
        flex-shrink: 0;
        flex-basis: auto;
        flex-grow: 0;
        align-items: center;
      }

      [part=pills] {
        flex: none;
      }
    `;
    }
    /**
     * Returns a values collection of the currently
     * selected item values
     * @type {string[]}
     */
    get values() {
        return this._values;
    }
    set values(values) {
        super.values = values;
        this._values = values;
    }
    /**
     * Set resolved data
     * @param value resolved data
     */
    set resolvedData(value) {
        const oldValue = this.resolvedData;
        if (value !== oldValue) {
            super.resolvedData = value;
            this.treeManager = new TreeManager(this.composer, this.mode);
            // keep the original values
            // do not use values setter to avoid unnecessary calls
            this._values = this.composerValues;
            this.listenToComposer();
            this.updateMemo();
            this.updatePills();
            void this.requestUpdate('data', oldValue);
        }
    }
    get resolvedData() {
        return super.resolvedData;
    }
    /**
     * The the values from composer ignoring freeTextValue
     * @override
     */
    get composerValues() {
        return this.treeManager.checkedItems.map(item => item.value || '').slice();
    }
    /**
     * Provide list of currently selected items
     */
    get selection() {
        return this.treeManager.checkedItems.slice();
    }
    /**
     * Get a list of selected item labels
     * @returns Has selection
     * @override
     */
    get selectedLabels() {
        return this.checkedGroupedItems.map(selected => this.getItemPropertyValue(selected, 'label') || '');
    }
    /**
     * Returns memoized selected state
     * @returns Has selection
     */
    get hasActiveSelection() {
        return this.memo.selected > 0;
    }
    /**
     * Returns memoized all selected count
     * @returns Is all selected
     */
    get allSelected() {
        return this.memo.selected === this.memo.selectable;
    }
    /**
     * Returns memoized expansion state
     * @returns Are all expanded
     */
    get hasExpansion() {
        return this.memo.expanded > 0;
    }
    /**
     * Determines if the expansion controls should be displayed
     *
     * @returns Control visible state
     */
    get expansionControlVisible() {
        // could be a static prop and updated via CC
        return this.memo.expandable > 0;
    }
    /**
     * Determine if the selection filter is active
     * @returns Selection filter on/off
     */
    get selectionFilterState() {
        return this.editSelectionItems.size > 0;
    }
    /**
     * Mode to use in the tree manager
     */
    get mode() {
        return !this.noRelation ? TreeManagerMode.RELATIONAL : TreeManagerMode.INDEPENDENT;
    }
    /**
     * Get a list of selected items.
     * If all leaves are selected, a parent becomes selected
     * If mode is INDEPENDENT, grouping is not applied
     */
    get checkedGroupedItems() {
        const treeManager = this.treeManager;
        const checkedItems = treeManager.checkedItems;
        if (this.mode === TreeManagerMode.INDEPENDENT) {
            return checkedItems;
        }
        const checkedGroupItems = [];
        const unchecked = []; // need for performance to not double check same ancestors
        checkedItems.forEach(item => {
            const ancestors = treeManager.getItemAncestors(item);
            for (let i = 0; i < ancestors.length; i += 1) {
                const ancestor = ancestors[i];
                // An ancestor is already included. No need to continue
                if (checkedGroupItems.includes(ancestor)) {
                    return;
                }
                // An ancestor has been already checked. Do not check again
                if (unchecked.includes(ancestor)) {
                    continue;
                }
                // Ancestor is checked. No need to check any other ancestors
                if (treeManager.getItemCheckedState(ancestor) === CheckedState.CHECKED) {
                    checkedGroupItems.push(ancestor);
                    return;
                }
                // Do not check again this ancestor for performance
                unchecked.push(ancestor);
            }
            checkedGroupItems.push(item);
        });
        return checkedGroupItems;
    }
    /**
     * Persist the current selection
     * Takes the current selection and uses it for {@link TreeSelect.values}
     * Also uses current selection as a revert position for future changes
     * @returns {void}
     */
    persistSelection() {
        const oldValues = this.values.slice();
        const newValues = this.composerValues;
        const oldComparison = oldValues.sort().toString();
        const newComparison = newValues.sort().toString();
        if (oldComparison !== newComparison) {
            this.values = newValues;
            this.notifyPropertyChange('value', this.value);
        }
    }
    /**
     * Reverse selection. Run on Esc or Cancel
     * @returns {void}
     */
    cancelSelection() {
        // values setter updates the collection composer if required
        this.values = this._values;
    }
    /**
     * Update memoized track
     *
     * Update states for expansion and selection
     *
     * @returns {void}
     */
    updateMemo() {
        this.memo = {
            expanded: 0,
            expandable: 0,
            selected: 0,
            selectable: 0
        };
        this.queryItems((item, composer) => {
            const hasChildren = composer.getItemChildren(item);
            if (hasChildren.length) {
                this.memo.expandable += 1;
                if (this.treeManager.isItemExpanded(item) && this.treeManager.isItemCheckable(item)) {
                    this.memo.expanded += 1;
                }
            }
            else if (this.treeManager.isItemCheckable(item)) {
                this.memo.selectable += 1;
                if (this.getItemPropertyValue(item, 'selected') === true) {
                    this.memo.selected += 1;
                }
            }
            return false;
        });
        void this.requestUpdate();
    }
    /**
     * Utility method - closes and resets changes such as query
     * @returns {void}
     */
    closeAndReset() {
        this.setQuery('');
        this.setOpened(false);
    }
    /**
     * Save the current selection
     * @returns {void}
     */
    save() {
        const event = new CustomEvent('confirm');
        this.dispatchEvent(event);
        if (!event.defaultPrevented) {
            this.persistSelection();
            this.closeAndReset();
        }
    }
    /**
     * Discard the current selection
     * @returns {void}
     */
    cancel() {
        const event = new CustomEvent('cancel');
        this.dispatchEvent(event);
        if (!event.defaultPrevented) {
            this.closeAndReset();
            // reset always happens on popup close action
        }
    }
    /**
     * Toggle tree level expansion action
     * @returns {void}
     */
    expansionToggleClickHandler() {
        if (this.hasExpansion) {
            this.treeManager.collapseAllItems();
        }
        else {
            this.treeManager.expandAllItems();
        }
    }
    /**
     * Toggle Selection of all tree items
     * @param event checked-change event
     * @returns {void}
     */
    selectionToggleHandler(event) {
        if (event.detail.value) {
            this.treeManager.checkAllItems();
        }
        else {
            this.treeManager.uncheckAllItems();
        }
    }
    /**
     * Remove selection filter
     * @returns {void}
     */
    fullClickHandler() {
        this.exitEditSelection();
    }
    /**
     * Apply selection filter
     * @returns {void}
     */
    selectedClickHandler() {
        if (this.hasActiveSelection) {
            this.enterEditSelection();
        }
    }
    /**
     * Apply the selection filter by entering edit selection mode
     * @returns {void}
     */
    enterEditSelection() {
        this.editSelectionItems = new Set(this.treeManager.checkedItems);
        this.filterItems();
    }
    /**
     * Remove selection filtering by exiting edit selection mode
     * @returns {void}
     */
    exitEditSelection() {
        this.clearSelectionFilter();
        this.filterItems();
    }
    /**
     * Executed when the popup is fully opened
     * @returns {void}
     */
    onPopupOpened() {
        super.onPopupOpened();
        this.clearSelectionFilter();
        this.updatePills();
        this.updateMemo();
    }
    /**
     * Clear selection filter
     * @returns {void}
     */
    clearSelectionFilter() {
        this.editSelectionItems.clear();
    }
    /**
     * Executed when the popup is fully closed
     * @returns {void}
     */
    onPopupClosed() {
        super.onPopupClosed();
        this.updateMemo();
        this.cancelSelection();
        this.exitEditSelection();
    }
    /**
     * Filter the internal items by query
     * Changes items' hidden state
     *
     * @returns {void}
     */
    filterItems() {
        // if filter is null, it is off and external app is responsible
        if (this.filter) {
            const filter = this.filter;
            const items = this.queryItems((item, composer) => {
                // do not filter hidden items
                if (item.hidden) {
                    return false;
                }
                // does item match the selection filter
                let result = true;
                if (this.editSelectionItems.size && !this.editSelectionItems.has(item)) {
                    result = false;
                }
                // item matches selection, can have conventional filter applied
                if (result) {
                    result = filter(item);
                }
                if (result) {
                    composer.updateItemTimestamp(item);
                    this.treeManager.includeItem(item);
                }
                else {
                    this.treeManager.excludeItem(item);
                }
                return result;
            }).slice();
            // do not expand EMS if there is no filter applied
            if (this.query || this.editSelectionItems.size) {
                this.addExpandedAncestorsToRender(items);
            }
            this.filterCount = items.length;
            // unlike CCB, we do not close EMS when there is no matches for filter
        }
        this.forcePopupLayout();
    }
    /**
     * Utility method
     * @param items List of child items
     * Adds ancestors for each item passed and expand
     *
     * @returns {void}
     */
    addExpandedAncestorsToRender(items) {
        // establish unique ancestors set
        const ancestors = new Set();
        // we iterate each item match so as to find ancestors
        items.forEach((item) => {
            // get the ancestors
            const parent = this.treeManager.getItemParent(item);
            if (parent && !ancestors.has(parent)) {
                this.treeManager.getItemAncestors(item).forEach((ancestor) => {
                    ancestors.add(ancestor); // track ancestors
                    this.addExpandedAncestorToRender(ancestor);
                });
            }
        });
    }
    /**
     * Utility method
     * @param ancestor parent item
     * Adds parent and expands
     *
     * @returns {void}
     */
    addExpandedAncestorToRender(ancestor) {
        this.treeManager.includeItem(ancestor);
        this.treeManager.expandItem(ancestor);
    }
    /**
     * Reacts to pill removal by de-selecting the related item
     * @param event Event containing the pill item
     *
     * @returns {void}
     */
    onPillRemoved(event) {
        const pill = event.target;
        const item = this.queryItemsByPropertyValue('value', pill.value)[0];
        if (item) {
            this.treeManager.uncheckItem(item);
            // Focus must be shifted as otherwise focus is shifted to body once the item is removed and popup gets closed
            this.shiftFocus();
        }
    }
    /**
     * Handles key input
     * @param event Key down event object
     * @returns {void}
     */
    /* istanbul ignore next */
    onKeyDown(event) {
        var _a, _b;
        // There are three areas, which have different reaction on key press:
        // 1) search field
        // 2) tree selection
        // 3) popup panel
        if (((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.activeElement) === this.selectionAreaEl && this.listEl) {
            // Focus within selection area. Propagate all events
            this.reTargetEvent(event, this.listEl);
        }
        else if (!((_b = this.popupEl) === null || _b === void 0 ? void 0 : _b.focused)) {
            // search field is in focus
            // combo box logic should take care
            super.onKeyDown(event);
        }
        else {
            // up/down to selection area
            switch (event.key) {
                case 'Up':
                case 'ArrowUp':
                case 'Down':
                case 'ArrowDown':
                    super.onKeyDown(event);
                    break;
                // no default
            }
        }
    }
    /**
     * Navigates up the list.
     * Opens the list if closed.
     * @param event keyboard event
     * @returns {void}
     */
    /* istanbul ignore next */
    up(event) {
        super.up(event);
        this.focusOnSelectionArea();
    }
    /**
     * Navigates down the list.
     * Opens the list if closed.
     * @param event keyboard event
     * @returns {void}
     */
    /* istanbul ignore next */
    down(event) {
        super.down(event);
        this.focusOnSelectionArea();
    }
    /**
     * Make sure that after up/down keys the focus gracefully moves to selection area
     * so the user can then use left/right/Enter keys for keyboard navigation
     * @returns {void}
     */
    /* istanbul ignore next */
    focusOnSelectionArea() {
        // The logic needs to happen after the update cycle
        // as otherwise focus logic may contradict with other components
        // and the focus is not moved
        void this.updateComplete.then(() => {
            var _a;
            (_a = this.selectionAreaEl) === null || _a === void 0 ? void 0 : _a.focus();
        });
    }
    /**
     * Adds a throttled update for pills and memo
     * @returns {void}
     */
    modificationUpdate() {
        super.modificationUpdate();
        this.memoUpdateThrottle.schedule(() => {
            this.updatePills();
            this.updateMemo();
        });
    }
    /**
     * Update pills if {@link TreeSelect.showPills} showPills is applied
     *
     * @returns {void}
     */
    updatePills() {
        if (this.showPills) {
            this.pillsData = this.checkedGroupedItems.slice();
            this.hasPills = !!this.pillsData.length;
        }
    }
    /**
     * Queries the composer for data items. Uses Infinity depth
     * @param engine Composer query engine
     * @returns Collection of matched items
     * @override
     */
    queryItems(engine) {
        return this.composer.queryItems(engine, Infinity);
    }
    /**
     * Queries the composer for data items,
     * matching by property value. Uses Infinity depth
     * @param property Property name to query
     * @param value Property value to match against
     * @returns Collection of matched items
     * @override
     */
    queryItemsByPropertyValue(property, value) {
        return this.composer.queryItemsByPropertyValue(property, value, Infinity);
    }
    /**
     * Filter template
     * @returns Render template
     */
    get filtersTemplate() {
        return html `
        <div part="control-container filter-control">
          <div part="match-count-wrapper">
            ${this.matchCountTemplate}
          </div>
          <div part="filter-wrapper">
            <div
              role="button"
              tabindex="0"
              active
              part="control full-filter${!this.selectionFilterState ? ' active' : ''}"
              @tap="${this.fullClickHandler}">${this.t('FULL_LIST')}</div>
            <div
              role="button"
              tabindex="${ifDefined(this.hasActiveSelection ? 0 : undefined)}"
              part="control selected-filter${this.selectionFilterState ? ' active' : ''}${!this.hasActiveSelection ? ' disabled' : ''}"
              @tap="${this.selectedClickHandler}">${this.t('SELECTED')}</div>
          </div>
        </div>
    `;
    }
    /**
     * Tree control template
     * @returns Render template
     */
    get treeControlsTemplate() {
        let expansionControl = html ``;
        if (this.expansionControlVisible) {
            expansionControl = html `
        <div part="filter-wrapper">
          <div
            role="button"
            tabindex="0"
            part="control expand-toggle"
            @tap="${this.expansionToggleClickHandler}">${this.t('EXPAND_COLLAPSE', { expansion: this.hasExpansion })}</div>
          </div>
      `;
        }
        return html `
        <div part="control-container tree-control">
            <ef-checkbox
              part="selection-toggle"
              .checked="${this.allSelected}"
              .indeterminate="${this.hasActiveSelection && !this.allSelected}"
              @checked-changed="${this.selectionToggleHandler}">${this.t('SELECT_CONTROL', { selected: this.allSelected })}</ef-checkbox>
          ${expansionControl}
        </div>
    `;
    }
    /**
     * Conditional filter matches template
     * @returns Render template
     */
    get matchCountTemplate() {
        return this.query ? html `
            <span part="match-count">${this.t('MATCHES_NUM', { numMatched: this.filterCount })}</span>
    ` : html ``;
    }
    /**
     * Commit controls template
     * @returns Render template
     */
    get commitControlsTemplate() {
        return html `
      <ef-button
        id="cancel"
        part="cancel-button"
        @tap="${this.cancel}">${this.t('CANCEL')}</ef-button>
      <ef-button
        id="done"
        part="done-button"
        cta
        @tap="${this.save}">${this.t('DONE')}</ef-button>
    `;
    }
    /**
     * Pills template
     * @returns Render template
     */
    get pillsTemplate() {
        // always injected when we have show pills vs injecting and re-injecting partial
        // visibility will typically be controlled by styling: display: none / block or similar
        if (this.showPills && this.hasPills) {
            return html `<div part="pills">
        ${repeat(this.pillsData, pill => pill.value, pill => html `
        <ef-pill
          tabindex="-1"
          clears
          .readonly="${pill.readonly || this.readonly}"
          .disabled="${pill.disabled || this.disabled}"
          .value="${pill.value}"
          @clear="${this.onPillRemoved}">${pill.label}</ef-pill>`)}
      </div>`;
        }
    }
    /**
     * Returns template for popup
     * Lazy loads the popup
     * @returns Popup template or undefined
     */
    get popupTemplate() {
        if (this.lazyRendered) {
            return html `
      <ef-overlay
        part="list"
        style=${styleMap(this.popupDynamicStyles)}
        @opened="${this.onPopupOpened}"
        @closed="${this.onPopupClosed}"
        .focusBoundary="${this}"
        .opened="${this.opened}"
        .positionTarget="${this}"
        .position="${POPUP_POSITION}"
        .delegatesFocus=${true}
        no-cancel-on-outside-click
        tabindex="0"
        with-shadow
        no-overlap
        no-autofocus>
        <div part="section">
          ${this.filtersTemplate}
          ${this.treeControlsTemplate}
          <div part="selection-area" tabindex="-1">
            <ef-tree
              id="internal-list"
              @focusin="${this.shiftFocus}"
              tabindex="-1"
              part="tree"
              .noRelation=${this.noRelation}
              .renderer=${this.renderer}
              .data="${this.composer}"
              .multiple="${this.multiple}"></ef-tree>
            ${this.pillsTemplate}
          </div>
          <div part="control-container footer" id="footer">${this.commitControlsTemplate}</div>
        </div>
      </ef-overlay>
      `;
        }
    }
};
__decorate([
    translate()
], TreeSelect.prototype, "t", void 0);
__decorate([
    property({ attribute: 'no-relation', type: Boolean })
], TreeSelect.prototype, "noRelation", void 0);
__decorate([
    property({ type: Boolean, attribute: 'show-pills' })
], TreeSelect.prototype, "showPills", void 0);
__decorate([
    property({ type: Array, attribute: false })
], TreeSelect.prototype, "values", null);
__decorate([
    property({ type: Function, attribute: false })
], TreeSelect.prototype, "renderer", void 0);
__decorate([
    query('[part=selection-area]')
], TreeSelect.prototype, "selectionAreaEl", void 0);
__decorate([
    query('[part=list]')
], TreeSelect.prototype, "popupEl", void 0);
TreeSelect = __decorate([
    customElement('ef-tree-select', {
        alias: 'emerald-multi-select'
    })
], TreeSelect);
export { TreeSelect };
//# sourceMappingURL=index.js.map