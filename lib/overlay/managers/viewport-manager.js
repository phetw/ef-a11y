import { AnimationTaskRunner } from '@refinitiv-ui/utils';
import '../elements/overlay-viewport';
/**
  * Default values for area info
*/
const viewAreaInfo = {
    viewHeight: 0,
    viewWidth: 0,
    offsetTop: 0,
    offsetLeft: 0,
    offsetBottom: 0,
    offsetRight: 0,
    viewOffsetTop: 0,
    viewOffsetLeft: 0
};
// Used to capture scroll events
const ScrollEventOptions = { capture: true, passive: true };
/**
 * Viewport manager singleton is responsible for getting
 * viewport sizes and reacting on viewport changes
 * @returns {void}
 */
export class ViewportManager {
    constructor() {
        this.registry = new Map();
        this.viewRegistry = new WeakMap();
        this.refitFrame = new AnimationTaskRunner();
        this.screenViewport = null;
        /**
         * Refit all overlays
         * @returns {void}
         */
        this.callRefit = () => {
            this.refitFrame.schedule(() => {
                this.registry.forEach((viewport, overlay) => {
                    this.resetViewportSizing(viewport);
                    overlay.fit();
                });
            });
        };
    }
    /**
     * Create overlay-viewport and insert it before the provided node
     * @param insertBefore A node to insert before
     * @returns created overlay-viewport
     */
    createViewport(insertBefore) {
        var _a;
        const viewport = document.createElement('ef-overlay-viewport');
        (_a = insertBefore === null || insertBefore === void 0 ? void 0 : insertBefore.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(viewport, insertBefore);
        return viewport;
    }
    /**
     * Remove overlay-viewport from DOM tree
     * @param viewport overlay-viewport to remove
     * @returns {void}
     */
    removeViewport(viewport) {
        var _a;
        (_a = viewport.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(viewport);
    }
    /**
     * Set screen sizing viewport
     * @returns void
     */
    setScreenViewport() {
        if (!this.screenViewport) {
            this.screenViewport = this.createViewport(document.body);
        }
    }
    /**
     * Removes screen sizing viewport
     * @returns void
     */
    removeScreenViewport() {
        if (this.screenViewport) {
            this.removeViewport(this.screenViewport);
            this.screenViewport = null;
        }
    }
    /**
     * Reset sizing for viewport
     * @param viewport Viewport to reset sizing for
     * @returns {void}
     */
    resetViewportSizing(viewport) {
        if (!this.screenViewport) {
            return;
        }
        const screenRect = this.screenViewport.getBoundingClientRect();
        // since screenViewport is applied on html element, it does not include body zoom
        const zoom = parseFloat(window.getComputedStyle(document.body).zoom);
        const screenHeight = screenRect.height / zoom;
        const screenWidth = screenRect.width / zoom;
        const { top, left, bottom, right } = viewport.getBoundingClientRect();
        const offsetTop = top < 0 ? Math.abs(top) : 0;
        const offsetLeft = left < 0 ? Math.abs(left) : 0;
        const offsetBottom = bottom > screenHeight ? bottom - screenHeight : 0;
        const offsetRight = right > screenWidth ? right - screenWidth : 0;
        const viewHeight = viewport.offsetHeight - offsetTop - offsetBottom;
        const viewWidth = viewport.offsetWidth - offsetLeft - offsetRight;
        this.viewRegistry.set(viewport, {
            viewOffsetTop: top < 0 ? top + offsetTop : top,
            viewOffsetLeft: left < 0 ? left + offsetLeft : left,
            viewHeight: viewHeight < 0 ? 0 : viewHeight,
            viewWidth: viewWidth < 0 ? 0 : viewWidth,
            offsetTop,
            offsetLeft,
            offsetBottom,
            offsetRight
        });
    }
    getViewAreaInfo(overlay) {
        const viewport = this.registry.get(overlay);
        if (!viewport) {
            return viewAreaInfo;
        }
        if (!this.viewRegistry.has(viewport)) {
            this.resetViewportSizing(viewport);
        }
        return this.viewRegistry.get(viewport) || viewAreaInfo;
    }
    register(overlay) {
        if (!this.registry.size) {
            window.addEventListener('resize', this.callRefit);
            window.addEventListener('orientationchange', this.callRefit);
            window.addEventListener('scroll', this.callRefit, ScrollEventOptions);
            this.setScreenViewport();
        }
        if (!this.registry.has(overlay)) {
            const viewport = this.createViewport(overlay);
            this.registry.set(overlay, viewport);
            viewport.addEventListener('resize', () => overlay.fit());
        }
    }
    deregister(overlay) {
        if (this.registry.has(overlay)) {
            const viewport = this.registry.get(overlay);
            viewport && this.removeViewport(viewport);
            this.registry.delete(overlay);
        }
        if (!this.registry.size) {
            window.removeEventListener('resize', this.callRefit);
            window.removeEventListener('orientationchange', this.callRefit);
            window.removeEventListener('scroll', this.callRefit, ScrollEventOptions);
            this.removeScreenViewport();
        }
    }
    /**
     * @returns count of elements inside manager
     */
    size() {
        return this.registry.size;
    }
    /**
     * applies deregister for each element in registry
     * @returns {void}
     */
    clear() {
        this.registry.forEach((viewport, overlay) => this.deregister(overlay));
    }
}
const viewportManager = new ViewportManager();
/**
 * Register the new overlay. Must be run to let start behaviour to listen for viewport events
 * @param overlay Overlay
 * @returns {void}
 */
export const register = (overlay) => {
    viewportManager.register(overlay);
};
/**
 * Deregister the overlay
 * @param overlay Overlay
 * @returns {void}
 */
export const deregister = (overlay) => {
    viewportManager.deregister(overlay);
};
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
export const getViewAreaInfo = (overlay) => {
    return viewportManager.getViewAreaInfo(overlay);
};
/**
 * @returns count of elements inside manager
 */
export const size = () => {
    return viewportManager.size();
};
/**
 * removes all elements from registry
 * @returns {void}
 */
export const clear = () => {
    viewportManager.clear();
};
//# sourceMappingURL=viewport-manager.js.map