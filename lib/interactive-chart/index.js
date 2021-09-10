var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var InteractiveChart_1;
import { ResponsiveElement, html, css, customElement, property, query, DeprecationNotice } from '@refinitiv-ui/core';
import { color as parseColor } from '@refinitiv-ui/utils';
import { createChart as chart } from 'lightweight-charts';
import { VERSION } from '../';
import '../tooltip';
import { LegendStyle } from './helpers/types';
import { merge } from './helpers/merge';
export { LegendStyle };
const NOT_AVAILABLE_DATA = 'N/A';
const NO_DATA_POINT = '--';
/**
 * A charting component that allows you to create several use cases of financial chart.
 * By lightweight-charts library.
 * @slot legend - Slot to use for implementing custom legend.
 * @fires initialized - Dispatched when chart is initialized
 */
let InteractiveChart = InteractiveChart_1 = class InteractiveChart extends ResponsiveElement {
    constructor() {
        super(...arguments);
        /**
         * Chart configurations for init chart
         * @type {InteractiveChartConfig}
        */
        this.config = null;
        /**
         * Hide legend
         */
        this.disabledLegend = false;
        /**
         * Hide jump to latest data button
         */
        this.disabledJumpButton = false;
        /**
         * Deprecation noticed, used to display a warning message
         * when deprecated features are used.
        */
        this.deprecationNotice = new DeprecationNotice('`legendstyle` attribute and property are deprecated. Use `legend-style` for attribute and `legendStyle` property instead.');
        /** Array of series instances in chart */
        this.seriesList = [];
        this.jumpButtonInitialized = false;
        this.legendInitialized = false;
        this.isCrosshairVisible = false;
        this.chart = null;
        this.rowLegend = null;
        this.timeScale = null;
        this.width = 0;
        this.height = 0;
        this.theme = null;
        this.themeColors = [];
        this.hasDataPoint = false;
        /**
         * Set opacity of color
         * @param color color value
         * @param opacity opacity value
         * @returns color parse
         */
        this.setOpacity = (color, opacity) => {
            const colorParse = parseColor(color);
            if (colorParse && opacity !== null) {
                colorParse.opacity = Number(opacity);
            }
            return colorParse;
        };
        /**
         * Handle MouseEventHandler
         * on event subscribeCrosshairMove
         * for create row legend
         * @param param MouseEventParams
         * @returns {void} return undefined has out of boundary chart
         */
        /* istanbul ignore next */
        this.handleCrosshairMoved = (param) => {
            if (!param) {
                return;
            }
            this.createRowLegend(this.rowLegend, param);
        };
        /**
         *  Handle TimeRangeChangeEventHandler
         *  on event subscribeVisibleTimeRangeChange
         *  for create jump last button
         *  @returns {void}
         */
        this.handleTimeRangeChange = () => {
            let buttonVisible = false;
            if (this.timeScale) {
                buttonVisible = this.timeScale.scrollPosition() < 0;
            }
            this.jumpButtonContainer.style.display = buttonVisible ? 'block' : 'none';
            // when update data in series then should always show last value
            if (this.internalConfig.series.length === this.seriesList.length) {
                // update legend only when chart already created
                this.updateLegendWithLatestData();
            }
        };
        /**
         *  Handle event clicked scroll to realtime
         *  @returns {void}
         */
        this.handleScrollToRealTime = () => {
            if (this.timeScale !== null) {
                this.timeScale.scrollToRealTime();
            }
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
     * Set legend style i.e. `horizontal`, `vertical`.
     * Default is `vertical`.
     * @param {LegendStyle} value legend style value
     * @type {"vertical" | "horizontal"} type of legend style
     **/
    set legendStyle(value) {
        const oldValue = this.legendStyle;
        if (oldValue !== value) {
            this._legendStyle = value;
            void this.requestUpdate('legend-style', oldValue);
        }
    }
    get legendStyle() {
        return this._legendStyle || this.deprecatedLegendStyle || LegendStyle.vertical;
    }
    /**
     * @returns return config of property component
     */
    get internalConfig() {
        // Check config is available
        return this.config === null ? { series: [] } : this.config;
    }
    /**
     * On Updated Lifecycle
     * @param changedProperties changed properties
     * @returns {void}
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('config')) {
            if (this.width && this.height && this.config) {
                this.createChart(this.width, this.height, this.config);
            }
        }
        if (changedProperties.has('disabledLegend')) {
            this.onLegendChange(this.disabledLegend);
        }
        if (changedProperties.has('disabledJumpButton')) {
            this.onJumpButtonChange(this.disabledJumpButton);
        }
        if (changedProperties.has('deprecatedLegendStyle') || changedProperties.has('legend-style')) {
            if (changedProperties.has('deprecatedLegendStyle')) {
                this.deprecationNotice.show();
            }
            const oldLegendStyle = (changedProperties.get('legend-style') || changedProperties.get('deprecatedLegendStyle'));
            this.onLegendStyleChange(this.legendStyle, oldLegendStyle);
        }
    }
    /**
     * Change chart size or re-create chart
     * when window size changed
     * @ignore
     * @param size new size
     * @returns {void}
     */
    resizedCallback(size) {
        super.resizedCallback(size);
        this.width = size.width;
        this.height = size.height;
        if (this.chart) {
            this.applyChartOptionSize(this.width, this.height);
        }
        else {
            this.createChart(this.width, this.height, this.config);
        }
    }
    /**
    * Legend value observer
    * @param value Legend value
    * @returns {void}
    */
    onLegendChange(value) {
        if (!value) {
            this.createLegend();
        }
        else {
            this.removeLegend();
        }
    }
    /**
     * Legend style observer
     * @param value Legend style value
     * @param previousValue Previous legend style value
     * @returns {void}
     */
    onLegendStyleChange(value, previousValue) {
        if (value === 'horizontal') {
            if (previousValue) {
                this.legendContainer.classList.remove(previousValue);
            }
            this.legendContainer.classList.add(value);
        }
        else {
            this.legendContainer.classList.remove(previousValue);
        }
    }
    /**
    * Jump last value observer
    * @param value jump last value
    * @returns {void}
    */
    onJumpButtonChange(value) {
        if (!value) {
            this.createJumpButton(this.width, this.height);
        }
        else {
            this.removeJumpButton();
        }
    }
    /**
     * update width and height of chart
     * @param width width of element
     * @param height height of element
     * @returns {void}
     */
    applyChartOptionSize(width, height) {
        if (this.chart) {
            // Resize chart after rendered.
            this.chart.applyOptions({
                width: width,
                height: height
            });
            // Render jump last button
            if (!this.disabledJumpButton) {
                this.createJumpButton(width, height);
            }
        }
    }
    /**
     * Create chart from user config
     * @param width Width component size
     * @param height Height component size
     * @param config data config
     * @returns {void}
     */
    createChart(width, height, config) {
        this.destroyChart();
        if (config && width && height) {
            // init css variables
            this.themeColors = this.colors();
            this.theme = {
                backgroundColor: this.getComputedVariable('--background-color'),
                textColor: this.getComputedVariable('--text-color'),
                scalePriceBorderColor: this.getComputedVariable('--scale-price-border-color'),
                scaleTimesBorderColor: this.getComputedVariable('--scale-times-border-color'),
                gridVertLineColor: this.getComputedVariable('--grid-vert-line-color'),
                gridHorzLineColor: this.getComputedVariable('--grid-horz-line-color'),
                crossHairColor: this.getComputedVariable('--cross-hair-color'),
                chartUpColor: this.getComputedVariable('--chart-up-color'),
                chartDownColor: this.getComputedVariable('--chart-down-color'),
                fillOpacity: this.cssVarAsNumber('--fill-opacity', InteractiveChart_1.DEFAULT_FILL_OPACITY),
                lineWidth: this.cssVarAsNumber('--line-width', InteractiveChart_1.DEFAULT_LINE_WIDTH)
            };
            this.chart = chart(this.chartContainer);
            this.mergeConfig(config);
            this.applyChartOptionSize(width, height);
            if (!this.disabledLegend) {
                this.createLegend();
            }
            if (this.legendStyle === 'horizontal') {
                this.legendContainer.classList.add(this.legendStyle);
            }
            this.chart.timeScale().fitContent();
            /*
             * Fired when chart initialized
             */
            this.dispatchEvent(new CustomEvent('initialized'));
        }
    }
    /**
     * Destroy chart
     * @returns {void}
     */
    destroyChart() {
        if (this.chart) {
            this.removeLegend();
            this.removeJumpButton();
            this.destroySeries();
            this.chartContainer.textContent = '';
        }
    }
    /**
     * Remove jump button
     * @returns {void}
     */
    removeJumpButton() {
        if (this.chart) {
            this.jumpButtonContainer.style.display = 'none';
            this.chart.timeScale().unsubscribeVisibleTimeRangeChange(this.handleTimeRangeChange);
            this.jumpButtonContainer.removeEventListener('tap', this.handleScrollToRealTime);
            this.jumpButtonInitialized = false;
        }
    }
    /**
     * Remove legend element
     * @returns {void}
     */
    removeLegend() {
        if (this.chart) {
            this.legendContainer.textContent = '';
            this.chart.unsubscribeCrosshairMove(this.handleCrosshairMoved);
            this.legendInitialized = false;
        }
    }
    /**
     * Customize config and create chart by theme
     * @param config data configuration for create chart
     * @returns {void}
     */
    mergeConfig(config) {
        if (config && config.hasOwnProperty('series')) {
            this.createSeriesOptions();
            this.createSeries();
        }
        this.applyTheme(config);
        this.applyLegendTextColor();
        this.applyStylesBranding();
        this.applyStyleLegend();
    }
    /**
     * Create series
     * @returns {void}
     */
    createSeries() {
        // Loop for add multiple series
        for (let index = 0; index < this.internalConfig.series.length; index++) {
            const config = this.internalConfig.series[index];
            const series = this.addSeriesConfig(config);
            this.seriesList.push(series);
        }
    }
    /**
     * Destroy Series
     * @returns {void}
     */
    destroySeries() {
        if (this.chart && this.seriesList && this.seriesList.length > 0) {
            for (let i = 0; i < this.seriesList.length; i++) {
                this.chart.removeSeries(this.seriesList[i]);
            }
            this.seriesList = [];
        }
    }
    /**
     * Add series to chart from config
     * @param config data configuration for add series
     * @returns series data
     */
    addSeriesConfig(config) {
        let series = null;
        if (this.chart) {
            const { type, data, seriesOptions } = config;
            // Create instance series
            if (type === 'line') {
                series = this.chart.addLineSeries(seriesOptions);
            }
            else if (type === 'area') {
                series = this.chart.addAreaSeries(seriesOptions);
            }
            else if (type === 'bar') {
                series = this.chart.addBarSeries(seriesOptions);
            }
            else if (type === 'candlestick') {
                series = this.chart.addCandlestickSeries(seriesOptions);
            }
            else if (type === 'volume') {
                series = this.chart.addHistogramSeries(seriesOptions);
            }
            if (data && series) {
                series.setData(data);
            }
        }
        return series;
    }
    /**
     * Convert color to string
     * @param fn function for parse color
     * @param param value color
     * @returns color parse
     */
    convertColorToString(fn, param, ...args) {
        let color = null;
        if (param) {
            color = fn(param, ...args);
            if (color) {
                color = color.toString();
            }
        }
        else {
            color = {};
        }
        return color || {};
    }
    /**
    * Create data configuration from theme
    * @returns {void}
    */
    createSeriesOptions() {
        if (this.theme) {
            let colorIndex = 0;
            for (let index = 0; index < this.internalConfig.series.length; index++) {
                // Get seriesOptions and type
                const seriesOptions = this.internalConfig.series[index].seriesOptions || {};
                const type = this.internalConfig.series[index].type;
                let seriesThemeOptions = {};
                const colorCycle = this.convertColorToString(parseColor, this.themeColors[colorIndex]);
                if (type === 'line') {
                    seriesThemeOptions = {
                        lineWidth: this.theme.lineWidth,
                        color: colorCycle
                    };
                    // Update color index
                    if (!seriesOptions.color) {
                        colorIndex++;
                    }
                }
                else if (type === 'area') {
                    seriesThemeOptions = {
                        lineWidth: this.theme.lineWidth,
                        lineColor: this.convertColorToString(parseColor, this.themeColors[colorIndex]),
                        topColor: this.convertColorToString(this.setOpacity, this.themeColors[colorIndex], this.theme.fillOpacity),
                        bottomColor: this.convertColorToString(this.setOpacity, this.themeColors[colorIndex], '0')
                    };
                    // Update color index
                    if (!seriesOptions.lineColor || !seriesOptions.topColor || !seriesOptions.bottomColor) {
                        colorIndex++;
                    }
                }
                else if (type === 'bar') {
                    seriesThemeOptions = {
                        upColor: colorCycle,
                        downColor: colorCycle
                    };
                    // Update color index
                    if (!seriesOptions.upColor || !seriesOptions.downColor) {
                        colorIndex++;
                    }
                }
                else if (type === 'candlestick') {
                    seriesThemeOptions = {
                        upColor: this.theme.chartUpColor,
                        downColor: this.theme.chartDownColor,
                        borderUpColor: this.theme.chartUpColor,
                        borderDownColor: this.theme.chartDownColor,
                        wickUpColor: this.theme.chartUpColor,
                        wickDownColor: this.theme.chartDownColor
                    };
                    // Update color index
                    if (!seriesOptions.upColor
                        || !seriesOptions.downColor
                        || !seriesOptions.borderUpColor
                        || !seriesOptions.borderDownColor
                        || !seriesOptions.wickUpColor
                        || !seriesOptions.wickDownColor) {
                        colorIndex++;
                    }
                }
                else if (type === 'volume') {
                    seriesThemeOptions = {
                        color: colorCycle
                    };
                    // Update color index
                    if (!seriesOptions.color) {
                        colorIndex++;
                    }
                }
                // Update config seriesOptions not have seriesOptions
                if (!this.internalConfig.series[index].seriesOptions) {
                    this.internalConfig.series[index].seriesOptions = seriesThemeOptions;
                }
                else {
                    merge(seriesOptions, seriesThemeOptions);
                }
            }
        }
    }
    /**
    * Apply Theme to chart
    * @param config value config
    * @returns {void}
    */
    applyTheme(config) {
        if (this.chart && this.theme) {
            const style = getComputedStyle(this);
            const defaultFontFamily = style.getPropertyValue('font-family');
            // Create object has a property object before comparing config the theme
            const chartOptions = config.options || {};
            // Create object same as the theme
            const chartThemeOptions = {
                layout: {
                    backgroundColor: this.theme.backgroundColor,
                    textColor: this.theme.textColor,
                    fontFamily: defaultFontFamily
                },
                priceScale: {
                    borderColor: this.theme.scalePriceBorderColor
                },
                timeScale: {
                    borderColor: this.theme.scaleTimesBorderColor,
                    rightOffset: 1
                },
                grid: {
                    vertLines: {
                        color: this.theme.gridVertLineColor,
                        style: InteractiveChart_1.LINE_STYLES.SOLID
                    },
                    horzLines: {
                        color: this.theme.gridHorzLineColor,
                        style: InteractiveChart_1.LINE_STYLES.SOLID
                    }
                },
                crosshair: {
                    vertLine: {
                        color: this.theme.crossHairColor
                    },
                    horzLine: {
                        color: this.theme.crossHairColor
                    }
                }
            };
            merge(chartOptions, chartThemeOptions);
            if (!config.options) {
                this.chart.applyOptions(chartThemeOptions);
            }
            else {
                // Apply config when has option for custom
                this.applyLegendTextColor();
                this.chart.applyOptions(config.options);
            }
        }
    }
    /**
     * Apply text color legend from chart options
     * @returns {void}
     */
    applyLegendTextColor() {
        if (this.chart) {
            const options = this.chart.options();
            if (options && options.hasOwnProperty('layout') && options.layout.hasOwnProperty('textColor')) {
                this.legendContainer.style.color = options.layout.textColor;
            }
        }
    }
    /**
     * Get position config for set position legend
     * @returns {void}
     */
    applyStyleLegend() {
        if (this.chart) {
            // Get position config for set position legend
            const position = this.getPriceScalePosition();
            if (position === 'left' || position === 'two-price') {
                this.legendContainer.className = 'yaxis-left';
            }
            else {
                this.legendContainer.className = 'yaxis-right';
            }
        }
    }
    /**
     * Get position config for set position logo trading view on chart
     * @returns {void}
     */
    applyStylesBranding() {
        if (this.chart) {
            const position = this.getPriceScalePosition();
            this.brandingContainer.className = position === 'two-price' ? 'right' : position;
        }
    }
    /**
     * Get price scale position
     * @return position
     */
    getPriceScalePosition() {
        var _a;
        const priceScale = (_a = this.chart) === null || _a === void 0 ? void 0 : _a.options();
        if (priceScale.leftPriceScale.visible && priceScale.rightPriceScale.visible) {
            return 'two-price';
        }
        else if (priceScale.leftPriceScale.visible) {
            return 'left';
        }
        else if (priceScale.rightPriceScale.visible) {
            return 'right';
        }
        else {
            return 'none';
        }
    }
    /**
     * Create legend element
     * @returns {void}
     */
    createLegend() {
        if (this.chart && !this.legendInitialized && this.internalConfig.hasOwnProperty('series')) {
            this.createRowLegend();
            if (this.shadowRoot) {
                this.rowLegend = this.shadowRoot.querySelectorAll('.row');
            }
            this.chart.subscribeCrosshairMove(this.handleCrosshairMoved);
            this.legendInitialized = true;
        }
    }
    /**
     * Create legend element or update value in legend element
     * @param rowLegend Legend element
     * @param eventMove Event mouse move on chart
     * @return {void}
     */
    createRowLegend(rowLegend, eventMove) {
        let rowLegendElem;
        for (let idx = 0; idx < this.internalConfig.series.length; idx++) {
            const chartType = this.internalConfig.series[idx].type;
            const dataSet = this.internalConfig.series[idx].data || [];
            const symbol = (this.internalConfig.series[idx].symbolName || this.internalConfig.series[idx].symbol) || '';
            // Create row legend element
            if (!rowLegend) {
                rowLegendElem = document.createElement('div');
                rowLegendElem.setAttribute('class', 'row');
                this.createTextSymbol(rowLegendElem, symbol);
                if (dataSet.length) {
                    this.hasDataPoint = true;
                    const lastData = dataSet[dataSet.length - 1];
                    const priceColor = this.getColorInSeries(lastData, chartType, idx);
                    const lastDataValue = chartType === 'bar' || chartType === 'candlestick' ? lastData : lastData.value;
                    this.renderTextLegend(chartType, rowLegendElem, lastDataValue, priceColor, idx);
                }
                else {
                    const span = document.createElement('span');
                    span.className = 'price';
                    span.textContent = NOT_AVAILABLE_DATA;
                    rowLegendElem.appendChild(span);
                }
                this.legendContainer.appendChild(rowLegendElem);
            }
            /* Update value legend element on subscribeCrosshairMove.
             * Don't need to be updated if chart has no data.
             */
            /* istanbul ignore next */
            else if (rowLegend && dataSet.length) {
                let value;
                let priceColor = '';
                // When have price on event moved on the crosshair
                if ((eventMove === null || eventMove === void 0 ? void 0 : eventMove.seriesPrices.get(this.seriesList[idx])) && eventMove.time) {
                    value = eventMove.seriesPrices.get(this.seriesList[idx]);
                    priceColor = this.getColorInSeries(eventMove, chartType, idx);
                    this.isCrosshairVisible = true;
                    this.hasDataPoint = true;
                }
                // when there's no data point in the series object.
                else if (!(eventMove === null || eventMove === void 0 ? void 0 : eventMove.seriesPrices.get(this.seriesList[idx])) && (eventMove === null || eventMove === void 0 ? void 0 : eventMove.time)) {
                    value = NO_DATA_POINT;
                    this.isCrosshairVisible = true;
                    this.hasDataPoint = false;
                }
                // Get latest value when mouse move out of scope
                else {
                    const latestData = dataSet[dataSet.length - 1];
                    if (latestData) {
                        priceColor = this.getColorInSeries(latestData, chartType, idx);
                        value = chartType === 'bar' || chartType === 'candlestick' ? latestData : latestData.value;
                        this.isCrosshairVisible = false;
                        this.hasDataPoint = true;
                    }
                }
                // Render legend by series type
                this.renderTextLegend(chartType, rowLegend, value, priceColor, idx);
            }
        }
    }
    /**
     * Render text legend in row legend
     * @param chartType chart type of series
     * @param rowLegendElem row legend div element
     * @param value value of series
     * @param priceColor price color of series
     * @param index index of series
     * @returns {void}
     */
    renderTextLegend(chartType, rowLegendElem, value, priceColor, index) {
        if (chartType === 'bar' || chartType === 'candlestick') {
            if (!this.hasDataPoint && this.isNodeListElement(rowLegendElem)) {
                const spanElem = rowLegendElem[index].querySelectorAll('span.price,span.ohlc');
                spanElem.forEach(span => rowLegendElem[index].removeChild(span));
                const span = document.createElement('span');
                span.className = 'price';
                span.textContent = value;
                rowLegendElem[index].appendChild(span);
            }
            else {
                this.createTextOHLC(rowLegendElem, value, priceColor, index);
            }
        }
        else {
            this.createTextPrice(rowLegendElem, value, priceColor, index);
        }
    }
    /**
    * Check `node` inside row legend and case type to HTMLElement
    * @param rowLegend Legend element
    * @returns true if not have `node` inside row legend
    */
    isHTMLElement(rowLegend) {
        return rowLegend.length === undefined;
    }
    /**
    * Check `node` inside row legend and case type to NodeListOf<Element>
    * @param rowLegend Legend element
    * @returns true if have `node` inside row legend
    */
    isNodeListElement(rowLegend) {
        return rowLegend !== undefined;
    }
    /**
     * Create span OHLC in row legend used by several series types such as bars or candlesticks
     * @param rowLegend Legend element
     * @param rowData Value of series
     * @param priceColor Color of series
     * @returns {void}
     */
    createSpanOHLC(rowLegend, rowData, priceColor) {
        if (this.isHTMLElement(rowLegend)) {
            rowLegend.setAttribute('data-color', priceColor);
            this.createSpan(rowLegend, 'O', rowData.open, 'H', rowData.high, 'L', rowData.low, 'C', rowData.close);
        }
    }
    /**
    * Create text used by several series types such as bars or candlesticks
    * @param rowLegend Legend element
    * @param rowData Value of series
    * @param priceColor color of series
    * @param index Series index
    * @returns {void}
    */
    createTextOHLC(rowLegend, rowData, priceColor, index) {
        // Uses price formatter if provided
        const formatter = this.internalConfig.series[index].hasOwnProperty('legendPriceFormatter') ? this.internalConfig.series[index].legendPriceFormatter : null;
        if (formatter) {
            rowData = {
                open: formatter(rowData.open),
                high: formatter(rowData.high),
                low: formatter(rowData.low),
                close: formatter(rowData.close)
            };
        }
        // Create text price after chart has rendered
        if (this.isHTMLElement(rowLegend)) {
            this.createSpanOHLC(rowLegend, rowData, priceColor);
        }
        // Handle update text price when mouse crosshairMove in chart
        else if (this.isNodeListElement(rowLegend)) {
            const rowSpanLength = rowLegend[index].children.length;
            let countElmPrice = 0;
            for (let spanIndex = 0; spanIndex < rowSpanLength; spanIndex++) {
                const spanElem = rowLegend[index].children[spanIndex];
                /**
                 * Create a new span OHLC after displaying (--) or (N/A)
                 */
                if (spanElem.textContent === NOT_AVAILABLE_DATA || spanElem.textContent === NO_DATA_POINT) {
                    rowLegend[index].removeChild(spanElem);
                    this.createSpanOHLC(rowLegend[index], rowData, priceColor);
                }
                else if (spanElem.getAttribute('class') === 'price') {
                    // Set price color
                    spanElem.style.color = priceColor;
                    // Set value OHLC BY price
                    if (countElmPrice === 0) {
                        spanElem.textContent = `${rowData.open}`;
                    }
                    else if (countElmPrice === 1) {
                        spanElem.textContent = `${rowData.high}`;
                    }
                    else if (countElmPrice === 2) {
                        spanElem.textContent = `${rowData.low}`;
                    }
                    else if (countElmPrice === 3) {
                        spanElem.textContent = `${rowData.close}`;
                    }
                    // Update next span by price
                    countElmPrice++;
                }
            }
        }
    }
    /**
     * Create text price used by several series types
     * @param rowLegend Legend element
     * @param price Value of series
     * @param priceColor color of series
     * @param index Series index
     * @returns {void}
     */
    createTextPrice(rowLegend, price, priceColor, index) {
        var _a;
        const formatter = this.internalConfig.series[index].legendPriceFormatter;
        // Formats legend only when formatter and data point are provided
        const formattedPrice = !!formatter && price !== NO_DATA_POINT ? formatter(price) : price;
        // Create text price after chart has rendered
        if (this.isHTMLElement(rowLegend)) {
            rowLegend.setAttribute('data-color', priceColor);
            this.createSpan(rowLegend, formattedPrice);
        }
        // Handle update text price when mouse crosshairMove in chart
        else if (this.isNodeListElement(rowLegend)) {
            const symbolElem = rowLegend[index].children[0];
            const spanIndex = ((_a = symbolElem.getAttribute('class')) === null || _a === void 0 ? void 0 : _a.indexOf('symbol')) === 0 ? 1 : 0;
            const rowLegendElem = rowLegend[index];
            rowLegendElem.children[spanIndex].textContent = `${formattedPrice}`;
            rowLegendElem.children[spanIndex].style.color = `${priceColor}`;
        }
    }
    /**
     * Create span in legend element by several series types
     * @param rowLegend Legend element
     * @param args text value
     * @returns {void}
     */
    createSpan(rowLegend, ...args) {
        const div = rowLegend; // rowLegend
        const arg = args;
        const len = args.length;
        const color = div.getAttribute('data-color');
        for (let idx = 0; idx < len; idx++) {
            const span = document.createElement('span');
            const textContent = `${arg[idx]}`;
            span.textContent = textContent;
            // Set class by Text O H L C
            if (['O', 'H', 'L', 'C'].includes(textContent)) {
                span.setAttribute('class', 'ohlc');
            }
            else {
                span.setAttribute('class', 'price');
                span.style.color = color;
            }
            div.appendChild(span);
        }
    }
    /**
     * Create span in legend element by several series types
     * @param rowLegend Legend element
     * @param symbol Value naming for show
     * @returns {void}
     */
    createTextSymbol(rowLegend, symbol) {
        if (rowLegend.children && symbol) {
            const symbolElem = document.createElement('span');
            symbolElem.setAttribute('class', 'symbol');
            symbolElem.textContent = symbol + ' : ';
            rowLegend.appendChild(symbolElem);
        }
    }
    /**
     * Get legend price color
     * @param color color code
     * @returns rgba or hex color
     */
    getLegendPriceColor(color) {
        // check color is does not blend with the background
        if (color === 'rgba(0,0,0,0)' || color === 'transparent') {
            return this.getComputedVariable('--text-color');
        }
        return color;
    }
    /**
     * Get Color in series
     * @param seriesData series data or event mouse move on chart
     * @param chartType type of chart
     * @param index index of list series
     * @returns color value
     */
    getColorInSeries(seriesData, chartType, index) {
        var _a;
        if (chartType === 'line') {
            return this.getLegendPriceColor(this.seriesList[index].options().color);
        }
        else if (chartType === 'candlestick') {
            const value = seriesData.hasOwnProperty('seriesPrices') ? (_a = seriesData) === null || _a === void 0 ? void 0 : _a.seriesPrices.get(this.seriesList[index]) : seriesData;
            const barStyle = this.seriesList[index].options();
            const colorBar = value.close > value.open ? barStyle.borderUpColor : barStyle.borderDownColor;
            return colorBar;
        }
        else if (chartType === 'bar') {
            return this.getLegendPriceColor(this.seriesList[index].options().upColor);
        }
        else if (chartType === 'area') {
            return this.getLegendPriceColor(this.seriesList[index].options().lineColor);
        }
        else if (chartType === 'volume') {
            const priceValue = seriesData.hasOwnProperty('seriesPrices') ? seriesData.seriesPrices.get(this.seriesList[index]) : seriesData.value;
            let dataItem = {};
            this.internalConfig.series[index].data.forEach((dataConfig) => {
                const data = dataConfig;
                const time = data.time;
                const timeSeriesData = seriesData.time;
                //  if via time point data string format 'yyyy-mm-dd' or object '{ year: 2019, month: 6, day: 1 }'
                if (time.hasOwnProperty('day') && time.hasOwnProperty('month') && time.hasOwnProperty('year')) {
                    if (time.day === timeSeriesData.day
                        && time.month === timeSeriesData.month
                        && time.year === timeSeriesData.year
                        && data.value === priceValue) {
                        dataItem = dataConfig;
                    }
                }
                // if via config time uses a UNIX Timestamp format for time point data.
                else if (time === seriesData.time) {
                    dataItem = data;
                }
            });
            // check when each color is added, the item comes from the configuration
            if (dataItem.hasOwnProperty('color')) {
                const data = dataItem;
                return this.getLegendPriceColor(data.color);
            }
            else {
                return this.getLegendPriceColor(this.seriesList[index].options().color);
            }
        }
        return '';
    }
    /**
     * Create button that will make window scroll to the last data
     * in the chart when clicked
     * @param width Width component size
     * @param height Hight component size
     * @returns {void}
     */
    createJumpButton(width, height) {
        if (this.chart && this.jumpButtonContainer) {
            this.timeScale = this.chart.timeScale();
            // Get position config for set position jump last button
            const position = this.getPriceScalePosition();
            const pricePosition = position === 'left' ? 30 : 0;
            const buttonTop = `${height - 70}px`;
            const buttonLeft = `${(width + pricePosition) - 100}px`;
            this.jumpButtonContainer.style.top = buttonTop;
            this.jumpButtonContainer.style.left = buttonLeft;
            // Create subscribeVisibleTimeRangeChange
            if (!this.jumpButtonInitialized) {
                this.chart.timeScale().subscribeVisibleTimeRangeChange(this.handleTimeRangeChange);
                this.jumpButtonContainer.addEventListener('tap', this.handleScrollToRealTime);
                this.jumpButtonInitialized = true;
            }
        }
    }
    /**
     *  Update Legend with latest data on update data in series
     *  @returns {void}
     */
    updateLegendWithLatestData() {
        var _a;
        if (this.rowLegend && !this.isCrosshairVisible && ((_a = this.config) === null || _a === void 0 ? void 0 : _a.hasOwnProperty('series'))) {
            for (let idx = 0; idx < this.internalConfig.series.length; idx++) {
                const chartType = this.internalConfig.series[idx].type;
                const series = this.internalConfig.series[idx];
                const dataSet = series.data || [];
                const latestData = dataSet[dataSet.length - 1];
                if (latestData) {
                    const value = chartType === 'bar' || chartType === 'candlestick' ? latestData : latestData.value; // latestData
                    const priceColor = this.getColorInSeries(latestData, chartType, idx);
                    // Render legend by series type
                    this.renderTextLegend(chartType, this.rowLegend, value, priceColor, idx);
                }
            }
        }
    }
    /**
     * Get as CSS variable and tries to convert it into a usable number
     * @param args param css variable
     * @returns The value as a number, or, undefined if NaN.
     */
    cssVarAsNumber(...args) {
        args[args.length] = '';
        const cssComputeVar = this.getComputedVariable(...args);
        const result = parseFloat(cssComputeVar.replace(/\D+$/, ''));
        return cssComputeVar && !isNaN(result) ? result : undefined;
    }
    /**
     * List of available chart colors from the theme.
     * @returns list of available chart colors from the theme.
     */
    colors() {
        let color;
        let index = 0;
        const colors = [];
        while ((color = this.getComputedVariable(`${InteractiveChart_1.CSS_COLOR_PREFIX}${(index += 1)}`))) {
            const parseColorCode = parseColor(color);
            if (parseColorCode !== null) {
                colors.push(parseColorCode.toString());
            }
        }
        return colors;
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
        position: relative;
        height: 300px;
        z-index: 0;
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
      <slot name="legend">
        <div part="legend"></div>
      </slot>
      <div part="jump-button-container">
        <div part="jump-button"></div>
      </div>
      <div part="branding-container" title="" tooltip="Powered by Trading View">
        <svg width="33" height="19" viewBox="0 0 611 314"  part="branding">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M341 124C375.242 124 403 96.2417 403 62C403 27.7583 375.242 0 341 0C306.758 0 279 27.7583 279 62C279 96.2417 306.758 124 341 124ZM481 314H337L467 4H611L481 314ZM124 4H248V128V314H124V128H0V4H124Z"/>
        </svg>
      </div>
      <div part="chart"></div>
    `;
    }
};
InteractiveChart.CSS_COLOR_PREFIX = '--chart-color-';
InteractiveChart.DEFAULT_LINE_WIDTH = '2';
InteractiveChart.DEFAULT_FILL_OPACITY = '0.4';
InteractiveChart.LINE_STYLES = {
    SOLID: 0,
    DOTTED: 1,
    DASHED: 2,
    LARGE_DASHED: 3,
    SPARSE_DOTTED: 4
};
__decorate([
    property({ type: Object })
], InteractiveChart.prototype, "config", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'disabled-legend' })
], InteractiveChart.prototype, "disabledLegend", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'disabled-jump-button' })
], InteractiveChart.prototype, "disabledJumpButton", void 0);
__decorate([
    property({ type: String, attribute: 'legendstyle' })
], InteractiveChart.prototype, "deprecatedLegendStyle", void 0);
__decorate([
    property({ type: String, attribute: 'legend-style' })
], InteractiveChart.prototype, "legendStyle", null);
__decorate([
    query('[part=chart]', true)
], InteractiveChart.prototype, "chartContainer", void 0);
__decorate([
    query('[part=legend]', true)
], InteractiveChart.prototype, "legendContainer", void 0);
__decorate([
    query('[part=jump-button-container]', true)
], InteractiveChart.prototype, "jumpButtonContainer", void 0);
__decorate([
    query('[part=branding-container]', true)
], InteractiveChart.prototype, "brandingContainer", void 0);
InteractiveChart = InteractiveChart_1 = __decorate([
    customElement('ef-interactive-chart', {
        alias: 'sapphire-interactive-chart'
    })
], InteractiveChart);
export { InteractiveChart };
//# sourceMappingURL=index.js.map