import { JSXInterface } from '../jsx';
import { CSSResult, ControlElement, TemplateResult, PropertyValues } from '@refinitiv-ui/core';
/**
 * Basic radio button
 *
 * @fires checked-changed - Fired when the `checked` property changes.
 *
 * @attr {string} [value=] - Value of the radio button
 * @prop {string} [value=] - Value of the radio button
*
 * @attr {string} [name=] - Group multiple radio buttons by assigning the same name
 * @prop {string} [name=] - Group multiple radio buttons by assigning the same name
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 */
export declare class RadioButton extends ControlElement {
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
    static get styles(): CSSResult | CSSResult[];
    /**
     * Radio button checked state
     */
    checked: boolean;
    /**
     * Getter for label
     */
    private labelEl;
    /**
     * Called when connected to DOM
     * @returns {void}
     */
    connectedCallback(): void;
    /**
     * Called when disconnected from DOM
     * @returns {void}
     */
    disconnectedCallback(): void;
    /**
     * Invoked whenever the element is update
     * @param changedProperties changed properties
     * @returns {void}
     */
    protected update(changedProperties: PropertyValues): void;
    /**
     * Invoked when the element is first updated
     * @param changedProperties changed properties
     * @returns {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * Manage group members state, when either one is being checked
     * @returns {void}
     */
    private manageGroupState;
    /**
     * Run when radio button is tapped
     * @param event Tap event
     * @returns {void}
     */
    private onTap;
    /**
     * Handles key down event
     * @param event Key down event object
     * @returns {void}
     */
    private onKeyDown;
    /**
     * Change checked state and fire
     * checked-changed event
     * @return {void}
     */
    private handleChangeChecked;
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
    'ef-radio-button': RadioButton;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-radio-button': Partial<RadioButton> | JSXInterface.ControlHTMLAttributes<RadioButton>;
    }
  }
}

export {};
