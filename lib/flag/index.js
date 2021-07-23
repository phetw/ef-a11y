var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BasicElement, svg, css, customElement, property, unsafeHTML } from '@refinitiv-ui/core';
import { VERSION } from '../';
import { FlagLoader } from './utils/FlagLoader';
export { preload } from './utils/FlagLoader';
const EmptyTemplate = svg ``;
/**
 * Provides a collection of flags.
 *
 * @attr {string | null} src - Src location of a svg flag.
 * @prop {string | null} src - Src location of a svg flag
 *
 */
let Flag = class Flag extends BasicElement {
    constructor() {
        super(...arguments);
        this._flag = null;
        this._src = null;
        this._template = EmptyTemplate;
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
        display: inline-block;
        box-sizing: border-box;
        width: 1.33em;
        height: 1em;
      }
      svg {
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
      }
    `;
    }
    /**
     * Name of a known flag to render.
     * @example gb
     */
    get flag() {
        return this._flag;
    }
    set flag(value) {
        if (this.flag !== value) {
            this._flag = value;
            void this.setFlagSrc();
        }
    }
    /**
     * Src location of an svg flag.
     * @example https://cdn.io/flags/gb.svg
     */
    get src() {
        return this._src;
    }
    set src(value) {
        if (this.src !== value) {
            this._src = value;
            this.clearFlag();
            if (value) {
                void this.loadAndRenderFlag(value);
            }
        }
    }
    /**
     * The flag template to render
     */
    get template() {
        return this._template;
    }
    set template(value) {
        if (this._template !== value) {
            this._template = value;
            void this.requestUpdate();
        }
    }
    /**
     * Called after the component is first rendered
     * @param changedProperties Properties which have changed
     * @returns {void}
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        /**
         * We have to call this here because
         * polyfilled browsers only get variables at this point.
         */
        this.setPrefix();
    }
    /**
     * Helper method, used to set the flag src.
     * @returns {void}
     */
    async setFlagSrc() {
        this.src = this.flag ? await FlagLoader.getSrc(this.flag) : null;
    }
    /**
     * Tries to load an flag from the url provided
     * and the renders this into the flag template.
     * @param src Source location of the svg flag.
     * @returns {void}
     */
    async loadAndRenderFlag(src) {
        const svgBody = await FlagLoader.loadSVG(src);
        if (svgBody) {
            this.template = svg `${unsafeHTML(svgBody)}`;
        }
    }
    /**
     * Get and cache CDN prefix
     * This is a private URL which is set in the theme
     * and should not be configured again via the variable.
     * @returns {void}
     */
    setPrefix() {
        if (!FlagLoader.isPrefixSet) {
            const CDNPrefix = this.getComputedVariable('--cdn-prefix')
                .replace(/^('|")|('|")$/g, '');
            FlagLoader.setCdnPrefix(CDNPrefix);
        }
    }
    /**
     * Clears SVG body from the flag template
     * @returns {void}
     */
    clearFlag() {
        this.template = EmptyTemplate;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult} Render template
     */
    render() {
        return this.template;
    }
};
__decorate([
    property({ type: String })
], Flag.prototype, "flag", null);
__decorate([
    property({ type: String })
], Flag.prototype, "src", null);
Flag = __decorate([
    customElement('ef-flag', {
        alias: 'coral-flag'
    })
], Flag);
export { Flag };
//# sourceMappingURL=index.js.map