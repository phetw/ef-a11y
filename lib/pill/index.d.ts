import { ControlElement, CSSResult, PropertyValues, TemplateResult } from '@refinitiv-ui/core';
import '../icon';
/**
 * A small button style component
 * which is used to show one or multiple selected item.
 * It is rarely used in the UI but inside other components to visualize multiple item selection item.
 * @attr {string} value - Value of pill
 * @prop {string} value - Value of pill
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @fires clear - Dispatched when click on cross button occurs
 */
export declare class Pill extends ControlElement {
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
    static get styles(): CSSResult;
    /**
     * Set pill to clearable
     */
    clears: boolean;
    /**
     * Set pill to toggle mode
     */
    toggles: boolean;
    /**
     * Add to pill for active state
     */
    active: boolean;
    /**
     * Set property pressed true on tap start and false on tap end
     */
    private pressed;
    private closeElement?;
    protected firstUpdated(changedProperties: PropertyValues): void;
    private get closeTemplate();
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    protected render(): TemplateResult;
    /**
     * change state of `pressed` property to be true if there is no close icon or pill is pressed directly
     * @param event tapstart event
     * @returns {void}
     */
    private onStartPress;
    /**
     * @param event tapstart
     * @returns true if element property pressed could be set
     */
    private couldBePressed;
    /**
     * change state of `pressed` property to be false if mouse leave pill or tap is end on pill
     * @returns {void}
     */
    private onEndPress;
    /**
     * handle when `clears` icon is tapped
     * @returns {void}
     */
    private onTapHandler;
    /**
     * @param event event from close button
     * @returns {void}
     */
    private clear;
}
