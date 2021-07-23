var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BasicElement, html, css, customElement, property } from '@refinitiv-ui/core';
import { VERSION } from '../../';
import '../../icon';
/**
 * Used to show informative content when something happens in the application
 *
 * @fires collapsed - Dispatched when notification is collapsed
 * @fires dismiss - Dispatched when notification is dismissed
 *
 */
let Notification = class Notification extends BasicElement {
    constructor() {
        super(...arguments);
        /**
         * The message to show in the notification.
         */
        this.message = '';
        /**
         * Notification style: Confirm
         */
        this.confirm = false;
        /**
         * Notification style: Warning
         */
        this.warning = false;
        /**
         * Notification style: Error
         */
        this.error = false;
        /**
         * Toggles the collapsed state.
         */
        this.collapsed = false;
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
        return VERSION;
    }
    /**
     * On first updated lifecycle
     * @param changedProperties changed property
     * @returns {void}
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.addEventListener('animationend', this.onAnimationEnd);
    }
    update(changedProperties) {
        super.update(changedProperties);
        // Fix bg doesn't work on IE 11
        if (changedProperties.has('confirm') || changedProperties.has('warning') || changedProperties.has('error')) {
            this.updateStyles();
        }
    }
    /**
     * Dismisses the notification, firing a `dismiss` event and collapsing the notification.
     * @returns {void}
     */
    dismiss() {
        const event = new CustomEvent('dismiss', {
            bubbles: false,
            cancelable: true
        });
        // do action only if it was not prevented by a handler
        if (this.dispatchEvent(event)) {
            this.collapsed = true;
        }
    }
    /**
     * Event handler for the clear button.
     * @param event event object
     * @returns {void}
     * @private
     */
    onClearClick(event) {
        event.stopPropagation();
        this.dismiss();
    }
    /**
     * Event handler for when animation end.
     * @returns {void}
     */
    onAnimationEnd() {
        if (this.collapsed) {
            this.dispatchEvent(new CustomEvent('collapsed', {
                bubbles: false,
                cancelable: false
            }));
        }
    }
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     *
     * @returns {(CSSResult|CSSResult[])} CSS template
     */
    static get styles() {
        return css `
      :host {
        display: block;
      }
      [part=label] {
        color: red;
      }
    `;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     *
     * @returns {TemplateResult} Render template
     */
    render() {
        return html `
    <style>
    :host {
      display: block;
    }
    </style>
    <div part="container">
      <div part="content"><slot>${this.message}</slot></div>
      <ef-icon part="clear" icon="cross" @click="${this.onClearClick.bind(this)}"></ef-icon>
    </div>
    `;
    }
};
__decorate([
    property({ type: String })
], Notification.prototype, "message", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Notification.prototype, "confirm", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Notification.prototype, "warning", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Notification.prototype, "error", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Notification.prototype, "collapsed", void 0);
Notification = __decorate([
    customElement('ef-notification', {
        alias: 'amber-notification'
    })
], Notification);
export { Notification };
//# sourceMappingURL=notification.js.map