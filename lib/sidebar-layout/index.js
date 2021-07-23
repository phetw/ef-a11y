var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BasicElement, html, css, customElement, property, ifDefined, query } from '@refinitiv-ui/core';
import '../layout';
import { VERSION } from '../';
/**
 * Provides an app layout with sidebar.
 * There are 4 sections that can be slotted a component in.
 *
 * @slot sidebar-header - Sidebar header.
 * @slot sidebar-content - Content of sidebar.
 * @slot main-header - Main header.
 * @slot main-content - Content of main section.
 */
let SidebarLayout = class SidebarLayout extends BasicElement {
    constructor() {
        super(...arguments);
        /**
         * Set to hide sidebar
         */
        this.collapsed = false;
        /**
         * Set sidebar position to left or right
         */
        this.sidebarPosition = 'left';
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
        display: block;
      }

      [part=container] {
        height: 100%;
      }

      ef-layout ::slotted(ef-panel) {
        width: 100%;
        min-height: 100%;
      }

      .content {
        height: 100%;
      }

      [part=sidebar] {
        width: var(--sidebar-width);
      }

      :host([collapsed]:not([sidebar-position])) [part=sidebar],
      :host([collapsed][sidebar-position=left]) [part=sidebar] {
        margin-left: calc(var(--sidebar-width) * -1);
      }

      :host([collapsed][sidebar-position=right]) [part=sidebar] {
        margin-right: calc(var(--sidebar-width) * -1);
      }
    `;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
        return html `
      <ef-layout flex nowrap part="container">

        <ef-layout flex container part="sidebar" size="${ifDefined(this.sidebarWidth || undefined)}">
          <ef-layout size="auto">
            <slot name="sidebar-header"></slot>
          </ef-layout>
          <ef-layout class="content" scrollable basis="auto">
            <slot name="sidebar-content"></slot>
          </ef-layout>
        </ef-layout>

        <ef-layout flex container basis="100%" part="main">
          <ef-layout size="auto">
            <slot name="main-header"></slot>
          </ef-layout>
          <ef-layout class="content" scrollable basis="auto">
            <slot name="main-content"></slot>
          </ef-layout>
        </ef-layout>

      </ef-layout>
    `;
    }
    /**
     * @override
     * @returns {void}
     */
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('sidebarWidth')) {
            this.updateVariable('--sidebar-width', this.sidebarWidth);
        }
    }
};
__decorate([
    property({ type: String, attribute: 'sidebar-width' })
], SidebarLayout.prototype, "sidebarWidth", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SidebarLayout.prototype, "collapsed", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'sidebar-position' })
], SidebarLayout.prototype, "sidebarPosition", void 0);
__decorate([
    query('[part=sidebar]')
], SidebarLayout.prototype, "sidebar", void 0);
SidebarLayout = __decorate([
    customElement('ef-sidebar-layout', {
        alias: 'carbon-sidebar-layout'
    })
], SidebarLayout);
export { SidebarLayout };
//# sourceMappingURL=index.js.map