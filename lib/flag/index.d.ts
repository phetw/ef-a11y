import { JSXInterface } from '../jsx';
import { BasicElement, CSSResult, TemplateResult, PropertyValues } from '@refinitiv-ui/core';
export { preload } from './utils/FlagLoader';
/**
 * Provides a collection of flags.
 *
 * @attr {string | null} src - Src location of a svg flag.
 * @prop {string | null} src - Src location of a svg flag
 *
 */
export declare class Flag extends BasicElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @returns CSS template
     */
    static get styles(): CSSResult;
    private _flag;
    /**
     * Name of a known flag to render.
     * @example gb
     */
    get flag(): string | null;
    set flag(value: string | null);
    private _src;
    /**
     * Src location of an svg flag.
     * @example https://cdn.io/flags/gb.svg
     */
    get src(): string | null;
    set src(value: string | null);
    private _template;
    /**
     * The flag template to render
     */
    private get template();
    private set template(value);
    /**
     * Called after the component is first rendered
     * @param changedProperties Properties which have changed
     * @returns {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * Helper method, used to set the flag src.
     * @returns {void}
     */
    private setFlagSrc;
    /**
     * Tries to load an flag from the url provided
     * and the renders this into the flag template.
     * @param src Source location of the svg flag.
     * @returns {void}
     */
    private loadAndRenderFlag;
    /**
     * Get and cache CDN prefix
     * This is a private URL which is set in the theme
     * and should not be configured again via the variable.
     * @returns {void}
     */
    private setPrefix;
    /**
     * Clears SVG body from the flag template
     * @returns {void}
     */
    private clearFlag;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult} Render template
     */
    protected render(): TemplateResult;
}
//# sourceMappingURL=index.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-flag': Flag;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-flag': Partial<Flag> | JSXInterface.HTMLAttributes<Flag>;
    }
  }
}

export {};
