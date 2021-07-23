import { ResponsiveElement, CSSResult, TemplateResult } from '@refinitiv-ui/core';
/**
 * A private element to find overlay size boundaries
 */
export declare class OverlayViewport extends ResponsiveElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    private static Template;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return CSS template
     */
    static get styles(): CSSResult;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render(): TemplateResult;
}
