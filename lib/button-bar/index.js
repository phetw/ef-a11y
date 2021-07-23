var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BasicElement, html, css, customElement, property, query } from '@refinitiv-ui/core';
import { VERSION } from '../';
import { Button } from '../button';
/**
 * Used to display multiple buttons to create a list of commands bar.
 */
let ButtonBar = class ButtonBar extends BasicElement {
    constructor() {
        super(...arguments);
        /**
         * Manages user interaction, only allowing one toggle button to be active at any one time.
         */
        this.managed = false;
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
     * @return CSS template
     */
    static get styles() {
        return css `
      :host {
        display: inline-flex;
        z-index: 0;
      }
      :host ::slotted(ef-button) {
        margin: 0;
      }
      :host ::slotted(ef-button-bar) {
        border-radius: 0;
        margin: 0;
        box-shadow: none;
        overflow: visible;
        background: none;
        z-index: auto;
      }
      :host ::slotted(ef-button:hover) {
        z-index: 1;
      }
      :host ::slotted(ef-button:focus) {
        z-index: 2;
      }
      :host ::slotted(ef-button:not(:hover):not(:focus)) {
        box-shadow: none;
      }
      @media (pointer: coarse){
        :host ::slotted(ef-button) {
          box-shadow: none;
        }
      }
      :host ::slotted(ef-button:first-of-type) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      :host ::slotted(ef-button:last-of-type) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      :host ::slotted(ef-button:not(:first-of-type):not(:last-of-type)) {
        border-radius: 0;
      }
      :host ::slotted(:not(ef-button):not(ef-button-bar)) {
        display: none;
      }
    `;
    }
    /**
     * Called once after the component is first rendered
     * @param changedProperties map of changed properties with old values
     * @returns {void}
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.addEventListener('tap', this.onTapHandler);
    }
    /**
     * Handles tap event
     * @param event the param is the event of click and tap handlers
     * @returns {void}
     */
    onTapHandler(event) {
        if (!this.managed) {
            return;
        }
        const target = event.target;
        if (target instanceof Button && target.toggles) {
            event.stopPropagation();
            this.manageButtons(target);
        }
    }
    /**
     * Get the target Button item and handle it with other managed Button items
     * @param targetButton an Button item is the target of the event
     * @returns {void}
     */
    manageButtons(targetButton) {
        const managedButtons = this.getManagedButtons();
        const isTargetOfManaged = managedButtons.some(managedButton => managedButton === targetButton);
        if (!isTargetOfManaged) {
            return;
        }
        managedButtons.forEach(managedButton => {
            managedButton.active = managedButton === targetButton;
        });
    }
    /**
     * Return the array of Element items which is changed in the default slot
     * @returns the array of Element of the default slot
     */
    getElementsOfSlot() {
        return this.defaultSlot.assignedNodes()
            .filter(node => node instanceof Element);
    }
    /**
     * Filter Button classes by the toggles property
     * @param buttons the array of Button items is the converted nodes of the default slot
     * @returns filtered Button items by the toggles property
     */
    getManagedButtons() {
        const elements = this.getElementsOfSlot();
        return elements.filter(element => element instanceof Button && element.toggles);
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    render() {
        return html `<slot></slot>`;
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], ButtonBar.prototype, "managed", void 0);
__decorate([
    query('slot:not([name])')
], ButtonBar.prototype, "defaultSlot", void 0);
ButtonBar = __decorate([
    customElement('ef-button-bar', {
        alias: 'coral-split-button'
    })
], ButtonBar);
export { ButtonBar };
//# sourceMappingURL=index.js.map