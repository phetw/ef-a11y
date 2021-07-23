var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Collapse_1;
import { BasicElement, css, customElement, html, property, query } from '@refinitiv-ui/core';
import '../header';
import '../panel';
import '../icon';
import { VERSION } from '../';
/**
 * Allows users to hide non-critical information
 * or areas of the screen, maximizing the amount of real estate
 * for their primary displays.
 *
 * @fires expanded-changed - Fired when the `expanded` property changes.
 *
 * @slot header-left - Slot to add custom contents to the left side of header e.g. ef-icon, ef-checkbox
 * @slot header-right - Slot to add custom contents to the right side of header e.g. ef-icon, ef-checkbox
 */
let Collapse = Collapse_1 = class Collapse extends BasicElement {
    constructor() {
        super(...arguments);
        /**
         * Set text on the header
         */
        this.header = null;
        /**
         * Use level styling from theme
         */
        this.level = '3';
        /**
         * Set to expand the item
         */
        this.expanded = false;
        /**
         * Set to apply padding from theme to content section
         */
        this.spacing = false;
        /**
         * Handle tap on the item header, will toggle the expanded state
         * @param event Event object
         * @returns {void}
         */
        this.handleTap = (event) => {
            const target = event.target;
            // This is to prevent toggling when elements on slots are tap
            if (Collapse_1.isHeader(target)) {
                this.toggle();
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
      [part="header"] {
        cursor: default;
      }
      [part="toggle"] {
        display: inline-block;
        margin: 0 5px;
      }
      [part="content"]  {
        overflow: hidden;
        box-sizing: border-box;
      }
      [no-animation] {
        animation: none !important;
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
        this.panelHolder && this.panelHolder.setAttribute('no-animation', '');
    }
    /**
     * Invoked whenever the element is updated
     * @param changedProperties map of changed properties with old values
     * @return {void}
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('expanded')) {
            this.showHide();
        }
    }
    /**
     * Toggle the item
     * @returns {void}
     */
    toggle() {
        this.expanded = !this.expanded;
        const event = this.notifyPropertyChange('expanded', this.expanded, true);
        if (!event) { // revert expanded if event is cancelled
            this.expanded = !this.expanded;
        }
    }
    /**
     * Check if target is a header
     * @param element for checking
     * @returns {boolean} true if target is ef-header
     */
    static isHeader(element) {
        return element.localName === 'ef-header' || element.getAttribute('part') === 'toggle';
    }
    /**
     * Show or Hide the item depending on the expanded state
     * @returns {void}
     */
    showHide() {
        if (!this.panelHolder) {
            return;
        }
        this.panelHolder.removeAttribute(('no-animation'));
        this.setAnimationTargetHeight(this.getContentHeight());
    }
    /**
     * Set current content height at the target-height
     * @param height number or null value
     * @returns {void}
     */
    setAnimationTargetHeight(height) {
        this.updateVariable('--target-height', `${height}px`);
    }
    /**
     * Gets the height of the ef-panel element which contains the content
     * will pass height including optional spacing
     * @returns clientHeight of the panel so that the panel holder max-height can be set
     */
    getContentHeight() {
        return this.panel && this.panel.clientHeight || 0;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    render() {
        return html `
      <ef-header part="header" level="${this.level}" @tap="${this.handleTap}">
        <ef-icon icon="right" slot="left" part="toggle"></ef-icon>
        <slot slot="left" name="header-left"></slot>
        <slot slot="right" name="header-right"></slot>
        ${this.header}
      </ef-header>
      <div part="content">
        <ef-panel ?spacing="${this.spacing}" transparent>
          <slot></slot>
        </ef-panel>
      </div>
    `;
    }
};
__decorate([
    property({ type: String })
], Collapse.prototype, "header", void 0);
__decorate([
    property({ type: String })
], Collapse.prototype, "level", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Collapse.prototype, "expanded", void 0);
__decorate([
    property({ type: Boolean })
], Collapse.prototype, "spacing", void 0);
__decorate([
    query('[part="content"]', true)
], Collapse.prototype, "panelHolder", void 0);
__decorate([
    query('ef-panel', true)
], Collapse.prototype, "panel", void 0);
Collapse = Collapse_1 = __decorate([
    customElement('ef-collapse', {
        alias: 'coral-collapse'
    })
], Collapse);
export { Collapse };
//# sourceMappingURL=index.js.map