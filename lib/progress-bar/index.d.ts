import { JSXInterface } from '../jsx';
import { CSSResult, TemplateResult, BasicElement, PropertyValues } from '@refinitiv-ui/core';
/**
 * Data visualisation component,
 * showing a simple percentage bar.
 * @slot label - Overrides the label property and places custom content. Useful for modifying the color, or, adding icons.
 */
export declare class ProgressBar extends BasicElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    private valuePrevious;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return CSS template
     */
    static get styles(): CSSResult;
    /**
     * The current value of the bar.
     * This can range from `0-100` and
     * will be represented as a percentage bar
     */
    value: string;
    /**
     * The alignment of the bar.
     * The bar can either start from the `left` or `right`.
     */
    alignment: string;
    /**
     * The current label to be displayed next to the bar.
     * This is affixed to the end of the bar, so make sure to cater for this.
     */
    label: string;
    /**
     * Converts value from string to number for calculations
     * @returns value of bar as a number
     */
    private get valueNumber();
    /**
     * Gets the current part names for the internal bar
     */
    private get barParts();
    /**
     * Calculates the bar's percentage width
     */
    private get barFill();
    /**
     * Returns CSS styles for showing
     * the bar's fill percentage.
     */
    private get barStyle();
    /**
     * Called after an update has occurred
     * @param changedProperties changed properties
     * @returns {void}
     */
    protected updated(changedProperties: PropertyValues): void;
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
    'ef-progress-bar': ProgressBar;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-progress-bar': Partial<ProgressBar> | JSXInterface.HTMLAttributes<ProgressBar>;
    }
  }
}

export {};
