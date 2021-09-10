import { JSXInterface } from '../jsx';
import { ResponsiveElement, TemplateResult, CSSResult, ElementSize } from '@refinitiv-ui/core';
/**
 * A Component uses to draw graphics on a web page,
 * it works similarly to the normal HTML5 Canvas element.
 * @fires frame - dispatched when next Frame event occurs when autoloop is set to true
 */
export declare class Canvas extends ResponsiveElement {
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
    width: number;
    height: number;
    private frameId;
    private _autoloop;
    constructor();
    /**
     * Starts an automatic animation loop.
     * Enabling the frame event.
     */
    get autoloop(): boolean;
    set autoloop(val: boolean);
    /**
     * Html canvas element
     * @type {HTMLCanvasElement}
     */
    get canvas(): HTMLCanvasElement;
    /**
     * Alias of context
     * @type {CanvasRenderingContext2D | null}
     */
    get ctx(): CanvasRenderingContext2D | null;
    /**
     * The 2 dimensional context of the canvas, used for drawing
     * @type {CanvasRenderingContext2D | null}
     */
    get context(): CanvasRenderingContext2D | null;
    /**
     * Request an animation frame
     * @return {void}
     */
    private loop;
    /**
     * Dispatch frame event
     * @param timestamp timestamp
     * @return {void}
     */
    protected fireFrame(timestamp: number): void;
    /**
     * Updated canvas size
     * @param width width of canvas
     * @param height height of canvas
     * @return {void}
     */
    private resizeCanvas;
    /**
     * Return context of canvas,
     * support only 2D mode
     * @param {string} mode mode of canvas's context
     * @return context of canvas
     */
    getContext(mode: string): CanvasRenderingContext2D | null;
    /**
     * private method but can't override
     * access modifiers in typescript.
     * @ignore
     * @param size element dimensions
     * @returns {void}
     */
    resizedCallback(size: ElementSize): void;
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
    'ef-canvas': Canvas;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-canvas': Partial<Canvas> | JSXInterface.HTMLAttributes<Canvas>;
    }
  }
}

export {};
