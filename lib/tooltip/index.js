var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Tooltip_1;
import { BasicElement, html, css, customElement, property, query, matches } from '@refinitiv-ui/core';
import '../overlay';
import './elements/title-tooltip';
import { register, deregister } from './managers/tooltip-manager';
import { tooltipRenderer } from './helpers/renderer';
import { register as registerOverflowTooltip } from './helpers/overflow-tooltip';
import { VERSION } from '../';
const TooltipPositionMap = {
    'auto': ['bottom-start', 'top-start'],
    'above': ['top-middle'],
    'right': ['right-middle'],
    'below': ['bottom-middle'],
    'left': ['left-middle']
};
/**
 * Tooltip displays extra information when the
 * user hovers the pointer over an item.
 */
let Tooltip = Tooltip_1 = class Tooltip extends BasicElement {
    constructor() {
        super(...arguments);
        this.matchTarget = null;
        this.matchTargetRect = null;
        this.showDelay = 300;
        this.hideDelay = 150;
        this.clicked = false;
        /**
        * CSS selector to match the tooltip
        */
        this.selector = '';
        /**
        * The position of the tooltip. Use the following values:
        * `auto` (default) - display based on mouse enter coordinates
        * `above` - display above the element
        * `right` - display to the right of the element
        * `below` - display beneath the element
        * `left` - display to the left of the element
        */
        this.position = 'auto';
        /**
        * Set the transition style.
        * Value can be `fade`, `zoom`, `slide-down`, `slide-up`, `slide-right`,
        * `slide-left`, `slide-right-down`, `slide-right-up`, `slide-left-down`, `slide-left-up`, or null in case of no transition
        *  @type {TooltipTransitionStyle}
        */
        this.transitionStyle = 'fade';
        this._x = 0;
        this._y = 0;
        this._positionTarget = null;
        this._opened = false;
        /**
         * Clear all timers
         * @returns {void}
         */
        this.reset = () => {
            window.clearTimeout(this.timerTimeout);
        };
        /**
         * Reset tooltip
         * @returns {void}
         */
        this.resetTooltip = () => {
            this.hideTooltip();
        };
        /**
         * Run when mouse is moving over the document
         * @param event Mouse move event
         * @param paths Event paths
         * @returns {void}
         */
        this.onMouseMove = (event, paths) => {
            this.showTooltip(paths, event.clientX, event.clientY);
        };
        /**
         * Run when document click event happens
         * @returns {void}
         */
        this.onClick = () => {
            this.clicked = true;
            this.hideTooltip();
        };
        /**
         * Run when document mouse out event happens
         * @returns {void}
         */
        this.onMouseOut = ({ relatedTarget }) => {
            // document mouesemove, mouseleave and blur are not fired over iframe
            // therefore create a special case for iframe to hide the tooltip
            /* istanbul ignore next */
            if (Tooltip_1.isIframe(relatedTarget)) {
                this.resetTooltip();
            }
        };
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
     * @return CSS template
     */
    static get styles() {
        return css `
      :host {
        display: contents;
        position: absolute;
        max-width: 0;
        max-height: 0;
        min-width: 0;
        min-height: 0;
        flex: none;
        visibility: hidden;
      }
      [part=tooltip] {
        visibility: visible;
        overflow: visible;
      }
      [part=position-adjuster] {
        position: fixed;
        z-index: -1;
        top: 0;
        left: 0;
        visibility: hidden;
      }
    `;
    }
    /**
     * True if an element is an iframe
     * @param relatedTarget Element to check
     * @returns isIframe
     */
    static isIframe(relatedTarget) {
        return relatedTarget !== null && relatedTarget.localName === 'iframe';
    }
    /**
     * Check if the match target has moved position
     * @param matchTargetRect Match target rect
     * @param lastMatchTarget Previous match target
     * @returns matches
     */
    static elementHasMoved(matchTargetRect, lastMatchTarget) {
        if (lastMatchTarget === null) {
            return true;
        }
        return lastMatchTarget.top !== matchTargetRect.top || lastMatchTarget.left !== matchTargetRect.left;
    }
    /**
     * Set tooltip y coordinate
     * @param x X coordinate
     */
    set x(x) {
        const oldX = this._x;
        if (oldX !== x) {
            this._x = x;
            void this.requestUpdate('x', oldX);
        }
    }
    /**
     * Set tooltip y coordinate
     * @param y Y coordinate
     */
    set y(y) {
        const oldY = this._y;
        if (oldY !== y) {
            this._y = y;
            void this.requestUpdate('y', oldY);
        }
    }
    /**
     * Set tooltip position target
     * @param positionTarget Position target
     */
    set positionTarget(positionTarget) {
        const oldPositionTarget = this._positionTarget;
        if (positionTarget !== oldPositionTarget) {
            this._positionTarget = positionTarget;
            void this.requestUpdate('positionTarget', oldPositionTarget);
        }
    }
    /**
     * Run when opened attribute has changed. Map to popup window
     * @param opened True if popup should be opened
     * @returns {void}
     */
    setOpened(opened) {
        const oldOpened = this._opened;
        if (oldOpened !== opened) {
            this._opened = opened;
            void this.requestUpdate('opened', oldOpened);
        }
    }
    connectedCallback() {
        super.connectedCallback();
        register(this, {
            mousemove: this.reset,
            mousemoveThrottled: this.onMouseMove,
            click: this.onClick,
            mouseout: this.onMouseOut,
            mouseleave: this.resetTooltip,
            wheel: this.resetTooltip,
            keydown: this.resetTooltip,
            blur: this.resetTooltip
        });
    }
    disconnectedCallback() {
        deregister(this);
        this.setOpened(false);
        this.reset();
        this.matchTarget = null;
        this.matchTargetRect = null;
        this.positionTarget = null;
        super.disconnectedCallback();
    }
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.showDelay = parseInt(this.getComputedVariable('--show-delay', '300'), 10);
        this.hideDelay = parseInt(this.getComputedVariable('--hide-delay', '150'), 10);
    }
    /**
     * Check whether an element matches by condition
     * If condition is not defined, checks by CSS selector
     * @param element Element to check
     * @param paths Event paths
     * @returns true if element matches
     */
    isMatchElement(element, paths) {
        if (this.condition) {
            return this.condition(element, paths);
        }
        if (this.selector) {
            return matches(element, this.selector);
        }
        return false;
    }
    /**
     * Return true if the target matches condition. False otherwise
     * @param paths Target to match against
     * @returns matched element or null
     */
    getMatchedElement(paths) {
        if (!this.condition && !this.selector) {
            return null;
        }
        const l = paths.length;
        for (let i = 0; i < l; i += 1) {
            const node = paths[i];
            if (node.nodeType !== Node.ELEMENT_NODE) {
                continue;
            }
            if (node === document.body || node === document.documentElement) {
                return null;
            }
            const element = node;
            if (this.isMatchElement(element, paths)) {
                return element;
            }
        }
        return null;
    }
    /**
     * Check if the autosuggest has content
     * @returns {Boolean} content exists
     * @private
     */
    hasSlotContent() {
        if (this.contentNodes) {
            /* show the slot. Default slotted content cannot work with tooltip or renderer */
            return false;
        }
        // Space characters (e.g. space, tab, EOL) don't count as having content
        const nodes = this.contentSlot.assignedNodes() || [];
        return nodes.some(({ nodeType, textContent }) => nodeType === Node.ELEMENT_NODE || textContent && textContent.search(/\S/) >= 0); // If node is element always return true
    }
    /**
     * Get content off the target element
     * @param target Target to check against
     * @returns contentNode or null
     */
    getContentNode(target) {
        let content;
        if (typeof this.renderer === 'function') {
            content = this.renderer(target);
        }
        else {
            content = tooltipRenderer(target);
        }
        if (typeof content === 'string' && content) {
            return document.createTextNode(content);
        }
        if (content instanceof HTMLElement) {
            return content.cloneNode(true);
        }
        if (content instanceof DocumentFragment) {
            return content.cloneNode(true);
        }
        return null;
    }
    /**
     * Render content based on render to tooltip
     * @param contentNode Content node to set
     * @returns {void}
     */
    renderContentNode(contentNode) {
        var _a;
        if (contentNode instanceof Text && this.textContent === contentNode.textContent) {
            return; /* Do not re-render the same text. Due to IE11 limitation we have to operate with text nodes */
        }
        if ((_a = this.contentNodes) === null || _a === void 0 ? void 0 : _a.length) {
            this.contentNodes.forEach((node) => {
                var _a;
                (_a = node.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(node);
            });
        }
        if (contentNode instanceof DocumentFragment) {
            this.contentNodes = [...contentNode.childNodes];
        }
        else {
            this.contentNodes = [contentNode];
        }
        this.appendChild(contentNode);
    }
    /**
     * Hide tooltip
     * @returns {void}
     */
    hideTooltip() {
        this.reset();
        this.matchTarget = null;
        this.matchTargetRect = null;
        this.positionTarget = null;
        this.setOpened(false);
    }
    /**
     * Try to show the tooltip if it matches the target
     * @param paths The paths leading to target
     * @param x X mouse coordinate
     * @param y Y mouse coordinate
     * @returns {void}
     */
    showTooltip(paths, x, y) {
        // composedPath is only available on the direct event
        this.timerTimeout = window.setTimeout(() => {
            const lastMatchTarget = this.matchTarget;
            const matchTarget = this.getMatchedElement(paths);
            this.matchTarget = matchTarget;
            if (!matchTarget) {
                this.setOpened(false);
                return;
            }
            const matchTargetRect = matchTarget.getBoundingClientRect();
            if (lastMatchTarget === matchTarget && !Tooltip_1.elementHasMoved(matchTargetRect, this.matchTargetRect)) {
                return;
            }
            this.matchTargetRect = matchTargetRect;
            this.clicked = false;
            // adjust tooltip x & y vs clientX and clientY
            const adjusterRect = this.positionAdjusterEl.getBoundingClientRect();
            x = adjusterRect.left >= 0 ? x - adjusterRect.left : x;
            y = adjusterRect.top >= 0 ? y - adjusterRect.top : y;
            if (this.hasSlotContent()) {
                this.showTooltipAtPosition(matchTarget, x, y);
                return;
            }
            const contentNode = this.getContentNode(matchTarget);
            if (contentNode) {
                this.renderContentNode(contentNode);
                this.showTooltipAtPosition(matchTarget, x, y);
                return;
            }
            this.setOpened(false);
        }, this.getTooltipShowDelay);
    }
    /**
     * Get the delay to show tooltip
     */
    get getTooltipShowDelay() {
        return this.clicked ? Math.round(this.hideDelay / 2) : this.opened ? this.hideDelay : this.showDelay;
    }
    /**
     * Show the tooltip corresponding to the correct position
     * @param matchTarget Target to show the tooltip against
     * @param x X coordinate
     * @param y Y coordinate
     * @returns {void}
     */
    showTooltipAtPosition(matchTarget, x, y) {
        switch (this.position) {
            case 'above':
            case 'right':
            case 'below':
            case 'left':
                this.x = 0;
                this.y = 0;
                this.positionTarget = matchTarget;
                break;
            default:
                this.positionTarget = null;
                this.x = x;
                this.y = y;
        }
        this.setOpened(true);
    }
    /**
     * Get popup position based on tooltip position
     */
    get tipPosition() {
        return TooltipPositionMap[this.position];
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @returns Render template
     */
    render() {
        return html `<ef-overlay
      part="tooltip"
      .noCancelOnEscKey=${true}
      .noCancelOnOutsideClick=${true}
      .withShadow=${true}
      .noInteractionLock=${true}
      .noFocusManagement=${true}
      ?opened=${this._opened}
      .position=${this.tipPosition}
      .transitionStyle=${this.transitionStyle}
      .positionTarget=${this._positionTarget}
      .x=${this._x}
      .y=${this._y}><slot id="contentSlot"></slot></ef-overlay><div part="position-adjuster"></div>`;
    }
    /**
     * true if tooltip is opened, false otherwise
     * @returns opened
     */
    get opened() {
        return this._opened;
    }
};
__decorate([
    property({ type: String })
], Tooltip.prototype, "selector", void 0);
__decorate([
    property({ type: Function, attribute: false })
], Tooltip.prototype, "condition", void 0);
__decorate([
    property({ type: Function, attribute: false })
], Tooltip.prototype, "renderer", void 0);
__decorate([
    property({ type: String })
], Tooltip.prototype, "position", void 0);
__decorate([
    property({ type: String, attribute: 'transition-style' })
], Tooltip.prototype, "transitionStyle", void 0);
__decorate([
    query('[part=tooltip]')
], Tooltip.prototype, "tooltip", void 0);
__decorate([
    query('[part=position-adjuster]')
], Tooltip.prototype, "positionAdjusterEl", void 0);
__decorate([
    query('#contentSlot')
], Tooltip.prototype, "contentSlot", void 0);
Tooltip = Tooltip_1 = __decorate([
    customElement('ef-tooltip', {
        alias: 'coral-tooltip'
    })
], Tooltip);
export * from './elements/tooltip-element';
export { registerOverflowTooltip, Tooltip };
//# sourceMappingURL=index.js.map