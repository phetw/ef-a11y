var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ControlElement, html, css, customElement, property, query } from '@refinitiv-ui/core';
import { VERSION } from '../';
import '../icon';
import { registerOverflowTooltip } from '../tooltip';
/**
 * Form control for selecting one or several options
 * @fires checked-changed - Fired when the `checked` property changes.
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 */
let Checkbox = class Checkbox extends ControlElement {
    constructor() {
        super(...arguments);
        /**
         * Value of checkbox
         */
        this.checked = false;
        /**
         * Set state to indeterminate
         */
        this.indeterminate = false;
        this.ariaChecked = false;
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
     * @return {CSSResult | CSSResult[]} CSS template
     */
    static get styles() {
        return css `
      :host {
        display: inline-block;
      }
      [part=check] {
        visibility: hidden;
      }
      :host([checked]) [part=check],
      :host([indeterminate]) [part=check] {
        visibility: inherit;
      }
      [part=label],
      [part=container] {
        display: inline-block;
        vertical-align: middle;
      }
      [part=label] {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      :host(:empty) [part=label], [part=label]:empty {
        display: none;
      }
    `;
    }
    /**
     * Updates the element
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    update(changedProperties) {
        // remove indeterminate if change state to checked
        if (changedProperties.get('checked') === false && this.checked && this.indeterminate) {
            this.indeterminate = false;
        }
        // remove checked if change state to indeterminate
        if (changedProperties.get('indeterminate') === false && this.indeterminate && this.checked) {
            this.checked = false;
        }
        if (changedProperties.get('checked')) {
            this.checked = this.ariaChecked;
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
        this.addEventListener('tap', this.onTap);
        this.addEventListener('keydown', this.onKeyDown);
        registerOverflowTooltip(this.labelEl, () => this.textContent);
    }
    /**
     * Run when checkbox is tapped
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
        this.checked = !this.checked;
        this.notifyPropertyChange('checked', this.checked);
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    render() {
        return html `
      <div part="container">
        <div part="check">
          ${!this.indeterminate ? html `<ef-icon icon="tick"></ef-icon>` : null}
        </div>
      </div>
      <div part="label"><slot></slot></div>
    `;
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], Checkbox.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Checkbox.prototype, "indeterminate", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'aria-checked' })
], Checkbox.prototype, "ariaChecked", void 0);
__decorate([
    query('[part=label]', true)
], Checkbox.prototype, "labelEl", void 0);
Checkbox = __decorate([
    customElement('ef-checkbox', {
        alias: 'coral-checkbox'
    })
], Checkbox);
export { Checkbox };
//# sourceMappingURL=index.js.map