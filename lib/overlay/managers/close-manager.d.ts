import { Overlay } from '../elements/overlay';
declare type CloseCallback = () => void;
/**
 * Close manager ensures that the correct (or the most top) overlay
 * is closed on ESC and click events
 * @returns {void}
 */
export declare class CloseManager {
    private registry;
    private get overlays();
    private getTopOverlay;
    private onKeyDown;
    private onEscKey;
    /**
     * Run when document tap event happens.
     * @param event event object
     * @returns {void}
     */
    private onTapStart;
    register(overlay: Overlay, closeCallback: CloseCallback): void;
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
 * @param closeCallback A function to close the overlay
 * @returns {void}
 */
export declare const register: (overlay: Overlay, closeCallback: CloseCallback) => void;
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
export {};
//# sourceMappingURL=close-manager.d.ts.map