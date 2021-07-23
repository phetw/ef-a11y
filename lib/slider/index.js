var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, ControlElement, customElement, property, styleMap, query } from '@refinitiv-ui/core';
import { VERSION } from '../';
import '../number-field';
var SliderNameType;
(function (SliderNameType) {
    SliderNameType["value"] = "value";
    SliderNameType["from"] = "from";
    SliderNameType["to"] = "to";
})(SliderNameType || (SliderNameType = {}));
var PreviousSliderNameType;
(function (PreviousSliderNameType) {
    PreviousSliderNameType["value"] = "valuePrevious";
    PreviousSliderNameType["from"] = "fromPrevious";
    PreviousSliderNameType["to"] = "toPrevious";
})(PreviousSliderNameType || (PreviousSliderNameType = {}));
var NumberFieldNameType;
(function (NumberFieldNameType) {
    NumberFieldNameType["fromInput"] = "fromInput";
    NumberFieldNameType["toInput"] = "toInput";
})(NumberFieldNameType || (NumberFieldNameType = {}));
/**
  * Set prevent default action and stop bubbles event
  * @private
  * @param event event mouse or touch
  * @returns {void}
  */
const preventDefault = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return event;
};
/**
   * Return value that never exceed the maximum boundary
   * @private
   * @param value value for check clamp
   * @param min max value
   * @param max min value
   * @returns number between two numbers
   */
const clamp = function (value, min, max) {
    return Math.max(min, Math.min(value, max)).toString();
};
/**
 * Allows users to make selections from a range of values
 *
 * @attr {string} value - Value of slider. Not applicable in range mode.
 * @prop {string} [value=0] - Value of slider. Not applicable in range mode.
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @fires value-changed - Fired when the `value` changes.
 * @fires from-changed - Fired when the `from` changes.
 * @fires to-changed - Fired when the `to` changes.
 */
let Slider = class Slider extends ControlElement {
    constructor() {
        super(...arguments);
        this.dragging = false;
        this.stepUse = 1;
        this.decimalPlaces = 0;
        this.dragElements = [];
        this.isEventReady = false;
        this.valuePrevious = '';
        this.fromPrevious = '';
        this.toPrevious = '';
        /**
         * Specified size of increment or decrement jump between value.
         */
        this.step = '1';
        /**
         * Set minimum value of slider.
         */
        this.min = '0';
        /**
         * Slider maximum value of slider.
         */
        this.max = '100';
        /**
         * Uses with `range`. Low value of slider in range mode.
         */
        this.from = '0';
        /**
         * Uses with `range`. High value of slider in range mode
         */
        this.to = '100';
        /**
         * Set slider appearances to show pin mode.
         * @ignore
         * NOTE: Pin isn't applicable in Halo. Hide this from document
         */
        this.pin = false;
        /**
         * Set slider to range mode. Instead of a single value, slider will provide `from` and `to`.
         */
        this.range = false;
        /**
         * Show steps marker on slider.
         */
        this.showSteps = false;
        /**
         * Show input number field.
         */
        this.showInputField = null;
        /**
         * Uses with `range`. Set minimum allowance value (distance) between `from` and `to`.
         */
        this.minRange = '0';
        /**
         * Input number event blur and notify property
         * @param event event blur input number field
         * @returns {void}
         */
        this.onBlur = (event) => {
            if (this.readonly) {
                return;
            }
            const { value, name } = event.target;
            const currentData = name;
            const perviousData = `${name}Previous`;
            if (value && this[currentData] !== value) {
                this.updateNotifyProperty(currentData, value);
                this[perviousData] = value;
            }
            event.preventDefault();
        };
        /**
         * Input number event keydown y
         * @param event event keydown
         * @returns {void}
         */
        this.onKeydown = (event) => {
            if (this.readonly || this.disabled) {
                return;
            }
            this.handleEnterKey(event);
        };
        /**
         * Start dragging event on slider
         * @param event event dragstart
         * @returns {void}
         */
        this.onDragStart = (event) => {
            this.dragging = true;
            this.classList.add('grabbable');
            if (this.range) {
                const pct = this.getMousePosition(event);
                const mousePos = ((this.maxNumber - this.minNumber) * pct) + this.minNumber;
                const distFrom = Math.abs(mousePos - this.fromNumber);
                const distTo = Math.abs(mousePos - this.toNumber);
                if (distFrom < distTo) {
                    this.activeThumb = this.dragElements[0];
                }
                else if (distFrom > distTo) {
                    this.activeThumb = this.dragElements[1];
                }
                this.dragElements.forEach((el) => {
                    el.style.zIndex = '5';
                });
                this.activeThumb.style.zIndex = '10';
                // Set focus to input when drag.
                if (this.isShowInputField) {
                    this.toggleFocusField(this.activeThumb.getAttribute('name') || '', true);
                }
            }
            else {
                this.activeThumb = this.dragElements[0];
            }
            this.onDrag(event);
            if (event.changedTouches) {
                this.addEventListener('touchmove', this.onDrag);
                this.addEventListener('touchend', this.onDragEnd);
            }
            else {
                window.addEventListener('mousemove', this.onDrag);
                window.addEventListener('mouseup', this.onDragEnd);
            }
        };
        /**
         * Dragging after on dragging start event
         * @param event event mousemove and touchmove
         * @returns {void}
         */
        this.onDrag = (event) => {
            if (this.minNumber !== this.maxNumber) {
                const thumbPos = this.getMousePosition(event);
                const closestStep = this.calculateStep(thumbPos);
                // Can be dragged slider when the value is valid
                if (closestStep <= 1) {
                    const thumbLeft = this.stepUse !== 0 ? closestStep : thumbPos;
                    const calStepValue = this.calculateValue(thumbLeft);
                    const prettyVal = Number(this.displayValue(calStepValue));
                    if (this.range) {
                        if (this.activeThumb === this.dragElements[1]) {
                            this.to = this.validateTo(prettyVal).toString();
                        }
                        else {
                            this.from = this.validateFrom(prettyVal).toString();
                        }
                    }
                    else {
                        this.value = prettyVal.toString();
                    }
                }
            }
        };
        /**
         * End dragging event and remove dragging event
         * @param e event mouseup and touchmove
         * @returns {void}
         */
        this.onDragEnd = (e) => {
            if (this.dragging) {
                this.dragging = false;
                const event = e;
                if (event.changedTouches) {
                    this.removeEventListener('touchmove', this.onDrag);
                    this.removeEventListener('touchend', this.onDragEnd);
                }
                else {
                    window.removeEventListener('mousemove', this.onDrag);
                    window.removeEventListener('mouseup', this.onDragEnd);
                }
                this.classList.remove('grabbable');
                if (this.classList.length === 0) {
                    this.removeAttribute('class');
                }
                if (!event.changedTouches) {
                    event.preventDefault();
                }
                this.dispatchDataChangedEvent();
                // Reset tab index of input that's drag.
                if (this.isShowInputField) {
                    this.toggleFocusField(this.activeThumb.getAttribute('name') || '', false);
                }
            }
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
     * Converts value from string to number for calculations
     * @returns value of input as a number
     */
    get valueNumber() {
        const value = parseFloat(this.value);
        if (!this.value || isNaN(value)) {
            return 0;
        }
        return value;
    }
    /**
     * Converts min value from string to number for calculations
     * @returns minimum value of slider as a number
     */
    get minNumber() {
        const min = parseFloat(this.min);
        if (!this.min || isNaN(min)) {
            return 0;
        }
        return min;
    }
    /**
     * Converts max value from string to number for calculations
     * @returns maximum value of slider as a number
     */
    get maxNumber() {
        const max = parseFloat(this.max);
        if (!this.max || isNaN(max)) {
            return 100;
        }
        return max;
    }
    /**
     * Converts step value from string to number for calculations
     * @returns step value of slider as a number
     */
    get stepNumber() {
        const step = parseFloat(this.step);
        if (!this.step || isNaN(step)) {
            return 1;
        }
        return step;
    }
    /**
     * Converts from value from string to number for calculations
     * @returns from value of slider as a number
     */
    get fromNumber() {
        const from = parseFloat(this.from);
        if (!this.from || isNaN(from)) {
            return this.minNumber;
        }
        return from;
    }
    /**
     * Converts to value from string to number for calculations
     * @returns to value of slider as a number
     */
    get toNumber() {
        const to = parseFloat(this.to);
        if (!this.to || isNaN(to)) {
            return this.maxNumber;
        }
        return to;
    }
    /**
     * Converts min-range from string to number for calculations
     * @returns min-range of input as a number
     */
    get minRangeNumber() {
        const minRange = parseFloat(this.minRange);
        if (!this.minRange || isNaN(minRange)) {
            return 0;
        }
        return minRange;
    }
    /**
     * Return hide/show input field state
     * @returns {boolean} true if showInputField value is exist
     */
    get isShowInputField() {
        return this.showInputField !== null && this.showInputField !== undefined;
    }
    /**
     * On first updated lifecycle
     * @param changedProperties changed properties
     * @returns {void}
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        // initialize slider
        void this.updateComplete.then(() => {
            this.initializeProperty();
            this.initSlider();
            this.updateEventListeners();
        });
    }
    /**
     * On Update lifecycle
     * @param changedProperties changed properties
     * @returns {void}
     */
    update(changedProperties) {
        super.update(changedProperties);
        if (changedProperties.has('disabled') || changedProperties.has('readonly')) {
            this.updateEventListeners();
        }
    }
    /**
     * @param changedProperties changed properties
     * @returns {void}
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        changedProperties.forEach((oldValue, propName) => {
            if (propName === 'value') {
                this.onValueChange();
            }
            else if (propName === 'min') {
                this.onMinChange(oldValue);
            }
            else if (propName === 'max') {
                this.onMaxChange(oldValue);
            }
            else if (propName === 'from' && this.range) {
                this.onValueChangeFrom();
            }
            else if (propName === 'to' && this.range) {
                this.onValueChangeTo();
            }
            else if (propName === 'step') {
                this.onStepChange();
            }
            else if (propName === 'minRange') {
                this.onMinRangeChange();
            }
            else if (propName === 'range') {
                this.initializeProperty();
                this.initSlider();
            }
        });
    }
    /**
     * Initialise class properties
     * @returns {void}
     */
    initializeProperty() {
        this.stepUse = this.calculateStepRange(this.stepNumber);
        if (this.minNumber !== this.maxNumber) {
            // init decimal places
            this.updateDecimalPlaces();
            if (this.range) {
                this.activeThumb = this.dragElements[1];
                if (this.minRangeNumber) {
                    const distanceFromTo = Math.abs(this.toNumber - this.fromNumber);
                    const clampValueFrom = this.toNumber - this.minRangeNumber;
                    if (this.minRangeNumber > distanceFromTo) {
                        if (clampValueFrom < this.minNumber) {
                            this.to = (this.fromNumber + this.minRangeNumber).toString();
                        }
                        else {
                            this.from = clampValueFrom.toString();
                        }
                    }
                }
                else {
                    this.from = clamp((this.fromNumber || this.minNumber), this.minNumber, this.toNumber);
                    this.to = clamp((this.toNumber || this.maxNumber), this.fromNumber, this.maxNumber);
                }
            }
            else {
                this.value = clamp(this.valueNumber, this.minNumber, this.maxNumber);
            }
        }
        else if (this.range) {
            this.from = this.min;
            this.to = this.max;
        }
        else {
            this.value = this.min;
        }
        // initial old value
        this.valuePrevious = this.value;
        this.toPrevious = this.to;
        this.fromPrevious = this.from;
    }
    /**
     * Initialise slider properties
     * @returns {void}
     */
    initSlider() {
        var _a;
        this.dragElements = [];
        if (this.range) {
            (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('#thumbContainer').forEach((item) => {
                this.dragElements.push(item);
            });
        }
        else {
            this.dragElements = [
                this.thumbContainer
            ];
        }
        this.activeThumb = this.dragElements[0];
        this.dragElements.concat(this).forEach((el) => {
            el.addEventListener('drag', preventDefault);
            el.addEventListener('dragstart', preventDefault);
            el.addEventListener('dragend', preventDefault);
        });
        this.isEventReady = true;
    }
    /**
     * Calculate step in range
     * @param step value step for calculate
     * @returns step value that should be inside the min / max boundary
     */
    calculateStepRange(step) {
        const newStep = Math.abs(step);
        if (newStep > this.maxNumber - this.minNumber && !this.isDecimalNumber(newStep)) {
            // new step shouldn't be larger than slider
            return Math.abs(this.maxNumber - this.minNumber);
        }
        return newStep;
    }
    /**
     * Check if step or min number is decimal
     * If yes, set number of decimal places
     * @returns {void}
     */
    updateDecimalPlaces() {
        // Set decimal places when step or min have decimal
        if (this.isDecimalNumber(this.stepUse) || this.isDecimalNumber(this.minNumber)) {
            const stepUseDecimal = this.countDecimals(this.stepUse);
            const minDecimal = this.countDecimals(this.minNumber);
            this.decimalPlaces = stepUseDecimal > minDecimal ? stepUseDecimal : minDecimal;
        }
        else {
            this.decimalPlaces = 0;
        }
    }
    /**
     * Count decimal number
     * @param value value for checking
     * @returns number of decimal points
     */
    countDecimals(value) {
        var _a;
        return ((_a = Number(value).toString().split('.')[1]) === null || _a === void 0 ? void 0 : _a.length) | 0;
    }
    /**
     * Check if decimal number e.g. 10.5, etc
     * @param value value for checking
     * @returns true if value is decimal
     */
    isDecimalNumber(value) {
        return value % 1 !== 0;
    }
    /**
     * Calculate percentage by value
     * @param value value to be calculated
     * @returns percentage
     */
    calculatePercentage(value) {
        const valuePercent = Math.abs((((value || 0) - this.minNumber) / (this.maxNumber - this.minNumber)) * 100);
        if (valuePercent > 100) {
            return 100;
        }
        else if (valuePercent < 0) {
            return 0;
        }
        else {
            return valuePercent;
        }
    }
    /**
     * Add and remove event listener when have disable and readonly properties
     * @returns {void}
     */
    updateEventListeners() {
        if (this.isEventReady) {
            if (this.disabled || this.readonly) {
                this.slider.removeEventListener('mousedown', this.onDragStart);
                this.slider.removeEventListener('touchstart', this.onDragStart);
            }
            else {
                this.slider.addEventListener('mousedown', this.onDragStart, { passive: true });
                this.slider.addEventListener('touchstart', this.onDragStart, { passive: true });
            }
        }
    }
    /**
     * Handles key press keyboard events
     *
     * @param event Event Object
     * @returns {void}
     */
    handleEnterKey(event) {
        if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
            event.target.blur();
        }
    }
    /**
     * Update notify property by input name attribute
     * @param name name input attribute
     * @param value input value
     * @returns {void}
     */
    updateNotifyProperty(name, value) {
        let isUpdateValue = false;
        const valueSanitize = Number(this.sanitizeNumber(Number(value), 0));
        if (name === 'to') {
            isUpdateValue = this.isValueInBoundary(valueSanitize, 'to');
        }
        else {
            isUpdateValue = this.isValueInBoundary(valueSanitize, '');
        }
        if (isUpdateValue) {
            (this[name]) = value;
            this.notifyPropertyChange(name, value);
        }
        else {
            const nameInput = `${name}Input`;
            this[nameInput].value = this[name];
        }
    }
    /**
     * Dispatch data {value, from, to} changed event
     * @returns {void}
     */
    dispatchDataChangedEvent() {
        const name = this.activeThumb.getAttribute('name') || '';
        const currentData = name;
        const previousData = `${name}Previous`;
        // Dispatch event only when value or from or to changed
        if (this[previousData] !== this[currentData]) {
            this.notifyPropertyChange(name, this[currentData]);
            this[previousData] = this[currentData];
        }
    }
    /**
     * Set focus to input from state
     * @param {String} name number field's name
     * @param {Boolean} focusState state of focus
     * @returns {void}
     */
    toggleFocusField(name, focusState) {
        if (name) {
            this[`${name}Input`].setAttribute('tabindex', `${focusState ? 1 : 0}`);
        }
    }
    /**
     * @param event event mousemove and touchmove
     * @returns mouse position by percentage
     */
    getMousePosition(event) {
        const sliderRect = this.trackWrapper.getBoundingClientRect();
        // check drag desktop or mobile
        const pageX = event.changedTouches ? event.changedTouches[0].pageX : event.pageX;
        const positionSize = pageX - sliderRect.left;
        if (positionSize <= sliderRect.width) {
            return Math.min(Math.max((pageX - sliderRect.left) / sliderRect.width, 0), 1);
        }
        else {
            return 1;
        }
    }
    /**
     * Handle 'from' value on drag out of boundary.
     * @param value value from change
     * @returns validated from value.
     */
    validateFrom(value) {
        const valueFrom = value + this.minRangeNumber;
        if (valueFrom < this.toNumber && valueFrom >= this.minNumber) {
            return value;
        }
        else {
            return this.toNumber - this.minRangeNumber;
        }
    }
    /**
     * Handle 'To' value on drag out of boundary.
     * @param value value to change
     * @returns validated to value.
     */
    validateTo(value) {
        const valueTo = value - this.minRangeNumber;
        if (valueTo > this.fromNumber && valueTo <= this.maxNumber) {
            return value;
        }
        else {
            return this.fromNumber + this.minRangeNumber;
        }
    }
    /**
     * Calculate the nearest interval
     * @param thumbPosition thumb position dragging on slider
     * @returns position step on slider
     */
    calculateStep(thumbPosition) {
        const stepSize = this.calculatePercentage(this.minNumber + this.stepUse) / 100;
        // calculate step to current point to next point
        const posToFixStep = Math.round(thumbPosition / stepSize) * stepSize;
        if (thumbPosition <= posToFixStep + (stepSize / 2)) {
            if (posToFixStep <= 1) {
                return posToFixStep;
            }
            else {
                return posToFixStep - stepSize;
            }
        }
        else {
            return posToFixStep + stepSize;
        }
    }
    /**
     * Calculate value by percentage
     * @param percentage percentage to be calculated
     * @returns calculated value
     */
    calculateValue(percentage) {
        const value = this.minNumber + percentage * (this.maxNumber - this.minNumber);
        // if value is outside boundary, set to boundary
        if (value >= this.maxNumber) {
            return this.maxNumber;
        }
        else if (value <= this.minNumber) {
            return this.minNumber;
        }
        else {
            return value;
        }
    }
    /**
     * Format value to display in both integer and fraction cases
     * @param value value before use display
     * @returns formatted value
     */
    displayValue(value) {
        if (this.isDecimalNumber(value)) {
            const valueDecimalCount = this.countDecimals(value);
            // return value decimal by a boundary of max decimal
            if (valueDecimalCount > this.decimalPlaces) {
                return value.toFixed(this.decimalPlaces);
            }
            else {
                return value.toString();
            }
        }
        else {
            return value.toString();
        }
    }
    /**
     * Value observer
     * @returns {void}
     */
    onValueChange() {
        if (this.readonly) {
            const valuePercent = this.calculatePercentage(Number(this.value)) / 100;
            const closestStep = this.calculateStep(valuePercent);
            const thumbLeft = this.stepUse !== 0 ? closestStep : valuePercent;
            const calStepValue = this.calculateValue(thumbLeft);
            this.value = this.displayValue(calStepValue);
        }
        else {
            const valueSanitize = Number(this.sanitizeNumber(Number(this.value), 0));
            if (this.isValueInBoundary(valueSanitize, '')) {
                this.value = this.displayValue(valueSanitize);
            }
            else {
                // if value is outside boundary, set to boundary
                if (valueSanitize < this.minNumber) {
                    this.value = this.min;
                }
                if (valueSanitize > this.maxNumber) {
                    this.value = this.max;
                }
            }
        }
    }
    /**
     * From value observer
     * @returns {void}
     */
    onValueChangeFrom() {
        const valueFrom = Number(this.sanitizeNumber(this.fromNumber, 0));
        if (this.isValueInBoundary(valueFrom, 'from')) {
            this.from = this.displayValue(this.fromNumber);
        }
        else {
            // if value is outside boundary, set to boundary
            if (valueFrom < this.minNumber) {
                this.from = this.min;
            }
            if (valueFrom > this.toNumber) {
                this.from = this.to;
            }
            if (this.minRangeNumber) {
                const distanceFromTo = Math.abs(this.toNumber - this.fromNumber);
                const distanceMin = this.toNumber - this.minRangeNumber;
                if (this.minRangeNumber > distanceFromTo && distanceMin > this.minNumber) {
                    this.from = distanceMin.toString();
                }
            }
        }
    }
    /**
     * Return fallback number of the value is invalid
     * @param value value for checking
     * @param fallbackValue fallback value when value is not number;
     * @returns sanitized number
     */
    sanitizeNumber(value, fallbackValue) {
        let val;
        if (this.isNumberValue(value) && typeof value === 'number') {
            val = value.toString();
        }
        else {
            val = fallbackValue;
        }
        return val.toString();
    }
    /**
     * Check if value is number
     * @param value value for checking
     * @returns true if value is numeric
     */
    isNumberValue(value) {
        return !isNaN(value) && !isNaN(Number(value));
    }
    /**
     * Check if value is inside min / max boundary
     * @param value value is checking
     * @param valueFor notation variable binding if range === true
     * @returns true if value and step inside a boundary
     */
    isValueInBoundary(value, valueFor) {
        if (this.minNumber < this.maxNumber) {
            // Check if value is in range
            if (this.range) {
                if (valueFor === 'to') {
                    if (value < (this.fromNumber + this.minRangeNumber) || value > this.maxNumber) {
                        return false;
                    }
                }
                else if (value < this.minNumber || value > (this.toNumber - this.minRangeNumber)) {
                    return false;
                }
            }
            else if (value < this.minNumber || value > this.maxNumber) {
                return false;
            }
            // check step min and max in range
            if (this.stepUse < this.minNumber || this.stepUse > this.maxNumber) {
                return true;
            }
        }
        return true;
    }
    /**
     * To value observer
     * @returns {void}
     */
    onValueChangeTo() {
        const valueTo = Number(this.sanitizeNumber(this.toNumber, 0));
        if (this.isValueInBoundary(valueTo, 'to')) {
            this.to = this.displayValue(valueTo);
        }
        else {
            // if value is outside boundary, set to boundary
            if (valueTo < this.fromNumber) {
                this.to = this.from;
            }
            if (valueTo > this.maxNumber) {
                this.to = this.max;
            }
            if (this.minRangeNumber) {
                const distanceFromTo = Math.abs(this.toNumber - this.fromNumber);
                const distanceMax = this.fromNumber + this.minRangeNumber;
                if (this.minRangeNumber > distanceFromTo && distanceMax < this.maxNumber) {
                    this.to = distanceMax.toString();
                }
            }
        }
    }
    /**
     * Step observer
     * @returns {void}
     */
    onStepChange() {
        this.step = this.sanitizeNumber(this.stepNumber, 1);
        this.stepUse = this.calculateStepRange(this.stepNumber);
        // Set decimal places value when step is decimal
        this.updateDecimalPlaces();
    }
    /**
     * Min range observer
     * @returns {void}
     */
    onMinRangeChange() {
        const valueMinRange = Math.abs(Number(this.sanitizeNumber(this.minRangeNumber, 0)));
        const maximumRangeMinMax = Math.abs(this.maxNumber - this.minNumber);
        const maximumRangeFromTo = Math.abs(this.toNumber - this.fromNumber);
        if (valueMinRange && valueMinRange >= this.stepNumber) {
            if (valueMinRange <= maximumRangeMinMax && valueMinRange <= maximumRangeFromTo) {
                this.minRange = valueMinRange.toString();
            }
            else {
                this.minRange = maximumRangeMinMax.toString();
                this.from = this.min;
                this.to = this.max;
            }
        }
        else {
            // Reset min-range when min-range less step
            this.minRange = '0';
        }
    }
    /**
     * Min observer
     * @param oldValue old value of min property
     * @returns {void}
     */
    onMinChange(oldValue) {
        this.min = this.sanitizeNumber(this.minNumber, 0);
        // Set decimal places value when min is decimal
        this.updateDecimalPlaces();
        if (this.minNumber > this.maxNumber) {
            this.min = this.max;
        }
        else if (this.range) {
            if (this.minNumber <= this.toNumber - this.minRangeNumber) {
                this.from = clamp(this.fromNumber, this.minNumber, this.toNumber);
            }
            else if (oldValue) {
                this.min = oldValue;
            }
        }
        else {
            this.value = clamp(this.valueNumber, this.minNumber, this.maxNumber);
        }
    }
    /**
     * Max observer
     * @param oldValue old value of max property
     * @returns {void}
     */
    onMaxChange(oldValue) {
        this.max = this.sanitizeNumber(this.maxNumber, 100);
        if (this.maxNumber < this.minNumber) {
            this.max = this.min;
        }
        else if (this.range) {
            if (this.maxNumber >= this.fromNumber + this.minRangeNumber) {
                this.to = clamp(this.toNumber, this.fromNumber, this.maxNumber);
            }
            else if (oldValue) {
                this.max = oldValue;
            }
        }
        else {
            this.value = clamp(this.valueNumber, this.minNumber, this.maxNumber);
        }
    }
    /**
     * Implement `render` Track template.
     * @param range show range slider
     * @returns Track template
     */
    renderTrackWrapper(range) {
        const stepContainerSize = this.calculatePercentage(this.minNumber + this.stepNumber);
        const translateX = (stepContainerSize / 2);
        const stepsStyle = { transform: `translateX(${translateX}%)`, backgroundSize: `${stepContainerSize}% 100%` };
        const stepContainerStyle = { transform: `translateX(-${translateX}%)` };
        const trackFillStyle = range
            ? { width: `${this.calculatePercentage(this.toNumber) - this.calculatePercentage(this.fromNumber)}%`, left: `${this.calculatePercentage(this.fromNumber)}%` }
            : { width: `${this.calculatePercentage(Number(this.value))}%` };
        return html `
    <div part="track-wrapper" id="trackWrapper">
      <div part="track-fill" id="trackFill" style=${styleMap(trackFillStyle)}></div>
      <div part="step-container" id="stepContainer" style=${styleMap(stepContainerStyle)}>
        <div part="step" id="steps" style=${styleMap(stepsStyle)}></div>
      </div>
    </div>
    `;
    }
    /**
     * Implement `render` Thumb template.
     * @param value thumb value in track
     * @param percentageValue thumb position in track
     * @param name name of active thumb
     * @returns Track template
     */
    renderThumb(value, percentageValue, name) {
        const thumbStyle = { left: `${percentageValue}%` };
        return html `
    <div part="thumb-container" name=${name} id="thumbContainer" style=${styleMap(thumbStyle)}>
      <div part="pin">
        <span id="pinMarker" part="pin-value-marker">${value}</span></div>
      <div part="thumb" draggable="true" id="thumb"></div>
    </div>
    `;
    }
    /**
     * Implement `render` Thumb has range template.
     * @param from thumb value start in track
     * @param to thumb value end in track
     * @returns Thumb has range template
     */
    renderThumbRange(from, to) {
        const fromPercentageValue = this.calculatePercentage(from);
        const toPercentageValue = this.calculatePercentage(to);
        return html `
      ${this.renderThumb(from, fromPercentageValue, 'from')}
      ${this.renderThumb(to, toPercentageValue, 'to')}
    `;
    }
    /**
     * Implement `render` number field has template.
     * @param value value in the slider for binding in the input value
     * @param name name input value
     * @returns {TemplateResult}  number field template
     */
    renderNumberField(value, name) {
        return html `
        <ef-number-field
          @blur=${this.onBlur}
          @keydown=${this.onKeydown}
          part="input"
          name="${name}"
          no-spinner
          .value="${value}"
          min="${this.min}"
          max="${this.max}"
          step="${this.step}"
          ?disabled="${this.disabled}"
          ?readonly="${this.readonly || this.showInputField === 'readonly'}"
        ></ef-number-field>
    `;
    }
    /**
     * Define styles in a tagged template literal, using the css tag function.
     * @returns CSS template
     */
    static get styles() {
        return css `
      :host {
        display: flex;
      }
      [part=slider-wrapper] {
        position: relative;
        width: 100%;
      }
      [part=slider] {
        width: 100%;
        height: 100%;
        display: inline-block;
      }
      :host(:not([disabled]):focus){
        outline:none;
      }
      :host([show-steps]) [part=track-wrapper]::after {
        display:block;
        position: absolute;
        content: "";
        right: 0;
      }
      [part=track-wrapper]{
        content: "";
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;
        pointer-events: none;
      }
      [part=thumb-container]{
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 5;
      }
      [part=thumb]{
        position: absolute;
        margin: 0 auto;
      }
      [part=pin]{
        display: flex;
        position: absolute;
        align-items: center;
        justify-content: center;
        z-index: 1;
      }
      :host([show-steps]) [part=step-container]{
        position: absolute;
        left: 0;
        width: 100%;
      }
      :host([show-steps]) [part=step]{
        width: 100%;
        position: absolute;
        left: 0;
      }
      [part=track-fill]{
        z-index: 2;
        content: "";
        position: absolute;
        left: 0;
      }
      :host([show-steps][step="0"]) [part=track-wrapper]::after{
        width: 0;
      }
    `;
    }
    /**
     * Implement `render` slider template.
     * @returns Slider template
     */
    render() {
        return html `
      ${this.range && this.isShowInputField ? this.renderNumberField(this.from, 'from') : null}
      <div part="slider-wrapper">
        <div part="slider">
          ${this.renderTrackWrapper(this.range)}
          ${this.range ? this.renderThumbRange(this.fromNumber, this.toNumber) : this.renderThumb(this.valueNumber, this.calculatePercentage(Number(this.value)), 'value')}
        </div>
      </div>
      ${this.range && this.isShowInputField ? this.renderNumberField(this.to, 'to') : null}
      ${!this.range && this.isShowInputField ? this.renderNumberField(this.value, 'value') : null}
    `;
    }
};
__decorate([
    property({ type: String })
], Slider.prototype, "step", void 0);
__decorate([
    property({ type: String })
], Slider.prototype, "min", void 0);
__decorate([
    property({ type: String })
], Slider.prototype, "max", void 0);
__decorate([
    property({ type: String })
], Slider.prototype, "from", void 0);
__decorate([
    property({ type: String })
], Slider.prototype, "to", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Slider.prototype, "pin", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Slider.prototype, "range", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'show-steps' })
], Slider.prototype, "showSteps", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'show-input-field' })
], Slider.prototype, "showInputField", void 0);
__decorate([
    property({ type: String, attribute: 'min-range' })
], Slider.prototype, "minRange", void 0);
__decorate([
    query('[part="slider"]')
], Slider.prototype, "slider", void 0);
__decorate([
    query('#trackWrapper')
], Slider.prototype, "trackWrapper", void 0);
__decorate([
    query('#thumbContainer')
], Slider.prototype, "thumbContainer", void 0);
__decorate([
    query('ef-number-field[name=value]')
], Slider.prototype, "valueInput", void 0);
__decorate([
    query('ef-number-field[name=from]')
], Slider.prototype, "fromInput", void 0);
__decorate([
    query('ef-number-field[name=to]')
], Slider.prototype, "toInput", void 0);
Slider = __decorate([
    customElement('ef-slider', {
        alias: 'coral-slider'
    })
], Slider);
export { Slider };
//# sourceMappingURL=index.js.map