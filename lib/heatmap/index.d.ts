import { JSXInterface } from '../jsx';
import { ResponsiveElement, TemplateResult, CSSResult, PropertyValues } from '@refinitiv-ui/core';
import '../canvas';
import '../tooltip';
import { HeatmapCell, HeatmapConfig, HeatmapTooltipCallback, HeatmapRenderCallback } from './helpers/types';
export { HeatmapCell, HeatmapXAxis, HeatmapYAxis, HeatmapConfig, HeatmapTooltipCallback, HeatmapRenderCallback, HeatmapCustomisableProperties } from './helpers/types';
/**
 * A graphical representation of data where the individual
 * values contained in a matrix are represented as colors
 */
export declare class Heatmap extends ResponsiveElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @returns CSS template
     */
    static get styles(): CSSResult | CSSResult[];
    /**
     * Heatmap configuration options.
     * @type {HeatmapConfig}
     */
    config: HeatmapConfig | null;
    /**
     * Number of maximum label width that cell can paint in pixel.
     * e.g. label-width: 30px; cell label hides when text length reaches 30px.
     */
    labelWidth: number;
    /**
     * Hide all labels in the cells
     */
    labelHidden: boolean;
    /**
     * Hide all axes
     */
    axisHidden: boolean;
    /**
     * Current active cell for internal use
     * @private
     */
    get activeCell(): HeatmapCell | null;
    set activeCell(activeCell: HeatmapCell | null);
    /**
     * Minimum point of the cell coloring
     */
    minPoint: number;
    /**
     * Middle point of the cell coloring
     */
    midPoint: number;
    /**
     * Maximum point of the cell coloring
     */
    maxPoint: number;
    /**
     * Enable cell color blending
     */
    blend: boolean;
    /**
     * Cell minimum color saturation, value can be from 0 - 1
     */
    saturation: number;
    /**
     * A callback function that allows tooltip rendering on cell hover
     * @type {HeatmapTooltipCallback}
     */
    tooltipCallback: HeatmapTooltipCallback | undefined;
    /**
     * Render callback function use for custom cell properties.
     * Accepts custom label, foreground and background color
     * @type {HeatmapRenderCallback}
     */
    renderCallback: HeatmapRenderCallback | undefined;
    /**
     * HTML canvas DOM used to render heatmap
     */
    private canvas;
    /**
     * Main component's container DOM
     */
    private container;
    /**
     * Cross-box DOM
     */
    private crossBox;
    /**
     * Y-axis DOM
     */
    private yAxis?;
    /**
     * X-axis DOM
     */
    private xAxis?;
    /**
     * Box containing canvas and x-axis DOM
     */
    private canvasContainer;
    /**
     * Contains a y-axis and a cross box DOM
     */
    private yAxisBox?;
    /**
     * Overlay used for moving target around for rendering tooltip when a cell is hit.
     * Canvas alone cannot do this. It is one whole element.
     */
    private tooltipOverlay;
    /**
     * Current active cell
     */
    private _activeCell;
    /**
     * Internal cells data storage
     */
    private cells;
    /**
     * Canvas's font color according to theme
     */
    private foregroundColor;
    /**
     * Canvas's background color according to theme
     */
    private backgroundColor;
    /**
     * Row cells track for easier calculations
     */
    private rowTrack;
    /**
     * Column cells track for easier calculations
     */
    private colTrack;
    /**
     * A flag to check if calculated responsive height it been set.
     */
    private responsiveHeight;
    /**
     * A flag to check if the component has a size.
     */
    private isSizeCalculated;
    /**
     * Use to prevent resizes observer in certain use cases
     */
    private updateTimer;
    /**
     * Use to throttle heatmap painting
     */
    private renderTask;
    /**
     * A flag to check if the cell has header enable.
     */
    private hasCellHeader;
    /**
     * A flag to check if cell's content is within its boundary
     */
    private contentWithinCellBoundary;
    /**
     * Margin around each cell
     */
    private cellMargin;
    /**
     * Above point color that is customisable using CSS variable
     */
    private abovePointColor;
    /**
     * Middle point color that is customisable using CSS variable
     */
    private midPointColor;
    /**
     * Below point color that is customisable using CSS variable
     */
    private belowPointColor;
    /**
     * Gets the computed style of the canvas element
     * @returns computed canvas style
     */
    private get canvasStyle();
    /**
     * Gets the 2D context of the canvas element
     * @returns 2D canvas context
     */
    private get canvasContext();
    /**
     * Safely gets the row data
     * @returns array of row data
     */
    private get rows();
    /**
     * Get row count
     * @returns count of rows
     */
    private get rowCount();
    /**
     * Get column count
     * @returns count of columns
     */
    private get columnCount();
    constructor();
    /**
     * Called when the element’s DOM has been updated and rendered
     * @param changedProperties changed properties
     * @returns {void}
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Handles resize events
     * @returns {void}
     */
    private onCanvasResize;
    /**
     * Handles mouse moving on heatmap canvas
     * @param event mousemove event
     * @returns {void}
     */
    private onMouseMove;
    /**
     * Handles heatmap resizes
     * @returns {void}
     */
    private onResize;
    /**
     * Initialize row track
     * @returns {void}
     */
    private initialiseRowTrack;
    /**
      * Initialize column track
      * @returns {void}
      */
    private initialiseColumnTrack;
    /**
     * Hit testing on heatmap
     * @param event mouse event
     * @returns {void}
     */
    private hitTest;
    /**
     * Get a cell, using row and column coordinates
     * @param row row index
     * @param column column index
     * @returns cell
     */
    private getCellByLocation;
    /**
     * Update overlay position
     * @param cell cell information for correct overlay
     * @returns {void}
     */
    private updateTooltipOverlayPosition;
    /**
     * Called upon active cell changes i.e cell hovering
     * @param cell current active cell
     * @param previousCell previous active cell
     * @returns {void}
     */
    private activeCellChanged;
    /**
     * Called upon label-hidden attribute changes
     * @returns {void}
     */
    private labelHiddenChanged;
    /**
     * Handles heatmap resizes
     * @ignore
     * @returns {void}
     */
    resizedCallback(): void;
    /**
     * Stop any current animations on a cell.
     * @param {HeatmapCell} cell cell to stop the animation on
     * @returns {void}
     */
    private stopAnimation;
    /**
     * Stops all animations on a cell
     * @returns {void}
     */
    private stopAllAnimations;
    /**
     * Clear a cell on canvas
     * @param cell cell object
     * @returns {void}
     */
    private resetCell;
    /**
     * Fades a cell's background from one color to another
     * @param cell to fade
     * @param from initial cell color
     * @param to color after faded
     * @param duration fading animation duration
     * @param delay fading animation delay
     * @returns {void}
     */
    private fade;
    /**
     * Converts the input data into usable cell data
     * @returns {void}
     */
    private calculateCellData;
    /**
     * Performs check to see if everything is ready,
     * converts data into usable cells and then
     * paints to the canvas.
     * @returns {void}
     */
    private prepareAndPaint;
    /**
     * Paints all cells to the canvas
     * @returns {void}
     */
    private paint;
    /**
     * Paints label to all cells
     * @returns {void}
     */
    private paintAllLabel;
    /**
     * Calculates space between header and label using cell's height
     * Maximum 10 pixels
     * @param cellHeight in pixels
     * @returns in pixels
     */
    private calculateHeaderMargin;
    /**
     * Paints label to a single cell
     * @param cell cell to paint
     * @returns {void}
     */
    private paintLabel;
    /**
     * Check if the text (label / header and label) can be paint on the cell
     * @returns true if text is within cell's boundary
     */
    private canPaintText;
    /**
     * Calculate cell background color based on the current cell data value
     * @param value cell value
     * @returns calculated color
     */
    private getBackgroundColor;
    /**
     * Calculate the color mixing factor from 0 - 1
     * @param value cell value
     * @param saturation color saturation level
     * @returns factor
     */
    private calculateColorFactor;
    /**
     * Get and stores canvas color from computed canvas style
     * @returns {void}
     */
    private getCanvasColors;
    /**
     * Get and stores cell colors based on theme or custom css variables
     * @returns {void}
     */
    private getCellBaseColors;
    /**
     * Retrieve custom cell properties for a single cell
     * @param {HeatmapCell} cell cell to assign colours
     * @returns {void}
     */
    private retrieveCustomCellProperties;
    /**
     * Retrieves all custom call properties
     * @returns {void}
     */
    private retrieveAllCustomCellProperties;
    /**
     * Paints cell header
     * @param {HeatmapCell} cell cell to paint
     * @returns {void}
     */
    private paintHeader;
    /**
     * Paints header to all cells
     * @returns {void}
     */
    private paintAllHeader;
    /**
     * Paints individual cell when fading
     * @param cell object
     * @returns {void}
     */
    private paintCell;
    /**
     * Paints all cells background colour
     * @returns {void}
     */
    private paintAllCellBackground;
    /**
    * Paints a single cell background colour
    * @param {HeatmapCell} cell cell to paint
    * @returns {void}
    */
    private paintCellBackground;
    /**
     * Construct and renders x-axis
     * @returns {void}
     */
    private renderAxisX;
    /**
     * Construct and renders y-axis
     * @returns {void}
     */
    private renderAxisY;
    /**
     * Tooltip renderer function
     * @returns tooltip template to be render
     */
    private tooltipRenderer;
    /**
     * Checks if the tooltip should display or not
     * @param target element target
     * @returns if the canvas target within canvas
     */
    private tooltipCondition;
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
    'ef-heatmap': Heatmap;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-heatmap': Partial<Heatmap> | JSXInterface.HTMLAttributes<Heatmap>;
    }
  }
}

export {};
