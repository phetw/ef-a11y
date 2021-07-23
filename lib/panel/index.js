var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BasicElement, html, customElement, property, css } from '@refinitiv-ui/core';
import { VERSION } from '../';
/**
 * A container for components.
 * It provides a standard background color and padding, depends on theme.
 */
let Panel = class Panel extends BasicElement {
    constructor() {
        super(...arguments);
        /**
         * Apply default padding from theme
         */
        this.spacing = false;
        /**
         * Set panel background to transparent
         */
        this.transparent = false;
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
        position: relative;
        display: block;
        overflow: hidden;
        box-sizing: border-box;
      }

      :host([transparent]) {
        background: transparent;
        border: 0;
      }

      :host([spacing]) {
        padding: 10px; /* default padding - can be overridden by theme */
      }
    `;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return html `<slot></slot>`;
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], Panel.prototype, "spacing", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Panel.prototype, "transparent", void 0);
Panel = __decorate([
    customElement('ef-panel', {
        alias: 'coral-panel'
    })
], Panel);
export { Panel };
//# sourceMappingURL=index.js.map