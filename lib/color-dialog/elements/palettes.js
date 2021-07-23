var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BasicElement, property, svg, query } from '@refinitiv-ui/core';
import { VERSION } from '../../';
/**
 * Element base class usually used
 * for creating palettes elements.
 */
export class Palettes extends BasicElement {
    constructor() {
        super(...arguments);
        /**
         * Color value in hex
         */
        this.value = '';
        /**
         * Update color value when tab on color item
         * @param event mouse event
         * @return {void}
         */
        this.onTapItem = (event) => {
            const polygonElement = event.target;
            this.updateValue(polygonElement);
        };
        /**
         * Update color value when drag on color item
         * @param event mouse event
         * @return {void}
         */
        this.onMousemove = (event) => {
            const polygonElement = event.target;
            let mouseButton = event.buttons;
            if (mouseButton === undefined) { // buttons property is not supported in safari
                mouseButton = event.which;
            }
            if (mouseButton !== 1) {
                return;
            }
            // only update when user click and drag on color item
            this.updateValue(polygonElement);
        };
        /**
         * Update color value when drag on color item in mobile device
         * @param event touch event
         * @return {void}
         */
        this.onTouchmove = (event) => {
            var _a;
            const touchOffsets = event.changedTouches[0];
            const realTarget = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.elementFromPoint(touchOffsets.clientX, touchOffsets.clientY);
            this.updateValue(realTarget);
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
     * Create selector template
     * @return {SVGTemplateResult} selector template
     */
    get SelectorTemplate() {
        return (svg `
        <polygon class="color-selector-shadow"></polygon>
        <polygon class="color-selector"></polygon>
      `);
    }
    /**
     * Hide selector element
     * @return {void}
     */
    hideSelector() {
        if (this.colorSelector && this.colorSelectorShadow) {
            this.colorSelector.style.display = 'none';
            this.colorSelectorShadow.style.display = 'none';
        }
    }
    /**
     * Show selector element on specific points
     * @return {void}
     * @param points points of colorSelector
     */
    showSelector(points) {
        if (this.colorSelector && this.colorSelectorShadow) {
            this.colorSelector.style.display = '';
            this.colorSelectorShadow.style.display = '';
            this.colorSelectorShadow.setAttribute('points', points);
            this.colorSelector.setAttribute('points', points);
        }
    }
    /**
     * Update color value and fired value-changed event
     * @param element target element to get value
     * @return {void}
     */
    updateValue(element) {
        const color = element.getAttribute('fill');
        if (color) {
            this.value = color;
            this.notifyPropertyChange('value', color);
        }
    }
}
__decorate([
    query('.color-selector')
], Palettes.prototype, "colorSelector", void 0);
__decorate([
    query('.color-selector-shadow')
], Palettes.prototype, "colorSelectorShadow", void 0);
__decorate([
    property({ type: String })
], Palettes.prototype, "value", void 0);
//# sourceMappingURL=palettes.js.map