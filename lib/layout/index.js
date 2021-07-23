var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ResponsiveElement, html, css, customElement, property } from '@refinitiv-ui/core';
import { VERSION } from '../';
/**
 * Layout component for creating responsive applications and components
 * @fires resize - Fired when the element's size changes.
 */
let Layout = class Layout extends ResponsiveElement {
    constructor() {
        super(...arguments);
        /**
         * Displays debug lines.
         * @type {boolean}
         */
        this.debug = false;
        /**
         * Tells the element to display flex,
         * displaying children in a row wrap layout.
         */
        this.flex = false;
        /**
         * Tells the element to display as a container,
         * displaying children in a vertical nowrap layout.
         */
        this.container = false;
        /**
         * Prevents the element from being flexible,
         * when inside of another flex layout.
         */
        this.noflex = false;
        /**
         * Prevents wrapping flex items,
         * when the parent isn't a container.
         */
        this.nowrap = false;
        /**
         * Makes the element a scrollable viewport.
         */
        this.scrollable = false;
        /**
         * Sets the fixed size of the element.
         * Value could be pixel, percents or auto.
         */
        this.size = null;
        /**
         * Sets the rough size of the element based on other siblings and content.
         * Value could be pixel, percents or auto.
         */
        this.basis = null;
        /**
         * Allows the width to shrink below its contents.
         * Also prevents the width from shrinking past a certain point.
         * Value could be pixel, percents or _empty_.
         */
        this.minWidth = null;
        /**
         * Allows the height to shrink below its contents.
         * Also prevents the height from shrinking past a certain point.
         * Value could be pixel, percents or _empty_.
         */
        this.minHeight = null;
        /**
         * Prevents the width from expanding past a certain point.
         * Value could be pixel, percents or _empty_.
         */
        this.maxWidth = null;
        /**
         * Prevents the height from expanding past a certain point.
         * Value could be pixel, percents or _empty_.
         */
        this.maxHeight = null;
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
        box-sizing: border-box;
        display: block;
        position: relative;
        overflow: hidden;
        min-width: var(--min-width, 0);
        min-height: var(--min-height, 0);
        max-width: var(--max-width, none);
        max-height: var(--max-height, none);
        flex: var(--flex, 1 1 auto);
        -webkit-flex: var(--flex, 1 1 auto);
        -ms-flex: var(--flex, 1 1 auto);
      }

      :host([flex]) {
        display: flex;
        display: -webkit-flex;
        display: flexbox;
        display: -ms-flexbox;
        flex-flow: row wrap;
        align-items: stretch;
        align-content: flex-start;
      }

      :host([flex][container]) {
        flex-flow: column nowrap;
        -ms-flex-flow: column nowrap;
        -webkit-flex-flow: column nowrap;
        -webkit-flex-flow: column none;
      }

      :host([scrollable]) {
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }

      :host([noflex]) {
        flex: 0 0 auto;
        -ms-flex: 0 0 auto;
        -webkit: 0 0 auto;
      }

      :host([flex][nowrap]) {
        flex-wrap: nowrap;
        -ms-flex-wrap: nowrap;
        -webkit-flex-wrap: nowrap;
        -webkit-flex-wrap: none;
      }
    `;
    }
    /**
     * Invoked whenever the element is updated
     * @param {PropertyValues} changedProperties Map of changed properties with old values
     * @returns {void}
     */
    updated(changedProperties) {
        if (changedProperties.has('minWidth')) {
            this.updateVariable('--min-width', this.minWidth);
        }
        if (changedProperties.has('minHeight')) {
            this.updateVariable('--min-height', this.minHeight);
        }
        if (changedProperties.has('maxWidth')) {
            this.updateVariable('--max-width', this.maxWidth);
        }
        if (changedProperties.has('maxHeight')) {
            this.updateVariable('--max-height', this.maxHeight);
        }
        if (changedProperties.has('size') || changedProperties.has('basis')) {
            this.updateVariable('--flex', this.size ? '0 0 ' + this.size : '1 1 ' + (this.basis || 'auto'));
        }
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
], Layout.prototype, "debug", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Layout.prototype, "flex", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Layout.prototype, "container", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Layout.prototype, "noflex", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Layout.prototype, "nowrap", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Layout.prototype, "scrollable", void 0);
__decorate([
    property({ type: String, reflect: true })
], Layout.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true })
], Layout.prototype, "basis", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'min-width' })
], Layout.prototype, "minWidth", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'min-height' })
], Layout.prototype, "minHeight", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'max-width' })
], Layout.prototype, "maxWidth", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'max-height' })
], Layout.prototype, "maxHeight", void 0);
Layout = __decorate([
    customElement('ef-layout', {
        alias: 'quartz-layout'
    })
], Layout);
export { Layout };
//# sourceMappingURL=index.js.map