import { ResponsiveElement, TemplateResult, CSSResult, PropertyValues } from '@refinitiv-ui/core';
/**
 * Layout component for creating responsive applications and components
 * @fires resize - Fired when the element's size changes.
 */
export declare class Layout extends ResponsiveElement {
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
    static get styles(): CSSResult | CSSResult[];
    /**
     * Displays debug lines.
     * @type {boolean}
     */
    debug: boolean;
    /**
     * Tells the element to display flex,
     * displaying children in a row wrap layout.
     */
    flex: boolean;
    /**
     * Tells the element to display as a container,
     * displaying children in a vertical nowrap layout.
     */
    container: boolean;
    /**
     * Prevents the element from being flexible,
     * when inside of another flex layout.
     */
    noflex: boolean;
    /**
     * Prevents wrapping flex items,
     * when the parent isn't a container.
     */
    nowrap: boolean;
    /**
     * Makes the element a scrollable viewport.
     */
    scrollable: boolean;
    /**
     * Sets the fixed size of the element.
     * Value could be pixel, percents or auto.
     */
    size: string | null;
    /**
     * Sets the rough size of the element based on other siblings and content.
     * Value could be pixel, percents or auto.
     */
    basis: string | null;
    /**
     * Allows the width to shrink below its contents.
     * Also prevents the width from shrinking past a certain point.
     * Value could be pixel, percents or _empty_.
     */
    minWidth: string | null;
    /**
     * Allows the height to shrink below its contents.
     * Also prevents the height from shrinking past a certain point.
     * Value could be pixel, percents or _empty_.
     */
    minHeight: string | null;
    /**
     * Prevents the width from expanding past a certain point.
     * Value could be pixel, percents or _empty_.
     */
    maxWidth: string | null;
    /**
     * Prevents the height from expanding past a certain point.
     * Value could be pixel, percents or _empty_.
     */
    maxHeight: string | null;
    /**
     * Invoked whenever the element is updated
     * @param {PropertyValues} changedProperties Map of changed properties with old values
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
