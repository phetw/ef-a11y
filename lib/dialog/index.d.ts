import { CSSResult, TemplateResult, ElementSize, PropertyValues } from '@refinitiv-ui/core';
import { Overlay } from '../overlay';
import '../icon';
import '../panel';
import '../header';
import '../button';
import { Translate } from '@refinitiv-ui/translate';
import '@refinitiv-ui/phrasebook/lib/locale/en/dialog';
/**
 * Popup window, designed to contain and show any HTML content.
 * It provides modal and dragging functionality,
 * and also allows custom footers and control buttons to be used.
 *
 * @prop {boolean} noCancelOnOutsideClick - Prevents dialog to close when user clicks outside the dialog.
 *
 * @attr {boolean} [opened=false] - Set dialog to open
 * @prop {boolean} [opened=false] - Set dialog to open
 *
 * @attr {boolean} [no-cancel-on-esc-key=false] - Prevents dialog to close when user presses ESC key
 * @prop {boolean} [noCancelOnEscKey=false] - Prevents dialog to close when user presses ESC key
 *
 * @attr {string} x - Set a specific x coordinate of dialog
 * @prop {string} x - Set a specific x coordinate of dialog
 *
 * @attr {string} y - Set a specific y coordinate of dialog
 * @prop {string} y - Set a specific y coordinate of dialog
 *
 * @attr {boolean} full-screen - Set dialog to full screen
 * @prop {boolean} fullScreen - Set dialog to full screen
 *
 * @attr {string} position-target - Set position of dialog i.e. `top`, `right`, `left`, `bottom`, `center` or combination of theme e.g. `top right`.
 * @prop {string} positionTarget - Set position of dialog i.e. `top`, `right`, `left`, `bottom`, `center` or combination of theme e.g. `top right`.
 *
 * @fires opened-changed - Fired when value of `opened` property is changed. Prevent default to stop default action
 * @fires confirm - Fired when dialog is closed by user clicked a default OK button. Prevent default to stop default action
 * @fires cancel - Fired when dialog is closed by user clicked a default Cancel button, clicked outside to close dialog or press ESC to close the dialog. Prevent default to stop default action
 *
 * @slot footer - Hide default OK and Cancel button and replace dialog's footer with your custom content.
 */
export declare class Dialog extends Overlay {
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
     * Set Header/Title of the dialog
     */
    header: string | null;
    /**
     * Should the dialog be draggable
     */
    draggable: boolean;
    /**
     * Used for translations
     */
    protected t: Translate;
    /**
     * Element for capture dragging
     */
    private handle;
    /**
     * Content element
     */
    private contentElement;
    /**
     * Header element
     */
    private headerElement;
    /**
     * Footer Element
     */
    private footerElement;
    /**
    * @ignore
    */
    noCancelOnOutsideClick: boolean;
    /**
    * @ignore
    */
    withBackdrop: boolean;
    /**
    * @ignore
    */
    withShadow: boolean;
    disconnectedCallback(): void;
    /**
     * Clear all cached values and fit the popup.
     * Use this function only if maxWidth, maxHeight, minWidth, minHeight, height, width are changed
     * @returns {void}
     */
    refit(): void;
    /**
     * Called when the element's dimensions have changed
     * @ignore
     * @param size dimension details
     * @returns {void}
     */
    resizedCallback(size: ElementSize): void;
    /**
     * Check if component should be updated
     * @param changedProperties properties changed on shouldUpdate lifecycle callback
     * @returns boolean should component update
     */
    protected shouldUpdate(changedProperties: PropertyValues): boolean;
    /**
     * Called after the element’s properties has been updated
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Run when the popup has closed, managers are de-registered
     * and closing transition has finished
     * @returns {void}
     */
    protected onClosed(): void;
    /**
     * IE11 only: Restrict maximum height of content element
     * @param [maxHeight] Maximum height of content element
     * @returns {void}
     */
    private restrictContentMaxHeight;
    /**
     * IE11 only: Calculate the maxHeight of content element
     * @param size Size of the dialog
     * @returns {void}
     */
    private calculateContentMaxHeight;
    /**
     * Default handler for confirm click
     * @returns {void}
     */
    protected defaultConfirm(): void;
    /**
     * Default handler for cancel click
     * @returns {void}
     */
    protected defaultCancel(): void;
    /**
     * Update draggable behavior looking to properties draggable and opened
     * @returns {void}
     */
    private updateDraggableBehavior;
    /**
     * @param changedProperties - updated properties map
     * @returns true if needs to update draggable behavior
     */
    private isDraggableBehaviourNeedToBeChanged;
    /**
     * fire `cancel` or `confirm` event looking to `confirm` property
     * @param isConfirm true to fire `confirm` event. false to fire `cancel` event
     * @returns true if event is successful, false if event is prevented
     */
    private fireCancelOrConfirmEvent;
    /**
     * Get the default content region
     * @return {TemplateResult} Render template
     */
    protected get contentRegion(): TemplateResult;
    /**
     * Get the default footer region
     * @return {TemplateResult} Render template
     */
    protected get footerRegion(): TemplateResult;
    /**
     * Get the default header region
     * @return {TemplateResult} Render template
     */
    protected get headerRegion(): TemplateResult;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult} Render template
     */
    protected render(): TemplateResult;
}
