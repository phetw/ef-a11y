var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ResponsiveElement, html, css, customElement, property } from '@refinitiv-ui/core';
import { VERSION } from '../';
/**
 * A Component uses to draw graphics on a web page,
 * it works similarly to the normal HTML5 Canvas element.
 * @fires frame - dispatched when next Frame event occurs when autoloop is set to true
 */
let Canvas = class Canvas extends ResponsiveElement {
    constructor() {
        super();
        this.frameId = 0;
        this.width = 0;
        this.height = 0;
        this._autoloop = false;
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
     * @return CSS template
     */
    static get styles() {
        return css `
      :host {
        display: block;
        position: relative;
        overflow: hidden;
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
     * Starts an automatic animation loop.
     * Enabling the frame event.
     */
    get autoloop() {
        return this._autoloop;
    }
    set autoloop(val) {
        const oldValue = this._autoloop;
        this._autoloop = val;
        void this.requestUpdate('autoloop', oldValue);
        this.loop();
    }
    /**
     * Html canvas element
     * @type {HTMLCanvasElement}
     */
    get canvas() {
        var _a;
        return (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('canvas');
    }
    /**
     * Alias of context
     * @type {CanvasRenderingContext2D | null}
     */
    get ctx() {
        /* istanbul ignore if  */
        if (!this.canvas) {
            return null;
        }
        return this.canvas.getContext('2d');
    }
    /**
     * The 2 dimensional context of the canvas, used for drawing
     * @type {CanvasRenderingContext2D | null}
     */
    get context() {
        return this.ctx;
    }
    /**
     * Request an animation frame
     * @return {void}
     */
    loop() {
        if (this.autoloop) {
            this.frameId = requestAnimationFrame(this.fireFrame.bind(this));
        }
    }
    /**
     * Dispatch frame event
     * @param timestamp timestamp
     * @return {void}
     */
    fireFrame(timestamp) {
        cancelAnimationFrame(this.frameId);
        /**
         * Frame fires next frame event when autoloop is set to true.
         */
        this.dispatchEvent(new CustomEvent('frame', {
            detail: { timestamp },
            bubbles: false
        }));
        this.loop();
    }
    /**
     * Updated canvas size
     * @param width width of canvas
     * @param height height of canvas
     * @return {void}
     */
    resizeCanvas(width, height) {
        const dpr = window.devicePixelRatio || 1;
        this.width = width;
        this.height = height;
        this.canvas.width = Math.floor(width * dpr);
        this.canvas.height = Math.floor(height * dpr);
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        if (this.ctx) {
            this.ctx.scale(dpr, dpr);
        }
    }
    /**
     * Return context of canvas,
     * support only 2D mode
     * @param {string} mode mode of canvas's context
     * @return context of canvas
     */
    getContext(mode) {
        if (mode === '2d') {
            return this.canvas.getContext(mode);
        }
        console.warn('ef-canvas does not support the mode ' + mode); // eslint-disable-line
        return null;
    }
    /**
     * private method but can't override
     * access modifiers in typescript.
     * @ignore
     * @param size element dimensions
     * @returns {void}
     */
    resizedCallback(size) {
        this.resizeCanvas(size.width, size.height);
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return html `
      <canvas id="canvas"></canvas>
    `;
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], Canvas.prototype, "autoloop", null);
Canvas = __decorate([
    customElement('ef-canvas', {
        alias: 'sapphire-canvas'
    })
], Canvas);
export { Canvas };
//# sourceMappingURL=index.js.map