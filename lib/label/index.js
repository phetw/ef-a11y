var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ResponsiveElement, html, css, customElement, property, query } from '@refinitiv-ui/core';
import { VERSION } from '../';
import '../tooltip';
import { TextHelpers } from './helpers/text';
// Observer config for items
const observerOptions = {
    subtree: true,
    childList: true,
    characterData: true
};
/**
 * Displays a text with alternative truncation
 */
let Label = class Label extends ResponsiveElement {
    constructor() {
        super(...arguments);
        /**
         * Enable shortening the slot content
         */
        this.truncate = null;
        /**
         * Limit the number of lines before truncating
         */
        this.maxLine = null;
        /**
         * Set state to error
         */
        this.error = false;
        /**
         * Set state to warning
         */
        this.warning = false;
        /**
         * Store trimmed text content
         */
        this.rawText = '';
        /**
         * Tooltip state when truncate = center
         */
        this.enableTooltip = false;
        /**
         * Used to prevent handler fired when previous content are the same as last content
         */
        this.previousContent = '';
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
     * @returns CSS template
     */
    static get styles() {
        return css `
      :host {
        display: inline-block;
        max-width: 100%;
        box-sizing: border-box;
      }
      :host([truncate]) {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      :host([max-line]) {
        display: -webkit-inline-box;
        -webkit-line-clamp: var(--max-line);
        white-space: normal;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      :host([truncate=center]) {
        white-space: nowrap;
        text-overflow: clip;
      }
    `;
    }
    /**
     * The lifecycle method called when properties changed first time
     * @param changedProperties properties it's the Map object which has the updated properties
     * @returns {void}
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.rawText = this.retrieveSlotContent();
    }
    /**
     * Called when the element’s DOM has been updated and rendered
     * @param changedProperties Properties that has changed
     * @returns shouldUpdate
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('truncate')) {
            if (this.truncate === 'center') {
                this.restoreTextContent();
                this.middleEllipsis(this, this.span, this.rawText);
            }
            else {
                this.restoreTextContent();
                if (this.maxLine) {
                    this.style.setProperty('--max-line', this.maxLine);
                }
            }
            this.updateTooltip();
        }
        else if (changedProperties.has('maxLine')) {
            this.style.setProperty('--max-line', this.maxLine);
            this.updateTooltip();
        }
        // we must wait while all elements in the tree are updated before starting the mutation observer
        void this.updateComplete.then(() => {
            if (!this.mutationObserver) {
                // Start watching for any child mutations
                this.mutationObserver = new MutationObserver(this.handleSlotChange.bind(this));
                this.mutationObserver.observe(this, observerOptions);
            }
        });
    }
    /**
     * Handle statement after slot or innerHTML has been changed
     * @returns void
     */
    handleSlotChange() {
        // get new text content when label changed
        this.rawText = this.retrieveSlotContent();
        if (this.previousContent !== this.rawText) {
            this.previousContent = this.rawText;
            this.restoreTextContent();
            if (this.truncate === 'center') {
                this.middleEllipsis(this, this.span, this.rawText);
            }
            this.updateTooltip();
        }
    }
    /**
     * Restore text content
     * @returns {void}
     */
    restoreTextContent() {
        this.span.innerHTML = this.rawText;
    }
    /**
     * concatenating all of text content in the slots
     * @returns trimmed text content
     */
    retrieveSlotContent() {
        let text = this.textContent || '';
        const slot = this.querySelector('slot');
        if (slot) {
            const slotContent = slot.assignedNodes({ flatten: true });
            for (let i = 0; i < slotContent.length; i++) {
                text += slotContent[i].textContent;
            }
        }
        return TextHelpers.trim(text);
    }
    /**
     * Get element width minus padding
     * @param node parent node that wrapper text node
     * @returns {number} width minus padding
     */
    getElementWidthMinusPadding(node) {
        const paddingLeft = getComputedStyle(node).paddingLeft;
        const paddingRight = getComputedStyle(node).paddingRight;
        return node.offsetWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);
    }
    /**
     * Truncate a long string in the middle and add an ellipsis.
     * @param parentNode parent node
     * @param textNode text node
     * @param fullText string
     * @returns {void}
     */
    middleEllipsis(parentNode, textNode, fullText) {
        const parentWidth = this.getElementWidthMinusPadding(parentNode);
        const textWidth = textNode.offsetWidth;
        this.enableTooltip = false;
        if (textWidth <= parentWidth) {
            return;
        }
        TextHelpers.middleEllipsis(textNode, parentWidth, fullText);
        this.enableTooltip = true;
        void this.requestUpdate();
    }
    /**
     * Handle text ellipsis and tooltip state when element has been resized
     * @returns void
     */
    onResize() {
        if (this.truncate === 'center') {
            this.restoreTextContent(); // TODO: find a way to remove this to improve performance
            this.middleEllipsis(this, this.span, TextHelpers.trim(this.span.textContent || ''));
        }
        this.updateTooltip();
    }
    /**
     * Handle tooltip statement when properties changed
     * @returns void
     */
    updateTooltip() {
        // determine tooltip state
        if (this.isShowTooltip()) {
            this.span.setAttribute('title', this.rawText);
        }
        else {
            this.span.removeAttribute('tooltip');
            this.span.removeAttribute('title');
        }
    }
    /**
     * private method but can't override
     * access modifiers in typescript.
     * @ignore
     * @param size element dimensions
     * @returns {void}
     */
    resizedCallback() {
        clearTimeout(this.updateTimer);
        // split layout updating to another execution-loop
        // to prevents resizeObserver triggers resize-loop-error
        this.updateTimer = setTimeout(() => this.onResize(), 0);
    }
    /**
     * Determine show/hide tooltip state
     * @returns {boolean} true if center truncate or the element is smaller than a parent
     */
    isShowTooltip() {
        if (this.offsetWidth !== this.scrollWidth) {
            return true;
        }
        // truncate is center and text is overflow
        if (this.truncate === 'center' && this.enableTooltip) {
            return true;
        }
        // maxLine is provided and text is overflow
        else if (this.maxLine && this.offsetHeight !== this.scrollHeight) {
            return true;
        }
        return false;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return html `
      <div style="display: none;">
        <slot></slot>
      </div>
      <span .title=${this.isShowTooltip() ? this.rawText : ''}></span>
    `;
    }
};
__decorate([
    property({ type: String, reflect: true })
], Label.prototype, "truncate", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'max-line' })
], Label.prototype, "maxLine", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Label.prototype, "error", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Label.prototype, "warning", void 0);
__decorate([
    query('span', true)
], Label.prototype, "span", void 0);
Label = __decorate([
    customElement('ef-label', {
        alias: 'quartz-label'
    })
], Label);
export { Label };
//# sourceMappingURL=index.js.map