import { JSXInterface } from '../../jsx';
import { BasicElement, TemplateResult, CSSResult } from '@refinitiv-ui/core';
import '../../progress-bar';
import '../../layout';
/**
 * A part of <ef-tornado-chart />,
 * consists mainly of primary, secondary ef-progress-bar and labels.
 */
export declare class TornadoItem extends BasicElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * Internal vertical flag value, used only by its getter and setter
     */
    private _vertical;
    /**
     * Getter for toggling bar chart alignment
     * @returns {boolean} true if component is in vertical mode
     */
    get vertical(): boolean;
    /**
     * Setter for toggling bar chart alignment
     * @param {boolean} value vertical
     */
    set vertical(value: boolean);
    /**
     * Display highlight styles onto the item
     */
    highlighted: boolean;
    /**
     * Primary bar chart's value
     */
    primaryValue: string | null;
    /**
     * Primary bar chart's label
     */
    primaryLabel: string | null;
    /**
     * Secondary bar chart's value
     */
    secondaryValue: string | null;
    /**
     * Secondary bar chart's label
     */
    secondaryLabel: string | null;
    /**
     * A flag to determine container layout state
     */
    private isContainer;
    /**
     * Primary bar chart alignment
     */
    private primaryBarAlignment;
    /**
     * Secondary bar chart alignment
     */
    private secondaryBarAlignment;
    /**
     * Label container's size
     */
    private labelLayoutSize;
    /**
     * Primary layout flex basis size
     */
    private primaryLayoutFlexBasis;
    /**
     * Secondary layout flex basis size
     */
    private secondaryLayoutFlexBasis;
    /**
     * Triggers vertical layout mode
     * @returns {void}
     */
    private showVerticalMode;
    /**
     * Triggers horizontal layout mode
     * @returns {void}
     */
    private showHorizontalMode;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return CSS template
     */
    static get styles(): CSSResult | CSSResult[];
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    protected render(): TemplateResult;
}
//# sourceMappingURL=tornado-item.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-tornado-item': TornadoItem;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-tornado-item': Partial<TornadoItem> | JSXInterface.HTMLAttributes<TornadoItem>;
    }
  }
}

export {};
