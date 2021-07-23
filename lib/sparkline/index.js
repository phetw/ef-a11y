var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, customElement, property, ResponsiveElement, html, query } from '@refinitiv-ui/core';
import { color } from '@refinitiv-ui/utils';
import '@refinitiv-ui/browser-sparkline';
import { VERSION } from '../';
let Sparkline = class Sparkline extends ResponsiveElement {
    constructor() {
        super(...arguments);
        /**
         * Chart data as an array of number.
         */
        this.data = [];
        /**
         * Chart previous data as an array of number.
         */
        this.previousData = [];
        /**
         * Chart initialize status
         */
        this.initialized = false;
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
        return VERSION;
    }
    /**
     * Get configuration for theme
     */
    get defaultThemeConfig() {
        var _a, _b, _c, _d, _e;
        return {
            width: this.width,
            height: this.height,
            lineColor: (_a = color(this.getComputedVariable('--line-color', '#ff9933'))) === null || _a === void 0 ? void 0 : _a.formatHex(),
            lineWidth: parseInt(this.getComputedVariable('--line-width', '2px'), 10),
            referenceLineColor: (_b = color(this.getComputedVariable('--reference-line-color', 'rgba(120, 120, 130, 0.5)'))) === null || _b === void 0 ? void 0 : _b.formatHex(),
            previousLineColor: (_c = color(this.getComputedVariable('--previous-line-color', '#bfbfbf'))) === null || _c === void 0 ? void 0 : _c.formatHex(),
            upperLineColor: (_d = color(this.getComputedVariable('--upper-line-color', '#309054'))) === null || _d === void 0 ? void 0 : _d.formatHex(),
            lowerLineColor: (_e = color(this.getComputedVariable('--lower-line-color', '#d94255'))) === null || _e === void 0 ? void 0 : _e.formatHex(),
            fillColorStyle: this.getComputedVariable('--fill-color-style', 'gradient')
        };
    }
    /**
     * Get configuration for static data
     */
    get staticDataConfig() {
        return {
            previousData: this.previousData,
            data: this.data,
            referenceValue: this.referenceValue
        };
    }
    /**
     * On Connected Callback Lifecycle
     * @ignore
     * @return {void}
     */
    connectedCallback() {
        super.connectedCallback();
        this.createChart();
    }
    /**
     * On Updated Lifecycle
     * @ignore
     * @param changedProperties changed properties
     * @return {void}
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.get('data')) {
            this.dataChanged();
        }
        this.createChart();
    }
    /**
     * Handles when data was changed.
     * Fires event `data-changed` by default but will fires event `data-error` if giving data a wrong format
     * @returns {void}
     */
    dataChanged() {
        if (!this.data || this.data.length < 2) {
            /* @fires data-error
             * Fired when data has error and chart cannot be updated
             */
            this.dispatchEvent(new CustomEvent('data-error'));
            return;
        }
        /**
         * Fired when data is changed
         * @fires data-changed
         */
        this.dispatchEvent(new CustomEvent('data-changed'));
    }
    /**
     * Re-draw canvas when the size of component changed
     * @ignore
     * @param size element dimensions
     * @returns {void}
     */
    resizedCallback(size) {
        this.width = size.width;
        this.height = size.height;
        if (this.initialized) {
            this.chart.style.width = `${this.width}px`;
            this.chart.style.height = `${this.height}px`;
            this.chart.updateCanvasSize(this.width, this.height);
        }
        else {
            this.initialized = true;
            this.createChart();
        }
    }
    /**
     * Create chart
     * @protected
     * @returns {void}
     */
    createChart() {
        if (!this.isConnected || !this.initialized || !this.data || this.data.length < 2) {
            return;
        }
        this.chart.config = {
            themeConfig: this.defaultThemeConfig,
            staticData: this.staticDataConfig
        };
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
        width: 100px;
        height: 50px;
        display: block;
      }

      browser-sparkline-chart, browser-sparkline-canvas {
        width: 100%;
        height: 100%;
        display: block;
      }

      [part=chart] {
        height: 100%;
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
      <browser-sparkline-chart part="chart" id="sparkline"></browser-sparkline-chart>
    `;
    }
};
__decorate([
    property({ type: Array })
], Sparkline.prototype, "data", void 0);
__decorate([
    property({ attribute: 'previous-data', type: Array })
], Sparkline.prototype, "previousData", void 0);
__decorate([
    property({ attribute: 'reference-value', type: Number })
], Sparkline.prototype, "referenceValue", void 0);
__decorate([
    query('browser-sparkline-chart')
], Sparkline.prototype, "chart", void 0);
Sparkline = __decorate([
    customElement('ef-sparkline', {
        alias: 'sapphire-sparkline'
    })
], Sparkline);
export { Sparkline };
//# sourceMappingURL=index.js.map