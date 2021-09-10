var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BasicElement, html, css, customElement, property, query, state } from '@refinitiv-ui/core';
import { isSlotEmpty } from '@refinitiv-ui/utils';
import '../label';
import '../icon';
import '../overlay-menu';
import { VERSION } from '../';
/**
 * A card frame component.
 *
 * @fires item-trigger - Fired when card menu is selected.
 *
 * @slot header - Adds slotted content into the header of the card.
 * @slot footer - Adds slotted content into the footer of the card.
 */
let Card = class Card extends BasicElement {
    constructor() {
        super(...arguments);
        this._config = {};
        /**
         * Set text on the header
         */
        this.header = '';
        /**
         * Set text on the footer
         */
        this.footer = '';
        /**
         * True if header has slotted content
         */
        this.headerHasContent = false;
        /**
         * True if footer has slotted content
         */
        this.footerHasContent = false;
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
        flex-flow: column nowrap;
      }
      [part~=header] {
        display: flex;
      }
      [part~=header-body] {
        flex: 1;
        min-width: 0px;
      }
      [part~=footer]:not([part~="has-content"]), [part~=header]:not([part~="has-content"]) {
        display: none;
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
     * Open menu
     * @returns {void}
     */
    openMenu() {
        if (this.menuElement && !(this.menuElement.fullyOpened || this.menuElement.transitioning)) {
            this.menuElement.opened = true;
        }
    }
    /**
     * Close menu
     * @returns {void}
     */
    closeMenu() {
        if (this.menuElement) {
            this.menuElement.opened = false;
        }
    }
    /**
     * Run on header slot slotchange
     * @param event Footer slotchange event
     * @returns {void}
     */
    onHeaderSlotChange(event) {
        this.headerHasContent = isSlotEmpty(event.target);
    }
    /**
     * Run on footer slot slotchange
     * @param event Header slotchange event
     * @returns {void}
     */
    onFooterSlotChange(event) {
        this.footerHasContent = isSlotEmpty(event.target);
    }
    /**
     * True if card has header
     */
    get withHeader() {
        return this.headerHasContent || !!this.header || !!this.menuData;
    }
    /**
     * True if card has footer
     */
    get withFooter() {
        return this.footerHasContent || !!this.footer;
    }
    /**
     * Called after render life-cycle finished
     * @param changedProperties Properties which have changed
     * @return {void}
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('menuData') && this.menuElement) {
            this.menuElement.positionTarget = this.openMenuElement;
        }
    }
    /**
     * Called after the component is first rendered
     * @param changedProperties Properties which have changed
     * @return {void}
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.addEventListener('item-trigger', this.closeMenu); // Here to cover nested menus
    }
    /**
     * Template of menu
     * @return menu template
     */
    get menuTemplate() {
        return html `${this.menuData ? html `
      <ef-icon
        role="button"
        tabindex="0"
        part="menu-button"
        @tap="${this.openMenu}"
        icon="more"></ef-icon>
      <ef-overlay-menu
        part="menu-popup"
        .data=${this.menuData}
        position="bottom-end"></ef-overlay-menu>` : undefined}
    `;
    }
    /**
     * Template of header
     * @return header template
     */
    get headerTemplate() {
        return html `
      <div part="header${this.withHeader ? ' has-content' : ''}">
        <div part="header-body">
          <slot name="header" @slotchange="${this.onHeaderSlotChange}"></slot>
          ${!this.headerHasContent && this.header ? html `<ef-label line-clamp="3" part="header-text">${this.header}</ef-label>` : null}
        </div>
        ${this.menuTemplate}
      </div>
    `;
    }
    /**
     * Template of footer
     * @return footer template
     */
    get footerTemplate() {
        return html `
      <div part="footer${this.withFooter ? ' has-content' : ''}">
        <div part="footer-body">
          <slot name="footer" @slotchange="${this.onFooterSlotChange}"></slot>
          ${!this.footerHasContent && this.footer ? html `<ef-label line-clamp="3">${this.footer}</ef-label>` : undefined}
        </div>
      </div>
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
      <div part="body"><slot></slot></div>
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
], Card.prototype, "openMenuElement", void 0);
__decorate([
    state()
    /**
     * Menu data for creating emerald-popup-menu
     */
    ,
    state()
], Card.prototype, "menuData", void 0);
__decorate([
    state()
], Card.prototype, "headerHasContent", void 0);
__decorate([
    state()
], Card.prototype, "footerHasContent", void 0);
Card = __decorate([
    customElement('ef-card', {
        alias: 'coral-card'
    })
], Card);
export { Card };
//# sourceMappingURL=index.js.map