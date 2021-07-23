import { BasicElement, SVGTemplateResult } from '@refinitiv-ui/core';
/**
 * Element base class usually used
 * for creating palettes elements.
 */
export declare class Palettes extends BasicElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    private colorSelector?;
    private colorSelectorShadow?;
    /**
     * Color value in hex
     */
    value: string;
    /**
     * Create selector template
     * @return {SVGTemplateResult} selector template
     */
    protected get SelectorTemplate(): SVGTemplateResult;
    /**
     * Hide selector element
     * @return {void}
     */
    protected hideSelector(): void;
    /**
     * Show selector element on specific points
     * @return {void}
     * @param points points of colorSelector
     */
    protected showSelector(points: string): void;
    /**
     * Update color value when tab on color item
     * @param event mouse event
     * @return {void}
     */
    protected onTapItem: (event: MouseEvent) => void;
    /**
     * Update color value when drag on color item
     * @param event mouse event
     * @return {void}
     */
    protected onMousemove: (event: MouseEvent) => void;
    /**
     * Update color value when drag on color item in mobile device
     * @param event touch event
     * @return {void}
     */
    protected onTouchmove: (event: TouchEvent) => void;
    /**
     * Update color value and fired value-changed event
     * @param element target element to get value
     * @return {void}
     */
    protected updateValue(element: SVGAElement): void;
}
