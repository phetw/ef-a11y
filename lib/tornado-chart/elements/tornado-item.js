var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BasicElement, html, css, property, customElement, ifDefined } from '@refinitiv-ui/core';
import '../../progress-bar';
import '../../layout';
import { VERSION } from '../../';
/**
 * A part of <ef-tornado-chart />,
 * consists mainly of primary, secondary ef-progress-bar and labels.
 */
let TornadoItem = class TornadoItem extends BasicElement {
    constructor() {
        super(...arguments);
        /**
         * Internal vertical flag value, used only by its getter and setter
         */
        this._vertical = false;
        /**
         * Display highlight styles onto the item
         */
        this.highlighted = false;
        /**
         * Primary bar chart's value
         */
        this.primaryValue = null;
        /**
         * Primary bar chart's label
         */
        this.primaryLabel = null;
        /**
         * Secondary bar chart's value
         */
        this.secondaryValue = null;
        /**
         * Secondary bar chart's label
         */
        this.secondaryLabel = null;
        /**
         * A flag to determine container layout state
         */
        this.isContainer = false;
        /**
         * Primary bar chart alignment
         */
        this.primaryBarAlignment = 'right';
        /**
         * Secondary bar chart alignment
         */
        this.secondaryBarAlignment = 'left';
        /**
         * Label container's size
         */
        this.labelLayoutSize = '25%';
        /**
         * Primary layout flex basis size
         */
        this.primaryLayoutFlexBasis = '40%';
        /**
         * Secondary layout flex basis size
         */
        this.secondaryLayoutFlexBasis = '40%';
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
        return VERSION;
    }
    /**
     * Getter for toggling bar chart alignment
     * @returns {boolean} true if component is in vertical mode
     */
    get vertical() {
        return this._vertical;
    }
    /**
     * Setter for toggling bar chart alignment
     * @param {boolean} value vertical
     */
    set vertical(value) {
        const previousValue = this._vertical;
        if (value === previousValue) {
            return;
        }
        this._vertical = value;
        /**
         * Observe when vertical property changes,
         * then toggle between alignments
         */
        if (value) {
            this.showVerticalMode();
        }
        else {
            this.showHorizontalMode();
        }
        void this.requestUpdate('vertical', previousValue);
    }
    /**
     * Triggers vertical layout mode
     * @returns {void}
     */
    showVerticalMode() {
        this.isContainer = true;
        this.labelLayoutSize = undefined;
        this.primaryLayoutFlexBasis = undefined;
        this.secondaryLayoutFlexBasis = undefined;
        this.primaryBarAlignment = 'left';
        this.secondaryBarAlignment = 'left';
    }
    /**
     * Triggers horizontal layout mode
     * @returns {void}
     */
    showHorizontalMode() {
        this.isContainer = false;
        this.labelLayoutSize = '25%';
        this.primaryLayoutFlexBasis = '40%';
        this.secondaryLayoutFlexBasis = '40%';
        this.primaryBarAlignment = 'right';
        this.secondaryBarAlignment = 'left';
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
      }
      :host([vertical]) [part=seperator] {
        display: none;
      }
      :host([vertical]) [part=container] {
        align-items: inherit;
      }
      [part=container] {
        padding: 0;
        align-items: center;
      }
      [part=primary-bar],
      [part=secondary-bar] {
        width: 100%;
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
      <ef-layout part="container" flex nowrap ?container="${this.isContainer}">
        <ef-layout flex size="${ifDefined(this.labelLayoutSize)}">
          <div part="label">
            <slot></slot>
          </div>
        </ef-layout>
        <ef-layout flex basis="${ifDefined(this.primaryLayoutFlexBasis)}">
          <ef-progress-bar
            part="primary-bar"
            alignment=${this.primaryBarAlignment}
            label="${ifDefined(this.primaryLabel || undefined)}"
            value="${ifDefined(this.primaryValue || undefined)}">
          </ef-progress-bar>
        </ef-layout>
        <div part="seperator"></div>
        <ef-layout flex basis="${ifDefined(this.secondaryLayoutFlexBasis)}">
          <ef-progress-bar
            part="secondary-bar"
            alignment="${this.secondaryBarAlignment}"
            label="${ifDefined(this.secondaryLabel || undefined)}"
            value="${ifDefined(this.secondaryValue || undefined)}">
          </ef-progress-bar>
        </ef-layout>
      </ef-layout>
    `;
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], TornadoItem.prototype, "vertical", null);
__decorate([
    property({ type: Boolean, reflect: true })
], TornadoItem.prototype, "highlighted", void 0);
__decorate([
    property({ type: String, attribute: 'primary-value' })
], TornadoItem.prototype, "primaryValue", void 0);
__decorate([
    property({ type: String, attribute: 'primary-label' })
], TornadoItem.prototype, "primaryLabel", void 0);
__decorate([
    property({ type: String, attribute: 'secondary-value' })
], TornadoItem.prototype, "secondaryValue", void 0);
__decorate([
    property({ type: String, attribute: 'secondary-label' })
], TornadoItem.prototype, "secondaryLabel", void 0);
TornadoItem = __decorate([
    customElement('ef-tornado-item')
], TornadoItem);
export { TornadoItem };
//# sourceMappingURL=tornado-item.js.map