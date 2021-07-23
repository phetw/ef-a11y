var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, html, property, ControlElement } from '@refinitiv-ui/core';
import '../../icon';
import { preload } from '../../icon';
import '../../checkbox';
import { CheckedState } from '../managers/tree-manager';
import { VERSION } from '../../';
preload('right');
const emptyTemplate = html ``;
/**
 * Displays a tree list item.
 * Groups display expansion arrows.
 */
let TreeItem = class TreeItem extends ControlElement {
    constructor() {
        super(...arguments);
        /**
         * Checked state of the item
         */
        this.checkedState = CheckedState.UNCHECKED;
        /**
         * Is the item a parent and should it show an expansion toggle?
         */
        this.parent = false;
        /**
         * Display in multiple selection mode
         */
        this.multiple = false;
        /**
         * Expanded state of the item
         */
        this.expanded = false;
        /**
         * Depth of the item
         */
        this.depth = 0;
        /**
         * Label of the item
         */
        this.label = '';
        /**
         * Highlighted state of the item.
         * This is for showing which item is currently being interacted with.
         */
        this.highlighted = false;
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
        return VERSION;
    }
    /**
     * Template for rendering the indentation element
     */
    get indentTemplate() {
        return this.depth ? html `<div part="indent" style="width:${this.depth}em"></div>` : emptyTemplate;
    }
    /**
     * Template for rendering the toggle
     *
     * ! expand-toggle is required for automatically toggling expanded state
     */
    get toggleTemplate() {
        return html `
    <div
    expand-toggle
    part="toggle"
    style="pointer-events:all;visibility:${this.parent ? 'visible' : 'hidden'}">
      <ef-icon part="toggle-icon${this.expanded ? ' toggle-icon-expanded' : ''}" icon="right"></ef-icon>
    </div>
    `;
    }
    /**
     * Template for rendering the checkbox
     */
    get checkboxTemplate() {
        if (!this.multiple) {
            return emptyTemplate;
        }
        return html `
    <ef-checkbox
    part="checkbox"
    tabindex="-1"
    .disabled="${this.disabled}"
    .readonly="${this.readonly}"
    .indeterminate="${this.indeterminate}"
    .checked="${this.checked}"
    style="pointer-events:none"></ef-checkbox>
    `;
    }
    /**
     * Is the item fully checked?
     */
    get checked() {
        return this.checkedState === CheckedState.CHECKED;
    }
    /**
     * Is the checked state indeterminate?
     */
    get indeterminate() {
        return this.checkedState === CheckedState.INDETERMINATE;
    }
    update(changedProperties) {
        super.update(changedProperties);
        if (changedProperties.has('checkedState')) {
            switch (this.checkedState) {
                case CheckedState.CHECKED:
                    this.setAttribute('selected', '');
                    break;
                case CheckedState.INDETERMINATE:
                    this.setAttribute('selected', 'indeterminate');
                    break;
                default:
                    this.removeAttribute('selected');
            }
        }
    }
    render() {
        return html `
      ${this.indentTemplate}
      ${this.toggleTemplate}
      ${this.checkboxTemplate}
      <div part="label">
        <slot>${this.label}</slot>
      </div>
  `;
    }
};
__decorate([
    property({ attribute: false })
], TreeItem.prototype, "checkedState", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'group' })
], TreeItem.prototype, "parent", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], TreeItem.prototype, "multiple", void 0);
__decorate([
    property({ type: Boolean })
], TreeItem.prototype, "expanded", void 0);
__decorate([
    property({ reflect: true, type: Number })
], TreeItem.prototype, "depth", void 0);
__decorate([
    property({ type: String })
], TreeItem.prototype, "label", void 0);
__decorate([
    property({ attribute: false })
], TreeItem.prototype, "item", void 0);
__decorate([
    property({ reflect: true, type: Boolean })
], TreeItem.prototype, "highlighted", void 0);
TreeItem = __decorate([
    customElement('ef-tree-item', {
        alias: 'coral-tree-item'
    })
], TreeItem);
export { TreeItem };
//# sourceMappingURL=tree-item.js.map