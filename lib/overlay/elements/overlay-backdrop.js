var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OverlayBackdrop_1;
import { BasicElement, css, customElement, property, html } from '@refinitiv-ui/core';
import { VERSION } from '../../';
/**
 * A private element to show backdrop for overlay
 */
let OverlayBackdrop = OverlayBackdrop_1 = class OverlayBackdrop extends BasicElement {
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
        pointer-events: all;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `;
    }
    /**
     * Set a specific z-index to override automatically calculated z-index
     * @param zIndex zIndex value
     */
    set zIndex(zIndex) {
        if (typeof zIndex === 'number') {
            this.style.setProperty('z-index', `${zIndex}`);
        }
        else {
            this.style.removeProperty('z-index');
        }
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return OverlayBackdrop_1.Template;
    }
};
OverlayBackdrop.Template = html ``;
__decorate([
    property({ type: Number, attribute: false })
], OverlayBackdrop.prototype, "zIndex", null);
OverlayBackdrop = OverlayBackdrop_1 = __decorate([
    customElement('ef-overlay-backdrop')
], OverlayBackdrop);
export { OverlayBackdrop };
//# sourceMappingURL=overlay-backdrop.js.map