import { ColorCommonInstance } from '@refinitiv-ui/utils';
import { interpolate } from 'd3-interpolate';
/**
 * Check if the color is a light color
 * @param col color to check
 * @returns a boolean indicating whether the color's perceived brightness is light
 */
declare const isLight: (col: ColorCommonInstance) => boolean;
/**
 * Brightens a color
 * @param colorString color string
 * @return a color brighter than original color
 */
declare const brighten: (colorString: string) => string;
/**
 * Darkens a color
 * @param colorString color string
 * @return a color darker than original color
 */
declare const darken: (colorString: string) => string;
/**
 * Blends two colors and its background together
 * @param color1 dominant color
 * @param color2 secondary color
 * @param backgroundColor background color
 * @param amount color blending amount
 * @returns a new blended color
 */
declare const blend: (color1: string, color2: string, backgroundColor: string, amount: number) => string;
export { blend, brighten, darken, isLight, interpolate };
