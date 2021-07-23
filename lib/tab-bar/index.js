var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, customElement, property, query, ResponsiveElement } from '@refinitiv-ui/core';
import { tweenAnimate } from './helpers/animate';
import '../button';
import { VERSION } from '../';
const BAR_TRAVEL_DISTANCE = 150; // scroll distance
/**
 * Container for tabs
 */
let TabBar = class TabBar extends ResponsiveElement {
    constructor() {
        super(...arguments);
        /**
         * Specify tab's horizontal alignment
         */
        this.alignment = 'left';
        /**
         * Use level styling from theme
         */
        this.level = '1';
        /**
         * Use to switch from horizontal to vertical layout.
         */
        this.vertical = false;
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
        display: flex;
      }
      :host([alignment=center]) {
        justify-content: center;
      }
      :host([alignment=right]) {
        justify-content: flex-end;
      }
    `;
    }
    /**
     * Called after the element’s DOM has been updated the first time.
     * register scroll event on content element to toggle scroll button
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.content.addEventListener('scroll', () => {
            // Clear our timeout throughout the scroll
            window.clearTimeout(this.isScrolling);
            // Set a timeout to run after scrolling ends
            this.isScrolling = window.setTimeout(() => {
                this.toggleScrollButton(this.content.clientWidth);
            }, 66); // equal 15 fps for compatibility
        });
    }
    /**
     * Called when the element’s DOM has been updated and rendered
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    updated(changedProperties) {
        /* istanbul ignore else */
        if (changedProperties.has('level')) {
            this.setLevel();
        }
        if (changedProperties.has('vertical')) {
            // if tab bar changed from horizontal to vertical
            if (this.vertical) {
                this.hideScrollButtons();
            }
        }
        super.updated(changedProperties);
    }
    /**
     * private method but can't override
     * access modifiers in typescript.
     * @ignore
     * @param size element dimensions
     * @returns {void}
     */
    resizedCallback(size) {
        if (!this.vertical) {
            this.toggleScrollButton(size.width);
        }
    }
    /**
     * Hide all scroll buttons
     * @returns {void}
     */
    hideScrollButtons() {
        this.leftBtn.style.setProperty('display', 'none');
        this.rightBtn.style.setProperty('display', 'none');
    }
    /**
     * Hide/Show scroll button when element is overflow.
     * @param elementWidth width of element
     * @returns {void}
     */
    toggleScrollButton(elementWidth) {
        const { scrollLeft, scrollWidth } = this.content;
        if (this.vertical) {
            return;
        }
        // handle left button
        if (scrollLeft > 0) {
            this.leftBtn.style.setProperty('display', 'flex');
        }
        else {
            this.leftBtn.style.setProperty('display', 'none');
        }
        // handle right button
        if (Math.floor(scrollWidth - scrollLeft) > Math.round(elementWidth)) {
            this.rightBtn.style.setProperty('display', 'flex');
        }
        else {
            this.rightBtn.style.setProperty('display', 'none');
        }
    }
    /**
     * Set tab level attribute accordingly
     * @returns {void}
     */
    setLevel() {
        const tabList = this.querySelectorAll('ef-tab');
        tabList.forEach((tab) => {
            tab.level = this.level;
        });
    }
    /**
     * Detects when slot changes
     * @returns {void}
     */
    onSlotChange() {
        this.setLevel();
    }
    /**
     * Update scroll position when clicked on left button
     * @returns {void}
     */
    handleScrollLeft() {
        const { scrollLeft } = this.content;
        const availableScrollLeft = scrollLeft;
        let endPosition = scrollLeft - BAR_TRAVEL_DISTANCE;
        // If the space available is less than one half lots of our desired distance, just move to the leftest
        if (availableScrollLeft < BAR_TRAVEL_DISTANCE * 1.5) {
            endPosition = 0;
        }
        tweenAnimate({ target: this.content, startPosition: scrollLeft, endPosition });
    }
    /**
     * Update scroll position when clicked on right button
     * @returns {void}
     */
    handleScrollRight() {
        const { scrollLeft, scrollWidth, clientWidth } = this.content;
        const availableScrollRight = scrollWidth - (scrollLeft + clientWidth);
        let endPosition = scrollLeft + BAR_TRAVEL_DISTANCE;
        // If the space available is less than one half lots of our desired distance, just move the whole amount
        if (availableScrollRight < BAR_TRAVEL_DISTANCE * 1.5) {
            endPosition = scrollLeft + availableScrollRight;
        }
        tweenAnimate({ target: this.content, startPosition: scrollLeft, endPosition });
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return html `
    <ef-button icon="left" part="left-btn" @tap=${this.handleScrollLeft}></ef-button>
      <div part="content">
        <slot @slotchange=${this.onSlotChange}></slot>
      </div>
    <ef-button icon="right" part="right-btn" @tap=${this.handleScrollRight}></ef-button>
    `;
    }
};
__decorate([
    property({ type: String, reflect: true })
], TabBar.prototype, "alignment", void 0);
__decorate([
    property({ type: String, reflect: true })
], TabBar.prototype, "level", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], TabBar.prototype, "vertical", void 0);
__decorate([
    query('[part="content"')
], TabBar.prototype, "content", void 0);
__decorate([
    query('[part="left-btn"]')
], TabBar.prototype, "leftBtn", void 0);
__decorate([
    query('[part="right-btn"]')
], TabBar.prototype, "rightBtn", void 0);
TabBar = __decorate([
    customElement('ef-tab-bar', {
        alias: 'coral-tab-bar'
    })
], TabBar);
export { TabBar };
//# sourceMappingURL=index.js.map