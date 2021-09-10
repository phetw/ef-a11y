var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ControlElement, html, css, customElement, property, query, ifDefined, WarningNotice } from '@refinitiv-ui/core';
import '../calendar';
import '../icon';
import '../overlay';
import '../text-field';
import '../time-picker';
import { getDateFNSLocale } from './locales';
import { translate, getLocale, TranslatePropertyKey } from '@refinitiv-ui/translate';
import { format as inputFormat, parse as inputParse, isValid } from 'date-fns';
import { addMonths, subMonths, isAfter, isBefore, isValidDate, isValidDateTime, DateFormat, DateTimeFormat, parse, format } from '@refinitiv-ui/utils';
import { DateTimeSegment, formatToView, getCurrentTime } from './utils';
import { preload } from '../icon';
import { VERSION } from '../';
preload('calendar', 'down', 'left', 'right'); /* preload calendar icons for faster loading */
const POPUP_POSITION = ['bottom-start', 'top-start', 'bottom-end', 'top-end', 'bottom-middle', 'top-middle'];
const INPUT_FORMAT = {
    DATE: 'dd-MMM-yyyy',
    DATETIME: 'dd-MMM-yyyy HH:mm',
    DATETIME_AM_PM: 'dd-MMM-yyyy hh:mm aaa',
    DATETIME_SECONDS: 'dd-MMM-yyyy HH:mm:ss',
    DATETIME_SECONDS_AM_PM: 'dd-MMM-yyyy hh:mm:ss aaa'
};
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
let DatetimePicker = class DatetimePicker extends ControlElement {
    constructor() {
        super(...arguments);
        this.lazyRendered = false; /* speed up rendering by not populating popup window on first load */
        this.calendarValues = []; /* used to store date information for calendars */
        this.timepickerValues = []; /* used to store time information for timepickers */
        this.inputValues = []; /* used to formatted datetime value for inputs */
        this.inputSyncing = true; /* true when inputs and pickers are in sync. False while user types in input */
        this._min = '';
        this.minDate = '';
        this._max = '';
        this.maxDate = '';
        /**
        * Only enable weekdays
        */
        this.weekdaysOnly = false;
        /**
        * Only enable weekends
        */
        this.weekendsOnly = false;
        /**
        * Custom filter, used for enabling/disabling certain dates
        * @type {DatetimePickerFilter | null}
        */
        this.filter = null;
        /**
        * Set to switch to range select mode
        */
        this.range = false;
        this._values = []; /* list of values as passed by the user */
        this._segments = []; /* filtered and processed list of values */
        /**
         * Toggles 12hr time display
         */
        this.amPm = false;
        /**
         * Flag to show seconds time segment in display.
         * Seconds are automatically shown when `hh:mm:ss` time format is provided as a value.
         */
        this.showSeconds = false;
        this._placeholder = '';
        /**
        * Toggles the opened state of the list
        */
        this.opened = false;
        /**
         * Set state to error
         */
        this.error = false;
        /**
         * Set state to warning
         */
        this.warning = false;
        /**
        * Only open picker panel when calendar icon is clicked.
        * Clicking on the input will no longer open the picker.
        */
        this.inputTriggerDisabled = false;
        /**
        * Disable input part of the picker
        */
        this.inputDisabled = false;
        /**
        * Disable the popup
        */
        this.popupDisabled = false;
        this._format = '';
        /**
        * Toggle to display the time picker
        */
        this.timepicker = false;
        /**
        * Display two calendar pickers.
        * @type {"" | "consecutive" | "split"}
        */
        this.duplex = null;
        this._views = [];
        this._interimSegments = [];
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
        return VERSION;
    }
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return CSS template
     */
    static get styles() {
        return css `
      :host {
        display: inline-block;
        height: 48px;
        outline: none;
        cursor: text;
      }
      [part=input-wrapper] {
        display: flex;
        flex: 1;
      }
      [part=body] {
        display: flex;
      }
      [part=timepicker-wrapper] {
        display: flex;
        justify-content: space-between;
      }
      [part=timepicker-wrapper]:before,
      [part=timepicker-wrapper]:after {
        content: '';
      }
      [part=input] {
        flex: 1;
        width: auto;
        height: auto;
        padding: 0;
        margin: 0;
      }
      [part=calendar-wrapper] {
        display: inline-flex;
      }
      [part=icon] {
        cursor: pointer;
      }
      :host([popup-disabled]) [part=icon], :host([readonly]) [part=icon] {
        pointer-event: none;
      }
    `;
    }
    /**
    * Set minimum date
    * @param min date
    */
    set min(min) {
        if (!this.isValidValue(min)) {
            this.warnInvalidValue(min);
            min = '';
        }
        const oldMin = this.min;
        if (oldMin !== min) {
            this._min = min;
            this.minDate = min ? format(parse(min), DateFormat.yyyyMMdd) : '';
            void this.requestUpdate('min', oldMin);
        }
    }
    get min() {
        return this._min;
    }
    /**
    * Set maximum date
    * @param max date
    */
    set max(max) {
        if (!this.isValidValue(max)) {
            this.warnInvalidValue(max);
            max = '';
        }
        const oldMax = this.max;
        if (oldMax !== max) {
            this._max = max;
            this.maxDate = max ? format(parse(max), DateFormat.yyyyMMdd) : '';
            void this.requestUpdate('max', oldMax);
        }
    }
    get max() {
        return this._max;
    }
    /**
    * Set to switch to multiple select mode
    * @ignore
    * @param multiple Multiple
    */
    /* istanbul ignore next */
    set multiple(multiple) {
        new WarningNotice('multiple is not currently supported').show();
    }
    get multiple() {
        return false;
    }
    /**
    * Current date time value
    * @param value Calendar value
    */
    set value(value) {
        this.values = value ? [value] : [];
    }
    get value() {
        return this.values[0] || '';
    }
    /**
    * Set multiple selected values
    * @param values Values to set
    * @type {string[]}
    */
    set values(values) {
        const oldValues = this._values;
        if (String(oldValues) !== String(values)) {
            this._values = values;
            void this.requestUpdate('_values', oldValues); /* segments are populated in update */
        }
    }
    get values() {
        return this._segments.map(segment => segment.value);
    }
    /**
    * Placeholder to display when no value is set
    * @param placeholder Placeholder
    */
    set placeholder(placeholder) {
        const oldPlaceholder = this._placeholder;
        if (oldPlaceholder !== placeholder) {
            this._placeholder = placeholder;
            void this.requestUpdate('placeholder', oldPlaceholder);
        }
    }
    get placeholder() {
        return this._placeholder || this.format;
    }
    /**
    * Set the datetime format
    * Based on dane-fns datetime formats
    * @param format Date format
    */
    set format(format) {
        const oldFormat = this._format;
        if (oldFormat !== format) {
            this._format = format;
            void this.requestUpdate('format', oldFormat);
        }
    }
    get format() {
        return this._format || (this.timepicker
            ? (this.showSeconds
                ? (this.amPm ? INPUT_FORMAT.DATETIME_SECONDS_AM_PM : INPUT_FORMAT.DATETIME_SECONDS)
                : (this.amPm ? INPUT_FORMAT.DATETIME_AM_PM : INPUT_FORMAT.DATETIME))
            : INPUT_FORMAT.DATE);
    }
    /**
    * Set the current calendar view.
    * Accepted format: 'yyyy-MM'
    * @param view view date
    */
    set view(view) {
        this.views = view ? [view] : [];
    }
    get view() {
        return this.views[0] || '';
    }
    /**
    * Set the current calendar views for duplex mode
    * Accepted format: 'yyyy-MM'
    * @param views view dates
    * @type {string[]}
    */
    set views(views) {
        const oldViews = this._views;
        views = this.filterAndWarnInvalidViews(views);
        if (oldViews.toString() !== views.toString()) {
            this._views = views;
            void this.requestUpdate('views', oldViews);
        }
    }
    get views() {
        if (this._views.length) {
            return this._views;
        }
        const now = new Date();
        const from = this.values[0];
        if (!this.isDuplex()) {
            return [formatToView(from || now)];
        }
        const to = this.values[1];
        // default duplex mode
        if (this.isDuplexConsecutive() || !from || !to || formatToView(from) === formatToView(to) || isBefore(to, from)) {
            return this.composeViews(formatToView(from || to || now), !from && to ? 1 : 0, []);
        }
        // duplex split if as from and to
        return [formatToView(from), formatToView(to)];
    }
    /**
     * Validates the input, marking the element as invalid if its value does not meet the validation criteria.
     * @returns {void}
     */
    validateInput() {
        const hasError = this.hasError();
        if (this.error !== hasError) {
            this.error = hasError;
            this.notifyPropertyChange('error', this.error);
        }
    }
    /**
     * Updates the element
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    update(changedProperties) {
        if (changedProperties.has('_values')) {
            this.valuesToSegments();
        }
        if (changedProperties.has('opened') && this.opened) {
            this.lazyRendered = true;
        }
        // make sure to close popup for disabled
        if (this.opened && !this.canOpenPopup) {
            this.opened = false; /* this cannot be nor stopped nor listened */
        }
        if (changedProperties.has('_values') || changedProperties.has(TranslatePropertyKey)) {
            this.syncInputValues();
        }
        if (this.shouldValidateValue(changedProperties)) {
            this.validateInput();
        }
        super.update(changedProperties);
    }
    /**
     * Called after the component is first rendered
     * @param changedProperties Properties which have changed
     * @returns {void}
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.addEventListener('keydown', this.onKeyDown);
        this.addEventListener('tap', this.onTap);
    }
    /**
     * Overwrite validation method for value
     *
     * @param value value
     * @returns {boolean} result
     */
    isValidValue(value) {
        if (value === '') {
            return true;
        }
        return this.timepicker
            ? isValidDateTime(value)
            : isValidDate(value, DateFormat.yyyyMMdd);
    }
    /**
    * Used to show a warning when the value does not pass the validation
    * @param value that is invalid
    * @returns {void}
    */
    warnInvalidValue(value) {
        new WarningNotice(`The specified value "${value}" does not conform to the required format. The format is ${this.timepicker ? '"yyyy-MM-ddThh:mm" followed by optional ":ss" or ":ss.SSS"' : '"yyyy-MM-dd"'}.`).show();
    }
    /**
     * Show invalid view message
     * @param value Invalid value
     * @returns {void}
     */
    warnInvalidView(value) {
        new WarningNotice(`The specified value "${value}" does not conform to the required format. The format is "yyyy-MM".`).show();
    }
    /**
     * Convert value string array to date segments
     * Warn invalid value if passed value does not confirm a segment
     * @returns {void}
     */
    valuesToSegments() {
        const newSegments = this.filterAndWarnInvalidValues(this._values).map(value => DateTimeSegment.fromString(value));
        this._segments = newSegments;
        this.interimSegments = newSegments;
    }
    /**
     * Check if the value needs re-validation against min/max and format
     * @param changedProperties Properties which have changed
     * @returns needs re-validation
     */
    shouldValidateValue(changedProperties) {
        // do not validate default value
        if (changedProperties.has('_values') && changedProperties.get('_values') !== undefined
            || changedProperties.has('min') && changedProperties.get('min') !== undefined
            || changedProperties.has('max') && changedProperties.get('max') !== undefined
            || changedProperties.has('showSeconds') && changedProperties.get('showSeconds') !== undefined) {
            return true;
        }
        return false;
    }
    /**
     * A helper method to make sure that only valid values are passed
     * Warn if passed value is invalid
     * @param values Values to check
     * @returns Filtered collection of values
     */
    filterAndWarnInvalidValues(values) {
        return values.map(value => {
            if (this.isValidValue(value)) {
                return value;
            }
            this.warnInvalidValue(value);
            return '';
        });
    }
    /**
     * A helper method to make sure that only valid views are passed
     * Warn if passed view is invalid
     * @param views Views to check
     * @returns Filtered collection of values
     */
    filterAndWarnInvalidViews(views) {
        for (let i = 0; i < views.length; i += 1) {
            const view = views[i];
            if (!isValidDate(view, DateFormat.yyyyMM)) {
                this.warnInvalidView(view);
                return []; /* if at least one view is invalid, do not care about the rest to avoid empty views */
            }
        }
        return views;
    }
    /**
     * Return true if calendar is in duplex mode
     * @returns duplex
     */
    isDuplex() {
        return this.isDuplexSplit() || this.isDuplexConsecutive();
    }
    /**
     * Return true if calendar is in duplex split mode
     * @returns duplex split
     */
    isDuplexSplit() {
        return this.duplex === 'split';
    }
    /**
     * Return true if calendar is in duplex consecutive mode
     * @returns duplex consecutive
     */
    isDuplexConsecutive() {
        return this.duplex === '' || this.duplex === 'consecutive';
    }
    /**
     * Stop syncing input values and picker values
     * @returns {void}
     */
    disableInputSync() {
        this.inputSyncing = false;
    }
    /**
     * Start syncing input values and picker values
     * @returns {void}
     */
    enableInputSync() {
        this.inputSyncing = true;
    }
    /**
     * Synchronise input values and values
     * @return {void}
     */
    syncInputValues() {
        if (!this.inputSyncing) {
            return;
        }
        // input values cannot be populated off interim segments as require a valid date
        // date-fns formats to local if there is time info
        this.inputValues = this._segments.map(segment => this.formatSegment(segment));
    }
    /**
     * Format date segment according to format and locale
     * @param segment Date segment
     * @returns formatted string
     */
    formatSegment(segment) {
        return segment.value ? inputFormat(segment.getTime(), this.format, {
            locale: getDateFNSLocale(getLocale(this))
        }) : '';
    }
    /**
     * Construct view collection
     * @param view The view that has changed
     * @param index View index (0 - single, or from); (1 - to)
     * @param [views=this.views] The original views collection
     * @returns the new view collection
     */
    composeViews(view, index, views = this.views) {
        view = formatToView(view);
        if (!this.isDuplex()) {
            return [view];
        }
        if (this.isDuplexConsecutive()) {
            if (index === 0) { /* from */
                return [view, formatToView(addMonths(view, 1))];
            }
            else { /* to */
                return [formatToView(subMonths(view, 1)), view];
            }
        }
        // duplex split
        if (index === 0) { /* from. to must be after or the same */
            let after = views[1] || addMonths(view, 1);
            if (isBefore(after, view)) {
                after = view;
            }
            return [view, formatToView(after)];
        }
        if (index === 1) { /* to. from must be before or the same */
            let before = views[0] || subMonths(view, 1);
            if (isAfter(before, view)) {
                before = view;
            }
            return [formatToView(before), view];
        }
        return [];
    }
    /**
     * An interim collection of segments to push values when all parts are populated
     * and validated
     * @param segments Segments
     */
    set interimSegments(segments) {
        const interimSegments = segments.map(segment => DateTimeSegment.fromDateTimeSegment(segment));
        this._interimSegments = interimSegments;
        // cannot populate calendar if from is after to, it looks broken
        this.calendarValues = this.isFromBeforeTo() ? interimSegments.map(segment => segment.dateSegment) : [];
        this.timepickerValues = interimSegments.map(segment => segment.timeSegment);
    }
    /**
     * Get interim segments. These are free to modify
     * @returns interim segments
     */
    get interimSegments() {
        return this._interimSegments;
    }
    /**
     * Submit interim segments to values.
     * Notify value-changed event.
     * @returns true if values have changed. False otherwise
     */
    submitInterimSegments() {
        const oldSegments = this._segments;
        const newSegments = this.interimSegments;
        // compare if different
        if (oldSegments.toString() === newSegments.toString()) {
            return false;
        }
        const newValues = newSegments.map(segment => segment.value);
        // validate
        for (let i = 0; i < newValues.length; i += 1) { /* need this step in case timepicker is not populated */
            if (!this.isValidValue(newValues[i])) {
                return false;
            }
        }
        this.notifyValuesChange(newValues);
        return true;
    }
    /**
     * Notify that values array has been changed
     * @param values A collection of string dates
     * @returns {void}
     */
    notifyValuesChange(values) {
        if (this.values.toString() !== values.toString()) {
            this.values = values;
            this.valuesToSegments(); /* need to be here to get correct value synchronously */
            this.notifyPropertyChange('value', this.value);
        }
    }
    /**
     * Notify that views array has been changed
     * @param views A collection of string dates
     * @returns {void}
     */
    notifyViewsChange(views) {
        if (this._views.toString() !== views.toString()) {
            this.views = views;
            this.notifyPropertyChange('view', this.view);
        }
    }
    /**
     * Handles key input on datetime picker
     * @param event Key down event object
     * @returns {void}
     */
    onKeyDown(event) {
        switch (event.key) {
            case 'Down':
            case 'ArrowDown':
                this.setOpened(true);
                break;
            case 'Up':
            case 'ArrowUp':
                !event.defaultPrevented && this.setOpened(false);
                break;
            default:
                return;
        }
        event.preventDefault();
    }
    /**
     * Handles key input on calendar picker
     * @param event Key down event object
     * @returns {void}
     */
    onCalendarKeyDown(event) {
        switch (event.key) {
            case 'Esc':
            case 'Escape':
                this.resetViews();
                this.setOpened(false);
                break;
            default:
                return;
        }
        event.preventDefault();
    }
    /**
     * Handles key input on text field
     * @param event Key down event object
     * @returns {void}
     */
    onInputKeyDown(event) {
        switch (event.key) {
            case 'Esc':
            case 'Escape':
                !this.opened && this.blur();
                this.setOpened(false);
                break;
            case 'Enter':
                this.toggleOpened();
                break;
            default:
                return;
        }
        event.preventDefault();
    }
    /**
     * Run on tap event
     * @param event Tap event
     * @returns {void}
     */
    onTap(event) {
        const path = event.composedPath();
        if (this.popupEl && path.includes(this.popupEl)) {
            return; /* popup is managed separately */
        }
        if (path.includes(this.iconEl)) {
            this.toggleOpened();
        }
        else if (!this.inputTriggerDisabled) {
            this.setOpened(true);
        }
    }
    /**
     * Run when popup opened flag changes
     * @param event opened-change event
     * @returns {void}
     */
    onPopupOpenedChanged(event) {
        event.preventDefault(); /* re-target opened changed event */
        this.setOpened(event.detail.value);
    }
    /**
     * Run on calendar view-changed event
     * @param event view-changed event
     * @returns {void}
     */
    onCalendarViewChanged(event) {
        const index = event.target === this.calendarToEl ? 1 : 0; /* 0 - from, single; 1 - to */
        const view = event.detail.value;
        this.notifyViewsChange(this.composeViews(view, index));
    }
    /**
     * Run on calendar value-changed event
     * @param event value-changed event
     * @returns {void}
     */
    onCalendarValueChanged(event) {
        var _a, _b;
        const values = event.target.values;
        this.interimSegments = values.map((value, index) => {
            const segment = this.interimSegments[index] || new DateTimeSegment();
            segment.dateSegment = value;
            if (this.timepicker && !segment.timeSegment) {
                segment.timeSegment = getCurrentTime(this.showSeconds); /* populate time, as otherwise time picker looks broken */
            }
            return segment;
        });
        this.submitInterimSegments();
        // in duplex mode, avoid jumping on views
        // Therefore if any of values have changed, save the current view
        if (this.isDuplex() && this.calendarEl && this.calendarToEl) {
            this.notifyViewsChange([(_a = this.calendarEl) === null || _a === void 0 ? void 0 : _a.view, (_b = this.calendarToEl) === null || _b === void 0 ? void 0 : _b.view]);
        }
        // Close popup if there is no time picker
        const newValues = this.values;
        if (!this.timepicker && newValues[0] && (this.range ? newValues[1] : true)) {
            this.setOpened(false);
        }
    }
    /**
     * Run on time-picker value-changed event
     * @param event value-changed event
     * @returns {void}
     */
    onTimePickerValueChanged(event) {
        const target = event.target;
        const index = target === this.timepickerToEl ? 1 : 0; /* 0 - from, single; 1 - to */
        const segment = this.interimSegments[index] || new DateTimeSegment();
        segment.timeSegment = target.value;
        this.interimSegments[index] = segment;
        this.submitInterimSegments();
    }
    /**
     * Run on input focus
     * @returns {void}
     */
    onInputFocus() {
        this.disableInputSync();
    }
    /**
     * Run on input blur
     * @param event blur event
     * @returns {void}
     */
    onInputBlur(event) {
        this.enableInputSync();
        // remove all code once strict formatting is supported in date-fns
        const index = event.target === this.inputToEl ? 1 : 0;
        const segment = this._segments[index];
        if (!segment || !segment.value) {
            return;
        }
        const formattedValue = segment ? this.formatSegment(segment) : '';
        if (formattedValue !== this.inputValues[index]) {
            const inputValues = [...this.inputValues];
            inputValues[index] = formattedValue;
            this.inputValues = inputValues;
            void this.requestUpdate();
        }
    }
    /**
     * Run on input value-changed event
     * @param event value-changed event
     * @returns {void}
     */
    onInputValueChanged(event) {
        const target = event.target;
        const index = target === this.inputToEl ? 1 : 0; /* 0 - from, single; 1 - to */
        const inputValue = target.value;
        const inputValues = [...this.inputValues];
        inputValues[index] = inputValue;
        this.inputValues = inputValues;
        let dateString = '';
        if (inputValue) {
            const recoveryDate = (this.interimSegments[index] || new DateTimeSegment()).getTime();
            const date = inputParse(inputValue, this.format, recoveryDate, {
                locale: getDateFNSLocale(getLocale(this))
            });
            if (isValid(date)) {
                dateString = inputFormat(date, this.timepicker ? this.showSeconds ? DateTimeFormat.yyyMMddTHHmmss : DateTimeFormat.yyyMMddTHHmm : DateFormat.yyyyMMdd);
                this.resetViews(); /* user input should be treated similar to manually switching the views */
            }
        }
        else {
            this.resetViews();
        }
        this.interimSegments[index] = DateTimeSegment.fromString(dateString);
        this.submitInterimSegments();
        this.validateInput();
    }
    /**
     * Check if input format conforms to value format
     * @returns true if valid format
     */
    isValidFormat() {
        const inputValues = this.inputValues;
        const values = this.values;
        // No need to format values to validate.
        // If input is invalid, value is not populated
        for (let i = 0; i < inputValues.length; i += 1) {
            if (inputValues[i] && !values[i]) {
                return false;
            }
        }
        return true;
    }
    /**
     * Check if `value` is within `min` and `max`
     * @returns true if value is within
     */
    isValueWithinMinMax() {
        if (this.min || this.max) {
            const minTime = this.min ? parse(this.min).getTime() : -Infinity;
            const maxTime = this.max ? parse(this.max).getTime() : Infinity;
            for (let i = 0; i < this.values.length; i += 1) {
                const valueTime = parse(this.values[i]).getTime();
                if (minTime > valueTime || maxTime < valueTime) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * Check if `from` is before or the same as `to`
     * @returns true if `from` is before or the same as `to`
     */
    isFromBeforeTo() {
        if (this.range) {
            const from = this.values[0];
            const to = this.values[1];
            if (from && to) {
                if (parse(from).getTime() > parse(to).getTime()) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * Check if datetime picker has an error
     * @returns true if error
     */
    hasError() {
        return !(this.isValidFormat() && this.isValueWithinMinMax() && this.isFromBeforeTo());
    }
    /**
     * Toggles the opened state of the list
     * @returns {void}
     */
    toggleOpened() {
        this.setOpened(!this.opened);
    }
    /**
     * Return true if popup can be opened
     */
    get canOpenPopup() {
        return !(this.disabled || this.readonly || this.popupDisabled);
    }
    /**
     * Set opened state with event
     * @param opened True if opened
     * @returns {void}
     */
    setOpened(opened) {
        if (opened && !this.canOpenPopup) { /* never allow to open popup if cannot do so */
            return;
        }
        if (this.opened !== opened && this.notifyPropertyChange('opened', opened, true)) {
            this.opened = opened;
        }
    }
    /**
     * Reset views to default
     * @returns {void}
     */
    resetViews() {
        this.notifyViewsChange([]);
    }
    /**
     * Get time picker template
     * @param id Timepicker identifier
     * @param value Time picker value
     * @returns template result
     */
    getTimepickerTemplate(id, value = '') {
        return html `<ef-time-picker
      id="${id}"
      part="time-picker"
      .showSeconds=${this.showSeconds}
      .amPm=${this.amPm}
      .value=${value}
      @value-changed=${this.onTimePickerValueChanged}></ef-time-picker>`;
    }
    /**
     * Get calendar template
     * @param id Calendar identifier
     * @param view Calendar view
     * @returns template result
     */
    getCalendarTemplate(id, view = '') {
        return html `<ef-calendar
      part="calendar"
      id=${id}
      lang=${ifDefined(this.lang || undefined)}
      .fillCells=${!this.isDuplex()}
      .range=${this.range}
      .multiple=${this.multiple}
      .min=${this.minDate}
      .max=${this.maxDate}
      .weekdaysOnly=${this.weekdaysOnly}
      .weekendsOnly=${this.weekendsOnly}
      .firstDayOfWeek=${ifDefined(this.firstDayOfWeek)}
      .values=${this.calendarValues}
      .filter=${this.filter}
      .view=${view}
      @keydown=${this.onCalendarKeyDown}
      @view-changed=${this.onCalendarViewChanged}
      @value-changed=${this.onCalendarValueChanged}></ef-calendar>`;
    }
    /**
     * Get calendar templates
     */
    get calendarsTemplate() {
        return html `
      ${this.getCalendarTemplate('calendar', this.views[0])}
      ${this.isDuplex() ? this.getCalendarTemplate('calendar-to', this.views[1]) : undefined}
    `;
    }
    /**
     * Get timepicker templates
     */
    get timepickersTemplate() {
        // TODO: how can we add support timepicker with multiple?
        const values = this.timepickerValues;
        return html `
      ${this.getTimepickerTemplate('timepicker', values[0])}
      ${this.range ? html `<div part="input-separator"></div>` : undefined}
      ${this.range ? this.getTimepickerTemplate('timepicker-to', values[1]) : undefined}
    `;
    }
    /**
     * Get input template
     * @param id Input identifier
     * @param value Input value
     * @returns template result
     */
    getInputTemplate(id, value = '') {
        return html `
      <ef-text-field
        id=${id}
        part="input"
        transparent
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly || this.inputDisabled}"
        .value=${value}
        .placeholder="${this.placeholder}"
        @focus=${this.onInputFocus}
        @blur=${this.onInputBlur}
        @keydown=${this.onInputKeyDown}
        @value-changed=${this.onInputValueChanged}></ef-text-field>
    `;
    }
    /**
     * Template for rendering an icon
     */
    get iconTemplate() {
        return html `
      <ef-icon
        part="icon"
        icon="calendar"></ef-icon>
    `;
    }
    /**
     * Template for inputs
     * @returns inputTemplate
     */
    get inputTemplates() {
        const values = this.inputValues;
        return html `
      <div part="input-wrapper">
        ${this.getInputTemplate('input', values[0])}
        ${this.range ? html `<div part="input-separator"></div>` : undefined}
        ${this.range ? this.getInputTemplate('input-to', values[1]) : undefined}
      </div>
    `;
    }
    /**
    * Popup panel template
    */
    get popupTemplate() {
        if (this.lazyRendered) {
            return html `<ef-overlay
        tabindex="0"
        part="list"
        with-shadow
        no-cancel-on-esc-key
        no-autofocus
        .delegatesFocus=${true}
        .focusBoundary=${this}
        .positionTarget=${this}
        .position=${POPUP_POSITION}
        ?opened=${this.opened}
        @opened-changed=${this.onPopupOpenedChanged}>
          <div><slot name="header"></div>
          <div part="body">
            <div><slot name="left"></div>
            <div part="selectors-wrapper">
              <div part="calendar-wrapper">
                ${this.calendarsTemplate}
              </div>
              ${this.timepicker ? html `<div part="timepicker-wrapper">${this.timepickersTemplate}</div>` : undefined}
            </div>
            <div><slot name="right"></div>
          </div>
          <div><slot name="footer"></div>
        </ef-overlay>`;
        }
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return html `
      ${this.inputTemplates}
      ${this.iconTemplate}
      ${this.popupTemplate}
    `;
    }
};
__decorate([
    property({ type: String })
], DatetimePicker.prototype, "min", null);
__decorate([
    property({ type: String })
], DatetimePicker.prototype, "max", null);
__decorate([
    property({ type: Boolean, attribute: 'weekdays-only' })
], DatetimePicker.prototype, "weekdaysOnly", void 0);
__decorate([
    property({ type: Boolean, attribute: 'weekends-only' })
], DatetimePicker.prototype, "weekendsOnly", void 0);
__decorate([
    property({ attribute: false })
], DatetimePicker.prototype, "filter", void 0);
__decorate([
    property({ type: Number, attribute: 'first-day-of-week' })
], DatetimePicker.prototype, "firstDayOfWeek", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DatetimePicker.prototype, "range", void 0);
__decorate([
    property({ type: Boolean })
], DatetimePicker.prototype, "multiple", null);
__decorate([
    property({ type: String })
], DatetimePicker.prototype, "value", null);
__decorate([
    property({
        converter: {
            fromAttribute: function (value) {
                return value.split(',');
            }
        }
    })
], DatetimePicker.prototype, "values", null);
__decorate([
    property({ type: Boolean, attribute: 'am-pm', reflect: true })
], DatetimePicker.prototype, "amPm", void 0);
__decorate([
    property({ type: Boolean, attribute: 'show-seconds', reflect: true })
], DatetimePicker.prototype, "showSeconds", void 0);
__decorate([
    property({ type: String })
], DatetimePicker.prototype, "placeholder", null);
__decorate([
    property({ type: Boolean, reflect: true })
], DatetimePicker.prototype, "opened", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DatetimePicker.prototype, "error", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DatetimePicker.prototype, "warning", void 0);
__decorate([
    property({ type: Boolean, attribute: 'input-trigger-disabled' })
], DatetimePicker.prototype, "inputTriggerDisabled", void 0);
__decorate([
    property({ type: Boolean, attribute: 'input-disabled', reflect: true })
], DatetimePicker.prototype, "inputDisabled", void 0);
__decorate([
    property({ type: Boolean, attribute: 'popup-disabled', reflect: true })
], DatetimePicker.prototype, "popupDisabled", void 0);
__decorate([
    property({ type: String })
], DatetimePicker.prototype, "format", null);
__decorate([
    property({ type: Boolean, reflect: true })
], DatetimePicker.prototype, "timepicker", void 0);
__decorate([
    property({ type: String, reflect: true })
], DatetimePicker.prototype, "duplex", void 0);
__decorate([
    property({ type: String })
], DatetimePicker.prototype, "view", null);
__decorate([
    property({ attribute: false })
], DatetimePicker.prototype, "views", null);
__decorate([
    translate({ mode: 'directive', scope: 'ef-datetime-picker' })
], DatetimePicker.prototype, "t", void 0);
__decorate([
    query('[part=icon]', true)
], DatetimePicker.prototype, "iconEl", void 0);
__decorate([
    query('[part=list]')
], DatetimePicker.prototype, "popupEl", void 0);
__decorate([
    query('#timepicker')
], DatetimePicker.prototype, "timepickerEl", void 0);
__decorate([
    query('#timepicker-to')
], DatetimePicker.prototype, "timepickerToEl", void 0);
__decorate([
    query('#calendar')
], DatetimePicker.prototype, "calendarEl", void 0);
__decorate([
    query('#calendar-to')
], DatetimePicker.prototype, "calendarToEl", void 0);
__decorate([
    query('#input')
], DatetimePicker.prototype, "inputEl", void 0);
__decorate([
    query('#input-to')
], DatetimePicker.prototype, "inputToEl", void 0);
DatetimePicker = __decorate([
    customElement('ef-datetime-picker', {
        alias: 'emerald-datetime-picker'
    })
], DatetimePicker);
export { DatetimePicker };
//# sourceMappingURL=index.js.map