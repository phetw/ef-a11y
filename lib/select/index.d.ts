import { JSXInterface } from '../jsx';
import { ControlElement, TemplateResult, CSSResult, PropertyValues, MultiValue } from '@refinitiv-ui/core';
import '../overlay';
import '../item';
import '../icon';
import { SelectData, SelectDataItem } from './helpers/types';
export { SelectData, SelectDataItem };
/**
 * Expands upon the native select element,
 * providing a fully themeable dropdown element.
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @fires value-changed - Fired when the value property changes.
 * @fires opened-changed - Fired when the opened property changes.
 */
export declare class Select extends ControlElement implements MultiValue {
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
    private composer;
    private _data;
    private mutationObserver?;
    private popupDynamicStyles;
    private lazyRendered;
    private popupScrollTop;
    private observingMutations;
    private highlightedItem?;
    private keySearchTerm;
    private keySearchThrottler;
    private resizeThrottler;
    /**
    * Current text content of the selected value
    * @readonly
    */
    get label(): string;
    /**
    * Current text content of the selected values
    * @ignore
    * @readonly
    */
    get labels(): string[];
    /**
    * Placeholder to display when no value is set
    */
    placeholder: string;
    /**
    * Toggles the opened state of the list
    */
    opened: boolean;
    /**
    * Set state to error
    */
    error: boolean;
    /**
    * Set state to warning
    */
    warning: boolean;
    /**
    * Switch to multiple select input
    * @ignore
    * @param multiple True if element needs to support multi selection
    */
    set multiple(multiple: boolean);
    /**
    * @ignore
    */
    get multiple(): boolean;
    /**
    * Construct the menu from data object. Cannot be used with slotted content
    * @type {SelectData | null}
    */
    get data(): SelectData | null;
    set data(value: SelectData | null);
    /**
     * This variable is here to ensure that the value and data are in sync when data is set after the value.
     * This is developer error to use both, selected and value to control the selections.
     * Therefore as soon as value has been set externally, selected state in data setter is ignored
     */
    private cachedValue;
    /**
    * Value of the element
    * @param value Element value
    */
    set value(value: string);
    get value(): string;
    /**
     * Array of selected items` values
     * @ignore
     * @readonly
     */
    get values(): string[];
    private menuEl?;
    /**
     * Updates the element
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    protected update(changedProperties: PropertyValues): void;
    /**
     * Called after the component is first rendered
     * @param changedProperties Properties which have changed
     * @returns {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * Called when element finished updating
     * @param changedProperties Properties which have changed
     * @returns {void}
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Run when popup is opening
     * Calculate CSS variables an computed width
     * @returns {void}
     */
    private opening;
    /**
     * Run when popup is closing
     * @returns {void}
     */
    private closing;
    /**
     * Observe any changes to Light DOM
     * This observer is self contained and should
     * be garbage collected when there are no element references.
     * @returns {void}
     */
    private observeMutations;
    /**
     * Stop observe any changes to Light DOM
     * There must not be any observation on any internal changes
     * as it may cause excessive re-rendering
     * @returns {void}
     */
    private stopObserveMutations;
    /**
     * Handles all mutations and filters out
     * any Shadow DOM changes in polyfilled browsers
     * mutations collection of mutation records
     * @param mutations Observer mutations
     * @returns {void}
     */
    private handleMutations;
    /**
     * Popup has to use max width if --list-max-width specified
     * otherwise, popup should have same width as control or wider
     * @returns {void}
     */
    private restrictPopupWidth;
    /**
     * Set opened state with event
     * @param opened True if opened
     * @returns {void}
     */
    private setOpened;
    private shouldOpenOnFocus;
    /**
     * This flag is required to remove the frame gap
     * between tap start and opening the popup
     * @returns {void}
     */
    protected openOnFocus(): void;
    /**
     * Toggles the opened state of the list
     * @returns {void}
     */
    private toggleOpened;
    /**
     * Scroll to first selected item
     * @returns {void}
     */
    private scrollToSelected;
    /**
     * Used to restore scroll position on each refit event
     * @returns {void}
     */
    private onPopupRefit;
    /**
     * Run when popup closes externally via opened-changed event
     * Required to propagate the event
     * @param event opened-changed event
     * @returns {void}
     */
    private onPopupOpenedChanged;
    /**
     * Run when popup gets opened
     * @returns {void}
     */
    private onPopupOpened;
    /**
     * Run when popup gets closed
     * @returns {void}
     */
    private onPopupClosed;
    /**
     * Used to store scroll position
     * @returns {void}
     */
    private onPopupScroll;
    /**
     * Run when tap event happens on render root
     * @param event tap event
     * @returns {void}
     */
    private onPopupTap;
    /**
     * Run mouse move event over the popup
     * @param event mouse move event
     * @returns {void}
     */
    private onPopupMouseMove;
    /**
     * Handles key input when popup is closed
     * @param event Key down event object
     * @returns {void}
     */
    private onKeyDown;
    /**
     * Handles popup key input when popup is opened
     * @param event Key down event object
     * @returns {void}
     */
    private onPopupKeyDown;
    /**
     * Check if keyboard keydown can be used for data searching
     * @param event Keyboard event
     * @returns true if a valid key
     */
    private isValidFilterKey;
    /**
     * Focus and highlight the next/previous element
     * @param direction Focus next or previous element
     * @returns {void}
     */
    private focusElement;
    /**
     * Highlight or remove highlight from an item
     * @param [item] An item to highlight
     * @returns {void}
     */
    private setItemHighlight;
    /**
     * A simple search that highlight elements on key press
     * @param key A key pressed
     * @returns {void}
     */
    private onKeySearch;
    /**
     * Check if element can be selected
     * @param element Element to check
     * @returns true if element can be selected
     */
    private isSelectableElement;
    /**
     * Get a list of selectable HTML Elements
     * *Can be used only when select is opened*
     * @returns A list of selectable HTML elements
     */
    private getSelectableElements;
    /**
     * Find selectable element is the event composed path
     * @param event Event to check
     * @returns The first selectable element or undefined
     */
    private findSelectableElement;
    /**
     * Get a list of selected HTML elements
     * *Can be used only when select is opened*
     * @returns A list of selected elements
     */
    private getSelectedElements;
    /**
     * Clears the current selected items
     * @returns {void}
     */
    private clearSelection;
    /**
     * Mark item as selected
     * @param value Value to select
     * @returns true if corresponding item is found and item selected
     */
    protected selectValue(value: string): boolean;
    /**
     * Mark data item as selected
     * @param value Item value
     * @returns true if corresponding item is found and item selected
     */
    private selectDataItem;
    /**
     * Mark slotted item as selected
     * @param value Item value, item label or item text content
     * @returns true if corresponding item is found and item selected
     */
    private selectSlotItem;
    /**
     * Helper to return a value from an item
     * @param item select item
     * @returns value
     */
    private getItemValue;
    /**
     * Helper to return a label from an item
     * @param item select item
     * @returns value
     */
    private getItemLabel;
    /**
     * Check whether select is working with data or slotted content
     * @returns True if working with data
     */
    private hasDataItems;
    /**
     * Retrieve the selected data items
     * @returns Selected data item
     */
    private get selectedDataItems();
    /**
     * Retrieve the selected items
     * @returns Selected data item
     */
    private get selectedSlotItems();
    /**
     * Calculating whether the placeholder should be hidden
     * @returns result
     */
    private placeholderHidden;
    /**
     * Create template for menu item
     * @param item JSON object to parse
     * @returns template result
     */
    private toItem;
    /**
     * Template for placeholder
     */
    private get placeholderTemplate();
    /**
     * Template for label
     */
    private get labelTemplate();
    /**
     * Edit template when select is not readonly or disabled
     */
    private get editTemplate();
    /**
     * Get default slot template
     */
    private get slottedContent();
    /**
     * Get data iterator template
     */
    private get dataContent();
    /**
    * Edit template when select is not readonly or disabled
    */
    private get popupTemplate();
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    protected render(): TemplateResult;
}
//# sourceMappingURL=index.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-select': Select;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-select': Partial<Select> | JSXInterface.ControlHTMLAttributes<Select>;
    }
  }
}

export {};
