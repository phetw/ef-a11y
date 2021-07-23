import { ControlElement, TemplateResult, CSSResult, PropertyValues } from '@refinitiv-ui/core';
/**
 * Form control that can toggle between 2 states
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @fires checked-changed - Fired when the `checked` property changes.
 */
export declare class Toggle extends ControlElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * Label of toggle checked
     */
    checkedLabel: string;
    /**
     * Label of toggle
     */
    label: string;
    /**
     * Value of toggle
     */
    checked: boolean;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @returns CSS template
     */
    static get styles(): CSSResult | CSSResult[];
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     * @param changedProperties Map of changed properties with old values
     * @returns {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * Called when checked value changes and dispatch the event
     * @returns {void}
     */
    private handleCheckedChange;
    /**
     * Handle keyboard event for toggle action
     * @param event Keyboard event
     * @returns {void}
     */
    private handleKeyDown;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    protected render(): TemplateResult;
}
