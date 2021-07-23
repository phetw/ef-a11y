import { ControlElement, CSSResult, PropertyValues, TemplateResult } from '@refinitiv-ui/core';
import '../icon';
import '../checkbox';
import { ItemType } from './helpers/types';
export * from './helpers/types';
/**
 * Used as a basic building block to compose complex custom elements,
 * additionally it can be used by applications
 * to create simple menus or navigation panels.
 *
 * @attr {string} value - The content of this attribute represents the value of the item.
 * @prop {string} [value=] - The content of this attribute represents the value of the item.
 *
 * @attr {boolean} disabled - Set disabled state.
 * @prop {boolean} [disabled=false] - Set disabled state.
 *
 * @slot left - Used to render the content on the left of the label.
 * @slot right - Used to render the content on the right of the label.
 */
export declare class Item extends ControlElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * @returns `CSSResult` that will be used to style the host,
     * slotted children and the internal template of the element.
     */
    static get styles(): CSSResult | CSSResult[];
    /**
     * The text for the label indicating the meaning of the item.
     * By having both `label` and content, `label` always takes priority
     */
    label: string | null;
    /**
     * If defined value can be `text`, `header` or `divider`
     * @type {ItemType | null}
     */
    type: ItemType | null;
    /**
     * Set the icon name from the ef-icon list
     */
    icon: string | null;
    /**
     * Indicates that the item is selected
     */
    selected: boolean;
    role: string;
    ariaSelected: boolean;
    /**
     * Is the item part of a multiple selection
     */
    multiple: boolean;
    /**
     * Highlight the item
     */
    highlighted: boolean;
    /**
     * The`subLabel` property represents the text beneath the label.
     */
    subLabel: string | null;
    /**
     * Specifies which element an item is bound to
     */
    for: string | null;
    /**
     * Cache label element
     */
    private labelEl?;
    /**
     * True, if there is no slotted content
     */
    private isSlotEmpty;
    /**
     * @param node that should be checked
     * @returns whether node can be ignored.
     */
    private isIgnorable;
    /**
     * Checks slotted children nodes and updates component to refresh label and sub-label templates.
     * @param event slotchange
     * @returns {void}
     */
    private checkSlotChildren;
    /**
     * @override
     * @returns {void}
     */
    protected update(changedProperties: PropertyValues): void;
    /**
     * Get icon template if icon attribute is defined
     */
    private get iconTemplate();
    /**
     * Get subLabel template if it is defined and no slot content present
     */
    private get subLabelTemplate();
    /**
     * Get label template if it is defined and no slot content present
     */
    private get labelTemplate();
    /**
     * Get template for `for` attribute.
     * This is usually used with menus when an item needs to reference an element
     */
    private get forTemplate();
    /**
     * Get template for `multiple` attribute.
     * This is usually used with lists, when an item can be part of a multiple selection
     */
    private get multipleTemplate();
    /**
     * Return true if the item can be highlighted. True if not disabled and type is Text
     * @prop {boolean} highlightable
     * @returns whether element is highlightable
     */
    get highlightable(): boolean;
    /**
     * Getter returning if the label is truncated
     * @prop {boolean} isTruncated
     * @returns whether element is truncated or not
     */
    get isTruncated(): boolean;
    /**
     * Control State behaviour will update tabindex based on the property
     * @returns {void}
     */
    private typeChanged;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @returns Render template
     */
    protected render(): TemplateResult;
}
