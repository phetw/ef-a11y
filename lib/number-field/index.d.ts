import { ControlElement, CSSResult, TemplateResult, PropertyValues } from '@refinitiv-ui/core';
import '../icon';
/**
 * Form control element for numbers
 *
 * @fires value-changed - Dispatched when value changes
 * @fires error-changed - Dispatched when error state changes
 *
 * @attr {string} value - Input's default value
 * @prop {string} [value=] - Input's value
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 */
export declare class NumberField extends ControlElement {
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
     * Set placeholder text
     */
    placeholder: string | null;
    /**
     * Set spinner's visibility
     */
    noSpinner: boolean;
    /**
     * Set step value
     */
    step: string | null;
    /**
     * Set minimum value.
     * This value must be less than or equal to the value of the `max` attribute
     */
    min: string | null;
    /**
     * Set maximum value.
     * This value must be greater than or equal to the value of the `min` attribute
     */
    max: string | null;
    /**
     * Set state to transparent
     */
    transparent: boolean;
    /**
     * Set state to error
     */
    error: boolean;
    /**
     * Set state to warning
     */
    warning: boolean;
    private interimValueState;
    /**
    * The value of the number entered into the input.
    * @param value number-field value
    */
    set value(value: string);
    get value(): string;
    /**
     * Returns the value of the element, interpreted as double number
     */
    get valueAsNumber(): number;
    /**
     * Get native input element from shadow root
     */
    private inputEl;
    /**
     * Get spinner up element
     */
    private spinnerUpEl?;
    /**
    * Get spinner down element
    */
    private spinnerDownEl?;
    /**
     * Updates the element
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    protected update(changedProperties: PropertyValues): void;
    /**
     * Called when the element’s DOM has been updated and rendered
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Convert string to number
     * @param value value to convert
     * @returns NaN if string is an invalid number or Infinity or empty string;
     */
    private stringToNumber;
    /**
     * Convert a float number to a fixed number
     * @param value Value to convert
     * @param [decimals] optional decimals. Default is based on step base and allowed value step
     * @returns fixed number
     */
    private toFixedNumber;
    /**
     * Convert step value from string to number or 'any'
     * @returns step value of input as a number or 'any'
     */
    private get stepValue();
    /**
     * Get the number of decimal places
     * @param value Value to check
     * @returns the number of decimal places
     */
    private getDecimalPlace;
    /**
     * Get number of decimals based on step base and allowed value step
     * @returns decimals
     */
    private get stepDecimals();
    /**
     * Check if passed value is a valid value
     * @override
     * @param value Value to check
     * @returns {boolean} false if value is invalid
     */
    protected isValidValue(value: string): boolean;
    /**
     * Get value as valid number string.
     * @param value A value to convert
     * @returns string value
     */
    private valueAsNumberString;
    /**
     * Get either inputValue or actual value dependant on control state
     * @returns string of input value
     */
    private get internalValue();
    /**
     * Get native input value
     * @returns string of input value
     */
    private get inputValue();
    /**
     * Set native input value
     * @param value input's value
     */
    private set inputValue(value);
    /**
     * Handles key down input event
     * @param event Key down event object
     * @returns {void}
     */
    private onNativeInputKeyDown;
    /**
     * Run when spinner has been tapped
     * @param event tap event
     * @returns {void}
     */
    private onSpinnerTap;
    /**
     * Step down or up and notify value change
     * @param direction Up or Down
     * @returns {void}
     */
    private onApplyStep;
    /**
     * Run before input changes
     * Prevent invalid characters
     * @param event before input event
     * @returns {void}
     */
    private onNativeBeforeInputChange;
    /**
     * Triggers when native input value change with input event or change event
     * @param event Input event
     * @returns {void}
     */
    private onNativeInputChange;
    /**
     * Stripe characters from input text based on previous input and data
     * @param input The new input to process
     * @param oldInput Previous input
     * @param data The data that has been inserted
     * @returns the input where characters are striped away
     */
    private stripeInvalidCharacters;
    /**
     * On *user-interaction* set the value and notify.
     * This function will not call request update, but will fire value-changed event
     * @returns {void}
     */
    private setSilentlyValueAndNotify;
    /**
     * Reset error state on input
     * @returns {void}
     */
    private resetError;
    /**
     * Get the allowed step value
     * @returns allowed step
     */
    private getAllowedValueStep;
    /**
     * Get the step base as per HTML5 specs
     * @returns step base
     */
    private get stepBase();
    /**
     * Check if value subtracted from the step base is not an integral multiple of the allowed value step
     * @param value value to check
     * @returns true if value is integral
     */
    private isValueIntegralMultipleOfStep;
    /**
     * Find the nearest value that, when subtracted from the `stepBase`
     * is an integral multiple of the `allowedValueStep`,
     * and that is less than `value` if the `direction` was `Down`, and more than value otherwise.
     * @param value the value to operate on
     * @param stepBase base to start calculation
     * @param allowedValueStep a step to go Down or Up
     * @param direction Direction, either -1 for Down or 1 for Up
     * @returns nearest number
     */
    private findNearestSteppedValue;
    /**
     * Apply step up or step down on the input
     * @param stepIncrement step increment factor
     * @param direction either go up or down
     * @returns {void}
     */
    private applyStepDirection;
    /**
     * Increases the input value by amount of step
     * @param [stepIncrement] The stepIncrement parameter is a numeric value. If no parameter is passed, stepIncrement defaults to 1.
     * @returns {void}
     */
    stepUp(stepIncrement?: number): void;
    /**
     * Decreases the input value by amount of step
     * @param [stepIncrement] The stepIncrement parameter is a numeric value. If no parameter is passed, stepIncrement defaults to 1.
     * @returns {void}
     */
    stepDown(stepIncrement?: number): void;
    /**
     * Returns true if an input element contains valid data.
     * @returns true if input is valid
     */
    checkValidity(): boolean;
    /**
     * Validate input. Mark as error if input is invalid
     * @returns false if there is an error
     */
    reportValidity(): boolean;
    /**
     * Select the contents of input
     * @returns void
     */
    select(): void;
    /**
     * Renders spinner
     * @returns {TemplateResult} spinner part template
     */
    private renderSpinner;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    protected render(): TemplateResult;
}
