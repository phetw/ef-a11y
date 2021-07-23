var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, customElement, property } from '@refinitiv-ui/core';
import { helpers as canvasHelper } from './helpers/canvas';
import { Canvas } from '../canvas';
import { VERSION } from '../';
/**
 * Data visualisation showing the percentage between two values
 */
let SwingGauge = class SwingGauge extends Canvas {
    constructor() {
        super();
        /**
         * Set the primary value
         * @default 50
         */
        this.primaryValue = 50;
        /**
         * Set the primary label
         */
        this.primaryLabel = '';
        /**
         * Set the secondary value
         * @default 50
         */
        this.secondaryValue = 50;
        /**
         * Set the secondary label
         */
        this.secondaryLabel = '';
        /**
         * Sets the animation duration in milliseconds
         * @default 1000
         */
        this.duration = 1000;
        this.w = null;
        this.h = null;
        this.min = null;
        this.max = null;
        this.size = null;
        this.maxFontSize = null;
        this.centerlineOptions = ['solid', 'dotted', 'dashed'];
        this.onFrame = requestAnimationFrame.bind(window);
        this.cancelFrame = cancelAnimationFrame.bind(window);
        this.previousFillPercentage = null;
        this.fillPercentage = null;
        this.frameHandler = null;
        /**
         * @ignore
         */
        this.autoloop = true;
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
        overflow: hidden;
        position: relative;
      }
      :host::before {
        content: '';
        display: block;
        min-height: 200px;
        box-sizing: border-box;
      }
      canvas {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
      }
    `;
    }
    /**
     * Getter size of component
     * @returns {ElementSize} return size of component
     */
    get canvasSize() {
        return {
            width: this.width,
            height: this.height
        };
    }
    /**
     * Re-draw canvas when the size of component changed
     * @ignore
     * @param size element dimensions
     * @returns {void}
     */
    resizedCallback(size) {
        super.resizedCallback(size);
        this.renderCanvas();
    }
    /**
     * Handles when event frame fired to re-draw canvas
     * @protected
     * @param time timestamp
     * @returns {void}
     */
    fireFrame(time) {
        super.fireFrame(time);
        this.renderCanvas(true);
    }
    /**
     * On First Updated Lifecycle
     * @ignore
     * @param changedProperties changed properties
     * @returns {void}
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.reDrawCanvas();
    }
    /**
     * On Update Lifecycle
     * @ignore
     * @param changedProperties changed properties
     * @returns {void}
     */
    update(changedProperties) {
        super.update(changedProperties);
    }
    /**
     * On Updated Lifecycle
     * @ignore
     * @param changedProperties changed properties
     * @returns {void}
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        this.reDrawCanvas();
    }
    /**
     * Handles when component disconnected
     * @private
     * @returns {void}
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.frameHandler) {
            this.cancelFrame(this.frameHandler);
            this.frameHandler = null;
        }
    }
    /**
     * Calls easing based on both left and right values
     * @private
     * @param {number} v1 left value
     * @param {number} v2 right value
     * @returns {void}
     */
    ease(v1, v2) {
        if (v1 || v2) {
            this.easeTo(v1 / (v1 + v2), this.fillPercentage, performance.now() + this.duration);
        }
        else if (typeof this.fillPercentage === 'number') {
            this.easeTo(0.5, this.fillPercentage, performance.now() + this.duration);
        }
        else {
            this.fillPercentage = 0.5;
        }
    }
    /**
     * Eases the fill percentage
     * @private
     * @param {number} to ease to value
     * @param {number} from ease from value
     * @param {number} time ease time
     * @returns {void}
     */
    easeTo(to, from, time) {
        let diff = this.duration - (time - performance.now());
        diff /= this.duration;
        this.fillPercentage = (from + (to - from) * canvasHelper.elasticOut(diff > 1 ? 1 : diff < 0 ? 0 : diff)) || 0;
        if (this.fillPercentage !== to) {
            if (this.frameHandler) {
                this.cancelFrame(this.frameHandler);
            }
            this.frameHandler = this.onFrame(() => this.easeTo(to, from, time));
        }
    }
    /**
     * Does the control has valid data?
     * @returns {boolean} will return true if valid data
     */
    dataValid() {
        return this.primaryValue >= 0 && this.secondaryValue >= 0;
    }
    /**
     * Are we able to render?
     * Used to prevent frame painting if data hasn't changed
     * @returns {boolean} will return true if canvas can render
     */
    canRender() {
        return (this.canvas.width + this.canvas.height !== 0 && this.previousFillPercentage !== this.fillPercentage);
    }
    /**
     * Calculate fill percentage and re-render chart
     * @returns {void}
     */
    reDrawCanvas() {
        this.ease(this.primaryValue, this.secondaryValue);
        this.renderCanvas();
    }
    /**
     * Render chart
     * @param isFrameUpdated Optional called by on frame event
     * @returns {void}
     */
    renderCanvas(isFrameUpdated) {
        // Can and should we paint?
        if ((isFrameUpdated && !this.canRender()) || !this.dataValid()) {
            return;
        }
        // Update the variables
        this.w = this.canvasSize.width;
        this.h = this.canvasSize.height;
        this.min = this.w > this.h ? this.h : this.w;
        this.max = this.w > this.h ? this.w : this.h;
        this.size = Math.floor(this.max / 2 < this.min ? this.max / 2 : this.min);
        this.maxFontSize = Math.round(this.size * 0.18);
        // Clear
        canvasHelper.clear(this.canvasSize, this.ctx);
        // Draw
        canvasHelper.draw({
            w: this.w,
            h: this.h,
            size: this.size,
            duration: this.duration,
            primaryValue: this.primaryValue,
            primaryLabel: this.primaryLabel,
            secondaryValue: this.secondaryValue,
            secondaryLabel: this.secondaryLabel,
            fillPercentage: this.fillPercentage
        }, this.ctx, this.canvasSize, {
            ctxOptions: {
                strokeWidth: Math.ceil(this.size * 0.005),
                fontSize: this.maxFontSize,
                fontFamily: getComputedStyle(this).fontFamily,
                fillStyle: this.getComputedVariable('--text-color', '#fff'),
                maxFontSize: Math.round(this.size * 0.18),
                primaryColor: this.getComputedVariable('--primary-color', '#2EB4C9'),
                secondaryColor: this.getComputedVariable('--secondary-color', '#C93C4B'),
                borderColor: this.getComputedVariable('--border-color', '#000'),
                centerline: `${this.getComputedVariable('--center-line', 'solid')}`.trim(),
                centerlineOpacity: this.getComputedVariable('--center-line-opacity', '0.6'),
                centerlineColor: this.getComputedVariable('--center-line-color', '#000'),
                centerlineOptions: this.centerlineOptions
            }
        });
        // Set this for comparison when deciding if we should paint
        this.previousFillPercentage = this.fillPercentage;
    }
};
__decorate([
    property({ attribute: 'primary-value', type: Number })
], SwingGauge.prototype, "primaryValue", void 0);
__decorate([
    property({ attribute: 'primary-label', type: String })
], SwingGauge.prototype, "primaryLabel", void 0);
__decorate([
    property({ attribute: 'secondary-value', type: Number })
], SwingGauge.prototype, "secondaryValue", void 0);
__decorate([
    property({ attribute: 'secondary-label', type: String })
], SwingGauge.prototype, "secondaryLabel", void 0);
__decorate([
    property({ type: Number })
], SwingGauge.prototype, "duration", void 0);
SwingGauge = __decorate([
    customElement('ef-swing-gauge', {
        alias: 'sapphire-swing-gauge'
    })
], SwingGauge);
export { SwingGauge };
//# sourceMappingURL=index.js.map