import { BasicElement, TemplateResult, CSSResult, PropertyValues } from '@refinitiv-ui/core';
import '../label';
import '../button';
import '../overlay-menu';
import { OverlayMenu } from '../overlay-menu';
import { CardConfig } from './helpers/types';
export { CardConfig };
/**
 * A card frame component.
 * @fires item-trigger - Fired when card menu is selected.
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
    header: string | null;
    /**
     * Set text on the footer
     */
    footer: string | null;
    /**
     * Set card configurations
     */
    get config(): CardConfig | undefined;
    set config(config: CardConfig | undefined);
    /**
     * Card's overlay menu element
    */
    get menu(): OverlayMenu | undefined;
    /**
     * Get menu element from shadow root
     */
    private menuElement?;
    /**
     * Get button element from shadow root
     */
    private buttonElement?;
    /**
     * Menu data for creating overlay-menu
     */
    private menuData;
    /**
     * Open menu
     * @returns {void}
     */
    private openMenu;
    /**
     * Called after render life-cycle finished
     * @param changedProperties Properties which have changed
     * @return {void}
     */
    protected updated(changedProperties: PropertyValues): void;
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
