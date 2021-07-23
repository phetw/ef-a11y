import { BasicElement, TemplateResult, CSSResult, PropertyValues } from '@refinitiv-ui/core';
import '../canvas';
/**
 * A component used to show data in a LED-like
 * horizontal bar visualization.
 */
export declare class LedGauge extends BasicElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    private _zero;
    constructor();
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return CSS template
     */
    static get styles(): CSSResult;
    /**
     * Value of bar for top legend position
     * Value can be -100 to 100
     */
    topValue: number | null;
    /**
     * Value of bar for bottom legend position
     * Value can be -100 to 100
     */
    bottomValue: number | null;
    /**
     * Value of range. eg [-20, 70]
     */
    range: number[];
    /**
     * Label to be displayed in the top legend
     */
    topLabel: string;
    /**
     * Label to be displayed in the bottom legend
     */
    bottomLabel: string;
    /**
     * Label to be displayed in the bottom legend
     * when a range is displayed
     * and no bottom text is already set.
     */
    rangeLabel: string;
    /**
     * Turn off background color and use grey
     * @default false
     */
    neutralColor: boolean;
    /**
     * Sets the zero scale position. [center, left, right]
     * @default center
     */
    get zero(): string;
    set zero(val: string);
    private get _shadowRoot();
    /**
     * Canvas in ef-canvas
     */
    private get canvas();
    /**
     * The 2 dimensional context of the canvas, used for drawing
     */
    private get ctx();
    /**
     * Min value of gauge
     * @default 0
     */
    private get min();
    /**
     * Max value of gauge
     * @default 100
     */
    private get max();
    /**
     * Invoked whenever the element is update
     * @param changedProperties changed properties
     * @returns {void}
     */
    protected update(changedProperties: PropertyValues): void;
    /**
     * @param barCount bar count for calculate positions
     * @param val value for calculate positions
     * @returns value bar index
     */
    private getValueBarIndex;
    /**
     * @param varName css variable name
     * @returns {void}
     */
    private fillBarColor;
    /**
     * @param idx index of bar for find what section it belongs
     * @param sectionLength length of section for find section color
     * @param barAmount bar amount
     * @returns color variable name
     */
    private getBarColor;
    /**
     * @param id id of the label can be top, bottom or range
     * @param labelPos position of label in pixel
     * @returns {void}
     */
    private updateLabelPosition;
    /**
     * Render a led-gauge bar in canvas
     * @returns {void}
     */
    private renderBarGauge;
    /**
     * @param value value of gauge bar
     * @param label user label
     * @param id id of template
     * @returns template to render
     */
    private createLabelTemplate;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    protected render(): TemplateResult;
}
