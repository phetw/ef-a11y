import { BasicElement, TemplateResult, CSSResult, PropertyValues } from '@refinitiv-ui/core';
import '../icon';
/**
 * Used to display at the top of application to provide a status or information.
 * @slot right - place custom content on the right of bar.
 *
 * @fires clear - fired when clear button is clicked
 */
export declare class AppstateBar extends BasicElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     *
     * @returns {(CSSResult|CSSResult[])} CSS template
     */
    static get styles(): CSSResult | CSSResult[];
    /**
     * Text to display in heading section.
     */
    heading: string;
    /**
     * (optional) Type of state bar. Supported value are `info`, `highlight`.
     */
    state: 'info' | 'highlight' | null;
    /**
     * Invoked whenever the element is updated
     * @param {PropertyValues} changedProperties Map of changed properties with old values
     * @returns {void}
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Hide the element when clear button is clicked
     * @param {Event} event - event params
     * @fires AppstateBar#clear
     * @returns {void}
     */
    private clear;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    protected render(): TemplateResult;
}
