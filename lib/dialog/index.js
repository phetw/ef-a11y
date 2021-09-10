var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, customElement, html, property, query } from '@refinitiv-ui/core';
import { Overlay } from '../overlay';
import '../icon';
import '../panel';
import '../header';
import '../button';
import { deregister as draggableDeregister, register as draggableRegister } from './draggable-element';
import { translate, TranslatePropertyKey } from '@refinitiv-ui/translate';
import '@refinitiv-ui/phrasebook/lib/locale/en/dialog';
import { VERSION } from '../';
// TODO: use metrics once available
const isIE = (/Trident/g).test(navigator.userAgent) || (/MSIE/g).test(navigator.userAgent);
/**
 * Popup window, designed to contain and show any HTML content.
 * It provides modal and dragging functionality,
 * and also allows custom footers and control buttons to be used.
 *
 * @prop {boolean} noCancelOnOutsideClick - Prevents dialog to close when user clicks outside the dialog.
 *
 * @attr {boolean} [opened=false] - Set dialog to open
 * @prop {boolean} [opened=false] - Set dialog to open
 *
 * @attr {boolean} [no-cancel-on-esc-key=false] - Prevents dialog to close when user presses ESC key
 * @prop {boolean} [noCancelOnEscKey=false] - Prevents dialog to close when user presses ESC key
 *
 * @attr {string} x - Set a specific x coordinate of dialog
 * @prop {string} x - Set a specific x coordinate of dialog
 *
 * @attr {string} y - Set a specific y coordinate of dialog
 * @prop {string} y - Set a specific y coordinate of dialog
 *
 * @attr {boolean} full-screen - Set dialog to full screen
 * @prop {boolean} fullScreen - Set dialog to full screen
 *
 * @attr {string} position-target - Set position of dialog i.e. `top`, `right`, `left`, `bottom`, `center` or combination of theme e.g. `top right`.
 * @prop {string} positionTarget - Set position of dialog i.e. `top`, `right`, `left`, `bottom`, `center` or combination of theme e.g. `top right`.
 *
 * @fires opened-changed - Fired when value of `opened` property is changed. Prevent default to stop default action
 * @fires confirm - Fired when dialog is closed by user clicked a default OK button. Prevent default to stop default action
 * @fires cancel - Fired when dialog is closed by user clicked a default Cancel button, clicked outside to close dialog or press ESC to close the dialog. Prevent default to stop default action
 *
 * @slot footer - Hide default OK and Cancel button and replace dialog's footer with your custom content.
 */
let Dialog = class Dialog extends Overlay {
    constructor() {
        super(...arguments);
        /**
         * Set Header/Title of the dialog
         */
        this.header = null;
        /**
         * Should the dialog be draggable
         */
        this.draggable = false;
        /**
        * @ignore
        */
        this.noCancelOnOutsideClick = true;
        /**
        * @ignore
        */
        this.withBackdrop = true;
        /**
        * @ignore
        */
        this.withShadow = true;
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
        return VERSION;
    }
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return {CSSResult | CSSResult[]} CSS template
     */
    static get styles() {
        return [...Overlay.styles, css `
      :host {
        width: 400px;
        display: flex;
        flex-flow: column nowrap;
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: auto;
      }

      [part=content] {
        flex: 1 1 auto;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }

      [part="default-buttons"] {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      [part=header],
      [part=footer] {
        flex: none;
      }

      [part=close] {
        flex: none;
        cursor: pointer;
      }
    `];
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        draggableDeregister(this);
    }
    /**
     * Clear all cached values and fit the popup.
     * Use this function only if maxWidth, maxHeight, minWidth, minHeight, height, width are changed
     * @returns {void}
     */
    refit() {
        super.refit();
        this.restrictContentMaxHeight();
    }
    /**
     * Called when the element's dimensions have changed
     * @ignore
     * @param size dimension details
     * @returns {void}
     */
    resizedCallback(size) {
        super.resizedCallback(size);
        this.calculateContentMaxHeight(size);
    }
    /**
     * Check if component should be updated
     * @param changedProperties properties changed on shouldUpdate lifecycle callback
     * @returns boolean should component update
     */
    shouldUpdate(changedProperties) {
        const shouldUpdate = super.shouldUpdate(changedProperties);
        return shouldUpdate
            || ((changedProperties.has('draggable') || changedProperties.has('header') || changedProperties.has(TranslatePropertyKey)) && this.opened);
    }
    /**
     * Called after the element’s properties has been updated
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        if (this.isDraggableBehaviourNeedToBeChanged(changedProperties)) {
            this.updateDraggableBehavior();
        }
    }
    /**
     * Run when the popup has closed, managers are de-registered
     * and closing transition has finished
     * @returns {void}
     */
    onClosed() {
        super.onClosed();
        this.restrictContentMaxHeight();
    }
    /**
     * IE11 only: Restrict maximum height of content element
     * @param [maxHeight] Maximum height of content element
     * @returns {void}
     */
    /* istanbul ignore next */
    restrictContentMaxHeight(maxHeight) {
        if (!isIE) {
            return;
        }
        if (maxHeight) {
            this.contentElement.style.setProperty('max-height', `${maxHeight}px`);
        }
        else {
            this.contentElement.style.removeProperty('max-height');
        }
    }
    /**
     * IE11 only: Calculate the maxHeight of content element
     * @param size Size of the dialog
     * @returns {void}
     */
    /* istanbul ignore next */
    calculateContentMaxHeight(size) {
        if (!isIE) {
            return;
        }
        const headerRect = this.headerElement.getBoundingClientRect();
        const footerRect = this.footerElement.getBoundingClientRect();
        const contentRect = this.contentElement.getBoundingClientRect();
        const dialogHeight = size.height;
        const headerHeight = headerRect ? headerRect.height : 0;
        const footerHeight = footerRect ? footerRect.height : 0;
        const contentHeight = contentRect ? contentRect.height : 0;
        if (headerHeight + footerHeight + contentHeight > dialogHeight) {
            this.restrictContentMaxHeight(dialogHeight - footerHeight - headerHeight);
        }
    }
    /**
     * Default handler for confirm click
     * @returns {void}
     */
    defaultConfirm() {
        if (this.fireCancelOrConfirmEvent(true)) {
            this.setOpened(false);
        }
    }
    /**
     * Default handler for cancel click
     * @returns {void}
     */
    defaultCancel() {
        if (this.fireCancelOrConfirmEvent(false)) {
            this.setOpened(false);
        }
    }
    /**
     * Update draggable behavior looking to properties draggable and opened
     * @returns {void}
     */
    updateDraggableBehavior() {
        if (this.draggable && this.opened) {
            const handle = this.handle;
            handle && draggableRegister(this, handle);
        }
        else {
            draggableDeregister(this);
        }
    }
    /**
     * @param changedProperties - updated properties map
     * @returns true if needs to update draggable behavior
     */
    isDraggableBehaviourNeedToBeChanged(changedProperties) {
        return changedProperties.has('draggable') || changedProperties.has('opened');
    }
    /**
     * fire `cancel` or `confirm` event looking to `confirm` property
     * @param isConfirm true to fire `confirm` event. false to fire `cancel` event
     * @returns true if event is successful, false if event is prevented
     */
    fireCancelOrConfirmEvent(isConfirm) {
        const event = new CustomEvent(isConfirm ? 'confirm' : 'cancel', {
            cancelable: true
        });
        this.dispatchEvent(event);
        return !event.defaultPrevented;
    }
    /**
     * Get the default content region
     * @return {TemplateResult} Render template
     */
    get contentRegion() {
        return html `<slot></slot>`;
    }
    /**
     * Get the default footer region
     * @return {TemplateResult} Render template
     */
    get footerRegion() {
        return html `<slot name="footer">
      <div part="default-buttons">
        <ef-button part="default-button" cta @tap="${this.defaultConfirm}">${this.t('OK')}</ef-button>
        <ef-button part="default-button" @tap="${this.defaultCancel}">${this.t('CANCEL')}</ef-button>
      </div>
    </slot>`;
    }
    /**
     * Get the default header region
     * @return {TemplateResult} Render template
     */
    get headerRegion() {
        return html `
      ${this.header === null ? this.t('HEADER') : this.header}
      <ef-icon part="close" icon="cross" slot="right" @tap="${this.defaultCancel}"></ef-icon>
    `;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult} Render template
     */
    render() {
        return html `
        <ef-header drag-handle part="header">${this.headerRegion}</ef-header>
        <ef-panel part="content" spacing transparent>${this.contentRegion}</ef-panel>
        <div part="footer">${this.footerRegion}</div>
    `;
    }
};
__decorate([
    property({ type: String })
], Dialog.prototype, "header", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Dialog.prototype, "draggable", void 0);
__decorate([
    translate()
], Dialog.prototype, "t", void 0);
__decorate([
    query('[drag-handle]')
], Dialog.prototype, "handle", void 0);
__decorate([
    query('[part=content]')
], Dialog.prototype, "contentElement", void 0);
__decorate([
    query('[part=header]')
], Dialog.prototype, "headerElement", void 0);
__decorate([
    query('[part=footer]')
], Dialog.prototype, "footerElement", void 0);
Dialog = __decorate([
    customElement('ef-dialog', {
        alias: 'coral-dialog'
    })
], Dialog);
export { Dialog };
//# sourceMappingURL=index.js.map