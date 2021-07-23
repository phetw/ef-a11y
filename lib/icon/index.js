var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BasicElement, svg, css, customElement, property, unsafeHTML } from '@refinitiv-ui/core';
import { VERSION } from '../';
import { IconLoader } from './utils/IconLoader';
export { preload } from './utils/IconLoader';
const EmptyTemplate = svg ``;
let Icon = class Icon extends BasicElement {
    constructor() {
        super(...arguments);
        this._icon = null;
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
     * @return CSS template
     */
    static get styles() {
        return css `
      :host {
        display: inline-block;
        line-height: 1;
        width: 1em;
        height: 1em;
      }
      svg {
        width: 100%;
        height: 100%;
      }
    `;
    }
    /**
     * Name of a known icon to render.
     * @example heart
     */
    get icon() {
        return this._icon;
    }
    set icon(value) {
        const oldValue = this._icon;
        if (oldValue !== value) {
            this._icon = value;
            void this.setIconSrc();
            void this.requestUpdate('icon', oldValue);
        }
    }
    /**
     * Src location of an svg icon.
     * @example https://cdn.io/icons/heart.svg
     */
    get src() {
        return this._src;
    }
    set src(value) {
        if (this.src !== value) {
            this._src = value;
            this.clearIcon();
            if (value) {
                void this.loadAndRenderIcon(value);
            }
        }
    }
    /**
     * The icon template to render
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
     * Helper method, used to set the icon src.
     * @returns {void}
     */
    async setIconSrc() {
        this.src = this.icon ? await IconLoader.getSrc(this.icon) : null;
    }
    /**
     * Tries to load an icon from the url provided
     * and the renders this into the icon template.
     * @param src Source location of the svg icon.
     * @returns {void}
     */
    async loadAndRenderIcon(src) {
        const svgBody = await IconLoader.loadSVG(src);
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
        if (!IconLoader.isPrefixSet) {
            const CDNPrefix = this.getComputedVariable('--cdn-prefix')
                .replace(/^('|")|('|")$/g, '');
            IconLoader.setCdnPrefix(CDNPrefix);
        }
    }
    /**
     * Clears SVG body from the icon template
     * @returns {void}
     */
    clearIcon() {
        this.template = EmptyTemplate;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return this.template;
    }
};
__decorate([
    property({ type: String, reflect: true })
], Icon.prototype, "icon", null);
__decorate([
    property({ type: String })
], Icon.prototype, "src", null);
Icon = __decorate([
    customElement('ef-icon', {
        alias: 'coral-icon'
    })
], Icon);
export { Icon };
//# sourceMappingURL=index.js.map