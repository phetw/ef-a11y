import { Item } from '../../item';
import { AutosuggestHighlightable, AutosuggestRenderer } from './types';
/**
 * Check whether item can be highlighted
 * @param suggestion Suggestion object
 * @param target item element
 * @returns highlightable
 */
export declare const itemHighlightable: AutosuggestHighlightable;
/**
 * Replace forbidden characters in regular expressions
 * @param string A string to process
 * @returns clean string
 */
export declare const escapeRegExp: (string?: string) => string;
/**
 * A basic regexp matching pattern to replace text based on string input.
 * @param text Value to test against
 * @param query The query
 * @param [pattern=<mark>$1</mark>] Provide a pattern to replace string
 * @returns innerHTML The text that can be used as innerHTML
 */
export declare const queryWordSelect: (text: string, query?: string, pattern?: string) => string;
/**
 * Update element content
 * @param el to update content
 * @param query to search
 * @param label text to test against
 * @param value text to use as fallback
 * @return {void}
 */
export declare const updateElementContent: (el: Item, query: string, label: string, value: string | number) => void;
/**
 * Build item element from data object
 * @param suggestion Suggestion data
 * @param query A query data (usually string, but could be any entity )
 * @returns item
 */
export declare const itemRenderer: AutosuggestRenderer;
