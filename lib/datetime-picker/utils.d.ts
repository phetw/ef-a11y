/**
 * A helper class to split date time string into date and time segments
 */
declare class DateTimeSegment {
    /**
     * Create DateTimeSegment from value string
     * @param value Date time value
     * @returns date time segment
     */
    static fromString: (value: string) => DateTimeSegment;
    /**
     * Create DateTimeSegment from another DateTimeSegment
     * @param segment DateTimeSegment
     * @returns cloned date time segment
     */
    static fromDateTimeSegment: (segment: DateTimeSegment) => DateTimeSegment;
    /**
     * Create new date time segment
     * @param dateSegment Date segment
     * @param timeSegment Time segment
     */
    constructor(dateSegment?: string, timeSegment?: string);
    /**
     * Date segment in a format '2020-12-31'
     */
    dateSegment: string;
    /**
     * Time segment in a format '14:59' or '14:59:59'
     */
    timeSegment: string;
    /**
     * Get string value
     */
    get value(): string;
    /**
     * Get time
     * @returns {number} time
     */
    getTime(): number;
    toString(): string;
}
/**
 * Format Date object to local date string.
 * Output format: "yyyy-MM".
 * @param date A Date object
 * @returns A formatted date or empty string if invalid
 */
declare const formatToView: (date: Date | number | string) => string;
/**
 * Get current time string, e.g. "15:36" or "15:36:04"
 * @param [includeSeconds=false] true to include seconds
 * @returns A formatted time string
 */
declare const getCurrentTime: (includeSeconds?: boolean) => string;
export { DateTimeSegment, getCurrentTime, formatToView };
//# sourceMappingURL=utils.d.ts.map