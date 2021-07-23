import { toDateSegment, getDaysInMonth } from '@refinitiv-ui/utils';
/**
 * Get information about number of days, month number and year from date object
 * @param value Date string
 * @returns Month information object
 */
const monthInfo = (value) => {
    const segment = toDateSegment(value);
    const year = segment.year;
    const month = segment.month;
    return {
        days: getDaysInMonth(year, month),
        month,
        year
    };
};
export { monthInfo };
//# sourceMappingURL=utils.js.map