import { ColorHelpers } from './color-helpers';
/**
 * A helper model in order to keep and update values between RGB and HEX
 */
class ValueModel {
    /**
     * Create the new value model
     * @param value A valid hex value (e.g. "#ffffff") or an empty string
     */
    constructor(value = '') {
        this.initialValue = value;
        const { red, green, blue } = ColorHelpers.hexToRGB(value);
        this._red = red;
        this._green = green;
        this._blue = blue;
        this._hex = ColorHelpers.removeHashSign(value);
    }
    getHexValue() {
        if (this.red === '' && this.green === '' && this.blue === '') {
            return '';
        }
        else if (!this.isValidRGB()) {
            return '';
        }
        const hex = ColorHelpers.rgbToHex(this.red, this.green, this.blue);
        return hex ? ColorHelpers.removeHashSign(hex) : '';
    }
    isValidRGBValue(value) {
        return value === '' || ColorHelpers.isValidDecimalForRGB(value);
    }
    isValidHexValue(value) {
        return value === '' || ColorHelpers.isHex(`#${value}`);
    }
    isValidRGB() {
        return this.isValidRGBValue(this.red)
            && this.isValidRGBValue(this.green)
            && this.isValidRGBValue(this.blue);
    }
    isValidHex() {
        return this.isValidHexValue(this.hex);
    }
    /**
     * Check if new value is different to initial
     * ignoring hex length
     * @returns tru if different
     */
    hasChanged() {
        return ColorHelpers.expandHex(this.initialValue) !== ColorHelpers.expandHex(this.value);
    }
    /**
     * Check if RGB and Hex values are valid
     * @returns true if both are valid
     */
    isValid() {
        return this.isValidRGB() && this.isValidHex();
    }
    /**
     * Set red color from RGB pallette.
     * Setting this overrides hex
     * @param red Red color, the string number from 0 - 255
     */
    set red(red) {
        this._red = red;
        this._green = this._green || '0';
        this._blue = this._blue || '0';
        this._hex = this.getHexValue();
    }
    /**
     * Get red color from RGB pallette
     */
    get red() {
        return this._red;
    }
    /**
     * Set green color from RGB pallette.
     * Setting this overrides hex
     * @param green Green color, the string number from 0 - 255
     */
    set green(green) {
        this._green = green;
        this._red = this._red || '0';
        this._blue = this._blue || '0';
        this._hex = this.getHexValue();
    }
    /**
     * Get green color from RGB pallette
     */
    get green() {
        return this._green;
    }
    /**
     * Set blue color from RGB pallette.
     * Setting this overrides hex
     * @param blue Blue color, the string number from 0 - 255
     */
    set blue(blue) {
        this._blue = blue;
        this._red = this._red || '0';
        this._green = this._green || '0';
        this._hex = this.getHexValue();
    }
    /**
     * Get blue color from RGB pallette
     */
    get blue() {
        return this._blue;
    }
    /**
     * Set hex value. Setting hex overrides RGB
     * @param hex Hex value, e.g. "ffffff" or "#ffffff"
     */
    set hex(hex) {
        if (!this.isValidHexValue(hex)) {
            this._red = '';
            this._green = '';
            this._blue = '';
        }
        else {
            const rgb = ColorHelpers.hexToRGB(hex);
            this._red = rgb.red;
            this._green = rgb.green;
            this._blue = rgb.blue;
        }
        this._hex = hex;
    }
    /**
     * Get the hex value (hex without #, e.g "ffffff").
     */
    get hex() {
        return this._hex;
    }
    /**
     * Get the value. Value is Hex with #, e.g. "#ffffff"
     */
    get value() {
        return this._hex ? `#${this._hex}` : '';
    }
}
export { ValueModel };
//# sourceMappingURL=value-model.js.map