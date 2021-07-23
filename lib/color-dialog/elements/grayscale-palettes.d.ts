import { TemplateResult, CSSResult, PropertyValues } from '@refinitiv-ui/core';
import { Palettes } from './palettes';
/**
 * Component that allows user to select any
 * grayscale color by tapping or dragging
 */
export declare class GrayscalePalettes extends Palettes {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return {CSSResult | CSSResult[]} CSS template
     */
    static get styles(): CSSResult | CSSResult[];
    /**
     * Set the palettes to activate no-color option
     */
    allowNocolor: boolean;
    /**
     * Create grayscale items template from GRAYSCALE_ITEMS array
     * @return grayscale items template
     */
    private get GrayscaleItemsTemplate();
    /**
     * Create no color item template
     * @return no color item template
     */
    private get NoColorItemTemplate();
    /**
     * Update color selector element when value has been changed
     * @param changedProperties Properties that has changed
     * @return {void}
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Update color value and fired value-changed event
     * @param element target element to get value
     * @return {void}
     */
    protected updateValue(element: SVGAElement): void;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    protected render(): TemplateResult;
}
