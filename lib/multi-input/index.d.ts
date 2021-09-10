import { JSXInterface } from '../jsx';
import { ControlElement, CSSResult, MultiValue, TemplateResult, PropertyValues } from '@refinitiv-ui/core';
import '../pill';
import '../text-field';
import { MultiInputData, MultiInputDataItem, SelectionIndex } from './helpers/types';
export { MultiInputData, MultiInputDataItem };
/**
 * An input control component to display a selection of pills
 *
 * @event value-changed - Fired when new value of text field is changed.
 * Property `detail.value` will be the new value.
 *
 * @event error-changed - Dispatched when error state changes.
 * Property `detail.error` is error from validation.
 *
 * @event item-added - Fired when new pill is added.
 * Property `detail.item` is new added pill.
 * Property `detail.items` is new list of all pills.
 *
 * @event item-removed - Fired when item is removed.
 * Property `detail.item` is pill that removed.
 * Property `detail.items` is new list of all pills.
 *
 * @event item-error - Fired when item that attempt to add is invalid.
 * Property `detail.item` is item with an error.
 * Property `detail.items` a current list of pills.
 *
 * @prop {boolean} [readonly=false] - Hides text field and clear icon from all pills
 * @attr {boolean} readonly - Hides text field and clear icon from all pills
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @prop {string} value - Current value of text field
 * @attr {string} value - Current value of text field
 *
 */
export declare class MultiInput extends ControlElement implements MultiValue {
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
     * Array of item's values ( readonly )
     * @readonly
     * @type {string[]}
     */
    get values(): string[];
    /**
     * Hide text input box
     */
    pillsOnly: boolean;
    /**
     * Specify icon to display inside input box
     */
    icon: string;
    /**
     * Placeholder text to display in input box
     */
    placeholder: string;
    /**
     * Set state to error
     */
    error: boolean;
    /**
     * Set state to warning
     */
    warning: boolean;
    /**
     * Set character max limit
     */
    maxLength: number | null;
    /**
     * Set character min limit
     */
    minLength: number | null;
    /**
     * Selection start index
     */
    get selectionStart(): number | null;
    set selectionStart(index: SelectionIndex);
    /**
     * Selection end index
     */
    get selectionEnd(): number | null;
    set selectionEnd(index: SelectionIndex);
    /**
     * The data object, used to render the list.
     * @type {MultiInputData | null}
     */
    get data(): MultiInputData | null;
    set data(value: MultiInputData | null);
    private _data;
    /**
     * the component of the list in rendered template
     */
    private list;
    /**
     * the component of the search in rendered template
     */
    private search?;
    private composer;
    /**
     * @ignore
     */
    readonly multiple = true;
    /**
     * Removes the item by the value and returns array of removed items
     * @param value {string} Value of item to remove
     * @returns array of removed items
     */
    removeByValue(value: string): MultiInputData;
    /**
     * Add a new item to the input. Return newly added object or null if added invalid object.
     * @param item to add. Object must have at least value and label
     * @returns {MultiInputDataItem | null} added item
     */
    add(item: MultiInputDataItem): MultiInputDataItem | null;
    /**
     * Removes last item. Returns item that removed or null if list was empty
     * @returns {MultiInputDataItem | null} Removed item or null if list was empty
     */
    removeLastItem(): MultiInputDataItem | null;
    /**
     * Removes pill by index. Returns item that removed or null if list was empty
     * @param {number} index of pill to be removed
     * @returns {MultiInputDataItem | null} Removed item or null if list was empty
     */
    removeByIndex(index: number): MultiInputDataItem | null;
    /**
     * Remove item from collection and notify
     * @param item processed entity
     * @param notifyEvent should notify about changes
     * @returns removed item or null
     */
    private removeItem;
    /**
     * Removes item by a property within item
     * @param value of property
     * @param property name
     * @returns array of removed items
     */
    private removeByProperty;
    /**
     * Add item to collection and notify
     * @param item processed entity
     * @param notifyEvent should notify about changes
     * @returns added item or null
     */
    private addItem;
    /**
     * validate input according `minLength` and `maxLength` properties
     * @param {string} value value for validate
     * change state of `error` property according validation
     * @returns {void}
     */
    private validateInput;
    /**
     * @param value value of changed.
     * @returns {boolean} true if there is no error, false when minLength more than 0 and value is too short
     */
    private shouldValidateForMinLength;
    /** Old value for handle reset value */
    private oldValue;
    /**
    * Current value of text field
    * @default -
    * @param value Element value
    */
    set value(value: string);
    get value(): string;
    /**
     * @param value value for validate.
     * @returns true if there is maxLength is null and maxLength is more than value.
     */
    private shouldValidateForMaxLength;
    /**
     * Called when the element’s DOM has been updated and rendered
     * @param changedProperties Properties that has changed
     * @returns shouldUpdate
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Check if input should be re-validated
     * @param changedProperties Properties that has changed
     * @returns True if input should be re-validated
     */
    private shouldValidateInput;
    /**
     * Set the selection range
     * @param startSelection Start of selection
     * @param endSelection End of the selection
     * @returns {void}
     */
    setSelectionRange(startSelection: number, endSelection: number): void;
    /**
     * Select the contents of input
     * @returns void
     */
    select(): void;
    /**
     * render this component
     * @returns the main template
     */
    protected render(): TemplateResult;
    /**
     * render the search element
     * @returns the template of the search element
     */
    private get textFieldTemplate();
    /**
     * render pill components
     * @returns the template of pill components
     */
    private pillsTemplate;
    /**
     * render the pill component
     * @param item for render
     * @param index the position item of values
     * @returns the template of a pill component
     */
    private pillTemplate;
    /**
     * handle the clear event of pill
     * @param event the event contains the current pill
     * @returns {void}
     */
    private onPillClearsHandler;
    /**
     * the wrapper for item events
     * @param item to notify about
     * @param eventType notify mode - [item-removed|item-added|item-error]
     * @returns true if event was not prevented
     */
    private notify;
    /**
     * Detect keydown and delete last item if delete key is pushed
     * @param event keydown event
     * @returns {void}
     */
    private handleKeyDown;
    /**
     * handle when value is changed
     * @param event Input change event
     * @returns {void}
     */
    private onInputChange;
    /**
     * handle keydown event when the key code is the backspace
     * @param event keyboard backspace keydown for preventing default in case of native functionality removing
     * @returns {void}
     */
    private removeLastItemByKeyboard;
    /**
     * handle keydown event when the key code is the enter
     * @returns {void}
     */
    private addItemByKeyboard;
    /**
     * check the value of the search element and check readonly and disabled
     * @returns the condition checks the search value is empty and switched off readonly and disabled of this component
     */
    private isSearchValueEmptyWithoutReadonlyAndDisabled;
    /**
     * check the value of the search element and check readonly and disabled
     * @returns the condition checks the search value is empty and switched off readonly and disabled of this component
     */
    private isSearchValueNotEmptyWithoutReadonlyAndDisabled;
    /**
     * Item check for value and label to ensure it can be rendered
     * @param item Item to check
     * @returns true if item exists and contains value and label
     */
    private isItem;
}
//# sourceMappingURL=index.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-multi-input': MultiInput;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-multi-input': Partial<MultiInput> | JSXInterface.ControlHTMLAttributes<MultiInput>;
    }
  }
}

export {};
