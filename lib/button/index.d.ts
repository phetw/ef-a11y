import { ControlElement, CSSResult, PropertyValues, TemplateResult } from '@refinitiv-ui/core';
import '../icon';
/**
 * Use button for actions in forms, dialogs,
 * and more with support for different states and styles.
 * @attr {boolean} disabled - Set state to disabled
 * @prop {boolean} [disabled=false] - Set state to disabled
 * @fires active-changed - Dispatched on changing `active` property state by taping on button when property `toggles` is true.
 */
export declare class Button extends ControlElement {
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
     * Customises text alignment when specified alongside `icon` property
     * Value can be `before` or `after`
     */
    textpos: 'before' | 'after';
    /**
     * Removes background when specified alongside `icon` property
     */
    transparent: boolean;
    /**
     * Specify icon to display in button. Value can be icon name
     */
    icon: string | null;
    /**
     * Specify icon to display when hovering. Value can be icon name
     */
    hoverIcon: string | null;
    /**
     * Set state to call-to-action
     */
    cta: boolean;
    /**
     * Enable or disable ability to be toggled
     */
    toggles: boolean;
    /**
     * An active or inactive state, can only be used with toggles property/attribute
     */
    active: boolean;
    /**
     * Use by theme to detect when no content inside button
     */
    private empty;
    /**
     * Get native label element from shadow roots
     */
    private labelElement;
    /**
     * the lifecycle method called when properties changed first time
     * @param changedProperties properties it's the Map object which has the updated properties
     * @returns {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * Handle the slotchange event of default slot
     * @returns {void}
     */
    private onDefaultSlotChangeHandler;
    /**
     * Handle keydown event
     * @param event the keyboard event
     * @returns {void}
     */
    private onKeyUpHandler;
    /**
     * Check key names
     * @param key the keyboard key
     * @returns true if space or enter pressed
     */
    private isReturnOrSpaceKey;
    /**
     * Handle active property, when toggles is true
     * @returns {void}
     */
    private toggleActive;
    /**
     * Set pressed attribute
     * @returns {void}
     */
    private setPressed;
    /**
     * Remove pressed attribute
     * @returns {void}
     */
    private unsetPressed;
    /**
     * Compute empty property based on textContent
     * @returns {void}
     */
    private emptyComputed;
    /**
     * Set or remove attribute "empty" based on slot present
     * @returns {void}
     */
    private switchEmptyAttribute;
    /**
     * Returns icon template if exists
     * @return {TemplateResult | null}  Render template
     */
    private get iconTemplate();
    /**
     * Returns hover icon template if exists
     * @return {TemplateResult | null}  Render template
     */
    private get hoverIconTemplate();
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    protected render(): TemplateResult;
}
