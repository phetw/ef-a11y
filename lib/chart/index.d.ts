import { JSXInterface } from '../jsx';
/// <reference types="chart.js" />
import { BasicElement, PropertyValues, TemplateResult, CSSResult } from '@refinitiv-ui/core';
import 'chart.js/dist/Chart.bundle.min.js';
import { Header } from '../header';
import '../header';
import '../layout';
import type { ChartJS, ChartConfig, ChartUpdateProps, DatasetColors } from './helpers/types';
declare global {
    interface Window {
        Chart: ChartJS;
    }
}
export type { ChartConfig, ChartUpdateProps };
/**
 * Charting component that use ChartJS library
 */
export declare class Chart extends BasicElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * Chart.js object
     */
    private chart;
    /**
     * Chart configurations. Same configuration as ChartJS
     * @type {ChartConfig}
     */
    config: ChartConfig | null;
    /**
     * Html canvas element
     * @type {HTMLCanvasElement}
     */
    protected canvas: HTMLCanvasElement;
    /**
     * Get canvas element from shadow roots
     */
    protected titleElement: Header;
    /**
     * Required properties, needed for chart to work correctly.
     * @returns config
     */
    protected get requiredConfig(): ChartConfig;
    /**
     * Safely returns the chart title
     * @returns chart title
     */
    protected get chartTitle(): string;
    /**
     * Safely returns a dataset array
     * @returns dataset array
     */
    protected get datasets(): Chart.ChartDataSets[];
    /**
     * List of available chart colors
     * @type {string[]}
     * @returns {string[]} List of available chart colors
     */
    get colors(): string[];
    /**
     * Invoked whenever the element is updated
     * @param {PropertyValues} changedProperties Map of changed properties with old values
     * @returns {void}
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Element connected
     * @returns {void}
     */
    connectedCallback(): void;
    /**
     * Element disconnected
     * @returns {void}
     */
    disconnectedCallback(): void;
    /**
     * Themable parts of the config.
     * This will be merged into the configuration object.
     * @returns {ChartConfig} chart config with theme
     */
    protected get themableConfig(): ChartConfig;
    /**
     * Handles a change of configuration object.
     * This does not fire when a property of the config object changes,
     * for this use this.updateChart() to apply changes.
     * @returns {void}
     */
    protected onConfigChange(): void;
    /**
     * Get as CSS variable and tries to convert it into a usable number
     * @returns {(number|undefined)} The value as a number, or, undefined if NaN.
     */
    protected cssVarAsNumber(...args: string[]): number | undefined;
    /**
     * Generates the legend labels on a given chart
     * @param {ChartJS} chart Chart.js instance
     * @returns {Chart.ChartLegendLabelItem[]} Array of label configurations
     */
    protected generateLegendLabels: (chart: ChartJS) => Chart.ChartLegendLabelItem[];
    /**
     * Merges all the different layers of the config.
     * @returns {void}
     */
    protected mergeConfigs(): void;
    /**
     * Themes the passed-in configuration object
     * @returns {void}
     */
    protected decorateConfig(): void;
    /**
     * Returns usable information about a dataset
     * @param {Chart.ChartDataSets} dataset Chart dataset
     * @returns {Chart.ChartDataSets} Information about the dataset
     */
    protected datasetInfo(dataset: Chart.ChartDataSets): Chart.ChartDataSets;
    /**
     * Generates internal solid and opaque color set for a dataset
     * @param {boolean} isArray Flag to return result in array or not e.g. doughnut, pie, etc
     * @param {number} amount Amount of colors required
     * @param {number} shift Positional shift of the color start point
     * @returns {DatasetColors} Solid and opaque color values
     */
    protected generateColors(isArray: boolean, amount: number, shift: number): DatasetColors;
    /**
     * Manages the custom title element
     * @returns {void}
     */
    private manageTitle;
    /**
     * Creates a chart after config has changed,
     * or, the element has been connected to the DOM
     * @returns {void}
     */
    protected createChart(): void;
    /**
     * Destroys the chart.js object
     * @returns True if a chart object has been destroyed
     */
    protected destroyChart(): boolean;
    /**
     * Re-renders the chart based on its config
     * @param {ChartUpdateProps} config Additional configuration object for the update process.
     * @returns {void}
     */
    private renderChart;
    /**
     * Update all data, title, scales, legends and re-render the chart based on its config
     * @param {ChartUpdateProps=} config Additional configuration for control an animation in the update process.
     * @returns {void}
     */
    updateChart(config?: ChartUpdateProps): void;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return CSS template
     */
    static get styles(): CSSResult | CSSResult[];
    /**
     * Handles resize event of the chart region
     * @returns {void}
     */
    protected onResize(): void;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    protected render(): TemplateResult;
}
//# sourceMappingURL=index.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-chart': Chart;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-chart': Partial<Chart> | JSXInterface.HTMLAttributes<Chart>;
    }
  }
}

export {};
