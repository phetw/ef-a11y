var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ControlElement, css, customElement, html, ifDefined, property, query } from '@refinitiv-ui/core';
import { VERSION } from '../';
import '../icon';
const hasChanged = (newVal, oldVal) => oldVal === undefined ? false : newVal !== oldVal;
const isIE = (/Trident/g).test(navigator.userAgent);
/**
 * Form control to get a search input from users.
 *
 * @fires value-changed - Dispatched when value changes
 * @fires error-changed - Dispatched when error state changes
 *
 * @attr {string} value - Input's value
 * @prop {string} [value=] - Input's value
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 */
let SearchField = class SearchField extends ControlElement {
    constructor() {
        super(...arguments);
        /**
         * Set regular expression for input validation
         */
        this.pattern = '';
        /**
         * Set place holder text
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
         * Disables all other states and border/background styles.
         * Use with advanced composite elements requiring e.g. multi selection in
         * combo-box when parent container handles element states.
         */
        this.transparent = false;
        /**
         * Set character max limit
         */
        this.maxLength = null;
        /**
         * Set character min limit
         */
        this.minLength = null;
        /**
         * Specify when icon need to be clickable
         */
        this.iconHasAction = false;
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
        display: inline-block;
      }
      :host(:focus), :host input:focus {
        outline: none;
      }
      [part=input] {
        font: inherit;
        background: none;
        color: currentColor;
        border: none;
        text-align: inherit;
      }
      :host [part=icon]{
        display: flex;
        outline: none;
      }
      :host([transparent]) {
        background: none !important;
        border: none !important;
      }
      :host([icon-has-action]) [part=icon] {
        cursor: pointer;
      }
    `;
    }
    /**
     * Select the contents of input
     * @returns void
     */
    select() {
        if (!this.disabled && !this.readonly) {
            this.inputElement.select();
        }
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return html `
      <input
        type="search"
        part="input"
        ?readonly="${this.readonly}"
        placeholder="${ifDefined(this.placeholder || undefined)}"
        maxlength="${ifDefined(this.maxLength || undefined)}"
        minlength="${ifDefined(this.minLength || undefined)}"
        @input="${this.onPossibleValueChange}"
        @change="${this.onPossibleValueChange}"
        pattern="${ifDefined(this.pattern || undefined)}"
        autocomplete="off"
      />
      <ef-icon
        part="icon"
        icon="search"
        ?readonly="${this.readonly}"
        ?disabled="${this.disabled}"
        @tap="${this.notifyIcon}"
        @keydown="${this.handleKeyDown}"
        tabindex="${ifDefined(this.iconHasAction ? '0' : undefined)}"
      ></ef-icon>
    `;
    }
    /**
     * Called when the element’s DOM has been updated and rendered
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        if (this.inputElement.value !== this.value) {
            this.inputElement.value = this.value;
        }
        if (this.shouldValidateInput(changedProperties)) {
            this.validateInput();
        }
    }
    /**
     * Check if input should be re-validated
     * @param changedProperties Properties that has changed
     * @returns True if input should be re-validated
     */
    shouldValidateInput(changedProperties) {
        return (changedProperties.has('pattern') || !!(this.pattern && changedProperties.has('value')))
            || (changedProperties.has('minLength') || !!(this.minLength && changedProperties.has('value')));
    }
    /**
     * validate input according `pattern`, `minLength` and `maxLength` properties
     * change state of `error` property according pattern validation
     * @returns {void}
     */
    validateInput() {
        let error = !this.inputElement.checkValidity();
        if (this.shouldValidateForMinLength(error)) {
            error = !!this.minLength && (this.minLength > this.value.length);
        }
        if (this.error !== error) {
            this.error = error;
            this.notifyPropertyChange('error', this.error);
        }
    }
    /**
     * @param error existing state of error
     * @returns true if there is no error and browser is IE11 and minLength more than 0 and value exists
     */
    shouldValidateForMinLength(error) {
        return !!(!error && isIE && this.minLength && !!this.value);
    }
    /**
     * Check if value is changed
     * @returns {void}
     */
    onPossibleValueChange() {
        const value = this.inputElement.value;
        this.setValueAndNotify(value);
    }
    /**
     * Detect `enter` and `space` keydown and fire
     * @param event keydown event
     * @returns {void}
     */
    handleKeyDown(event) {
        if (event.key === 'Spacebar' || event.key === ' ' || event.key === 'Enter') {
            this.notifyIcon();
        }
    }
    /**
     * Fire event on icon click
     * @returns {void}
     */
    notifyIcon() {
        if (this.iconHasAction) {
            /**
             * Dispatched only when element has icon-has-action attribute and icon is clicked
             */
            this.dispatchEvent(new CustomEvent('icon-click', { bubbles: false }));
        }
    }
};
__decorate([
    property({ type: String, hasChanged })
], SearchField.prototype, "pattern", void 0);
__decorate([
    property({ type: String })
], SearchField.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SearchField.prototype, "error", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SearchField.prototype, "warning", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SearchField.prototype, "transparent", void 0);
__decorate([
    property({ type: Number, attribute: 'maxlength', reflect: true })
], SearchField.prototype, "maxLength", void 0);
__decorate([
    property({ type: Number, attribute: 'minlength', reflect: true, hasChanged })
], SearchField.prototype, "minLength", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'icon-has-action' })
], SearchField.prototype, "iconHasAction", void 0);
__decorate([
    query('[part="input"]')
], SearchField.prototype, "inputElement", void 0);
SearchField = __decorate([
    customElement('ef-search-field', {
        alias: 'coral-search-field'
    })
], SearchField);
export { SearchField };
//# sourceMappingURL=index.js.map