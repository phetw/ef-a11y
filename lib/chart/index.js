var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BasicElement, html, css, query, customElement, property } from '@refinitiv-ui/core';
import { color as parseColor } from '@refinitiv-ui/utils';
import 'chart.js/dist/Chart.bundle.min.js';
import '../header';
import '../layout';
import { legendHelper, merge } from './helpers';
// Register plugins
import doughnutCenterPlugin from './plugins/doughnut-center-label';
import { VERSION } from '../';
window.Chart.pluginService.register(doughnutCenterPlugin);
const CSS_COLOR_PREFIX = '--chart-color-';
const CHART_TYPE_OPAQUE = ['line', 'bubble', 'radar', 'polarArea'];
const DEFAULT_CHART_CONFIG = window.Chart.defaults;
const ELF_CHART_CONFIG = {
    polarArea: {
        scale: {
            ticks: {
                showLabelBackdrop: false
            }
        }
    },
    radar: {
        scale: {
            ticks: {
                showLabelBackdrop: false
            }
        }
    }
};
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
window.Chart.helpers.merge(DEFAULT_CHART_CONFIG, ELF_CHART_CONFIG);
/**
 * Charting component that use ChartJS library
 */
let Chart = class Chart extends BasicElement {
    constructor() {
        super(...arguments);
        /**
         * Chart.js object
         */
        this.chart = null;
        /**
         * Chart configurations. Same configuration as ChartJS
         * @type {ChartConfig}
         */
        this.config = null;
        /**
         * Generates the legend labels on a given chart
         * @param {ChartJS} chart Chart.js instance
         * @returns {Chart.ChartLegendLabelItem[]} Array of label configurations
         */
        this.generateLegendLabels = (chart) => {
            var _a, _b, _c, _d;
            if (!((_a = this.config) === null || _a === void 0 ? void 0 : _a.type)) {
                return [];
            }
            const chartOption = DEFAULT_CHART_CONFIG[this.config.type];
            if (this.datasets.length
                && chartOption.legend
                && Array.isArray(this.datasets[0].backgroundColor)) {
                let legends = [];
                if ((_b = chartOption.legend.labels) === null || _b === void 0 ? void 0 : _b.generateLabels) {
                    legends = (_c = chartOption.legend.labels) === null || _c === void 0 ? void 0 : _c.generateLabels(chart);
                }
                // Customize for doughnut chart change border color to background color
                if (['pie', 'doughnut'].includes((_d = this.config) === null || _d === void 0 ? void 0 : _d.type) && this.datasets.length > 1) {
                    legends.forEach((label) => {
                        label.strokeStyle = label.fillStyle;
                    });
                }
                return legends;
            }
            return this.datasets.map((dataset, i) => {
                var _a, _b, _c;
                const solidFill = !CHART_TYPE_OPAQUE.includes(dataset.type || ((_a = this.config) === null || _a === void 0 ? void 0 : _a.type));
                const usePointStyle = ((_c = (_b = chart.options.legend) === null || _b === void 0 ? void 0 : _b.labels) === null || _c === void 0 ? void 0 : _c.usePointStyle) || false;
                return {
                    text: dataset.label,
                    fillStyle: legendHelper.getLegendFillStyle(dataset, usePointStyle, solidFill),
                    hidden: !chart.isDatasetVisible(i),
                    lineCap: dataset.borderCapStyle,
                    lineDash: dataset.borderDash,
                    lineDashOffset: dataset.borderDashOffset,
                    lineJoin: dataset.borderJoinStyle,
                    lineWidth: Number(dataset.borderWidth) || 0,
                    strokeStyle: legendHelper.getLegendStrokeStyle(dataset, usePointStyle),
                    pointStyle: typeof dataset.pointStyle === 'string' ? dataset.pointStyle : undefined,
                    // Below is extra data used for toggling the datasets
                    datasetIndex: i
                };
            });
        };
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
        return VERSION;
    }
    /**
     * Required properties, needed for chart to work correctly.
     * @returns config
     */
    get requiredConfig() {
        return {
            options: {
                responsive: false,
                maintainAspectRatio: false,
                title: {
                    display: false
                }
            }
        };
    }
    /**
     * Safely returns the chart title
     * @returns chart title
     */
    get chartTitle() {
        var _a, _b, _c;
        const title = (_c = (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.title) === null || _c === void 0 ? void 0 : _c.text;
        if (title) {
            return typeof title === 'string' ? title : title.join();
        }
        return '';
    }
    /**
     * Safely returns a dataset array
     * @returns dataset array
     */
    get datasets() {
        var _a, _b;
        return ((_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.datasets) || [];
    }
    /**
     * List of available chart colors
     * @type {string[]}
     * @returns {string[]} List of available chart colors
     */
    get colors() {
        let color;
        let index = 0;
        const colors = [];
        while ((color = this.getComputedVariable(`${CSS_COLOR_PREFIX}${++index}`))) {
            colors.push(color);
        }
        return colors;
    }
    /**
     * Invoked whenever the element is updated
     * @param {PropertyValues} changedProperties Map of changed properties with old values
     * @returns {void}
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('config')) {
            this.onConfigChange();
        }
    }
    /**
     * Element connected
     * @returns {void}
     */
    connectedCallback() {
        super.connectedCallback();
        if (this.canvas) {
            this.createChart();
        }
    }
    /**
     * Element disconnected
     * @returns {void}
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        this.destroyChart();
    }
    /**
     * Themable parts of the config.
     * This will be merged into the configuration object.
     * @returns {ChartConfig} chart config with theme
     */
    get themableConfig() {
        var _a;
        const style = getComputedStyle(this);
        // TODO: Try and remove the need for global object modification.
        // It's easier to cover all areas by modifying the global object,
        // however, if possible, we should look to try and just modify local configs.
        // Set font globals
        window.Chart.defaults.global.defaultFontColor = style.getPropertyValue('color');
        window.Chart.defaults.global.defaultFontFamily = style.getPropertyValue('font-family');
        window.Chart.defaults.global.defaultFontSize = Number(style.getPropertyValue('font-size').replace('px', ''));
        window.Chart.defaults.global.defaultFontStyle = style.getPropertyValue('font-style');
        // Set grid line globals
        window.Chart.defaults.scale.gridLines.color = this.getComputedVariable('--grid-line-color', 'transparent');
        window.Chart.defaults.scale.gridLines.zeroLineColor = this.getComputedVariable('--zero-line-color', 'transparent');
        return {
            options: {
                animation: {
                    duration: this.cssVarAsNumber('--animation-duration', '0')
                },
                elements: {
                    line: {
                        borderWidth: this.cssVarAsNumber('--line-width', '1'),
                        tension: this.cssVarAsNumber('--line-tension', '0.5')
                    }
                },
                tooltips: {
                    backgroundColor: this.getComputedVariable('--tooltip-background-color', 'transparent'),
                    titleFontColor: this.getComputedVariable('--tooltip-title-color', 'transparent'),
                    bodyFontColor: this.getComputedVariable('--tooltip-body-color', 'transparent'),
                    cornerRadius: this.cssVarAsNumber('--tooltip-border-radius', '0'),
                    caretSize: this.cssVarAsNumber('--tooltip-caret-size', '0'),
                    xPadding: this.cssVarAsNumber('--tooltip-padding-x', '--tooltip-padding', '0'),
                    yPadding: this.cssVarAsNumber('--tooltip-padding-y', '--tooltip-padding', '0'),
                    titleSpacing: this.cssVarAsNumber('--tooltip-title-spacing', '0'),
                    displayColors: false
                },
                legend: {
                    position: ['pie', 'doughnut'].includes(((_a = this.config) === null || _a === void 0 ? void 0 : _a.type) || '') ? 'right' : 'top',
                    labels: {
                        boxWidth: this.cssVarAsNumber('--legend-key-box-width', '10'),
                        generateLabels: this.generateLegendLabels
                    }
                }
            }
        };
    }
    /**
     * Handles a change of configuration object.
     * This does not fire when a property of the config object changes,
     * for this use this.updateChart() to apply changes.
     * @returns {void}
     */
    onConfigChange() {
        if (this.config) {
            this.createChart();
        }
    }
    /**
     * Get as CSS variable and tries to convert it into a usable number
     * @returns {(number|undefined)} The value as a number, or, undefined if NaN.
     */
    cssVarAsNumber(...args) {
        const result = Number(this.getComputedVariable(...args).replace(/\D+$/, ''));
        return isNaN(result) ? undefined : result;
    }
    /**
     * Merges all the different layers of the config.
     * @returns {void}
     */
    mergeConfigs() {
        if (!this.config) {
            return;
        }
        merge(this.config, this.themableConfig);
        merge(this.config, this.requiredConfig, true);
    }
    /**
     * Themes the passed-in configuration object
     * @returns {void}
     */
    decorateConfig() {
        this.mergeConfigs();
        const extendColorsIfRequired = (currentColors, infoColors) => {
            if (Array.isArray(currentColors) && Array.isArray(infoColors) && currentColors.length < infoColors.length) {
                merge(currentColors, infoColors);
            }
        };
        this.datasets.forEach((dataset) => {
            const info = this.datasetInfo(dataset);
            // make sure that colours are defined for every dataset e.g. when new dataset is added
            extendColorsIfRequired(dataset.borderColor, info.borderColor);
            extendColorsIfRequired(dataset.backgroundColor, info.backgroundColor);
            extendColorsIfRequired(dataset.pointBorderColor, info.pointBorderColor);
            extendColorsIfRequired(dataset.pointBackgroundColor, info.pointBackgroundColor);
            dataset.borderColor = dataset.borderColor || info.borderColor;
            dataset.backgroundColor = dataset.backgroundColor || info.backgroundColor;
            dataset.pointBackgroundColor = dataset.pointBackgroundColor || info.pointBackgroundColor;
            dataset.pointBorderColor = dataset.pointBorderColor || info.pointBorderColor;
        });
    }
    /**
     * Returns usable information about a dataset
     * @param {Chart.ChartDataSets} dataset Chart dataset
     * @returns {Chart.ChartDataSets} Information about the dataset
     */
    datasetInfo(dataset) {
        var _a;
        const type = dataset.type || ((_a = this.config) === null || _a === void 0 ? void 0 : _a.type);
        let index = this.datasets.indexOf(dataset);
        const isColorArray = (!!type && ['pie', 'doughnut', 'polarArea'].includes(type)) || type === 'bar' && this.datasets.length === 1;
        const isSolidFill = !!type && !CHART_TYPE_OPAQUE.includes(type);
        // Doughnut chart using same color sequence for each data in datasets
        let borderColor = null;
        if (['pie', 'doughnut'].includes(type) && this.datasets.length > 1) {
            index = 0;
            borderColor = this.getComputedVariable('--multi-dataset-border-color', '#fff');
        }
        const colors = this.generateColors(isColorArray, isColorArray && dataset.data ? dataset.data.length : 1, index);
        return {
            type,
            borderColor: borderColor || colors.solid,
            backgroundColor: isSolidFill ? colors.solid : colors.opaque,
            pointBorderColor: colors.solid,
            pointBackgroundColor: colors.solid
        };
    }
    /**
     * Generates internal solid and opaque color set for a dataset
     * @param {boolean} isArray Flag to return result in array or not e.g. doughnut, pie, etc
     * @param {number} amount Amount of colors required
     * @param {number} shift Positional shift of the color start point
     * @returns {DatasetColors} Solid and opaque color values
     */
    generateColors(isArray, amount, shift) {
        let color;
        const solid = [];
        const opaque = [];
        const alpha = Number(this.getComputedVariable('--fill-opacity', '0.2'));
        amount = isArray ? amount : 1;
        for (let i = shift; i < amount + shift; i++) {
            color = this.colors[i % this.colors.length];
            solid.push(color);
            const opaqueColor = parseColor(color);
            if (opaqueColor) {
                opaqueColor.opacity = alpha;
                opaque.push(opaqueColor.toString());
            }
        }
        return {
            solid: isArray ? solid : solid[0],
            opaque: isArray ? opaque : opaque[0]
        };
    }
    /**
     * Manages the custom title element
     * @returns {void}
     */
    manageTitle() {
        this.titleElement.textContent = this.chartTitle;
        if (this.chartTitle) {
            this.titleElement.style.removeProperty('display');
        }
        else {
            this.titleElement.style.display = 'none';
        }
    }
    /**
     * Creates a chart after config has changed,
     * or, the element has been connected to the DOM
     * @returns {void}
     */
    createChart() {
        const ctx = this.canvas.getContext('2d');
        if (ctx && this.config) {
            // Are we reusing an old chart canvas?
            const isReusingCanvas = this.destroyChart();
            // Preparing the resources before create chart
            this.decorateConfig();
            this.manageTitle();
            // Create chart
            this.chart = new window.Chart(ctx, this.config);
            if (isReusingCanvas) {
                // If we're reusing an old chart canvas, we need to resize it.
                // Destroying a chart has some strange side-effects on the canvas.
                this.chart.resize();
            }
        }
    }
    /**
     * Destroys the chart.js object
     * @returns True if a chart object has been destroyed
     */
    destroyChart() {
        if (this.chart) {
            // Destroy the chart
            this.chart.destroy();
            this.chart = null;
            return true;
        }
        return false;
    }
    /**
     * Re-renders the chart based on its config
     * @param {ChartUpdateProps} config Additional configuration object for the update process.
     * @returns {void}
     */
    renderChart(config = { duration: this.cssVarAsNumber('--animation-duration', '0') }) {
        if (!this.chart || !this.config) {
            return;
        }
        // Stop any chart.js animations
        this.chart.stop();
        // Decorate the config object
        this.decorateConfig();
        // Update internal layout
        this.manageTitle();
        // Update the chart
        this.chart.update(config);
    }
    /**
     * Update all data, title, scales, legends and re-render the chart based on its config
     * @param {ChartUpdateProps=} config Additional configuration for control an animation in the update process.
     * @returns {void}
     */
    updateChart(config) {
        this.renderChart(config);
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
        overflow: hidden;
        position: relative;
      }
      :host::before {
        content: '';
        display: block;
        padding-top: 60%;
        min-height: 300px;
        box-sizing: border-box;
      }
      [container] {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
      ef-header {
        margin-bottom: 12px;
      }
      canvas {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    `;
    }
    /**
     * Handles resize event of the chart region
     * @returns {void}
     */
    onResize() {
        var _a;
        (_a = this.chart) === null || _a === void 0 ? void 0 : _a.resize();
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return html `
      <ef-layout flex container>
        <ef-header></ef-header>
        <ef-layout part="chart" @resize="${this.onResize}">
          <canvas id="canvas"></canvas>
        </ef-layout>
      </ef-layout>`;
    }
};
__decorate([
    property({ type: Object })
], Chart.prototype, "config", void 0);
__decorate([
    query('canvas')
], Chart.prototype, "canvas", void 0);
__decorate([
    query('ef-header')
], Chart.prototype, "titleElement", void 0);
Chart = __decorate([
    customElement('ef-chart', {
        alias: 'sapphire-chart'
    })
], Chart);
export { Chart };
//# sourceMappingURL=index.js.map