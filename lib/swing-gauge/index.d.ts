import { JSXInterface } from '../jsx';
import { CSSResult, ElementSize, PropertyValues } from '@refinitiv-ui/core';
import { Canvas } from '../canvas';
/**
 * Data visualisation showing the percentage between two values
 */
export declare class SwingGauge extends Canvas {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return CSS template
     */
    static get styles(): CSSResult;
    /**
     * Set the primary value
     * @default 50
     */
    primaryValue: number;
    /**
     * Set the primary label
     */
    primaryLabel: string;
    /**
     * Set the secondary value
     * @default 50
     */
    secondaryValue: number;
    /**
     * Set the secondary label
     */
    secondaryLabel: string;
    /**
     * Sets the animation duration in milliseconds
     * @default 1000
     */
    duration: number;
    /**
     * Getter size of component
     * @returns {ElementSize} return size of component
     */
    get canvasSize(): ElementSize;
    private w;
    private h;
    private min;
    private max;
    private size;
    private maxFontSize;
    private centerlineOptions;
    private onFrame;
    private cancelFrame;
    private previousFillPercentage;
    private fillPercentage;
    private frameHandler;
    constructor();
    /**
     * Re-draw canvas when the size of component changed
     * @ignore
     * @param size element dimensions
     * @returns {void}
     */
    resizedCallback(size: ElementSize): void;
    /**
     * Handles when event frame fired to re-draw canvas
     * @protected
     * @param time timestamp
     * @returns {void}
     */
    protected fireFrame(time: number): void;
    /**
     * On First Updated Lifecycle
     * @ignore
     * @param changedProperties changed properties
     * @returns {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * On Update Lifecycle
     * @ignore
     * @param changedProperties changed properties
     * @returns {void}
     */
    protected update(changedProperties: PropertyValues): void;
    /**
     * On Updated Lifecycle
     * @ignore
     * @param changedProperties changed properties
     * @returns {void}
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Handles when component disconnected
     * @private
     * @returns {void}
     */
    disconnectedCallback(): void;
    /**
     * Calls easing based on both left and right values
     * @private
     * @param {number} v1 left value
     * @param {number} v2 right value
     * @returns {void}
     */
    private ease;
    /**
     * Eases the fill percentage
     * @private
     * @param {number} to ease to value
     * @param {number} from ease from value
     * @param {number} time ease time
     * @returns {void}
     */
    private easeTo;
    /**
     * Does the control has valid data?
     * @returns {boolean} will return true if valid data
     */
    private dataValid;
    /**
     * Are we able to render?
     * Used to prevent frame painting if data hasn't changed
     * @returns {boolean} will return true if canvas can render
     */
    private canRender;
    /**
     * Calculate fill percentage and re-render chart
     * @returns {void}
     */
    private reDrawCanvas;
    /**
     * Render chart
     * @param isFrameUpdated Optional called by on frame event
     * @returns {void}
     */
    private renderCanvas;
}
//# sourceMappingURL=index.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-swing-gauge': SwingGauge;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-swing-gauge': Partial<SwingGauge> | JSXInterface.HTMLAttributes<SwingGauge>;
    }
  }
}

export {};
