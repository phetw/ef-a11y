import { Overlay } from '../elements/overlay';
import { AnimationTaskRunner } from '@refinitiv-ui/utils';
import { getOverlays } from './zindex-manager';
import { FocusableHelper } from '@refinitiv-ui/core';
/**
 * Focus manager ensures that the correct
 * element receives the focus
 * @returns {void}
 */
export class FocusManager {
    constructor() {
        this.focusThrottler = new AnimationTaskRunner(); /* used to delay focus to give time for overlay to show up */
        this.registry = new Set();
        this.restoreFocusElement = null; /* used to restore focus on close */
        this.lastFocused = new WeakMap(); /* used to store last focused item */
        /**
         * Run when document key down event happens
         * @param event Keyboard event
         * @returns {void}
         */
        this.onDocumentKeyDown = (event) => {
            if (event.key === 'Tab') {
                this.onTabKey(event);
                return;
            }
        };
        /**
         * True if passed target is a registered overlay
         * @param target Target to check
         * @returns true if registered overlay
         */
        this.isRegisteredOverlay = (target) => target instanceof Overlay && this.overlays.includes(target);
        /**
         * Run on overlay focus order to restore overlay focus
         * @param event focusin event
         * @returns {void}
         */
        this.onOverlayFocus = (event) => {
            const overlay = event.composedPath().find(this.isRegisteredOverlay);
            if (overlay) {
                this.lastFocused.set(overlay, event.target);
            }
        };
    }
    get overlays() {
        return getOverlays().filter(overlay => this.registry.has(overlay));
    }
    get focusBoundaryElements() {
        return getOverlays()
            .map(overlay => overlay.focusBoundary)
            .filter(focusBoundary => focusBoundary !== null);
    }
    getTabbableElements(overlay) {
        return overlay.focusBoundary ? FocusableHelper.getTabbableNodes(overlay.focusBoundary) : [];
    }
    getActiveTabbableNodes(reverse) {
        const sorted = this.overlays;
        const nodes = [];
        const tabbableMap = new Map();
        for (let i = 0; i < sorted.length; i += 1) {
            const overlay = sorted[i];
            const tabbable = this.getTabbableElements(overlay);
            tabbable.forEach(node => tabbableMap.set(node, overlay));
            if (reverse) {
                nodes.push(...tabbable);
            }
            else {
                nodes.splice(0, 0, ...tabbable);
            }
            if (overlay.withBackdrop) { /* if the overlay has backdrop all other overlays with smaller z-index are outside tab scope */
                break;
            }
            if (document.activeElement === overlay && nodes.length) { /* if overlay itself is in focus, try to always focus withing the focused overlay */
                break;
            }
        }
        if (reverse) {
            nodes.reverse();
        }
        return {
            nodes,
            tabbableMap
        };
    }
    onTabKey(event) {
        const { nodes, tabbableMap } = this.getActiveTabbableNodes(event.shiftKey);
        if (nodes.length === 0) {
            return;
        }
        if (nodes.length === 1) { /* no other focusable nodes */
            event.preventDefault();
            nodes[0].focus();
            return;
        }
        const focusNode = this.getReTargetFocusNode(nodes);
        if (focusNode) {
            event.preventDefault();
            const overlay = tabbableMap.get(focusNode);
            const topOverlay = this.overlays[0];
            if (overlay && topOverlay && topOverlay !== overlay) {
                overlay.toFront();
            }
            focusNode.focus();
        }
    }
    getReTargetFocusNode(nodes) {
        const activeElement = this.getActiveElement();
        if (!activeElement || activeElement === nodes[nodes.length - 1] || !this.isFocusBoundaryDescendant(activeElement)) {
            return nodes[0];
        }
        return null;
    }
    getShadowActiveElement(activeElement) {
        var _a;
        if ((_a = activeElement === null || activeElement === void 0 ? void 0 : activeElement.shadowRoot) === null || _a === void 0 ? void 0 : _a.activeElement) {
            return this.getShadowActiveElement(activeElement.shadowRoot.activeElement);
        }
        return activeElement;
    }
    getActiveElement() {
        return this.getShadowActiveElement(document.activeElement);
    }
    isFocusBoundaryDescendant(element) {
        const focusBoundaryElements = this.focusBoundaryElements;
        let node = element.parentNode;
        while (node) {
            if ((node instanceof HTMLElement || node instanceof ShadowRoot) && focusBoundaryElements.includes(node)) {
                return true;
            }
            // parenNode is not defined if the node is inside document fragment. Use host instead
            node = node.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? node.host : node.parentNode;
        }
        return false;
    }
    register(overlay) {
        if (!this.registry.size) {
            this.restoreFocusElement = document.activeElement; /* store this only once, as overlay order may change */
            document.addEventListener('keydown', this.onDocumentKeyDown, { capture: true });
        }
        if (!this.registry.has(overlay)) {
            this.registry.add(overlay);
            // cannot use focusin as it is not propagated through shadow DOM
            overlay.addEventListener('focus', this.onOverlayFocus, true);
            if (!overlay.noAutofocus) {
                this.focusThrottler.schedule(() => {
                    overlay.opened && overlay.focus(); /* always focus the last added overlay */
                });
            }
        }
    }
    deregister(overlay) {
        if (this.registry.has(overlay)) {
            overlay.removeEventListener('focus', this.onOverlayFocus, true);
            this.lastFocused.delete(overlay);
            this.registry.delete(overlay);
            if (!this.registry.size) {
                document.removeEventListener('keydown', this.onDocumentKeyDown, { capture: true });
                /* istanbul ignore next */
                if (this.restoreFocusElement) {
                    this.restoreFocusElement.focus();
                }
                this.restoreFocusElement = null;
            }
            else if (!overlay.noInteractionLock) {
                // if removed overlay has scroll lock (default), move the focus to last focused node in
                // the next available overlay (top overlay)
                const topOverlay = this.overlays[0];
                if (topOverlay) {
                    const focusNode = this.lastFocused.get(topOverlay) || this.getTabbableElements(topOverlay)[0] || topOverlay;
                    this.focusThrottler.schedule(() => {
                        if (!topOverlay.opened) {
                            // It is possible that overlay gets closed during throttling
                            return;
                        }
                        // Make sure that focus is kept within active overlay
                        const tabbableElements = this.getTabbableElements(topOverlay);
                        const activeElement = this.getActiveElement();
                        if (!activeElement || !tabbableElements.includes(activeElement)) {
                            focusNode.focus();
                        }
                    });
                }
            }
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
const focusManager = new FocusManager();
/**
 * Register the new overlay
 * @param overlay Overlay
 * @returns {void}
 */
export const register = (overlay) => {
    focusManager.register(overlay);
};
/**
 * Deregister the overlay
 * @param overlay Overlay
 * @returns {void}
 */
export const deregister = (overlay) => {
    focusManager.deregister(overlay);
};
/**
 * @returns count of elements inside manager
 */
export const size = () => {
    return focusManager.size();
};
/**
 * removes all elements from registry
 * @returns {void}
 */
export const clear = () => {
    focusManager.clear();
};
//# sourceMappingURL=focus-manager.js.map