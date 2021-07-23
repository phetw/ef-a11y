import { ResponsiveElement, TemplateResult, CSSResult, PropertyValues } from '@refinitiv-ui/core';
import '../tooltip';
/**
 * Displays a text with alternative truncation
 */
export declare class Label extends ResponsiveElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @returns CSS template
     */
    static get styles(): CSSResult | CSSResult[];
    /**
     * Enable shortening the slot content
     */
    truncate: 'center' | '' | null | undefined;
    /**
     * Limit the number of lines before truncating
     */
    maxLine: null;
    /**
     * Set state to error
     */
    error: boolean;
    /**
     * Set state to warning
     */
    warning: boolean;
    /**
     * Use to set title attribute for tooltip
     */
    private span;
    /**
     * Use to prevent resizes observer in certain use cases
     */
    private updateTimer;
    /**
     * Store trimmed text content
     */
    private rawText;
    /**
     * Tooltip state when truncate = center
     */
    private enableTooltip;
    private mutationObserver?;
    /**
     * The lifecycle method called when properties changed first time
     * @param changedProperties properties it's the Map object which has the updated properties
     * @returns {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * Called when the element’s DOM has been updated and rendered
     * @param changedProperties Properties that has changed
     * @returns shouldUpdate
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Used to prevent handler fired when previous content are the same as last content
     */
    private previousContent;
    /**
     * Handle statement after slot or innerHTML has been changed
     * @returns void
     */
    private handleSlotChange;
    /**
     * Restore text content
     * @returns {void}
     */
    private restoreTextContent;
    /**
     * concatenating all of text content in the slots
     * @returns trimmed text content
     */
    private retrieveSlotContent;
    /**
     * Get element width minus padding
     * @param node parent node that wrapper text node
     * @returns {number} width minus padding
     */
    private getElementWidthMinusPadding;
    /**
     * Truncate a long string in the middle and add an ellipsis.
     * @param parentNode parent node
     * @param textNode text node
     * @param fullText string
     * @returns {void}
     */
    private middleEllipsis;
    /**
     * Handle text ellipsis and tooltip state when element has been resized
     * @returns void
     */
    private onResize;
    /**
     * Handle tooltip statement when properties changed
     * @returns void
     */
    private updateTooltip;
    /**
     * private method but can't override
     * access modifiers in typescript.
     * @ignore
     * @param size element dimensions
     * @returns {void}
     */
    resizedCallback(): void;
    /**
     * Determine show/hide tooltip state
     * @returns {boolean} true if center truncate or the element is smaller than a parent
     */
    private isShowTooltip;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    protected render(): TemplateResult;
}
