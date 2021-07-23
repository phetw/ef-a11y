var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BasicElement, html, css, customElement, property, query, state } from '@refinitiv-ui/core';
import '../label';
import '../button';
import '../overlay-menu';
import { VERSION } from '../';
/**
 * A card frame component.
 * @fires item-trigger - Fired when card menu is selected.
 */
let Card = class Card extends BasicElement {
    constructor() {
        super(...arguments);
        /**
         * Set text on the header
         */
        this.header = null;
        /**
         * Set text on the footer
         */
        this.footer = null;
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
        display: flex;
        flex-direction: column;
      }
    `;
    }
    /**
     * Set card configurations
     */
    get config() {
        return this._config;
    }
    set config(config) {
        var _a;
        const data = (_a = config === null || config === void 0 ? void 0 : config.menu) === null || _a === void 0 ? void 0 : _a.data;
        if (data !== this.menuData) {
            this.menuData = data;
        }
        this._config = config;
    }
    /**
     * Card's overlay menu element
    */
    get menu() {
        return this.menuElement;
    }
    /**
     * Open menu
     * @returns {void}
     */
    openMenu() {
        if (this.menu && !(this.menu.fullyOpened || this.menu.transitioning)) {
            this.menu.opened = true;
        }
    }
    /**
     * Called after render life-cycle finished
     * @param changedProperties Properties which have changed
     * @return {void}
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('menuData') && this.menu) {
            this.menu.positionTarget = this.buttonElement;
        }
    }
    /**
     * Template of menu
     * @return menu template
     */
    get menuTemplate() {
        return html `${this.menuData ? html `
      <ef-button part="menu-button" @tap="${this.openMenu}" icon="more" transparent></ef-button>
      <ef-overlay-menu part="menu-popup" .data=${this.menuData} position="bottom-end"></ef-overlay-menu>` : null}
    `;
    }
    /**
     * Template of header
     * @return header template
     */
    get headerTemplate() {
        return html `
      ${this.header || this.menuData ? html `<div part="header">
        ${this.header ? html `<ef-label max-line="3" part="header-text">${this.header}</ef-label>` : null}
        ${this.menuTemplate}
      </div>` : null}
    `;
    }
    /**
     * Template of footer
     * @return footer template
     */
    get footerTemplate() {
        return html `
      ${this.footer ? html `<ef-label max-line="3" part="footer">${this.footer}</ef-label>` : null}
    `;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return html `
      ${this.headerTemplate}
      <div part="body">
        <slot></slot>
      </div>
      ${this.footerTemplate}
    `;
    }
};
__decorate([
    property({ type: String })
], Card.prototype, "header", void 0);
__decorate([
    property({ type: String })
], Card.prototype, "footer", void 0);
__decorate([
    property({ type: Object, attribute: false })
], Card.prototype, "config", null);
__decorate([
    query('[part=menu-popup]')
], Card.prototype, "menuElement", void 0);
__decorate([
    query('[part=menu-button]')
], Card.prototype, "buttonElement", void 0);
__decorate([
    state()
], Card.prototype, "menuData", void 0);
Card = __decorate([
    customElement('ef-card', {
        alias: 'coral-card'
    })
], Card);
export { Card };
//# sourceMappingURL=index.js.map