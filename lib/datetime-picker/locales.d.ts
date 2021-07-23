import { Locale } from 'date-fns';
/**
 * Get date-fns locale or default locale
 * @param [locale] BCP47 locale tag
 * @returns DateFNS Locale object
 */
declare const getDateFNSLocale: (locale: string) => Locale;
export { getDateFNSLocale };
