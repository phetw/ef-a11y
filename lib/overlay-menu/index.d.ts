import { JSXInterface } from '../jsx';
import { TemplateResult, CSSResult, PropertyValues } from '@refinitiv-ui/core';
import '../icon';
import '../item';
import { Overlay } from '../overlay';
import { OverlayMenuData } from './helpers/types';
export { OverlayMenuData };
/**
 * Overlay that supports single-level and multi-level menus
 * @fires item-trigger - Dispatched when user clicks on item
 * @fires opened-changed - Dispatched when when opened attribute changes internally. Prevent default to stop opening/closing pipeline
 *
 * @attr {boolean} opened - True if the menu is currently displayed
 * @prop {boolean} [opened=false] - True if the menu is currently displayed
 *
 * @attr {boolean} with-backdrop - True to show backdrop
 * @prop {boolean} [withBackdrop=false] - True to show backdrop
 *
 * @attr {boolean} no-cancel-on-esc-key - Set to true to disable canceling the overlay with the ESC key
 * @prop {boolean} [noCancelOnEscKey=false] - Set to true to disable canceling the overlay with the ESC key
 *
 * @attr {boolean} no-cancel-on-outside-click - Set to true to disable canceling the overlay by clicking outside it
 * @prop {boolean} [noCancelOnOutsideClick=false] - Set to true to disable canceling the overlay by clicking outside it
 *
 * @attr {boolean} lock-position-target - Set to true to lock position target
 * @prop {boolean} [lockPositionTarget=false] - Set to true to lock position target
 *
 * @prop {HTMLElement|null} [positionTarget=null] - Position next to the HTML element
 *
 * @attr {string} transition-style - Set the transition style
 * @prop {string|null} [transitionStyle=null] - Set the transition style
 *
 * @prop {string} [value=] - Returns the first selected item from values.
 */
export declare class OverlayMenu extends Overlay {
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
    constructor();
    private dataDisconnectThrottler;
    private menuHighlightedItem?;
    private oldPosition?;
    private oldPositionTarget?;
    private oldInteractiveElements;
    private menuIndex;
    private composer;
    private _data;
    private parentDataItem?;
    private lazyRendered;
    /**
     * Switch to compact style menu
     */
    compact: boolean;
    /**
     * Array of item's values
     * @type {string[]}
     */
    get values(): string[];
    set values(values: string[]);
    /**
     * Returns the first selected item value.
     */
    get value(): string;
    set value(value: string);
    /**
     * Construct the menu from data object.
     * Cannot be used with internal content
     */
    get data(): OverlayMenuData | undefined;
    set data(value: OverlayMenuData | undefined);
    /**
     * A flag indicating that the menu is nested
     * Used for styling
     */
    private nested;
    /**
     * Get values from data collection
     * @returns data values
     */
    private getDataValues;
    /**
     * Set values to data collection
     * @param values data values
     * @returns {void}
     */
    private setDataValues;
    /**
     * Get values from slotted element collection
     * @returns slotted item values
     */
    private getSlottedValues;
    /**
     * Set values to slotted elements
     * @param values element values
     * @returns {void}
     */
    private setSlottedValues;
    /**
     * A flag to check whether menu is constructed from data
     * or from slotted content
     * It is not possible to combine two
     */
    private get withData();
    /**
     * True if menu is fully opened and is currently in focus
     */
    private get isActive();
    /**
     * Get descendant as data item
     * Valid only for CC
     * @returns descendant data item
     */
    private getDataDescendants;
    /**
     * Get descendant as item
     * Valid only for slotted
     * @param [parent=this] parent menu
     * @returns descendant item
     */
    private getSlottedDescendants;
    /**
     * Filter items out of children
     */
    private get items();
    /**
     * Invoked when a component is removed from the document’s DOM.
     * @return {void}
     */
    disconnectedCallback(): void;
    /**
     * Called when the element’s DOM has been updated and rendered
     * @param changedProperties Properties that has changed
     * @returns shouldUpdate
     */
    protected shouldUpdate(changedProperties: PropertyValues): boolean;
    /**
     * Reflects property values to attributes and calls render to render DOM via lit-html.
     * @param changedProperties Properties which have changed
     * @return {void}
     */
    protected update(changedProperties: PropertyValues): void;
    /**
     * Called after the component is first rendered
     * @param changedProperties Properties which have changed
     * @return {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * Called after render life-cycle finished
     * @param changedProperties Properties which have changed
     * @return {void}
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Run when the overlay has closed, managers are de-registered
     * and closing transition has finished
     * @return {void}
     */
    protected onClosed(): void;
    /**
     * Selects all data from CollectionComposer
     * @return all MenuItems stored in CollectionComposer
     */
    private getAllComposedData;
    /**
     * Get menu depth from the collection composer
     * @returns depth
     */
    private getDataDepth;
    /**
     * Run while overlay is opening
     * @return {void}
     */
    private opening;
    /**
     * Run while overlay is closing
     * @return {void}
     */
    private closing;
    /**
     * Run when modification has happened in CC
     * @returns {void}
     */
    private modificationUpdate;
    /**
     * Construct menu items and nested menus from data object
     * @return {void}
     */
    private constructDataMenus;
    /**
     * Remove all nested menus from the light DOM
     * @return {void}
     */
    private disconnectNestedMenus;
    /**
     * This function must be called to register menu or menu items
     * @return {void}
     */
    private registerMenu;
    /**
     * Fired when mouse move event happens
     * @param event Mouse move event
     * @return {void}
     */
    private onItemMouseMove;
    /**
     * Provide keyboard item selection
     * @param event Keyup event
     * @return {void}
     */
    private onKeyUp;
    /**
     * Provide keyboard navigation
     * @param event Keydown event
     * @return {void}
     */
    private onKeyDown;
    /**
     * Fired when mouse click event happens on the menu.
     * @param event Tap event
     * @return {void}
     */
    private onItemTap;
    /**
     * Dispatch item trigger even
     * @param item Menu item
     * @returns {void}
     */
    private dispatchItemTrigger;
    /**
     * Run when back item is clicked in compact mode
     * @return {void}
     */
    private onBackItemTap;
    /**
     * Run when mouse is over back item in compact mode
     * @return {void}
     */
    private onBackItemMouseMove;
    /**
     * Manually execute click if return key is pressed
     * @return {void}
     */
    private onEnter;
    /**
     * Highlight next or previous highlightable element if present
     * @param direction -1 - up/next; 1 - down/previous
     * @param [circular=false] Set to true to have circular navigation over items
     * @return {void}
     */
    private focusElement;
    /**
     * Run when left arrow is pressed.
     * Close current menu if possible
     * @return {void}
     */
    private onArrowLeft;
    /**
     * Run when right arrow is pressed.
     * Open menu if possible
     * @return {void}
     */
    private onArrowRight;
    /**
     * Open/close nested menu
     * @param menuItem Item to open/close menu for. Undefined to close all opened nested menus
     * @return {void}
     */
    private setOpenedMenu;
    /**
     * Highlight an item with all ancestors to the top menu
     * @param [item] An item to highlight
     * @return {void}
     */
    private setItemHighlight;
    /**
     * Check whether an item can be highlighted
     * @param item Item to check
     * @return true of the item can be highlighted
     */
    private isHighlightable;
    /**
     * Get first ef-item in the ancestor tree
     * @param target HTML element to start searching from
     * @return item item if found
     */
    private getItem;
    /**
     * Run when `data` collection has been set or updated
     * @return {void}
     */
    private onDataChange;
    /**
     * Run when the default slot items have changed
     * @return {void}
     */
    private onSlotChange;
    /**
     * If data has changed, try to keep the highlighted item unless
     * highlighted item has been removed itself
     * @returns {void}
     */
    private onMenuReHighlight;
    /**
     * Insert nested menu if it is not attached
     * For `data` menus only
     * @param menu Menu element
     * @return {void}
     */
    private insertNestedMenu;
    /**
     * Create overlay menu from items
     * Inherit properties from current menu
     * @return menu element
     */
    private toOverlayMenu;
    /**
     * Create template for menu item
     * @param item JSON object to parse
     * @return template result
     */
    private toItem;
    /**
     * Construct items from data
     * @returns {TemplateResult} Template result
     */
    private get fromDataItems();
    /**
     * Construct back item for compact menu
     * @returns {TemplateResult} Template result
     */
    private compactBackItem;
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
    'ef-overlay-menu': OverlayMenu;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-overlay-menu': Partial<OverlayMenu> | JSXInterface.HTMLAttributes<OverlayMenu>;
    }
  }
}

export {};
