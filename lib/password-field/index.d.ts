import { ControlElement, CSSResult, PropertyValues, TemplateResult } from '@refinitiv-ui/core';
import '../icon';
/**
 * A form control element for password
 *
 * @fires value-changed - Dispatched when value changes
 * @fires error-changed - Dispatched when error state changes
 *
 * @attr {string} value - Input's value
 * @prop {string} [value=] - Input's value
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 */
export declare class PasswordField extends ControlElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * @return A `CSSResult` that will be used to style the host,
     * slotted children and the internal template of the element.
     */
    static get styles(): CSSResult | CSSResult[];
    /**
     * Set regular expression for input validation
     */
    pattern: string;
    /**
     * Set placeholder text
     */
    placeholder: string;
    /**
     * Set state to error
     */
    error: boolean;
    /**
     * Set state to warning
     */
    warning: boolean;
    /**
     * Disables all other states and border/background styles.
     * Use with advanced composite elements requiring e.g. multi selection in
     * combo-box when parent container handles element states.
     */
    transparent: boolean;
    /**
     * Set character minimum limit
     */
    minLength: number | null;
    /**
     * Set character maximum limit
     */
    maxLength: number | null;
    /**
     * Get native input element from shadow roots
     */
    private inputElement;
    /**
     * Defines whether password is visible or not
     */
    private isPasswordVisible;
    /**
     * Select the contents of input
     * @return void
     */
    select(): void;
    /**
     * Called when the element’s DOM has been updated and rendered for the first time
     * @param changedProperties Properties that has changed
     * @return shouldUpdate
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * Called when the element’s DOM has been updated and rendered
     * @param changedProperties Properties that has changed
     * @return shouldUpdate
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    protected render(): TemplateResult;
    /**
     * Check if input should be re-validated
     * True if value changed and pattern or minlength is present
     * True if pattern or minlength changed
     * @param changedProperties Properties that has changed
     * @return True if input should be re-validated
     */
    private shouldValidateInput;
    /**
     * check if value is changed and fire event
     * @return {void}
     */
    private onPossibleValueChange;
    /**
     * validate input according `pattern`, `min` and `max` properties
     * change state of `error` property according pattern validation
     * @return void
     */
    private validateInput;
    /**
     * @param error existing state of error
     * @returns true if there is no error and browser is IE11 and minLength more than 0 and value exists
     */
    private shouldValidateForMinLength;
    /**
     * Detect `enter` and `space` keydown and fire
     * @param event keydown event
     * @returns {void}
     */
    private handleKeyDown;
    /**
     * Toggles password visibility state
     * @return void
     */
    private togglePasswordVisibility;
}
