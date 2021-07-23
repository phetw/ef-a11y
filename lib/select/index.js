var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ControlElement, html, css, customElement, property, styleMap, query, FocusedPropertyKey } from '@refinitiv-ui/core';
import '../overlay';
import { Item } from '../item';
import '../item';
import '../icon';
import { CollectionComposer, TimeoutTaskRunner, AnimationTaskRunner } from '@refinitiv-ui/utils';
import { VERSION } from '../';
/**
 * Key direction
 */
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = -1] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
})(Direction || (Direction = {}));
// Observer config for items
const observerOptions = {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true,
    attributeFilter: [
        'label',
        'value',
        'selected',
        'disabled',
        'readonly'
    ]
};
const LABEL_SEPARATOR = ', '; // TODO: for multiselect
const POPUP_POSITION = ['bottom-start', 'top-start'];
const KEY_SEARCH_DEBOUNCER = 300;
/**
 * Expands upon the native select element,
 * providing a fully themeable dropdown element.
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @fires value-changed - Fired when the value property changes.
 * @fires opened-changed - Fired when the opened property changes.
 */
let Select = class Select extends ControlElement {
    constructor() {
        super(...arguments);
        this.composer = new CollectionComposer([]);
        this._data = null;
        this.popupDynamicStyles = {}; /* set popup min-width based on select width or CSS vars */
        this.lazyRendered = false; /* speed up rendering by not populating popup window on first load */
        this.popupScrollTop = 0; /* remember scroll position on popup refit actions */
        this.observingMutations = false;
        this.keySearchTerm = ''; /* used for quick search */
        this.keySearchThrottler = new TimeoutTaskRunner(KEY_SEARCH_DEBOUNCER);
        this.resizeThrottler = new AnimationTaskRunner();
        /**
        * Placeholder to display when no value is set
        */
        this.placeholder = '';
        /**
        * Toggles the opened state of the list
        */
        this.opened = false;
        /**
        * Set state to error
        */
        this.error = false;
        /**
        * Set state to warning
        */
        this.warning = false;
        /**
         * This variable is here to ensure that the value and data are in sync when data is set after the value.
         * This is developer error to use both, selected and value to control the selections.
         * Therefore as soon as value has been set externally, selected state in data setter is ignored
         */
        this.cachedValue = '';
        /**
         * Handles all mutations and filters out
         * any Shadow DOM changes in polyfilled browsers
         * mutations collection of mutation records
         * @param mutations Observer mutations
         * @returns {void}
         */
        this.handleMutations = (mutations) => {
            const hasLightDomMutations = mutations
                .some(m => m.target.getRootNode() !== this.shadowRoot);
            if (hasLightDomMutations) {
                void this.requestUpdate();
            }
        };
        this.shouldOpenOnFocus = false;
        /**
         * Used to store scroll position
         * @returns {void}
         */
        this.onPopupScroll = ({ target }) => {
            this.popupScrollTop = target.scrollTop;
        };
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
        return VERSION;
    }
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return CSS template
     */
    static get styles() {
        return css `
      :host {
        outline: none;
        position: relative;
        user-select: none;
        -webkit-user-select: none;
        display: inline-block;
      }

      [part=label],
      [part=placeholder] {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      [part=icon] {
        flex: none;
      }
      :host [part=list] {
        overflow-y: auto;
      }
      :host [part="list"] ::slotted(:not(ef-item)) {
        display: none;
      }
      #box {
        align-items: center;
        display: inline-flex;
        flex-flow: row nowrap;
        overflow: hidden;
        flex: 1 1 100%;
      }
      #text {
        position: relative;
        flex: 1 1 auto;
        height: 100%;
        display: flex;
        align-items: center;
        min-width: 0;
      }
      #trigger {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
      #select {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        border: none;
        padding: 0;
        margin: 0;
      }
    `;
    }
    /**
    * Current text content of the selected value
    * @readonly
    */
    get label() {
        return this.labels[0];
    }
    /**
    * Current text content of the selected values
    * @ignore
    * @readonly
    */
    get labels() {
        if (this.hasDataItems()) {
            return this.selectedDataItems.map(item => this.composer.getItemPropertyValue(item, 'label'));
        }
        return this.selectedSlotItems.map(item => this.getItemLabel(item));
    }
    /**
    * Switch to multiple select input
    * @ignore
    * @param multiple True if element needs to support multi selection
    */
    set multiple(multiple) {
        // TODO: not implemented
    }
    /**
    * @ignore
    */
    get multiple() {
        return false;
    }
    /**
    * Construct the menu from data object. Cannot be used with slotted content
    * @type {SelectData | null}
    */
    get data() {
        return this._data;
    }
    set data(value) {
        const oldValue = this._data;
        if (oldValue === value) {
            return;
        }
        else if (Array.isArray(value)) {
            this.composer = new CollectionComposer(value);
        }
        else {
            this.composer = new CollectionComposer([]);
        }
        this._data = value;
        // check if new set of data contains selected, which becomes the new value
        // otherwise try to set current value
        if (!this.selectedDataItems.length) {
            this.value = this.cachedValue;
        }
        void this.requestUpdate('data', oldValue);
    }
    /**
    * Value of the element
    * @param value Element value
    */
    set value(value) {
        value = this.castValue(value);
        this.cachedValue = value;
        const oldValue = this.value;
        if (value !== oldValue) {
            this.stopObserveMutations();
            // setting the value always overrides the selected attribute
            // either defined in data or by having selected as an attribute
            this.clearSelection();
            this.selectValue(value);
            void this.requestUpdate('value', oldValue);
        }
    }
    get value() {
        return this.values[0] || '';
    }
    /**
     * Array of selected items` values
     * @ignore
     * @readonly
     */
    get values() {
        if (this.hasDataItems()) {
            return this.selectedDataItems.map(item => this.composer.getItemPropertyValue(item, 'value'));
        }
        return this.selectedSlotItems.map(item => this.getItemValue(item));
    }
    /**
     * Updates the element
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    update(changedProperties) {
        this.cachedValue = ''; /* reset cached value as it is only valid when value and data are set the same time */
        const focusedChanged = changedProperties.has(FocusedPropertyKey);
        // the opened logic is bound to focus state
        if (focusedChanged) {
            // When focus changes the popup can open only on tapstart
            if (this.focused && this.shouldOpenOnFocus) {
                this.setOpened(true);
            }
            this.shouldOpenOnFocus = false;
        }
        if (changedProperties.has('opened')) {
            if (this.opened) {
                this.opening();
            }
            else {
                this.closing();
            }
        }
        super.update(changedProperties);
    }
    /**
     * Called after the component is first rendered
     * @param changedProperties Properties which have changed
     * @returns {void}
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.addEventListener('keydown', this.onKeyDown); /* keydown when select is closed */
    }
    /**
     * Called when element finished updating
     * @param changedProperties Properties which have changed
     * @returns {void}
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        // we must wait while all elements in the tree are updated before starting the mutation observer
        void this.updateComplete.then(() => {
            // Start watching for any child mutations
            this.observeMutations();
        });
    }
    /**
     * Run when popup is opening
     * Calculate CSS variables an computed width
     * @returns {void}
     */
    opening() {
        this.lazyRendered = true;
        this.restrictPopupWidth(); /* styles ary dynamically applied in rendering */
    }
    /**
     * Run when popup is closing
     * @returns {void}
     */
    closing() {
        // no content
    }
    /**
     * Observe any changes to Light DOM
     * This observer is self contained and should
     * be garbage collected when there are no element references.
     * @returns {void}
     */
    observeMutations() {
        // Start watching for any new mutations if slotted content is used
        if (!this.observingMutations && !this.hasDataItems()) {
            if (!this.mutationObserver) {
                this.mutationObserver = new MutationObserver(this.handleMutations);
            }
            this.mutationObserver.observe(this, observerOptions);
            this.observingMutations = true;
        }
    }
    /**
     * Stop observe any changes to Light DOM
     * There must not be any observation on any internal changes
     * as it may cause excessive re-rendering
     * @returns {void}
     */
    stopObserveMutations() {
        if (this.observingMutations && this.mutationObserver) {
            this.mutationObserver.disconnect();
            this.observingMutations = false;
        }
    }
    /**
     * Popup has to use max width if --list-max-width specified
     * otherwise, popup should have same width as control or wider
     * @returns {void}
     */
    restrictPopupWidth() {
        /* istanbul ignore next */
        if (this.offsetWidth === 0) {
            // this code might happen only when opened has been set during initialisation
            // or when display is set to none
            this.resizeThrottler.schedule(() => {
                if (this.offsetWidth) { /* must be here to avoid infinitive loop */
                    this.restrictPopupWidth();
                    void this.requestUpdate();
                }
            });
            return;
        }
        const maxWidth = this.getComputedVariable('--list-max-width', 'none');
        let minWidth = this.offsetWidth;
        if (maxWidth !== 'none') {
            // reset min-width if max-width less than min-width, otherwise browser won't apply max-width
            if (parseInt(maxWidth, 10) < minWidth) {
                minWidth = 0;
            }
        }
        this.popupDynamicStyles.minWidth = `${minWidth}px`;
    }
    /**
     * Set opened state with event
     * @param opened True if opened
     * @returns {void}
     */
    setOpened(opened) {
        if (this.opened !== opened) {
            this.notifyPropertyChange('opened', opened);
            this.opened = opened;
        }
    }
    /**
     * This flag is required to remove the frame gap
     * between tap start and opening the popup
     * @returns {void}
     */
    openOnFocus() {
        if (this.opened) {
            return;
        }
        if (this.focused) {
            this.setOpened(true);
            return;
        }
        this.shouldOpenOnFocus = true;
    }
    /**
     * Toggles the opened state of the list
     * @returns {void}
     */
    toggleOpened() {
        if (this.opened) {
            this.setOpened(false);
        }
        else {
            this.openOnFocus();
        }
    }
    /**
     * Scroll to first selected item
     * @returns {void}
     */
    scrollToSelected() {
        const selected = this.getSelectedElements()[0];
        if (selected) {
            selected.scrollIntoView({
                block: 'nearest'
            });
        }
    }
    /**
     * Used to restore scroll position on each refit event
     * @returns {void}
     */
    onPopupRefit({ target }) {
        target.scrollTop = this.popupScrollTop;
    }
    /**
     * Run when popup closes externally via opened-changed event
     * Required to propagate the event
     * @param event opened-changed event
     * @returns {void}
     */
    onPopupOpenedChanged(event) {
        event.preventDefault();
        this.setOpened(event.detail.value);
    }
    /**
     * Run when popup gets opened
     * @returns {void}
     */
    onPopupOpened({ target }) {
        this.scrollToSelected();
        this.setItemHighlight(this.getSelectedElements()[0]);
        const eventOptions = {
            capture: true,
            passive: true
        };
        target === null || target === void 0 ? void 0 : target.addEventListener('scroll', this.onPopupScroll, eventOptions);
    }
    /**
     * Run when popup gets closed
     * @returns {void}
     */
    onPopupClosed({ target }) {
        const eventOptions = {
            capture: true,
            passive: true
        };
        target === null || target === void 0 ? void 0 : target.removeEventListener('scroll', this.onPopupScroll, eventOptions);
        this.setItemHighlight();
        this.popupScrollTop = 0;
    }
    /**
     * Run when tap event happens on render root
     * @param event tap event
     * @returns {void}
     */
    onPopupTap(event) {
        const item = this.findSelectableElement(event);
        if (item) {
            this.setValueAndNotify(this.getItemValue(item));
            this.setOpened(false);
        }
    }
    /**
     * Run mouse move event over the popup
     * @param event mouse move event
     * @returns {void}
     */
    onPopupMouseMove(event) {
        var _a;
        (_a = this.menuEl) === null || _a === void 0 ? void 0 : _a.focus();
        const item = this.findSelectableElement(event);
        if (item) {
            this.setItemHighlight(item);
        }
    }
    /**
     * Handles key input when popup is closed
     * @param event Key down event object
     * @returns {void}
     */
    onKeyDown(event) {
        switch (event.key) {
            case 'Up':
            case 'ArrowUp':
            case 'Down':
            case 'ArrowDown':
            case 'Enter':
            case 'Spacebar':
            case ' ':
                this.setOpened(true);
                break;
            default:
                return;
        }
        event.preventDefault();
    }
    /**
     * Handles popup key input when popup is opened
     * @param event Key down event object
     * @returns {void}
     */
    onPopupKeyDown(event) {
        var _a;
        switch (event.key) {
            case ' ':
            case 'Spacebar':
            case 'Enter':
                (_a = this.highlightedItem) === null || _a === void 0 ? void 0 : _a.click();
                break;
            case 'Up':
            case 'ArrowUp':
                this.focusElement(Direction.Up);
                break;
            case 'Down':
            case 'ArrowDown':
                this.focusElement(Direction.Down);
                break;
            case 'Tab':
                this.focusElement(event.shiftKey ? Direction.Up : Direction.Down);
                break;
            default:
                if (this.isValidFilterKey(event)) {
                    this.onKeySearch(event.key);
                    break;
                }
                return;
            // no default
        }
        event.preventDefault();
        event.stopPropagation(); /* must be her to not reach self key listener */
    }
    /**
     * Check if keyboard keydown can be used for data searching
     * @param event Keyboard event
     * @returns true if a valid key
     */
    isValidFilterKey(event) {
        // all printable keys have length of 1. This is better than regexp as we cover all non latin characters
        return event.key.length === 1
            && !event.ctrlKey
            && !event.altKey
            && !event.metaKey;
    }
    /**
     * Focus and highlight the next/previous element
     * @param direction Focus next or previous element
     * @returns {void}
     */
    focusElement(direction) {
        const highlightedItem = this.highlightedItem || this.getSelectedElements()[0];
        const children = this.getSelectableElements();
        const idx = highlightedItem ? children.indexOf(highlightedItem) : -1;
        let focusElement;
        if (direction === 1) {
            focusElement = idx === -1 ? children[0] : children[idx + 1];
        }
        else {
            focusElement = idx === -1 ? children[children.length - 1] : children[idx - 1];
        }
        if (!focusElement) {
            focusElement = direction === 1 ? children[0] : children[children.length - 1];
        }
        if (focusElement) {
            focusElement.focus();
            this.setItemHighlight(focusElement);
        }
    }
    /**
     * Highlight or remove highlight from an item
     * @param [item] An item to highlight
     * @returns {void}
     */
    setItemHighlight(item) {
        if (this.highlightedItem === item) {
            return;
        }
        if (this.highlightedItem) {
            this.highlightedItem.highlighted = false;
        }
        this.highlightedItem = item;
        if (item) {
            item.highlighted = true;
        }
    }
    /**
     * A simple search that highlight elements on key press
     * @param key A key pressed
     * @returns {void}
     */
    onKeySearch(key) {
        this.keySearchTerm += key.toLowerCase();
        this.keySearchThrottler.schedule(() => {
            this.keySearchTerm = '';
        });
        // start from highlighted and continue in circles
        let selectableElements = this.getSelectableElements();
        const highlightedIdx = this.highlightedItem ? selectableElements.indexOf(this.highlightedItem) : -1;
        selectableElements = selectableElements.concat(selectableElements.splice(0, highlightedIdx));
        const focusElement = selectableElements.find(item => {
            const label = this.getItemLabel(item).toLowerCase();
            return label.startsWith(this.keySearchTerm) && item !== this.highlightedItem;
        });
        if (focusElement) {
            focusElement.focus();
            this.setItemHighlight(focusElement);
        }
    }
    /**
     * Check if element can be selected
     * @param element Element to check
     * @returns true if element can be selected
     */
    isSelectableElement(element) {
        // TODO: remove disabled && readonly check once ControlElement tabIndex issue is fixed
        return element instanceof Item && element.tabIndex >= 0 && !element.disabled && !element.readonly;
    }
    /**
     * Get a list of selectable HTML Elements
     * *Can be used only when select is opened*
     * @returns A list of selectable HTML elements
     */
    getSelectableElements() {
        const root = this.hasDataItems() ? this.menuEl : this;
        /* istanbul ignore next */
        if (!root) {
            return [];
        }
        const items = [];
        const rootChildren = root.children;
        for (let i = 0; i < rootChildren.length; i += 1) {
            const item = rootChildren[i];
            if (this.isSelectableElement(item)) {
                items.push(item);
            }
        }
        return items;
    }
    /**
     * Find selectable element is the event composed path
     * @param event Event to check
     * @returns The first selectable element or undefined
     */
    findSelectableElement(event) {
        const path = event.composedPath();
        for (let i = 0; i < path.length; i += 1) {
            const element = path[i];
            if (element === this) {
                return;
            }
            if (this.isSelectableElement(element)) {
                return element;
            }
        }
    }
    /**
     * Get a list of selected HTML elements
     * *Can be used only when select is opened*
     * @returns A list of selected elements
     */
    getSelectedElements() {
        return this.getSelectableElements().filter(item => item.selected);
    }
    /**
     * Clears the current selected items
     * @returns {void}
     */
    clearSelection() {
        if (this.hasDataItems()) {
            this.selectedDataItems.forEach((item) => this.composer.setItemPropertyValue(item, 'selected', false));
        }
        else {
            this.selectedSlotItems.forEach(item => {
                item.selected = false;
            });
        }
        void this.requestUpdate();
    }
    /**
     * Mark item as selected
     * @param value Value to select
     * @returns true if corresponding item is found and item selected
     */
    selectValue(value) {
        if (!this.values.includes(value)) {
            if (this.hasDataItems()) {
                return this.selectDataItem(value);
            }
            else {
                return this.selectSlotItem(value);
            }
        }
        return false;
    }
    /**
     * Mark data item as selected
     * @param value Item value
     * @returns true if corresponding item is found and item selected
     */
    selectDataItem(value) {
        const item = this.composer.queryItemsByPropertyValue('value', value)[0];
        if (item) {
            this.composer.setItemPropertyValue(item, 'selected', true);
            return true;
        }
        return false;
    }
    /**
     * Mark slotted item as selected
     * @param value Item value, item label or item text content
     * @returns true if corresponding item is found and item selected
     */
    selectSlotItem(value) {
        const items = this.getSelectableElements();
        for (let i = 0; i < items.length; i += 1) {
            const item = items[i];
            if (this.getItemValue(item) === value) {
                item.selected = true;
                return true;
            }
        }
        return false;
    }
    /**
     * Helper to return a value from an item
     * @param item select item
     * @returns value
     */
    getItemValue(item) {
        return item.value || (item.hasAttribute('value') ? '' : this.getItemLabel(item));
    }
    /**
     * Helper to return a label from an item
     * @param item select item
     * @returns value
     */
    getItemLabel(item) {
        return item.label || item.textContent || '';
    }
    /**
     * Check whether select is working with data or slotted content
     * @returns True if working with data
     */
    hasDataItems() {
        var _a;
        return !!((_a = this.data) === null || _a === void 0 ? void 0 : _a.length);
    }
    /**
     * Retrieve the selected data items
     * @returns Selected data item
     */
    get selectedDataItems() {
        return this.composer.queryItemsByPropertyValue('selected', true);
    }
    /**
     * Retrieve the selected items
     * @returns Selected data item
     */
    get selectedSlotItems() {
        return this.getSelectedElements();
    }
    /**
     * Calculating whether the placeholder should be hidden
     * @returns result
     */
    placeholderHidden() {
        return !!(this.labels.length > 0 || this.value);
    }
    /**
     * Create template for menu item
     * @param item JSON object to parse
     * @returns template result
     */
    toItem(item) {
        switch (item.type) {
            case 'divider':
                return html `<ef-item part="item" type="divider"></ef-item>`;
            case 'header':
                return html `<ef-item
          part="item"
          type="header"
          .label=${item.label}></ef-item>`;
            // no default
        }
        return html `<ef-item
      part="item"
      .value=${item.value}
      .label=${item.label}
      ?selected=${this.composer.getItemPropertyValue(item, 'selected')}
      ?disabled=${item.disabled}
    ></ef-item>`;
    }
    /**
     * Template for placeholder
     */
    get placeholderTemplate() {
        return html `<div part="placeholder">${this.placeholder}</div>`;
    }
    /**
     * Template for label
     */
    get labelTemplate() {
        return html `<div part="label">${this.multiple ? this.labels.join(LABEL_SEPARATOR) : this.label}</div>`;
    }
    /**
     * Edit template when select is not readonly or disabled
     */
    get editTemplate() {
        if (!this.readonly && !this.disabled) {
            return html `
        <div id="trigger" @tapstart="${this.toggleOpened}"></div>
        ${this.popupTemplate}
      `;
        }
    }
    /**
     * Get default slot template
     */
    get slottedContent() {
        return html `<slot></slot>`;
    }
    /**
     * Get data iterator template
     */
    get dataContent() {
        return html `${this.composer.queryItems(() => true).map(item => this.toItem(item))}`;
    }
    /**
    * Edit template when select is not readonly or disabled
    */
    get popupTemplate() {
        if (this.lazyRendered) {
            return html `<ef-overlay
        tabindex="-1"
        id="menu"
        part="list"
        style=${styleMap(this.popupDynamicStyles)}
        with-shadow
        lock-position-target
        .positionTarget=${this}
        .position=${POPUP_POSITION}
        ?opened=${this.opened}
        @tap=${this.onPopupTap}
        @mousemove=${this.onPopupMouseMove}
        @keydown=${this.onPopupKeyDown}
        @opened-changed="${this.onPopupOpenedChanged}"
        @opened="${this.onPopupOpened}"
        @refit=${this.onPopupRefit}
        @closed="${this.onPopupClosed}">${this.hasDataItems() ? this.dataContent : this.slottedContent}</ef-overlay>`;
        }
        else {
            // This code is required because IE11 polyfill need items to be within a slot
            // to make MutationObserver to observe items correctly
            return html `<div style="display: none !important;"><slot></slot></div>`;
        }
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return html `
    <div id="box">
      <div id="text">
        ${this.placeholderHidden() ? this.labelTemplate : this.placeholderTemplate}
      </div>
      <ef-icon icon="down" part="icon"></ef-icon>
    </div>
    ${this.editTemplate}`;
    }
};
__decorate([
    property({ type: String, attribute: false })
], Select.prototype, "label", null);
__decorate([
    property({ type: Array, attribute: false })
], Select.prototype, "labels", null);
__decorate([
    property({ type: String })
], Select.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Select.prototype, "opened", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Select.prototype, "error", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Select.prototype, "warning", void 0);
__decorate([
    property({ type: Boolean })
], Select.prototype, "multiple", null);
__decorate([
    property({ attribute: false })
], Select.prototype, "data", null);
__decorate([
    property({ type: String, attribute: false })
], Select.prototype, "value", null);
__decorate([
    property({ attribute: false })
], Select.prototype, "values", null);
__decorate([
    query('#menu')
], Select.prototype, "menuEl", void 0);
Select = __decorate([
    customElement('ef-select', {
        alias: 'coral-select'
    })
], Select);
export { Select };
//# sourceMappingURL=index.js.map