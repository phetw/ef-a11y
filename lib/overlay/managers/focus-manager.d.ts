import { Overlay } from '../elements/overlay';
/**
 * Focus manager ensures that the correct
 * element receives the focus
 * @returns {void}
 */
export declare class FocusManager {
    private focusThrottler;
    private registry;
    private restoreFocusElement;
    private lastFocused;
    private get overlays();
    private get focusBoundaryElements();
    private getTabbableElements;
    private getActiveTabbableNodes;
    private onTabKey;
    private getReTargetFocusNode;
    private getShadowActiveElement;
    private getActiveElement;
    private isFocusBoundaryDescendant;
    /**
     * Run when document key down event happens
     * @param event Keyboard event
     * @returns {void}
     */
    private onDocumentKeyDown;
    /**
     * True if passed target is a registered overlay
     * @param target Target to check
     * @returns true if registered overlay
     */
    private isRegisteredOverlay;
    /**
     * Run on overlay focus order to restore overlay focus
     * @param event focusin event
     * @returns {void}
     */
    private onOverlayFocus;
    register(overlay: Overlay): void;
    deregister(overlay: Overlay): void;
    /**
     * @returns count of elements inside manager
     */
    size(): number;
    /**
     * applies deregister for each element in registry
     * @returns {void}
     */
    clear(): void;
}
/**
 * Register the new overlay
 * @param overlay Overlay
 * @returns {void}
 */
export declare const register: (overlay: Overlay) => void;
/**
 * Deregister the overlay
 * @param overlay Overlay
 * @returns {void}
 */
export declare const deregister: (overlay: Overlay) => void;
/**
 * @returns count of elements inside manager
 */
export declare const size: () => number;
/**
 * removes all elements from registry
 * @returns {void}
 */
export declare const clear: () => void;
//# sourceMappingURL=focus-manager.d.ts.map