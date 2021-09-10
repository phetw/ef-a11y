import { JSXInterface } from '../jsx';
import { CSSResult, ElementSize, PropertyValues, TemplateResult } from '@refinitiv-ui/core';
import { Overlay } from '../overlay';
import '../loader';
import { AutosuggestTargetElement, AutosuggestHighlightable, AutosuggestMethodType, AutosuggestQuery, AutosuggestRenderer, AutosuggestReason, AutosuggestItem, AutosuggestSelectItemEvent, AutosuggestHighlightItemEvent } from './helpers/types';
export { AutosuggestTargetElement, AutosuggestHighlightable, AutosuggestMethodType, AutosuggestQuery, AutosuggestRenderer, AutosuggestReason, AutosuggestItem } from './helpers/types';
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
export declare class Autosuggest extends Overlay {
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
    /**
     * A basic regexp matching pattern to replace text based on string input.
     * @param text Value to test against
     * @param query The query
     * @param [pattern=<mark>$1</mark>] Provide a pattern to replace string
     * @returns innerHTML The text that can be used as innerHTML
     */
    static QueryWordSelect(text: string, query?: string, pattern?: string): string;
    /**
     * Build item element from data object
     * @param suggestion Suggestion data
     * @param query A query data (usually string, but could be any entity )
     * @returns item
     */
    static ItemRenderer(suggestion: AutosuggestItem, query: AutosuggestQuery | null): HTMLElement;
    /**
     * Replace forbidden characters in regular expressions
     * @param string A string to process
     * @returns clean string
     */
    static EscapeRegExp(string?: string): string;
    /**
     * Check whether item can be highlighted
     * @param suggestion Suggestion object
     * @param target item element
     * @returns highlightable
     */
    static ItemHighlightable(suggestion: AutosuggestItem, target: HTMLElement): boolean;
    static readonly defaultDebounceRate = 100;
    static readonly defaultMoreSearchText = "More results for {0}";
    /**
     * An HTML Element or CSS selector
     * @type {AutosuggestTargetElement | string | null}
     */
    attach: AutosuggestTargetElement | string | null;
    /**
     * Request suggestions when attach target is focused
     */
    requestOnFocus: boolean;
    /**
     * If set to true display 'Has more results' item
     */
    moreResults: boolean;
    /**
     * Custom text for More Search
     */
    moreSearchText: string;
    /**
     * If set to true show loading mask
     */
    loading: boolean;
    /**
     * An object that represents a query from attach target
     * @type {AutosuggestQuery | null}
     */
    query: AutosuggestQuery | null;
    /**
     * Debounce rate in ms of the filter as a number.
     * Used to throttle the filter rate so as not to trigger unneeded filtering
     * @default 100
     */
    debounceRate: number;
    /**
     * A renderer applied to suggestion.
     * By default a render maps data to item attributes
     * @type {AutosuggestRenderer}
     */
    renderer: AutosuggestRenderer;
    /**
     * A function that is applied to every suggestion during the render process
     * to say whether the item can be highlighted and selected. Only items that return true are considered.
     * By default the function checks for `item` `highlightable` property.
     * @type {AutosuggestHighlightable}
     */
    highlightable: AutosuggestHighlightable;
    /**
     * A list of suggestion items
     * @type {AutosuggestItem[]}
     */
    suggestions: AutosuggestItem[];
    /**
     * If set to true, the render function is not called. Instead the wrapper element
     * should populate and destroy suggestion elements. Rendering items manually
     * may have performance benefits in frameworks that use virtual DOM (such as `Vue`, `React`, `hyperHTML` and others)
     */
    htmlRenderer: boolean;
    protected moreResultsItem?: HTMLElement | null;
    private contentSlot?;
    private contentElement?;
    private headerElement?;
    private footerElement?;
    private suggestionMap;
    protected highlightedItem: HTMLElement | null;
    protected attachTarget: AutosuggestTargetElement | null;
    private lastActiveElement;
    private suspendedKey;
    private preservedQueryValue;
    private focusSuspended;
    private jobRunner;
    private attachChangeRunner;
    private moreResultsRunner;
    private loadingRunner;
    /**
     * creates auto-suggest
     */
    constructor();
    disconnectedCallback(): void;
    /**
     * Run when attach target value changes.
     * @param event by default `value-changed` event is listened
     * @returns {void}
     */
    onInputValueChange(event: Event): void;
    /**
     * Run when input has lost focus
     * @param event by default `blur` event is listened
     * @returns {void}
     */
    onInputBlur(event: FocusEvent): void;
    /**
     * Run when input received focus
     * @param event by default `focus` event is listened
     * @returns {void}
     */
    onInputFocus(event: FocusEvent): void;
    /**
     * Run when input key down event has happened
     * @param event by default `keydown` event is listened
     * @returns {void}
     */
    onInputKeyDown(event: KeyboardEvent): void;
    /**
     * @ignore
     * Called when the element's dimensions have changed
     * @param size dimension details
     * @returns {void}
     */
    resizedCallback(size: ElementSize): void;
    /**
     * @returns template of loader if currently query loading
     */
    protected get loaderTemplate(): TemplateResult | null;
    /**
     * @returns template of moreResults
     */
    protected get moreResultsTemplate(): TemplateResult | null;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    protected render(): TemplateResult;
    /**
     * Called once after the component is first rendered
     * @param changedProperties map of changed properties with old values
     * @returns {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * Called when the element’s DOM has been updated and rendered
     * @param changedProperties Properties that has changed
     * @returns shouldUpdate
     */
    protected shouldUpdate(changedProperties: PropertyValues): boolean;
    /**
     * Called after the element’s DOM has been updated
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * inheritance callbacks
     */
    /**
     * Run when the slot has changed.
     * @param event Slot change query
     * @returns {void}
     */
    protected onSlotChange(event: Event): void;
    /**
     * 'suggestions-query' default action
     * @param event Suggestion query
     * @returns {void}
     */
    protected suggestionsQueryAction(event: CustomEvent): void;
    /**
     * 'item-select' default action
     * @param event Select action
     * @returns {void}
     */
    protected itemSelectAction(event: AutosuggestSelectItemEvent): void;
    /**
     * 'item-highlight' default action
     * @param event Highlight action
     * @returns {void}
     */
    protected itemHighlightAction(event: AutosuggestHighlightItemEvent): void;
    /**
     * 'suggestions-fetch-requested' default action
     * @param event Fetch request
     * @returns {void}
     */
    protected suggestionsFetchRequestedAction(event: CustomEvent): void;
    /**
     * 'suggestions-clear-requested' default action
     * @param event Clear request
     * @returns {void}
     */
    protected suggestionsClearRequestedAction(event: CustomEvent): void;
    /**
     * Add listeners to the attached target
     * By default `input`, 'keydown', 'focus' and 'blur' events are listened
     * @param event Attach add action
     * @returns {void}
     */
    protected attachEventsAddAction(event: CustomEvent): void;
    /**
     * Remove event listeners from the attached target
     * By default `input`, 'keydown', 'focus' and 'blur' events are listened
     * @param event Attach remove action
     * @returns {void}
     */
    protected attachEventsRemoveAction(event: CustomEvent): void;
    /**
     * Call this method to fetch more results
     * @returns {void}
     */
    protected fetchMoreSuggestions(): void;
    /**
     * Highlight the item and remove old highlighted item
     * @param target Element to highlight. Pass null to just remove previous highlight
     * @param silent Do not fire a select event on highlight. Select should be fired on keyboard navigation
     * @returns {void}
     */
    protected highlightItem(target?: HTMLElement | null, silent?: boolean): void;
    /**
     * Calculate more search text inner html
     * @param moreResults True if has more results
     * @param moreSearchText More search text template
     * @param query A query
     * @returns innerHTML
     */
    protected highlightText(moreResults: boolean, moreSearchText: string, query: AutosuggestQuery | null): TemplateResult | null;
    /**
     * Call this method to request suggestions
     * @private
     * @param reason The reason to request query
     * @param debounce True to debounce
     * @returns {void}
     */
    protected requestSuggestions(reason: AutosuggestReason, debounce?: boolean): void;
    /**
     * All internal opened set events can be stoppable externally
     * Use this instead of setting opened directly
     * Protected method that can be used by managers or subclasses
     * @returns {void}
     */
    protected onOpened(): void;
    /**
     * Run when the popup has closed, managers are de-registered
     * and closing transition has finished
     * @returns {void}
     */
    protected onClosed(): void;
    /**
     * enter key processing
     * @param event Enter
     * @returns {void}
     */
    protected onEnterKey(event: KeyboardEvent): void;
    /**
     * Up key processing
     * @returns {void}
     */
    protected onUpKey(): void;
    /**
     * Down key processing
     * @returns {void}
     */
    protected onDownKey(): void;
    /**
     * Esc key processing
     * @returns {void}
     */
    protected onEscKey(): void;
    /**
     * Highlight it on mouse move
     * @param event for item
     * @returns {void}
     */
    protected onItemMouseMove(event: MouseEvent): void;
    /**
     * @param target Item to check
     * @returns true if an item can be highlighted and selectable
     */
    protected canSelect(target: HTMLElement): boolean;
    /**
     * Get suggestion for target
     * @param target Target to check
     * @returns suggestion
     */
    protected getSuggestionFor(target: HTMLElement | null): AutosuggestItem;
    /**
     * Select the item from the list
     * @param target Element to select
     * @param method 'click', 'enter' or 'navigation'
     * @returns {void}
     */
    protected selectItem(target: HTMLElement, method: AutosuggestMethodType): void;
    /**
     * Get the list of rendered suggestions
     * @returns renderedSuggestions
     */
    protected get renderedSuggestions(): Array<HTMLElement>;
    /**
     * Fired when mouse leave event happens. Remove highlight from the item
     * @returns {void}
     */
    protected onItemMouseLeave(): void;
    /**
     * Fired when mouse click event happens. Select an item
     * @param event Mouse click event
     * @returns {void}
     */
    protected onItemMouseClick(event: MouseEvent): void;
    /**
     * check some of native properties was modified
     * @param changedProperties properties that was changed
     * @returns true if some of changedProperties modified
     */
    private shouldAutosuggestUpdate;
    /**
     * Run when document click event happens.
     * @param  event object
     * @returns {void}
     */
    private onOutsideClick;
    private changedCallbacks;
    /**
     * handle highlight after open
     * @returns {void}
     */
    protected handleAfterOpened(): void;
    /**
     * recreate debouncer if dobounceRate was changed
     * @returns {void}
     */
    private debounceRateChange;
    /**
     * fire event and reinit listeners if attach was changed
     * @returns {void}
     */
    private attachChangeFrameCallback;
    /**
     * Dispatch attach events remove action event
     * @returns {void}
     */
    private dispatchAttachEventsRemoveAction;
    /**
     * set opened state due to status of focus and content
     * @returns {void}
     */
    private moreResultsFrameCallback;
    /**
     * Run when suggestions get changed
     * NB: this function is only run when htmlRenderer is set to false
     * @returns {void}
     */
    private suggestionsChange;
    /**
     * Dispatch item select event
     * The event may change input, therefore suspend listening
     * @param method Select method
     * @param target Target for suggestion
     * @returns {void}
     */
    private dispatchItemSelect;
    /**
     * fire 'suggestions-fetch-requested' event
     * @param reason Dispatch reason
     * @returns {void}
     */
    private dispatchSuggestionsFetchRequested;
    /**
     * fire 'suggestions-clear-requested' event
     * @returns {void}
     */
    private dispatchSuggestionsClearRequested;
    /**
     * fire 'suggestions-query' event
     * @param reason Dispatch reason
     * @returns {void}
     */
    private dispatchSuggestionsQuery;
    /**
     * Dispatch event and run default action if preventDefault is not run
     * @param event Custom event to dispatch
     * @param defaultAction Default action to run
     * @returns {void}
     */
    private dispatchEventDefault;
    /**
     * Check if the attach target is in focus
     * @returns focused true if attach target is focused
     */
    private get attachTargetFocused();
    /**
     * Walk through shadowDOM to find activeElement
     * @param activeElement currently active document element
     * @returns true if activeElement is attached target
     */
    private isFocused;
    /**
     * Check if the autosuggest has content
     * @returns content exists
     */
    private get hasContent();
    /**
     * Suspend updating suggestions on value-changed
     * Autosuggest is suspended on select
     * @returns {void}
     */
    private suspend;
    /**
     * Resume suspended autosuggest
     * @returns {void}
     */
    private resume;
    /**
     * Check if the autosuggest is suspended
     * @returns {Boolean} suspended
     */
    private get suspended();
    /**
     * Event target is not always what we want. Try to find the best target to process further
     * @param event Mouse click hover event
     * @returns target
     */
    private getTarget;
    /**
     * Highlight next or previous highlightable element if present
     * @param {Number} direction -1 - up/next; 1 - down/previous
     * @returns {void}
     */
    private focusElement;
    /**
     * initialize opened state depends on focus and content
     * @returns {void}
     */
    private loadingFrameCallback;
    /**
     * @returns {void}
     */
    private notifySuggestions;
    private removeChildNode;
    private generateSuggestionsFragment;
    /**
     * Set the width
     * @returns {void}
     */
    refit(): void;
    /**
     * Fired when mouse down event happens. Select the item
     * @param event Mouse down event
     * @returns {void}
     */
    private onItemMousedown;
    /**
     * IE11 only: Restrict maximum height of content element
     * @param [maxHeight] Maximum height of content element
     * @returns {void}
     */
    private restrictContentMaxHeight;
    /**
     * IE11 only: Calculate the maxHeight of content element
     * @param size Size of the dialog
     * @returns {void}
     */
    private calculateContentMaxHeight;
}
//# sourceMappingURL=index.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-autosuggest': Autosuggest;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-autosuggest': Partial<Autosuggest> | JSXInterface.HTMLAttributes<Autosuggest>;
    }
  }
}

export {};
