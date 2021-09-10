declare type HeatmapConfig = {
    data: Array<HeatmapCell[]>;
    yAxis?: HeatmapYAxis;
    xAxis?: HeatmapXAxis;
};
declare type HeatmapXAxis = {
    labels: string[];
    shortLabels: string[];
    position: 'top' | 'bottom';
};
declare type HeatmapYAxis = {
    labels: string[];
    position: 'left' | 'right';
};
declare type HeatmapCell = {
    rowIndex: number;
    colIndex: number;
    x: number;
    y: number;
    width: number;
    height: number;
    value: number | null;
    header?: string;
    label?: string;
    foregroundColor: string;
    defaultBackground: string;
    backgroundColor: string;
    animationFrame?: number;
    customLabel?: string;
    customBackgroundColor?: string;
    customForegroundColor?: string;
};
declare type HeatmapCustomisableProperties = {
    label?: string;
    backgroundColor?: string;
    foregroundColor?: string;
};
declare type HeatmapTooltipCallback = (activeCell: HeatmapCell) => HTMLElement | undefined;
declare type HeatmapRenderCallback = (cell: HeatmapCell) => HeatmapCustomisableProperties;
export { HeatmapCell, HeatmapXAxis, HeatmapYAxis, HeatmapConfig, HeatmapTooltipCallback, HeatmapRenderCallback, HeatmapCustomisableProperties };
//# sourceMappingURL=types.d.ts.map