import { BasicElement, CSSResult, TemplateResult, PropertyValues } from '@refinitiv-ui/core';
export { preload } from './utils/IconLoader';
export declare class Icon extends BasicElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return CSS template
     */
    static get styles(): CSSResult;
    private _icon;
    /**
     * Name of a known icon to render.
     * @example heart
     */
    get icon(): string | null;
    set icon(value: string | null);
    private _src;
    /**
     * Src location of an svg icon.
     * @example https://cdn.io/icons/heart.svg
     */
    get src(): string | null;
    set src(value: string | null);
    private _template;
    /**
     * The icon template to render
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
     * Helper method, used to set the icon src.
     * @returns {void}
     */
    private setIconSrc;
    /**
     * Tries to load an icon from the url provided
     * and the renders this into the icon template.
     * @param src Source location of the svg icon.
     * @returns {void}
     */
    private loadAndRenderIcon;
    /**
     * Get and cache CDN prefix
     * This is a private URL which is set in the theme
     * and should not be configured again via the variable.
     * @returns {void}
     */
    private setPrefix;
    /**
     * Clears SVG body from the icon template
     * @returns {void}
     */
    private clearIcon;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    protected render(): TemplateResult;
}
