import { JSXInterface } from '../jsx';
import { BasicElement, TemplateResult, CSSResult } from '@refinitiv-ui/core';
/**
 * Displays a text with alternative truncation
 */
export declare class Label extends BasicElement {
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
     * Limit the number of lines before truncating
     */
    lineClamp: number;
    /**
     * Set state to error
     */
    error: boolean;
    /**
     * Set state to warning
     */
    warning: boolean;
    /**
     * Trimmed chunks of textual content
     */
    private chunks;
    /**
     * Mutation Observer used to detect changes in the Light DOM
     */
    private mutationObserver;
    /**
     * Render used to display the tooltip
     * @returns Tooltip text
     */
    protected tooltipRenderer: () => string;
    /**
     * Condition used to display the tooltip
     * @param target Tooltip target
     * @returns Whether the tooltip should be shown or not.
     */
    protected tooltipCondition: (target: HTMLElement) => boolean;
    /**
     * @override
     */
    connectedCallback(): void;
    /**
     * @override
     */
    disconnectedCallback(): void;
    /**
     * Decides whether the tooltip should b shown
     * @param tooltipTarget Target element passed by the tooltip condition
     * @returns True if the tooltip should be shown
     */
    protected shouldShowTooltip(tooltipTarget: HTMLElement): boolean;
    /**
     * Handles any modifications to the internal HTML
     * @param [mutation=false] is the request from a mutation event?
     * @returns {void}
     */
    protected recalculate(mutation?: boolean): void;
    /**
     * Returns cleaned version of `this.textContent`.
     */
    protected get text(): string;
    /**
     * Default template
     */
    protected get truncateTemplate(): TemplateResult;
    /**
     * Template for when line clamp is set
     */
    protected get clampTemplate(): TemplateResult;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    protected render(): TemplateResult;
}
//# sourceMappingURL=index.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-label': Label;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-label': Partial<Label> | JSXInterface.HTMLAttributes<Label>;
    }
  }
}

export {};
