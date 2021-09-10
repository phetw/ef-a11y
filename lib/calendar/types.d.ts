export declare enum RenderView {
    DAY = "day",
    MONTH = "month",
    YEAR = "year"
}
export interface CellSelectionModel {
    selected?: boolean;
    range?: boolean;
    rangeFrom?: boolean;
    rangeTo?: boolean;
    firstDate?: boolean;
    lastDate?: boolean;
}
export interface Cell extends CellSelectionModel {
    view: RenderView;
    text?: string;
    value?: string;
    disabled?: boolean;
    idle?: boolean;
    now?: boolean;
}
export declare type CalendarFilter = (value: string) => boolean;
export declare type Comparator = (value: string, compare: string) => boolean;
export interface CellDivElement extends HTMLDivElement, Cell {
    value?: string;
    disabled?: boolean;
    idle?: boolean;
    selected?: boolean;
    range?: boolean;
}
export declare type Row = {
    cells: Cell[];
};
//# sourceMappingURL=types.d.ts.map