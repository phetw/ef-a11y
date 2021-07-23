var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BasicElement, html, css, customElement, property } from '@refinitiv-ui/core';
import { VERSION } from '../';
import '../canvas';
const ZERO_MAP = {
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right'
};
const MAX_VALUE = 100; // Max value of led-gauge can't be changed by user
const SECTION_DIVIDER = 5; // To separate led-gauge to 5 sections
/**
 * A component used to show data in a LED-like
 * horizontal bar visualization.
 */
let LedGauge = class LedGauge extends BasicElement {
    constructor() {
        super();
        /**
         * Value of bar for top legend position
         * Value can be -100 to 100
         */
        this.topValue = null;
        /**
         * Value of bar for bottom legend position
         * Value can be -100 to 100
         */
        this.bottomValue = null;
        /**
         * Value of range. eg [-20, 70]
         */
        this.range = [];
        /**
         * Label to be displayed in the top legend
         */
        this.topLabel = '';
        /**
         * Label to be displayed in the bottom legend
         */
        this.bottomLabel = '';
        /**
         * Label to be displayed in the bottom legend
         * when a range is displayed
         * and no bottom text is already set.
         */
        this.rangeLabel = '';
        /**
         * Turn off background color and use grey
         * @default false
         */
        this.neutralColor = false;
        this._zero = ZERO_MAP.CENTER;
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
        padding: 20px;
        box-sizing: border-box;
      }

      [part=label] {
        display: block;
        position: absolute;
        left: 0;
        bottom: 100%;
        width: 100%;
        margin-left: -50%;
        text-align: center;
        box-sizing: border-box;
        user-select: none;
        pointer-events: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      #top {
        color: var(--top-selected-color, transparent);
      }

      #bottom, #range {
        top: 100%;
        bottom: auto;
        color: var(--bottom-selected-color, transparent);
      }

      #range {
        color: var(--range-color, transparent);
      }

      section {
        position: relative;
        height: 100%;
      }

      ef-canvas {
        width: 100%;
        height: 100%;
        display: block;
      }
    `;
    }
    /**
     * Sets the zero scale position. [center, left, right]
     * @default center
     */
    get zero() {
        return this._zero;
    }
    set zero(val) {
        const oldValue = this._zero;
        const value = val.toLowerCase();
        const pos = [ZERO_MAP.LEFT, ZERO_MAP.CENTER, ZERO_MAP.RIGHT];
        if (pos.includes(value)) {
            this._zero = value;
        }
        else {
            this._zero = ZERO_MAP.CENTER;
        }
        void this.requestUpdate('zero', oldValue);
    }
    get _shadowRoot() {
        if (!this.shadowRoot) {
            throw new Error('Your browser not support Shadow DOM or your Shadow DOM is closed.');
        }
        return this.shadowRoot;
    }
    /**
     * Canvas in ef-canvas
     */
    get canvas() {
        const efCanvas = this._shadowRoot.querySelector('ef-canvas');
        if (efCanvas && efCanvas.shadowRoot) {
            return efCanvas.shadowRoot.getElementById('canvas');
        }
        else {
            throw new Error('ef-canvas is not defined.');
        }
    }
    /**
     * The 2 dimensional context of the canvas, used for drawing
     */
    get ctx() {
        return this.canvas.getContext('2d');
    }
    /**
     * Min value of gauge
     * @default 0
     */
    get min() {
        return this.zero !== ZERO_MAP.CENTER ? 0 : -this.max;
    }
    /**
     * Max value of gauge
     * @default 100
     */
    get max() {
        return MAX_VALUE;
    }
    /**
     * Invoked whenever the element is update
     * @param changedProperties changed properties
     * @returns {void}
     */
    update(changedProperties) {
        super.update(changedProperties);
        // re-render canvas every time properties,  has been updated
        this.renderBarGauge();
    }
    /**
     * @param barCount bar count for calculate positions
     * @param val value for calculate positions
     * @returns value bar index
     */
    getValueBarIndex(barCount, val) {
        if (val === null) {
            return null;
        }
        if (val < this.min) {
            val = this.min;
        }
        else if (val > this.max) {
            val = this.max;
        }
        const positions = (barCount - 1);
        if (this.zero === ZERO_MAP.LEFT) {
            return Math.round(positions * val / this.max);
        }
        if (this.zero === ZERO_MAP.RIGHT) {
            return Math.round(positions - positions * val / this.max);
        }
        return Math.round(positions * (val / 2 + this.max / 2) / this.max);
    }
    /**
     * @param varName css variable name
     * @returns {void}
     */
    fillBarColor(varName) {
        if (this.ctx) {
            this.ctx.fillStyle = this.getComputedVariable(varName);
        }
    }
    /**
     * @param idx index of bar for find what section it belongs
     * @param sectionLength length of section for find section color
     * @param barAmount bar amount
     * @returns color variable name
     */
    getBarColor(idx, sectionLength, barAmount) {
        let barColor = '';
        if (this.neutralColor) {
            barColor = '--neutral-color';
        }
        else if (idx < Math.floor(sectionLength)) {
            barColor = '--left-segment-color';
        }
        else if (idx < Math.floor(sectionLength * 2)) {
            barColor = '--center-left-segment-color';
        }
        else if (idx < Math.floor(sectionLength * 2) + Math.ceil(sectionLength)) {
            barColor = '--center-segment-color';
        }
        else if (idx >= barAmount - Math.floor(sectionLength)) {
            barColor = '--right-segment-color';
        }
        else if (idx >= barAmount - Math.floor(sectionLength * 2)) {
            barColor = '--center-right-segment-color';
        }
        else {
            barColor = '--center-segment-color';
        }
        return barColor;
    }
    /**
     * @param id id of the label can be top, bottom or range
     * @param labelPos position of label in pixel
     * @returns {void}
     */
    updateLabelPosition(id, labelPos) {
        if (!labelPos) {
            return;
        }
        const elem = this._shadowRoot.getElementById(id);
        if (elem) {
            elem.style.left = labelPos;
        }
    }
    /**
     * Render a led-gauge bar in canvas
     * @returns {void}
     */
    renderBarGauge() {
        if (!this.isConnected || !this.canvas) {
            return;
        }
        const barWidth = parseInt(this.getComputedVariable('--led-width', '9px'), 10);
        const barSpacing = parseInt(this.getComputedVariable('--led-spacing', '4px'), 10);
        const barTotalWidth = barWidth + barSpacing;
        const width = parseInt(this.canvas.style.width, 10);
        const height = parseInt(this.canvas.style.height, 10);
        let barAmount = Math.floor(width / barTotalWidth);
        // To ensure we have middle bar
        if (barAmount % 2 === 0) {
            barAmount--;
        }
        const topValueBarIndex = this.getValueBarIndex(barAmount, this.topValue);
        const bottomValueBarIndex = this.getValueBarIndex(barAmount, this.bottomValue);
        const sectionLength = barAmount / SECTION_DIVIDER; // devided gauge to 5 sections
        const spacingOffset = barSpacing / 2;
        const basePos = width / 2 - barAmount / 2 * barTotalWidth + spacingOffset; // starter point
        const rangeValueBarIndexes = [];
        let rangeMidIndex = 0;
        // Find value bar indexes and mid position of bar gauge
        if (this.range && this.range.length === 2) {
            this.neutralColor = true;
            const range = [];
            for (let i = 0; i < this.range.length; i++) {
                const index = this.getValueBarIndex(barAmount, this.range[i]);
                if (index !== null) {
                    range.push(index);
                }
            }
            for (let val = range[0]; val <= range[1]; val++) {
                rangeValueBarIndexes.push(val);
            }
            const midPos = Math.floor(rangeValueBarIndexes.length / 2);
            rangeMidIndex = rangeValueBarIndexes[midPos];
        }
        // Reset canvas before starting painted
        this.ctx.clearRect(0, 0, width, height);
        // Start painting
        for (let i = 0; i < barAmount; i++) {
            this.ctx.fillStyle = 'transparent';
            let isHitValue = false;
            // Found top value position
            if (i === topValueBarIndex) {
                this.fillBarColor('--top-selected-color');
                isHitValue = true;
            }
            // Found bottom value position
            if (i === bottomValueBarIndex) {
                // In case top & bottom value are in the same position
                if (i === topValueBarIndex) {
                    this.fillBarColor('--clash-color');
                }
                else {
                    this.fillBarColor('--bottom-selected-color');
                }
                isHitValue = true;
            }
            // Get section color and fill the bar color
            if (!isHitValue) {
                // Painted range color first to allow override bar color
                if (rangeValueBarIndexes.includes(i)) {
                    this.fillBarColor('--range-color');
                }
                else {
                    const barColor = this.getBarColor(i, sectionLength, barAmount);
                    this.fillBarColor(barColor);
                }
            }
            const barHeight = isHitValue ? height : Math.round(height * 0.47);
            // Draw a bar
            this.ctx.fillRect(Math.round(basePos + i * barTotalWidth), // x
            Math.round(height / 2 - barHeight / 2), // y
            barWidth, // width
            barHeight // height
            );
        }
        const labelOffset = barWidth / 2;
        // Calculate label position
        const getLabelPos = (idx) => {
            if (idx === null) {
                return '';
            }
            return `${Math.round(basePos + idx * barTotalWidth + labelOffset)}px`;
        };
        // Updated top label position
        if (this.topValue !== null) {
            this.updateLabelPosition('top', getLabelPos(topValueBarIndex));
        }
        // Updated bottom label position
        if (this.bottomValue !== null) {
            this.updateLabelPosition('bottom', getLabelPos(bottomValueBarIndex));
        }
        // Updated range label position
        if (this.range && this.range.length === 2) {
            this.updateLabelPosition('range', getLabelPos(rangeMidIndex));
        }
    }
    /**
     * @param value value of gauge bar
     * @param label user label
     * @param id id of template
     * @returns template to render
     */
    createLabelTemplate(value, label, id) {
        if (value === null) {
            return null;
        }
        const template = html `<span part="label" id=${id}>${label}</span>`;
        if (typeof value === 'number') {
            return template;
        }
        // Value is a range type
        else {
            if (value && value.length === 2 && !(this.bottomLabel && typeof this.bottomValue === 'number')) {
                return template;
            }
            return null;
        }
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return html `
      <section>
        <ef-canvas @resize=${this.renderBarGauge.bind(this)}></ef-canvas>
        ${this.createLabelTemplate(this.topValue, this.topLabel, 'top')}
        ${this.createLabelTemplate(this.bottomValue, this.bottomLabel, 'bottom')}
        ${this.createLabelTemplate(this.range, this.rangeLabel, 'range')}
      </section>
    `;
    }
};
__decorate([
    property({ type: Number, attribute: 'top-value' })
], LedGauge.prototype, "topValue", void 0);
__decorate([
    property({ type: Number, attribute: 'bottom-value' })
], LedGauge.prototype, "bottomValue", void 0);
__decorate([
    property({ type: Array })
], LedGauge.prototype, "range", void 0);
__decorate([
    property({ type: String, attribute: 'top-label' })
], LedGauge.prototype, "topLabel", void 0);
__decorate([
    property({ type: String, attribute: 'bottom-label' })
], LedGauge.prototype, "bottomLabel", void 0);
__decorate([
    property({ type: String, attribute: 'range-label' })
], LedGauge.prototype, "rangeLabel", void 0);
__decorate([
    property({ type: Boolean, attribute: 'neutral-color' })
], LedGauge.prototype, "neutralColor", void 0);
__decorate([
    property({ type: String })
], LedGauge.prototype, "zero", null);
LedGauge = __decorate([
    customElement('ef-led-gauge', {
        alias: 'sapphire-led-gauge'
    })
], LedGauge);
export { LedGauge };
//# sourceMappingURL=index.js.map