import { TranslateParams } from '@refinitiv-ui/i18n';
/**
 * Used to format views
 */
declare const ViewFormatTranslateParams: TranslateParams;
/**
 * Get a list of weekday abbreviations based on locale
 * @param locale Locale
 * @param [width='short'] Day width
 * @returns The list of weekdays starting from Sunday
 */
declare const weekdaysNames: (locale: string, width?: Intl.DateTimeFormatOptions['weekday']) => string[];
/**
 * Get a list of months based on locale
 * @param locale Locale
 * @param [width='short'] Month width
 * @returns The list of months starting from January
 */
declare const monthsNames: (locale: string, width?: Intl.DateTimeFormatOptions['month']) => string[];
/**
 * @deprecated
 * Some old browsers (as IE11) do not support formatting of old dates before BC
 * Instead simply convert the date manually to match Translate function
 * @param date Date
 * @param locale locale
 * @param [includeMonth=false] true to include month
 * @param [includeEra=false] tru to include era descriptor
 * @returns formatted dates
 */
declare const formatLocaleDate: (date: Date, locale: string, includeMonth?: boolean, includeEra?: boolean) => string;
export { weekdaysNames, monthsNames, formatLocaleDate, ViewFormatTranslateParams };
