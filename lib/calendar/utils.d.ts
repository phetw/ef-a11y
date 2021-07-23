export declare type MonthInfo = {
    days: number;
    month: number;
    year: number;
};
/**
 * Get information about number of days, month number and year from date object
 * @param value Date string
 * @returns Month information object
 */
declare const monthInfo: (value: string) => MonthInfo;
export { monthInfo };
