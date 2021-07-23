import { getOverlayLayers } from './zindex-manager';
import '../elements/overlay-backdrop';
/**
 * Backdrop manager adds a backdrop to the body
 * @returns {void}
 */
export class BackdropManager {
    constructor() {
        this.registry = new Set();
        this.backdropElement = document.createElement('ef-overlay-backdrop');
        this.position = () => {
            const overlays = this.overlays;
            if (!overlays.length) {
                this.removeBackdropElement();
                return;
            }
            const { overlay, zIndex } = overlays[0];
            const backdropElement = this.backdropElement;
            if (!overlay.parentNode) {
                this.removeBackdropElement();
                return;
            }
            if (backdropElement.nextElementSibling === overlay) {
                return;
            }
            backdropElement.zIndex = zIndex;
            overlay.parentNode.insertBefore(backdropElement, overlay);
        };
    }
    get overlays() {
        return getOverlayLayers().filter(({ overlay }) => this.registry.has(overlay));
    }
    removeBackdropElement() {
        const backdropElement = this.backdropElement;
        if (backdropElement.parentNode) {
            backdropElement.parentNode.removeChild(backdropElement);
        }
    }
    register(overlay) {
        if (!this.registry.has(overlay)) {
            overlay.addEventListener('focus', this.position);
            this.registry.add(overlay);
        }
        this.position();
    }
    deregister(overlay) {
        if (this.registry.has(overlay)) {
            overlay.removeEventListener('focus', this.position);
            this.registry.delete(overlay);
            this.position();
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
        this.registry.forEach(overlay => this.deregister(overlay));
    }
}
const backdropManager = new BackdropManager();
/**
 * Register the new overlay
 * @param overlay Overlay
 * @returns {void}
 */
export const register = (overlay) => {
    backdropManager.register(overlay);
};
/**
 * Deregister the overlay
 * @param overlay Overlay
 * @returns {void}
 */
export const deregister = (overlay) => {
    backdropManager.deregister(overlay);
};
/**
 * @returns count of elements inside manager
 */
export const size = () => {
    return backdropManager.size();
};
/**
 * removes all elements from registry
 * @returns {void}
 */
export const clear = () => {
    backdropManager.clear();
};
//# sourceMappingURL=backdrop-manager.js.map