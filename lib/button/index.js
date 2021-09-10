var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ControlElement, css, customElement, html, property, query } from '@refinitiv-ui/core';
import { VERSION } from '..';
import '../icon';
import { registerOverflowTooltip } from '../tooltip';
/**
 * Use button for actions in forms, dialogs,
 * and more with support for different states and styles.
 * @attr {boolean} disabled - Set state to disabled
 * @prop {boolean} [disabled=false] - Set state to disabled
 * @fires active-changed - Dispatched on changing `active` property state by taping on button when property `toggles` is true.
 */
let Button = class Button extends ControlElement {
    constructor() {
        super(...arguments);
        /**
         * Customises text alignment when specified alongside `icon` property
         * Value can be `before` or `after`
         */
        this.textpos = 'after';
        /**
         * Removes background when specified alongside `icon` property
         */
        this.transparent = false;
        /**
         * Specify icon to display in button. Value can be icon name
         */
        this.icon = null;
        /**
         * Specify icon to display when hovering. Value can be icon name
         */
        this.hoverIcon = null;
        /**
         * Set state to call-to-action
         */
        this.cta = false;
        /**
         * Enable or disable ability to be toggled
         */
        this.toggles = false;
        /**
         * An active or inactive state, can only be used with toggles property/attribute
         */
        this.active = false;
        /**
         * Use by theme to detect when no content inside button
         */
        this.empty = false;
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
      :host(:not(:hover)) #hover-icon,
      :host(:hover) [part=icon]:not(#hover-icon) {
        display: none;
      }
    `;
    }
    /**
     * the lifecycle method called when properties changed first time
     * @param changedProperties properties it's the Map object which has the updated properties
     * @returns {void}
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.addEventListener('tap', this.toggleActive);
        this.addEventListener('tapstart', this.setPressed);
        this.addEventListener('tapend', this.unsetPressed);
        this.addEventListener('keyup', this.onKeyUpHandler);
        this.emptyComputed();
        registerOverflowTooltip(this.labelElement, () => this.textContent);
    }
    /**
     * Handle the slotchange event of default slot
     * @returns {void}
     */
    onDefaultSlotChangeHandler() {
        this.emptyComputed();
    }
    /**
     * Handle keydown event
     * @param event the keyboard event
     * @returns {void}
     */
    onKeyUpHandler(event) {
        if (this.isReturnOrSpaceKey(event.key)) {
            this.click();
        }
    }
    /**
     * Check key names
     * @param key the keyboard key
     * @returns true if space or enter pressed
     */
    isReturnOrSpaceKey(key) {
        return key === ' '
            || key === 'Spacebar'
            || key === 'Enter'
            || key === 'Return';
    }
    /**
     * Handle active property, when toggles is true
     * @returns {void}
     */
    toggleActive() {
        if (this.toggles) {
            this.active = !this.active;
            /**
             * Fired on changing `active` property state by taping on button when property `toggles` is true.
             */
            this.notifyPropertyChange('active', this.active);
        }
    }
    /**
     * Set pressed attribute
     * @returns {void}
     */
    setPressed() {
        this.setAttribute('pressed', '');
    }
    /**
     * Remove pressed attribute
     * @returns {void}
     */
    unsetPressed() {
        this.removeAttribute('pressed');
    }
    /**
     * Compute empty property based on textContent
     * @returns {void}
     */
    emptyComputed() {
        this.empty = this.textContent ? this.textContent.length === 0 : true;
        this.switchEmptyAttribute();
    }
    /**
     * Set or remove attribute "empty" based on slot present
     * @returns {void}
     */
    switchEmptyAttribute() {
        if (this.empty) {
            this.setAttribute('empty', '');
        }
        else {
            this.removeAttribute('empty');
        }
    }
    /**
     * Returns icon template if exists
     * @return {TemplateResult | null}  Render template
     */
    get iconTemplate() {
        return this.icon
            ? html `<ef-icon part="icon" icon="${this.icon}" id="icon"></ef-icon>`
            : null;
    }
    /**
     * Returns hover icon template if exists
     * @return {TemplateResult | null}  Render template
     */
    get hoverIconTemplate() {
        const hoverIcon = this.hoverIcon || this.icon;
        return hoverIcon
            ? html `<ef-icon part="icon" icon="${hoverIcon}" id="hover-icon"></ef-icon>`
            : null;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    render() {
        return html `
      ${this.iconTemplate}
      ${this.hoverIconTemplate}
      <span part="label">
        <slot @slotchange="${this.onDefaultSlotChangeHandler}"></slot>
      </span>
    `;
    }
};
__decorate([
    property({ type: String, reflect: true })
], Button.prototype, "textpos", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Button.prototype, "transparent", void 0);
__decorate([
    property({ type: String, reflect: true })
], Button.prototype, "icon", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'hover-icon' })
], Button.prototype, "hoverIcon", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Button.prototype, "cta", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Button.prototype, "toggles", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Button.prototype, "active", void 0);
__decorate([
    query('[part="label"]')
], Button.prototype, "labelElement", void 0);
Button = __decorate([
    customElement('ef-button', {
        alias: 'coral-button'
    })
], Button);
export { Button };
//# sourceMappingURL=index.js.map