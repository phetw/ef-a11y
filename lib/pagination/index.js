var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BasicElement, html, css, customElement, property, query } from '@refinitiv-ui/core';
import '@refinitiv-ui/phrasebook/lib/locale/en/pagination';
import { translate } from '@refinitiv-ui/translate';
import '../button';
import '../button-bar';
import '../layout';
import '../text-field';
import { VERSION } from '../';
/**
 * Used to control and navigate through multiple pages
 * @fires page-changed - Fired when the `page` property is changed
 */
let Pagination = class Pagination extends BasicElement {
    constructor() {
        super(...arguments);
        /**
         * Set current page
         */
        this.page = '1';
        /**
         * Number of item per page
         */
        this.pageSize = '10';
        /**
         * Total items
         */
        this.totalItems = '10';
        /**
         * Set state to disable
         */
        this.disabled = false;
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
        display: block;
        --responsive-width: 450;
      }
    `;
    }
    /**
     * Invoked whenever the element is updated
     * @param changedProperties Map of changed properties with old values
     * @returns {void}
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('disabled')) {
            this.disabledChanged();
        }
        if (changedProperties.has('page')) {
            const previousPage = changedProperties.get('page');
            this.page = this.validatePage(previousPage, this.page);
            this.updateButtons();
        }
        if (changedProperties.has('pageSize')) {
            this.pageSizeChanged();
        }
        if (changedProperties.has('totalItems')) {
            this.totalItemsChanged();
        }
    }
    /**
     * Handle when page-size property changed
     * @returns {void}
     */
    pageSizeChanged() {
        const page = Number.parseInt(this.page, 10);
        const pageSize = Number.parseInt(this.pageSize, 10);
        // page must have at least 1 item
        if (pageSize < 1) {
            this.pageSize = '1';
        }
        if (page > this.totalPage) {
            this.page = this.totalPage.toString();
        }
        this.updateButtons();
    }
    /**
     * Handle when total-items property changed
     * @returns {void}
     */
    totalItemsChanged() {
        const page = Number.parseInt(this.page, 10);
        const totalItems = Number.parseInt(this.totalItems, 10);
        // handle if someone doesn't know how to count
        if (totalItems < 1) {
            this.totalItems = '0';
            this.page = '1';
        }
        else if (page > this.totalPage) {
            this.page = this.totalPage.toString();
        }
        this.updateButtons();
    }
    /**
     * Handle when disabled property changed
     * @returns {void}
     */
    disabledChanged() {
        if (this.disabled) {
            this.infoElement.setAttribute('disabled', '');
        }
        else {
            this.infoElement.removeAttribute('disabled');
        }
        this.input.disabled = this.disabled;
        // recalculate button state
        this.updateButtons();
    }
    /**
     * Update disable/enable state of first, previous, next, and last
     * First and previous should be disabled if showing first page
     * Next and last should be disabled if showing last page
     * @returns {void}
     */
    updateButtons() {
        const page = Number.parseInt(this.page, 10);
        const firstPage = this.disabled || page <= 1;
        const lastPage = this.disabled || page >= this.totalPage;
        this.previousPageButton.disabled = firstPage;
        this.firstPageButton.disabled = firstPage;
        this.nextPageButton.disabled = lastPage;
        this.lastPageButton.disabled = lastPage;
    }
    /**
     * Calculate and return total pages
     * Total pages should never less than 1
     * @returns {number} Number of total page
     */
    get totalPage() {
        const pageSize = Number.parseInt(this.pageSize, 10);
        const totalItems = Number.parseInt(this.totalItems, 10);
        if (pageSize > 0) {
            const totalPage = Math.ceil(totalItems / pageSize);
            return totalPage > 0 ? totalPage : 1;
        }
        return 1;
    }
    /**
     * Check a new page value to be usable
     * if a new page value is allow then return newPage
     * Condition to be old value is null or NaN or undefined or string or less than 1
     * @param oldPage a old page value
     * @param newPage a new page value
     * @return return a new page value
     */
    validatePage(oldPage, newPage) {
        let page = Number.parseInt(newPage, 10);
        if (!page || isNaN(Number(newPage)) || isNaN(page)) {
            page = Number.parseInt(oldPage, 10);
        }
        else if (page > this.totalPage) {
            page = this.totalPage;
        }
        else if (page < 1) {
            page = 1;
        }
        return page.toString();
    }
    /**
     * Get text to display in info part
     * @returns {PageInfo} Used for translations
     */
    get pageInfo() {
        const page = Number.parseInt(this.page, 10);
        const pageSize = Number.parseInt(this.pageSize, 10);
        const totalCount = Number.parseInt(this.totalItems, 10);
        const from = ((page - 1) * pageSize) + 1;
        const to = page * pageSize > totalCount ? totalCount : page * pageSize;
        return {
            from,
            to,
            totalCount,
            pageSize
        };
    }
    /**
     * Hide info part when it's too small
     * @returns {void}
     */
    onResize() {
        const display = this.clientWidth < Number.parseInt(this.getComputedVariable('--responsive-width'), 10) ? 'none' : 'block';
        this.infoElement.style.display = display;
    }
    /**
     * Handle when input is focus
     * @returns {void}
     */
    onInputFocus() {
        this.input.value = this.page;
        setTimeout(() => {
            this.input.select();
        });
    }
    /**
     * Handle when input lost focus
     * @param event Event object
     * @returns {void}
     */
    onInputBlur(event) {
        const oldPageValue = this.page;
        this.page = this.validatePage(this.page, event.target.value);
        // need this to update input text
        void this.requestUpdate();
        if (this.page !== oldPageValue) {
            this.notifyPropertyChange('page', this.page);
        }
    }
    /**
     * Handles action when Enter key is press onto the input
     * @param event Keyboard event
     * @returns {void}
     */
    onInputKeyDown(event) {
        var _a, _b;
        if (event.key === 'Enter' || event.keyCode === 13) {
            /*
            * Issue only in firefox
            * cannot blur() or focus() to this.input
            * so create a temp to this.input loses focus
            */
            const temp = document.createElement('input');
            (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(temp);
            temp.focus();
            this.input.blur();
            (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.removeChild(temp);
            event.preventDefault();
        }
    }
    /**
     * Updates page value depending on direction
     * @param direction page value direction
     * @param event whether the event page-changed should fire
     * @returns {void}
     */
    updatePage(direction, event = false) {
        const page = parseInt(this.page, 10);
        const limit = direction === 'increment' ? page < this.totalPage : page > 1;
        if (limit) {
            this.page = direction === 'increment' ? (page + 1).toString() : (page - 1).toString();
            if (event) {
                this.notifyPropertyChange('page', this.page);
            }
        }
    }
    /**
     * Go to the next page
     * @returns {void}
     */
    next() {
        this.input.blur();
        this.updatePage('increment');
    }
    /**
     * Go to the next page and fires event
     * @returns {void}
     */
    onNextTap() {
        this.input.blur();
        this.updatePage('increment', true);
    }
    /**
     * Go to the previous page
     * @returns {void}
     */
    previous() {
        this.input.blur();
        this.updatePage('decrement');
    }
    /**
     * Go to the previous page and fires evetn
     * @returns {void}
     */
    onPreviousTap() {
        this.input.blur();
        this.updatePage('decrement', true);
    }
    /**
     * Go to the first page
     * @returns {void}
     */
    first() {
        this.input.blur();
        this.page = '1';
    }
    /**
     * Go to the first page and fires event
     * @returns {void}
     */
    onFirstTap() {
        this.first();
        this.notifyPropertyChange('page', this.page);
    }
    /**
     * Go to the last page
     * @returns {void}
     */
    last() {
        this.input.blur();
        this.page = this.totalPage.toString();
    }
    /**
     * Go to the last page and fires event
     * @returns {void}
     */
    onLastTap() {
        this.last();
        this.notifyPropertyChange('page', this.page);
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult} Render template
     */
    render() {
        return html `
      <ef-layout part="container" flex nowrap @resize="${this.onResize}">
        <div id="info" part="info">${this.t('ITEM_INFO', this.pageInfo)}</div>
        <ef-button-bar part="buttons">
          <ef-button id="first" icon="skip-to-start" @tap="${this.onFirstTap}"></ef-button>
          <ef-button id="previous" icon="left" @tap="${this.onPreviousTap}"></ef-button>
        </ef-button-bar>
        <ef-text-field
          id="input"
          part="input"
          @focus="${this.onInputFocus}"
          @blur="${this.onInputBlur}"
          @keydown="${this.onInputKeyDown}"
          .value="${this.t('PAGE_OF', {
            page: this.page,
            pageTotal: this.totalPage
        })}"
          no-spinner></ef-text-field>
        <ef-button-bar part="buttons">
          <ef-button id="next" icon="right" @tap="${this.onNextTap}"></ef-button>
          <ef-button id="last" icon="skip-to-end" @tap="${this.onLastTap}"></ef-button>
        </ef-button-bar>
      </ef-layout>
    `;
    }
};
__decorate([
    property({ type: String })
], Pagination.prototype, "page", void 0);
__decorate([
    property({ type: String, attribute: 'page-size' })
], Pagination.prototype, "pageSize", void 0);
__decorate([
    property({ type: String, attribute: 'total-items' })
], Pagination.prototype, "totalItems", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Pagination.prototype, "disabled", void 0);
__decorate([
    query('#info')
], Pagination.prototype, "infoElement", void 0);
__decorate([
    query('#input')
], Pagination.prototype, "input", void 0);
__decorate([
    query('#first')
], Pagination.prototype, "firstPageButton", void 0);
__decorate([
    query('#previous')
], Pagination.prototype, "previousPageButton", void 0);
__decorate([
    query('#next')
], Pagination.prototype, "nextPageButton", void 0);
__decorate([
    query('#last')
], Pagination.prototype, "lastPageButton", void 0);
__decorate([
    translate()
], Pagination.prototype, "t", void 0);
Pagination = __decorate([
    customElement('ef-pagination', {
        alias: 'emerald-pagination'
    })
], Pagination);
export { Pagination };
//# sourceMappingURL=index.js.map