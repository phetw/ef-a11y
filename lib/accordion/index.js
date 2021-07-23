var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, customElement, property } from '@refinitiv-ui/core';
import { VERSION } from '../';
import { Collapse } from '../collapse';
/**
 * Finds closest accordion parent of element.
 * Created, because IE11 doesn't support closest() method.
 * @param element - potential child of accordion
 * @returns found accordion parent or null, if not found
 */
const getClosestAccordion = (element) => {
    while (element) {
        if (element.localName === 'ef-accordion') {
            return element;
        }
        else {
            element = element.parentElement;
        }
    }
    return null;
};
/**
 * Checks if specified element is a direct child of current accordion.
 * @param element - child that checked
 * @param accordion - parent accordion
 * @returns is current accordion has child accordion that wraps checked element
 */
const isDirectAccordionChild = (element, accordion) => {
    return getClosestAccordion(element) === accordion;
};
/**
 * Used to display a group of `Collapse` control.
 * Only one item will be able to expand by default but you can customize its behavior.
 *
 * @slot header-left - Slot to add custom contents to the left side of header e.g. ef-icon, ef-checkbox
 * @slot header-right - Slot to add custom contents to the right side of header e.g. ef-icon, ef-checkbox
 *
 */
let Accordion = class Accordion extends Collapse {
    constructor() {
        super(...arguments);
        /**
         * Allow multiple sections expand at the same time
         */
        this.autoCollapseDisabled = false;
        /**
         * Add spacing to content section in all collapse items
         */
        this.spacing = false;
        /**
         * Allow the collapse animation to be disabled
         */
        this.collapseAnimationDisabled = false;
        /**
         * handle bubbled clicks from items
         * @param event the click event object
         * @return void
         */
        this.handleClick = (event) => {
            if (!this.autoCollapseDisabled && isDirectAccordionChild(event.target, this)) {
                this.processChildrenOnClick(event.target);
                event.stopPropagation();
            }
        };
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
        return css `
      :host {
        display: block;
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
        this.addEventListener('expanded-changed', this.handleClick, true);
    }
    /**
     * get a list of items
     * @returns array of accordion items
     */
    getChildItems() {
        return [...this.querySelectorAll('ef-collapse')]
            .filter((el) => isDirectAccordionChild(el, this));
    }
    /**
     * collapse non selected child items on click
     * @param target currently selected item
     * @return void
     */
    processChildrenOnClick(target) {
        const children = this.getChildItems();
        for (let i = 0, len = children.length; i < len; ++i) {
            if (children[i] !== target) {
                children[i].expanded = false;
            }
        }
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    render() {
        return html `
      <slot></slot>
    `;
    }
};
__decorate([
    property({ type: Boolean, attribute: 'auto-collapse-disabled' })
], Accordion.prototype, "autoCollapseDisabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Accordion.prototype, "spacing", void 0);
__decorate([
    property({ type: Boolean, attribute: 'collapse-animation-disabled' })
], Accordion.prototype, "collapseAnimationDisabled", void 0);
Accordion = __decorate([
    customElement('ef-accordion', {
        alias: 'coral-accordion'
    })
], Accordion);
export { Accordion };
//# sourceMappingURL=index.js.map