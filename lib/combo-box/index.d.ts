import { JSXInterface } from '../jsx';
import { ControlElement, CSSResult, PropertyValues, TapEvent, TemplateResult, StyleMap } from '@refinitiv-ui/core';
import { TranslateDirective } from '@refinitiv-ui/translate';
import { AnimationTaskRunner, CollectionComposer, DataItem } from '@refinitiv-ui/utils';
import '@refinitiv-ui/phrasebook/lib/locale/en/combo-box';
import { ValueChangedEvent } from '../events';
import '../icon';
import '../overlay';
import '../list';
import '../pill';
import '../text-field';
import { List, ListRenderer as ComboBoxRenderer } from '../list';
import { ItemData } from '../item';
import { TextField } from '../text-field';
import { ComboBoxData, ComboBoxFilter } from './helpers/types';
import { CustomKeyboardEvent } from './helpers/keyboard-event';
export { ComboBoxRenderer, ComboBoxFilter, ComboBoxData };
/**
 * Combines a popup with a filterable selection list
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @attr {string} name - Set name of the element
 * @prop {string} [name=''] - Set name of the element
 *
 * @fires value-changed - Dispatched when value changes
 * @fires query-changed - Dispatched when query changes
 * @fires opened-changed - Dispatched when opened state changes
 */
export declare class ComboBox<T extends DataItem = ItemData> extends ControlElement {
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
     * Custom filter for static data
     * Set this to null when data is filtered externally, eg XHR
     * @type {ComboBoxFilter<T> | null}
     */
    filter: ComboBoxFilter<T> | null;
    /**
     * Renderer used to render list item elements
     * @type {ComboBoxRenderer}
     */
    renderer: ComboBoxRenderer;
    private _multiple;
    /**
     * Multiple selection mode
     * @param multiple true to set multiple mode
     */
    set multiple(multiple: boolean);
    get multiple(): boolean;
    /**
     * Track opened state of popup
     */
    opened: boolean;
    /**
     * Placeholder for input field
     */
    placeholder: string;
    /**
     * Show clears button
     */
    clears: boolean;
    private _freeText;
    /**
     * Allow to enter any value
     * @param freeText true to set freeText mode
     */
    set freeText(freeText: boolean);
    get freeText(): boolean;
    /**
     * Set state to error
     */
    error: boolean;
    /**
     * Set state to warning
     */
    warning: boolean;
    private _queryDebounceRate;
    private queryDebouncer;
    /**
     * Control query rate, defaults to 0
     */
    get queryDebounceRate(): number;
    set queryDebounceRate(value: number);
    private _data;
    /**
     * Data array to be displayed
     * @type {ComboBoxData<T>}
     */
    get data(): ComboBoxData<T>;
    set data(value: ComboBoxData<T>);
    /**
     * `value` always initialised before `data`, so it cannot query and select items when using attribute.
     * This variable is to store value for selecting a data item after data has been initialised.
     */
    private cachedValue;
    /**
     * Returns the first selected item value.
     * Use `values` when multiple selection mode is enabled.
     */
    get value(): string;
    set value(value: string);
    /**
     * Returns a values collection of the currently
     * selected item values
     * @type {string[]}
     */
    get values(): string[];
    set values(values: string[]);
    /**
     * Update composer values.
     * @param newValues new values
     * @returns {void}
     */
    protected updateComposerValues(newValues: string[]): void;
    private _query;
    /**
     * Query string applied to combo-box
     * Set via internal text-field input
     * @readonly
     */
    get query(): string | null;
    set query(query: string | null);
    /**
     * Label of selected value
     * @returns Label to use, defaults to empty string
     * @readonly
     */
    get label(): string;
    /**
     * Composer used to query and modify item state.
     */
    protected composer: CollectionComposer<T>;
    /**
     * Initiate one time popup rendering
     */
    protected lazyRendered: boolean;
    /**
     * Throttle popup resizing
     */
    protected resizeThrottler: AnimationTaskRunner;
    /**
     * Input text to display in text field while typing
     * Use because of query debouncer to avoid input to be not in sync with query
     */
    protected inputText: string;
    /**
     * Used to store free text value
     * If freeText mode is defined
     */
    protected freeTextValue: string;
    /**
     * Hold popup styling applied on open
     */
    protected popupDynamicStyles: StyleMap;
    /**
     * Internal reference to text-field element
     */
    protected inputEl: TextField;
    /**
     * Internal reference to list element
     */
    protected listEl?: List<T>;
    /**
     * Internal reference to toggle button
     */
    protected toggleButtonEl: HTMLElement;
    /**
     * Internal reference to clears button
     */
    protected clearsButtonEl?: HTMLElement;
    /**
     * Use to call request update when CC changes its value
     * @returns {void}
     */
    protected modificationHandler: () => void;
    private _resolvedData;
    /**
     * Get resolved data (if possible)
     */
    protected get resolvedData(): T[];
    /**
     * Set resolved data
     * @param value resolved data
     */
    protected set resolvedData(value: T[]);
    private dataPromiseCounter;
    /**
     * Used to resolve data when set as a promise
     * @param data Data promise
     * @returns Promise<void>
     */
    protected resolveDataPromise(data: ComboBoxData<T>): Promise<void>;
    /**
     * The the values from composer ignoring freeTextValue
     */
    protected get composerValues(): string[];
    /**
     * Mark combobox with loading flag
     * Used in conjunction with data promise
     */
    protected loading: boolean;
    /**
     * Used for translations
     */
    protected t: TranslateDirective;
    /**
     * Return currently selected items
     * This is distinct from values as for controls with persistence features
     * it can be used to show current selection count and get the selection labels
     * @returns List of selected items
     */
    protected get selection(): T[];
    /**
     * Count of selected items
     * @returns Has selection
     */
    protected get selectionCount(): number;
    /**
     * Determine if list has visible items
     * @returns List has visible items or not
     */
    protected get listHasVisibleItems(): boolean;
    /**
     * Selected item
     * @returns Has selection
     */
    protected get selectedItem(): T | undefined;
    /**
     * Get a list of selected item labels
     * @returns Has selection
     */
    protected get selectedLabels(): string[];
    /**
     * Utility method  - ensures correct composer is being listened to
     * @returns {void}
     */
    protected listenToComposer(): void;
    /**
     * Updates the element
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    protected update(changedProperties: PropertyValues): void;
    /**
     * Called once after the component is first rendered
     * @param changedProperties map of changed properties with old values
     * @returns {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * Sets opened state and fires event
     * Use this to set opened state when user interacts to the component
     * @param opened True if opened
     * @returns {void}
     */
    protected setOpened(opened: boolean): void;
    /**
     * Requests an update after a composer modification.
     * @returns {void}
     */
    protected modificationUpdate(): void;
    /**
     * Queries the composer for data items
     * @param engine Composer query engine
     * @returns Collection of matched items
     */
    protected queryItems(engine: (item: T, composer: CollectionComposer<T>) => boolean): readonly T[];
    /**
     * Queries the composer for data items,
     * matching by property value.
     * @param property Property name to query
     * @param value Property value to match against
     * @returns Collection of matched items
     */
    protected queryItemsByPropertyValue<K extends keyof T>(property: K, value: T[K]): readonly T[];
    /**
     * Gets the property value of an item
     * @param item Original data item
     * @param property Property name to get the value of
     * @returns Value of the property
     */
    protected getItemPropertyValue<K extends keyof T>(item: T, property: K): T[K];
    /**
     * Sets the property value of an item
     * @param item Original data item
     * @param property Property name to set the value of
     * @param value New value of the property
     * @returns {void}
     */
    protected setItemPropertyValue<K extends keyof T>(item: T, property: K, value: T[K]): void;
    /**
     * Set width on popup using parent and --list-max-width if set
     * @returns {void}
     */
    protected opening(): void;
    /**
     * Scrolls to the currently selected item
     * @returns {void}
     */
    protected scrollToSelected(): void;
    /**
     * Highlights the item
     * @param item data item to highlight
     * @returns {void}
     */
    protected highlightItem(item: T): void;
    /**
     * Clears any highlighted items
     * @returns {void}
     */
    protected clearHighlighted(): void;
    /**
     * Popup has to use max width if --list-max-width specified
     * otherwise, popup should have same width as control or wider
     * @returns {void}
     */
    protected restrictPopupWidth(): void;
    /**
     * Set the query string and run `query-change` event
     * @param query query
     * @returns void
     */
    protected setQuery(query: string): void;
    /**
     * Reset the input text to match label
     * @returns {void}
     */
    protected resetInput(): void;
    /**
     * Filter the internal items by query
     * Changes items' hidden state
     * @returns {void}
     */
    protected filterItems(): void;
    /**
     * Highlight the selected item or the first available item
     * @returns {void}
     */
    protected highlightFirstItem(): void;
    /**
     * Check if an item can be highlighted
     * @param item Collection composer item
     * @param composer Collection composer
     * @returns can highlight
     */
    protected canHighlightItem(item: T, composer: CollectionComposer<T>): boolean;
    /**
     * https://github.com/juggle/resize-observer/issues/42
     *
     * This event ensures that ResizeObserver picks up resize events
     * when popup is deeply nested inside shadow root.
     * TODO: remove this workaround once ResizeObserver handles shadow root scenario
     * @returns {void}
    */
    protected forcePopupLayout(): void;
    /**
     * Shift focus back to input.
     * This method is required to prevent popup from focusing
     * @returns {void}
     */
    protected shiftFocus(): void;
    /**
     * Handle text value change from text-field
     * @param event Custom Event fired from text-field
     * @returns {void}
     */
    protected onInputValueChanged(event: ValueChangedEvent): void;
    /**
     * Handle list value changed
     * @returns {void}
     */
    protected onListValueChanged(): void;
    /**
     * Handle popup opened event
     *
     * Scrolls the current selection into view
     * @returns {void}
     */
    protected onPopupOpened(): void;
    /**
     * Handle popup closed event
     *
     * Ensures that popup state equals combo box opened prop
     * @returns {void}
     */
    protected onPopupClosed(): void;
    /**
     * Run when input-wrapper is tapped
     * @param event Tap event
     * @returns {void}
     */
    protected onTapStart(event: TapEvent): void;
    /**
     * Run when tap event happens on toggle button
     * @returns {void}
     */
    protected onToggleButtonTap(): void;
    /**
     * Run when tap event happens on clears button
     * @returns {void}
     */
    protected onClearsButtonTap(): void;
    /**
     * Run when tap event happens on input wrapper
     * excluding clears and toggles buttons
     * @returns {void}
     */
    protected onInputWrapperTap(): void;
    private shouldOpenOnFocus;
    /**
     * This flag is required to remove the frame gap
     * between tap start and opening the popup
     * @returns {void}
     */
    protected openOnFocus(): void;
    /**
     * Handles key input
     * @param event Key down event object
     * @returns {void}
     */
    protected onKeyDown(event: KeyboardEvent): void;
    /**
     * Run when tap event or enter
     * happened on the list
     * @returns {void}
     */
    protected onListInteraction(): void;
    /**
     * Handles action keys, either opening the list,
     * or, selecting a highlighted item.
     * @param event keyboard event
     * @returns {void}
     */
    protected enter(event: KeyboardEvent): void;
    /**
     * Navigates up the list.
     * Opens the list if closed.
     * @param event keyboard event
     * @returns {void}
     */
    protected up(event: KeyboardEvent): void;
    /**
     * Navigates down the list.
     * Opens the list if closed.
     * @param event keyboard event
     * @returns {void}
     */
    protected down(event: KeyboardEvent): void;
    /**
     * Retarget event to target element
     * @param event keyboard event
     * @param target new target element
     * @returns re-targeted event or the passed event if target is invalid
     */
    protected reTargetEvent(event: KeyboardEvent, target: HTMLElement): CustomKeyboardEvent;
    /**
     * Template for clear button
     * Rendered when `clears` attribute is set
     * @returns Popup template or undefined
     */
    protected get clearButtonTemplate(): TemplateResult | undefined;
    /**
     * Template for selection badge in multiple mode
     * @returns Selection badge template or undefined
     */
    protected get selectionBadgeTemplate(): TemplateResult | undefined;
    /**
     * Returns a list template
     */
    protected get listTemplate(): TemplateResult;
    /**
     * Returns a template showing no options text
     * Called when freeText mode is off and all items are filtered out
     */
    protected get noItemsTemplate(): TemplateResult | undefined;
    /**
     * Returns template for popup
     * Lazy loads the popup
     * @returns Popup template or undefined
     */
    protected get popupTemplate(): TemplateResult | undefined;
    /**
     * Returns a template for input field
     * @returns Input template
     */
    protected get inputTemplate(): TemplateResult;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @returns Render template
     */
    protected render(): TemplateResult;
}
//# sourceMappingURL=index.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-combo-box': ComboBox;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-combo-box': Partial<ComboBox> | JSXInterface.HTMLAttributes<ComboBox>;
    }
  }
}

export {};
