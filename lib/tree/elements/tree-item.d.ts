import { JSXInterface } from '../../jsx';
import { TemplateResult, ControlElement, PropertyValues } from '@refinitiv-ui/core';
import '../../icon';
import '../../checkbox';
import { TreeDataItem } from '../helpers/types';
import { CheckedState } from '../managers/tree-manager';
/**
 * Displays a tree list item.
 * Groups display expansion arrows.
 */
export declare class TreeItem<T extends TreeDataItem = TreeDataItem> extends ControlElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    /**
     * Checked state of the item
     */
    checkedState: CheckedState;
    /**
     * Is the item a parent and should it show an expansion toggle?
     */
    parent: boolean;
    /**
     * Display in multiple selection mode
     */
    multiple: boolean;
    /**
     * Expanded state of the item
     */
    expanded: boolean;
    /**
     * Depth of the item
     */
    depth: number;
    /**
     * Label of the item
     */
    label: string;
    /**
     * Original data item, used for interacting with the tree manager
     */
    item: T;
    /**
     * Highlighted state of the item.
     * This is for showing which item is currently being interacted with.
     */
    highlighted: boolean;
    /**
     * Template for rendering the indentation element
     */
    protected get indentTemplate(): TemplateResult;
    /**
     * Template for rendering the toggle
     *
     * ! expand-toggle is required for automatically toggling expanded state
     */
    protected get toggleTemplate(): TemplateResult;
    /**
     * Template for rendering the checkbox
     */
    protected get checkboxTemplate(): TemplateResult;
    /**
     * Is the item fully checked?
     */
    protected get checked(): boolean;
    /**
     * Is the checked state indeterminate?
     */
    protected get indeterminate(): boolean;
    protected update(changedProperties: PropertyValues): void;
    protected render(): TemplateResult;
}
//# sourceMappingURL=tree-item.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-tree-item': TreeItem;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-tree-item': Partial<TreeItem> | JSXInterface.HTMLAttributes<TreeItem>;
    }
  }
}

export {};
