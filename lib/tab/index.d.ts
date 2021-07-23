import { TemplateResult, CSSResult, ControlElement } from '@refinitiv-ui/core';
import '../icon';
import '../label';
/**
 * A building block for individual tab
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @fires clear - Dispatched when click on cross button occurs
 */
export declare class Tab extends ControlElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * Specify icon name to display in tab
     */
    icon: string;
    /**
     * Specify tab's label text
     */
    label: string;
    /**
     * Specify tab's sub-label text
     */
    subLabel: string;
    /**
     * Specify tab's active status
     */
    active: boolean;
    /**
     * Set tab to clearable
     */
    clears: boolean;
    /**
     * Enable shortening the label
     */
    truncate: 'center' | '' | null | undefined;
    /**
     * Limit the number of lines before truncating
     */
    maxLine: string | null | undefined;
    /**
     * Set tab to clearable on hover
     */
    clearsOnHover: boolean;
    /**
     * Use level styling from theme
     * @ignore
     */
    level: '1' | '2' | '3';
    /**
     * True, if there is slotted content
     */
    private isSlotHasChildren;
    /**
     * @param node that should be checked
     * @returns whether node can be ignored.
     */
    private isIgnorable;
    /**
     * Checks slotted children nodes and updates component to refresh label and sub-label templates.
     * @param event slotchange
     * @returns {void}
     */
    private checkSlotChildren;
    /**
     * Omitted maxLine if subLabel is provided
     * @returns Max line value
     */
    private getMaxLine;
    /**
     * @param event event from close button
     * @returns {void}
     */
    private handleClickClear;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @returns CSS template
     */
    static get styles(): CSSResult | CSSResult[];
    /**
     * Show Close Button if allow clears
     * @returns close button template
     */
    private get CloseTemplate();
    /**
     * Create ef-label template when label is true
     * @returns Label template
     */
    private get LabelTemplate();
    /**
     * Create ef-label template when subLabel is true
     * @returns SubLabel template
     */
    private get SubLabelTemplate();
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    protected render(): TemplateResult;
}
