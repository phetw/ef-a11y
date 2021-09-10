import { JSXInterface } from '../jsx';
import { BasicElement, PropertyValues, TemplateResult, CSSResult } from '@refinitiv-ui/core';
import '@refinitiv-ui/phrasebook/lib/locale/en/pagination';
import { Translate } from '@refinitiv-ui/translate';
import '../button';
import '../button-bar';
import '../layout';
import '../text-field';
/**
 * Used to control and navigate through multiple pages
 * @fires page-changed - Fired when the `page` property is changed
 */
export declare class Pagination extends BasicElement {
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
     * Set current page
     */
    page: string;
    /**
     * Number of item per page
     */
    pageSize: string;
    /**
     * Total items
     */
    totalItems: string;
    /**
     * Set state to disable
     */
    disabled: boolean;
    /**
     * Getter for info part
     */
    private infoElement;
    /**
      * Getter for text field as input part
      */
    private input;
    /**
      * Getter for first button as first part
      */
    private firstPageButton;
    /**
      * Getter for previous button as previous part
      */
    private previousPageButton;
    /**
    * Getter for next button as next part
    */
    private nextPageButton;
    /**
    * Getter for last button as last part
    */
    private lastPageButton;
    /**
     * Used for translations
     */
    protected t: Translate;
    /**
     * Invoked whenever the element is updated
     * @param changedProperties Map of changed properties with old values
     * @returns {void}
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Handle when page-size property changed
     * @returns {void}
     */
    private pageSizeChanged;
    /**
     * Handle when total-items property changed
     * @returns {void}
     */
    private totalItemsChanged;
    /**
     * Handle when disabled property changed
     * @returns {void}
     */
    private disabledChanged;
    /**
     * Update disable/enable state of first, previous, next, and last
     * First and previous should be disabled if showing first page
     * Next and last should be disabled if showing last page
     * @returns {void}
     */
    private updateButtons;
    /**
     * Calculate and return total pages
     * Total pages should never less than 1
     * @returns {number} Number of total page
     */
    private get totalPage();
    /**
     * Check a new page value to be usable
     * if a new page value is allow then return newPage
     * Condition to be old value is null or NaN or undefined or string or less than 1
     * @param oldPage a old page value
     * @param newPage a new page value
     * @return return a new page value
     */
    private validatePage;
    /**
     * Get text to display in info part
     * @returns {PageInfo} Used for translations
     */
    private get pageInfo();
    /**
     * Hide info part when it's too small
     * @returns {void}
     */
    private onResize;
    /**
     * Handle when input is focus
     * @returns {void}
     */
    private onInputFocus;
    /**
     * Handle when input lost focus
     * @param event Event object
     * @returns {void}
     */
    private onInputBlur;
    /**
     * Handles action when Enter key is press onto the input
     * @param event Keyboard event
     * @returns {void}
     */
    private onInputKeyDown;
    /**
     * Updates page value depending on direction
     * @param direction page value direction
     * @param event whether the event page-changed should fire
     * @returns {void}
     */
    private updatePage;
    /**
     * Go to the next page
     * @returns {void}
     */
    next(): void;
    /**
     * Go to the next page and fires event
     * @returns {void}
     */
    private onNextTap;
    /**
     * Go to the previous page
     * @returns {void}
     */
    previous(): void;
    /**
     * Go to the previous page and fires evetn
     * @returns {void}
     */
    private onPreviousTap;
    /**
     * Go to the first page
     * @returns {void}
     */
    first(): void;
    /**
     * Go to the first page and fires event
     * @returns {void}
     */
    private onFirstTap;
    /**
     * Go to the last page
     * @returns {void}
     */
    last(): void;
    /**
     * Go to the last page and fires event
     * @returns {void}
     */
    private onLastTap;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult} Render template
     */
    protected render(): TemplateResult;
}
//# sourceMappingURL=index.d.ts.map
declare global {
  interface HTMLElementTagNameMap {
    'ef-pagination': Pagination;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ef-pagination': Partial<Pagination> | JSXInterface.HTMLAttributes<Pagination>;
    }
  }
}

export {};
