var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BasicElement, html, css, customElement, property, queryAll, repeat } from '@refinitiv-ui/core';
import { VERSION } from '../';
/**
 * Star visualisation component that is generally used for ranking
 * @fires value-changed - Fired when the `value` changes.
 */
let Rating = class Rating extends BasicElement {
    constructor() {
        super(...arguments);
        this.items = [];
        this.valuePrevious = 0;
        /**
         * Make it possible to interact with rating control and change the value
         */
        this.interactive = false;
        /**
          * Set number of total stars
          */
        this.max = '5';
        /**
          * Set number of selected stars. Value can be any number between 0 and `max`.
          * Decimal values are calculated to empty star (0 - .25); half-star (.25 - .75) and full star (.75 - 1)
          */
        this.value = '0';
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
        return VERSION;
    }
    /**
     * Converts value from string to number for calculations
     * @returns value of rating as a number
     */
    get valueNumber() {
        const value = parseFloat(this.value);
        if (!this.value || isNaN(value)) {
            return 0;
        }
        return value;
    }
    /**
     * Converts max value from string to number for calculations
     * @returns maximum value of rating as a number
     */
    get maxNumber() {
        let max = parseFloat(this.max);
        if (!this.max || isNaN(max)) {
            return 5;
        }
        // Prevent decimal max value
        max = max % 1 === 0 ? max : Math.round(max);
        return max;
    }
    /**
     * Compute rating based on max number of stars and value.
     * Note: to speed up the component, hover state is implemented using CSS only.
     * CSS3 specification does not allow to select items preceding the hover, but allows to select the following items.
     * Therefore `flex: reverse` style is applied and the items are constructed in the reverse mode to mimic the correct behaviour.
     * @param {Number} max Number of stars
     * @param {Number} value Value
     * @returns {void}
     */
    computeRating(max, value) {
        this.items = [];
        for (let i = 0; i < max; i += 1) {
            const reverseIdx = value - (max - i) + 1;
            const v = reverseIdx > 0 ? Math.min(1, reverseIdx) : 0;
            const selected = v >= 0.75 ? 'full' : v >= 0.25 ? 'half' : false;
            this.items.push({ item: selected ? `icon icon-${selected}` : 'icon' });
        }
        this.valuePrevious = value;
        void this.requestUpdate();
    }
    /**
     * Process click event to set the new value
     * @param {number} index index of star
     * @returns {void}
     */
    handleTap(index) {
        if (!this.interactive) {
            return;
        }
        const valueIndex = this.maxNumber - index;
        if (this.valuePrevious !== valueIndex) {
            this.value = valueIndex.toString();
            // Dispatch Event when value change
            this.notifyPropertyChange('value', this.value);
        }
    }
    /**
     * Invoked whenever the element properties are updated
     * @param changedProperties changed properties
     * @returns {void}
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        changedProperties.forEach((oldValue, propName) => {
            if (propName === 'value') {
                this.value = this.valueNumber.toString();
                this.computeRating(this.maxNumber, this.valueNumber);
            }
            else if (propName === 'max') {
                this.max = this.maxNumber.toString();
                this.computeRating(this.maxNumber, this.valueNumber);
            }
        });
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
        display: inline-block;
      }
    `;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return html `<div part="container">
      ${repeat(this.items, (i, index) => html `<div part="${i.item}" @tap="${() => this.handleTap(index)}"></div>`)}
    </div>`;
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], Rating.prototype, "interactive", void 0);
__decorate([
    property({ type: String })
], Rating.prototype, "max", void 0);
__decorate([
    property({ type: String, reflect: true })
], Rating.prototype, "value", void 0);
__decorate([
    queryAll('[part~="icon"]')
], Rating.prototype, "stars", void 0);
Rating = __decorate([
    customElement('ef-rating', {
        alias: 'sapphire-rating'
    })
], Rating);
export { Rating };
//# sourceMappingURL=index.js.map