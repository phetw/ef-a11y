import { JSXInterface } from '../../jsx';
import { TemplateResult, CSSResult, PropertyValues } from '@refinitiv-ui/core';
import { Palettes } from './palettes';
/**
 * Component that allows user to select
 * any colours by tapping or dragging
 */
export declare class ColorPalettes extends Palettes {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return {CSSResult | CSSResult[]} CSS template
     */
    static get styles(): CSSResult | CSSResult[];
    /**
     * create color items template from COLOR_ITEMS array
     * @return color items template
     */
    private get ColorItemsTemplate();
    /**
     * Update color selector element when value has been changed
     * @param changedProperties Properties that has changed
     * @return {void}
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    protected render(): TemplateResult;
}
//# sourceMappingURL=color-palettes.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-color-palettes': ColorPalettes;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-color-palettes': Partial<ColorPalettes> | JSXInterface.HTMLAttributes<ColorPalettes>;
    }
  }
}

export {};
