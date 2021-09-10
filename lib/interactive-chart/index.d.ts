import { JSXInterface } from '../jsx';
import { ResponsiveElement, TemplateResult, CSSResult, PropertyValues, ElementSize } from '@refinitiv-ui/core';
import { IChartApi, MouseEventParams } from 'lightweight-charts';
import '../tooltip';
import type { InteractiveChartConfig, InteractiveChartSeries, RowLegend, SeriesList, SeriesDataItem } from './helpers/types';
import { LegendStyle } from './helpers/types';
export { InteractiveChartConfig, InteractiveChartSeries, LegendStyle };
/**
 * A charting component that allows you to create several use cases of financial chart.
 * By lightweight-charts library.
 * @slot legend - Slot to use for implementing custom legend.
 * @fires initialized - Dispatched when chart is initialized
 */
export declare class InteractiveChart extends ResponsiveElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    private static readonly CSS_COLOR_PREFIX;
    private static readonly DEFAULT_LINE_WIDTH;
    private static readonly DEFAULT_FILL_OPACITY;
    private static readonly LINE_STYLES;
    private _legendStyle?;
    /**
     * Chart configurations for init chart
     * @type {InteractiveChartConfig}
    */
    config: InteractiveChartConfig | null;
    /**
     * Hide legend
     */
    disabledLegend: boolean;
    /**
     * Hide jump to latest data button
     */
    disabledJumpButton: boolean;
    /**
    * @deprecated `legendstyle` attribute is deprecated, use `legend-style` instead.
    * @ignore
    * Set legend style i.e. `horizontal`, `vertical`. Default is `vertical`.
    **/
    deprecatedLegendStyle: LegendStyle | undefined;
    /**
     * Set legend style i.e. `horizontal`, `vertical`.
     * Default is `vertical`.
     * @param {LegendStyle} value legend style value
     * @type {"vertical" | "horizontal"} type of legend style
     **/
    set legendStyle(value: LegendStyle);
    get legendStyle(): LegendStyle;
    /**
     * Deprecation noticed, used to display a warning message
     * when deprecated features are used.
    */
    private deprecationNotice;
    /** Array of series instances in chart */
    seriesList: SeriesList[];
    private jumpButtonInitialized;
    private legendInitialized;
    private isCrosshairVisible;
    protected chart: IChartApi | null;
    protected rowLegend: RowLegend;
    private timeScale;
    private width;
    private height;
    private theme;
    private themeColors;
    private hasDataPoint;
    /**
     * @returns return config of property component
     */
    protected get internalConfig(): InteractiveChartConfig;
    /**
     * chart element use for create chart.
     */
    private chartContainer;
    /**
     * legend element use for manage legend text inside.
     */
    private legendContainer;
    /**
     * jump button element use for manage scroll event.
     */
    private jumpButtonContainer;
    /**
     * branding element use for show trading view license
     * https://github.com/tradingview/lightweight-charts#license
     */
    private brandingContainer;
    /**
     * On Updated Lifecycle
     * @param changedProperties changed properties
     * @returns {void}
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Change chart size or re-create chart
     * when window size changed
     * @ignore
     * @param size new size
     * @returns {void}
     */
    resizedCallback(size: ElementSize): void;
    /**
    * Legend value observer
    * @param value Legend value
    * @returns {void}
    */
    private onLegendChange;
    /**
     * Legend style observer
     * @param value Legend style value
     * @param previousValue Previous legend style value
     * @returns {void}
     */
    private onLegendStyleChange;
    /**
    * Jump last value observer
    * @param value jump last value
    * @returns {void}
    */
    private onJumpButtonChange;
    /**
     * update width and height of chart
     * @param width width of element
     * @param height height of element
     * @returns {void}
     */
    private applyChartOptionSize;
    /**
     * Create chart from user config
     * @param width Width component size
     * @param height Height component size
     * @param config data config
     * @returns {void}
     */
    private createChart;
    /**
     * Destroy chart
     * @returns {void}
     */
    private destroyChart;
    /**
     * Remove jump button
     * @returns {void}
     */
    private removeJumpButton;
    /**
     * Remove legend element
     * @returns {void}
     */
    protected removeLegend(): void;
    /**
     * Customize config and create chart by theme
     * @param config data configuration for create chart
     * @returns {void}
     */
    protected mergeConfig(config: InteractiveChartConfig): void;
    /**
     * Create series
     * @returns {void}
     */
    protected createSeries(): void;
    /**
     * Destroy Series
     * @returns {void}
     */
    private destroySeries;
    /**
     * Add series to chart from config
     * @param config data configuration for add series
     * @returns series data
     */
    protected addSeriesConfig(config: InteractiveChartSeries): SeriesList | null;
    /**
     * Set opacity of color
     * @param color color value
     * @param opacity opacity value
     * @returns color parse
     */
    private setOpacity;
    /**
     * Convert color to string
     * @param fn function for parse color
     * @param param value color
     * @returns color parse
     */
    private convertColorToString;
    /**
    * Create data configuration from theme
    * @returns {void}
    */
    private createSeriesOptions;
    /**
    * Apply Theme to chart
    * @param config value config
    * @returns {void}
    */
    private applyTheme;
    /**
     * Apply text color legend from chart options
     * @returns {void}
     */
    private applyLegendTextColor;
    /**
     * Get position config for set position legend
     * @returns {void}
     */
    private applyStyleLegend;
    /**
     * Get position config for set position logo trading view on chart
     * @returns {void}
     */
    private applyStylesBranding;
    /**
     * Get price scale position
     * @return position
     */
    private getPriceScalePosition;
    /**
     * Handle MouseEventHandler
     * on event subscribeCrosshairMove
     * for create row legend
     * @param param MouseEventParams
     * @returns {void} return undefined has out of boundary chart
     */
    private handleCrosshairMoved;
    /**
     * Create legend element
     * @returns {void}
     */
    protected createLegend(): void;
    /**
     * Create legend element or update value in legend element
     * @param rowLegend Legend element
     * @param eventMove Event mouse move on chart
     * @return {void}
     */
    private createRowLegend;
    /**
     * Render text legend in row legend
     * @param chartType chart type of series
     * @param rowLegendElem row legend div element
     * @param value value of series
     * @param priceColor price color of series
     * @param index index of series
     * @returns {void}
     */
    protected renderTextLegend(chartType: string, rowLegendElem: RowLegend, value: SeriesDataItem | number | string, priceColor: string, index: number): void;
    /**
    * Check `node` inside row legend and case type to HTMLElement
    * @param rowLegend Legend element
    * @returns true if not have `node` inside row legend
    */
    private isHTMLElement;
    /**
    * Check `node` inside row legend and case type to NodeListOf<Element>
    * @param rowLegend Legend element
    * @returns true if have `node` inside row legend
    */
    private isNodeListElement;
    /**
     * Create span OHLC in row legend used by several series types such as bars or candlesticks
     * @param rowLegend Legend element
     * @param rowData Value of series
     * @param priceColor Color of series
     * @returns {void}
     */
    private createSpanOHLC;
    /**
    * Create text used by several series types such as bars or candlesticks
    * @param rowLegend Legend element
    * @param rowData Value of series
    * @param priceColor color of series
    * @param index Series index
    * @returns {void}
    */
    private createTextOHLC;
    /**
     * Create text price used by several series types
     * @param rowLegend Legend element
     * @param price Value of series
     * @param priceColor color of series
     * @param index Series index
     * @returns {void}
     */
    private createTextPrice;
    /**
     * Create span in legend element by several series types
     * @param rowLegend Legend element
     * @param args text value
     * @returns {void}
     */
    private createSpan;
    /**
     * Create span in legend element by several series types
     * @param rowLegend Legend element
     * @param symbol Value naming for show
     * @returns {void}
     */
    private createTextSymbol;
    /**
     * Get legend price color
     * @param color color code
     * @returns rgba or hex color
     */
    private getLegendPriceColor;
    /**
     * Get Color in series
     * @param seriesData series data or event mouse move on chart
     * @param chartType type of chart
     * @param index index of list series
     * @returns color value
     */
    protected getColorInSeries(seriesData: SeriesDataItem | MouseEventParams, chartType: string, index: number): string;
    /**
     * Create button that will make window scroll to the last data
     * in the chart when clicked
     * @param width Width component size
     * @param height Hight component size
     * @returns {void}
     */
    private createJumpButton;
    /**
     *  Handle TimeRangeChangeEventHandler
     *  on event subscribeVisibleTimeRangeChange
     *  for create jump last button
     *  @returns {void}
     */
    private handleTimeRangeChange;
    /**
     *  Update Legend with latest data on update data in series
     *  @returns {void}
     */
    private updateLegendWithLatestData;
    /**
     *  Handle event clicked scroll to realtime
     *  @returns {void}
     */
    private handleScrollToRealTime;
    /**
     * Get as CSS variable and tries to convert it into a usable number
     * @param args param css variable
     * @returns The value as a number, or, undefined if NaN.
     */
    private cssVarAsNumber;
    /**
     * List of available chart colors from the theme.
     * @returns list of available chart colors from the theme.
     */
    colors(): string[];
    /**
    * A `CSSResult` that will be used
    * to style the host, slotted children
    * and the internal template of the element.
    * @return CSS template
    */
    static get styles(): CSSResult | CSSResult[];
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
    'ef-interactive-chart': InteractiveChart;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-interactive-chart': Partial<InteractiveChart> | JSXInterface.HTMLAttributes<InteractiveChart>;
    }
  }
}

export {};
