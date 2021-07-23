/**
 * Validate color
 *
 * @param {ChartDataSetsColor} color datsets color
 * @returns {(string|undefined)} color
 */
const isValidColor = (color) => {
    /**
     * Force return to string type because Chart.js doesn't support typescript
     * and some type of @types/chart.js isn't correct
     */
    return (color && color !== 'transparent') ? color : undefined;
};
/**
 * Get legend color by using point style
 *
 * @param {ChartDataSetsColor} color1 using color1 if valid
 * @param {ChartDataSetsColor} color2 using color2 if color1 invalid
 * @returns {(string|undefined)} color
 */
const getLegendColorUsePointStyle = (color1, color2) => {
    /**
     * if either color1 or color2 is valid, use color1. Order is important
     * and force return string type same as isValidColor()
     */
    return isValidColor(color1) || (isValidColor(color2) ? color1 : undefined);
};
/**
 * Get legend color don't using point style
 *
 * @param {Chart.ChartDataSets} dataset dataset of chart
 * @param {boolean} solidFill color is solid not opaque
 * @returns {string} color
 */
const getLegendColorDontUsePointStyle = (dataset, solidFill = false) => {
    // Use background color for legend, if color of dataset or chart type is solid not opaque.
    return isValidColor(solidFill ? dataset.backgroundColor : dataset.borderColor)
        || isValidColor(dataset.pointBorderColor)
        || dataset.pointBackgroundColor;
};
/**
 * Get stroke style legend color
 *
 * @param {Chart.ChartDataSets} dataset dataset of chart
 * @param {boolean} usePointStyle using color from point style
 * @returns {(string|undefined)} color
 */
const getLegendStrokeStyle = (dataset, usePointStyle) => {
    if (usePointStyle) {
        return getLegendColorUsePointStyle(dataset.pointBorderColor, dataset.pointBackgroundColor)
            || isValidColor(dataset.borderColor) || dataset.backgroundColor;
    }
    else {
        return isValidColor(dataset.borderColor) || getLegendColorDontUsePointStyle(dataset);
    }
};
/**
 * Get fill style legend color
 *
 * @param {Chart.ChartDataSets} dataset dataset of chart
 * @param {boolean} usePointStyle using color from point style
 * @param {boolean} solidFill color is solid or opacity
 * @returns {(string|undefined)} color
 */
const getLegendFillStyle = (dataset, usePointStyle, solidFill = false) => {
    if (usePointStyle) {
        return getLegendColorUsePointStyle(dataset.pointBackgroundColor, dataset.pointBorderColor)
            || isValidColor(dataset.borderColor) || dataset.backgroundColor;
    }
    else {
        return getLegendColorDontUsePointStyle(dataset, solidFill);
    }
};
const legendHelper = {
    getLegendFillStyle,
    getLegendStrokeStyle
};
export { legendHelper };
//# sourceMappingURL=legend.js.map