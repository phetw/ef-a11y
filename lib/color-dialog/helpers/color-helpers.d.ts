/**
 * SVG polygons per color
 */
export declare const COLOR_ITEMS: string[][];
/**
 * SVG polygons per grayscale items
 */
export declare const GRAYSCALE_ITEMS: string[][];
export declare const NOCOLOR_POINTS = "6, 2, 15, 6, 15, 17, 6, 21, -3, 17, -3, 6";
declare type rgbValue = {
    red: string;
    green: string;
    blue: string;
};
export declare class ColorHelpers {
    /**
     * Remove hash (#) sign from hex value
     * @param hex Hex to check
     * @returns hex value without # sign
     */
    static removeHashSign(hex: string): string;
    /**
     * Expand short format hex into long format
     * For instance, "#fff" becomes "#ffffff"
     * @param value hex to expand
     * @returns expanded hex value
     */
    static expandHex(value: string): string;
    /**
     * Transform RGB value into hex (with #)
     * @param red Red value, 0 - 255
     * @param green Green value, 0 - 255
     * @param blue Blue value, 0 - 255
     * @returns hex value
     */
    static rgbToHex(red: string, green: string, blue: string): string;
    /**
     * Transform 10 base number to HEX number
     * @param num Number to transform
     * @returns hex representation
     */
    private static numberToHex;
    /**
     * Transform Hex to RGB
     * @param hex Hex to transform
     * @returns rgb values
     */
    static hexToRGB(hex: string): rgbValue;
    /**
     * Check if value is a valid hex (including #)
     * @param value Value to check
     * @returns true if valid hex
     */
    static isHex(value: string): boolean;
    /**
     * Check if value is a valid RGB string number between 0 - 255
     * @param value Value to check
     * @returns true if a valid number
     */
    static isValidDecimalForRGB(value: string): boolean;
}
export {};
