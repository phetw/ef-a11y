var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, customElement, svg } from '@refinitiv-ui/core';
import { Palettes } from './palettes';
import { COLOR_ITEMS, ColorHelpers } from '../helpers/color-helpers';
import { VERSION } from '../../';
/**
 * Component that allows user to select
 * any colours by tapping or dragging
 */
let ColorPalettes = class ColorPalettes extends Palettes {
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
      svg {
        width: 100%;
      }
      .color-selector {
        stroke: #fff;
        stroke-width: 2;
        fill: none;
        pointer-events: none;
      }
      .color-selector-shadow {
        stroke: black;
        stroke-width: 3;
        fill: none;
        pointer-events: none;
      }
    `;
    }
    /**
     * create color items template from COLOR_ITEMS array
     * @return color items template
     */
    get ColorItemsTemplate() {
        return COLOR_ITEMS.map((item) => {
            return (svg `
          <polygon
            data-role="color-item"
            stroke=${item[1]}
            fill=${item[1]}
            points=${item[0]}
            @tap=${this.onTapItem}
            @mousemove=${this.onMousemove}
            @touchmove=${this.onTouchmove}
          >
          </polygon>
        `);
        });
    }
    /**
     * Update color selector element when value has been changed
     * @param changedProperties Properties that has changed
     * @return {void}
     */
    updated(changedProperties) {
        if (changedProperties.has('value')) {
            const value = ColorHelpers.expandHex(this.value);
            const item = COLOR_ITEMS.find((item) => item[1] === value);
            if (item) {
                this.showSelector(item[0]);
            }
            else {
                this.hideSelector();
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
      <svg id="colorPalettes" viewBox="-5 -5 245 210">
        ${this.ColorItemsTemplate}
        ${this.SelectorTemplate}
      </svg>
    `;
    }
};
ColorPalettes = __decorate([
    customElement('ef-color-palettes', { theme: false })
], ColorPalettes);
export { ColorPalettes };
//# sourceMappingURL=color-palettes.js.map