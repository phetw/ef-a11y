var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ControlElement, css, customElement, html, property, query, styleMap, ifDefined, WarningNotice, FocusedPropertyKey, eventOptions } from '@refinitiv-ui/core';
import { translate } from '@refinitiv-ui/translate';
import { AnimationTaskRunner, CollectionComposer, TimeoutTaskRunner } from '@refinitiv-ui/utils';
import '@refinitiv-ui/phrasebook/lib/locale/en/combo-box';
import '../icon';
import '../overlay';
import '../list';
import '../pill';
import '../text-field';
import { ListRenderer as ComboBoxRenderer } from '../list';
import { defaultFilter } from './helpers/filter';
import { CustomKeyboardEvent } from './helpers/keyboard-event';
import { VERSION } from '../';
export { ComboBoxRenderer };
const QUERY_DEBOUNCE_RATE = 0;
// Maximum number of characters to display in multiple mode
const MULTIPLE_LABEL_MAX_SIZE = 250;
// Separator for labels in multiple mode
// Double space is expected
const MULTIPLE_LABEL_SEPARATOR = ';  ';
const POPUP_POSITION = ['bottom-start', 'top-start'];
const valueFormatWarning = new WarningNotice('The specified \'values\' format does not conform to the required format.');
const freeTextMultipleWarning = new WarningNotice('"free-text" mode is not compatible with "multiple" mode');
/**
 * Combines a popup with a filterable selection list
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @attr {string} name - Set name of the element
 * @prop {string} [name=''] - Set name of the element
 *
 * @fires value-changed - Dispatched when value changes
 * @fires query-changed - Dispatched when query changes
 * @fires opened-changed - Dispatched when opened state changes
 */
let ComboBox = class ComboBox extends ControlElement {
    constructor() {
        super(...arguments);
        /**
         * Custom filter for static data
         * Set this to null when data is filtered externally, eg XHR
         * @type {ComboBoxFilter<T> | null}
         */
        this.filter = defaultFilter(this);
        /**
         * Renderer used to render list item elements
         * @type {ComboBoxRenderer}
         */
        this.renderer = new ComboBoxRenderer(this);
        this._multiple = false;
        /**
         * Track opened state of popup
         */
        this.opened = false;
        /**
         * Placeholder for input field
         */
        this.placeholder = '';
        /**
         * Show clears button
         */
        this.clears = false;
        this._freeText = false;
        /**
         * Set state to error
         */
        this.error = false;
        /**
         * Set state to warning
         */
        this.warning = false;
        // Internal reference to debounce rate
        this._queryDebounceRate = QUERY_DEBOUNCE_RATE;
        // Debounces the query using queryDebounceRate
        this.queryDebouncer = new TimeoutTaskRunner(this._queryDebounceRate);
        this._data = []; // Local data object set through data setter
        /**
         * `value` always initialised before `data`, so it cannot query and select items when using attribute.
         * This variable is to store value for selecting a data item after data has been initialised.
         */
        this.cachedValue = '';
        this._query = null; // Internally set and store query value
        /**
         * Composer used to query and modify item state.
         */
        this.composer = new CollectionComposer([]);
        /**
         * Initiate one time popup rendering
         */
        this.lazyRendered = false;
        /**
         * Throttle popup resizing
         */
        this.resizeThrottler = new AnimationTaskRunner();
        /**
         * Input text to display in text field while typing
         * Use because of query debouncer to avoid input to be not in sync with query
         */
        this.inputText = '';
        /**
         * Used to store free text value
         * If freeText mode is defined
         */
        this.freeTextValue = '';
        /**
         * Hold popup styling applied on open
         */
        this.popupDynamicStyles = {};
        /**
         * Use to call request update when CC changes its value
         * @returns {void}
         */
        this.modificationHandler = () => this.modificationUpdate();
        this._resolvedData = [];
        this.dataPromiseCounter = 0; // A counter to detect that the promise resolved is the last promise set
        /**
         * Mark combobox with loading flag
         * Used in conjunction with data promise
         */
        this.loading = false;
        this.shouldOpenOnFocus = false;
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
        display: inline-flex;
        flex-flow: row nowrap;
        user-select: none;
        outline: none;
      }
      [part=input-wrapper] {
        cursor: pointer;
      }
      [part=input] {
        cursor: text;
      }
      [part=input]::-ms-clear {
        display: none;
      }
      [part=selection-badge] {
        pointer-events: none;
      }
      [hidden] {
        display: none !important;
      }
    `;
    }
    /**
     * Multiple selection mode
     * @param multiple true to set multiple mode
     */
    set multiple(multiple) {
        if (multiple && this.freeText) {
            freeTextMultipleWarning.show();
            multiple = false;
        }
        const oldMultiple = this._multiple;
        this._multiple = multiple;
        void this.requestUpdate('multiple', oldMultiple);
    }
    get multiple() {
        return this._multiple;
    }
    /**
     * Allow to enter any value
     * @param freeText true to set freeText mode
     */
    set freeText(freeText) {
        if (this.multiple && freeText) {
            freeTextMultipleWarning.show();
            freeText = false;
        }
        if (!freeText) {
            this.freeTextValue = '';
        }
        const oldFreeText = this._freeText;
        this._freeText = freeText;
        void this.requestUpdate('freeText', oldFreeText);
    }
    get freeText() {
        return this._freeText;
    }
    /**
     * Control query rate, defaults to 0
     */
    get queryDebounceRate() {
        return this._queryDebounceRate;
    }
    set queryDebounceRate(value) {
        const oldValue = this._queryDebounceRate;
        if (value !== oldValue) {
            this._queryDebounceRate = value;
            this.queryDebouncer = new TimeoutTaskRunner(this._queryDebounceRate);
            // no need to update as this is called for input changes
        }
    }
    /**
     * Data array to be displayed
     * @type {ComboBoxData<T>}
     */
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
        void this.resolveDataPromise(value);
    }
    /**
     * Returns the first selected item value.
     * Use `values` when multiple selection mode is enabled.
     */
    get value() {
        return this.values[0] || '';
    }
    set value(value) {
        /**
         * Set the value if the data is ready,
         * otherwise cache it for later.
         */
        if (this.composer.size) {
            this.values = [value];
        }
        else {
            this.cachedValue = value;
        }
    }
    /**
     * Returns a values collection of the currently
     * selected item values
     * @type {string[]}
     */
    get values() {
        // In free text mode, compare selected to values
        return this.freeTextValue ? [this.freeTextValue] : this.composerValues;
    }
    set values(values) {
        if (!Array.isArray(values)) {
            valueFormatWarning.show();
            this.values = [];
        }
        else {
            // Clone value arrays
            const newValues = values.slice(0, this.multiple ? values.length : 1);
            const oldValues = this.composerValues.slice();
            // Create comparison strings to check for differences
            const newComparison = newValues.sort().toString();
            const oldComparison = oldValues.sort().toString();
            // Should we update the selection state?
            if (newComparison !== oldComparison) {
                this.updateComposerValues(newValues);
                void this.requestUpdate('values', oldValues);
            }
        }
    }
    /**
     * Update composer values.
     * @param newValues new values
     * @returns {void}
     */
    updateComposerValues(newValues) {
        this.queryItems((item, composer) => {
            if (newValues.includes(composer.getItemPropertyValue(item, 'value'))) {
                composer.setItemPropertyValue(item, 'selected', true);
                return true;
            }
            composer.setItemPropertyValue(item, 'selected', false);
            return false;
        });
    }
    /**
     * Query string applied to combo-box
     * Set via internal text-field input
     * @readonly
     */
    get query() {
        return this._query;
    }
    set query(query) {
        const oldVal = this._query;
        this._query = query;
        this.queryDebouncer.cancel();
        if (oldVal !== this._query) {
            this.clearHighlighted();
            this.filterItems();
            void this.requestUpdate('query', oldVal);
        }
    }
    /**
     * Label of selected value
     * @returns Label to use, defaults to empty string
     * @readonly
     */
    get label() {
        const labels = this.selectedLabels;
        if (labels.length <= 1) {
            return labels[0] || '';
        }
        // multiple mode, do according to UX specs
        const output = labels.join(MULTIPLE_LABEL_SEPARATOR);
        return output.length > MULTIPLE_LABEL_MAX_SIZE ? `${output.slice(0, MULTIPLE_LABEL_MAX_SIZE - 3)}...` : output;
    }
    /**
     * Get resolved data (if possible)
     */
    get resolvedData() {
        return this._resolvedData;
    }
    /**
     * Set resolved data
     * @param value resolved data
     */
    set resolvedData(value) {
        const oldValue = this._resolvedData;
        if (value !== oldValue) {
            if (Array.isArray(value)) {
                this.composer = new CollectionComposer(value);
            }
            else {
                this.composer = new CollectionComposer([]);
            }
            this.listenToComposer();
            this._resolvedData = value;
            /**
             * Select using initialised the value once from attribute/property,
             * only when there is no existing selections.
             */
            if (this.cachedValue && this.selection.length === 0) {
                this.value = this.cachedValue;
                this.cachedValue = ''; // Reset as it's only needed for initialisation
            }
            void this.requestUpdate('data', oldValue);
        }
    }
    /**
     * Used to resolve data when set as a promise
     * @param data Data promise
     * @returns Promise<void>
     */
    async resolveDataPromise(data) {
        const dataPromiseCounter = this.dataPromiseCounter += 1;
        let resolvedData;
        if (data instanceof Promise) {
            this.loading = true;
            try {
                resolvedData = await data;
            }
            catch (error) {
                resolvedData = [];
            }
        }
        else {
            resolvedData = data;
        }
        if (dataPromiseCounter === this.dataPromiseCounter) {
            this.resolvedData = resolvedData;
            this.loading = false;
        }
    }
    /**
     * The the values from composer ignoring freeTextValue
     */
    get composerValues() {
        return this.queryItemsByPropertyValue('selected', true)
            .map(item => this.getItemPropertyValue(item, 'value'));
    }
    /**
     * Return currently selected items
     * This is distinct from values as for controls with persistence features
     * it can be used to show current selection count and get the selection labels
     * @returns List of selected items
     */
    get selection() {
        return this.queryItemsByPropertyValue('selected', true).slice();
    }
    /**
     * Count of selected items
     * @returns Has selection
     */
    get selectionCount() {
        return this.selection.length;
    }
    /**
     * Determine if list has visible items
     * @returns List has visible items or not
     */
    get listHasVisibleItems() {
        return this.resolvedData.some(item => !this.getItemPropertyValue(item, 'hidden'));
    }
    /**
     * Selected item
     * @returns Has selection
     */
    get selectedItem() {
        return this.queryItemsByPropertyValue('selected', true)[0];
    }
    /**
     * Get a list of selected item labels
     * @returns Has selection
     */
    get selectedLabels() {
        return this.selection.map(selected => this.getItemPropertyValue(selected, 'label') || '');
    }
    /**
     * Utility method  - ensures correct composer is being listened to
     * @returns {void}
     */
    listenToComposer() {
        this.composer.on('modification', // Listen for modifications
        this.modificationHandler // Update the template
        );
    }
    /**
     * Updates the element
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    update(changedProperties) {
        const focusedChanged = changedProperties.has(FocusedPropertyKey);
        // the opened logic is bound to focus state
        if (focusedChanged) {
            // When focus changes the popup can open only on tapstart
            if (this.focused && this.shouldOpenOnFocus) {
                this.setOpened(true);
            }
            else if (!this.focused) {
                this.setOpened(false);
            }
            this.shouldOpenOnFocus = false;
        }
        /*
        * data can be visible and opened changed = open
        * or, opened is true and data; and contains visible data = open
        * queries local properties first to short circuit querying map iteration
        */
        if (changedProperties.has('opened')) {
            if (this.opened) {
                // fulfil any queries if opened is changed
                // this is the case if keyboard navigation is used
                this.queryDebouncer.fulfil();
                this.opening();
            }
            else {
                this.clearHighlighted();
            }
        }
        // combo-box may be opened programmatically (via opened attribute)
        // make sure that the element correctly reacts on this change
        if ((changedProperties.has('data') && this.opened && !this.focused) || focusedChanged) {
            this.resetInput();
        }
        // If label is defined it means that there is an actual value
        // Select input text to simplify clearing the value
        if (focusedChanged && this.focused && this.label) {
            this.inputEl.focus();
            this.inputEl.select();
        }
        // Make sure that the first item is always highlighted
        if (this.opened && (changedProperties.has('opened') || changedProperties.has('data') || changedProperties.has('query'))) {
            this.highlightFirstItem();
        }
        // If data is set asynchronously while popup is opened
        // list might not trigger popup update
        if (changedProperties.has('data') && this.opened) {
            this.forcePopupLayout();
        }
        super.update(changedProperties);
    }
    /**
     * Called once after the component is first rendered
     * @param changedProperties map of changed properties with old values
     * @returns {void}
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.addEventListener('keydown', this.onKeyDown);
        this.addEventListener('tapstart', this.onTapStart);
    }
    /**
     * Sets opened state and fires event
     * Use this to set opened state when user interacts to the component
     * @param opened True if opened
     * @returns {void}
     */
    setOpened(opened) {
        if (this.opened !== opened && this.notifyPropertyChange('opened', opened, true)) {
            this.opened = opened;
        }
    }
    /**
     * Requests an update after a composer modification.
     * @returns {void}
     */
    modificationUpdate() {
        void this.requestUpdate();
    }
    /**
     * Queries the composer for data items
     * @param engine Composer query engine
     * @returns Collection of matched items
     */
    queryItems(engine) {
        return this.composer.queryItems(engine);
    }
    /**
     * Queries the composer for data items,
     * matching by property value.
     * @param property Property name to query
     * @param value Property value to match against
     * @returns Collection of matched items
     */
    queryItemsByPropertyValue(property, value) {
        return this.composer.queryItemsByPropertyValue(property, value, 0);
    }
    /**
     * Gets the property value of an item
     * @param item Original data item
     * @param property Property name to get the value of
     * @returns Value of the property
     */
    getItemPropertyValue(item, property) {
        return this.composer.getItemPropertyValue(item, property);
    }
    /**
     * Sets the property value of an item
     * @param item Original data item
     * @param property Property name to set the value of
     * @param value New value of the property
     * @returns {void}
     */
    setItemPropertyValue(item, property, value) {
        this.composer.setItemPropertyValue(item, property, value);
    }
    /**
     * Set width on popup using parent and --list-max-width if set
     * @returns {void}
     */
    opening() {
        this.lazyRendered = true;
        this.restrictPopupWidth();
    }
    /**
     * Scrolls to the currently selected item
     * @returns {void}
     */
    scrollToSelected() {
        var _a;
        const item = this.selectedItem;
        if (item) {
            (_a = this.listEl) === null || _a === void 0 ? void 0 : _a.scrollToItem(item);
        }
    }
    /**
     * Highlights the item
     * @param item data item to highlight
     * @returns {void}
     */
    highlightItem(item) {
        this.clearHighlighted();
        this.setItemPropertyValue(item, 'highlighted', true);
    }
    /**
     * Clears any highlighted items
     * @returns {void}
     */
    clearHighlighted() {
        this.queryItemsByPropertyValue('highlighted', true)
            .forEach(item => this.setItemPropertyValue(item, 'highlighted', false));
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
        const maxWidth = parseFloat(this.getComputedVariable('--list-max-width', 'none'));
        let minWidth = this.offsetWidth;
        // reset min-width if max-width less than min-width, otherwise browser won't apply max-width
        if (maxWidth < minWidth) {
            minWidth = 0;
        }
        this.popupDynamicStyles.minWidth = `${minWidth}px`;
    }
    /**
     * Set the query string and run `query-change` event
     * @param query query
     * @returns void
     */
    setQuery(query) {
        const oldQuery = this.query;
        this.query = query; // reset debouncer here
        if (oldQuery !== query) {
            this.notifyPropertyChange('query', this.query);
        }
    }
    /**
     * Reset the input text to match label
     * @returns {void}
     */
    resetInput() {
        this.setQuery('');
        this.inputText = this.multiple ? '' : (this.freeTextValue || this.label);
    }
    /**
     * Filter the internal items by query
     * Changes items' hidden state
     * @returns {void}
     */
    filterItems() {
        // if filter is null, it is off and external app is responsible
        if (this.filter) {
            // we do not produce a new list as it will loose all association with this composer
            // unless we spent time re-applying this composer to a new list/composer
            // instead we change the hidden state
            // by list applying a queryItems itself and does not render hidden items
            // filter declared here to avoid the possibility of being null if used directly in the callback
            const filter = this.filter;
            let groupHeaderItem = null;
            this.queryItems((item, composer) => {
                // do not filter hidden items
                if (item.hidden) {
                    return false;
                }
                let result = false;
                // support groups
                if (composer.getItemPropertyValue(item, 'type') === 'header') {
                    groupHeaderItem = item;
                }
                else {
                    result = filter(item);
                }
                composer.setItemPropertyValue(item, 'hidden', !result);
                composer.updateItemTimestamp(item);
                if (result && groupHeaderItem && composer.getItemParent(groupHeaderItem) === composer.getItemParent(item)) {
                    composer.setItemPropertyValue(groupHeaderItem, 'hidden', false);
                    composer.updateItemTimestamp(groupHeaderItem);
                    groupHeaderItem = null;
                }
                return result;
            });
        }
        this.forcePopupLayout();
    }
    /**
     * Highlight the selected item or the first available item
     * @returns {void}
     */
    highlightFirstItem() {
        let selectedItem = null;
        const highlightItem = this.queryItems((item, composer) => {
            if (selectedItem || !this.canHighlightItem(item, composer)) {
                return false;
            }
            if (composer.getItemPropertyValue(item, 'selected') === true) {
                selectedItem = item;
            }
            return true;
        })[0];
        (selectedItem || highlightItem) && this.highlightItem(selectedItem || highlightItem);
    }
    /**
     * Check if an item can be highlighted
     * @param item Collection composer item
     * @param composer Collection composer
     * @returns can highlight
     */
    canHighlightItem(item, composer) {
        let canHighlight = !(composer.getItemPropertyValue(item, 'hidden') === true
            || (composer.getItemPropertyValue(item, 'type') || 'text') !== 'text'
            || composer.getItemPropertyValue(item, 'disabled') === true
            || composer.isItemLocked(item) === true);
        // check ancestors
        if (canHighlight) {
            const parent = composer.getItemParent(item);
            canHighlight = !parent || this.canHighlightItem(parent, composer);
        }
        return canHighlight;
    }
    /**
     * https://github.com/juggle/resize-observer/issues/42
     *
     * This event ensures that ResizeObserver picks up resize events
     * when popup is deeply nested inside shadow root.
     * TODO: remove this workaround once ResizeObserver handles shadow root scenario
     * @returns {void}
    */
    forcePopupLayout() {
        window.dispatchEvent(new Event('animationiteration'));
    }
    /**
     * Shift focus back to input.
     * This method is required to prevent popup from focusing
     * @returns {void}
     */
    shiftFocus() {
        this.focus({
            preventScroll: true
        });
    }
    /**
     * Handle text value change from text-field
     * @param event Custom Event fired from text-field
     * @returns {void}
     */
    onInputValueChanged(event) {
        const inputText = event.detail.value;
        /**
         * Query is used to track if there is a query
         * We always use it so the absence of it can be used to reapply the
         * selected item's label, if applicable
         */
        this.queryDebouncer.schedule(() => {
            this.setQuery(inputText);
        });
        // Reset text when clearing the value
        if (!this.multiple && !inputText) {
            this.setValueAndNotify('');
        }
        // always ensure that internal val matches input val
        this.inputText = inputText;
        // Used for free input. Never set it unless in free text mode
        if (this.freeText) {
            this.value = ''; // make sure that composer does not have selected
            this.freeTextValue = inputText;
            this.notifyPropertyChange('value', inputText);
        }
        this.setOpened(true);
    }
    /**
     * Handle list value changed
     * @returns {void}
     */
    onListValueChanged() {
        // cascade value changed event
        this.notifyPropertyChange('value', this.value);
        this.onListInteraction();
    }
    /**
     * Handle popup opened event
     *
     * Scrolls the current selection into view
     * @returns {void}
     */
    onPopupOpened() {
        this.scrollToSelected();
    }
    /**
     * Handle popup closed event
     *
     * Ensures that popup state equals combo box opened prop
     * @returns {void}
     */
    onPopupClosed() {
        this.setOpened(false);
    }
    /**
     * Run when input-wrapper is tapped
     * @param event Tap event
     * @returns {void}
     */
    onTapStart(event) {
        // do nothing if disabled or readonly
        if (this.readonly || this.disabled) {
            return;
        }
        const path = event.composedPath();
        if (this.clearsButtonEl && path.includes(this.clearsButtonEl)) {
            this.onClearsButtonTap();
            return;
        }
        if (path.includes(this.toggleButtonEl)) {
            this.onToggleButtonTap();
            return;
        }
        this.onInputWrapperTap();
    }
    /**
     * Run when tap event happens on toggle button
     * @returns {void}
     */
    onToggleButtonTap() {
        if (this.opened) {
            this.setOpened(false);
        }
        else {
            this.openOnFocus();
        }
    }
    /**
     * Run when tap event happens on clears button
     * @returns {void}
     */
    onClearsButtonTap() {
        this.freeTextValue = '';
        this.inputText = '';
        this.setQuery('');
        this.setValueAndNotify('');
        this.openOnFocus();
    }
    /**
     * Run when tap event happens on input wrapper
     * excluding clears and toggles buttons
     * @returns {void}
     */
    onInputWrapperTap() {
        this.openOnFocus();
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
     * Handles key input
     * @param event Key down event object
     * @returns {void}
     */
    onKeyDown(event) {
        // Check if the event is already handle by list
        if (event.defaultPrevented) {
            return;
        }
        switch (event.key) {
            case 'Enter':
                this.enter(event);
                break;
            case 'Up':
            case 'ArrowUp':
                this.up(event);
                break;
            case 'Down':
            case 'ArrowDown':
                this.down(event);
                break;
            default:
                return;
        }
        event.preventDefault();
    }
    /**
     * Run when tap event or enter
     * happened on the list
     * @returns {void}
     */
    onListInteraction() {
        this.freeTextValue = ''; // when the item has been selected, reset the freeText
        if (!this.multiple) {
            this.resetInput();
            const label = this.label;
            this.setOpened(false);
            // make sure that focus is kept withing an element
            // and the cursor is positioned at the end of input
            // Wait before the update cycle completes
            void this.updateComplete.then(() => {
                this.inputEl.focus();
                this.inputEl.setSelectionRange(label.length, label.length);
            });
        }
    }
    /**
     * Handles action keys, either opening the list,
     * or, selecting a highlighted item.
     * @param event keyboard event
     * @returns {void}
     */
    enter(event) {
        if (this.opened && this.listEl) {
            this.reTargetEvent(event, this.listEl);
            this.onListInteraction();
        }
        else {
            this.setOpened(true);
        }
    }
    /**
     * Navigates up the list.
     * Opens the list if closed.
     * @param event keyboard event
     * @returns {void}
     */
    up(event) {
        if (this.opened && this.listEl) {
            this.reTargetEvent(event, this.listEl);
        }
        else {
            this.setOpened(true);
        }
    }
    /**
     * Navigates down the list.
     * Opens the list if closed.
     * @param event keyboard event
     * @returns {void}
     */
    down(event) {
        if (this.opened && this.listEl) {
            this.reTargetEvent(event, this.listEl);
        }
        else {
            this.setOpened(true);
        }
    }
    /**
     * Retarget event to target element
     * @param event keyboard event
     * @param target new target element
     * @returns re-targeted event or the passed event if target is invalid
     */
    reTargetEvent(event, target) {
        const path = event.composedPath();
        /* istanbul ignore next */
        if (path[0] === target) {
            // this must not happen, but keep it here to avoid infinitive loop
            return event;
        }
        const keyboardEvent = new CustomKeyboardEvent(event.type, event);
        target.dispatchEvent(keyboardEvent);
        if (keyboardEvent.defaultPrevented) {
            event.preventDefault();
        }
        return keyboardEvent;
    }
    /**
     * Template for clear button
     * Rendered when `clears` attribute is set
     * @returns Popup template or undefined
     */
    get clearButtonTemplate() {
        if (this.clears) {
            return html `
        <div
          id="clears-button"
          part="button button-clear"
          ?hidden=${!this.label && !this.query && !this.freeTextValue && !this.inputText}><ef-icon part="icon icon-clear" icon="cross"></ef-icon>
        </div>
      `;
        }
    }
    /**
     * Template for selection badge in multiple mode
     * @returns Selection badge template or undefined
     */
    get selectionBadgeTemplate() {
        if (this.multiple) {
            const selectionLength = this.selectionCount;
            // TODO Make this a short format number using i18n which has specific support for this +
            // benefit of being localised too
            if (this.focused || selectionLength > 1) {
                return html `
        <ef-pill readonly part="selection-badge" tabindex="-1">${selectionLength}</ef-pill>
      `;
            }
        }
    }
    /**
     * Returns a list template
     */
    get listTemplate() {
        return html `
      <ef-list
        role="listbox"
        id="internal-list"
        @value-changed="${this.onListValueChanged}"
        .data="${this.composer}"
        .multiple="${this.multiple}"
        .renderer="${this.renderer}"
        ></ef-list>
    `;
    }
    /**
     * Returns a template showing no options text
     * Called when freeText mode is off and all items are filtered out
     */
    get noItemsTemplate() {
        if (!this.freeText) {
            return html `<ef-item disabled>${this.t('NO_OPTIONS')}</ef-item>`;
        }
    }
    /**
     * Returns template for popup
     * Lazy loads the popup
     * @returns Popup template or undefined
     */
    get popupTemplate() {
        if (this.lazyRendered) {
            const hasVisibleItems = this.listHasVisibleItems;
            return html `<ef-overlay
        part="list"
        style="${styleMap(this.popupDynamicStyles)}"
        @opened="${this.onPopupOpened}"
        @closed="${this.onPopupClosed}"
        .focusBoundary="${this}"
        .opened="${this.opened && (hasVisibleItems || !this.freeText)}"
        .positionTarget="${this}"
        .position="${POPUP_POSITION}"
        with-shadow
        no-overlap
        no-focus-management
        no-autofocus
        @focusin="${this.shiftFocus}"
      >${hasVisibleItems ? this.listTemplate : this.noItemsTemplate}</ef-overlay>`;
        }
    }
    /**
     * Returns a template for input field
     * @returns Input template
     */
    get inputTemplate() {
        const inputValue = this.focused ? this.inputText : this.freeTextValue || this.label;
        const activeDescendant = this.queryItemsByPropertyValue('highlighted', true);
        return html `<div part="input-wrapper">
      <ef-text-field
        part="input"
        transparent
        aria-expanded="${this.opened}"
        aria-activedescendant="${ifDefined(activeDescendant.length ? activeDescendant[0].id : undefined)}"
        .placeholder="${this.placeholder}"
        .readonly="${this.readonly}"
        .value="${inputValue}"
        @value-changed="${this.onInputValueChanged}"></ef-text-field>
      ${this.selectionBadgeTemplate}
      ${this.clearButtonTemplate}
      <div id="toggle-button" part="button button-toggle">
        <ef-icon part="icon icon-toggle" icon="down"></ef-icon>
      </div>
    </div>`;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @returns Render template
     */
    render() {
        return html `
      ${this.inputTemplate}
      ${this.popupTemplate}
    `;
    }
};
__decorate([
    property({ type: Function, attribute: false })
], ComboBox.prototype, "filter", void 0);
__decorate([
    property({ type: Function, attribute: false })
], ComboBox.prototype, "renderer", void 0);
__decorate([
    property({ type: Boolean })
], ComboBox.prototype, "multiple", null);
__decorate([
    property({ type: Boolean, reflect: true })
], ComboBox.prototype, "opened", void 0);
__decorate([
    property({ type: String })
], ComboBox.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean })
], ComboBox.prototype, "clears", void 0);
__decorate([
    property({ type: Boolean, attribute: 'free-text' })
], ComboBox.prototype, "freeText", null);
__decorate([
    property({ type: Boolean, reflect: true })
], ComboBox.prototype, "error", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ComboBox.prototype, "warning", void 0);
__decorate([
    property({ type: Number, attribute: 'query-debounce-rate' })
], ComboBox.prototype, "queryDebounceRate", null);
__decorate([
    property({ attribute: false })
], ComboBox.prototype, "data", null);
__decorate([
    property({ type: String })
], ComboBox.prototype, "value", null);
__decorate([
    property({ type: Array, attribute: false })
], ComboBox.prototype, "values", null);
__decorate([
    property({ type: String, attribute: false })
], ComboBox.prototype, "query", null);
__decorate([
    query('[part=input]')
], ComboBox.prototype, "inputEl", void 0);
__decorate([
    query('#internal-list')
], ComboBox.prototype, "listEl", void 0);
__decorate([
    query('#toggle-button')
], ComboBox.prototype, "toggleButtonEl", void 0);
__decorate([
    query('#clears-button')
], ComboBox.prototype, "clearsButtonEl", void 0);
__decorate([
    property({ type: String, reflect: true })
], ComboBox.prototype, "loading", void 0);
__decorate([
    translate({ scope: 'ef-combo-box' })
], ComboBox.prototype, "t", void 0);
__decorate([
    eventOptions({ capture: true })
], ComboBox.prototype, "shiftFocus", null);
ComboBox = __decorate([
    customElement('ef-combo-box', {
        alias: 'coral-combo-box'
    })
], ComboBox);
export { ComboBox };
//# sourceMappingURL=index.js.map