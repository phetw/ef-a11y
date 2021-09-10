import { JSXInterface } from '../jsx';
import { TemplateResult, CSSResult, PropertyValues } from '@refinitiv-ui/core';
import { Translate } from '@refinitiv-ui/translate';
import '@refinitiv-ui/phrasebook/lib/locale/en/color-dialog';
import '../button';
import '../number-field';
import '../text-field';
import { Dialog } from '../dialog';
import './elements/color-palettes';
import './elements/grayscale-palettes';
/**
 * Displays a colour picker dialog,
 * for selecting a predefined range of colours.
 *
 * @fires value-changed - Fired when the `value` property changes.
 * @fires opened-changed - Fired when the `opened` property changes.
 *
 * @attr {string|null} header - Set Header/Title of the color dialog
 * @prop {string|null} header - Set Header/Title of the color dialog
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
 * @attr {string} position-target - Set position of dialog i.e. `top`, `right`, `left`, `bottom`, `center` or combination of theme e.g. `top right`.
 * @prop {string} positionTarget - Set position of dialog i.e. `top`, `right`, `left`, `bottom`, `center` or combination of theme e.g. `top right`.
 *
 * @prop {boolean} [noCancelOnOutsideClick=true] - Prevents dialog to close when user clicks outside the dialog.
 *
 * @prop {boolean} [withBackdrop=true] - False to hide backdrop.
 *
 * @prop {boolean} [draggable=true] - False to make the dialog not draggable.
 *
 * @prop {boolean} [withShadow=true] - False to remove shadow for dialog component.
 */
export declare class ColorDialog extends Dialog {
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
     * speed up rendering by not populating content on page load
     */
    private lazyRendered;
    /**
     * Color dialog has commit button to update actual values
     * Value model is used to support this functionality
     */
    private valueModel;
    /**
    * @ignore
    */
    draggable: boolean;
    /**
     * Set the palettes to activate no-color option
     */
    allowNocolor: boolean;
    private _value;
    /**
     * Value of selected color from color dialog will be written here as hex value
     * e.g. "#00f" or "#0000ff"
     * @default -
     * @param value A value to set
     */
    set value(value: string);
    get value(): string;
    /**
     * Value of hex without # sign, supports both 3-digits shorthand hex and regular 6-digits hex
     * @default -
     * @param hex A hex value to set
     */
    set hex(hex: string);
    get hex(): string;
    /**
     * Red value from 0 to 255
     * @default -
     * @param red Red value
     */
    set red(red: string);
    get red(): string;
    /**
     * Green value from 0 to 255
     * @default -
     * @param green Green value
     */
    set green(green: string);
    get green(): string;
    /**
     * Blue value from 0 to 255
     * @default -
     * @param blue Blue value
     */
    set blue(blue: string);
    get blue(): string;
    /**
     * Used for translations
     */
    protected t: Translate;
    /**
     * A rgb color input for red spectrum
     */
    private redInputEl?;
    /**
     * A rgb color input for green spectrum
     */
    private greenInputEl?;
    /**
     * A rgb color input for blue spectrum
     */
    private blueInputEl?;
    /**
     * Check if component should be updated
     * @param changedProperties properties changed on shouldUpdate lifecycle callback
     * @returns boolean should component update
     */
    protected shouldUpdate(changedProperties: PropertyValues): boolean;
    /**
     * Updates the element
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    protected update(changedProperties: PropertyValues): void;
    /**
     * @inheritdoc
     * Reset value model
     * @param opened True if opened
     * @returns {void}
     */
    protected setOpened(opened: boolean): void;
    /**
     * Reset value model always resets
     * when either red, green, blue, hex or value are changed externally
     * Value model is reset internally otherwise
     * @returns {void}
     */
    private resetValueModel;
    /**
     * Check if value is valid HEX value (including #)
     * @param value Value to check
     * @returns true if value is valid
     */
    private isValidValue;
    /**
     * Check if value is valid HEX value (excluding #)
     * @param value Value to check
     * @returns true if value is valid
     */
    private isValidHex;
    /**
     * Check if value is within 0 - 255, and warn of it is not
     * @param value Value to check
     * @returns true if value is within 0 - 255
     */
    private isValidRGB;
    /**
     * update color value when tapping or dragging on color palettes
     * @param event select color event
     * @return {void}
     */
    private onColorChanged;
    /**
     * update hex value when typing on hex input
     * @param event input event
     * @return {void}
     */
    private onHexChanged;
    /**
     * update r,g,b value when typing on RGB inputs
     * @param event input event
     * @return {void}
     */
    private onRGBChanged;
    /**
     * set opened state to false
     * @return {void}
     */
    private onCloseDialog;
    /**
     * fired value-changed event and close dialog
     * @return {void}
     */
    private onConfirmValue;
    /**
     * Check if apply button is disabled
     * The button is disabled if value is invalid
     * or value has not changed
     * @returns {boolean} true if disabled
     */
    private isApplyDisabled;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    protected get contentRegion(): TemplateResult;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    protected get footerRegion(): TemplateResult;
}
//# sourceMappingURL=index.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-color-dialog': ColorDialog;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-color-dialog': Partial<ColorDialog> | JSXInterface.HTMLAttributes<ColorDialog>;
    }
  }
}

export {};
