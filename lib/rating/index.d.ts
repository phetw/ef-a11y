import { JSXInterface } from '../jsx';
import { BasicElement, TemplateResult, CSSResult, PropertyValues } from '@refinitiv-ui/core';
/**
 * Star visualisation component that is generally used for ranking
 * @fires value-changed - Fired when the `value` changes.
 */
export declare class Rating extends BasicElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    private items;
    private valuePrevious;
    /**
     * Make it possible to interact with rating control and change the value
     */
    interactive: boolean;
    /**
      * Set number of total stars
      */
    max: string;
    /**
      * Set number of selected stars. Value can be any number between 0 and `max`.
      * Decimal values are calculated to empty star (0 - .25); half-star (.25 - .75) and full star (.75 - 1)
      */
    value: string;
    /**
     * Get stars element of container
     */
    private stars;
    /**
     * Converts value from string to number for calculations
     * @returns value of rating as a number
     */
    private get valueNumber();
    /**
     * Converts max value from string to number for calculations
     * @returns maximum value of rating as a number
     */
    private get maxNumber();
    /**
     * Compute rating based on max number of stars and value.
     * Note: to speed up the component, hover state is implemented using CSS only.
     * CSS3 specification does not allow to select items preceding the hover, but allows to select the following items.
     * Therefore `flex: reverse` style is applied and the items are constructed in the reverse mode to mimic the correct behaviour.
     * @param {Number} max Number of stars
     * @param {Number} value Value
     * @returns {void}
     */
    private computeRating;
    /**
     * Process click event to set the new value
     * @param {number} index index of star
     * @returns {void}
     */
    private handleTap;
    /**
     * Invoked whenever the element properties are updated
     * @param changedProperties changed properties
     * @returns {void}
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @returns CSS template
     */
    static get styles(): CSSResult | CSSResult[];
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
    'ef-rating': Rating;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-rating': Partial<Rating> | JSXInterface.HTMLAttributes<Rating>;
    }
  }
}

export {};
