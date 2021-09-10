import { JSXInterface } from '../jsx';
import { BasicElement, PropertyValues, TemplateResult } from '@refinitiv-ui/core';
/**
 *  An animated graphical component,
 *  used to show that an app is performing an action
 *  in the background such as downloading content.
 */
export declare class Loader extends BasicElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * Collection of template part names,
     * used to create and theme different loader styles
     */
    protected get templateParts(): readonly string[];
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     *
     * @return TemplateResult
     */
    protected render(): TemplateResult;
}
//# sourceMappingURL=index.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-loader': Loader;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-loader': Partial<Loader> | JSXInterface.HTMLAttributes<Loader>;
    }
  }
}

export {};
