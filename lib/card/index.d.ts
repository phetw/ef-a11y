import { JSXInterface } from '../jsx';
import { BasicElement, TemplateResult, CSSResult, PropertyValues } from '@refinitiv-ui/core';
import '../label';
import '../icon';
import '../overlay-menu';
import { CardConfig } from './helpers/types';
export { CardConfig };
/**
 * A card frame component.
 *
 * @fires item-trigger - Fired when card menu is selected.
 *
 * @slot header - Adds slotted content into the header of the card.
 * @slot footer - Adds slotted content into the footer of the card.
 */
export declare class Card extends BasicElement {
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
    private _config;
    /**
     * Set text on the header
     */
    header: string;
    /**
     * Set text on the footer
     */
    footer: string;
    /**
     * Set card configurations
     */
    get config(): CardConfig;
    set config(config: CardConfig);
    /**
     * Get menu element from shadow root
     */
    private menuElement?;
    /**
     * Get button element from shadow root
     */
    private openMenuElement?;
    /**
     * Menu data for creating overlay-menu
     */
    private menuData?;
    /**
     * True if header has slotted content
     */
    private headerHasContent;
    /**
     * True if footer has slotted content
     */
    private footerHasContent;
    /**
     * Open menu
     * @returns {void}
     */
    private openMenu;
    /**
     * Close menu
     * @returns {void}
     */
    private closeMenu;
    /**
     * Run on header slot slotchange
     * @param event Footer slotchange event
     * @returns {void}
     */
    private onHeaderSlotChange;
    /**
     * Run on footer slot slotchange
     * @param event Header slotchange event
     * @returns {void}
     */
    private onFooterSlotChange;
    /**
     * True if card has header
     */
    private get withHeader();
    /**
     * True if card has footer
     */
    private get withFooter();
    /**
     * Called after render life-cycle finished
     * @param changedProperties Properties which have changed
     * @return {void}
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Called after the component is first rendered
     * @param changedProperties Properties which have changed
     * @return {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * Template of menu
     * @return menu template
     */
    protected get menuTemplate(): TemplateResult;
    /**
     * Template of header
     * @return header template
     */
    protected get headerTemplate(): TemplateResult;
    /**
     * Template of footer
     * @return footer template
     */
    protected get footerTemplate(): TemplateResult;
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
    'ef-card': Card;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-card': Partial<Card> | JSXInterface.HTMLAttributes<Card>;
    }
  }
}

export {};
