/**
 * A helper model in order to keep and update values between RGB and HEX
 */
declare class ValueModel {
    private initialValue;
    private _hex;
    private _red;
    private _green;
    private _blue;
    /**
     * Create the new value model
     * @param value A valid hex value (e.g. "#ffffff") or an empty string
     */
    constructor(value?: string);
    private getHexValue;
    private isValidRGBValue;
    private isValidHexValue;
    private isValidRGB;
    private isValidHex;
    /**
     * Check if new value is different to initial
     * ignoring hex length
     * @returns tru if different
     */
    hasChanged(): boolean;
    /**
     * Check if RGB and Hex values are valid
     * @returns true if both are valid
     */
    isValid(): boolean;
    /**
     * Set red color from RGB pallette.
     * Setting this overrides hex
     * @param red Red color, the string number from 0 - 255
     */
    set red(red: string);
    /**
     * Get red color from RGB pallette
     */
    get red(): string;
    /**
     * Set green color from RGB pallette.
     * Setting this overrides hex
     * @param green Green color, the string number from 0 - 255
     */
    set green(green: string);
    /**
     * Get green color from RGB pallette
     */
    get green(): string;
    /**
     * Set blue color from RGB pallette.
     * Setting this overrides hex
     * @param blue Blue color, the string number from 0 - 255
     */
    set blue(blue: string);
    /**
     * Get blue color from RGB pallette
     */
    get blue(): string;
    /**
     * Set hex value. Setting hex overrides RGB
     * @param hex Hex value, e.g. "ffffff" or "#ffffff"
     */
    set hex(hex: string);
    /**
     * Get the hex value (hex without #, e.g "ffffff").
     */
    get hex(): string;
    /**
     * Get the value. Value is Hex with #, e.g. "#ffffff"
     */
    get value(): string;
}
export { ValueModel };
