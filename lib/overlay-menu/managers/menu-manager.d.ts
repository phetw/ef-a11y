import { Item } from '../../item';
import { OverlayMenu } from '../index';
/**
 * Overlay menu manager monitors menu nesting and ensures
 * that only a single menu tree can be opened
 */
declare abstract class OpenedMenusManager {
    private static focusThrottler;
    private static registry;
    private static crossMenu;
    private static overlayStack;
    private static activeMenu?;
    /**
     * Get the sorted list of overlays by z-index
     */
    private static get overlays();
    /**
     * Run when tap event happened on document
     * @param event Tap start event
     * @returns {void}
     */
    private static closeOnOutsideOfMenuTap;
    /**
     * Mark active menu with active attribute
     * This is required for compact menus to change styles
     * @returns {void}
     */
    private static setActiveMenu;
    /**
     * A recursion function to close nested menus
     * @param parent Parent menu
     * @returns false if opened event is prevented
     */
    private static _closeMenuFor;
    /**
     * Close all nested menus for parent menu
     * @param parent Parent menu
     * @returns false if opened event is prevented
     */
    private static closeMenuFor;
    /**
     * Set the state of menu
     * @param menu The menu
     * @param opened True to make menu opened
     * @returns false if event is prevented
     */
    private static setOpened;
    /**
    * Register the menu
    * Can be called multiple times if menu items collection has changed
    * @param menu Menu
    * @returns {void}
    */
    static register(menu: OverlayMenu): void;
    /**
    * Deregister the menu
    * @param menu Menu
    * @returns {void}
    */
    static deregister(menu: OverlayMenu): void;
    /**
     * Try to open nested menu for provided item. If no item provided, close nested menu
     * @param parentMenu Parent menu
     * @param [item] Item to check menu for
     * @returns {void}
     */
    static toggleNestedMenuFor(parentMenu: OverlayMenu, item?: Item): void;
    /**
     * Get parent menu from child menu if any
     * @param childMenu menu to find parent for
     * @returns parent menu or undefined
     */
    static getParentMenu(childMenu: OverlayMenu): OverlayMenu | undefined;
    /**
     * Get parent menu item from child menu if any
     * @param childMenu menu to find parent for
     * @returns parent menu item or undefined
     */
    static getParentMenuItem(childMenu: OverlayMenu): Item | undefined;
    /**
     * Check if menu is nested, a.k.a. has parent menu
     * @param menu Menu to check
     * @returns true if menu is nested
     */
    static isNested(menu: OverlayMenu): boolean;
    /**
     * Check if menu is active, a.k.a. it is to of z-index stack
     * @param menu Menu to check
     * @returns true if menu is active
     */
    static isActiveMenu(menu: OverlayMenu): boolean;
    /**
     * Clear all manager items
     * @returns {void}
     */
    static clear(): void;
}
export { OpenedMenusManager };
//# sourceMappingURL=menu-manager.d.ts.map