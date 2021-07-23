import { Overlay } from '../elements/overlay';
import '../elements/overlay-viewport';
import { ViewAreaInfo } from '../helpers/types';
/**
 * Viewport manager singleton is responsible for getting
 * viewport sizes and reacting on viewport changes
 * @returns {void}
 */
export declare class ViewportManager {
    private registry;
    private viewRegistry;
    private refitFrame;
    private screenViewport;
    /**
     * Refit all overlays
     * @returns {void}
     */
    private callRefit;
    /**
     * Create overlay-viewport and insert it before the provided node
     * @param insertBefore A node to insert before
     * @returns created overlay-viewport
     */
    private createViewport;
    /**
     * Remove overlay-viewport from DOM tree
     * @param viewport overlay-viewport to remove
     * @returns {void}
     */
    private removeViewport;
    /**
     * Set screen sizing viewport
     * @returns void
     */
    private setScreenViewport;
    /**
     * Removes screen sizing viewport
     * @returns void
     */
    private removeScreenViewport;
    /**
     * Reset sizing for viewport
     * @param viewport Viewport to reset sizing for
     * @returns {void}
     */
    private resetViewportSizing;
    getViewAreaInfo(overlay: Overlay): ViewAreaInfo;
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
 * Register the new overlay. Must be run to let start behaviour to listen for viewport events
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
 * @typedef {Object} ViewAreaInfo
 * @property {Number} viewHeight - The height of view area
 * @property {Number} viewWidth - The width of view area
 * @property {Number} [offsetTop=0] - iOS only the view area vertical offset
 * @property {Number} [offsetLeft=0] - iOS only the view area horizontal offset
 */
/**
 * Get sizing information of the viewport for overlay
 * @param overlay Overlay to get info for
 * @return area info
 */
export declare const getViewAreaInfo: (overlay: Overlay) => ViewAreaInfo;
/**
 * @returns count of elements inside manager
 */
export declare const size: () => number;
/**
 * removes all elements from registry
 * @returns {void}
 */
export declare const clear: () => void;
