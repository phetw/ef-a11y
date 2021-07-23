import { LineData, BarData, HistogramData, DeepPartial, ChartOptions, SeriesPartialOptions, LineSeriesPartialOptions, AreaSeriesPartialOptions, BarSeriesPartialOptions, CandlestickSeriesPartialOptions, HistogramSeriesPartialOptions, LineStyleOptions, AreaStyleOptions, BarStyleOptions, CandlestickStyleOptions, HistogramStyleOptions, ISeriesApi, SeriesType } from 'lightweight-charts';
import type { RGBColor, HSLColor } from '@refinitiv-ui/utils';
declare type SeriesOptions = AreaSeriesPartialOptions | BarSeriesPartialOptions | CandlestickSeriesPartialOptions | HistogramSeriesPartialOptions | LineSeriesPartialOptions;
declare type SeriesStyleOptions = LineStyleOptions & AreaStyleOptions & BarStyleOptions & CandlestickStyleOptions & HistogramStyleOptions;
declare type SeriesData = LineData[] | BarData[] | HistogramData[];
declare type SeriesList = ISeriesApi<SeriesType>;
declare type SeriesDataItem = BarData | LineData;
declare type RowLegend = NodeListOf<Element> | HTMLElement | null;
declare type ColorToStringFunction = (param: string, ...arg: (string | number | undefined)[]) => RGBColor | HSLColor | null;
declare enum LegendStyle {
    vertical = "vertical",
    horizontal = "horizontal"
}
interface Time {
    day: number;
    month: number;
    year: number;
}
interface InteractiveChartConfig {
    series: InteractiveChartSeries[];
    options?: DeepPartial<ChartOptions>;
}
interface Theme {
    color?: string;
    backgroundColor: string;
    textColor: string;
    scalePriceBorderColor: string;
    scaleTimesBorderColor: string;
    gridVertLineColor: string;
    gridHorzLineColor: string;
    crossHairColor: string;
    chartUpColor: string;
    chartDownColor: string;
    fillOpacity: number | undefined;
    lineWidth: number | undefined;
}
interface InteractiveChartSeries {
    type: string;
    symbol?: string;
    symbolName?: string;
    legendPriceFormatter?: CallableFunction;
    data: SeriesData;
    seriesOptions?: SeriesPartialOptions<SeriesOptions>;
}
export { InteractiveChartConfig, InteractiveChartSeries, Time, Theme, RowLegend, SeriesList, SeriesDataItem, SeriesStyleOptions, ColorToStringFunction, LegendStyle };
