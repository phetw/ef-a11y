var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ControlElement, css, customElement, html, ifDefined, property, query } from '@refinitiv-ui/core';
import { preload } from '../icon';
import '../icon';
import { VERSION } from '../';
const hasChanged = (newVal, oldVal) => oldVal === undefined ? false : newVal !== oldVal;
const isIE = (/Trident/g).test(navigator.userAgent);
let isEyeOffPreloadRequested = false;
/**
 * A form control element for password
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
let PasswordField = class PasswordField extends ControlElement {
    constructor() {
        super(...arguments);
        /**
         * Set regular expression for input validation
         */
        this.pattern = '';
        /**
         * Set placeholder text
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
         * Set character minimum limit
         */
        this.minLength = null;
        /**
         * Set character maximum limit
         */
        this.maxLength = null;
        /**
         * Defines whether password is visible or not
         */
        this.isPasswordVisible = false;
        /**
         * check if value is changed and fire event
         * @return {void}
         */
        this.onPossibleValueChange = () => {
            const value = this.inputElement.value;
            this.setValueAndNotify(value);
        };
        /**
         * validate input according `pattern`, `min` and `max` properties
         * change state of `error` property according pattern validation
         * @return void
         */
        this.validateInput = () => {
            let error = !this.inputElement.checkValidity();
            if (this.shouldValidateForMinLength(error)) {
                error = !!this.minLength && (this.minLength > this.value.length);
            }
            if (this.error !== error) {
                this.error = error;
                this.notifyPropertyChange('error', this.error);
            }
        };
        /**
         * Detect `enter` and `space` keydown and fire
         * @param event keydown event
         * @returns {void}
         */
        this.handleKeyDown = (event) => {
            if (event.key === 'Spacebar' || event.key === ' ' || event.key === 'Enter') {
                this.togglePasswordVisibility();
            }
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
     * @return A `CSSResult` that will be used to style the host,
     * slotted children and the internal template of the element.
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
    `;
    }
    /**
     * Select the contents of input
     * @return void
     */
    select() {
        if (!this.disabled && !this.readonly) {
            this.inputElement.select();
        }
    }
    /**
     * Called when the element’s DOM has been updated and rendered for the first time
     * @param changedProperties Properties that has changed
     * @return shouldUpdate
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        if (!isEyeOffPreloadRequested) {
            preload('eye-off');
            isEyeOffPreloadRequested = true;
        }
    }
    /**
     * Called when the element’s DOM has been updated and rendered
     * @param changedProperties Properties that has changed
     * @return shouldUpdate
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
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return html `
      <input
        type=${this.isPasswordVisible ? 'text' : 'password'}
        part="input"
        ?readonly="${this.readonly}"
        ?disabled="${this.disabled}"
        placeholder="${ifDefined(this.placeholder || undefined)}"
        minlength="${ifDefined(this.minLength || undefined)}"
        maxlength="${ifDefined(this.maxLength || undefined)}"
        pattern="${ifDefined(this.pattern || undefined)}"
        @input="${this.onPossibleValueChange}"
        @change="${this.onPossibleValueChange}"
        autocomplete="off"
      />
      <ef-icon
        icon=${this.isPasswordVisible ? 'eye-off' : 'eye'}
        ?readonly="${this.readonly}"
        ?disabled="${this.disabled}"
        @tap="${this.togglePasswordVisibility}"
        @keydown="${this.handleKeyDown}"
        part="icon"
        tabindex="0"
      ></ef-icon>
    `;
    }
    /**
     * Check if input should be re-validated
     * True if value changed and pattern or minlength is present
     * True if pattern or minlength changed
     * @param changedProperties Properties that has changed
     * @return True if input should be re-validated
     */
    shouldValidateInput(changedProperties) {
        return (changedProperties.has('pattern') || !!(this.pattern && changedProperties.has('value')))
            || (changedProperties.has('minLength') || !!(this.minLength && changedProperties.has('value')));
    }
    /**
     * @param error existing state of error
     * @returns true if there is no error and browser is IE11 and minLength more than 0 and value exists
     */
    shouldValidateForMinLength(error) {
        return !!(!error && isIE && this.minLength && !!this.value);
    }
    /**
     * Toggles password visibility state
     * @return void
     */
    togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;
        void this.requestUpdate();
    }
};
__decorate([
    property({ type: String, hasChanged })
], PasswordField.prototype, "pattern", void 0);
__decorate([
    property({ type: String })
], PasswordField.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], PasswordField.prototype, "error", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], PasswordField.prototype, "warning", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], PasswordField.prototype, "transparent", void 0);
__decorate([
    property({ type: Number, attribute: 'minlength', reflect: true, hasChanged })
], PasswordField.prototype, "minLength", void 0);
__decorate([
    property({ type: Number, attribute: 'maxlength', reflect: true })
], PasswordField.prototype, "maxLength", void 0);
__decorate([
    query('[part="input"]')
], PasswordField.prototype, "inputElement", void 0);
PasswordField = __decorate([
    customElement('ef-password-field', {
        alias: 'coral-password-field'
    })
], PasswordField);
export { PasswordField };
//# sourceMappingURL=index.js.map