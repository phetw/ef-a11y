var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, customElement, property, WarningNotice, styleMap, query } from '@refinitiv-ui/core';
import { translate } from '@refinitiv-ui/translate';
import '@refinitiv-ui/phrasebook/lib/locale/en/color-dialog';
import '../button';
import '../number-field';
import '../text-field';
import { Dialog } from '../dialog';
import './elements/color-palettes';
import './elements/grayscale-palettes';
import { ColorHelpers } from './helpers/color-helpers';
import { ValueModel } from './helpers/value-model';
import { VERSION } from '../';
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
let ColorDialog = class ColorDialog extends Dialog {
    constructor() {
        super(...arguments);
        /**
         * speed up rendering by not populating content on page load
         */
        this.lazyRendered = false;
        /**
         * Color dialog has commit button to update actual values
         * Value model is used to support this functionality
         */
        this.valueModel = new ValueModel();
        /**
        * @ignore
        */
        this.draggable = true;
        /**
         * Set the palettes to activate no-color option
         */
        this.allowNocolor = false;
        this._value = '';
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
        return VERSION;
    }
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return {CSSResult | CSSResult[]} CSS template
     */
    static get styles() {
        return [...Dialog.styles,
            css `
        :host {
          display: block;
        }
        [part=preview-color][no-color] {
          background: linear-gradient(to bottom right, transparent calc(50% - 2px),
          var(--no-color-line-color, #ff0000) calc(50% - 1px),
          var(--no-color-line-color, #ff0000) calc(50% + 1px),
          transparent calc(50% + 2px));
        }
    `];
    }
    /**
     * Value of selected color from color dialog will be written here as hex value
     * e.g. "#00f" or "#0000ff"
     * @default -
     * @param value A value to set
     */
    set value(value) {
        value = String(value);
        const oldValue = this._value;
        if (!this.isValidValue(value)) {
            value = '';
        }
        this._value = value;
        void this.requestUpdate('value', oldValue);
    }
    get value() {
        return this._value;
    }
    /**
     * Value of hex without # sign, supports both 3-digits shorthand hex and regular 6-digits hex
     * @default -
     * @param hex A hex value to set
     */
    set hex(hex) {
        hex = String(hex);
        if (!this.isValidHex(hex)) {
            hex = '';
        }
        this.value = hex ? `#${hex}` : '';
    }
    get hex() {
        const value = this.value;
        return value ? ColorHelpers.removeHashSign(value) : '';
    }
    /**
     * Red value from 0 to 255
     * @default -
     * @param red Red value
     */
    set red(red) {
        red = String(red);
        this.value = this.isValidRGB(red) ? ColorHelpers.rgbToHex(red, this.green, this.blue) : '';
    }
    get red() {
        return this.hex ? ColorHelpers.hexToRGB(this.hex).red : '';
    }
    /**
     * Green value from 0 to 255
     * @default -
     * @param green Green value
     */
    set green(green) {
        green = String(green);
        this.value = this.isValidRGB(green) ? ColorHelpers.rgbToHex(this.red, green, this.blue) : '';
    }
    get green() {
        return this.hex ? ColorHelpers.hexToRGB(this.hex).green : '';
    }
    /**
     * Blue value from 0 to 255
     * @default -
     * @param blue Blue value
     */
    set blue(blue) {
        blue = String(blue);
        this.value = this.isValidRGB(blue) ? ColorHelpers.rgbToHex(this.red, this.green, blue) : '';
    }
    get blue() {
        return this.hex ? ColorHelpers.hexToRGB(this.hex).blue : '';
    }
    /**
     * Check if component should be updated
     * @param changedProperties properties changed on shouldUpdate lifecycle callback
     * @returns boolean should component update
     */
    shouldUpdate(changedProperties) {
        const shouldUpdate = super.shouldUpdate(changedProperties);
        return shouldUpdate
            || changedProperties.has('allowNocolor')
            || changedProperties.has('red')
            || changedProperties.has('green')
            || changedProperties.has('blue')
            || changedProperties.has('value')
            || changedProperties.has('hex')
            || changedProperties.has('enableConfirm');
    }
    /**
     * Updates the element
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    update(changedProperties) {
        if (changedProperties.has('value')) {
            // ensure that the internal values are always in sync when set externally
            this.resetValueModel();
        }
        if (this.opened && changedProperties.has('opened')) {
            this.lazyRendered = true;
        }
        super.update(changedProperties);
    }
    /**
     * @inheritdoc
     * Reset value model
     * @param opened True if opened
     * @returns {void}
     */
    setOpened(opened) {
        // setOpened is run only from internal context. It is safe to reset it here
        this.resetValueModel();
        super.setOpened(opened);
    }
    /**
     * Reset value model always resets
     * when either red, green, blue, hex or value are changed externally
     * Value model is reset internally otherwise
     * @returns {void}
     */
    resetValueModel() {
        this.valueModel = new ValueModel(this.value);
    }
    /**
     * Check if value is valid HEX value (including #)
     * @param value Value to check
     * @returns true if value is valid
     */
    isValidValue(value) {
        const isValid = value === '' || ColorHelpers.isHex(value);
        if (!isValid) {
            new WarningNotice(`The specified value "${value}" is not valid value. The correct value should look like "#fff" or "#ffffff".`).show();
        }
        return isValid;
    }
    /**
     * Check if value is valid HEX value (excluding #)
     * @param value Value to check
     * @returns true if value is valid
     */
    isValidHex(value) {
        const isValid = value === '' || (!value.includes('#') && ColorHelpers.isHex(`#${value}`));
        if (!isValid) {
            new WarningNotice(`The specified hex "${value}" is not valid color. The correct value should look like "fff" or "ffffff".`).show();
        }
        return isValid;
    }
    /**
     * Check if value is within 0 - 255, and warn of it is not
     * @param value Value to check
     * @returns true if value is within 0 - 255
     */
    isValidRGB(value) {
        const isValid = value === '' || ColorHelpers.isValidDecimalForRGB(value);
        if (!isValid) {
            new WarningNotice(`The specified RGB "${value}" is not valid color. The value should be 0 - 255.`).show();
        }
        return isValid;
    }
    /**
     * update color value when tapping or dragging on color palettes
     * @param event select color event
     * @return {void}
     */
    onColorChanged(event) {
        this.valueModel.hex = ColorHelpers.removeHashSign(event.target.value);
        void this.requestUpdate();
    }
    /**
     * update hex value when typing on hex input
     * @param event input event
     * @return {void}
     */
    onHexChanged(event) {
        this.valueModel.hex = event.target.value;
        void this.requestUpdate();
    }
    /**
     * update r,g,b value when typing on RGB inputs
     * @param event input event
     * @return {void}
     */
    onRGBChanged(event) {
        const targetElem = event.target;
        if (targetElem === this.redInputEl) {
            this.valueModel.red = this.redInputEl.value;
        }
        else if (targetElem === this.greenInputEl) {
            this.valueModel.green = this.greenInputEl.value;
        }
        else if (targetElem === this.blueInputEl) {
            this.valueModel.blue = this.blueInputEl.value;
        }
        void this.requestUpdate();
    }
    /**
     * set opened state to false
     * @return {void}
     */
    onCloseDialog() {
        this.setOpened(false);
    }
    /**
     * fired value-changed event and close dialog
     * @return {void}
     */
    onConfirmValue() {
        // no need to check for anything, as the button is disabled if not dirty is invalid
        this.value = this.valueModel.value;
        this.notifyPropertyChange('value', this.value);
        this.setOpened(false);
    }
    /**
     * Check if apply button is disabled
     * The button is disabled if value is invalid
     * or value has not changed
     * @returns {boolean} true if disabled
     */
    isApplyDisabled() {
        return this.valueModel.hasChanged() && this.valueModel.isValid() ? this.allowNocolor ? false : this.valueModel.hex === '' : true;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    get contentRegion() {
        if (!this.lazyRendered) {
            return html ``;
        }
        return html `
      <div part="content-section">
        <div part="palettes-container">
          <ef-color-palettes
            .value=${this.valueModel.value}
            @value-changed=${this.onColorChanged}
            part="color-palettes">
          </ef-color-palettes>
          <ef-grayscale-palettes
            .value=${this.valueModel.value}
            @value-changed=${this.onColorChanged}
            ?allow-nocolor=${this.allowNocolor}
            part="grayscale-palettes"
            >
          </ef-grayscale-palettes>
        </div>
        <div part="inputs-container">
          <div
            part="preview-color"
            style=${styleMap({
            backgroundColor: this.valueModel.value
        })}
            ?no-color=${!this.valueModel.value}></div>
          <div>${this.t('RED')}&nbsp;:
            <ef-number-field
              .value=${this.valueModel.red}
              @value-changed=${this.onRGBChanged}
              part="color-input"
              min="0"
              max="255"
              no-spinner
              id="redInput"
            ></ef-number-field>
          </div>
          <div>${this.t('GREEN')}&nbsp;:
            <ef-number-field
              .value=${this.valueModel.green}
              @value-changed=${this.onRGBChanged}
              part="color-input"
              min="0"
              max="255"
              no-spinner
              id="greenInput"
            ></ef-number-field>
          </div>
          <div>${this.t('BLUE')}&nbsp;:
            <ef-number-field
              .value=${this.valueModel.blue}
              @value-changed=${this.onRGBChanged}
              part="color-input"
              min="0"
              max="255"
              no-spinner
              id="blueInput"
            ></ef-number-field>
          </div>
          <div>#&nbsp;:
            <ef-text-field
              .value=${this.valueModel.hex}
              @value-changed=${this.onHexChanged}
              pattern="^([0-9a-fA-F]{3}){1,2}$"
              part="color-input"
              id="hexInput"
              maxlength="6">
            </ef-text-field>
          </div>
        </div>
      </div>
    `;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    get footerRegion() {
        if (!this.lazyRendered) {
            return html ``;
        }
        return html `
      <ef-button
        id="confirmButton"
        part="button"
        cta
        @tap=${this.onConfirmValue}
        ?disabled=${this.isApplyDisabled()}>${this.t('APPLY')}</ef-button>
      <ef-button
        id="closeButton"
        @tap=${this.onCloseDialog}
        part="button">${this.t('CLOSE')}</ef-button>
    `;
    }
};
__decorate([
    property({ type: Boolean, attribute: 'allow-nocolor' })
], ColorDialog.prototype, "allowNocolor", void 0);
__decorate([
    property({ type: String })
], ColorDialog.prototype, "value", null);
__decorate([
    property({ type: String })
], ColorDialog.prototype, "hex", null);
__decorate([
    property({ type: String })
], ColorDialog.prototype, "red", null);
__decorate([
    property({ type: String })
], ColorDialog.prototype, "green", null);
__decorate([
    property({ type: String })
], ColorDialog.prototype, "blue", null);
__decorate([
    translate()
], ColorDialog.prototype, "t", void 0);
__decorate([
    query('#redInput')
], ColorDialog.prototype, "redInputEl", void 0);
__decorate([
    query('#greenInput')
], ColorDialog.prototype, "greenInputEl", void 0);
__decorate([
    query('#blueInput')
], ColorDialog.prototype, "blueInputEl", void 0);
ColorDialog = __decorate([
    customElement('ef-color-dialog', {
        alias: 'emerald-color-dialog'
    })
], ColorDialog);
export { ColorDialog };
//# sourceMappingURL=index.js.map