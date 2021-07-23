import { BasicElement, TemplateResult, CSSResult, PropertyValues } from '@refinitiv-ui/core';
/**
 * Used to display multiple buttons to create a list of commands bar.
 */
export declare class ButtonBar extends BasicElement {
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
     * Manages user interaction, only allowing one toggle button to be active at any one time.
     */
    managed: boolean;
    /**
     * Default slot
     */
    private defaultSlot;
    /**
     * Called once after the component is first rendered
     * @param changedProperties map of changed properties with old values
     * @returns {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * Handles tap event
     * @param event the param is the event of click and tap handlers
     * @returns {void}
     */
    private onTapHandler;
    /**
     * Get the target Button item and handle it with other managed Button items
     * @param targetButton an Button item is the target of the event
     * @returns {void}
     */
    private manageButtons;
    /**
     * Return the array of Element items which is changed in the default slot
     * @returns the array of Element of the default slot
     */
    private getElementsOfSlot;
    /**
     * Filter Button classes by the toggles property
     * @param buttons the array of Button items is the converted nodes of the default slot
     * @returns filtered Button items by the toggles property
     */
    private getManagedButtons;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    protected render(): TemplateResult;
}
