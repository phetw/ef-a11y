import { ControlElement, TemplateResult, MultiValue, PropertyValues, CSSResult } from '@refinitiv-ui/core';
import '../calendar';
import '../icon';
import '../overlay';
import '../text-field';
import '../time-picker';
import { DatetimePickerDuplex, DatetimePickerFilter } from './types';
import { TranslateDirective } from '@refinitiv-ui/translate';
export { DatetimePickerFilter, DatetimePickerDuplex };
/**
 * Control to pick date and time
 *
 * @fires opened-changed - Dispatched when when opened attribute changes internally
 * @fires value-changed - Dispatched when value changes
 * @fires error-changed - Dispatched when error state changes
 * @fires view-changed - Dispatched when internal view changes
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @slots header - Header slot
 * @slots right - Right slot
 * @slots footer - Footer slot
 * @slots left - Left slot
 */
export declare class DatetimePicker extends ControlElement implements MultiValue {
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
    private lazyRendered;
    private calendarValues;
    private timepickerValues;
    private inputValues;
    private inputSyncing;
    private _min;
    private minDate;
    /**
    * Set minimum date
    * @param min date
    */
    set min(min: string);
    get min(): string;
    private _max;
    private maxDate;
    /**
    * Set maximum date
    * @param max date
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
    * @type {DatetimePickerFilter | null}
    */
    filter: DatetimePickerFilter | null;
    /**
     * Set the first day of the week.
     * 0 - for Sunday, 6 - for Saturday
     * @param firstDayOfWeek The first day of the week
     */
    firstDayOfWeek?: number;
    /**
    * Set to switch to range select mode
    */
    range: boolean;
    /**
    * Set to switch to multiple select mode
    * @ignore
    * @param multiple Multiple
    */
    set multiple(multiple: boolean);
    get multiple(): boolean;
    /**
    * Current date time value
    * @param value Calendar value
    */
    set value(value: string);
    get value(): string;
    private _values;
    private _segments;
    /**
    * Set multiple selected values
    * @param values Values to set
    * @type {string[]}
    */
    set values(values: string[]);
    get values(): string[];
    /**
     * Toggles 12hr time display
     */
    amPm: boolean;
    /**
     * Flag to show seconds time segment in display.
     * Seconds are automatically shown when `hh:mm:ss` time format is provided as a value.
     */
    showSeconds: boolean;
    private _placeholder;
    /**
    * Placeholder to display when no value is set
    * @param placeholder Placeholder
    */
    set placeholder(placeholder: string);
    get placeholder(): string;
    /**
    * Toggles the opened state of the list
    */
    opened: boolean;
    /**
     * Set state to error
     */
    error: boolean;
    /**
     * Set state to warning
     */
    warning: boolean;
    /**
    * Only open picker panel when calendar icon is clicked.
    * Clicking on the input will no longer open the picker.
    */
    inputTriggerDisabled: boolean;
    /**
    * Disable input part of the picker
    */
    inputDisabled: boolean;
    /**
    * Disable the popup
    */
    popupDisabled: boolean;
    private _format;
    /**
    * Set the datetime format
    * Based on dane-fns datetime formats
    * @param format Date format
    */
    set format(format: string);
    get format(): string;
    /**
    * Toggle to display the time picker
    */
    timepicker: boolean;
    /**
    * Display two calendar pickers.
    * @type {"" | "consecutive" | "split"}
    */
    duplex: DatetimePickerDuplex | null;
    /**
    * Set the current calendar view.
    * Accepted format: 'yyyy-MM'
    * @param view view date
    */
    set view(view: string);
    get view(): string;
    private _views;
    /**
    * Set the current calendar views for duplex mode
    * Accepted format: 'yyyy-MM'
    * @param views view dates
    * @type {string[]}
    */
    set views(views: string[]);
    get views(): string[];
    /**
     * Validate input. Mark as error if input is invalid
     * @returns {void}
     */
    validateInput(): void;
    /**
     * Used for translations
     */
    protected t: TranslateDirective;
    private iconEl;
    private popupEl?;
    private timepickerEl?;
    private timepickerToEl?;
    private calendarEl?;
    private calendarToEl?;
    private inputEl?;
    private inputToEl?;
    /**
     * Updates the element
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    protected update(changedProperties: PropertyValues): void;
    /**
     * Called after the component is first rendered
     * @param changedProperties Properties which have changed
     * @returns {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * Overwrite validation method for value
     *
     * @param value value
     * @returns {boolean} result
     */
    protected isValidValue(value: string): boolean;
    /**
    * Used to show a warning when the value does not pass the validation
    * @param value that is invalid
    * @returns {void}
    */
    protected warnInvalidValue(value: string): void;
    /**
     * Show invalid view message
     * @param value Invalid value
     * @returns {void}
     */
    protected warnInvalidView(value: string): void;
    /**
     * Convert value string array to date segments
     * Warn invalid value if passed value does not confirm a segment
     * @returns {void}
     */
    private valuesToSegments;
    /**
     * Check if the value needs re-validation against min/max and format
     * @param changedProperties Properties which have changed
     * @returns needs re-validation
     */
    private shouldValidateValue;
    /**
     * A helper method to make sure that only valid values are passed
     * Warn if passed value is invalid
     * @param values Values to check
     * @returns Filtered collection of values
     */
    private filterAndWarnInvalidValues;
    /**
     * A helper method to make sure that only valid views are passed
     * Warn if passed view is invalid
     * @param views Views to check
     * @returns Filtered collection of values
     */
    private filterAndWarnInvalidViews;
    /**
     * Return true if calendar is in duplex mode
     * @returns duplex
     */
    private isDuplex;
    /**
     * Return true if calendar is in duplex split mode
     * @returns duplex split
     */
    private isDuplexSplit;
    /**
     * Return true if calendar is in duplex consecutive mode
     * @returns duplex consecutive
     */
    private isDuplexConsecutive;
    /**
     * Stop syncing input values and picker values
     * @returns {void}
     */
    private disableInputSync;
    /**
     * Start syncing input values and picker values
     * @returns {void}
     */
    private enableInputSync;
    /**
     * Synchronise input values and values
     * @return {void}
     */
    private syncInputValues;
    /**
     * Format date segment according to format and locale
     * @param segment Date segment
     * @returns formatted string
     */
    private formatSegment;
    /**
     * Construct view collection
     * @param view The view that has changed
     * @param index View index (0 - single, or from); (1 - to)
     * @param [views=this.views] The original views collection
     * @returns the new view collection
     */
    private composeViews;
    private _interimSegments;
    /**
     * An interim collection of segments to push values when all parts are populated
     * and validated
     * @param segments Segments
     */
    private set interimSegments(value);
    /**
     * Get interim segments. These are free to modify
     * @returns interim segments
     */
    private get interimSegments();
    /**
     * Submit interim segments to values.
     * Notify value-changed event.
     * @returns true if values have changed. False otherwise
     */
    private submitInterimSegments;
    /**
     * Notify that values array has been changed
     * @param values A collection of string dates
     * @returns {void}
     */
    private notifyValuesChange;
    /**
     * Notify that views array has been changed
     * @param views A collection of string dates
     * @returns {void}
     */
    private notifyViewsChange;
    /**
     * Handles key input on datetime picker
     * @param event Key down event object
     * @returns {void}
     */
    private onKeyDown;
    /**
     * Handles key input on calendar picker
     * @param event Key down event object
     * @returns {void}
     */
    private onCalendarKeyDown;
    /**
     * Handles key input on text field
     * @param event Key down event object
     * @returns {void}
     */
    private onInputKeyDown;
    /**
     * Run on tap event
     * @param event Tap event
     * @returns {void}
     */
    private onTap;
    /**
     * Run when popup opened flag changes
     * @param event opened-change event
     * @returns {void}
     */
    private onPopupOpenedChanged;
    /**
     * Run on calendar view-changed event
     * @param event view-changed event
     * @returns {void}
     */
    private onCalendarViewChanged;
    /**
     * Run on calendar value-changed event
     * @param event value-changed event
     * @returns {void}
     */
    private onCalendarValueChanged;
    /**
     * Run on time-picker value-changed event
     * @param event value-changed event
     * @returns {void}
     */
    private onTimePickerValueChanged;
    /**
     * Run on input focus
     * @returns {void}
     */
    private onInputFocus;
    /**
     * Run on input blur
     * @param event blur event
     * @returns {void}
     */
    private onInputBlur;
    /**
     * Run on input value-changed event
     * @param event value-changed event
     * @returns {void}
     */
    private onInputValueChanged;
    /**
     * Check if input format conforms to value format
     * @returns true if valid format
     */
    private isValidFormat;
    /**
     * Check if `value` is within `min` and `max`
     * @returns true if value is within
     */
    private isValueWithinMinMax;
    /**
     * Check if `from` is before or the same as `to`
     * @returns true if `from` is before or the same as `to`
     */
    private isFromBeforeTo;
    /**
     * Check if datetime picker has an error
     * @returns true if error
     */
    private hasError;
    /**
     * Toggles the opened state of the list
     * @returns {void}
     */
    private toggleOpened;
    /**
     * Return true if popup can be opened
     */
    private get canOpenPopup();
    /**
     * Set opened state with event
     * @param opened True if opened
     * @returns {void}
     */
    private setOpened;
    /**
     * Reset views to default
     * @returns {void}
     */
    private resetViews;
    /**
     * Get time picker template
     * @param id Timepicker identifier
     * @param value Time picker value
     * @returns template result
     */
    private getTimepickerTemplate;
    /**
     * Get calendar template
     * @param id Calendar identifier
     * @param view Calendar view
     * @returns template result
     */
    private getCalendarTemplate;
    /**
     * Get calendar templates
     */
    private get calendarsTemplate();
    /**
     * Get timepicker templates
     */
    private get timepickersTemplate();
    /**
     * Get input template
     * @param id Input identifier
     * @param value Input value
     * @returns template result
     */
    private getInputTemplate;
    /**
     * Template for rendering an icon
     */
    private get iconTemplate();
    /**
     * Template for inputs
     * @returns inputTemplate
     */
    private get inputTemplates();
    /**
    * Popup panel template
    */
    private get popupTemplate();
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    protected render(): TemplateResult;
}
