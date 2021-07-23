import { PropertyValues, TemplateResult, CSSResult } from '@refinitiv-ui/core';
import { Collapse } from '../collapse';
/**
 * Used to display a group of `Collapse` control.
 * Only one item will be able to expand by default but you can customize its behavior.
 *
 * @slot header-left - Slot to add custom contents to the left side of header e.g. ef-icon, ef-checkbox
 * @slot header-right - Slot to add custom contents to the right side of header e.g. ef-icon, ef-checkbox
 *
 */
export declare class Accordion extends Collapse {
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
     * Allow multiple sections expand at the same time
     */
    autoCollapseDisabled: boolean;
    /**
     * Add spacing to content section in all collapse items
     */
    spacing: boolean;
    /**
     * Allow the collapse animation to be disabled
     */
    collapseAnimationDisabled: boolean;
    /**
     * Called once after the component is first rendered
     * @param changedProperties map of changed properties with old values
     * @returns {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * handle bubbled clicks from items
     * @param event the click event object
     * @return void
     */
    private handleClick;
    /**
     * get a list of items
     * @returns array of accordion items
     */
    private getChildItems;
    /**
     * collapse non selected child items on click
     * @param target currently selected item
     * @return void
     */
    private processChildrenOnClick;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    protected render(): TemplateResult;
}
