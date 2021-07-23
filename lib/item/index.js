var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ControlElement, css, customElement, html, property, query } from '@refinitiv-ui/core';
import '../icon';
import '../checkbox';
import { VERSION } from '../';
export * from './helpers/types';
const isAllWhitespaceTextNode = (node) => {
    var _a;
    return node.nodeType === document.TEXT_NODE
        && !((_a = node.textContent) === null || _a === void 0 ? void 0 : _a.trim());
};
/**
 * Used as a basic building block to compose complex custom elements,
 * additionally it can be used by applications
 * to create simple menus or navigation panels.
 *
 * @attr {string} value - The content of this attribute represents the value of the item.
 * @prop {string} [value=] - The content of this attribute represents the value of the item.
 *
 * @attr {boolean} disabled - Set disabled state.
 * @prop {boolean} [disabled=false] - Set disabled state.
 *
 * @slot left - Used to render the content on the left of the label.
 * @slot right - Used to render the content on the right of the label.
 */
let Item = class Item extends ControlElement {
    constructor() {
        super(...arguments);
        /**
         * The text for the label indicating the meaning of the item.
         * By having both `label` and content, `label` always takes priority
         */
        this.label = null;
        /**
         * If defined value can be `text`, `header` or `divider`
         * @type {ItemType | null}
         */
        this.type = null;
        /**
         * Set the icon name from the ef-icon list
         */
        this.icon = null;
        /**
         * Indicates that the item is selected
         */
        this.selected = false;
        this.role = 'option';
        this.ariaSelected = false;
        /**
         * Is the item part of a multiple selection
         */
        this.multiple = false;
        /**
         * Highlight the item
         */
        this.highlighted = false;
        /**
         * The`subLabel` property represents the text beneath the label.
         */
        this.subLabel = null;
        /**
         * Specifies which element an item is bound to
         */
        this.for = null;
        /**
         * True, if there is no slotted content
         */
        this.isSlotEmpty = true;
        /**
         * Checks slotted children nodes and updates component to refresh label and sub-label templates.
         * @param event slotchange
         * @returns {void}
         */
        this.checkSlotChildren = (event) => {
            const slot = event.target;
            this.isSlotEmpty = !slot.assignedNodes().filter(node => !this.isIgnorable(node)).length;
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
     * @returns `CSSResult` that will be used to style the host,
     * slotted children and the internal template of the element.
     */
    static get styles() {
        return css `
      :host {
        display: flex;
        align-items: center;
      }
      [part=checkbox] {
        pointer-events: none;
      }
      [part=left],
      [part=right] {
        display: flex;
        align-items: center;
      }
      [part=center] {
        flex: 1;
      }
      :host([type=divider]) > * {
        display: none;
      }
    `;
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
     * @override
     * @returns {void}
     */
    update(changedProperties) {
        if (changedProperties.has('type')) {
            this.typeChanged();
        }
        if (changedProperties.has('highlighted') && !this.multiple) {
            this.ariaSelected = this.highlighted;
        }
        if (changedProperties.has('selected') && this.multiple) {
            this.ariaSelected = this.selected;
        }
        super.update(changedProperties);
    }
    /**
     * Get icon template if icon attribute is defined
     */
    get iconTemplate() {
        return this.icon !== null && this.icon !== undefined ? html `<ef-icon part="icon" .icon="${this.icon}"></ef-icon>` : undefined;
    }
    /**
     * Get subLabel template if it is defined and no slot content present
     */
    get subLabelTemplate() {
        return this.subLabel && this.isSlotEmpty ? html `<div part="sub-label">${this.subLabel}</div>` : undefined;
    }
    /**
     * Get label template if it is defined and no slot content present
     */
    get labelTemplate() {
        return this.label && this.isSlotEmpty ? html `${this.label}` : undefined;
    }
    /**
     * Get template for `for` attribute.
     * This is usually used with menus when an item needs to reference an element
     */
    get forTemplate() {
        return this.for ? html `<ef-icon icon="right"></ef-icon>` : undefined;
    }
    /**
     * Get template for `multiple` attribute.
     * This is usually used with lists, when an item can be part of a multiple selection
     */
    get multipleTemplate() {
        const multiple = this.multiple && (!this.type || this.type === 'text');
        return multiple ? html `<ef-checkbox part="checkbox" .checked="${this.selected}" tabindex="-1"></ef-checkbox>` : undefined;
    }
    /**
     * Return true if the item can be highlighted. True if not disabled and type is Text
     * @prop {boolean} highlightable
     * @returns whether element is highlightable
     */
    get highlightable() {
        return !this.disabled && this.type !== 'header' && this.type !== 'divider';
    }
    /**
     * Getter returning if the label is truncated
     * @prop {boolean} isTruncated
     * @returns whether element is truncated or not
     */
    get isTruncated() {
        return !!(this.labelEl && (this.labelEl.offsetWidth < this.labelEl.scrollWidth));
    }
    /**
     * Control State behaviour will update tabindex based on the property
     * @returns {void}
     */
    typeChanged() {
        const noInteraction = this.type === 'header' || this.type === 'divider' || this.disabled;
        if (noInteraction) {
            this.disableFocus();
        }
        else if (!this.disabled) {
            this.enableFocus();
        }
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @returns Render template
     */
    render() {
        return html `
      <div part="left">
        ${this.iconTemplate}
        ${this.multipleTemplate}
        <slot name="left"></slot>
      </div>
      <div part="center" id="label">
        ${this.labelTemplate}
        <slot @slotchange="${this.checkSlotChildren}"></slot>
        ${this.subLabelTemplate}
      </div>
      <div part="right">
        <slot name="right"></slot>
        ${this.forTemplate}
      </div>
    `;
    }
};
__decorate([
    property({ type: String })
], Item.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], Item.prototype, "type", void 0);
__decorate([
    property({ type: String, reflect: true })
], Item.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Item.prototype, "selected", void 0);
__decorate([
    property({ type: String, reflect: true })
], Item.prototype, "role", void 0);
__decorate([
    property({ type: String, attribute: 'aria-selected', reflect: true })
], Item.prototype, "ariaSelected", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Item.prototype, "multiple", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Item.prototype, "highlighted", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'sub-label' })
], Item.prototype, "subLabel", void 0);
__decorate([
    property({ type: String, reflect: true })
], Item.prototype, "for", void 0);
__decorate([
    query('#label')
], Item.prototype, "labelEl", void 0);
Item = __decorate([
    customElement('ef-item', {
        alias: 'coral-item'
    })
], Item);
export { Item };
//# sourceMappingURL=index.js.map