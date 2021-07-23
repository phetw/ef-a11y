var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ControlElement, html, css, query, customElement, property } from '@refinitiv-ui/core';
import '../number-field';
import { isValidTime, toTimeSegment, TimeFormat, getFormat, format, isAM, isPM, MILLISECONDS_IN_SECOND, MILLISECONDS_IN_MINUTE, MILLISECONDS_IN_HOUR, addOffset, padNumber } from '@refinitiv-ui/utils';
import { VERSION } from '../';
var Segment;
(function (Segment) {
    Segment["HOURS"] = "hours";
    Segment["MINUTES"] = "minutes";
    Segment["SECONDS"] = "seconds";
})(Segment || (Segment = {}));
const MIN_UNIT = 0;
const MAX_HOURS = 23;
const MAX_MINUTES = 59;
const MAX_SECONDS = 59;
const HOURS_IN_DAY = 24;
const HOURS_OF_NOON = 12;
const Placeholder = {
    HOURS: '--',
    MINUTES: '--',
    SECONDS: '--'
};
/**
 * Control the time input
 * @event value-changed - Dispatched when value changes
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 */
let TimePicker = class TimePicker extends ControlElement {
    constructor() {
        super(...arguments);
        this.isMobile = false;
        /**
         * Internal hours value, used only in value getters and setters
         */
        this._hours = null;
        /**
         * Internal minutes value, used only in value getters and setters
         */
        this._minutes = null;
        /**
         * Internal seconds value, used only in value getters and setters
         */
        this._seconds = null;
        /**
         * If external value is set with seconds, this flag is true.
         * The flag is not relevant when withSecond is forced to be true
         */
        this.valueWithSeconds = false;
        /**
         * Toggles 12hr time display
         */
        this.amPm = false;
        /**
         * Flag to show seconds time segment in display.
         * Seconds are automatically shown when `hh:mm:ss` time format is provided as a value.
         */
        this.showSeconds = false;
        /**
         * Handles the blur event of any inputs
         *
         * @param event Event Object
         * @returns {void}
         */
        this.onBlur = (event) => {
            if (this.readonly) {
                return;
            }
            const target = event.target;
            const value = target.value;
            let segment;
            if (target === this.hoursInput) {
                segment = Segment.HOURS;
            }
            else if (target === this.minutesInput) {
                segment = Segment.MINUTES;
            }
            else if (target === this.secondsInput) {
                segment = Segment.SECONDS;
            }
            /* istanbul ignore next */
            if (!segment) {
                return;
            }
            if (value) {
                this.updateTimeSegmentTo(segment, Number(value));
            }
            this.updateSegmentValue(segment);
        };
        /**
         * Handles the focus event of any inputs
         *
         * @param event Event Object
         * @returns {void}
         */
        this.onFocus = (event) => {
            if (this.readonly) {
                return;
            }
            event.target.value = '';
        };
        /**
         * Handles any keydown events
         * Used for control keys
         *
         * @param event Event Object
         * @returns {void}
         */
        this.onKeydown = (event) => {
            this.manageControlKeys(event);
        };
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
        return VERSION;
    }
    /**
     * Hours time segment in 24hr format
     * @param hours hours value
     * @returns {void}
     */
    set hours(hours) {
        const oldHours = this.hours;
        if ((hours !== null && isNaN(hours)) || oldHours === hours) {
            return;
        }
        this._hours = this.validUnit(hours, MIN_UNIT, MAX_HOURS, oldHours);
        if (this._hours !== oldHours) {
            void this.requestUpdate('hours', oldHours);
        }
    }
    /**
     * Get hours value
     * @returns hours
     */
    get hours() {
        return this._hours;
    }
    /**
     * Minutes time segment
     * @param minutes minutes value
     * @returns {void}
     */
    set minutes(minutes) {
        const oldMinutes = this.minutes;
        if ((minutes !== null && isNaN(minutes)) || oldMinutes === minutes) {
            return;
        }
        this._minutes = this.validUnit(minutes, MIN_UNIT, MAX_MINUTES, oldMinutes);
        if (this._minutes !== oldMinutes) {
            void this.requestUpdate('minutes', oldMinutes);
        }
    }
    /**
     * Get minutes value
     * @returns hours
     */
    get minutes() {
        return this._minutes;
    }
    /**
     * Seconds time segment
     * @param seconds seconds value
     * @returns {void}
     */
    set seconds(seconds) {
        const oldSeconds = this.seconds;
        if ((seconds !== null && isNaN(seconds)) || oldSeconds === seconds) {
            return;
        }
        this._seconds = this.validUnit(seconds, MIN_UNIT, MAX_SECONDS, oldSeconds);
        if (this._seconds !== oldSeconds) {
            void this.requestUpdate('seconds', oldSeconds);
        }
    }
    /**
     * Get seconds value
     * @returns seconds
     */
    get seconds() {
        return this._seconds;
    }
    /**
    * Value of the element
    * @default -
    * @param value Element value
    */
    set value(value) {
        const oldValue = this.value;
        value = this.castValue(value);
        if (!this.isValidValue(value)) {
            this.warnInvalidValue(value);
            // it does not make sense to clear value here, as the value is always defined
            return;
        }
        /* special case to reset hours, minutes and seconds */
        if (value === '' && (this.hours || this.minutes || this.seconds)) {
            this.hours = null;
            this.minutes = null;
            this.seconds = null;
            return;
        }
        if (oldValue !== value) { /** never store actual value, instead operate with hours/minutes/seconds */
            const info = toTimeSegment(value);
            const format = getFormat(value);
            this.valueWithSeconds = format === TimeFormat.HHmmss || format === TimeFormat.HHmmssSSS;
            this.hours = info.hours;
            this.minutes = info.minutes;
            this.seconds = info.seconds;
        }
    }
    get value() {
        if (this.hours === null || this.minutes === null || (this.isShowSeconds && this.seconds === null)) {
            return '';
        }
        return this.currentTimeString;
    }
    /**
     * Return the current time string, based on the current hours, minutes and seconds.
     * Used internally to set the value string after updates.
     */
    get currentTimeString() {
        return format({
            hours: this.hours || 0,
            minutes: this.minutes || 0,
            seconds: this.seconds || 0,
            milliseconds: 0
        }, this.isShowSeconds ? TimeFormat.HHmmss : TimeFormat.HHmm);
    }
    /**
     * Seconds are automatically shown when `hh:mm:ss` time format is provided as a value.
     */
    get isShowSeconds() {
        return this.showSeconds || this.valueWithSeconds;
    }
    /**
     * Formats the hours value
     */
    get formattedHours() {
        const _hours = this.hours;
        let hours = _hours;
        if (_hours !== null) {
            hours = this.amPm && _hours > HOURS_OF_NOON
                ? _hours - HOURS_OF_NOON : this.amPm && !_hours ? HOURS_OF_NOON : _hours;
        }
        return this.formattedUnit(hours);
    }
    /**
     * Formats the minutes value
     */
    get formattedMinutes() {
        return this.formattedUnit(this.minutes);
    }
    /**
     * Formats the seconds value
     * @returns Formatted number
     */
    get formattedSeconds() {
        return this.formattedUnit(this.seconds);
    }
    /**
     * On first updated life-cycle
     *
     * @param changedProperties changed properties
     * @returns {void}
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        // add events
        this.renderRoot.addEventListener('blur', this.onBlur, true);
        this.renderRoot.addEventListener('focus', this.onFocus, true);
        this.renderRoot.addEventListener('keydown', this.onKeydown, true);
    }
    /**
     * On updated life-cycle
     *
     * @param changedProperties changed properties
     * @returns {void}
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        /* istanbul ignore next */
        if (this.hasTimeChanged(changedProperties) && this.isMobile) {
            this.updateMobileTimePickerValue();
        }
    }
    /**
     * Overwrite validation method for value
     *
     * @param value value
     * @returns {boolean} result
     */
    isValidValue(value) {
        return value === '' || isValidTime(value);
    }
    /**
     * Set time segment value in consistent way
     * @param segment Time segment
     * @param value Value to check
     * @returns {void}
     */
    setSegmentAndNotify(segment, value) {
        const oldValue = this.value;
        switch (segment) {
            case Segment.HOURS:
                this.hours = value;
                break;
            case Segment.MINUTES:
                this.minutes = value;
                break;
            case Segment.SECONDS:
                this.seconds = value;
                break;
            // no default
        }
        // Pre-populate empty segments
        if (value !== null) {
            if (segment === Segment.HOURS && this.minutes === null) {
                this.minutes = 0;
            }
            if (this.isShowSeconds && this.seconds === null && (segment === Segment.HOURS || segment === Segment.MINUTES)) {
                this.seconds = 0;
            }
        }
        // verify value again, as time segment validation
        // might fail in setter and previous value returned
        if (oldValue !== this.value) {
            this.notifyPropertyChange('value', this.value);
        }
    }
    /**
     * True if time segment has changed
     * @param changedProperties changed properties
     * @returns True if changed
     */
    hasTimeChanged(changedProperties) {
        return changedProperties.has('hours')
            || changedProperties.has('minutes')
            || changedProperties.has('seconds');
    }
    /**
     * Validates a given unit against a min and max value, returning a fallback if invalid.
     *
     * @param unit Unit to validate
     * @param min Minimum allowed
     * @param max Maximum allowed
     * @param fallback Fallback value to use, if unit is invalid
     * @returns unit or fallback or 0 value
     */
    validUnit(unit, min, max, fallback) {
        if (unit === null) {
            return null;
        }
        if (isNaN(unit) || unit < min || unit > max) {
            return fallback;
        }
        return unit;
    }
    /**
     * Handles value change from native time picker on mobile devices
     *
     * @param event Event Object
     * @returns {void}
     */
    /* istanbul ignore next */
    onMobileTimeChange(event) {
        this.value = event.target.value;
    }
    /**
     * Helper, used to update the mobile time picker value
     *
     * @returns {void}
     */
    /* istanbul ignore next */
    updateMobileTimePickerValue() {
        if (this.mtpInput) {
            this.mtpInput.value = this.value;
        }
    }
    /**
     * Updates a time segment to the provided value
     *
     * @param segment Segment id
     * @param value Unit to change to
     * @returns {void}
     */
    updateTimeSegmentTo(segment, value) {
        if (segment === Segment.HOURS) {
            value = this.getHoursSegment(value);
        }
        this.setSegmentAndNotify(segment, value);
    }
    /**
     * Updates the value of a time segment (element)
     *
     * @param segment Segment's name
     * @returns {void}
     */
    updateSegmentValue(segment) {
        switch (segment) {
            case Segment.HOURS:
                this.updateHoursSegmentValue();
                break;
            case Segment.MINUTES:
                this.updateMinutesSegmentValue();
                break;
            case Segment.SECONDS:
                this.updateSecondsSegmentValue();
                break;
            // no default
        }
    }
    /**
     * Handle valid control keys and execute their corresponding commands
     * Will stop when readonly is set
     *
     * @param event Event Object
     * @returns {void}
     */
    manageControlKeys(event) {
        if (this.readonly || this.disabled) {
            return;
        }
        switch (event.key) {
            case 'Up': // IE
            case 'ArrowUp':
                this.handleUpKey(event);
                break;
            case 'Down': // IE
            case 'ArrowDown':
                this.handleDownKey(event);
                break;
            case 'Enter':
            case 'Spacebar':
            case ' ':
                this.handleEnterKey(event);
                break;
            case 'Backspace':
                this.handleBackspaceKey(event);
                return;
            default:
                return;
        }
        event.preventDefault();
    }
    /**
     * Handles ENTER key press
     *
     * @param event Event Object
     * @returns {void}
     */
    handleEnterKey(event) {
        event.target.blur();
    }
    /**
     * Handles UP key press
     *
     * @param event Event Object
     * @returns {void}
     */
    handleUpKey(event) {
        this.toggleOrModify(1, event.target);
    }
    /**
     * Handle DOWN key press
     *
     * @param event Event Object
     * @returns {void}
     */
    handleDownKey(event) {
        this.toggleOrModify(-1, event.target);
    }
    /**
     * Handle Backspace key press
     *
     * @param event Event Object
     * @returns {void}
     */
    handleBackspaceKey(event) {
        const target = event.target;
        if (target === this.hoursInput) {
            this.setSegmentAndNotify(Segment.HOURS, null);
        }
        else if (target === this.minutesInput) {
            this.setSegmentAndNotify(Segment.MINUTES, null);
        }
        else if (target === this.secondsInput) {
            this.setSegmentAndNotify(Segment.SECONDS, null);
        }
    }
    /**
     * Toggles the amPm flag or updates the time segment value.
     * Essentially a handler for user inputs on the control.
     *
     * @param amount to change value by
     * @param target Segment id
     * @returns {void}
     */
    toggleOrModify(amount, target) {
        if (target === this.toggleEl) {
            this.toggle();
        }
        else if (target === this.hoursInput) {
            this.changeValueBy(amount, Segment.HOURS);
        }
        else if (target === this.minutesInput) {
            this.changeValueBy(amount, Segment.MINUTES);
        }
        else if (target === this.secondsInput) {
            this.changeValueBy(amount, Segment.SECONDS);
        }
    }
    /**
     * Changes a time segment value by a specified amount.
     * Also updates parent values when rolling through cycles.
     *
     * @param amount Amount to change by
     * @param segment Segment id
     * @returns {void}
     */
    changeValueBy(amount, segment) {
        let offset = 0;
        switch (segment) {
            case Segment.HOURS:
                offset = this.hours === null ? 0 : amount * MILLISECONDS_IN_HOUR;
                break;
            case Segment.MINUTES:
                offset = this.minutes === null ? 0 : amount * MILLISECONDS_IN_MINUTE;
                break;
            case Segment.SECONDS:
                offset = this.seconds === null ? 0 : amount * MILLISECONDS_IN_SECOND;
                break;
            // no default
        }
        const value = addOffset(this.currentTimeString, offset);
        this.setValueAndNotify(value);
    }
    /**
     * Gets the hours segment of the provided value
     * as there is extra logic required for 12hr support
     *
     * @param value Unit to change to
     * @returns updated value
     */
    getHoursSegment(value) {
        if (this.amPm) {
            if (value === HOURS_OF_NOON && this.isAM()) {
                value = 0;
            }
            if (this.isPM() && value < HOURS_OF_NOON) {
                value += HOURS_OF_NOON;
            }
        }
        return value;
    }
    /**
     * Updates the value of the hours element
     *
     * @returns {void}
     */
    updateHoursSegmentValue() {
        if (this.hoursInput) {
            this.hoursInput.value = this.formattedHours;
        }
    }
    /**
     * Updated the value of the minutes element
     *
     * @returns {void}
     */
    updateMinutesSegmentValue() {
        if (this.minutesInput) {
            this.minutesInput.value = this.formattedMinutes;
        }
    }
    /**
     * Updates the value of the seconds element
     *
     * @returns {void}
     */
    updateSecondsSegmentValue() {
        if (this.secondsInput) {
            this.secondsInput.value = this.formattedSeconds;
        }
    }
    /**
     * Formats a given number and prefixes a 0 on numbers lower than 10
     *
     * @param n Number to format
     * @returns Formatted number
     */
    formattedUnit(n) {
        return n === null ? '' : padNumber(n, 2);
    }
    /**
     * Returns `true` or `false` depending on whether the hours are before, or, after noon
     *
     * @returns Result
     */
    isAM() {
        return isAM(this.currentTimeString);
    }
    /**
     * Returns opposite of isAM
     *
     * @returns Result
     */
    isPM() {
        return isPM(this.currentTimeString);
    }
    /**
     * Toggles the AM/PM state
     *
     * @returns {void}
     */
    toggle() {
        if (this.amPm) {
            const hours = this.hours === null ? new Date().getHours() : (this.hours + HOURS_IN_DAY / 2) % HOURS_IN_DAY;
            this.setSegmentAndNotify(Segment.HOURS, hours);
        }
    }
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @returns CSS template
     */
    static get styles() {
        return css `
      :host {
        display: inline-flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        user-select:none;
        position: relative;
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    `;
    }
    /**
     * Template for Seconds Segment
     *
     * @returns Seconds segment
     */
    getSecondsHtml() {
        return this.isShowSeconds ? html `
      <span part="divider"></span>
      <ef-number-field
        id="seconds"
        part="input"
        no-spinner
        min="${MIN_UNIT}"
        max="${MAX_SECONDS}"
        .value="${this.formattedSeconds}"
        placeholder="${this.formattedSeconds || Placeholder.SECONDS}"
        ?readonly="${this.readonly}"
        ?disabled="${this.disabled}"
        transparent></ef-number-field>
    ` : null;
    }
    /**
     * Template for AmPm Segment
     *
     * @returns Am/Pm segment
     */
    getAmPmHtml() {
        const hasHours = this.hours !== null;
        return this.amPm ? html `
      <div id="toggle" part="toggle" @tap=${this.toggle} tabindex="0">
        <div part="toggle-item" ?active=${hasHours && this.isAM()}>AM</div>
        <div part="toggle-item" ?active=${hasHours && this.isPM()}>PM</div>
      </div>
    ` : null;
    }
    /**
     * Native input's template for mobile
     *
     * @returns input
     */
    getNativeInputForMobile() {
        return this.isMobile ? html `<input id="mtp" type="time" @change=${this.onMobileTimeChange}>` : null;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @returns Render template
     */
    render() {
        return html `
      <ef-number-field
        id="hours"
        part="input"
        no-spinner
        transparent
        min="${this.amPm ? 1 : MIN_UNIT}"
        max="${this.amPm ? HOURS_OF_NOON : MAX_HOURS}"
        .value="${this.formattedHours}"
        placeholder="${this.formattedHours || Placeholder.HOURS}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"></ef-number-field>
      <span part="divider"></span>
      <ef-number-field
        id="minutes"
        part="input"
        no-spinner
        min="${MIN_UNIT}"
        max="${MAX_MINUTES}"
        .value="${this.formattedMinutes}"
        placeholder="${this.formattedMinutes || Placeholder.MINUTES}"
        ?readonly="${this.readonly}"
        ?disabled="${this.disabled}"
        transparent></ef-number-field>
      ${this.getSecondsHtml()}
      ${this.getAmPmHtml()}
      ${this.getNativeInputForMobile()}
    `;
    }
};
__decorate([
    property({ type: Number })
], TimePicker.prototype, "hours", null);
__decorate([
    property({ type: Number })
], TimePicker.prototype, "minutes", null);
__decorate([
    property({ type: Number })
], TimePicker.prototype, "seconds", null);
__decorate([
    property({ type: Boolean, attribute: 'am-pm', reflect: true })
], TimePicker.prototype, "amPm", void 0);
__decorate([
    property({ type: Boolean, attribute: 'show-seconds', reflect: true })
], TimePicker.prototype, "showSeconds", void 0);
__decorate([
    property({ type: String })
], TimePicker.prototype, "value", null);
__decorate([
    query('#mtp')
], TimePicker.prototype, "mtpInput", void 0);
__decorate([
    query('#hours')
], TimePicker.prototype, "hoursInput", void 0);
__decorate([
    query('#minutes')
], TimePicker.prototype, "minutesInput", void 0);
__decorate([
    query('#seconds')
], TimePicker.prototype, "secondsInput", void 0);
__decorate([
    query('#toggle')
], TimePicker.prototype, "toggleEl", void 0);
TimePicker = __decorate([
    customElement('ef-time-picker', {
        alias: 'coral-time-picker'
    })
], TimePicker);
export { TimePicker };
//# sourceMappingURL=index.js.map