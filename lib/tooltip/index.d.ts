import { JSXInterface } from '../jsx';
import { BasicElement, TemplateResult, CSSResult, PropertyValues } from '@refinitiv-ui/core';
import '../overlay';
import { OverlayTransitionStyle as TooltipTransitionStyle } from '../overlay';
import './elements/title-tooltip';
import { TooltipCondition, TooltipRenderer, TooltipPosition } from './helpers/types';
import { register as registerOverflowTooltip } from './helpers/overflow-tooltip';
/**
 * Tooltip displays extra information when the
 * user hovers the pointer over an item.
 */
declare class Tooltip extends BasicElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    private matchTarget;
    private matchTargetRect;
    private showDelay;
    private hideDelay;
    private clicked;
    private timerTimeout?;
    private contentNodes?;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return CSS template
     */
    static get styles(): CSSResult | CSSResult[];
    /**
     * True if an element is an iframe
     * @param relatedTarget Element to check
     * @returns isIframe
     */
    private static isIframe;
    /**
     * Check if the match target has moved position
     * @param matchTargetRect Match target rect
     * @param lastMatchTarget Previous match target
     * @returns matches
     */
    private static elementHasMoved;
    /**
    * CSS selector to match the tooltip
    */
    selector: string;
    /**
    * Provide a function to test against the target.
    * Return `true` if the target matches
    * @type {TooltipCondition}
    */
    condition: TooltipCondition | undefined;
    /**
    * A renderer to define tooltip internal content.
    * Return undefined, `String`, `HTMLElement` or `DocumentFragment`.
    * If the content is not present, tooltip will not be displayed
    * @type {TooltipRenderer}
    */
    renderer: TooltipRenderer | undefined;
    /**
    * The position of the tooltip. Use the following values:
    * `auto` (default) - display based on mouse enter coordinates
    * `above` - display above the element
    * `right` - display to the right of the element
    * `below` - display beneath the element
    * `left` - display to the left of the element
    */
    position: 'auto' | 'above' | 'right' | 'below' | 'left';
    /**
    * Set the transition style.
    * Value can be `fade`, `zoom`, `slide-down`, `slide-up`, `slide-right`,
    * `slide-left`, `slide-right-down`, `slide-right-up`, `slide-left-down`, `slide-left-up`, or null in case of no transition
    *  @type {TooltipTransitionStyle}
    */
    transitionStyle: TooltipTransitionStyle | null;
    /**
     * Get tooltip popup window
     * Used for testing and legacy
     */
    private tooltip;
    /**
     * Get position adjuster element.
     * Used to adjust offsets if transforms are used
     */
    private positionAdjusterEl;
    private contentSlot;
    private _x;
    /**
     * Set tooltip y coordinate
     * @param x X coordinate
     */
    private set x(value);
    private _y;
    /**
     * Set tooltip y coordinate
     * @param y Y coordinate
     */
    private set y(value);
    private _positionTarget;
    /**
     * Set tooltip position target
     * @param positionTarget Position target
     */
    private set positionTarget(value);
    private _opened;
    /**
     * Run when opened attribute has changed. Map to popup window
     * @param opened True if popup should be opened
     * @returns {void}
     */
    private setOpened;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * Clear all timers
     * @returns {void}
     */
    private reset;
    /**
     * Check whether an element matches by condition
     * If condition is not defined, checks by CSS selector
     * @param element Element to check
     * @param paths Event paths
     * @returns true if element matches
     */
    private isMatchElement;
    /**
     * Return true if the target matches condition. False otherwise
     * @param paths Target to match against
     * @returns matched element or null
     */
    private getMatchedElement;
    /**
     * Check if the autosuggest has content
     * @returns {Boolean} content exists
     * @private
     */
    private hasSlotContent;
    /**
     * Get content off the target element
     * @param target Target to check against
     * @returns contentNode or null
     */
    private getContentNode;
    /**
     * Render content based on render to tooltip
     * @param contentNode Content node to set
     * @returns {void}
     */
    private renderContentNode;
    /**
     * Hide tooltip
     * @returns {void}
     */
    private hideTooltip;
    /**
     * Reset tooltip
     * @returns {void}
     */
    private resetTooltip;
    /**
     * Run when mouse is moving over the document
     * @param event Mouse move event
     * @param paths Event paths
     * @returns {void}
     */
    private onMouseMove;
    /**
     * Try to show the tooltip if it matches the target
     * @param paths The paths leading to target
     * @param x X mouse coordinate
     * @param y Y mouse coordinate
     * @returns {void}
     */
    private showTooltip;
    /**
     * Get the delay to show tooltip
     */
    private get getTooltipShowDelay();
    /**
     * Show the tooltip corresponding to the correct position
     * @param matchTarget Target to show the tooltip against
     * @param x X coordinate
     * @param y Y coordinate
     * @returns {void}
     */
    private showTooltipAtPosition;
    /**
     * Run when document click or contextmenu event happens
     * @returns {void}
     */
    private onClick;
    /**
     * Run when document mouse out event happens
     * @returns {void}
     */
    private onMouseOut;
    /**
     * Get popup position based on tooltip position
     */
    private get tipPosition();
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @returns Render template
     */
    protected render(): TemplateResult;
    /**
     * true if tooltip is opened, false otherwise
     * @returns opened
     */
    private get opened();
}
export * from './elements/tooltip-element';
export { registerOverflowTooltip, Tooltip, TooltipCondition, TooltipRenderer, TooltipPosition, TooltipTransitionStyle };
//# sourceMappingURL=index.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-tooltip': Tooltip;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-tooltip': Partial<Tooltip> | JSXInterface.HTMLAttributes<Tooltip>;
    }
  }
}

export {};
