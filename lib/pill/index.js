var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ControlElement, css, customElement, html, property, query } from '@refinitiv-ui/core';
import { VERSION } from '../';
import '../icon';
/**
 * A small button style component
 * which is used to show one or multiple selected item.
 * It is rarely used in the UI but inside other components to visualize multiple item selection item.
 * @attr {string} value - Value of pill
 * @prop {string} value - Value of pill
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @fires clear - Dispatched when click on cross button occurs
 */
let Pill = class Pill extends ControlElement {
    constructor() {
        super(...arguments);
        /**
         * Set pill to clearable
         */
        this.clears = false;
        /**
         * Set pill to toggle mode
         */
        this.toggles = false;
        /**
         * Add to pill for active state
         */
        this.active = false;
        /**
         * Set property pressed true on tap start and false on tap end
         */
        this.pressed = false;
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
      display: inline-block;
      position: relative;
    }
    [part=content] {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    `;
    }
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.addEventListener('tap', this.onTapHandler);
        this.addEventListener('tapstart', this.onStartPress);
        this.addEventListener('tapend', this.onEndPress);
        this.addEventListener('mouseleave', this.onEndPress);
    }
    get closeTemplate() {
        return this.clears && !this.readonly ? html `<ef-icon part="close" icon="cross" @tap="${this.clear}"></ef-icon>` : null;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return html `
      <div part="content">
        <slot>...</slot>
      </div>
      ${this.closeTemplate}
    `;
    }
    /**
     * change state of `pressed` property to be true if there is no close icon or pill is pressed directly
     * @param event tapstart event
     * @returns {void}
     */
    onStartPress(event) {
        if (this.couldBePressed(event)) {
            this.pressed = true;
        }
    }
    /**
     * @param event tapstart
     * @returns true if element property pressed could be set
     */
    couldBePressed(event) {
        const element = this.closeElement;
        return !this.readonly && (!element || !event.composedPath().includes(element));
    }
    /**
     * change state of `pressed` property to be false if mouse leave pill or tap is end on pill
     * @returns {void}
     */
    onEndPress() {
        if (this.pressed) {
            this.pressed = false;
        }
    }
    /**
     * handle when `clears` icon is tapped
     * @returns {void}
     */
    onTapHandler() {
        if (this.toggles && !this.readonly) {
            this.active = !this.active;
        }
    }
    /**
     * @param event event from close button
     * @returns {void}
     */
    clear(event) {
        event.stopPropagation();
        /**
         * Fires when click on cross occurs.
         */
        this.dispatchEvent(new CustomEvent('clear'));
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], Pill.prototype, "clears", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Pill.prototype, "toggles", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Pill.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Pill.prototype, "pressed", void 0);
__decorate([
    query('[part=close]')
], Pill.prototype, "closeElement", void 0);
Pill = __decorate([
    customElement('ef-pill', {
        alias: 'coral-pill'
    })
], Pill);
export { Pill };
//# sourceMappingURL=index.js.map