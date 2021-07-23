import { ResponsiveElement, TemplateResult, CSSResult, ElementSize } from '@refinitiv-ui/core';
import './tornado-item';
/**
 * A data visualization that helps to
 * show the differences or similarities between values
 * @slot header - Any HTML contents to display at chart header section
 * @slot footer - Any HTML contents to display at chart footer section
 */
export declare class TornadoChart extends ResponsiveElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * Primary bar chart legend text
     */
    primary: string | null;
    /**
     * Secondary bar chart legend text
     */
    secondary: string | null;
    /**
     * A flag to keep component's responsive state
     */
    private isResponsive;
    /**
     * True if legend's alignment is vertical
     */
    private legendAlignment;
    /**
     * Set chart's legend alignment
     * @param responsive true if items needs to be responsive
     * @returns {void}
     */
    private setLegendAlignment;
    /**
     * Set ef-tornado-item's alignment
     * @param responsive true if items needs to be responsive
     * @returns {void}
     */
    private setItemAlignment;
    /**
     * Handles element's resize behavior
     * @ignore
     * @param {ElementSize} size size of the element
     * @returns {void}
     */
    resizedCallback(size: ElementSize): void;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return CSS template
     */
    static get styles(): CSSResult | CSSResult[];
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    protected render(): TemplateResult;
}
