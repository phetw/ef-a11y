import { JSXInterface } from '../jsx';
import { TemplateResult, CSSResult, PropertyValues, ResponsiveElement, ElementSize } from '@refinitiv-ui/core';
import '../button';
/**
 * Container for tabs
 */
export declare class TabBar extends ResponsiveElement {
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
     * Specify tab's horizontal alignment
     */
    alignment: 'left' | 'center' | 'right';
    /**
     * Use level styling from theme
     */
    level: '1' | '2' | '3';
    /**
     * Use to switch from horizontal to vertical layout.
     */
    vertical: boolean;
    private content;
    private leftBtn;
    private rightBtn;
    private isScrolling;
    /**
     * Called after the element’s DOM has been updated the first time.
     * register scroll event on content element to toggle scroll button
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * Called when the element’s DOM has been updated and rendered
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * private method but can't override
     * access modifiers in typescript.
     * @ignore
     * @param size element dimensions
     * @returns {void}
     */
    resizedCallback(size: ElementSize): void;
    /**
     * Hide all scroll buttons
     * @returns {void}
     */
    private hideScrollButtons;
    /**
     * Hide/Show scroll button when element is overflow.
     * @param elementWidth width of element
     * @returns {void}
     */
    private toggleScrollButton;
    /**
     * Set tab level attribute accordingly
     * @returns {void}
     */
    private setLevel;
    /**
     * Detects when slot changes
     * @returns {void}
     */
    private onSlotChange;
    /**
     * Update scroll position when clicked on left button
     * @returns {void}
     */
    private handleScrollLeft;
    /**
     * Update scroll position when clicked on right button
     * @returns {void}
     */
    private handleScrollRight;
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
    'ef-tab-bar': TabBar;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-tab-bar': Partial<TabBar> | JSXInterface.HTMLAttributes<TabBar>;
    }
  }
}

export {};
