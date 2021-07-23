import { ControlElement, CSSResult, PropertyValues, TapEvent, TemplateResult } from '@refinitiv-ui/core';
import { CollectionComposer, DataItem } from '@refinitiv-ui/utils';
import '../item';
import { ItemData } from '../item';
import { ListData } from './helpers/types';
import { ListRenderer } from './helpers/list-renderer';
export { ListData, ListRenderer };
/**
 * Key direction
 */
declare enum Direction {
    UP = -1,
    DOWN = 1
}
/**
 * Provides listing and immutable selection
 * @fires value-changed - Dispatched when value changes
 */
export declare class List<T extends DataItem = ItemData> extends ControlElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * Used to timestamp renders.
     * This enables diff checking against item updates,
     * rendering only items which have updated since the last render cycle.
     */
    private renderTimestamp;
    /**
     * Requests an update after a composer modification.
     * @returns Update promise.
     */
    private modificationUpdate;
    /**
     * Item map; used to link element nodes to data items.
     */
    private itemMap;
    /**
     * Element map; used to link data items to element nodes.
     */
    private elementMap;
    /**
     * Composer used to query and modify item state.
     */
    protected composer: CollectionComposer<T>;
    /**
     * Use default `tabindex` so that items are priority focus targets
     */
    protected readonly defaultTabIndex: null;
    /**
     * Element focus delegation.
     * Set to `false` and relies on native focusing.
     */
    readonly delegatesFocus = false;
    /**
     * Renderer used to render list item elements
     * @type {ListRenderer}
     */
    renderer: ListRenderer;
    /**
     * Disable selections
     */
    stateless: boolean;
    /**
     * Allow multiple selections
     */
    multiple: boolean;
    /**
     * The data object, used to render the list.
     * @type {ListData}
     */
    get data(): ListData<T>;
    set data(value: ListData<T>);
    private _data;
    /**
     * Returns the first selected item value.
     * Use `values` when multiple selection mode is enabled.
     */
    get value(): string;
    set value(value: string);
    /**
     * Returns a values collection of the currently
     * selected item values
     * @readonly
     */
    get values(): string[];
    set values(values: string[]);
    /**
     * Selects an item in the list
     * @param item Data Item or Item Element
     * @returns If a selection has been made or not
     */
    selectItem(item?: T | HTMLElement): boolean;
    /**
     * Navigate up through the list items
     * @returns {void}
     */
    up(): void;
    /**
     * Navigate up through the list items
     * @returns {void}
     */
    down(): void;
    /**
     * Proxy for querying the composer
     * @param engine composer querying engine
     * @returns Collection of queried items
     */
    protected queryItems(engine: (item: T, composer: CollectionComposer<T>) => boolean): readonly T[];
    /**
     * Proxy for querying the composer by property and value
     * @param property Property name
     * @param value Property value
     * @returns Collection of queried items
     */
    protected queryItemsByPropertyValue<K extends keyof T>(property: K, value: T[K]): readonly T[];
    /**
     * Gets the associated element for the data item provided,
     * if there is one available.
     * @param item Item to map element to
     * @returns Associated element
     */
    protected elementFromItem(item: T): HTMLElement | undefined;
    /**
     * Gets the associated data item for the provided element,
     * if there is one available.
     * @param element Element to map item to
     * @returns Associated date item
     */
    protected itemFromElement(element: HTMLElement): T | undefined;
    /**
     * Tries to find the next focusable element.
     * @param direction Direction to search
     * @param element Starting element
     * @returns Next logical element to focus
     */
    protected getNextFocusableItem(direction: Direction, element?: HTMLElement | null): HTMLElement | undefined;
    /**
     * Tries to find the next highlight item
     * @param direction Direction to search
     * @returns A data item, if found.
     */
    protected getNextHighlightItem(direction: Direction): T | undefined;
    /**
     * Clears any highlighted item
     * @returns {void}
     */
    protected clearHighlighted(): void;
    /**
     * Highlights a single item.
     * Used for navigation.
     * @param item Item to highlight
     * @param scrollToItem Scroll the item into view?
     * @returns {void}
     */
    protected highlightItem(item?: T, scrollToItem?: boolean): void;
    /**
     * Gets the available tabbable elements
     */
    protected get tabbableItems(): HTMLElement[];
    /**
     * Returns the current focused element
     */
    protected get activeElement(): HTMLElement | null;
    /**
     * Returns the current focused element
     */
    protected get highlightElement(): HTMLElement | null;
    /**
     * Tries to select the current highlighted element
     * @returns {void}
     */
    protected triggerActiveItem(): void;
    /**
     * Scroll to list item element
     * @param item Data item to scroll to
     * @returns {void}
     */
    scrollToItem(item: T): void;
    /**
     * Handles key input
     * @param event Key down event object
     * @returns {void}
     */
    protected onKeyDown(event: KeyboardEvent): void;
    /**
     * Handle list on tap
     * Typically it will select an item
     * @param event Event to handle
     * @returns {void}
     */
    protected onTap(event: TapEvent): void;
    /**
     * Handles mouse move
     * Typically it will highlight an item
     * @param event Event to handle
     * @returns {void}
     */
    protected onMouse(event: Event): void;
    /**
     * Handles item focus in
     * Typically it will highlight the item
     * @param event Event to handle
     * @returns {void}
     */
    protected onFocus(event: FocusEvent): void;
    /**
     * Handles item focus out
     * Typically it will remove highlighting
     * @returns {void}
     */
    protected onBlur(): void;
    /**
     * Tries to find a known item element,
     * from an event target
     * @param target Event target
     * @returns Found element, if available
     */
    protected findItemElementFromTarget(target: EventTarget | HTMLElement | null): HTMLElement | null;
    /**
     * Clears the current selected items
     * @returns {void}
     */
    protected clearSelection(): void;
    /**
     * Queries and returns all renderable items.
     * @returns Collection of renderable items
     */
    protected get renderItems(): readonly T[];
    /**
     * Proxy for creating list item elements.
     * Allows for a mapping to be created between
     * Data Item and Item Element.
     * @param item Data item context
     * @param reusableElement Child element available for reuse
     * @returns List item element
     */
    private createListItem;
    /**
     * Clears all item-element and timestamp maps
     * @returns {void}
     */
    private clearMaps;
    /**
     * Fire value changed event
     * @returns {void}
     */
    private fireSelectionUpdate;
    /**
     * Renders updates to light DOM
     * @returns {void}
     */
    protected renderLightDOM(): void;
    protected firstUpdated(changeProperties: PropertyValues): void;
    protected update(changeProperties: PropertyValues): void;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return CSS template
     */
    static get styles(): CSSResult | CSSResult[];
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    protected render(): TemplateResult;
}
