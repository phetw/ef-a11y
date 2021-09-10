import { Overlay } from '../elements/overlay';
import '../elements/overlay-backdrop';
/**
 * Backdrop manager adds a backdrop to the body
 * @returns {void}
 */
export declare class BackdropManager {
    private registry;
    private backdropElement;
    private get overlays();
    private removeBackdropElement;
    private position;
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
//# sourceMappingURL=backdrop-manager.d.ts.map