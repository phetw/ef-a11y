import { JSXInterface } from '../jsx';
import { ControlElement, TemplateResult, CSSResult, PropertyValues, MultiValue } from '@refinitiv-ui/core';
import '../button';
import './locales';
import { TranslateDirective, TranslatePromise } from '@refinitiv-ui/translate';
import { CalendarFilter } from './types';
export { CalendarFilter };
/**
 * Standard calendar element
 *
 * @fires value-changed - Fired when the `value` changes.
 * @fires view-changed - Fired when the `view` changes.
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @slot footer - Adds slotted content into the footer of the calendar control
 */
export declare class Calendar extends ControlElement implements MultiValue {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return CSS template
     */
    static get styles(): CSSResult | CSSResult[];
    private _min;
    /**
    * Set minimum date
    * @param min min date
    * @default -
    */
    set min(min: string);
    get min(): string;
    private _max;
    /**
    * Set maximum date
    * @param max max date
    * @default -
    */
    set max(max: string);
    get max(): string;
    /**
    * Only enable weekdays
    */
    weekdaysOnly: boolean;
    /**
    * Only enable weekends
    */
    weekendsOnly: boolean;
    /**
    * Custom filter, used for enabling/disabling certain dates
    * @type {CalendarFilter | null}
    */
    filter: CalendarFilter | null;
    private _view;
    /**
    * Current calendar view date
    * @param view view date
    * @default -
    */
    set view(view: string);
    get view(): string;
    private localFirstDayOfWeek;
    private localMonthsNames;
    private localWeekdaysNames;
    private _firstDayOfWeek;
    /**
     * Set the first day of the week.
     * 0 - for Sunday, 6 - for Saturday
     * @param firstDayOfWeek The first day of the week
     * @type {number | null}
     */
    set firstDayOfWeek(firstDayOfWeek: number);
    get firstDayOfWeek(): number;
    /**
    * Set to switch to range select mode
    */
    range: boolean;
    /**
    * Set to switch to multiple select mode
    */
    multiple: boolean;
    /**
    * Current date time value
    * @param value Calendar value
    * @default -
    */
    set value(value: string);
    get value(): string;
    private _values;
    /**
     * Set multiple selected values
     * @param values Values to set
     * @type {string[]}
     */
    set values(values: string[]);
    get values(): string[];
    /**
     * Fill head and tail cell dates
     */
    fillCells: boolean;
    /**
     * Used for translations
     */
    protected t: TranslateDirective;
    protected tPromise: TranslatePromise;
    /**
     * Used for internal navigation between render views
     */
    private renderView;
    private isDateAvailable;
    /**
     * Get weekday numbers.
     * Sort the list based on first day of the week
     */
    private get weekdaysNames();
    /**
     * Get localised month names from January to December
     */
    private get monthsNames();
    /**
     * Perform asynchronous update
     * @returns promise
     */
    protected performUpdate(): Promise<void>;
    /**
    * Updates the element
    * @param changedProperties Properties that has changed
    * @returns {void}
    */
    protected update(changedProperties: PropertyValues): void;
    /**
     * Run when an element has been first updated
     * @param changedProperties properties that was changed on first update
     * @returns {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * Show invalid view message
     * @param value Invalid value
     * @returns {void}
     */
    protected warnInvalidView(value: string): void;
    /**
     * Show invalid value message
     * @param value Invalid value
     * @returns {void}
     */
    protected warnInvalidValue(value: string): void;
    /**
    * Validate that the value confirms the control type
    * @param value Value to check
    * @returns false if value is invalid
    */
    protected isValidValue(value: string): boolean;
    /**
     * A helper method to make sure that only valid values are passed
     * Warn if passed value is invalid
     * @param values Values to check
     * @returns Filtered collection of values
     */
    private filterAndWarnInvalidValues;
    /**
     * Check if there is a need to reconstruct filters
     * @param changedProperties properties that was changed on first update
     * @returns true if filter needs to be constructed
     */
    private shouldConstructFilters;
    /**
     * Construct and store a collection of filters
     * First always comes default filters and last custom filters
     * @returns {void}
     */
    private constructFilters;
    /**
     * Check if date cell is selected
     * @param value A value to compare
     * @param comparator A comparator to check for selection. Can be day, month or year
     * @returns true if cell is selected
     */
    private isDateCellSelected;
    /**
     * Get cell selection model, which is used to bind values and ranges
     * to cell styles
     * @param value A value to compare
     * @param comparator A comparator to check for selection. Can be day, month or year
     * @returns cell selection model
     */
    private getCellSelection;
    /**
     * Run when next button is tapped.
     * Change current view to next view
     * @returns {void}
     */
    private onNextTap;
    /**
     * Run when previous button is tapped.
     * Change current view to previous view
     * @returns {void}
     */
    private onPreviousTap;
    /**
     * Run when change view button is tapped.
     * Switch between views
     * @returns {void}
     */
    private onRenderViewTap;
    /**
     * Run when key down event happens on calendar
     * @param event Keyboard event
     * @returns {void}
     */
    private onTableKeyDown;
    /**
     * Run when tap event happens ot table.
     * Select the values or switch the view
     * @param event Tap event
     * @returns {void}
     */
    private onTableTap;
    /**
     * Run when tap event happened on DAY view and the cell has the values
     * Try to select/deselect cell value
     * @param value Date string
     * @returns {void}
     */
    private onTapSelectValue;
    /**
     * Notify that values array has been changed
     * @param values A collection of string dates
     * @returns {void}
     */
    private notifyValuesChange;
    /**
     * Notify that view has been changed
     * @param view Date
     * @returns {void}
     */
    private notifyViewChange;
    /**
     * Localised format for render view
     * @param segment Segment object
     * @param includeMonth True to include a month
     * @returns template result
     */
    private viewFormattedDate;
    /**
     * Get a string representation of current view
     * @returns template result
     */
    private get formattedViewRender();
    /**
     * Render cell content template.
     * If the cell is selectable (aka has value) add selection part
     * @param text Text to render
     * @param selectable True if cell may be selected
     * @returns template result
     */
    private renderContentBox;
    /**
     * Get year view template
     */
    private get yearView();
    /**
     * Get month view template
     */
    private get monthView();
    /**
     * Get day view template
     */
    private get dayView();
    /**
     * Get weekday names template
     */
    private get renderWeekdayNames();
    /**
     * Render a view based on the current render view
     */
    private get viewRender();
    /**
     * Render cell template. Cell can be a day, month or year
     * @param cell Cell object
     * @returns template result
     */
    private renderCell;
    /**
     * Render view rows
     * @param rows A collection of rows with cells
     * @returns template result
     */
    private renderRows;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    protected render(): TemplateResult;
}
//# sourceMappingURL=index.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-calendar': Calendar;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-calendar': Partial<Calendar> | JSXInterface.ControlHTMLAttributes<Calendar>;
    }
  }
}

export {};
