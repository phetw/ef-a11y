import { ControlElement, CSSResult, PropertyValues, TemplateResult } from '@refinitiv-ui/core';
import '../icon';
/**
 * A form control element for email
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
export declare class EmailField extends ControlElement {
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
     * Set character max limit
     */
    maxLength: number | null;
    /**
     * Set character min limit
     */
    minLength: number | null;
    /**
     * Set to multiple mode, allows multiple emails in a single input
     */
    multiple: boolean;
    /**
     * Specify icon to display in input. Value can be icon name
     */
    icon: string;
    /**
     * Specify when icon need to be clickable
     */
    iconHasAction: boolean;
    /**
     * Get native input element from shadow roots
     */
    private inputElement;
    /**
     * Select the contents of input
     * @returns {void}
     */
    select(): void;
    /**
     * Called when the element’s DOM has been updated and rendered
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Check if input should be re-validated
     * @param changedProperties Properties that has changed
     * @returns True if input should be re-validated
     */
    private shouldValidateInput;
    /**
     * Check if value is changed and fire event
     * @returns {void}
     */
    private onPossibleValueChange;
    /**
     * Validate input according `pattern`, `minLength` and `maxLength` properties
     * change state of `error` property according pattern validation
     * @returns {void}
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
     * Process internal icon click and fire `icon-click` event
     * @returns {void}
     */
    private iconClick;
    /**
     * Fire event on `icon` click
     * @returns {void}
     */
    private notifyIcon;
    /**
     * Renders icon element if property present
     * @returns {TemplateResult | null} Template result
     */
    private renderIcon;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult} Render template
     */
    protected render(): TemplateResult;
}
