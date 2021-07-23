var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, property, customElement, styleMap, BasicElement } from '@refinitiv-ui/core';
import { VERSION } from '../';
/**
 * Data visualisation component,
 * showing a simple percentage bar.
 * @slot label - Overrides the label property and places custom content. Useful for modifying the color, or, adding icons.
 */
let ProgressBar = class ProgressBar extends BasicElement {
    constructor() {
        super(...arguments);
        this.valuePrevious = '';
        /**
         * The current value of the bar.
         * This can range from `0-100` and
         * will be represented as a percentage bar
         */
        this.value = '100';
        /**
         * The alignment of the bar.
         * The bar can either start from the `left` or `right`.
         */
        this.alignment = 'left';
        /**
         * The current label to be displayed next to the bar.
         * This is affixed to the end of the bar, so make sure to cater for this.
         */
        this.label = '';
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
      height: 10px;
      display: flex;
      position: relative;
    }
    [part~=bar] {
      height: 100%;
      position: relative;
    }
    [part=label] {
      position: absolute;
      top: 50%;
      left: 100%;
      height: 0;
      line-height: 0;
      white-space: nowrap;
      margin-left: 10px;
    }
    :host([alignment=right]) {
      justify-content: flex-end;
    }
    :host([alignment=right]) [part=label] {
      left: auto;
      right: 100%;
      margin-left: 0;
      margin-right: 10px;
    }
    :host [part~=bar-zero] [part=label] {
      margin: 0;
    }
    `;
    }
    /**
     * Converts value from string to number for calculations
     * @returns value of bar as a number
     */
    get valueNumber() {
        const value = parseFloat(this.value);
        if (!this.value || isNaN(value)) { // check value is invalid
            const valuePrevious = parseFloat(this.valuePrevious);
            // if valuePrevious is invalid return default value 100
            return !valuePrevious || isNaN(valuePrevious) ? 100 : valuePrevious;
        }
        return value;
    }
    /**
     * Gets the current part names for the internal bar
     */
    get barParts() {
        return this.barFill ? 'bar' : 'bar bar-zero';
    }
    /**
     * Calculates the bar's percentage width
     */
    get barFill() {
        return Math.min(100, Math.max(0, this.valueNumber));
    }
    /**
     * Returns CSS styles for showing
     * the bar's fill percentage.
     */
    get barStyle() {
        return {
            width: `${this.barFill}%`,
            minWidth: `${this.barFill ? 1 : 0}px`
        };
    }
    /**
     * Called after an update has occurred
     * @param changedProperties changed properties
     * @returns {void}
     */
    updated(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            if (propName === 'value') {
                this.valuePrevious = oldValue;
                this.value = this.valueNumber.toString();
            }
        });
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return html `
    <div part="${this.barParts}" style="${styleMap(this.barStyle)}">
      <span part="label">
        <slot name="label">${this.label}</slot>
      </span>
    </div>
    `;
    }
};
__decorate([
    property({ type: String })
], ProgressBar.prototype, "value", void 0);
__decorate([
    property({ type: String, reflect: true })
], ProgressBar.prototype, "alignment", void 0);
__decorate([
    property({ type: String })
], ProgressBar.prototype, "label", void 0);
ProgressBar = __decorate([
    customElement('ef-progress-bar', {
        alias: 'sapphire-bar'
    })
], ProgressBar);
export { ProgressBar };
//# sourceMappingURL=index.js.map