var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BasicElement, customElement, html } from '@refinitiv-ui/core';
import { VERSION } from '../';
/**
 * Global cache for loader template parts
 */
let cachedParts;
/**
 *  An animated graphical component,
 *  used to show that an app is performing an action
 *  in the background such as downloading content.
 */
let Loader = class Loader extends BasicElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
        return VERSION;
    }
    /**
     * Collection of template part names,
     * used to create and theme different loader styles
     */
    get templateParts() {
        const parts = cachedParts || this.getComputedVariable('--parts')
            .split(',').map(part => part.trim()).filter(part => part);
        if (cachedParts !== parts && parts.length) {
            cachedParts = parts;
        }
        return parts;
    }
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        !cachedParts && this.requestUpdate(); // polyfilled browsers require a second update
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     *
     * @return TemplateResult
     */
    render() {
        const dots = [];
        for (const part of this.templateParts) {
            dots.push(html `
        <i part="${part}"></i>
      `);
        }
        return html `
      <div part="wrapper">${dots}</div>
    `;
    }
};
Loader = __decorate([
    customElement('ef-loader', {
        alias: 'amber-loader'
    })
], Loader);
export { Loader };
//# sourceMappingURL=index.js.map