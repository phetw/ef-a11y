declare const legendHelper: {
    getLegendFillStyle: (dataset: Chart.ChartDataSets, usePointStyle: boolean, solidFill?: boolean) => string | undefined;
    getLegendStrokeStyle: (dataset: Chart.ChartDataSets, usePointStyle: boolean) => string | undefined;
};
export { legendHelper };
