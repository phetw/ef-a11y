import { format, DateFormat, parse, TimeFormat, toTimeSegment } from '@refinitiv-ui/utils';
/**
 * A helper class to split date time string into date and time segments
 */
class DateTimeSegment {
    /**
     * Create new date time segment
     * @param dateSegment Date segment
     * @param timeSegment Time segment
     */
    constructor(dateSegment = '', timeSegment = '') {
        this.dateSegment = dateSegment;
        this.timeSegment = timeSegment;
    }
    /**
     * Get string value
     */
    get value() {
        const timeSegment = this.timeSegment;
        return `${this.dateSegment}${timeSegment ? `T${timeSegment}` : ''}`;
    }
    /**
     * Get time
     * @returns {number} time
     */
    getTime() {
        const date = this.dateSegment ? parse(this.dateSegment) : new Date(0);
        const timeSegment = toTimeSegment(this.timeSegment);
        date.setHours(timeSegment.hours);
        date.setMinutes(timeSegment.minutes);
        date.setSeconds(timeSegment.seconds);
        return date.getTime();
    }
    toString() {
        return this.value;
    }
}
/**
 * Create DateTimeSegment from value string
 * @param value Date time value
 * @returns date time segment
 */
DateTimeSegment.fromString = (value) => {
    const valueSplit = value.split('T');
    return new DateTimeSegment(valueSplit[0], valueSplit[1]);
};
/**
 * Create DateTimeSegment from another DateTimeSegment
 * @param segment DateTimeSegment
 * @returns cloned date time segment
 */
DateTimeSegment.fromDateTimeSegment = (segment) => {
    return new DateTimeSegment(segment.dateSegment, segment.timeSegment);
};
/**
* Check if passed Date object is valid
* @param date Date to check
* @returns is valid
*/
const isValid = (date) => {
    return !isNaN(date.getTime());
};
/**
* Convert date to Date object
* @param date Date to convert
* @returns Date object
*/
const toDate = (date) => {
    if (typeof date === 'string') {
        return parse(date);
    }
    return typeof date === 'number' ? new Date(date) : date;
};
/**
 * Format Date object to local date string.
 * Output format: "yyyy-MM".
 * @param date A Date object
 * @returns A formatted date or empty string if invalid
 */
const formatToView = (date) => {
    date = toDate(date);
    return isValid(date) ? format(date, DateFormat.yyyyMM) : '';
};
/**
 * Get current time string, e.g. "15:36" or "15:36:04"
 * @param [includeSeconds=false] true to include seconds
 * @returns A formatted time string
 */
const getCurrentTime = (includeSeconds = false) => {
    return format(new Date(), includeSeconds ? TimeFormat.HHmmss : TimeFormat.HHmm);
};
export { DateTimeSegment, getCurrentTime, formatToView };
//# sourceMappingURL=utils.js.map