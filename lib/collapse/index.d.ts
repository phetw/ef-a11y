import { JSXInterface } from '../jsx';
import { BasicElement, CSSResult, PropertyValues, TemplateResult } from '@refinitiv-ui/core';
import '../header';
import '../panel';
import '../icon';
/**
 * Allows users to hide non-critical information
 * or areas of the screen, maximizing the amount of real estate
 * for their primary displays.
 *
 * @fires expanded-changed - Fired when the `expanded` property changes.
 *
 * @slot header-left - Slot to add custom contents to the left side of header e.g. ef-icon, ef-checkbox
 * @slot header-right - Slot to add custom contents to the right side of header e.g. ef-icon, ef-checkbox
 */
export declare class Collapse extends BasicElement {
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
     * Set text on the header
     */
    header: string | null;
    /**
     * Use level styling from theme
     */
    level: '1' | '2' | '3';
    /**
     * Set to expand the item
     */
    expanded: boolean;
    /**
     * Set to apply padding from theme to content section
     */
    spacing: boolean;
    /**
     * An ef-panel wrapper
     */
    private panelHolder;
    /**
     * A panel used to display content
     */
    private panel;
    /**
     * Called once after the component is first rendered
     * @param changedProperties map of changed properties with old values
     * @returns {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * Invoked whenever the element is updated
     * @param changedProperties map of changed properties with old values
     * @return {void}
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Toggle the item
     * @returns {void}
     */
    private toggle;
    /**
     * Check if target is a header
     * @param element for checking
     * @returns {boolean} true if target is ef-header
     */
    private static isHeader;
    /**
     * Handle tap on the item header, will toggle the expanded state
     * @param event Event object
     * @returns {void}
     */
    private handleTap;
    /**
     * Show or Hide the item depending on the expanded state
     * @returns {void}
     */
    private showHide;
    /**
     * Set current content height at the target-height
     * @param height number or null value
     * @returns {void}
     */
    private setAnimationTargetHeight;
    /**
     * Gets the height of the ef-panel element which contains the content
     * will pass height including optional spacing
     * @returns clientHeight of the panel so that the panel holder max-height can be set
     */
    private getContentHeight;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    protected render(): TemplateResult;
}
//# sourceMappingURL=index.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-collapse': Collapse;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-collapse': Partial<Collapse> | JSXInterface.HTMLAttributes<Collapse>;
    }
  }
}

export {};
