export const MAIN_MOUSE_BUTTON = 0;
class DraggableManager {
    constructor() {
        this.lastX = 0;
        this.lastY = 0;
        this.deltaX = 0;
        this.deltaY = 0;
        this.xOffset = 0;
        this.yOffset = 0;
        this.draggableElements = new Map();
        this.draggableElement = null;
        /**
         * @param draggableElement element that will be dragged
         * @param handle element that will be touched for dragging
         * @returns {void}
         */
        this.mouseDownListener = (draggableElement, handle) => (event) => {
            if (event.button === MAIN_MOUSE_BUTTON && event.target === handle) {
                this.draggableElement = draggableElement;
                this.setSelectingOfText(false);
                document.addEventListener('mouseup', this.onRelease);
                document.addEventListener('mousemove', this.onMove);
                this.updateOffset();
                this.drag(event.pageX, event.pageY);
            }
        };
        /**
         * remove event listeners for dragging from document
         * @returns {void}
         */
        this.release = () => {
            document.removeEventListener('mouseup', this.onRelease);
            document.removeEventListener('mousemove', this.onMove);
            this.draggableElement = null;
        };
        this.getDeltaAndShift = (x, y) => {
            if (this.draggableElement) {
                this.deltaX = x - this.lastX;
                this.deltaY = y - this.lastY;
                this.lastX = x;
                this.lastY = y;
                this.shift(this.deltaX, this.deltaY);
            }
        };
        /**
         * provides functionality needs for release draggable element
         * @param event mouse up event
         * @returns {void}
         */
        this.onRelease = (event) => {
            if (this.draggableElement) {
                this.setSelectingOfText(true);
                this.release();
                event.preventDefault();
                event.stopPropagation();
            }
        };
        this.onMove = (event) => {
            if (this.draggableElement && event.button === MAIN_MOUSE_BUTTON) {
                this.getDeltaAndShift(event.pageX, event.pageY);
            }
            else {
                this.release();
            }
        };
    }
    /**
     * register element for dragging
     * @param draggableElement element that will be dragged
     * @param handle element that will be captured for dragging
     * @returns {void}
     */
    register(draggableElement, handle) {
        if (!this.draggableElements.has(draggableElement)) {
            this.draggableElements.set(draggableElement, {
                mouseDownListener: this.mouseDownListener(draggableElement, handle),
                handle
            });
            this.setHandleListeners(draggableElement);
        }
        DraggableManager.setHandleCursor(handle);
    }
    /**
     * remove element from list of draggable
     * @param draggableElement element for dragging
     * @returns {void}
     */
    deregister(draggableElement) {
        var _a;
        if (this.draggableElements.has(draggableElement)) {
            const handle = (_a = this.draggableElements.get(draggableElement)) === null || _a === void 0 ? void 0 : _a.handle;
            if (handle) {
                DraggableManager.removeHandleCursor(handle);
            }
            this.removeHandleListeners(draggableElement);
            this.draggableElements.delete(draggableElement);
            if (this.draggableElement === draggableElement) {
                this.release();
            }
        }
    }
    /**
     * Shifts the drag container by the specified x/y values
     * @param x Amount to shift the x-axis
     * @param y Amount to shift the y-axis
     * @returns {void}
     */
    shift(x, y) {
        if (this.draggableElement) {
            // Shift the offsets
            this.xOffset += x;
            this.yOffset += y;
            // Get the current container box rect.
            const box = this.draggableElement.getBoundingClientRect();
            const scrollingElement = document.documentElement;
            // Don't allow the box to move outside the bounds of the viewport
            x = Math.min(Math.max(this.xOffset, 0), scrollingElement.clientWidth - box.width);
            y = Math.min(Math.max(this.yOffset, 0), scrollingElement.clientHeight - box.height);
            // Update the container position
            this.draggableElement.style.left = `${x}px`;
            this.draggableElement.style.top = `${y}px`;
        }
    }
    /**
     * Styles the handle and listens for mouse events.
     * @param draggableElement element that will be dragged
     * @returns {void}
     */
    setHandleListeners(draggableElement) {
        const element = this.draggableElements.get(draggableElement);
        if (element) {
            element.handle
                .addEventListener('mousedown', element.mouseDownListener);
        }
    }
    /**
     * Styles the handle and listens for mouse events.
     * @param draggableElement element that will be dragged
     * @returns {void}
     */
    removeHandleListeners(draggableElement) {
        const element = this.draggableElements.get(draggableElement);
        if (element) {
            element.handle.removeEventListener('mousedown', element.mouseDownListener);
        }
    }
    /**
     * Sets the cursor of the drag handle, based on its draggable state.
     * @param handle element that will be touched for dragging
     * @returns {void}
     */
    static setHandleCursor(handle) {
        handle.style.cursor = 'move';
    }
    /**
     * Sets the cursor of the drag handle, based on its draggable state.
     * @param handle element that will be touched for dragging
     * @returns {void}
     */
    static removeHandleCursor(handle) {
        handle.style.removeProperty('cursor');
    }
    /**
     * Get the current offset as it may have been changed.
     * @returns {void}
     */
    updateOffset() {
        if (this.draggableElement) {
            const style = getComputedStyle(this.draggableElement);
            this.xOffset = parseFloat(style.left.replace(/\D[~.]/g, ''));
            this.yOffset = parseFloat(style.top.replace(/\D[~.]/g, ''));
        }
    }
    /**
     * Set the global dragging values
     * @param x Starting mouse x position
     * @param y Starting mouse y position
     * @returns {void}
     */
    drag(x, y) {
        this.lastX = x;
        this.lastY = y;
    }
    /**
     * switch user-select if the dtaggableElement exists
     * @param enable the condition of the user-select state
     * @returns {void}
     */
    setSelectingOfText(enable) {
        if (!this.draggableElement) {
            return;
        }
        if (enable) {
            this.draggableElement.style.userSelect = 'auto';
        }
        else {
            this.draggableElement.style.userSelect = 'none';
        }
    }
}
/**
 * creating singleton instance of DraggableManager
 */
const draggableManager = new DraggableManager();
/**
 * provide public function for registering element for dragging
 * @param draggableElement element that will be moved
 * @param handle element that will be captured for movement
 * @returns {void}
 */
export const register = (draggableElement, handle) => {
    draggableManager.register(draggableElement, handle);
};
/**
 * provide public function for registering element for dragging
 * @param draggableElement draggable element
 * @returns {void}
 */
export const deregister = (draggableElement) => {
    draggableManager.deregister(draggableElement);
};
//# sourceMappingURL=draggable-element.js.map