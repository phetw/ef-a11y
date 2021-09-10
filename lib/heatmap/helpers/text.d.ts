import { HeatmapCell } from './types';
declare const MIN_FONT_SIZE = 10;
declare const MAX_FONT_SIZE = 16;
/**
 * Calculate responsive font size according to the screen width
 * @param ratio font ratio
 * @param cellHeight cell's height
 * @param cellWidth cell's width
 * @returns font size
 */
declare const getResponsiveFontSize: (ratio: number, cellHeight: number, cellWidth: number) => number;
/**
 * Get maximum text width out of all the cell by sampling
 * @param ctx canvas context
 * @param cells list of cells
 * @param hasCellHeader if header property is present in the cell
 * @returns label width measured in canvas
 */
declare const getMaximumTextWidth: (ctx: CanvasRenderingContext2D, cells: HeatmapCell[], hasCellHeader: boolean) => number;
/**
 * Calculate max length text for render Axis size
 * @param labels array string text for calculate
 * @returns max length text
 */
declare const getMaximumLabelTextWidth: (labels: string[]) => string;
export { getResponsiveFontSize, getMaximumTextWidth, getMaximumLabelTextWidth, MIN_FONT_SIZE, MAX_FONT_SIZE };
//# sourceMappingURL=text.d.ts.map