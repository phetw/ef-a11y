var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Autosuggest_1;
import { css, customElement, html, property, query, unsafeHTML } from '@refinitiv-ui/core';
import { AnimationTaskRunner, TimeoutTaskRunner } from '@refinitiv-ui/utils';
import { Overlay } from '../overlay';
import '../loader';
import { escapeRegExp, itemHighlightable, itemRenderer, queryWordSelect } from './helpers/utils';
import { isIE, isMobile } from './helpers/const';
import { VERSION } from '../';
export { queryWordSelect, itemRenderer, escapeRegExp, itemHighlightable, updateElementContent } from './helpers/utils';
/**
 * Shows suggestions based on users' query.
 * It can be used by attaching to text form control
 * such as TextField, Multi Input, etc.
 * Autosuggest supports various use cases such as
 * custom rendering, pagination, asynchronous data request, etc.
 *
 * @fires item-highlight Fired when an item gets highlighted or highlight is removed
 * @fires add-attach-target-events Fired when attach has been set
 * @fires remove-attach-target-events Fired when attach has been removed
 * @fires item-select Fired when an item gets selected
 * @fires suggestions-fetch-requested Fired when auto suggest requests the data
 * @fires suggestions-clear-requested Fired when auto suggest requests to clear the data. If used in reactive application, prevent default and set suggestions to []
 * @fires suggestions-query Fired when input value has changed and the query must be set
 * @fires suggestions-changed Fired when suggestions changed
 *
 * @attr {boolean} opened - Set to open auto suggest popup
 * @prop {boolean} [opened=false] -  Auto suggest popup's open state
 */
let Autosuggest = Autosuggest_1 = class Autosuggest extends Overlay {
    /**
     * creates auto-suggest
     */
    constructor() {
        super();
        /**
         * An HTML Element or CSS selector
         * @type {AutosuggestTargetElement | string | null}
         */
        this.attach = null;
        /**
         * Request suggestions when attach target is focused
         */
        this.requestOnFocus = false;
        /**
         * If set to true display 'Has more results' item
         */
        this.moreResults = false;
        /**
         * Custom text for More Search
         */
        this.moreSearchText = Autosuggest_1.defaultMoreSearchText;
        /**
         * If set to true show loading mask
         */
        this.loading = false;
        /**
         * An object that represents a query from attach target
         * @type {AutosuggestQuery | null}
         */
        this.query = null;
        /**
         * Debounce rate in ms of the filter as a number.
         * Used to throttle the filter rate so as not to trigger unneeded filtering
         * @default 100
         */
        this.debounceRate = Autosuggest_1.defaultDebounceRate;
        /**
         * A renderer applied to suggestion.
         * By default a render maps data to item attributes
         * @type {AutosuggestRenderer}
         */
        this.renderer = itemRenderer;
        /**
         * A function that is applied to every suggestion during the render process
         * to say whether the item can be highlighted and selected. Only items that return true are considered.
         * By default the function checks for `item` `highlightable` property.
         * @type {AutosuggestHighlightable}
         */
        this.highlightable = itemHighlightable;
        /**
         * A list of suggestion items
         * @type {AutosuggestItem[]}
         */
        this.suggestions = [];
        /**
         * If set to true, the render function is not called. Instead the wrapper element
         * should populate and destroy suggestion elements. Rendering items manually
         * may have performance benefits in frameworks that use virtual DOM (such as `Vue`, `React`, `hyperHTML` and others)
         */
        this.htmlRenderer = false;
        // used to map render elements with data
        this.suggestionMap = new Map();
        this.highlightedItem = null;
        this.attachTarget = null;
        this.lastActiveElement = null;
        this.suspendedKey = false;
        this.preservedQueryValue = null;
        this.focusSuspended = false;
        this.jobRunner = new TimeoutTaskRunner(this.debounceRate);
        this.attachChangeRunner = new AnimationTaskRunner();
        this.moreResultsRunner = new AnimationTaskRunner();
        this.loadingRunner = new AnimationTaskRunner();
        /**
         * Run when document click event happens.
         * @param  event object
         * @returns {void}
         */
        this.onOutsideClick = (event) => {
            const path = event.composedPath();
            // outside click
            if (!path.includes(this) && this.attachTarget && !path.includes(this.attachTarget)) {
                this.setOpened(false);
            }
        };
        /**
         * fire event and reinit listeners if attach was changed
         * @returns {void}
         */
        this.attachChangeFrameCallback = () => {
            this.dispatchAttachEventsRemoveAction();
            const attachTarget = (typeof this.attach === 'string' ? document.querySelector(this.attach) : this.attach);
            if (attachTarget && attachTarget.nodeType === document.ELEMENT_NODE) {
                this.attachTarget = attachTarget;
                if (!this.positionTarget) {
                    this.positionTarget = attachTarget; // in most cases attachTarget and positionTarget must be the same
                }
                /**
                 * @event add-attach-target-events
                 * Fired when attach has been set.
                 * Add attach target listeners.
                 */
                this.dispatchEventDefault(new CustomEvent('add-attach-target-events', {
                    cancelable: true
                }), this.attachEventsAddAction);
            }
        };
        /**
         * set opened state due to status of focus and content
         * @returns {void}
         */
        this.moreResultsFrameCallback = () => {
            this.setOpened(this.attachTargetFocused && this.hasContent);
        };
        /**
         * initialize opened state depends on focus and content
         * @returns {void}
         */
        this.loadingFrameCallback = () => {
            if (this.loading && !this.opened && this.attachTargetFocused) {
                this.setOpened(true);
            }
            else if (!this.loading && this.opened && !this.hasContent) {
                this.setOpened(false);
            }
        };
        this.removeChildNode = (el) => {
            el.parentNode && el.parentNode.removeChild(el);
        };
        this.generateSuggestionsFragment = (fragment, suggestion) => {
            const el = this.renderer(suggestion, this.preservedQueryValue);
            fragment.appendChild(el);
            return fragment;
        };
        /**
         * Fired when mouse down event happens. Select the item
         * @param event Mouse down event
         * @returns {void}
         */
        this.onItemMousedown = (event) => {
            // do not loose focus from input when click happens on the popup
            // note, in IE when scrolling the focus is lost regardless, so
            // do hacking here and with on blur
            /* istanbul ignore next */
            requestAnimationFrame(() => {
                // Ignore any focus query events!
                this.focusSuspended = true;
                this.attachTarget && this.attachTarget.focus();
                this.focusSuspended = false;
            });
            event.stopPropagation();
            event.preventDefault();
        };
        /**
        * @ignore
        */
        this.position = ['bottom-start', 'top-start', 'right-middle'];
        /**
        * @ignore
        */
        this.noCancelOnEscKey = true;
        /**
        * @ignore
        */
        this.noCancelOnOutsideClick = true;
        /**
        * @ignore
        */
        this.noAutofocus = true;
        /**
        * @ignore
        */
        this.noOverlap = true;
        /**
        * @ignore
        */
        this.withShadow = false;
        /**
        * @ignore
        */
        this.onInputValueChange = this.onInputValueChange.bind(this);
        /**
        * @ignore
        */
        this.onInputKeyDown = this.onInputKeyDown.bind(this);
        /**
        * @ignore
        */
        this.onInputBlur = this.onInputBlur.bind(this);
        /**
        * @ignore
        */
        this.onInputFocus = this.onInputFocus.bind(this);
        /**
        * @ignore
        */
        this.suggestionsQueryAction = this.suggestionsQueryAction.bind(this);
        /**
        * @ignore
        */
        this.itemSelectAction = this.itemSelectAction.bind(this);
        /**
        * @ignore
        */
        this.itemHighlightAction = this.itemHighlightAction.bind(this);
        /**
        * @ignore
        */
        this.highlightText = this.highlightText.bind(this);
        /**
        * @ignore
        */
        this.suggestionsFetchRequestedAction = this.suggestionsFetchRequestedAction.bind(this);
        /**
        * @ignore
        */
        this.suggestionsClearRequestedAction = this.suggestionsClearRequestedAction.bind(this);
        /**
        * @ignore
        */
        this.attachEventsAddAction = this.attachEventsAddAction.bind(this);
        /**
        * @ignore
        */
        this.attachEventsRemoveAction = this.attachEventsRemoveAction.bind(this);
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
        return [Overlay.styles, css `
      :host {
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      [part=content] {
        flex: 1 1 auto;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
      [part=header], [part=footer] {
        flex: none;
      }
    `];
    }
    /**
     * A basic regexp matching pattern to replace text based on string input.
     * @param text Value to test against
     * @param query The query
     * @param [pattern=<mark>$1</mark>] Provide a pattern to replace string
     * @returns innerHTML The text that can be used as innerHTML
     */
    static QueryWordSelect(text, query = '', pattern = '<mark>$1</mark>') {
        return queryWordSelect(text, query, pattern);
    }
    /**
     * Build item element from data object
     * @param suggestion Suggestion data
     * @param query A query data (usually string, but could be any entity )
     * @returns item
     */
    static ItemRenderer(suggestion, query) {
        return itemRenderer(suggestion, query);
    }
    /**
     * Replace forbidden characters in regular expressions
     * @param string A string to process
     * @returns clean string
     */
    static EscapeRegExp(string = '') {
        return escapeRegExp(string);
    }
    /**
     * Check whether item can be highlighted
     * @param suggestion Suggestion object
     * @param target item element
     * @returns highlightable
     */
    static ItemHighlightable(suggestion, target) {
        return itemHighlightable(suggestion, target);
    }
    disconnectedCallback() {
        this.dispatchAttachEventsRemoveAction();
        super.disconnectedCallback();
    }
    /**
     * Run when attach target value changes.
     * @param event by default `value-changed` event is listened
     * @returns {void}
     */
    onInputValueChange(event) {
        if (!this.suspended) { // avoid circular
            /* istanbul ignore next */
            if (isMobile) {
                this.lastActiveElement = event.target;
            }
            this.requestSuggestions('value-changed', true);
        }
    }
    /**
     * Run when input has lost focus
     * @param event by default `blur` event is listened
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onInputBlur(event) {
        requestAnimationFrame(() => {
            if (!this.attachTargetFocused) {
                this.setOpened(false);
            }
        });
    }
    /**
     * Run when input received focus
     * @param event by default `focus` event is listened
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onInputFocus(event) {
        /* istanbul ignore next */
        if (this.focusSuspended) {
            // see _onItemMousedown, it is an IE fix for scrollbar
            return;
        }
        this.requestOnFocus && this.requestSuggestions('input-focus');
    }
    /**
     * Run when input key down event has happened
     * @param event by default `keydown` event is listened
     * @returns {void}
     */
    onInputKeyDown(event) {
        if (event.key === 'Up' || event.key === 'ArrowUp') {
            this.onUpKey();
        }
        else if (event.key === 'Down' || event.key === 'ArrowDown') {
            this.onDownKey();
        }
        else if (event.key === 'Esc' || event.key === 'Escape') {
            this.onEscKey();
        }
        else if (event.key === 'Enter' || event.key === 'Return') {
            this.onEnterKey(event);
        }
        else {
            return;
        }
        event.preventDefault();
    }
    /**
     * @ignore
     * Called when the element's dimensions have changed
     * @param size dimension details
     * @returns {void}
     */
    resizedCallback(size) {
        super.resizedCallback(size);
        this.calculateContentMaxHeight(size);
    }
    /**
     * @returns template of loader if currently query loading
     */
    get loaderTemplate() {
        if (!this.loading) {
            return null;
        }
        return html `
      <div part="loader">
        <div part="backdrop"></div>
        <ef-loader size="medium"></ef-loader>
      </div>
    `;
    }
    /**
     * @returns template of moreResults
     */
    get moreResultsTemplate() {
        if (!this.moreResults) {
            return null;
        }
        return html `
      <ef-item id="moreResults" part="more-results">${this.highlightText(this.moreResults, this.moreSearchText, this.query)}</ef-item>
    `;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return html `
        <div part="header">
          <slot id="headerSlot" name="header"></slot>
        </div>
        <div id="content" part="content" @mousemove="${this.onItemMouseMove}" @mouseleave="${this.onItemMouseLeave}" @tap="${this.onItemMouseClick}">
          <slot id="contentSlot" @slotchange="${this.onSlotChange}"></slot>
          ${this.moreResultsTemplate}
        </div>
        <div part="footer">
          <slot id="footerSlot" name="footer"></slot>
        </div>
        ${this.loaderTemplate}
    `;
    }
    /**
     * Called once after the component is first rendered
     * @param changedProperties map of changed properties with old values
     * @returns {void}
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.addEventListener('tapstart', this.onItemMousedown);
    }
    /**
     * Called when the element’s DOM has been updated and rendered
     * @param changedProperties Properties that has changed
     * @returns shouldUpdate
     */
    shouldUpdate(changedProperties) {
        let result = super.shouldUpdate(changedProperties);
        result = result || this.shouldAutosuggestUpdate(changedProperties);
        return result;
    }
    /**
     * Called after the element’s DOM has been updated
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('suggestions')) {
            this.notifySuggestions();
        }
        this.changedCallbacks(changedProperties);
    }
    /**
     * inheritance callbacks
     */
    /**
     * Run when the slot has changed.
     * @param event Slot change query
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSlotChange(event) {
        const nodes = (this.contentSlot && this.contentSlot.assignedNodes()) || [];
        this.setOpened(this.attachTargetFocused && this.hasContent);
        // make a brave assumption that suggestions are populated as well
        const suggestions = this.suggestions;
        this.highlightItem(); // hide highlight
        this.suggestionMap.clear();
        nodes.forEach((node, idx) => {
            /* istanbul ignore next */
            if (node.nodeType !== Node.ELEMENT_NODE) {
                return;
            }
            const suggestion = suggestions[idx];
            if (this.highlightable(suggestion, node)) {
                this.suggestionMap.set(node, suggestion);
            }
        });
    }
    /**
     * 'suggestions-query' default action
     * @param event Suggestion query
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    suggestionsQueryAction(event) {
        this.query = this.attachTarget && this.attachTarget.value;
    }
    /**
     * 'item-select' default action
     * @param event Select action
     * @returns {void}
     */
    itemSelectAction(event) {
        const { detail: { query, suggestion } } = event;
        /* istanbul ignore next */
        if (this.attachTarget) {
            this.attachTarget.value = suggestion && (suggestion === null || suggestion === void 0 ? void 0 : suggestion.label) || query;
        }
    }
    /**
     * 'item-highlight' default action
     * @param event Highlight action
     * @returns {void}
     */
    itemHighlightAction(event) {
        const target = event.detail.target;
        const oldTarget = event.detail.oldTarget;
        if (target) {
            target.highlighted = true;
        }
        if (oldTarget) {
            oldTarget.highlighted = false;
        }
    }
    /**
     * 'suggestions-fetch-requested' default action
     * @param event Fetch request
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    suggestionsFetchRequestedAction(event) {
        // do nothing
    }
    /**
     * 'suggestions-clear-requested' default action
     * @param event Clear request
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    suggestionsClearRequestedAction(event) {
        this.suggestions = [];
    }
    /**
     * Add listeners to the attached target
     * By default `input`, 'keydown', 'focus' and 'blur' events are listened
     * @param event Attach add action
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    attachEventsAddAction(event) {
        const attachTarget = this.attachTarget;
        /* istanbul ignore next */
        if (!attachTarget) {
            return;
        }
        attachTarget.addEventListener('input', this.onInputValueChange);
        attachTarget.addEventListener('keydown', this.onInputKeyDown);
        attachTarget.addEventListener('blur', this.onInputBlur);
        attachTarget.addEventListener('focus', this.onInputFocus);
    }
    /**
     * Remove event listeners from the attached target
     * By default `input`, 'keydown', 'focus' and 'blur' events are listened
     * @param event Attach remove action
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    attachEventsRemoveAction(event) {
        const attachTarget = this.attachTarget;
        if (!attachTarget) {
            return;
        }
        attachTarget.removeEventListener('input', this.onInputValueChange);
        attachTarget.removeEventListener('keydown', this.onInputKeyDown);
        attachTarget.removeEventListener('blur', this.onInputBlur);
        attachTarget.removeEventListener('focus', this.onInputFocus);
    }
    /**
     * Call this method to fetch more results
     * @returns {void}
     */
    fetchMoreSuggestions() {
        this.dispatchSuggestionsFetchRequested('more-results');
    }
    /**
     * Highlight the item and remove old highlighted item
     * @param target Element to highlight. Pass null to just remove previous highlight
     * @param silent Do not fire a select event on highlight. Select should be fired on keyboard navigation
     * @returns {void}
     */
    highlightItem(target = null, silent = true) {
        if (this.highlightedItem !== target) {
            const oldTarget = this.highlightedItem;
            this.highlightedItem = target && this.canSelect(target) ? target : null;
            /**
             * @event item-highlight
             * Fired when an item gets highlighted or highlight is removed
             * @param {HTMLElement} [target] New highlight target or null
             * @param {*} [suggestion] New suggestion or null
             * @param {HTMLElement} [oldTarget] Old highlight target or null
             * @param {*} [oldSuggestion] Old suggestion or null
             */
            this.dispatchEventDefault(new CustomEvent('item-highlight', {
                cancelable: true,
                detail: {
                    target: this.highlightedItem,
                    suggestion: this.getSuggestionFor(this.highlightedItem),
                    oldTarget,
                    oldSuggestion: this.getSuggestionFor(oldTarget)
                }
            }), this.itemHighlightAction);
            if (!silent && target) {
                this.selectItem(target, 'navigation');
            }
        }
    }
    /**
     * Calculate more search text inner html
     * @param moreResults True if has more results
     * @param moreSearchText More search text template
     * @param query A query
     * @returns innerHTML
     */
    highlightText(moreResults, moreSearchText, query) {
        if (!moreResults) {
            return null;
        }
        return html `
      <span part="more-results-text">
        ${unsafeHTML(moreSearchText.replace(/{0\}/g, `<mark>${query ? query.toString() : ''}</mark>`))}
      </span>
      <span part="more-results-keys" slot="right"><kbd>SHIFT</kbd> + <kbd>ENTER</kbd></span>
    `;
    }
    /**
     * Call this method to request suggestions
     * @private
     * @param reason The reason to request query
     * @param debounce True to debounce
     * @returns {void}
     */
    requestSuggestions(reason, debounce = false) {
        this.dispatchSuggestionsQuery(reason);
        if (this.preservedQueryValue === this.query) { // if the query is the same do not re-issue the request, instead try to open auto suggest
            if (!this.opened && ((this.suggestions && this.suggestions.length) || this.moreResults)) {
                this.setOpened(true);
            }
            return;
        }
        this.preservedQueryValue = this.query;
        const dispatch = () => {
            if (this.attachTargetFocused) {
                this.dispatchSuggestionsFetchRequested(reason);
            }
        };
        if (debounce) {
            // debounce
            this.jobRunner.schedule(dispatch);
            return;
        }
        this.jobRunner.cancel();
        dispatch();
    }
    /**
     * All internal opened set events can be stoppable externally
     * Use this instead of setting opened directly
     * Protected method that can be used by managers or subclasses
     * @returns {void}
     */
    onOpened() {
        super.onOpened();
        document.addEventListener('tapstart', this.onOutsideClick);
    }
    /**
     * Run when the popup has closed, managers are de-registered
     * and closing transition has finished
     * @returns {void}
     */
    onClosed() {
        super.onClosed();
        this.restrictContentMaxHeight();
        document.removeEventListener('tapstart', this.onOutsideClick);
    }
    /**
     * enter key processing
     * @param event Enter
     * @returns {void}
     */
    onEnterKey(event) {
        if (!this.opened) {
            this.requestSuggestions('enter-pressed');
            return;
        }
        /* istanbul ignore next */
        if (this.loading) {
            return;
        }
        // more results
        if (this.moreResults && event.shiftKey) {
            this.fetchMoreSuggestions();
            return;
        }
        if (!this.highlightedItem) {
            this.setOpened(false);
            return;
        }
        this.highlightedItem && this.selectItem(this.highlightedItem, 'enter');
    }
    /**
     * Up key processing
     * @returns {void}
     */
    onUpKey() {
        if (!this.opened) {
            this.requestSuggestions('suggestions-revealed');
            return;
        }
        /* istanbul ignore next */
        if (this.loading) {
            return;
        }
        this.focusElement(-1);
    }
    /**
     * Down key processing
     * @returns {void}
     */
    onDownKey() {
        if (!this.opened) {
            this.requestSuggestions('suggestions-revealed');
            return;
        }
        /* istanbul ignore next */
        if (this.loading) {
            return;
        }
        this.focusElement(1);
    }
    /**
     * Esc key processing
     * @returns {void}
     */
    onEscKey() {
        if (this.opened) {
            // if preserved value exists, set it back
            this.dispatchItemSelect('reset');
            this.setOpened(false);
            return;
        }
        if (this.query) {
            this.suspend();
            this.dispatchItemSelect('clear');
            this.resume();
            this.requestSuggestions('escape-pressed');
        }
    }
    /**
     * Highlight it on mouse move
     * @param event for item
     * @returns {void}
     */
    onItemMouseMove(event) {
        this.highlightItem(this.getTarget(event));
    }
    /**
     * @param target Item to check
     * @returns true if an item can be highlighted and selectable
     */
    canSelect(target) {
        return this.suggestionMap.has(target) || (this.moreResults && target === this.moreResultsItem);
    }
    /**
     * Get suggestion for target
     * @param target Target to check
     * @returns suggestion
     */
    getSuggestionFor(target) {
        return target && this.suggestionMap.get(target);
    }
    /**
     * Select the item from the list
     * @param target Element to select
     * @param method 'click', 'enter' or 'navigation'
     * @returns {void}
     */
    selectItem(target, method) {
        if (this.canSelect(target)) {
            // more results
            if (target === this.moreResultsItem) {
                this.dispatchItemSelect('reset');
                switch (method) {
                    case 'click':
                    case 'enter':
                        this.fetchMoreSuggestions();
                        break;
                    default:
                    // node default
                }
                return;
            }
            this.dispatchItemSelect(method, target);
            switch (method) {
                case 'click':
                case 'enter':
                    this.dispatchSuggestionsClearRequested();
                    break;
                default:
                // node default
            }
        }
    }
    /**
     * Get the list of rendered suggestions
     * @returns renderedSuggestions
     */
    get renderedSuggestions() {
        const keys = [];
        this.suggestionMap.forEach((value, key) => {
            keys.push(key);
        });
        if (this.moreResults && this.moreResultsItem) {
            keys.push(this.moreResultsItem);
        }
        return keys;
    }
    /**
     * Fired when mouse leave event happens. Remove highlight from the item
     * @returns {void}
     */
    /* istanbul ignore next */
    onItemMouseLeave() {
        this.highlightItem(); // remove highlight
    }
    /**
     * Fired when mouse click event happens. Select an item
     * @param event Mouse click event
     * @returns {void}
     */
    onItemMouseClick(event) {
        this.selectItem(this.getTarget(event), 'click');
    }
    /**
     * check some of native properties was modified
     * @param changedProperties properties that was changed
     * @returns true if some of changedProperties modified
     */
    shouldAutosuggestUpdate(changedProperties) {
        return changedProperties.has('attach') || changedProperties.has('suggestions') || changedProperties.has('moreResults') || changedProperties.has('loading') || changedProperties.has('debounceRate');
    }
    changedCallbacks(changedProperties) {
        if (changedProperties.has('attach')) {
            this.attachChangeRunner.schedule(this.attachChangeFrameCallback);
        }
        if (changedProperties.has('moreResults')) {
            this.moreResultsRunner.schedule(this.moreResultsFrameCallback);
        }
        if (changedProperties.has('loading')) {
            this.loadingRunner.schedule(this.loadingFrameCallback);
        }
        if (changedProperties.has('opened')) {
            this.handleAfterOpened();
        }
        if (changedProperties.has('debounceRate')) {
            this.debounceRateChange();
        }
    }
    /**
     * handle highlight after open
     * @returns {void}
     */
    handleAfterOpened() {
        this.highlightItem(); // hide highlight for case more-result
    }
    /**
     * recreate debouncer if dobounceRate was changed
     * @returns {void}
     */
    debounceRateChange() {
        this.jobRunner.fulfil();
        this.jobRunner = new TimeoutTaskRunner(this.debounceRate);
    }
    /**
     * Dispatch attach events remove action event
     * @returns {void}
     */
    dispatchAttachEventsRemoveAction() {
        if (this.attachTarget) {
            /**
             * @event remove-attach-target-events
             * Fired when attach has been removed.
             * Remove attach target listeners.
             */
            this.dispatchEventDefault(new CustomEvent('remove-attach-target-events', {
                cancelable: true
            }), this.attachEventsRemoveAction);
            this.attachTarget = null;
        }
    }
    /**
     * Run when suggestions get changed
     * NB: this function is only run when htmlRenderer is set to false
     * @returns {void}
     */
    suggestionsChange() {
        this.contentSlot && this.contentSlot.assignedNodes().forEach(this.removeChildNode);
        this.appendChild(this.suggestions.reduce(this.generateSuggestionsFragment, document.createDocumentFragment()));
    }
    /**
     * Dispatch item select event
     * The event may change input, therefore suspend listening
     * @param method Select method
     * @param target Target for suggestion
     * @returns {void}
     */
    dispatchItemSelect(method, target = null) {
        this.suspend();
        /**
         * @event item-select
         * Fired when an item gets selected
         * @param {AutosuggestMethodType} method Select method
         * @param {HTMLElement} target Selection target
         * @param {*} [suggestion] Selected suggestion or null
         * @param {*} [query] Saved query object or null
         */
        this.dispatchEventDefault(new CustomEvent('item-select', {
            cancelable: true,
            detail: {
                method,
                target,
                suggestion: this.getSuggestionFor(target),
                query: method === 'clear' ? null : this.preservedQueryValue
            }
        }), this.itemSelectAction);
        this.resume();
    }
    /**
     * fire 'suggestions-fetch-requested' event
     * @param reason Dispatch reason
     * @returns {void}
     */
    dispatchSuggestionsFetchRequested(reason) {
        /**
         * @event suggestions-fetch-requested
         * Fired when auto suggest requests the data.
         * @param {String} query Input query
         * @param {} reason The reason to fetch data
         */
        this.dispatchEventDefault(new CustomEvent('suggestions-fetch-requested', {
            cancelable: true,
            detail: {
                query: this.query,
                reason
            }
        }), this.suggestionsFetchRequestedAction);
    }
    /**
     * fire 'suggestions-clear-requested' event
     * @returns {void}
     */
    dispatchSuggestionsClearRequested() {
        this.preservedQueryValue = null;
        /**
         * @event suggestions-clear-requested
         * Fired when auto suggest requests to clear the data.
         * If used in reactive application, prevent default and set suggestions to []
         */
        this.dispatchEventDefault(new CustomEvent('suggestions-clear-requested', {
            cancelable: true
        }), this.suggestionsClearRequestedAction);
    }
    /**
     * fire 'suggestions-query' event
     * @param reason Dispatch reason
     * @returns {void}
     */
    dispatchSuggestionsQuery(reason) {
        /**
         * @event suggestions-query
         * Fired when input value has changed and the query must be set.
         * @param reason The reason to request query
         */
        this.dispatchEventDefault(new CustomEvent('suggestions-query', {
            cancelable: true,
            detail: {
                reason
            }
        }), this.suggestionsQueryAction);
    }
    /**
     * Dispatch event and run default action if preventDefault is not run
     * @param event Custom event to dispatch
     * @param defaultAction Default action to run
     * @returns {void}
     */
    dispatchEventDefault(event, defaultAction) {
        this.dispatchEvent(event);
        if (!event.defaultPrevented) {
            defaultAction.call(this, event);
        }
    }
    /**
     * Check if the attach target is in focus
     * @returns focused true if attach target is focused
     */
    get attachTargetFocused() {
        return this.isFocused(document.activeElement) || this.attachTarget === this.lastActiveElement;
    }
    /**
     * Walk through shadowDOM to find activeElement
     * @param activeElement currently active document element
     * @returns true if activeElement is attached target
     */
    isFocused(activeElement) {
        if (this.attachTarget === activeElement) {
            return true;
        }
        if (activeElement && activeElement.shadowRoot) {
            return this.isFocused(activeElement.shadowRoot.activeElement);
        }
        return false;
    }
    /**
     * Check if the autosuggest has content
     * @returns content exists
     */
    get hasContent() {
        if (this.moreResults) {
            return true;
        }
        // Space characters (e.g. space, tab, EOL) don't count as having content
        const nodes = this.contentSlot && this.contentSlot.assignedNodes() || [];
        return nodes.some(({ nodeType, textContent }) => nodeType === Node.ELEMENT_NODE || (textContent && textContent.search(/\S/) >= 0)); // If node is element always return true
    }
    /**
     * Suspend updating suggestions on value-changed
     * Autosuggest is suspended on select
     * @returns {void}
     */
    suspend() {
        this.suspendedKey = true;
    }
    /**
     * Resume suspended autosuggest
     * @returns {void}
     */
    resume() {
        this.suspendedKey = false;
    }
    /**
     * Check if the autosuggest is suspended
     * @returns {Boolean} suspended
     */
    get suspended() {
        return this.suspendedKey;
    }
    /**
     * Event target is not always what we want. Try to find the best target to process further
     * @param event Mouse click hover event
     * @returns target
     */
    getTarget(event) {
        const path = event.composedPath();
        for (let i = 0; i <= path.length; i += 1) {
            const node = path[i];
            /* istanbul ignore next */
            if (node.nodeType !== Node.ELEMENT_NODE) {
                continue;
            }
            if (this.canSelect(node)) {
                return node;
            }
            /* istanbul ignore next */
            if (node === this) {
                return event.target;
            }
        }
        return event.target;
    }
    /**
     * Highlight next or previous highlightable element if present
     * @param {Number} direction -1 - up/next; 1 - down/previous
     * @returns {void}
     */
    focusElement(direction) {
        // focus is spread across
        const highlightedItem = this.highlightedItem;
        const children = this.renderedSuggestions;
        const idx = highlightedItem ? children.indexOf(highlightedItem) : -1;
        let focusElement;
        if (direction === 1) {
            focusElement = idx === -1 ? children[0] : children[idx + 1];
        }
        else {
            focusElement = idx === -1 ? children[children.length - 1] : children[idx - 1];
        }
        if (!focusElement) {
            focusElement = direction === 1 ? children[0] : children[children.length - 1];
        }
        if (focusElement) {
            this.highlightItem(focusElement, false);
            focusElement.scrollIntoView({
                behavior: 'auto',
                block: 'nearest'
            });
        }
    }
    /**
     * @returns {void}
     */
    notifySuggestions() {
        this.dispatchEvent(new CustomEvent('suggestions-changed', {
            detail: {
                value: this.suggestions
            }
        }));
        if (!this.htmlRenderer) {
            this.suggestionsChange();
        }
    }
    /**
     * Set the width
     * @returns {void}
     */
    refit() {
        super.refit();
        if (this.positionTarget && this.positionTarget instanceof HTMLElement) {
            const rect = this.positionTarget.getBoundingClientRect();
            this.style.minWidth = `${rect.width}px`;
        }
        this.restrictContentMaxHeight();
    }
    /**
     * IE11 only: Restrict maximum height of content element
     * @param [maxHeight] Maximum height of content element
     * @returns {void}
     */
    /* istanbul ignore next */
    restrictContentMaxHeight(maxHeight) {
        if (!isIE) {
            return;
        }
        if (maxHeight) {
            this.contentElement && this.contentElement.style.setProperty('max-height', `${maxHeight}px`);
        }
        else {
            this.contentElement && this.contentElement.style.removeProperty('max-height');
        }
    }
    /**
     * IE11 only: Calculate the maxHeight of content element
     * @param size Size of the dialog
     * @returns {void}
     */
    /* istanbul ignore next */
    calculateContentMaxHeight(size) {
        var _a, _b, _c;
        if (!isIE) {
            return;
        }
        const headerRect = (_a = this.headerElement) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        const footerRect = (_b = this.footerElement) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
        const contentRect = (_c = this.contentElement) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect();
        const dialogHeight = size.height;
        const headerHeight = headerRect ? headerRect.height : 0;
        const footerHeight = footerRect ? footerRect.height : 0;
        const contentHeight = contentRect ? contentRect.height : 0;
        if (headerHeight + footerHeight + contentHeight > dialogHeight) {
            this.restrictContentMaxHeight(dialogHeight - footerHeight - headerHeight);
        }
    }
};
Autosuggest.defaultDebounceRate = 100;
Autosuggest.defaultMoreSearchText = 'More results for {0}';
__decorate([
    property({ type: String })
], Autosuggest.prototype, "attach", void 0);
__decorate([
    property({ type: Boolean, attribute: 'request-on-focus' })
], Autosuggest.prototype, "requestOnFocus", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'more-results' })
], Autosuggest.prototype, "moreResults", void 0);
__decorate([
    property({ type: String, attribute: 'more-search-text' })
], Autosuggest.prototype, "moreSearchText", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Autosuggest.prototype, "loading", void 0);
__decorate([
    property({ type: Object, attribute: false })
], Autosuggest.prototype, "query", void 0);
__decorate([
    property({ type: Number, attribute: 'debounce-rate' })
], Autosuggest.prototype, "debounceRate", void 0);
__decorate([
    property({ type: Function, attribute: false })
], Autosuggest.prototype, "renderer", void 0);
__decorate([
    property({ type: Function, attribute: false })
], Autosuggest.prototype, "highlightable", void 0);
__decorate([
    property({ type: Array, attribute: false })
], Autosuggest.prototype, "suggestions", void 0);
__decorate([
    property({ type: Boolean, attribute: 'html-renderer' })
], Autosuggest.prototype, "htmlRenderer", void 0);
__decorate([
    query('#moreResults')
], Autosuggest.prototype, "moreResultsItem", void 0);
__decorate([
    query('#contentSlot')
], Autosuggest.prototype, "contentSlot", void 0);
__decorate([
    query('[part="content"]')
], Autosuggest.prototype, "contentElement", void 0);
__decorate([
    query('[part="header"]')
], Autosuggest.prototype, "headerElement", void 0);
__decorate([
    query('[part="footer"]')
], Autosuggest.prototype, "footerElement", void 0);
Autosuggest = Autosuggest_1 = __decorate([
    customElement('ef-autosuggest', {
        alias: 'emerald-autosuggest'
    })
], Autosuggest);
export { Autosuggest };
//# sourceMappingURL=index.js.map