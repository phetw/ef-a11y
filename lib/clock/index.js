var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, customElement, property, BasicElement, ifDefined, WarningNotice, query, state } from '@refinitiv-ui/core';
import { MILLISECONDS_IN_SECOND, HOURS_OF_NOON, isValidTime, toTimeSegment, TimeFormat, format, padNumber } from '@refinitiv-ui/utils';
import { HOURS_IN_DAY, MINUTES_IN_HOUR, SECONDS_IN_DAY, SECONDS_IN_HOUR, SECONDS_IN_MINUTE } from './utils/timestamps';
import { register, deRegister } from './utils/TickManager';
import { VERSION } from '../';
const UP = 'Up';
const DOWN = 'Down';
/**
 * Display hours, minutes and seconds as clock interface
 * @fires value-changed - Fired when the value property changes while ticking.
 * @fires offset-changed - Fired when the the user offsets the clock in `interactive` mode.
 */
let Clock = class Clock extends BasicElement {
    constructor() {
        super(...arguments);
        /**
         * Shared internal function,
         * used for handling notifications from tick manager.
         * @returns {void}
         */
        this.onTick = () => {
            this.sessionTicks = Math.floor((performance.now() - this.tickTimestamp) / 1000);
            this.notifyPropertyChange('value', this.value);
        };
        /**
         * Base value to use when calculating current time.
         * This value is updated whenever the value property is set.
         */
        this.baseTime = 0;
        /**
         * Current amount of ticks in session.
         */
        this.sessionTicks = 0;
        /**
         * Timestamp of when the tick property was last updated.
         * Used for accurately ticking time.
         */
        this.tickTimestamp = 0;
        this._offset = 0;
        this._tick = false;
        /**
         * Display the digital clock in 12hr format.
         */
        this.amPm = false;
        /**
         * Display the seconds segment.
         */
        this.showSeconds = false;
        /**
         * Enabled interactive mode. Allowing the user to offset the value.
         */
        this.interactive = false;
        /**
        * Display clock in analogue style.
        */
        this.analogue = false;
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
     * @return {CSSResult | CSSResult[]} CSS template
     */
    static get styles() {
        return css `
      :host {
        display: inline-flex;
        position: relative;
        font-variant-numeric: tabular-nums;
      }

      [part~="hand"] {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform-origin: center center;
        pointer-events: none;
      }

      [part="hands"] {
        padding-top: 100%;
      }
    `;
    }
    /**
     * Current time in seconds
     */
    get currentTime() {
        return this.baseTime + this.sessionTicks;
    }
    /**
     * Get time value in format `hh:mm:ss`
     * @returns value
     */
    get value() {
        return format({
            hours: this.hours,
            minutes: this.minutes,
            seconds: this.seconds,
            milliseconds: 0
        }, TimeFormat.HHmmss);
    }
    /**
     * Time to display in hh:mm/h:mm:ss format.
     * @param value new time value
     * @returns {void}
     */
    set value(value) {
        if (typeof value !== 'string' || (value !== '' && !isValidTime(value))) {
            new WarningNotice(`The specified value "${value}" is not valid. The format should be hh:mm or hh:mm:ss.`).show();
            value = '';
        }
        const oldValue = this.value;
        if (oldValue !== value) {
            this.synchronise(); // Required to reset any tick session
            const { hours, minutes, seconds } = toTimeSegment(value);
            this.baseTime = hours * SECONDS_IN_HOUR + minutes * SECONDS_IN_MINUTE + seconds;
            void this.requestUpdate('value', oldValue);
        }
    }
    /**
     * Get offset value
     * @returns offset
     */
    get offset() {
        return this._offset;
    }
    /**
     * Amount to offset value in seconds.
     * @param offset new offset value
     * @returns {void}
     */
    set offset(offset) {
        // Passed value can be null | undefined | number | string
        if (offset && typeof offset !== 'number' && typeof offset !== 'string') {
            return;
        }
        const oldOffset = this.offset;
        const newOffset = Math.round(offset % SECONDS_IN_DAY) || 0;
        if (oldOffset !== newOffset) {
            this._offset = newOffset;
            void this.requestUpdate('offset', oldOffset);
        }
    }
    /**
     * Toggles clock ticking function.
     */
    get tick() {
        return this._tick;
    }
    set tick(value) {
        const newValue = !!value;
        const oldValue = this.tick;
        if (oldValue !== newValue) {
            this._tick = newValue;
            this.synchronise();
            this.configureTickManager();
            void this.requestUpdate('tick', oldValue);
        }
    }
    /**
     * Get the display time in seconds.
     * This value includes any offsets applied.
     * @returns display time
     */
    get displayTime() {
        return (SECONDS_IN_DAY + this.currentTime + this.offset) % SECONDS_IN_DAY;
    }
    /**
     * Get hours portion of value
     * @returns hours value
     */
    get hours() {
        return Math.floor(this.currentTime / SECONDS_IN_HOUR) % HOURS_IN_DAY;
    }
    /**
     * Get minutes portion of value
     * @returns minutes value
     */
    get minutes() {
        return Math.floor(this.currentTime / SECONDS_IN_MINUTE) % MINUTES_IN_HOUR;
    }
    /**
     * Get seconds portion of value
     * @returns seconds value
     */
    get seconds() {
        return this.currentTime % SECONDS_IN_MINUTE;
    }
    /**
     * Get display hours in 24hr format
     * @returns display hours
     */
    get displayHours24() {
        return Math.floor(this.displayTime / SECONDS_IN_HOUR) % HOURS_IN_DAY;
    }
    /**
     * Get display hours in 12hr format
     * @returns display hours
     */
    get displayHours12() {
        return (this.displayHours24 % HOURS_OF_NOON) || HOURS_OF_NOON;
    }
    /**
     * Get display hours
     * @returns display hours
     */
    get displayHours() {
        return this.amPm ? this.displayHours12 : this.displayHours24;
    }
    /**
     * Get display minutes
     * @returns display minutes
     */
    get displayMinutes() {
        return Math.floor(this.displayTime / SECONDS_IN_MINUTE) % MINUTES_IN_HOUR;
    }
    /**
     * Get display seconds
     * @returns display seconds
     */
    get displaySeconds() {
        return this.displayTime % SECONDS_IN_MINUTE;
    }
    /**
     * Get display AM or PM depending on time
     * @returns `AM` or `PM`
     */
    get displayAmPm() {
        return this.isAM ? 'AM' : 'PM';
    }
    /**
     * Returns `true` or `false` depending on whether the hours are before, or, after noon.
     * @returns Result
     */
    get isAM() {
        return this.displayHours24 < HOURS_OF_NOON;
    }
    /**
     * Configures the tick manager to either start or stop ticking,
     * depending on the state of the element.
     * @param [forceTick=false] forces a tick update
     * @returns {void}
     */
    configureTickManager(forceTick = false) {
        if (this.tick && this.isConnected) {
            register(this.onTick);
            forceTick && this.onTick();
        }
        else {
            deRegister(this.onTick);
        }
    }
    /**
     * Synchronises the tick session to the base value
     * and then resets the session.
     * @returns {void}
     */
    synchronise() {
        this.baseTime = this.currentTime;
        this.sessionTicks = 0;
        this.tickTimestamp = Math.floor(performance.now() / MILLISECONDS_IN_SECOND) * MILLISECONDS_IN_SECOND;
    }
    /**
     * Shift the offset by a direction and amount.
     * @param direction direction to shift
     * @param amount value to shift
     * @returns {void}
     */
    shift(direction, amount) {
        this.offset = (SECONDS_IN_DAY + this.offset + amount * (direction === UP ? 1 : -1)) % SECONDS_IN_DAY;
        this.notifyPropertyChange('offset', this.offset);
    }
    /**
     * Returns any shift amount assigned to a target.
     * @param target target of an event.
     * @returns {void}
     */
    getShiftAmountFromTarget(target) {
        if (target === this.hoursPart) {
            return SECONDS_IN_HOUR;
        }
        if (target === this.minutesPart) {
            return SECONDS_IN_MINUTE;
        }
        if (target === this.secondsPart) {
            return 1;
        }
        if (target instanceof HTMLElement && target.parentElement) {
            return this.getShiftAmountFromTarget(target.parentElement);
        }
        return 0;
    }
    /**
    * Returns `true` or `false` depends on the offset value's effect on giving segment
    *
    * @param segment segment's name
    * @returns Result
    */
    isSegmentShifted(segment) {
        switch (segment) {
            case 'hours':
                return this.hours !== this.displayHours24;
            case 'minutes':
                return this.minutes !== this.displayMinutes;
            case 'seconds':
                return this.seconds !== this.displaySeconds;
            default:
                return false;
        }
    }
    /**
     * Handles any keydown events
     * Used for control keys
     * @param event Event Object
     * @returns {void}
     */
    onKeydown(event) {
        this.manageControlKeys(event);
    }
    /**
     * Handles any tap events
     * Used for increment/decrement buttons
     * @param event Event Object
     * @returns {void}
     */
    onTapStart(event) {
        if (event.target instanceof HTMLElement && event.target.dataset.key) {
            this.shift(event.target.dataset.key, this.getShiftAmountFromTarget(event.target));
        }
    }
    /**
    * Handle valid control keys and execute their corresponding commands
    * Will stop when readonly is set
    * @param event Event Object
    * @returns {void}
    */
    manageControlKeys(event) {
        switch (event.key) {
            case 'Up': // IE
            case 'ArrowUp':
                this.handleUpKey(event);
                break;
            case 'Down': // IE
            case 'ArrowDown':
                this.handleDownKey(event);
                break;
            default:
                return;
        }
        event.preventDefault();
    }
    /**
    * Handles UP key press
    * @param event Event Object
    * @returns {void}
    */
    handleUpKey(event) {
        this.shift(UP, this.getShiftAmountFromTarget(event.target));
    }
    /**
    * Handle DOWN key press
    * @param event Event Object
    * @returns {void}
    */
    handleDownKey(event) {
        this.shift(DOWN, this.getShiftAmountFromTarget(event.target));
    }
    /**
    * Template for increment and decrement button
    * if interactive mode is enabled.
    * @returns {TemplateResult} template result
    */
    generateButtonsTemplate() {
        return html `
      <div part="increment-button" role="button" data-key="${UP}"></div>
      <div part="decrement-button" role="button" data-key="${DOWN}"></div>
    `;
    }
    /**
    * Get template of segment
    * @param name segment's name
    * @param value segment's value
    * @param shiftAmount amount to shift
    * @returns {TemplateResult} template
    */
    generateSegmentTemplate(name, value) {
        return html `
      <div part="segment ${name}${ifDefined(this.isSegmentShifted(name) ? ' shifted' : '')}" tabindex="${ifDefined(this.interactive ? '0' : undefined)}">
        ${padNumber(value, 2)}
        ${this.interactive ? this.generateButtonsTemplate() : undefined}
      </div>
    `;
    }
    /**
    * Template of divider
    * @returns {TemplateResult} template
    */
    get dividerTemplate() {
        return html `
      <div part="segment divider">:</div>
    `;
    }
    /**
    * Template of amPm segment
    * @returns {TemplateResult} template
    */
    get amPmTemplate() {
        return html `
      <div part="segment am-pm">${this.displayAmPm}</div>
    `;
    }
    /**
    * Template of hours segment
    * @returns {TemplateResult} template
    */
    get hoursSegmentTemplate() {
        return this.generateSegmentTemplate('hours', this.displayHours);
    }
    /**
    * Template of minutes segment
    * @returns {TemplateResult} template
    */
    get minutesSegmentTemplate() {
        return this.generateSegmentTemplate('minutes', this.displayMinutes);
    }
    /**
    * Template of seconds segment
    * @returns {TemplateResult} template
    */
    get secondsSegmentTemplate() {
        return this.generateSegmentTemplate('seconds', this.displaySeconds);
    }
    /**
     * Called when the element has been appended to the DOM
     * @returns {void}
     */
    connectedCallback() {
        super.connectedCallback();
        this.configureTickManager(true);
    }
    /**
     * Called when the element has been disconnected from the DOM
     * @returns {void}
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        this.configureTickManager();
    }
    /**
     * Called once after the component is first rendered
     * @param changedProperties map of changed properties with old values
     * @returns {void}
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.renderRoot.addEventListener('keydown', (event) => this.onKeydown(event));
        this.renderRoot.addEventListener('tapstart', (event) => this.onTapStart(event));
    }
    /**
    * Template for digital clock
    * @returns {TemplateResult} template
    */
    get digitalClockTemplate() {
        return html `
      ${this.hoursSegmentTemplate}
      ${this.dividerTemplate}
      ${this.minutesSegmentTemplate}
      ${this.showSeconds ? html `
      ${this.dividerTemplate}
      ${this.secondsSegmentTemplate}
      ` : undefined}
      ${this.amPm ? this.amPmTemplate : undefined}
    `;
    }
    /**
    * Template for analogue clock
    * @returns {TemplateResult} template
    */
    get analogueClockTemplate() {
        const secAngle = 6 * this.displaySeconds;
        const minAngle = this.showSeconds ? Number((6 * (this.displayMinutes + (1 / 60) * this.displaySeconds)).toFixed(2)) : 6 * this.displayMinutes;
        const hourAngle = Number((30 * (this.displayHours24 + (1 / 60) * this.displayMinutes)).toFixed(2));
        return html `
      <div part="hands">
        <div part="digital">${this.digitalClockTemplate}</div>
        <div part="hand hour" style="transform: rotate(${hourAngle}deg)"></div>
        <div part="hand minute" style="transform: rotate(${minAngle}deg)"></div>
        ${this.showSeconds ? html `<div part="hand second" style="transform: rotate(${secAngle}deg)"></div>` : undefined}
      </div>
    `;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @returns {TemplateResult} Render template
     */
    render() {
        return this.analogue ? this.analogueClockTemplate : this.digitalClockTemplate;
    }
};
__decorate([
    state()
], Clock.prototype, "currentTime", null);
__decorate([
    state()
], Clock.prototype, "baseTime", void 0);
__decorate([
    state()
], Clock.prototype, "sessionTicks", void 0);
__decorate([
    state()
], Clock.prototype, "tickTimestamp", void 0);
__decorate([
    property({ type: String })
], Clock.prototype, "value", null);
__decorate([
    property({ type: Number })
], Clock.prototype, "offset", null);
__decorate([
    property({ type: Boolean })
], Clock.prototype, "tick", null);
__decorate([
    property({ type: Boolean, attribute: 'am-pm' })
], Clock.prototype, "amPm", void 0);
__decorate([
    property({ type: Boolean, attribute: 'show-seconds' })
], Clock.prototype, "showSeconds", void 0);
__decorate([
    property({ type: Boolean })
], Clock.prototype, "interactive", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Clock.prototype, "analogue", void 0);
__decorate([
    query('[part~=hours]', true)
], Clock.prototype, "hoursPart", void 0);
__decorate([
    query('[part~=minutes]', true)
], Clock.prototype, "minutesPart", void 0);
__decorate([
    query('[part~=seconds]', true)
], Clock.prototype, "secondsPart", void 0);
Clock = __decorate([
    customElement('ef-clock', {
        alias: 'sapphire-clock'
    })
], Clock);
export { Clock };
//# sourceMappingURL=index.js.map