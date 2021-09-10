import { JSXInterface } from '../jsx';
import { ControlElement, TemplateResult, CSSResult, PropertyValues } from '@refinitiv-ui/core';
import '../number-field';
declare enum Segment {
    HOURS = "hours",
    MINUTES = "minutes",
    SECONDS = "seconds"
}
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
export declare class TimePicker extends ControlElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    private isMobile;
    /**
     * Internal hours value, used only in value getters and setters
     */
    private _hours;
    /**
     * Internal minutes value, used only in value getters and setters
     */
    private _minutes;
    /**
     * Internal seconds value, used only in value getters and setters
     */
    private _seconds;
    /**
     * If external value is set with seconds, this flag is true.
     * The flag is not relevant when withSecond is forced to be true
     */
    private valueWithSeconds;
    /**
     * Hours time segment in 24hr format
     * @param hours hours value
     * @returns {void}
     */
    set hours(hours: number | null);
    /**
     * Get hours value
     * @returns hours
     */
    get hours(): number | null;
    /**
     * Minutes time segment
     * @param minutes minutes value
     * @returns {void}
     */
    set minutes(minutes: number | null);
    /**
     * Get minutes value
     * @returns hours
     */
    get minutes(): number | null;
    /**
     * Seconds time segment
     * @param seconds seconds value
     * @returns {void}
     */
    set seconds(seconds: number | null);
    /**
     * Get seconds value
     * @returns seconds
     */
    get seconds(): number | null;
    /**
     * Toggles 12hr time display
     */
    amPm: boolean;
    /**
     * Flag to show seconds time segment in display.
     * Seconds are automatically shown when `hh:mm:ss` time format is provided as a value.
     */
    showSeconds: boolean;
    /**
    * Value of the element
    * @default -
    * @param value Element value
    */
    set value(value: string);
    get value(): string;
    /**
     * Getter for mtp element (mobile)
     */
    private mtpInput?;
    /**
     * Getter for hours part.
     */
    private hoursInput;
    /**
     * Getter for minutes part.
     */
    private minutesInput;
    /**
     * Getter for seconds part.
     */
    private secondsInput?;
    /**
     * Getter for toggle part.
     */
    private toggleEl?;
    /**
     * Return the current time string, based on the current hours, minutes and seconds.
     * Used internally to set the value string after updates.
     */
    private get currentTimeString();
    /**
     * Seconds are automatically shown when `hh:mm:ss` time format is provided as a value.
     */
    private get isShowSeconds();
    /**
     * Formats the hours value
     */
    private get formattedHours();
    /**
     * Formats the minutes value
     */
    private get formattedMinutes();
    /**
     * Formats the seconds value
     * @returns Formatted number
     */
    private get formattedSeconds();
    /**
     * On first updated life-cycle
     *
     * @param changedProperties changed properties
     * @returns {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * On updated life-cycle
     *
     * @param changedProperties changed properties
     * @returns {void}
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Overwrite validation method for value
     *
     * @param value value
     * @returns {boolean} result
     */
    protected isValidValue(value: string): boolean;
    /**
     * Set time segment value in consistent way
     * @param segment Time segment
     * @param value Value to check
     * @returns {void}
     */
    protected setSegmentAndNotify(segment: Segment, value: number | null): void;
    /**
     * True if time segment has changed
     * @param changedProperties changed properties
     * @returns True if changed
     */
    private hasTimeChanged;
    /**
     * Validates a given unit against a min and max value, returning a fallback if invalid.
     *
     * @param unit Unit to validate
     * @param min Minimum allowed
     * @param max Maximum allowed
     * @param fallback Fallback value to use, if unit is invalid
     * @returns unit or fallback or 0 value
     */
    private validUnit;
    /**
     * Handles value change from native time picker on mobile devices
     *
     * @param event Event Object
     * @returns {void}
     */
    private onMobileTimeChange;
    /**
     * Helper, used to update the mobile time picker value
     *
     * @returns {void}
     */
    private updateMobileTimePickerValue;
    /**
     * Handles the blur event of any inputs
     *
     * @param event Event Object
     * @returns {void}
     */
    private onBlur;
    /**
     * Updates a time segment to the provided value
     *
     * @param segment Segment id
     * @param value Unit to change to
     * @returns {void}
     */
    private updateTimeSegmentTo;
    /**
     * Updates the value of a time segment (element)
     *
     * @param segment Segment's name
     * @returns {void}
     */
    private updateSegmentValue;
    /**
     * Handles the focus event of any inputs
     *
     * @param event Event Object
     * @returns {void}
     */
    private onFocus;
    /**
     * Handles any keydown events
     * Used for control keys
     *
     * @param event Event Object
     * @returns {void}
     */
    private onKeydown;
    /**
     * Handle valid control keys and execute their corresponding commands
     * Will stop when readonly is set
     *
     * @param event Event Object
     * @returns {void}
     */
    private manageControlKeys;
    /**
     * Handles ENTER key press
     *
     * @param event Event Object
     * @returns {void}
     */
    private handleEnterKey;
    /**
     * Handles UP key press
     *
     * @param event Event Object
     * @returns {void}
     */
    private handleUpKey;
    /**
     * Handle DOWN key press
     *
     * @param event Event Object
     * @returns {void}
     */
    private handleDownKey;
    /**
     * Handle Backspace key press
     *
     * @param event Event Object
     * @returns {void}
     */
    private handleBackspaceKey;
    /**
     * Toggles the amPm flag or updates the time segment value.
     * Essentially a handler for user inputs on the control.
     *
     * @param amount to change value by
     * @param target Segment id
     * @returns {void}
     */
    private toggleOrModify;
    /**
     * Changes a time segment value by a specified amount.
     * Also updates parent values when rolling through cycles.
     *
     * @param amount Amount to change by
     * @param segment Segment id
     * @returns {void}
     */
    private changeValueBy;
    /**
     * Gets the hours segment of the provided value
     * as there is extra logic required for 12hr support
     *
     * @param value Unit to change to
     * @returns updated value
     */
    private getHoursSegment;
    /**
     * Updates the value of the hours element
     *
     * @returns {void}
     */
    private updateHoursSegmentValue;
    /**
     * Updated the value of the minutes element
     *
     * @returns {void}
     */
    private updateMinutesSegmentValue;
    /**
     * Updates the value of the seconds element
     *
     * @returns {void}
     */
    private updateSecondsSegmentValue;
    /**
     * Formats a given number and prefixes a 0 on numbers lower than 10
     *
     * @param n Number to format
     * @returns Formatted number
     */
    private formattedUnit;
    /**
     * Returns `true` or `false` depending on whether the hours are before, or, after noon
     *
     * @returns Result
     */
    private isAM;
    /**
     * Returns opposite of isAM
     *
     * @returns Result
     */
    private isPM;
    /**
     * Toggles the AM/PM state
     *
     * @returns {void}
     */
    toggle(): void;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @returns CSS template
     */
    static get styles(): CSSResult | CSSResult[];
    /**
     * Template for Seconds Segment
     *
     * @returns Seconds segment
     */
    private getSecondsHtml;
    /**
     * Template for AmPm Segment
     *
     * @returns Am/Pm segment
     */
    private getAmPmHtml;
    /**
     * Native input's template for mobile
     *
     * @returns input
     */
    private getNativeInputForMobile;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @returns Render template
     */
    protected render(): TemplateResult;
}
export {};
//# sourceMappingURL=index.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-time-picker': TimePicker;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-time-picker': Partial<TimePicker> | JSXInterface.ControlHTMLAttributes<TimePicker>;
    }
  }
}

export {};
