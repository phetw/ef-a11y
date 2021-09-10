import { JSXInterface } from '../jsx';
import { ControlElement, TemplateResult, CSSResult, PropertyValues } from '@refinitiv-ui/core';
import '../number-field';
/**
 * Allows users to make selections from a range of values
 *
 * @attr {string} value - Value of slider. Not applicable in range mode.
 * @prop {string} [value=0] - Value of slider. Not applicable in range mode.
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @fires value-changed - Fired when the `value` changes.
 * @fires from-changed - Fired when the `from` changes.
 * @fires to-changed - Fired when the `to` changes.
 */
export declare class Slider extends ControlElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    private activeThumb;
    private dragging;
    private stepUse;
    private decimalPlaces;
    private dragElements;
    private isEventReady;
    private valuePrevious;
    private fromPrevious;
    private toPrevious;
    /**
     * Specified size of increment or decrement jump between value.
     */
    step: string;
    /**
     * Set minimum value of slider.
     */
    min: string;
    /**
     * Slider maximum value of slider.
     */
    max: string;
    /**
     * Uses with `range`. Low value of slider in range mode.
     */
    from: string;
    /**
     * Uses with `range`. High value of slider in range mode
     */
    to: string;
    /**
     * Set slider appearances to show pin mode.
     * @ignore
     * NOTE: Pin isn't applicable in Halo. Hide this from document
     */
    pin: boolean;
    /**
     * Set slider to range mode. Instead of a single value, slider will provide `from` and `to`.
     */
    range: boolean;
    /**
     * Show steps marker on slider.
     */
    showSteps: boolean;
    /**
     * Show input number field.
     */
    showInputField: 'readonly' | '' | null;
    /**
     * Uses with `range`. Set minimum allowance value (distance) between `from` and `to`.
     */
    minRange: string;
    /**
     * Converts value from string to number for calculations
     * @returns value of input as a number
     */
    private get valueNumber();
    /**
     * Converts min value from string to number for calculations
     * @returns minimum value of slider as a number
     */
    private get minNumber();
    /**
     * Converts max value from string to number for calculations
     * @returns maximum value of slider as a number
     */
    private get maxNumber();
    /**
     * Converts step value from string to number for calculations
     * @returns step value of slider as a number
     */
    private get stepNumber();
    /**
     * Converts from value from string to number for calculations
     * @returns from value of slider as a number
     */
    private get fromNumber();
    /**
     * Converts to value from string to number for calculations
     * @returns to value of slider as a number
     */
    private get toNumber();
    /**
     * Converts min-range from string to number for calculations
     * @returns min-range of input as a number
     */
    private get minRangeNumber();
    /**
     * Return hide/show input field state
     * @returns {boolean} true if showInputField value is exist
     */
    private get isShowInputField();
    /**
     * Getter for slider part.
     */
    private slider;
    /**
     * Getter track wrapper in thumb container slider part.
     */
    private trackWrapper;
    /**
     * Getter for thumb container in slider part.
     */
    private thumbContainer;
    /**
     * Getter for number-field value.
     */
    private valueInput;
    /**
     * Getter for number-field from.
     */
    private fromInput;
    /**
     * Getter for number-field to.
     */
    private toInput;
    /**
     * On first updated lifecycle
     * @param changedProperties changed properties
     * @returns {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * On Update lifecycle
     * @param changedProperties changed properties
     * @returns {void}
     */
    protected update(changedProperties: PropertyValues): void;
    /**
     * @param changedProperties changed properties
     * @returns {void}
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Show Warning a warning message invalid property
     * @param propName value for checking
     * @returns {void}
     */
    private showWarningInvalidProperty;
    /**
     * Initialise class properties
     * @returns {void}
     */
    private initializeProperty;
    /**
     * Initialise slider properties
     * @returns {void}
     */
    private initSlider;
    /**
     * Calculate step in range
     * @param step value step for calculate
     * @returns step value that should be inside the min / max boundary
     */
    private calculateStepRange;
    /**
     * Check if step or min number is decimal
     * If yes, set number of decimal places
     * @returns {void}
     */
    private updateDecimalPlaces;
    /**
     * Count decimal number
     * @param value value for checking
     * @returns number of decimal points
     */
    private countDecimals;
    /**
     * Check if decimal number e.g. 10.5, etc
     * @param value value for checking
     * @returns true if value is decimal
     */
    private isDecimalNumber;
    /**
     * Calculate percentage by value
     * @param value value to be calculated
     * @returns percentage
     */
    private calculatePercentage;
    /**
     * Add and remove event listener when have disable and readonly properties
     * @returns {void}
     */
    private updateEventListeners;
    /**
     * Input number event blur and notify property
     * @param event event blur input number field
     * @returns {void}
     */
    private onBlur;
    /**
     * Input number event keydown y
     * @param event event keydown
     * @returns {void}
     */
    private onKeydown;
    /**
     * Handles key press keyboard events
     *
     * @param event Event Object
     * @returns {void}
     */
    private handleEnterKey;
    /**
     * Update notify property by input name attribute
     * @param name name input attribute
     * @param value input value
     * @returns {void}
     */
    private updateNotifyProperty;
    /**
     * Dispatch data {value, from, to} changed event
     * @returns {void}
     */
    private dispatchDataChangedEvent;
    /**
     * Set focus to input from state
     * @param {String} name number field's name
     * @param {Boolean} focusState state of focus
     * @returns {void}
     */
    private toggleFocusField;
    /**
     * Start dragging event on slider
     * @param event event dragstart
     * @returns {void}
     */
    private onDragStart;
    /**
     * @param event event mousemove and touchmove
     * @returns mouse position by percentage
     */
    private getMousePosition;
    /**
     * Dragging after on dragging start event
     * @param event event mousemove and touchmove
     * @returns {void}
     */
    private onDrag;
    /**
     * Handle 'from' value on drag out of boundary.
     * @param value value from change
     * @returns validated from value.
     */
    private validateFrom;
    /**
     * Handle 'To' value on drag out of boundary.
     * @param value value to change
     * @returns validated to value.
     */
    private validateTo;
    /**
     * Calculate the nearest interval
     * @param thumbPosition thumb position dragging on slider
     * @returns position step on slider
     */
    private calculateStep;
    /**
     * Calculate value by percentage
     * @param percentage percentage to be calculated
     * @returns calculated value
     */
    private calculateValue;
    /**
     * Format value to display in both integer and fraction cases
     * @param value value before use display
     * @returns formatted value
     */
    private displayValue;
    /**
     * End dragging event and remove dragging event
     * @param e event mouseup and touchmove
     * @returns {void}
     */
    private onDragEnd;
    /**
     * Value observer
     * @returns {void}
     */
    private onValueChange;
    /**
     * From value observer
     * @returns {void}
     */
    private onValueChangeFrom;
    /**
     * Return fallback number of the value is invalid
     * @param value value for checking
     * @param fallbackValue fallback value when value is not number;
     * @returns sanitized number
     */
    private sanitizeNumber;
    /**
     * Check if value is number
     * @param value value for checking
     * @returns true if value is numeric
     */
    private isNumberValue;
    /**
     * Check if value is inside min / max boundary
     * @param value value is checking
     * @param valueFor notation variable binding if range === true
     * @returns true if value and step inside a boundary
     */
    private isValueInBoundary;
    /**
     * To value observer
     * @returns {void}
     */
    private onValueChangeTo;
    /**
     * Step observer
     * @returns {void}
     */
    private onStepChange;
    /**
     * Min range observer
     * @returns {void}
     */
    private onMinRangeChange;
    /**
     * Min observer
     * @param oldValue old value of min property
     * @returns {void}
     */
    private onMinChange;
    /**
     * Max observer
     * @param oldValue old value of max property
     * @returns {void}
     */
    private onMaxChange;
    /**
     * Implement `render` Track template.
     * @param range show range slider
     * @returns Track template
     */
    private renderTrackWrapper;
    /**
     * Implement `render` Thumb template.
     * @param value thumb value in track
     * @param percentageValue thumb position in track
     * @param name name of active thumb
     * @returns Track template
     */
    private renderThumb;
    /**
     * Implement `render` Thumb has range template.
     * @param from thumb value start in track
     * @param to thumb value end in track
     * @returns Thumb has range template
     */
    private renderThumbRange;
    /**
     * Implement `render` number field has template.
     * @param value value in the slider for binding in the input value
     * @param name name input value
     * @returns {TemplateResult}  number field template
     */
    private renderNumberField;
    /**
     * Define styles in a tagged template literal, using the css tag function.
     * @returns CSS template
     */
    static get styles(): CSSResult | CSSResult[];
    /**
     * Implement `render` slider template.
     * @returns Slider template
     */
    protected render(): TemplateResult;
}
//# sourceMappingURL=index.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-slider': Slider;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-slider': Partial<Slider> | JSXInterface.ControlHTMLAttributes<Slider>;
    }
  }
}

export {};
