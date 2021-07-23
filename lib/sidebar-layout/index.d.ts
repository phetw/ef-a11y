import { BasicElement, TemplateResult, CSSResult, PropertyValues } from '@refinitiv-ui/core';
import { Layout } from '../layout';
import '../layout';
/**
 * Provides an app layout with sidebar.
 * There are 4 sections that can be slotted a component in.
 *
 * @slot sidebar-header - Sidebar header.
 * @slot sidebar-content - Content of sidebar.
 * @slot main-header - Main header.
 * @slot main-content - Content of main section.
 */
export declare class SidebarLayout extends BasicElement {
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
     * Set the width of the sidebar. The value could be in both px or %, e.g. 300px, 30%
     * @type {string}
     */
    sidebarWidth?: string;
    /**
     * Set to hide sidebar
     */
    collapsed: boolean;
    /**
     * Set sidebar position to left or right
     */
    sidebarPosition: 'left' | 'right';
    /**
     * Property to get sidebar
     */
    sidebar: Layout;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    protected render(): TemplateResult;
    /**
     * @override
     * @returns {void}
     */
    protected updated(changedProperties: PropertyValues): void;
}
