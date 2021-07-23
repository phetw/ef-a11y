var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ControlElement, html, css, customElement, property, ifDefined, WarningNotice } from '@refinitiv-ui/core';
import '../button';
import { DateFormat, format, utcFormat, utcParse, isValidDate, isWeekend, isAfter, isBefore, addMonths, subMonths, isToday, isThisMonth, isThisYear, isSameDay, isSameMonth, isSameYear, toDateSegment } from '@refinitiv-ui/utils';
import { monthInfo } from './utils';
import './locales';
import { weekdaysNames, monthsNames, formatLocaleDate, ViewFormatTranslateParams } from './locales';
import { translate, getLocale, TranslatePropertyKey } from '@refinitiv-ui/translate';
import { RenderView } from './types';
import { VERSION } from '..';
const isIE = (/Trident/g).test(navigator.userAgent) || (/MSIE/g).test(navigator.userAgent);
const FIRST_DAY_OF_WEEK = 0; // 0 for Sunday
const YEARS_PER_YEAR_VIEW = 16; /* must be a square number */
const DAY_VIEW = {
    rowCount: 6,
    columnCount: 7,
    totalCount: 6 * 7
};
const YEAR_VIEW = {
    rowCount: 4,
    columnCount: 4,
    totalCount: 4 * 4
};
const MONTH_VIEW = {
    rowCount: 4,
    columnCount: 4,
    totalCount: 4 * 4
};
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
let Calendar = class Calendar extends ControlElement {
    constructor() {
        super(...arguments);
        this._min = '';
        this._max = '';
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
        * @type {CalendarFilter | null}
        */
        this.filter = null;
        this._view = '';
        this.localFirstDayOfWeek = FIRST_DAY_OF_WEEK; // used from locales. 0 stands for Sunday
        this._firstDayOfWeek = null; // used from setter
        /**
        * Set to switch to range select mode
        */
        this.range = false;
        /**
        * Set to switch to multiple select mode
        */
        this.multiple = false;
        this._values = [];
        /**
         * Fill head and tail cell dates
         */
        this.fillCells = false;
        /**
         * Used for internal navigation between render views
         */
        this.renderView = RenderView.DAY;
        this.isDateAvailable = null; /* a constructed filter based on multiple local filters */
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
      }
      [part=navigation], [part=navigation] section {
        display: flex;
        flex-flow: row nowrap;
      }
      [part=navigation] {
        justify-content: space-between;
      }
      [part=navigation] > div {
        display: flex;
        flex: 1;
        justify-content: center;
      }
      [part~=cell-content] {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      [part=navigation] [part] {
        flex: none;
      }
      [part=table] {
        width: 100%;
      }
      [part~=row] {
        display: flex;
        width: 100%;
      }
      [part~=cell] {
        position: relative;
      }
      [part~=cell][part~=year] {
        width: calc(100% / ${YEAR_VIEW.columnCount});
        padding-top: calc(100% / ${YEAR_VIEW.columnCount});
      }
      [part~=cell][part~=month] {
        width: calc(100% / ${MONTH_VIEW.columnCount});
        padding-top: calc(100% / ${MONTH_VIEW.columnCount});
      }
      [part~=cell][part~=day], [part~=cell][part~=day-name] {
        width: calc(100% / ${DAY_VIEW.columnCount});
        padding-top: calc(100% / ${DAY_VIEW.columnCount});
      }
      [part~=cell][tabindex] {
        cursor: pointer;
      }
    `;
    }
    /**
    * Set minimum date
    * @param min min date
    * @default -
    */
    set min(min) {
        const oldMin = this._min;
        if (!this.isValidValue(min)) {
            this.warnInvalidValue(min);
            min = '';
        }
        if (oldMin !== min) {
            this._min = min;
            void this.requestUpdate('min', oldMin);
        }
    }
    get min() {
        return this._min;
    }
    /**
    * Set maximum date
    * @param max max date
    * @default -
    */
    set max(max) {
        const oldMax = this._max;
        if (!this.isValidValue(max)) {
            this.warnInvalidValue(max);
            max = '';
        }
        if (oldMax !== max) {
            this._max = max;
            void this.requestUpdate('max', oldMax);
        }
    }
    get max() {
        return this._max;
    }
    /**
    * Current calendar view date
    * @param view view date
    * @default -
    */
    set view(view) {
        if (view && !isValidDate(view, DateFormat.yyyyMM)) {
            this.warnInvalidView(view);
            view = '';
        }
        const oldView = this._view;
        if (oldView !== view) {
            this._view = view;
            void this.requestUpdate('view', oldView);
        }
    }
    get view() {
        /* as soon as user interaction has happened, always rely on view */
        return this._view || (this.value ? utcFormat(toDateSegment(this.value), DateFormat.yyyyMM) : format(new Date(), DateFormat.yyyyMM));
    }
    /**
     * Set the first day of the week.
     * 0 - for Sunday, 6 - for Saturday
     * @param firstDayOfWeek The first day of the week
     * @type {number | null}
     */
    set firstDayOfWeek(firstDayOfWeek) {
        firstDayOfWeek %= 7;
        const oldFirstDayOfWeek = this.firstDayOfWeek;
        if (oldFirstDayOfWeek !== firstDayOfWeek) {
            this._firstDayOfWeek = firstDayOfWeek;
            void this.requestUpdate('firstDayOfWeek', oldFirstDayOfWeek);
        }
    }
    get firstDayOfWeek() {
        return this._firstDayOfWeek === null ? this.localFirstDayOfWeek : this._firstDayOfWeek;
    }
    /**
    * Current date time value
    * @param value Calendar value
    * @default -
    */
    set value(value) {
        this.values = [value];
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
        const newValues = this.filterAndWarnInvalidValues(values);
        if (oldValues.toString() !== newValues.toString()) {
            this._values = newValues;
            void this.requestUpdate('values', oldValues);
        }
    }
    get values() {
        return this._values.concat();
    }
    /**
     * Get weekday numbers.
     * Sort the list based on first day of the week
     */
    get weekdaysNames() {
        const firstDayOfWeek = this.firstDayOfWeek;
        const localWeekdaysNames = this.localWeekdaysNames;
        return localWeekdaysNames.slice(firstDayOfWeek).concat(localWeekdaysNames.slice(0, firstDayOfWeek));
    }
    /**
     * Get localised month names from January to December
     */
    get monthsNames() {
        return this.localMonthsNames;
    }
    /**
     * Perform asynchronous update
     * @returns promise
     */
    async performUpdate() {
        const localFirstDayOfWeek = Number(await this.tPromise('FIRST_DAY_OF_WEEK'));
        this.localFirstDayOfWeek = isNaN(localFirstDayOfWeek) ? FIRST_DAY_OF_WEEK : (localFirstDayOfWeek % 7);
        void super.performUpdate();
    }
    /**
    * Updates the element
    * @param changedProperties Properties that has changed
    * @returns {void}
    */
    update(changedProperties) {
        if (!this.localMonthsNames || changedProperties.has(TranslatePropertyKey)) {
            this.localMonthsNames = monthsNames(getLocale(this));
        }
        if (!this.localWeekdaysNames || changedProperties.has(TranslatePropertyKey)) {
            this.localWeekdaysNames = weekdaysNames(getLocale(this));
        }
        this.shouldConstructFilters(changedProperties) && this.constructFilters();
        super.update(changedProperties);
    }
    /**
     * Run when an element has been first updated
     * @param changedProperties properties that was changed on first update
     * @returns {void}
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.renderRoot.addEventListener('keydown', event => this.onTableKeyDown(event));
    }
    /**
     * Show invalid view message
     * @param value Invalid value
     * @returns {void}
     */
    warnInvalidView(value) {
        new WarningNotice(`The specified value "${value}" does not conform to the required format. The format is "yyyy-MM".`).once();
    }
    /**
     * Show invalid value message
     * @param value Invalid value
     * @returns {void}
     */
    warnInvalidValue(value) {
        new WarningNotice(`The specified value "${value}" does not conform to the required format. The format is "yyyy-MM-dd".`).once();
    }
    /**
    * Validate that the value confirms the control type
    * @param value Value to check
    * @returns false if value is invalid
    */
    isValidValue(value) {
        return value === '' || isValidDate(value);
    }
    /**
     * A helper method to make sure that only valid values are passed
     * Warn if passed value is invalid
     * @param values Values to check
     * @returns Filtered collection of values
     */
    filterAndWarnInvalidValues(values) {
        const filtered = [];
        values.forEach(value => {
            if (this.isValidValue(value)) {
                value && filtered.push(value);
            }
            else {
                this.warnInvalidValue(value);
            }
        });
        return filtered;
    }
    /**
     * Check if there is a need to reconstruct filters
     * @param changedProperties properties that was changed on first update
     * @returns true if filter needs to be constructed
     */
    shouldConstructFilters(changedProperties) {
        return changedProperties.has('min')
            || changedProperties.has('max')
            || changedProperties.has('weekdaysOnly')
            || changedProperties.has('weekendsOnly')
            || changedProperties.has('filter');
    }
    /**
     * Construct and store a collection of filters
     * First always comes default filters and last custom filters
     * @returns {void}
     */
    constructFilters() {
        const filters = [];
        this.min && filters.push(date => isSameDay(date, this.min) || isAfter(date, this.min));
        this.max && filters.push(date => isSameDay(date, this.max) || isBefore(date, this.max));
        if (this.weekdaysOnly) {
            filters.push(date => !isWeekend(date));
        }
        if (this.weekendsOnly) {
            filters.push(date => isWeekend(date));
        }
        if (this.filter) {
            filters.push(this.filter);
        }
        const filtersLength = filters.length;
        if (filtersLength) {
            this.isDateAvailable = (value) => {
                for (let i = 0; i < filtersLength; i += 1) {
                    if (!filters[i](value)) {
                        return false;
                    }
                }
                return true;
            };
        }
        else {
            this.isDateAvailable = null;
        }
    }
    /**
     * Check if date cell is selected
     * @param value A value to compare
     * @param comparator A comparator to check for selection. Can be day, month or year
     * @returns true if cell is selected
     */
    isDateCellSelected(value, comparator) {
        const values = this._values;
        const valuesLength = values.length;
        for (let i = 0; i < valuesLength; i += 1) {
            if (comparator(value, values[i])) {
                return true;
            }
        }
        return false;
    }
    /**
     * Get cell selection model, which is used to bind values and ranges
     * to cell styles
     * @param value A value to compare
     * @param comparator A comparator to check for selection. Can be day, month or year
     * @returns cell selection model
     */
    getCellSelection(value, comparator) {
        const values = this._values;
        const selected = this.isDateCellSelected(value, comparator);
        const from = values[0];
        const to = values[1];
        if (!this.range || !from || !to) {
            return {
                selected
            };
        }
        const rangeFrom = comparator(value, from);
        const rangeTo = comparator(value, to);
        const range = !rangeFrom && !rangeTo && isAfter(value, from) && isBefore(value, to);
        return {
            selected,
            range,
            rangeFrom,
            rangeTo
        };
    }
    /**
     * Run when next button is tapped.
     * Change current view to next view
     * @returns {void}
     */
    onNextTap() {
        let viewSegment = toDateSegment(this.view);
        switch (this.renderView) {
            case RenderView.DAY:
                viewSegment = toDateSegment(addMonths(this.view, 1));
                break;
            case RenderView.MONTH:
                viewSegment.year += 1;
                break;
            case RenderView.YEAR:
                viewSegment.year += YEARS_PER_YEAR_VIEW;
                break;
            // no default
        }
        this.notifyViewChange(viewSegment);
    }
    /**
     * Run when previous button is tapped.
     * Change current view to previous view
     * @returns {void}
     */
    onPreviousTap() {
        let viewSegment = toDateSegment(this.view);
        switch (this.renderView) {
            case RenderView.DAY:
                viewSegment = toDateSegment(subMonths(this.view, 1));
                break;
            case RenderView.MONTH:
                viewSegment.year -= 1;
                break;
            case RenderView.YEAR:
                viewSegment.year -= YEARS_PER_YEAR_VIEW;
                break;
            // no default
        }
        this.notifyViewChange(viewSegment);
    }
    /**
     * Run when change view button is tapped.
     * Switch between views
     * @returns {void}
     */
    onRenderViewTap() {
        this.renderView = this.renderView === RenderView.DAY ? RenderView.YEAR : RenderView.DAY;
    }
    /**
     * Run when key down event happens on calendar
     * @param event Keyboard event
     * @returns {void}
     */
    onTableKeyDown(event) {
        switch (event.key) {
            case ' ':
            case 'Enter':
            case 'Spacebar':
                event.preventDefault();
                this.onTableTap(event);
                break;
            case 'Esc':
            case 'Escape':
                if (this.renderView === RenderView.YEAR || this.renderView === RenderView.MONTH) {
                    event.preventDefault();
                    this.renderView = RenderView.DAY;
                }
                break;
            // no default
        }
    }
    /**
     * Run when tap event happens ot table.
     * Select the values or switch the view
     * @param event Tap event
     * @returns {void}
     */
    onTableTap(event) {
        const cell = event.target; /* here we just emulate interface */
        if (!cell || !cell.value) {
            return;
        }
        const cellSegment = toDateSegment(cell.value);
        const viewSegment = toDateSegment(this.view);
        if (this.renderView === RenderView.YEAR) { /* YEAR -> MONTH */
            viewSegment.year = cellSegment.year;
            if (this.notifyViewChange(viewSegment)) {
                this.renderView = RenderView.MONTH;
            }
            return;
        }
        if (this.renderView === RenderView.MONTH) { /* MONTH -> DAY */
            viewSegment.year = cellSegment.year;
            viewSegment.month = cellSegment.month;
            if (this.notifyViewChange(viewSegment)) {
                this.renderView = RenderView.DAY;
            }
            return;
        }
        this.onTapSelectValue(cell.value);
    }
    /**
     * Run when tap event happened on DAY view and the cell has the values
     * Try to select/deselect cell value
     * @param value Date string
     * @returns {void}
     */
    onTapSelectValue(value) {
        if (this.readonly || this.disabled) {
            return;
        }
        let values;
        if (this.multiple) {
            values = this.values.filter(oldValue => {
                return oldValue !== value;
            });
            if (this.values.length === values.length) {
                values.push(value);
            }
        }
        else if (this.range) {
            if (!this.values.length) {
                values = [value];
            }
            else if (this.values.length === 1) { /* from is populated */
                const from = this.values[0];
                const to = value;
                if (isAfter(to, from) || isSameDay(to, from)) {
                    values = [this.values[0], value];
                }
                else {
                    values = [value];
                }
            }
            else {
                values = [value];
            }
        }
        else {
            values = [value];
        }
        this.notifyValuesChange(values);
    }
    /**
     * Notify that values array has been changed
     * @param values A collection of string dates
     * @returns {void}
     */
    notifyValuesChange(values) {
        if (this.values.toString() !== values.toString()) {
            this.values = values;
            this.notifyPropertyChange('value', this.value);
        }
    }
    /**
     * Notify that view has been changed
     * @param view Date
     * @returns {void}
     */
    notifyViewChange(view) {
        const viewString = utcFormat(view, DateFormat.yyyyMM);
        const res = this.notifyPropertyChange('view', viewString, true);
        if (res) {
            this.view = viewString;
        }
        return res;
    }
    /**
     * Localised format for render view
     * @param segment Segment object
     * @param includeMonth True to include a month
     * @returns template result
     */
    viewFormattedDate(segment, includeMonth = false) {
        const year = segment.year;
        const isBC = year <= 0;
        const includeEra = isBC;
        const date = utcParse(segment);
        // Unfortunately IE11 does not support date formatting for year <= 0
        // Do manual conversion instead
        if (isIE && isBC) {
            return html `${formatLocaleDate(date, getLocale(this), includeMonth, includeEra)}`;
        }
        return html `${this.t('VIEW_FORMAT', {
            date,
            includeMonth,
            includeEra
        }, ViewFormatTranslateParams)}`;
    }
    /**
     * Get a string representation of current view
     * @returns template result
     */
    get formattedViewRender() {
        const segment = toDateSegment(this.view);
        switch (this.renderView) {
            case RenderView.MONTH:
                return this.viewFormattedDate(segment);
            case RenderView.YEAR:
                const month = segment.month;
                const day = segment.day;
                const fromYear = Math.floor(segment.year / YEARS_PER_YEAR_VIEW) * YEARS_PER_YEAR_VIEW;
                const toYear = fromYear + YEARS_PER_YEAR_VIEW - 1;
                return html `${this.viewFormattedDate({ year: fromYear, month, day })} - ${this.viewFormattedDate({ year: toYear, month, day })}`;
            case RenderView.DAY:
            default:
                return this.viewFormattedDate(segment, true);
        }
    }
    /**
     * Render cell content template.
     * If the cell is selectable (aka has value) add selection part
     * @param text Text to render
     * @param selectable True if cell may be selected
     * @returns template result
     */
    renderContentBox(text = '', selectable = false) {
        return html `<div part="cell-content${selectable ? ' selection' : ''}">${text}</div>`;
    }
    /**
     * Get year view template
     */
    get yearView() {
        const view = RenderView.YEAR;
        const currentYear = toDateSegment(this.view).year;
        const startIdx = Math.floor(currentYear / YEARS_PER_YEAR_VIEW) * YEARS_PER_YEAR_VIEW;
        const years = [];
        const rows = [];
        let cells = [];
        let cell;
        for (let i = 0; i < YEAR_VIEW.totalCount; i += 1) {
            if (i % YEAR_VIEW.columnCount === 0) {
                cells = [];
                rows.push({
                    cells
                });
            }
            const year = startIdx + i;
            const value = utcFormat({ year, month: 0, day: 1 }, DateFormat.yyyyMMdd);
            cell = Object.assign({ view, text: year > 0 ? `${year}` : year === 0 ? '1' : `${Math.abs(year - 1)}`, value: `${year}`, now: isThisYear(value) }, this.getCellSelection(value, isSameYear));
            cells.push(cell);
            years.push(cell);
        }
        years[0].firstDate = true;
        years[years.length - 1].lastDate = true;
        return html `${this.renderRows(rows)}`;
    }
    /**
     * Get month view template
     */
    get monthView() {
        const view = RenderView.MONTH;
        const currentYear = toDateSegment(this.view).year;
        const columnCount = MONTH_VIEW.columnCount;
        const monthCount = 12;
        const totalCount = MONTH_VIEW.totalCount;
        const monthsNames = this.monthsNames;
        const before = (totalCount - monthCount) / 2;
        const startIdx = monthCount - before % monthCount;
        const after = before + monthCount;
        const months = [];
        const rows = [];
        let cell;
        let cells = [];
        for (let i = 0; i < totalCount; i += 1) {
            if (i % columnCount === 0) {
                cells = [];
                rows.push({
                    cells
                });
            }
            const month = (startIdx + i) % monthCount; /* 0 for Jan, 11 for Dev */
            const year = currentYear + Math.floor((i - before) / monthCount);
            const segment = { year, month, day: 1 };
            const value = utcFormat(segment, DateFormat.yyyyMMdd);
            const idle = i < before || i >= after;
            cell = Object.assign({ view, text: monthsNames[month], value: utcFormat(segment, DateFormat.yyyyMM), idle, now: isThisMonth(value) }, this.getCellSelection(value, isSameMonth));
            cells.push(cell);
            months.push(cell);
        }
        months[0].firstDate = true;
        months[months.length - 1].lastDate = true;
        return html `${this.renderRows(rows)}`;
    }
    /**
     * Get day view template
     */
    get dayView() {
        const view = RenderView.DAY;
        const firstDayOfWeek = this.firstDayOfWeek;
        const padding = (7 + utcParse(this.view).getUTCDay() - firstDayOfWeek) % 7;
        const viewMonth = monthInfo(this.view);
        const prevMonth = monthInfo(subMonths(this.view, 1));
        const nextMonth = monthInfo(addMonths(this.view, 1));
        const days = [];
        const rows = [];
        let cells = [];
        let day;
        let month;
        let year;
        // Generate new cells.
        for (let i = 0; i < DAY_VIEW.totalCount; i += 1) {
            if (i % DAY_VIEW.columnCount === 0) {
                cells = [];
                rows.push({
                    cells
                });
            }
            const datePadding = i - padding + 1;
            if (datePadding <= 0) {
                if (!this.fillCells) {
                    cells.push({
                        view
                    });
                    continue;
                }
                day = prevMonth.days + datePadding;
                month = prevMonth.month;
                year = prevMonth.year;
            }
            else if (datePadding > viewMonth.days) {
                if (!this.fillCells) {
                    cells.push({
                        view
                    });
                    continue;
                }
                day = datePadding - viewMonth.days;
                month = nextMonth.month;
                year = nextMonth.year;
            }
            else {
                day = datePadding;
                month = viewMonth.month;
                year = viewMonth.year;
            }
            const value = utcFormat({ year, month, day }, DateFormat.yyyyMMdd);
            const disabled = this.isDateAvailable ? !this.isDateAvailable(value) : false;
            const dayCell = Object.assign({ view, text: day.toString(), value,
                disabled, idle: month !== viewMonth.month || year !== viewMonth.year, now: isToday(value) }, this.getCellSelection(value, isSameDay));
            cells.push(dayCell);
            days.push(dayCell);
        }
        days[0].firstDate = true;
        days[days.length - 1].lastDate = true;
        return html `
      ${this.renderWeekdayNames}
      ${this.renderRows(rows)}
    `;
    }
    /**
     * Get weekday names template
     */
    get renderWeekdayNames() {
        return html `
      <div part="row day-name-row">${this.weekdaysNames.map(day => html `<div part="cell day-name">${this.renderContentBox(day)}</div>`)}</div>
    `;
    }
    /**
     * Render a view based on the current render view
     */
    get viewRender() {
        switch (this.renderView) {
            case RenderView.MONTH:
                return this.monthView;
            case RenderView.YEAR:
                return this.yearView;
            case RenderView.DAY:
            default:
                return this.dayView;
        }
    }
    /**
     * Render cell template. Cell can be a day, month or year
     * @param cell Cell object
     * @returns template result
     */
    renderCell(cell) {
        return html `<div
      part="cell ${cell.view}"
      ?disabled=${cell.disabled}
      .value=${cell.value}
      ?idle=${cell.idle}
      ?today=${cell.now}
      ?first-date=${cell.firstDate}
      ?last-date=${cell.lastDate}
      ?selected=${cell.selected}
      ?range=${cell.range}
      ?range-from=${cell.rangeFrom}
      ?range-to=${cell.rangeTo}
      tabindex=${ifDefined(cell.value !== undefined && !cell.disabled ? 0 : undefined)}
     >${this.renderContentBox(cell.text, cell.value !== undefined)}</div>`;
    }
    /**
     * Render view rows
     * @param rows A collection of rows with cells
     * @returns template result
     */
    renderRows(rows) {
        return rows.map(row => html `<div part="row">${row.cells.map(cell => this.renderCell(cell))}</div>`);
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return html `
      <div part="navigation">
        <ef-button
          part="btn-prev"
          icon="left"
          @tap=${this.onPreviousTap}></ef-button>
        <ef-button
          part="btn-view"
          textpos="before"
          .icon="${this.renderView === RenderView.DAY ? 'down' : 'up'}"
          @tap="${this.onRenderViewTap}">${this.formattedViewRender}</ef-button>
        <ef-button
          part="btn-next"
          icon="right"
          @tap=${this.onNextTap}></ef-button>
      </div>
      <div part="table"
        @tap=${this.onTableTap}>${this.viewRender}</div>
      <div part="footer"><slot name="footer"></slot></div>
    `;
    }
};
__decorate([
    property({ type: String })
], Calendar.prototype, "min", null);
__decorate([
    property({ type: String })
], Calendar.prototype, "max", null);
__decorate([
    property({ type: Boolean, attribute: 'weekdays-only' })
], Calendar.prototype, "weekdaysOnly", void 0);
__decorate([
    property({ type: Boolean, attribute: 'weekends-only' })
], Calendar.prototype, "weekendsOnly", void 0);
__decorate([
    property({ attribute: false })
], Calendar.prototype, "filter", void 0);
__decorate([
    property({ type: String })
], Calendar.prototype, "view", null);
__decorate([
    property({ type: Number, attribute: 'first-day-of-week' })
], Calendar.prototype, "firstDayOfWeek", null);
__decorate([
    property({ type: Boolean, reflect: true })
], Calendar.prototype, "range", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Calendar.prototype, "multiple", void 0);
__decorate([
    property({ type: String })
], Calendar.prototype, "value", null);
__decorate([
    property({
        converter: {
            fromAttribute: function (value) {
                return value.split(',');
            }
        }
    })
], Calendar.prototype, "values", null);
__decorate([
    property({ type: Boolean, attribute: 'fill-cells' })
], Calendar.prototype, "fillCells", void 0);
__decorate([
    translate({ mode: 'directive', scope: 'ef-calendar' })
], Calendar.prototype, "t", void 0);
__decorate([
    translate({ mode: 'promise', scope: 'ef-calendar' })
], Calendar.prototype, "tPromise", void 0);
__decorate([
    property({ type: String })
], Calendar.prototype, "renderView", void 0);
Calendar = __decorate([
    customElement('ef-calendar', {
        alias: 'coral-calendar'
    })
], Calendar);
export { Calendar };
//# sourceMappingURL=index.js.map