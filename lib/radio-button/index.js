var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, customElement, property, ControlElement, query } from '@refinitiv-ui/core';
import { VERSION } from '../';
import { registerOverflowTooltip } from '../tooltip';
import { applyRegistry, removeFromRegistry, getRadioGroup } from './radio-button-registry';
/**
 * Basic radio button
 *
 * @fires checked-changed - Fired when the `checked` property changes.
 *
 * @attr {string} [value=] - Value of the radio button
 * @prop {string} [value=] - Value of the radio button
*
 * @attr {string} [name=] - Group multiple radio buttons by assigning the same name
 * @prop {string} [name=] - Group multiple radio buttons by assigning the same name
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 */
let RadioButton = class RadioButton extends ControlElement {
    constructor() {
        super(...arguments);
        /**
         * Radio button checked state
         */
        this.checked = false;
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
      [part=check] {
        visibility: hidden;
      }
      :host([checked]) [part=check] {
        visibility: inherit;
      }
      [part=label],
      [part=container] {
        display: inline-block;
        white-space: nowrap;
        vertical-align: middle;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      :host(:empty) [part=label], [part=label]:empty {
        display: none;
      }
    `;
    }
    /**
     * Called when connected to DOM
     * @returns {void}
     */
    connectedCallback() {
        super.connectedCallback();
        applyRegistry(this);
        this.manageGroupState();
    }
    /**
     * Called when disconnected from DOM
     * @returns {void}
     */
    disconnectedCallback() {
        removeFromRegistry(this);
        super.disconnectedCallback();
    }
    /**
     * Invoked whenever the element is update
     * @param changedProperties changed properties
     * @returns {void}
     */
    update(changedProperties) {
        if (this.isConnected && this.hasUpdated && changedProperties.has('name')) {
            applyRegistry(this);
        }
        // Ensure only one radio button is checked
        if (this.isConnected && this.hasUpdated && (changedProperties.has('checked') || (changedProperties.has('name')))) {
            this.manageGroupState();
        }
        super.update(changedProperties);
    }
    /**
     * Invoked when the element is first updated
     * @param changedProperties changed properties
     * @returns {void}
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.addEventListener('tap', this.onTap);
        this.addEventListener('keydown', this.onKeyDown);
        registerOverflowTooltip(this.labelEl, () => this.textContent);
    }
    /**
     * Manage group members state, when either one is being checked
     * @returns {void}
     */
    manageGroupState() {
        if (this.checked && this.name) {
            getRadioGroup(this).filter(radio => radio !== this).forEach(radio => {
                radio.checked = false; // unchecking the rest of the group members
            });
        }
    }
    /**
     * Run when radio button is tapped
     * @param event Tap event
     * @returns {void}
     */
    onTap(event) {
        if (this.disabled || this.readonly || event.defaultPrevented) {
            return;
        }
        this.handleChangeChecked();
    }
    /**
     * Handles key down event
     * @param event Key down event object
     * @returns {void}
     */
    onKeyDown(event) {
        if (this.disabled || this.readonly || event.defaultPrevented) {
            return;
        }
        switch (event.key) {
            case 'Enter':
            case ' ':
            case 'Spacebar':
                this.handleChangeChecked();
                break;
            default:
                return;
        }
        event.preventDefault();
    }
    /**
     * Change checked state and fire
     * checked-changed event
     * @return {void}
     */
    handleChangeChecked() {
        // Once checked, radio button cannot be unchecked
        if (!this.checked) {
            this.checked = true;
            this.notifyPropertyChange('checked', this.checked);
        }
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return html `
      <div part="container">
        <div part="check"></div>
      </div>
      <div part="label"><slot></slot></div>
    `;
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], RadioButton.prototype, "checked", void 0);
__decorate([
    query('[part=label]', true)
], RadioButton.prototype, "labelEl", void 0);
RadioButton = __decorate([
    customElement('ef-radio-button', {
        alias: 'coral-radio-button'
    })
], RadioButton);
export { RadioButton };
//# sourceMappingURL=index.js.map