var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BasicElement, html, css, customElement, property } from '@refinitiv-ui/core';
import { VERSION } from '../';
import '../icon';
/**
 * Used to display at the top of application to provide a status or information.
 * @slot right - place custom content on the right of bar.
 *
 * @fires clear - fired when clear button is clicked
 */
let AppstateBar = class AppstateBar extends BasicElement {
    constructor() {
        super(...arguments);
        /**
         * Text to display in heading section.
         */
        this.heading = '';
        /**
         * (optional) Type of state bar. Supported value are `info`, `highlight`.
         */
        this.state = null;
        /**
         * Hide the element when clear button is clicked
         * @param {Event} event - event params
         * @fires AppstateBar#clear
         * @returns {void}
         */
        this.clear = (event) => {
            event.stopPropagation();
            this.style.display = 'none';
            /**
             * Clear Event
             * Fired when clear button is clicked
             *
             * @event clear
             */
            this.dispatchEvent(new CustomEvent('clear'));
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
     *
     * @returns {(CSSResult|CSSResult[])} CSS template
     */
    static get styles() {
        return css `
      :host {
        display: block;
      }
    `;
    }
    /**
     * Invoked whenever the element is updated
     * @param {PropertyValues} changedProperties Map of changed properties with old values
     * @returns {void}
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        // Call this.updateStyles() to update css variables
        if (changedProperties.has('state')) {
            this.updateStyles();
        }
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    render() {
        return html `
      <div part="heading">${this.heading}</div>
      <div part="message"><slot></slot></div>
      <div part="right"><slot name="right"></slot></div>
      <ef-icon part="close"  @tap="${this.clear}" icon="cross"></ef-icon>
    `;
    }
};
__decorate([
    property({ type: String })
], AppstateBar.prototype, "heading", void 0);
__decorate([
    property({ type: String, reflect: true })
], AppstateBar.prototype, "state", void 0);
AppstateBar = __decorate([
    customElement('ef-appstate-bar', {
        alias: 'amber-appstate-bar'
    })
], AppstateBar);
export { AppstateBar };
//# sourceMappingURL=index.js.map