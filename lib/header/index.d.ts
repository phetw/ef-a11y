import { BasicElement, TemplateResult, CSSResult } from '@refinitiv-ui/core';
/**
 * Use to identify and separate different sections of a page.
 * Headers helps to organize the page layout content into
 * a sensible hierarchy and improve the user experience.
 *
 * @slot left - Slot to add custom contents to the left side of header e.g. ef-icon, ef-checkbox
 * @slot right - Slot to add custom contents to the right side of header e.g. ef-icon, ef-checkbox
 */
export declare class Header extends BasicElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * Style definition
     * @return CSS template
     */
    static get styles(): CSSResult | CSSResult[];
    /**
     * Use level styling from theme
     */
    level: '1' | '2' | '3';
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    protected render(): TemplateResult;
}
