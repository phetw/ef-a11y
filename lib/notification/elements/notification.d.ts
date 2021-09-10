import { JSXInterface } from '../../jsx';
import { BasicElement, TemplateResult, CSSResult, PropertyValues } from '@refinitiv-ui/core';
import '../../icon';
/**
 * Used to show informative content when something happens in the application
 *
 * @fires collapsed - Dispatched when notification is collapsed
 * @fires dismiss - Dispatched when notification is dismissed
 *
 */
export declare class Notification extends BasicElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * The message to show in the notification.
     */
    message: string;
    /**
     * Notification style: Confirm
     */
    confirm: boolean;
    /**
     * Notification style: Warning
     */
    warning: boolean;
    /**
     * Notification style: Error
     */
    error: boolean;
    /**
     * Toggles the collapsed state.
     */
    collapsed: boolean;
    /**
     * On first updated lifecycle
     * @param changedProperties changed property
     * @returns {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    protected update(changedProperties: PropertyValues): void;
    /**
     * Dismisses the notification, firing a `dismiss` event and collapsing the notification.
     * @returns {void}
     */
    dismiss(): void;
    /**
     * Event handler for the clear button.
     * @param event event object
     * @returns {void}
     * @private
     */
    private onClearClick;
    /**
     * Event handler for when animation end.
     * @returns {void}
     */
    private onAnimationEnd;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     *
     * @returns {(CSSResult|CSSResult[])} CSS template
     */
    static get styles(): CSSResult | CSSResult[];
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     *
     * @returns {TemplateResult} Render template
     */
    protected render(): TemplateResult;
}
//# sourceMappingURL=notification.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-notification': Notification;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-notification': Partial<Notification> | JSXInterface.HTMLAttributes<Notification>;
    }
  }
}

export {};
