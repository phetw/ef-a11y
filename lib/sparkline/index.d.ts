import { JSXInterface } from '../jsx';
import { CSSResult, PropertyValues, ResponsiveElement, TemplateResult, ElementSize } from '@refinitiv-ui/core';
import '@refinitiv-ui/browser-sparkline';
import type { BrowserSparklineChart } from '@refinitiv-ui/browser-sparkline';
import type { ThemeConfig } from '@refinitiv-ui/browser-sparkline/lib/browserSparklineCanvas';
export declare class Sparkline extends ResponsiveElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * Chart data as an array of number.
     */
    data: number[];
    /**
     * Chart previous data as an array of number.
     */
    previousData: never[];
    /**
     * Baseline value to show horizontal line (optional)
     */
    referenceValue?: number;
    /**
     * Chart width
     */
    protected width?: number;
    /**
     * Chart height
     */
    protected height?: number;
    /**
     * Chart initialize status
     */
    protected initialized: boolean;
    /**
     * Get canvas element from shadow roots
     */
    protected chart: BrowserSparklineChart;
    /**
     * Get configuration for theme
     */
    protected get defaultThemeConfig(): Partial<ThemeConfig>;
    /**
     * Get configuration for static data
     */
    private get staticDataConfig();
    /**
     * On Connected Callback Lifecycle
     * @ignore
     * @return {void}
     */
    connectedCallback(): void;
    /**
     * On Updated Lifecycle
     * @ignore
     * @param changedProperties changed properties
     * @return {void}
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Handles when data was changed.
     * Fires event `data-changed` by default but will fires event `data-error` if giving data a wrong format
     * @returns {void}
     */
    private dataChanged;
    /**
     * Re-draw canvas when the size of component changed
     * @ignore
     * @param size element dimensions
     * @returns {void}
     */
    resizedCallback(size: ElementSize): void;
    /**
     * Create chart
     * @protected
     * @returns {void}
     */
    protected createChart(): void;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return CSS template
     */
    static get styles(): CSSResult;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    protected render(): TemplateResult;
}
//# sourceMappingURL=index.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-sparkline': Sparkline;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-sparkline': Partial<Sparkline> | JSXInterface.HTMLAttributes<Sparkline>;
    }
  }
}

export {};
