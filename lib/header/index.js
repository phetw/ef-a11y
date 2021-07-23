var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BasicElement, html, css, customElement, property } from '@refinitiv-ui/core';
import { VERSION } from '../';
/**
 * Use to identify and separate different sections of a page.
 * Headers helps to organize the page layout content into
 * a sensible hierarchy and improve the user experience.
 *
 * @slot left - Slot to add custom contents to the left side of header e.g. ef-icon, ef-checkbox
 * @slot right - Slot to add custom contents to the right side of header e.g. ef-icon, ef-checkbox
 */
let Header = class Header extends BasicElement {
    constructor() {
        super(...arguments);
        /**
         * Use level styling from theme
         */
        this.level = '2';
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
        return VERSION;
    }
    /**
     * Style definition
     * @return CSS template
     */
    static get styles() {
        return css `
      :host {
        display: block;
      }
      :host ::slotted(*) {
        margin-top: 0;
        margin-bottom: 0;
        vertical-align: middle;
      }
      [part="label"] {
        text-align: inherit;
      }
    `;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return html `
      <slot name="left">
        <div part="spacer"></div>
      </slot>
      <div part="label">
        <slot></slot>
      </div>
      <slot name="right"></slot>
    `;
    }
};
__decorate([
    property({ type: String, reflect: true })
], Header.prototype, "level", void 0);
Header = __decorate([
    customElement('ef-header', {
        alias: 'coral-header'
    })
], Header);
export { Header };
//# sourceMappingURL=index.js.map