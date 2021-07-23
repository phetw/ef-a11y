var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OverlayViewport_1;
import { ResponsiveElement, css, customElement, html } from '@refinitiv-ui/core';
import { VERSION } from '../../';
/**
 * A private element to find overlay size boundaries
 */
let OverlayViewport = OverlayViewport_1 = class OverlayViewport extends ResponsiveElement {
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
        display: block;
        position: fixed;
        visibility: hidden;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
      }
    `;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return OverlayViewport_1.Template;
    }
};
OverlayViewport.Template = html ``; /* IE11 need empty template */
OverlayViewport = OverlayViewport_1 = __decorate([
    customElement('ef-overlay-viewport', {
        theme: false
    })
], OverlayViewport);
export { OverlayViewport };
//# sourceMappingURL=overlay-viewport.js.map