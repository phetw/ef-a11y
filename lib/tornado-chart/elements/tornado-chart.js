var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ResponsiveElement, html, css, customElement, property } from '@refinitiv-ui/core';
import { VERSION } from '../../';
import './tornado-item';
/**
 * A data visualization that helps to
 * show the differences or similarities between values
 * @slot header - Any HTML contents to display at chart header section
 * @slot footer - Any HTML contents to display at chart footer section
 */
let TornadoChart = class TornadoChart extends ResponsiveElement {
    constructor() {
        super(...arguments);
        /**
         * Primary bar chart legend text
         */
        this.primary = null;
        /**
         * Secondary bar chart legend text
         */
        this.secondary = null;
        /**
         * A flag to keep component's responsive state
         */
        this.isResponsive = false;
        /**
         * True if legend's alignment is vertical
         */
        this.legendAlignment = false;
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
        return VERSION;
    }
    /**
     * Set chart's legend alignment
     * @param responsive true if items needs to be responsive
     * @returns {void}
     */
    setLegendAlignment(responsive) {
        this.legendAlignment = responsive;
        void this.requestUpdate();
    }
    /**
     * Set ef-tornado-item's alignment
     * @param responsive true if items needs to be responsive
     * @returns {void}
     */
    setItemAlignment(responsive) {
        this.querySelectorAll('ef-tornado-item').forEach((item) => {
            item.vertical = responsive;
        });
    }
    /**
     * Handles element's resize behavior
     * @ignore
     * @param {ElementSize} size size of the element
     * @returns {void}
     */
    resizedCallback(size) {
        const previousResponsiveValue = this.isResponsive;
        this.isResponsive = size.width < parseInt(this.getComputedVariable('--responsive-width'), 10);
        // Make changes to DOM only when the responsive state changes
        if (this.isResponsive !== previousResponsiveValue) {
            this.setItemAlignment(this.isResponsive);
            this.setLegendAlignment(this.isResponsive);
        }
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
        --responsive-width: 450;
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
      <slot name="header"></slot>
      <div part="legend" ?vertical=${this.legendAlignment}>
        <div part="legend-item">
          <div part="primary-symbol"></div>
          <div part="primary-label">${this.primary}</div>
        </div>
        <div part="legend-item">
          <div part="secondary-symbol"></div>
          <div part="secondary-label">${this.secondary}</div>
        </div>
      </div>
      <slot></slot>
      <slot name="footer"></slot>
    `;
    }
};
__decorate([
    property({ type: String })
], TornadoChart.prototype, "primary", void 0);
__decorate([
    property({ type: String })
], TornadoChart.prototype, "secondary", void 0);
TornadoChart = __decorate([
    customElement('ef-tornado-chart', {
        alias: 'sapphire-parity-chart'
    })
], TornadoChart);
export { TornadoChart };
//# sourceMappingURL=tornado-chart.js.map