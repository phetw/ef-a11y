import { Overlay } from '../elements/overlay';
export declare const ZIndex = 103;
export declare type OverlayLayer = {
    overlay: Overlay;
    zIndex: number;
};
/**
 * Z-index manager monitors z-indexes and ensures that the last opened/last
 * focused overlay has the highest z-index
 * @returns {void}
 */
export declare class ZIndexManager {
    private registry;
    private focusThrottled;
    private sortByZIndex;
    private mergeSortByZIndex;
    private get sorted();
    private setZIndex;
    private getNextZIndex;
    private onFocus;
    toFront(overlay: Overlay): void;
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
    /**
     * Get overlay layers sorted by z-index
     * @returns overlay layers
     */
    getOverlayLayers(): OverlayLayer[];
    /**
     * Get overlay panels sorted by z-index
     * @returns overlay panels
     */
    getOverlays(): Overlay[];
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
 * Bring overlay panel to the front
 * @param overlay Overlay
 * @returns {void}
 */
export declare const toFront: (overlay: Overlay) => void;
/**
 * @returns count of elements inside manager
 */
export declare const size: () => number;
/**
 * removes all elements from registry
 * @returns {void}
 */
export declare const clear: () => void;
/**
 * Get the list of overlays sorted by z-index
 * @returns overlay list
 */
export declare const getOverlays: () => Overlay[];
/**
 * Get the list of overlay layers sorted by z-index
 * @returns overlay layer list
 */
export declare const getOverlayLayers: () => OverlayLayer[];
//# sourceMappingURL=zindex-manager.d.ts.map