var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, customElement, property, ControlElement } from '@refinitiv-ui/core';
import { VERSION } from '../';
import '../icon';
import '../label';
const isAllWhitespaceTextNode = (node) => {
    var _a;
    return node.nodeType === document.TEXT_NODE
        && !((_a = node.textContent) === null || _a === void 0 ? void 0 : _a.trim());
};
/**
 * A building block for individual tab
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @fires clear - Dispatched when click on cross button occurs
 */
let Tab = class Tab extends ControlElement {
    constructor() {
        super(...arguments);
        /**
         * Specify icon name to display in tab
         */
        this.icon = '';
        /**
         * Specify tab's label text
         */
        this.label = '';
        /**
         * Specify tab's sub-label text
         */
        this.subLabel = '';
        /**
         * Specify tab's active status
         */
        this.active = false;
        /**
         * Set tab to clearable
         */
        this.clears = false;
        /**
         * Enable shortening the label
         */
        this.truncate = '';
        /**
         * Set tab to clearable on hover
         */
        this.clearsOnHover = false;
        /**
         * Use level styling from theme
         * @ignore
         */
        this.level = '1';
        /**
         * True, if there is slotted content
         */
        this.isSlotHasChildren = true;
        /**
         * Checks slotted children nodes and updates component to refresh label and sub-label templates.
         * @param event slotchange
         * @returns {void}
         */
        this.checkSlotChildren = (event) => {
            const slot = event.target;
            this.isSlotHasChildren = !slot.assignedNodes().filter(node => !this.isIgnorable(node)).length;
            void this.requestUpdate();
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
     * @param node that should be checked
     * @returns whether node can be ignored.
     */
    isIgnorable(node) {
        return node.nodeType === document.COMMENT_NODE
            || isAllWhitespaceTextNode(node);
    }
    /**
     * Omitted maxLine if subLabel is provided
     * @returns Max line value
     */
    getMaxLine() {
        return this.subLabel ? null : this.maxLine;
    }
    /**
     * @param event event from close button
     * @returns {void}
     */
    handleClickClear(event) {
        event.stopPropagation();
        /**
         * Fires when click on cross occurs
         */
        this.dispatchEvent(new CustomEvent('clear'));
    }
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @returns CSS template
     */
    static get styles() {
        return css `
      :host {
        display: inline-flex;
      }
      :host [part=sub-label] {
        display: block;
      }
    `;
    }
    /**
     * Show Close Button if allow clears
     * @returns close button template
     */
    get CloseTemplate() {
        return this.clears || this.clearsOnHover ? html `
        <div part="close-container">
          <ef-icon part="close" icon="cross" @tap="${this.handleClickClear}"></ef-icon>
        </div>
      ` : null;
    }
    /**
     * Create ef-label template when label is true
     * @returns Label template
     */
    get LabelTemplate() {
        if (!this.label || !this.isSlotHasChildren) {
            return null;
        }
        return html `
      <ef-label
        part="label"
        .truncate=${this.truncate}
        .maxLine=${this.getMaxLine()}
      >
        ${this.label}
      </ef-label>
    `;
    }
    /**
     * Create ef-label template when subLabel is true
     * @returns SubLabel template
     */
    get SubLabelTemplate() {
        if (!this.subLabel || !this.isSlotHasChildren) {
            return null;
        }
        return html `
      <ef-label
      part="sub-label"
      .truncate=${this.truncate}
      .maxLine=${this.getMaxLine()}>
        ${this.subLabel}
      </ef-label>
    `;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return html `
      ${this.icon ? html `<ef-icon icon=${this.icon} part="icon"></ef-icon>` : null}
        <div part="label-container">
          ${this.LabelTemplate}
          ${this.SubLabelTemplate}
          <slot @slotchange="${this.checkSlotChildren}">
          </slot>
        </div>
      ${this.CloseTemplate}
    `;
    }
};
__decorate([
    property({ type: String })
], Tab.prototype, "icon", void 0);
__decorate([
    property({ type: String })
], Tab.prototype, "label", void 0);
__decorate([
    property({ type: String, attribute: 'sub-label' })
], Tab.prototype, "subLabel", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Tab.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Tab.prototype, "clears", void 0);
__decorate([
    property({ type: String, reflect: true })
], Tab.prototype, "truncate", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'max-line' })
], Tab.prototype, "maxLine", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'clears-on-hover' })
], Tab.prototype, "clearsOnHover", void 0);
__decorate([
    property({ type: String, reflect: true })
], Tab.prototype, "level", void 0);
Tab = __decorate([
    customElement('ef-tab', {
        alias: 'coral-tab'
    })
], Tab);
export { Tab };
//# sourceMappingURL=index.js.map