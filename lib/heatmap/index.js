var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ResponsiveElement, html, css, query, customElement, property } from '@refinitiv-ui/core';
import { color, MicroTaskRunner } from '@refinitiv-ui/utils';
import '../canvas';
import '../tooltip';
import { Track } from './helpers/track';
import { blend, brighten, darken, isLight, interpolate } from './helpers/color';
import { getResponsiveFontSize, getMaximumTextWidth, getMaximumLabelTextWidth, MIN_FONT_SIZE } from './helpers/text';
import { VERSION } from '../';
const MAX_CELL_WIDTH_RATIO = 0.85;
const DEFAULT_CANVAS_RATIO = 0.75; // ratio — 4:3
/**
 * A graphical representation of data where the individual
 * values contained in a matrix are represented as colors
 */
let Heatmap = class Heatmap extends ResponsiveElement {
    constructor() {
        super();
        /**
         * Heatmap configuration options.
         * @type {HeatmapConfig}
         */
        this.config = null;
        /**
         * Number of maximum label width that cell can paint in pixel.
         * e.g. label-width: 30px; cell label hides when text length reaches 30px.
         */
        this.labelWidth = 0;
        /**
         * Hide all labels in the cells
         */
        this.labelHidden = false;
        /**
         * Hide all axes
         */
        this.axisHidden = false;
        /**
         * Minimum point of the cell coloring
         */
        this.minPoint = -1;
        /**
         * Middle point of the cell coloring
         */
        this.midPoint = 0;
        /**
         * Maximum point of the cell coloring
         */
        this.maxPoint = 1;
        /**
         * Enable cell color blending
         */
        this.blend = false;
        /**
         * Cell minimum color saturation, value can be from 0 - 1
         */
        this.saturation = 0.4;
        /**
         * Current active cell
         */
        this._activeCell = null;
        /**
         * Internal cells data storage
         */
        this.cells = [];
        /**
         * Canvas's font color according to theme
         */
        this.foregroundColor = '';
        /**
         * Canvas's background color according to theme
         */
        this.backgroundColor = '';
        /**
         * Row cells track for easier calculations
         */
        this.rowTrack = new Track();
        /**
         * Column cells track for easier calculations
         */
        this.colTrack = new Track();
        /**
         * A flag to check if calculated responsive height it been set.
         */
        this.responsiveHeight = false;
        /**
         * A flag to check if the component has a size.
         */
        this.isSizeCalculated = false;
        /**
         * Use to prevent resizes observer in certain use cases
         */
        this.updateTimer = 0;
        /**
         * Use to throttle heatmap painting
         */
        this.renderTask = new MicroTaskRunner();
        /**
         * A flag to check if the cell has header enable.
         */
        this.hasCellHeader = false;
        /**
         * A flag to check if cell's content is within its boundary
         */
        this.contentWithinCellBoundary = true;
        /**
         * Margin around each cell
         */
        this.cellMargin = 1;
        /**
         * Above point color that is customisable using CSS variable
         */
        this.abovePointColor = '';
        /**
         * Middle point color that is customisable using CSS variable
         */
        this.midPointColor = '';
        /**
         * Below point color that is customisable using CSS variable
         */
        this.belowPointColor = '';
        /** @ignore */
        this.onResize = this.onResize.bind(this);
        /** @ignore */
        this.onMouseMove = this.onMouseMove.bind(this);
        /** @ignore */
        this.stopAnimation = this.stopAnimation.bind(this);
        /** @ignore */
        this.tooltipRenderer = this.tooltipRenderer.bind(this);
        /** @ignore */
        this.tooltipCondition = this.tooltipCondition.bind(this);
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
        display: block;
      }
      #container{
        width: 100%;
        height: 100%;
        display: flex;
      }
      #canvas-container {
        min-width:0;
        display: flex;
        width: 100%;
        flex-direction: column;
        position: relative;
      }
      #tooltip-overlay {
        position: absolute;
      }
      [part=canvas] {
        flex-grow: 1;
      }
      [part=x-axis] {
        display: flex;
        align-items: center;
      }
      [part=y-axis]{
        display: flex;
        flex-direction: column;
      }
      .x-axis-item {
        text-align: center;
        overflow: hidden;
      }
      .y-axis-item {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
    `;
    }
    /**
     * Current active cell for internal use
     * @private
     */
    get activeCell() {
        return this._activeCell;
    }
    /* istanbul ignore next */
    set activeCell(activeCell) {
        const previousActiveCell = this._activeCell;
        this._activeCell = activeCell;
        if (this._activeCell !== previousActiveCell) {
            void this.requestUpdate('activeCell', previousActiveCell);
            this.activeCellChanged(this._activeCell, previousActiveCell);
        }
    }
    /**
     * Gets the computed style of the canvas element
     * @returns computed canvas style
     */
    get canvasStyle() {
        return getComputedStyle(this.canvas);
    }
    /**
     * Gets the 2D context of the canvas element
     * @returns 2D canvas context
     */
    get canvasContext() {
        return this.canvas.context;
    }
    /**
     * Safely gets the row data
     * @returns array of row data
     */
    get rows() {
        var _a;
        return this.config && Array.isArray((_a = this.config) === null || _a === void 0 ? void 0 : _a.data) ? this.config.data : [];
    }
    /**
     * Get row count
     * @returns count of rows
     */
    get rowCount() {
        return this.rows ? this.rows.length : 0;
    }
    /**
     * Get column count
     * @returns count of columns
     */
    get columnCount() {
        var _a;
        let result = 0;
        (_a = this.rows) === null || _a === void 0 ? void 0 : _a.forEach(columns => {
            if (columns.length > result) {
                result = columns.length;
            }
        });
        return result;
    }
    /**
     * Called when the element’s DOM has been updated and rendered
     * @param changedProperties changed properties
     * @returns {void}
     */
    updated(changedProperties) {
        if (changedProperties.has('labelHidden')) {
            this.labelHiddenChanged();
        }
        // Re-paints whole canvas when at least one of the following properties changes
        if (changedProperties.has('config')
            || changedProperties.has('blend')
            || changedProperties.has('minPoint')
            || changedProperties.has('midPoint')
            || changedProperties.has('maxPoint')
            || changedProperties.has('saturation')
            || changedProperties.has('axisHidden')
            || changedProperties.has('labelWidth')) {
            this.prepareAndPaint();
        }
    }
    /**
     * Handles resize events
     * @returns {void}
     */
    onCanvasResize() {
        this.prepareAndPaint();
    }
    /**
     * Handles mouse moving on heatmap canvas
     * @param event mousemove event
     * @returns {void}
     */
    /* istanbul ignore next */
    onMouseMove(event) {
        if (event.composedPath().includes(this.canvas)) {
            this.hitTest(event);
        }
        else {
            this.activeCell = null;
        }
    }
    /**
     * Handles heatmap resizes
     * @returns {void}
     */
    onResize() {
        this.updateTimer = 0;
        if (!this.isSizeCalculated) {
            if (this.offsetWidth || this.offsetHeight) {
                this.isSizeCalculated = true;
            }
        }
        if (this.isSizeCalculated) {
            const spacing = parseFloat(this.getComputedVariable('--spacing', '0'));
            this.cellMargin = spacing / 2;
        }
        // calculate responsive height
        if (this.responsiveHeight || !this.offsetHeight) {
            const width = this.offsetWidth;
            if (width) {
                const newHeight = `${Math.floor(DEFAULT_CANVAS_RATIO * width)}px`;
                if (this.style.height !== newHeight) {
                    // set height to outermost container, so that heatmap's height can be override
                    this.container.style.height = newHeight;
                    this.responsiveHeight = true;
                    this.updateTimer = -1; // Prevent resizeObserver from executing this method in the next call
                }
            }
        }
        this.prepareAndPaint();
    }
    /**
     * Initialize row track
     * @returns {void}
     */
    initialiseRowTrack() {
        this.rowTrack.init(this.offsetHeight, this.rowCount);
        this.rowTrack.margin = this.cellMargin;
    }
    /**
      * Initialize column track
      * @returns {void}
      */
    initialiseColumnTrack() {
        this.colTrack.init(this.offsetWidth, this.columnCount);
        this.colTrack.margin = this.cellMargin;
    }
    /**
     * Hit testing on heatmap
     * @param event mouse event
     * @returns {void}
     */
    /* istanbul ignore next */
    hitTest(event) {
        const box = this.canvas.getBoundingClientRect();
        const x = event.clientX - box.left;
        const y = event.clientY - box.top;
        const row = this.rowTrack.hitTest(y);
        const column = this.colTrack.hitTest(x);
        this.activeCell = this.getCellByLocation(row, column);
    }
    /**
     * Get a cell, using row and column coordinates
     * @param row row index
     * @param column column index
     * @returns cell
     */
    /* istanbul ignore next */
    getCellByLocation(row, column) {
        if (row < 0 || row >= this.rowCount) {
            return null;
        }
        if (column < 0 || column >= this.columnCount) {
            return null;
        }
        return this.cells[row * this.columnCount + column] || null;
    }
    /**
     * Update overlay position
     * @param cell cell information for correct overlay
     * @returns {void}
     */
    /* istanbul ignore next */
    updateTooltipOverlayPosition(cell) {
        var _a, _b, _c;
        // Compensate x-axis height for overlay when x-axis is at top position
        let marginOverlayTop = 0;
        if (((_a = this.config) === null || _a === void 0 ? void 0 : _a.xAxis) && ((_b = this.xAxis) === null || _b === void 0 ? void 0 : _b.offsetHeight)) {
            marginOverlayTop = this.config.xAxis.position === 'bottom' ? 0 : (_c = this.xAxis) === null || _c === void 0 ? void 0 : _c.offsetHeight;
        }
        // Update overlay position
        this.tooltipOverlay.style.left = `${cell.x}px`;
        this.tooltipOverlay.style.top = `${cell.y + marginOverlayTop}px`;
        this.tooltipOverlay.style.width = `${cell.width}px`;
        this.tooltipOverlay.style.height = `${cell.height}px`;
    }
    /**
     * Called upon active cell changes i.e cell hovering
     * @param cell current active cell
     * @param previousCell previous active cell
     * @returns {void}
     */
    /* istanbul ignore next */
    activeCellChanged(cell, previousCell) {
        if (cell && cell.value !== null) {
            if (this.tooltipCallback) {
                this.updateTooltipOverlayPosition(cell);
            }
            // faded color depending on cell font color, light font darkens the cell background and vice versa
            const fontColor = color(getComputedStyle(this.canvas).color);
            const fadedColor = isLight(fontColor) ? darken(cell.backgroundColor) : brighten(cell.backgroundColor);
            this.fade(cell, cell.backgroundColor, fadedColor, 100);
        }
        // returns color of previous cell to default cell color
        if (previousCell && previousCell.value !== null) {
            previousCell.foregroundColor = this.foregroundColor;
            this.fade(previousCell, previousCell.backgroundColor, this.getBackgroundColor(previousCell.value), 300);
        }
    }
    /**
     * Called upon label-hidden attribute changes
     * @returns {void}
     */
    labelHiddenChanged() {
        this.paintAllCellBackground();
        if (this.hasCellHeader) {
            this.paintAllHeader();
        }
        if (!this.labelHidden) {
            this.paintAllLabel();
        }
    }
    /**
     * Handles heatmap resizes
     * @ignore
     * @returns {void}
     */
    resizedCallback() {
        if (this.updateTimer) {
            this.updateTimer = 0;
        }
        else {
            // split layout updating to another execution-loop
            // to prevents resizeObserver triggers resize-loop-error
            this.updateTimer = window.setTimeout(this.onResize);
        }
    }
    /**
     * Stop any current animations on a cell.
     * @param {HeatmapCell} cell cell to stop the animation on
     * @returns {void}
     */
    /* istanbul ignore next */
    stopAnimation(cell) {
        if (cell.animationFrame) {
            cancelAnimationFrame(cell.animationFrame);
        }
    }
    /**
     * Stops all animations on a cell
     * @returns {void}
     */
    stopAllAnimations() {
        this.cells.forEach(this.stopAnimation);
    }
    /**
     * Clear a cell on canvas
     * @param cell cell object
     * @returns {void}
     */
    /* istanbul ignore next */
    resetCell(cell) {
        var _a;
        (_a = this.canvasContext) === null || _a === void 0 ? void 0 : _a.clearRect(cell.x, cell.y, cell.width, cell.height);
    }
    /**
     * Fades a cell's background from one color to another
     * @param cell to fade
     * @param from initial cell color
     * @param to color after faded
     * @param duration fading animation duration
     * @param delay fading animation delay
     * @returns {void}
     */
    /* istanbul ignore next */
    fade(cell, from, to, duration) {
        const start = performance.now();
        const end = start + duration;
        const fadingAnimation = (time) => {
            cell.x = this.colTrack.getContentStart(cell.colIndex);
            cell.y = this.rowTrack.getContentStart(cell.rowIndex);
            cell.width = this.colTrack.getContentSize(cell.colIndex);
            cell.height = this.rowTrack.getContentSize(cell.rowIndex);
            if (cell.animationFrame) {
                cancelAnimationFrame(cell.animationFrame);
            }
            const colorFadingFactor = Math.max(Math.min((time - start) / (end - start), 1), 0);
            // Reset cell and prepare for re-paint
            this.resetCell(cell);
            // Assign new cell background color after fading
            cell.backgroundColor = interpolate(from, to)(colorFadingFactor);
            this.paintCell(cell);
            if (colorFadingFactor < 1) {
                cell.animationFrame = requestAnimationFrame(fadingAnimation);
            }
        };
        if (cell.animationFrame) {
            cancelAnimationFrame(cell.animationFrame);
        }
        cell.animationFrame = requestAnimationFrame(fadingAnimation);
    }
    /**
     * Converts the input data into usable cell data
     * @returns {void}
     */
    calculateCellData() {
        var _a, _b, _c;
        // Reset cell
        this.cells = [];
        if (!this.axisHidden) {
            if (this.yAxis && ((_a = this.config) === null || _a === void 0 ? void 0 : _a.yAxis)) {
                this.rowTrack.init(this.yAxis.offsetHeight, this.rowCount);
            }
            if (this.xAxis && ((_b = this.config) === null || _b === void 0 ? void 0 : _b.xAxis)) {
                this.colTrack.init(this.xAxis.offsetWidth, this.columnCount);
            }
        }
        // TODO: ensure that cell size must always be larger than cell margin
        for (let rowIndex = 0; rowIndex < this.rowTrack.laneCount; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.colTrack.laneCount; columnIndex++) {
                const cell = this.rows[rowIndex][columnIndex];
                const cellValue = cell ? cell.value : null;
                const cellLabel = cellValue !== null && typeof cellValue === 'number' ? cellValue.toFixed(2) : '';
                const cellHeader = cell && cell.header ? cell.header : '';
                const cellIndex = rowIndex * this.colTrack.laneCount + columnIndex;
                const foregroundColor = this.foregroundColor;
                const backgroundColor = ((_c = this.getBackgroundColor(cellValue)) === null || _c === void 0 ? void 0 : _c.toString()) || '';
                if (cellHeader) {
                    this.hasCellHeader = true;
                }
                this.cells[cellIndex] = {
                    rowIndex: rowIndex,
                    colIndex: columnIndex,
                    x: this.colTrack.getContentStart(columnIndex),
                    y: this.rowTrack.getContentStart(rowIndex),
                    width: this.colTrack.getContentSize(columnIndex),
                    height: this.rowTrack.getContentSize(rowIndex),
                    value: cellValue,
                    header: cellHeader,
                    label: cellLabel,
                    foregroundColor: foregroundColor,
                    defaultBackground: backgroundColor,
                    backgroundColor: backgroundColor
                };
            }
        }
    }
    /**
     * Performs check to see if everything is ready,
     * converts data into usable cells and then
     * paints to the canvas.
     * @returns {void}
     */
    prepareAndPaint() {
        if (!!this.canvas && this.config) {
            this.renderTask.schedule(() => {
                this.stopAllAnimations();
                this.initialiseColumnTrack();
                this.initialiseRowTrack();
                if (!this.axisHidden) {
                    this.renderAxisX();
                    this.renderAxisY();
                }
                this.getCellBaseColors();
                this.getCanvasColors();
                this.calculateCellData();
                this.paint();
            });
        }
    }
    /**
     * Paints all cells to the canvas
     * @returns {void}
     */
    paint() {
        if (!this.isSizeCalculated) {
            return;
        }
        if (this.renderCallback) {
            this.retrieveAllCustomCellProperties();
        }
        this.paintAllCellBackground();
        if (this.canPaintText()) {
            if (!this.labelHidden) {
                this.paintAllLabel();
            }
            if (this.hasCellHeader) {
                this.paintAllHeader();
            }
        }
    }
    /**
     * Paints label to all cells
     * @returns {void}
     */
    paintAllLabel() {
        for (let index = 0; index < this.cells.length; index++) {
            this.paintLabel(this.cells[index]);
        }
    }
    /**
     * Calculates space between header and label using cell's height
     * Maximum 10 pixels
     * @param cellHeight in pixels
     * @returns in pixels
     */
    calculateHeaderMargin(cellHeight) {
        const margin = (cellHeight / 10) * 2;
        return margin > 10 ? 10 : margin;
    }
    /**
     * Paints label to a single cell
     * @param cell cell to paint
     * @returns {void}
     */
    paintLabel(cell) {
        const margin = cell.header ? this.calculateHeaderMargin(cell.height) : 0;
        const label = typeof cell.customLabel === 'string' ? cell.customLabel : cell.label;
        if (this.canvasContext) {
            this.canvasContext.fillStyle = cell.customForegroundColor || cell.foregroundColor;
            this.canvasContext.fillText(label || '', cell.x + cell.width / 2, (cell.y + 1 + cell.height / 2) + margin);
        }
    }
    /**
     * Check if the text (label / header and label) can be paint on the cell
     * @returns true if text is within cell's boundary
     */
    /* istanbul ignore next */
    canPaintText() {
        const canvas = this.canvasContext;
        if (!canvas) {
            return false;
        }
        const fontRatio = this.responsiveHeight ? 0.3 : 0.4;
        const fontFamily = getComputedStyle(this).fontFamily;
        const contentWidth = this.colTrack.getContentSize(0);
        const contentHeight = this.rowTrack.getContentSize(0);
        if (contentWidth <= 0 || contentHeight <= 0) {
            this.contentWithinCellBoundary = false;
            return this.contentWithinCellBoundary;
        }
        let fontSize = getResponsiveFontSize(fontRatio, contentHeight, contentWidth);
        canvas.textAlign = 'center';
        canvas.textBaseline = 'middle';
        canvas.font = `${fontSize}px ${fontFamily}`;
        let isWithinMinCellWidth = ((this.labelWidth || getMaximumTextWidth(canvas, this.cells, this.hasCellHeader)) / contentWidth) < MAX_CELL_WIDTH_RATIO;
        // If label width is still more than 85% of the cell width, try to reduce to smallest possible font-size to display label.
        if (!isWithinMinCellWidth && fontSize !== MIN_FONT_SIZE) {
            while (!isWithinMinCellWidth) {
                canvas.font = `${fontSize}px ${fontFamily}`; // Should assigned new font size to canvas before calculated again.
                isWithinMinCellWidth = ((this.labelWidth || getMaximumTextWidth(canvas, this.cells, this.hasCellHeader)) / contentWidth) < MAX_CELL_WIDTH_RATIO;
                // Stops when reaches minimum font-size
                if (fontSize === MIN_FONT_SIZE) {
                    break;
                }
                if (!isWithinMinCellWidth && fontSize > MIN_FONT_SIZE) {
                    fontSize -= 1;
                }
            }
        }
        const isWithinMinCellHeight = this.hasCellHeader ? (fontSize * 2) < contentHeight : fontSize < contentHeight;
        this.contentWithinCellBoundary = isWithinMinCellWidth && isWithinMinCellHeight;
        return this.contentWithinCellBoundary;
    }
    /**
     * Calculate cell background color based on the current cell data value
     * @param value cell value
     * @returns calculated color
     */
    /* istanbul ignore next */
    getBackgroundColor(value) {
        if (value === null) {
            return this.backgroundColor;
        }
        let saturation = this.blend ? 0 : this.saturation;
        // Can only have value from 0 to 1
        if (saturation > 1) {
            saturation = 1;
        }
        else if (saturation < 0) {
            saturation = 0;
        }
        const factor = this.calculateColorFactor(value, saturation);
        if (this.blend) {
            return blend(this.belowPointColor, this.abovePointColor, this.backgroundColor, factor);
        }
        else if (factor >= 0) {
            return interpolate(this.midPointColor, this.abovePointColor)(factor);
        }
        else {
            return interpolate(this.midPointColor, this.belowPointColor)(-factor);
        }
    }
    /**
     * Calculate the color mixing factor from 0 - 1
     * @param value cell value
     * @param saturation color saturation level
     * @returns factor
     */
    /* istanbul ignore next */
    calculateColorFactor(value, saturation) {
        if (value >= this.maxPoint) {
            return 1;
        }
        if (value <= this.minPoint) {
            return -1;
        }
        if (value === this.midPoint) {
            return saturation;
        }
        const saturateRatio = 1 - saturation;
        if (value > this.midPoint) {
            return ((value - this.midPoint) / (this.maxPoint - this.midPoint) * saturateRatio) + saturation;
        }
        else {
            return ((value - this.midPoint) / (this.midPoint - this.minPoint) * saturateRatio) - saturation;
        }
    }
    /**
     * Get and stores canvas color from computed canvas style
     * @returns {void}
     */
    getCanvasColors() {
        this.foregroundColor = this.canvasStyle.color;
        this.backgroundColor = this.canvasStyle.backgroundColor;
    }
    /**
     * Get and stores cell colors based on theme or custom css variables
     * @returns {void}
     */
    getCellBaseColors() {
        this.abovePointColor = this.getComputedVariable('--above-point-color');
        this.midPointColor = this.getComputedVariable('--mid-point-color');
        this.belowPointColor = this.getComputedVariable('--below-point-color');
    }
    /**
     * Retrieve custom cell properties for a single cell
     * @param {HeatmapCell} cell cell to assign colours
     * @returns {void}
     */
    retrieveCustomCellProperties(cell) {
        const customCellProperties = this.renderCallback ? this.renderCallback(Object.assign({}, cell)) : null;
        if (customCellProperties) {
            cell.customLabel = customCellProperties.label;
            cell.customBackgroundColor = customCellProperties.backgroundColor;
            cell.customForegroundColor = customCellProperties.foregroundColor;
        }
    }
    /**
     * Retrieves all custom call properties
     * @returns {void}
     */
    retrieveAllCustomCellProperties() {
        for (let index = 0; index < this.cells.length; index++) {
            this.retrieveCustomCellProperties(this.cells[index]);
        }
    }
    /**
     * Paints cell header
     * @param {HeatmapCell} cell cell to paint
     * @returns {void}
     */
    paintHeader(cell) {
        if (this.canvasContext) {
            const labelFontStyle = this.canvasContext.font;
            const margin = this.labelHidden ? 0 : this.calculateHeaderMargin(cell.height);
            this.canvasContext.font = 'bold ' + labelFontStyle;
            this.canvasContext.fillStyle = cell.customForegroundColor || cell.foregroundColor;
            this.canvasContext.fillText(cell.header || '', cell.x + cell.width / 2, (cell.y + 1 + cell.height / 2) - margin);
            // Reverts font style to paint label correctly
            this.canvasContext.font = labelFontStyle;
        }
    }
    /**
     * Paints header to all cells
     * @returns {void}
     */
    paintAllHeader() {
        for (let index = 0; index < this.cells.length; index++) {
            this.paintHeader(this.cells[index]);
        }
    }
    /**
     * Paints individual cell when fading
     * @param cell object
     * @returns {void}
     */
    /* istanbul ignore next */
    paintCell(cell) {
        this.paintCellBackground(cell);
        if (!this.labelHidden && this.contentWithinCellBoundary) {
            this.paintLabel(cell);
        }
        if (cell.header && this.contentWithinCellBoundary) {
            this.paintHeader(cell);
        }
    }
    /**
     * Paints all cells background colour
     * @returns {void}
     */
    paintAllCellBackground() {
        var _a;
        (_a = this.canvasContext) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let index = 0; index < this.cells.length; index++) {
            this.paintCellBackground(this.cells[index]);
        }
    }
    /**
    * Paints a single cell background colour
    * @param {HeatmapCell} cell cell to paint
    * @returns {void}
    */
    paintCellBackground(cell) {
        if (this.canvasContext) {
            this.canvasContext.fillStyle = cell.customBackgroundColor || cell.backgroundColor;
            this.canvasContext.fillRect(cell.x, cell.y, cell.width, cell.height);
        }
    }
    /**
     * Construct and renders x-axis
     * @returns {void}
     */
    renderAxisX() {
        var _a;
        if (!this.isSizeCalculated) {
            return;
        }
        const axisConfig = (_a = this.config) === null || _a === void 0 ? void 0 : _a.xAxis;
        if (!this.xAxis || !this.yAxisBox || !axisConfig) {
            return;
        }
        if (axisConfig.position === 'bottom') {
            this.canvasContainer.style.flexDirection = 'column-reverse';
            this.yAxisBox.style.display = 'flex';
            this.yAxisBox.style.flexDirection = 'column-reverse';
        }
        else {
            this.canvasContainer.style.flexDirection = 'column';
            this.yAxisBox.style.display = 'block';
        }
        const laneCount = this.colTrack.laneCount;
        const xAxisElement = this.xAxis;
        const labels = axisConfig.labels || [];
        const shortLabels = axisConfig.shortLabels || [];
        const cellMargin = this.colTrack.margin;
        let displayShortLabel = false;
        const nbsp = String.fromCharCode(160);
        while (xAxisElement.children.length > laneCount) {
            if (xAxisElement.lastChild) {
                xAxisElement.removeChild(xAxisElement.lastChild);
            }
        }
        for (let i = 0; i < laneCount; i++) {
            let element = xAxisElement.children[i];
            if (!element) {
                element = document.createElement('div');
                element.className = 'x-axis-item';
                element.appendChild(document.createElement('span'));
                xAxisElement.appendChild(element);
            }
            if (cellMargin !== Number(element.getAttribute('cell-margin'))) {
                element.style.margin = `${cellMargin}px`;
                element.setAttribute('cell-margin', cellMargin.toString());
            }
            const cellWidth = this.colTrack.getContentSize(i);
            if (cellWidth !== Number(element.getAttribute('cell-width'))) {
                element.style.width = `${cellWidth}px`;
                element.setAttribute('cell-width', cellWidth.toString());
            }
            const span = element.children[0];
            span.textContent = labels[i] || nbsp;
            // If x-axis text is more than container
            if (span.offsetWidth > element.offsetWidth) {
                displayShortLabel = true;
            }
        }
        if (displayShortLabel) {
            // Reassign all x-axis labels
            for (let i = 0; i < laneCount; i++) {
                const element = xAxisElement.children[i];
                element.children[0].textContent = shortLabels[i] || nbsp;
            }
        }
    }
    /**
     * Construct and renders y-axis
     * @returns {void}
     */
    renderAxisY() {
        var _a, _b;
        if (!this.isSizeCalculated) {
            return;
        }
        const axisConfig = (_a = this.config) === null || _a === void 0 ? void 0 : _a.yAxis;
        if (!this.yAxis || !axisConfig) {
            return;
        }
        if (axisConfig.position === 'right') {
            this.container.style.flexDirection = 'row-reverse';
        }
        else {
            this.container.style.flexDirection = 'row';
        }
        const yAxisElement = this.yAxis;
        const labels = axisConfig.labels || [];
        const cellMargin = this.rowTrack.margin;
        const laneCount = this.rowTrack.laneCount;
        const nbsp = String.fromCharCode(160);
        // Make one box inside the y axis needed to create the width of the crossbox.
        if (this.yAxis.children.length === 0) {
            const element = document.createElement('div');
            element.className = 'y-axis-item';
            const span = document.createElement('span');
            span.textContent = getMaximumLabelTextWidth(labels);
            element.appendChild(span);
            element.style.margin = `${cellMargin}px`;
            const cellHeight = this.rowTrack.getContentSize(1);
            element.style.height = `${cellHeight}px`;
            yAxisElement.appendChild(element);
        }
        // Create crossbox
        if (this.xAxis && this.yAxis) {
            // In order to build a crossbox,
            // it is necessary to have the height of xAxis and the width of yAxis
            // in order to determine the correct size of the crossbox.
            this.crossBox.style.margin = `${this.cellMargin}px`;
            this.crossBox.style.height = `${this.xAxis.children[0].offsetHeight}px`;
            this.crossBox.style.width = `${this.yAxis.children[0].offsetWidth}px`;
            // clear one box inside the yAxis after create crossbox
            if (yAxisElement.lastChild) {
                yAxisElement.removeChild(yAxisElement.lastChild);
            }
        }
        this.rowTrack.init(this.offsetHeight - (this.crossBox.offsetHeight + (this.cellMargin * 2)), this.rowCount);
        // Clear yAxis element before re-create yAxis
        while (yAxisElement.children.length > laneCount) {
            if (yAxisElement.lastChild) {
                yAxisElement.removeChild(yAxisElement.lastChild);
            }
        }
        // Create content inside yAxis
        for (let i = 0; i < laneCount; i++) {
            let element = yAxisElement.children[i];
            if (!element) {
                element = document.createElement('div');
                element.className = 'y-axis-item';
                yAxisElement.appendChild(element);
            }
            if (cellMargin !== Number(element.getAttribute('cell-margin'))) {
                element.style.margin = `${cellMargin}px`;
                element.setAttribute('cell-margin', cellMargin.toString());
            }
            const cellHeight = this.rowTrack.getContentSize(i);
            if (cellHeight !== Number(element.getAttribute('cell-height'))) {
                element.style.height = `${cellHeight}px`;
                element.setAttribute('cell-height', cellHeight.toString());
            }
            element.textContent = labels[i] || nbsp;
        }
        if (this.xAxis && ((_b = this.config) === null || _b === void 0 ? void 0 : _b.xAxis)) {
            // TODO: Wrong crossBox margin calculation when margin = 0.5px
            this.crossBox.style.margin = `${this.cellMargin}px`;
            this.crossBox.style.height = `${this.xAxis.children[0].offsetHeight}px`;
            this.crossBox.style.width = `${this.yAxis.children[0].offsetWidth}px`;
        }
        else {
            this.crossBox.style.width = '0';
        }
    }
    /**
     * Tooltip renderer function
     * @returns tooltip template to be render
     */
    /* istanbul ignore next */
    tooltipRenderer() {
        if (this.activeCell && this.canvasContext && this.tooltipCallback) {
            return this.tooltipCallback(this.activeCell);
        }
        return undefined;
    }
    /**
     * Checks if the tooltip should display or not
     * @param target element target
     * @returns if the canvas target within canvas
     */
    /* istanbul ignore next */
    tooltipCondition(target) {
        return target === this.tooltipOverlay;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        var _a, _b;
        return html `
      <div id="container">
        ${((_a = this.config) === null || _a === void 0 ? void 0 : _a.yAxis) && !this.axisHidden ? html `
        <div id="y-axis-container">
          <div part="cross-box"></div>
          <div part="y-axis"></div>
        </div>` : null}
        <div id="canvas-container">
          ${((_b = this.config) === null || _b === void 0 ? void 0 : _b.xAxis) && !this.axisHidden ? html `<div part="x-axis"></div>` : null}
          <ef-canvas part="canvas" @resize=${this.onCanvasResize} @mousemove=${this.onMouseMove}></ef-canvas>
          ${this.tooltipCallback ? html `<div id="tooltip-overlay"></div>` : null}
        </div>
      </div>
      ${this.tooltipCallback ? html `
        <ef-tooltip .condition=${this.tooltipCondition} .renderer=${this.tooltipRenderer}></ef-tooltip>
      ` : null}
    `;
    }
};
__decorate([
    property({ type: Object })
], Heatmap.prototype, "config", void 0);
__decorate([
    property({ type: Number, attribute: 'label-width' })
], Heatmap.prototype, "labelWidth", void 0);
__decorate([
    property({ type: Boolean, attribute: 'label-hidden' })
], Heatmap.prototype, "labelHidden", void 0);
__decorate([
    property({ type: Boolean, attribute: 'axis-hidden' })
], Heatmap.prototype, "axisHidden", void 0);
__decorate([
    property({ type: Object, attribute: false })
], Heatmap.prototype, "activeCell", null);
__decorate([
    property({ type: Number, attribute: 'min-point' })
], Heatmap.prototype, "minPoint", void 0);
__decorate([
    property({ type: Number, attribute: 'mid-point' })
], Heatmap.prototype, "midPoint", void 0);
__decorate([
    property({ type: Number, attribute: 'max-point' })
], Heatmap.prototype, "maxPoint", void 0);
__decorate([
    property({ type: Boolean })
], Heatmap.prototype, "blend", void 0);
__decorate([
    property({ type: Number })
], Heatmap.prototype, "saturation", void 0);
__decorate([
    property({ type: Function, attribute: false })
], Heatmap.prototype, "tooltipCallback", void 0);
__decorate([
    property({ type: Function, attribute: false })
], Heatmap.prototype, "renderCallback", void 0);
__decorate([
    query('[part=canvas]', true)
], Heatmap.prototype, "canvas", void 0);
__decorate([
    query('#container', true)
], Heatmap.prototype, "container", void 0);
__decorate([
    query('[part=cross-box]', true)
], Heatmap.prototype, "crossBox", void 0);
__decorate([
    query('[part=y-axis]', true)
], Heatmap.prototype, "yAxis", void 0);
__decorate([
    query('[part=x-axis]', true)
], Heatmap.prototype, "xAxis", void 0);
__decorate([
    query('#canvas-container', true)
], Heatmap.prototype, "canvasContainer", void 0);
__decorate([
    query('#y-axis-container', true)
], Heatmap.prototype, "yAxisBox", void 0);
__decorate([
    query('#tooltip-overlay')
], Heatmap.prototype, "tooltipOverlay", void 0);
Heatmap = __decorate([
    customElement('ef-heatmap', {
        alias: 'sapphire-heatmap'
    })
], Heatmap);
export { Heatmap };
//# sourceMappingURL=index.js.map