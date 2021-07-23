import { BasicElement, CSSResult, TemplateResult } from '@refinitiv-ui/core';
/**
 * A container for components.
 * It provides a standard background color and padding, depends on theme.
 */
export declare class Panel extends BasicElement {
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
     * Apply default padding from theme
     */
    spacing: boolean;
    /**
     * Set panel background to transparent
     */
    transparent: boolean;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    protected render(): TemplateResult;
}
