import { getOverlays } from './zindex-manager';
/**
 * Close manager ensures that the correct (or the most top) overlay
 * is closed on ESC and click events
 * @returns {void}
 */
export class CloseManager {
    constructor() {
        this.registry = new Map();
        this.onKeyDown = ({ key }) => {
            switch (key) {
                case 'Esc':
                case 'Escape':
                    this.onEscKey();
                // no default
            }
        };
        /**
         * Run when document tap event happens.
         * @param event event object
         * @returns {void}
         */
        this.onTapStart = (event) => {
            const topOverlay = this.getTopOverlay();
            /* istanbul ignore next */
            if (!topOverlay) {
                return;
            }
            const { overlay, closeCallback } = topOverlay;
            const path = event.composedPath();
            const focusBoundary = overlay.focusBoundary || overlay;
            const isOutsideClick = !path.includes(focusBoundary);
            if (isOutsideClick && !overlay.noInteractionLock) {
                event.preventDefault();
            }
            if (isOutsideClick && !overlay.noCancelOnOutsideClick) {
                closeCallback();
            }
        };
    }
    get overlays() {
        return getOverlays().filter(overlay => this.registry.has(overlay));
    }
    getTopOverlay() {
        const overlay = this.overlays[0];
        /* istanbul ignore next */
        if (!overlay) {
            return null;
        }
        const closeCallback = this.registry.get(overlay);
        return {
            overlay,
            closeCallback
        };
    }
    onEscKey() {
        const topOverlay = this.getTopOverlay();
        /* istanbul ignore next */
        if (!topOverlay) {
            return;
        }
        const { overlay, closeCallback } = topOverlay;
        // Do nothing
        if (overlay.noCancelOnEscKey) {
            return;
        }
        closeCallback();
    }
    register(overlay, closeCallback) {
        if (!this.registry.size) {
            const eventOptions = {
                capture: true,
                passive: true
            };
            document.addEventListener('keydown', this.onKeyDown, eventOptions);
            document.addEventListener('tapstart', this.onTapStart, true);
        }
        this.registry.set(overlay, closeCallback);
    }
    deregister(overlay) {
        this.registry.delete(overlay);
        if (!this.registry.size) {
            const eventOptions = {
                capture: true,
                passive: true
            };
            document.removeEventListener('keydown', this.onKeyDown, eventOptions);
            document.removeEventListener('tapstart', this.onTapStart, true);
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
        const registryArray = [...this.registry.keys()];
        for (let i = 0; i < registryArray.length; i++) {
            this.deregister(registryArray[i]);
        }
    }
}
const closeManager = new CloseManager();
/**
 * Register the new overlay
 * @param overlay Overlay
 * @param closeCallback A function to close the overlay
 * @returns {void}
 */
export const register = (overlay, closeCallback) => {
    closeManager.register(overlay, closeCallback);
};
/**
 * Deregister the overlay
 * @param overlay Overlay
 * @returns {void}
 */
export const deregister = (overlay) => {
    closeManager.deregister(overlay);
};
/**
 * @returns count of elements inside manager
 */
export const size = () => {
    return closeManager.size();
};
/**
 * removes all elements from registry
 * @returns {void}
 */
export const clear = () => {
    closeManager.clear();
};
//# sourceMappingURL=close-manager.js.map