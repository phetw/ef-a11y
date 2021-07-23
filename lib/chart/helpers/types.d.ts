/// <reference types="chart.js" />
export declare type DatasetColors = {
    solid: string | string[];
    opaque: string | string[];
};
export declare type ChartDataSetsColor = Chart.ChartColor | Chart.ChartColor[] | Chart.Scriptable<Chart.ChartColor> | undefined;
export declare type ChartConfig = Chart.ChartConfiguration;
export declare type ChartUpdateProps = Chart.ChartUpdateProps;
export interface MetaData {
    _chart: Chart;
    _datasetIndex: number;
    _index: number;
    _model: Model;
    _view: Model;
    _xScale: Chart.ChartScales;
    _yScale: Chart.ChartScales;
    hidden?: boolean;
}
interface Model {
    backgroundColor: string;
    borderAlign?: Chart.BorderAlignment;
    borderColor: string;
    borderWidth?: number;
    circumference?: number;
    controlPointNextX: number;
    controlPointNextY: number;
    controlPointPreviousX: number;
    controlPointPreviousY: number;
    endAngle?: number;
    hitRadius: number;
    innerRadius?: number;
    outerRadius?: number;
    pointStyle: string;
    radius: string;
    skip?: boolean;
    startAngle?: number;
    steppedLine?: undefined;
    tension: number;
    x: number;
    y: number;
    base: number;
    head: number;
}
export interface ChartHelpers {
    draw(): void;
}
export interface ChartJS extends Chart {
    new (context: string | CanvasRenderingContext2D | HTMLCanvasElement | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>, options: ChartConfig): Chart;
    defaults: {
        global: Chart.ChartOptions & Chart.ChartFontOptions & {
            tooltips: Chart.ChartTooltipOptions;
            defaultColor: string;
            defaultLineHeight: number;
        };
        scale: {
            gridLines: {
                color: string;
                zeroLineColor: string;
            };
        };
        [key: string]: any;
    };
    helpers: {
        getHoverColor(value: string): string;
        [key: string]: any;
    };
    isDatasetVisible(isDatasetVisible: number): boolean;
}
export {};
