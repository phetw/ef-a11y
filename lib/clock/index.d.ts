import { JSXInterface } from '../jsx';
import { TemplateResult, CSSResult, PropertyValues, BasicElement } from '@refinitiv-ui/core';
/**
 * Display hours, minutes and seconds as clock interface
 * @fires value-changed - Fired when the value property changes while ticking.
 * @fires offset-changed - Fired when the the user offsets the clock in `interactive` mode.
 */
export declare class Clock extends BasicElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return {CSSResult | CSSResult[]} CSS template
     */
    static get styles(): CSSResult | CSSResult[];
    /**
     * Shared internal function,
     * used for handling notifications from tick manager.
     * @returns {void}
     */
    private onTick;
    /**
     * Current time in seconds
     */
    private get currentTime();
    /**
     * Base value to use when calculating current time.
     * This value is updated whenever the value property is set.
     */
    private baseTime;
    /**
     * Current amount of ticks in session.
     */
    private sessionTicks;
    /**
     * Timestamp of when the tick property was last updated.
     * Used for accurately ticking time.
     */
    private tickTimestamp;
    /**
     * Get time value in format `hh:mm:ss`
     * @returns value
     */
    get value(): string;
    /**
     * Time to display in hh:mm/h:mm:ss format.
     * @param value new time value
     * @returns {void}
     */
    set value(value: string);
    private _offset;
    /**
     * Get offset value
     * @returns offset
     */
    get offset(): number;
    /**
     * Amount to offset value in seconds.
     * @param offset new offset value
     * @returns {void}
     */
    set offset(offset: number);
    private _tick;
    /**
     * Toggles clock ticking function.
     */
    get tick(): boolean;
    set tick(value: boolean);
    /**
     * Display the digital clock in 12hr format.
     */
    amPm: boolean;
    /**
     * Display the seconds segment.
     */
    showSeconds: boolean;
    /**
     * Enabled interactive mode. Allowing the user to offset the value.
     */
    interactive: boolean;
    /**
    * Display clock in analogue style.
    */
    analogue: boolean;
    /**
     * Getter for hours part.
     */
    private hoursPart;
    /**
    * Getter for minutes part.
    */
    private minutesPart;
    /**
    * Getter for seconds part.
    */
    private secondsPart;
    /**
     * Get the display time in seconds.
     * This value includes any offsets applied.
     * @returns display time
     */
    private get displayTime();
    /**
     * Get hours portion of value
     * @returns hours value
     */
    private get hours();
    /**
     * Get minutes portion of value
     * @returns minutes value
     */
    private get minutes();
    /**
     * Get seconds portion of value
     * @returns seconds value
     */
    private get seconds();
    /**
     * Get display hours in 24hr format
     * @returns display hours
     */
    private get displayHours24();
    /**
     * Get display hours in 12hr format
     * @returns display hours
     */
    private get displayHours12();
    /**
     * Get display hours
     * @returns display hours
     */
    private get displayHours();
    /**
     * Get display minutes
     * @returns display minutes
     */
    private get displayMinutes();
    /**
     * Get display seconds
     * @returns display seconds
     */
    private get displaySeconds();
    /**
     * Get display AM or PM depending on time
     * @returns `AM` or `PM`
     */
    private get displayAmPm();
    /**
     * Returns `true` or `false` depending on whether the hours are before, or, after noon.
     * @returns Result
     */
    private get isAM();
    /**
     * Configures the tick manager to either start or stop ticking,
     * depending on the state of the element.
     * @param [forceTick=false] forces a tick update
     * @returns {void}
     */
    private configureTickManager;
    /**
     * Synchronises the tick session to the base value
     * and then resets the session.
     * @returns {void}
     */
    private synchronise;
    /**
     * Shift the offset by a direction and amount.
     * @param direction direction to shift
     * @param amount value to shift
     * @returns {void}
     */
    private shift;
    /**
     * Returns any shift amount assigned to a target.
     * @param target target of an event.
     * @returns {void}
     */
    private getShiftAmountFromTarget;
    /**
    * Returns `true` or `false` depends on the offset value's effect on giving segment
    *
    * @param segment segment's name
    * @returns Result
    */
    private isSegmentShifted;
    /**
     * Handles any keydown events
     * Used for control keys
     * @param event Event Object
     * @returns {void}
     */
    private onKeydown;
    /**
     * Handles any tap events
     * Used for increment/decrement buttons
     * @param event Event Object
     * @returns {void}
     */
    private onTapStart;
    /**
    * Handle valid control keys and execute their corresponding commands
    * Will stop when readonly is set
    * @param event Event Object
    * @returns {void}
    */
    private manageControlKeys;
    /**
    * Handles UP key press
    * @param event Event Object
    * @returns {void}
    */
    private handleUpKey;
    /**
    * Handle DOWN key press
    * @param event Event Object
    * @returns {void}
    */
    private handleDownKey;
    /**
    * Template for increment and decrement button
    * if interactive mode is enabled.
    * @returns {TemplateResult} template result
    */
    private generateButtonsTemplate;
    /**
    * Get template of segment
    * @param name segment's name
    * @param value segment's value
    * @param shiftAmount amount to shift
    * @returns {TemplateResult} template
    */
    private generateSegmentTemplate;
    /**
    * Template of divider
    * @returns {TemplateResult} template
    */
    private get dividerTemplate();
    /**
    * Template of amPm segment
    * @returns {TemplateResult} template
    */
    private get amPmTemplate();
    /**
    * Template of hours segment
    * @returns {TemplateResult} template
    */
    private get hoursSegmentTemplate();
    /**
    * Template of minutes segment
    * @returns {TemplateResult} template
    */
    private get minutesSegmentTemplate();
    /**
    * Template of seconds segment
    * @returns {TemplateResult} template
    */
    private get secondsSegmentTemplate();
    /**
     * Called when the element has been appended to the DOM
     * @returns {void}
     */
    connectedCallback(): void;
    /**
     * Called when the element has been disconnected from the DOM
     * @returns {void}
     */
    disconnectedCallback(): void;
    /**
     * Called once after the component is first rendered
     * @param changedProperties map of changed properties with old values
     * @returns {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
    * Template for digital clock
    * @returns {TemplateResult} template
    */
    protected get digitalClockTemplate(): TemplateResult;
    /**
    * Template for analogue clock
    * @returns {TemplateResult} template
    */
    protected get analogueClockTemplate(): TemplateResult;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @returns {TemplateResult} Render template
     */
    protected render(): TemplateResult;
}
//# sourceMappingURL=index.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-clock': Clock;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-clock': Partial<Clock> | JSXInterface.HTMLAttributes<Clock>;
    }
  }
}

export {};
