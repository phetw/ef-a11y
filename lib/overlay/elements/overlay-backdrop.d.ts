import { BasicElement, CSSResult, TemplateResult } from '@refinitiv-ui/core';
import { NullOrUndefined } from '../helpers/types';
/**
 * A private element to show backdrop for overlay
 */
export declare class OverlayBackdrop extends BasicElement {
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
     * Set a specific z-index to override automatically calculated z-index
     * @param zIndex zIndex value
     */
    set zIndex(zIndex: number | NullOrUndefined);
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render(): TemplateResult;
}
