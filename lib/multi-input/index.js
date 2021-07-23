var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ControlElement, css, customElement, html, property, query, ifDefined } from '@refinitiv-ui/core';
import { CollectionComposer } from '@refinitiv-ui/utils';
import '../pill';
import '../text-field';
import { VERSION } from '../';
const hasChanged = (newVal, oldVal) => oldVal === undefined ? false : newVal !== oldVal;
/**
 * An input control component to display a selection of pills
 *
 * @event value-changed - Fired when new value of text field is changed.
 * Property `detail.value` will be the new value.
 *
 * @event error-changed - Dispatched when error state changes.
 * Property `detail.error` is error from validation.
 *
 * @event item-added - Fired when new pill is added.
 * Property `detail.item` is new added pill.
 * Property `detail.items` is new list of all pills.
 *
 * @event item-removed - Fired when item is removed.
 * Property `detail.item` is pill that removed.
 * Property `detail.items` is new list of all pills.
 *
 * @event item-error - Fired when item that attempt to add is invalid.
 * Property `detail.item` is item with an error.
 * Property `detail.items` a current list of pills.
 *
 * @prop {boolean} [readonly=false] - Hides text field and clear icon from all pills
 * @attr {boolean} readonly - Hides text field and clear icon from all pills
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @prop {string} value - Current value of text field
 * @attr {string} value - Current value of text field
 *
 */
let MultiInput = class MultiInput extends ControlElement {
    constructor() {
        super(...arguments);
        /**
         * Hide text input box
         */
        this.pillsOnly = false;
        /**
         * Specify icon to display inside input box
         */
        this.icon = '';
        /**
         * Placeholder text to display in input box
         */
        this.placeholder = '';
        /**
         * Set state to error
         */
        this.error = false;
        /**
         * Set state to warning
         */
        this.warning = false;
        /**
         * Set character max limit
         */
        this.maxLength = null;
        /**
         * Set character min limit
         */
        this.minLength = null;
        this._data = null;
        this.composer = new CollectionComposer([]);
        /**
         * @ignore
         */
        this.multiple = true;
        /** Old value for handle reset value */
        this.oldValue = '';
        /**
         * render the pill component
         * @param item for render
         * @param index the position item of values
         * @returns the template of a pill component
         */
        this.pillTemplate = (item, index) => {
            return html `
      <ef-pill
        part="pill"
        index="${index}"
        clears
        ?readonly="${item.readonly || this.readonly}"
        ?disabled="${item.disabled || this.disabled}"
        value="${item.value}"
        @clear="${this.onPillClearsHandler}">
        ${item.label}
      </ef-pill>
    `;
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
        display: block;
      }
      [part=list] {
       flex-flow: row wrap;
       max-height: 100%;
       display: flex;
       align-items: center;
       align-content: flex-start;
       flex: 1 1 auto;
       flex-direction: row;
       overflow-y: auto;
       margin: auto;
      }
      [part=pill] {
        display: inline-flex;
      }
      [part=search] {
        flex: 1;
        min-width: 170px;
      }
      [scrollable] {
        overflow: auto;
      }
    `;
    }
    /**
     * Array of item's values ( readonly )
     * @readonly
     * @type {string[]}
     */
    get values() {
        return this.composer.queryItems(() => true).map(({ value }) => value);
    }
    /**
     * Selection start index
     */
    get selectionStart() {
        if (this.search) {
            return this.search.selectionStart;
        }
        return null;
    }
    set selectionStart(index) {
        if (this.search) {
            this.search.selectionStart = index;
        }
    }
    /**
     * Selection end index
     */
    get selectionEnd() {
        if (this.search) {
            return this.search.selectionEnd;
        }
        return null;
    }
    set selectionEnd(index) {
        if (this.search) {
            this.search.selectionEnd = index;
        }
    }
    /**
     * The data object, used to render the list.
     * @type {MultiInputData | null}
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
        void this.requestUpdate('data', oldValue);
    }
    /**
     * Removes the item by the value and returns array of removed items
     * @param value {string} Value of item to remove
     * @returns array of removed items
     */
    removeByValue(value) {
        return this.removeByProperty(value, 'value');
    }
    /**
     * Add a new item to the input. Return newly added object or null if added invalid object.
     * @param item to add. Object must have at least value and label
     * @returns {MultiInputDataItem | null} added item
     */
    add(item) {
        if (!this.isItem(item)) {
            this.notify(item, 'item-error');
            return null;
        }
        return this.addItem(item);
    }
    /**
     * Removes last item. Returns item that removed or null if list was empty
     * @returns {MultiInputDataItem | null} Removed item or null if list was empty
     */
    removeLastItem() {
        if (!this.values.length) {
            return null;
        }
        return this.removeByIndex(this.values.length - 1);
    }
    /**
     * Removes pill by index. Returns item that removed or null if list was empty
     * @param {number} index of pill to be removed
     * @returns {MultiInputDataItem | null} Removed item or null if list was empty
     */
    removeByIndex(index) {
        const items = this.composer.queryItems(() => true);
        if (items.length <= index) {
            return null;
        }
        const item = items[index];
        return this.removeItem(item);
    }
    /**
     * Remove item from collection and notify
     * @param item processed entity
     * @param notifyEvent should notify about changes
     * @returns removed item or null
     */
    removeItem(item, notifyEvent = false) {
        let process = true;
        if (notifyEvent) {
            process = this.notify(item, 'item-removed');
        }
        if (process) {
            this.composer.removeItem(item);
            void this.requestUpdate();
            this.focus(); /* keep focus on multi-input */
            return item;
        }
        return null;
    }
    /**
     * Removes item by a property within item
     * @param value of property
     * @param property name
     * @returns array of removed items
     */
    removeByProperty(value, property) {
        const items = this.composer.queryItemsByPropertyValue(property, value);
        const result = [];
        for (let x = 0; x < items.length; x += 1) {
            const item = this.removeItem(items[x]);
            item && result.push(item);
        }
        return result;
    }
    /**
     * Add item to collection and notify
     * @param item processed entity
     * @param notifyEvent should notify about changes
     * @returns added item or null
     */
    addItem(item, notifyEvent = false) {
        let process = true;
        if (notifyEvent) {
            process = this.notify(item, 'item-added');
        }
        if (process) {
            this.composer.addItem(item);
            void this.requestUpdate();
            return item;
        }
        return null;
    }
    /**
     * validate input according `minLength` and `maxLength` properties
     * @param {string} value value for validate
     * change state of `error` property according validation
     * @returns {void}
     */
    validateInput(value) {
        const error = this.shouldValidateForMinLength(value);
        if (this.error !== error) {
            this.error = error;
            this.notifyPropertyChange('error', this.error);
        }
    }
    /**
     * @param value value of changed.
     * @returns {boolean} true if there is no error, false when minLength more than 0 and value is too short
     */
    shouldValidateForMinLength(value) {
        let error = false;
        if (value) {
            error = !!this.minLength && (this.minLength > value.length);
        }
        return error;
    }
    /**
    * Current value of text field
    * @default -
    * @param value Element value
    */
    set value(value) {
        const oldValue = this.oldValue;
        value = this.castValue(value);
        if (!this.shouldValidateForMaxLength(value)) {
            this.warnInvalidValue(value);
            value = oldValue;
        }
        if (oldValue !== value) {
            this.oldValue = value;
            void this.requestUpdate('value', oldValue);
        }
    }
    get value() {
        return this.oldValue;
    }
    /**
     * @param value value for validate.
     * @returns true if there is maxLength is null and maxLength is more than value.
     */
    shouldValidateForMaxLength(value) {
        if (this.maxLength) {
            return value.length <= this.maxLength;
        }
        return true;
    }
    /**
     * Called when the element’s DOM has been updated and rendered
     * @param changedProperties Properties that has changed
     * @returns shouldUpdate
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        if (this.shouldValidateInput(changedProperties)) {
            this.validateInput(this.value);
        }
    }
    /**
     * Check if input should be re-validated
     * @param changedProperties Properties that has changed
     * @returns True if input should be re-validated
     */
    shouldValidateInput(changedProperties) {
        return (changedProperties.has('minLength') || !!(this.minLength && changedProperties.has('value')));
    }
    /**
     * Set the selection range
     * @param startSelection Start of selection
     * @param endSelection End of the selection
     * @returns {void}
     */
    setSelectionRange(startSelection, endSelection) {
        var _a;
        (_a = this.search) === null || _a === void 0 ? void 0 : _a.setSelectionRange(startSelection, endSelection);
    }
    /**
     * Select the contents of input
     * @returns void
     */
    select() {
        if (!this.disabled && !this.readonly) {
            if (this.search) {
                this.search.select();
            }
        }
    }
    /**
     * render this component
     * @returns the main template
     */
    render() {
        return html `
      <div id="list" part="list">
        ${this.pillsTemplate()}
        ${this.textFieldTemplate}
      </div>
    `;
    }
    /**
     * render the search element
     * @returns the template of the search element
     */
    get textFieldTemplate() {
        if (this.readonly || this.pillsOnly) {
            return null;
        }
        return html `
        <ef-text-field
          tabindex="1"
          part="search"
          transparent
          ?disabled="${this.disabled}"
          @keydown="${this.handleKeyDown}"
          @change="${this.onInputChange}"
          @input="${this.onInputChange}"
          maxlength="${ifDefined(this.maxLength || undefined)}"
          minlength="${ifDefined(this.minLength || undefined)}"
          ?error="${this.error}"
          .value="${this.value}"
          .icon="${this.icon || null}"
          .placeholder="${this.placeholder}"
          ></ef-text-field>
    `;
    }
    /**
     * render pill components
     * @returns the template of pill components
     */
    pillsTemplate() {
        return html `
      ${this.composer.queryItems(() => true).map(this.pillTemplate)}
    `;
    }
    /**
     * handle the clear event of pill
     * @param event the event contains the current pill
     * @returns {void}
     */
    onPillClearsHandler(event) {
        const pill = event.target;
        const index = pill.getAttribute('index');
        if (index == null) {
            return;
        }
        const items = this.composer.queryItems(() => true);
        const item = items[Number(index)];
        this.removeItem(item, true);
    }
    /**
     * the wrapper for item events
     * @param item to notify about
     * @param eventType notify mode - [item-removed|item-added|item-error]
     * @returns true if event was not prevented
     */
    notify(item, eventType) {
        const customEventInit = {
            detail: { item, items: this.composer.queryItems(() => true) },
            cancelable: true
        };
        const event = new CustomEvent(eventType, customEventInit);
        this.dispatchEvent(event);
        return !event.defaultPrevented;
    }
    /**
     * Detect keydown and delete last item if delete key is pushed
     * @param event keydown event
     * @returns {void}
     */
    handleKeyDown(event) {
        if (event.key === 'Backspace') {
            this.removeLastItemByKeyboard(event);
        }
        else if (event.key === 'Enter') {
            this.addItemByKeyboard();
        }
    }
    /**
     * handle when value is changed
     * @param event Input change event
     * @returns {void}
     */
    onInputChange(event) {
        const target = event.target;
        this.setValueAndNotify(target.value);
    }
    /**
     * handle keydown event when the key code is the backspace
     * @param event keyboard backspace keydown for preventing default in case of native functionality removing
     * @returns {void}
     */
    removeLastItemByKeyboard(event) {
        if (this.isSearchValueEmptyWithoutReadonlyAndDisabled()) {
            const items = this.composer.queryItems(() => true);
            if (!items.length) {
                return;
            }
            const item = items[items.length - 1];
            const lastItem = this.removeItem(item, true);
            if (lastItem) {
                event.preventDefault();
            }
        }
    }
    /**
     * handle keydown event when the key code is the enter
     * @returns {void}
     */
    addItemByKeyboard() {
        if (this.isSearchValueNotEmptyWithoutReadonlyAndDisabled()) {
            const newItem = { value: this.value, label: this.value };
            const item = this.addItem(newItem, true);
            if (item) {
                this.setValueAndNotify('');
            }
        }
    }
    /**
     * check the value of the search element and check readonly and disabled
     * @returns the condition checks the search value is empty and switched off readonly and disabled of this component
     */
    isSearchValueEmptyWithoutReadonlyAndDisabled() {
        return this.value === '' && !this.readonly && !this.disabled;
    }
    /**
     * check the value of the search element and check readonly and disabled
     * @returns the condition checks the search value is empty and switched off readonly and disabled of this component
     */
    isSearchValueNotEmptyWithoutReadonlyAndDisabled() {
        return this.value.trim() !== '' && !this.readonly && !this.disabled;
    }
    /**
     * Item check for value and label to ensure it can be rendered
     * @param item Item to check
     * @returns true if item exists and contains value and label
     */
    isItem(item) {
        return !!(item.value && item.label);
    }
};
__decorate([
    property({ attribute: false })
], MultiInput.prototype, "values", null);
__decorate([
    property({ type: Boolean, attribute: 'pills-only', reflect: true })
], MultiInput.prototype, "pillsOnly", void 0);
__decorate([
    property({ type: String })
], MultiInput.prototype, "icon", void 0);
__decorate([
    property({ type: String })
], MultiInput.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MultiInput.prototype, "error", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MultiInput.prototype, "warning", void 0);
__decorate([
    property({ type: Number, attribute: 'maxlength', reflect: true })
], MultiInput.prototype, "maxLength", void 0);
__decorate([
    property({ type: Number, attribute: 'minlength', reflect: true, hasChanged })
], MultiInput.prototype, "minLength", void 0);
__decorate([
    property({ type: Number, attribute: false })
], MultiInput.prototype, "selectionStart", null);
__decorate([
    property({ type: Number, attribute: false })
], MultiInput.prototype, "selectionEnd", null);
__decorate([
    property({ attribute: false })
], MultiInput.prototype, "data", null);
__decorate([
    query('[part="list"]')
], MultiInput.prototype, "list", void 0);
__decorate([
    query('[part="search"]')
], MultiInput.prototype, "search", void 0);
__decorate([
    property({ type: String })
], MultiInput.prototype, "value", null);
MultiInput = __decorate([
    customElement('ef-multi-input', {
        alias: 'coral-multi-input'
    })
], MultiInput);
export { MultiInput };
//# sourceMappingURL=index.js.map