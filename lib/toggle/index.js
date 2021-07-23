var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ControlElement, html, css, customElement, property } from '@refinitiv-ui/core';
import { VERSION } from '../';
/**
 * Form control that can toggle between 2 states
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @fires checked-changed - Fired when the `checked` property changes.
 */
let Toggle = class Toggle extends ControlElement {
    constructor() {
        super(...arguments);
        /**
         * Label of toggle checked
         */
        this.checkedLabel = '';
        /**
         * Label of toggle
         */
        this.label = '';
        /**
         * Value of toggle
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
     * @returns CSS template
     */
    static get styles() {
        return css `
      :host {
        display: inline-block;
      }
    `;
    }
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     * @param changedProperties Map of changed properties with old values
     * @returns {void}
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.addEventListener('tap', this.handleCheckedChange);
        this.addEventListener('keydown', this.handleKeyDown);
    }
    /**
     * Called when checked value changes and dispatch the event
     * @returns {void}
     */
    handleCheckedChange() {
        if (this.disabled || this.readonly) {
            return;
        }
        this.checked = !this.checked;
        this.notifyPropertyChange('checked', this.checked);
    }
    /**
     * Handle keyboard event for toggle action
     * @param event Keyboard event
     * @returns {void}
     */
    handleKeyDown(event) {
        if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
            this.handleCheckedChange();
        }
        else if (event.keyCode && event.keyCode === 13 || event.keyCode === 32) { // For older browsers
            this.handleCheckedChange();
        }
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return html `
    <div part="toggle">${this.checked && this.checkedLabel ? this.checkedLabel : this.label}</div>`;
    }
};
__decorate([
    property({ type: String, attribute: 'checked-label' })
], Toggle.prototype, "checkedLabel", void 0);
__decorate([
    property({ type: String })
], Toggle.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Toggle.prototype, "checked", void 0);
Toggle = __decorate([
    customElement('ef-toggle', {
        alias: 'coral-toggle'
    })
], Toggle);
export { Toggle };
//# sourceMappingURL=index.js.map