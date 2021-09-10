import { JSXInterface } from '../jsx';
import { ControlElement, TemplateResult, CSSResult, PropertyValues } from '@refinitiv-ui/core';
import '../icon';
/**
 * Form control for selecting one or several options
 * @fires checked-changed - Fired when the `checked` property changes.
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 */
export declare class Checkbox extends ControlElement {
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
     * Value of checkbox
     */
    checked: boolean;
    /**
     * Set state to indeterminate
     */
    indeterminate: boolean;
    /**
     * Getter for label
     */
    private labelEl;
    /**
     * Updates the element
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    protected update(changedProperties: PropertyValues): void;
    /**
     * Called once after the component is first rendered
     * @param changedProperties map of changed properties with old values
     * @returns {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * Run when checkbox is tapped
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
     * @return {TemplateResult}  Render template
     */
    protected render(): TemplateResult;
}
//# sourceMappingURL=index.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-checkbox': Checkbox;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-checkbox': Partial<Checkbox> | JSXInterface.ControlHTMLAttributes<Checkbox>;
    }
  }
}

export {};
