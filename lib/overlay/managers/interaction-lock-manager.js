import { AnimationTaskRunner } from '@refinitiv-ui/utils';
import { getOverlays } from './zindex-manager';
/**
* Check if two arrays are shallow equal
* @param left Left side array
* @param right Right side array
* @returns true if arrays are equal
*/
const equal = (left, right) => {
    const length = left.length;
    if (length !== right.length) {
        return false;
    }
    for (let i = 0; i < length; i += 1) {
        if (left[i] !== right[i]) {
            return false;
        }
    }
    return true;
};
/**
 * Scroll lock manager singleton is responsible for locking
 * all scrollbars apart one in the active overlay
 */
export class ScrollLockManager {
    constructor() {
        this.scrollTop = 0;
        this.scrollLeft = 0;
        this.lockScroll = false;
        /**
         * A list of elements that are currently interactive
         * aka `pointer-events: auto` applied
         */
        this.interactiveElements = [];
        this.pointerEventsMap = new Map();
        this.scrollThrottler = new AnimationTaskRunner();
        /**
         * Run on scroll event. If onscroll happened as a result of user interaction, restore the original position
         * @param event Scroll event
         * @returns {void}
         */
        this.onScroll = (event) => {
            const path = event.composedPath();
            if (this.lockScroll && !path.includes(this.interactiveElement)) {
                this.restoreScrollPosition();
            }
        };
        /**
         * Apply scroll lock as a result of user interaction
         * @returns {void}
         */
        this.applyScrollLock = () => {
            // this must be applied in order to make the difference between user scroll and system scroll
            // otherwise there must not be scroll prevention on resize/orientationchange events
            this.scrollThrottler.cancel();
            this.lockScroll = true;
        };
        /**
         * Remove scroll lock when user interaction has finished
         * @returns {void}
         */
        this.removeScrollLock = () => {
            this.scrollThrottler.schedule(() => {
                this.lockScroll = false;
            });
        };
        /**
         * Run on wheel event
         * If wheel happened as a result of user interaction, restore the original position
         * @param event Wheel event
         * @returns {void}
         */
        this.onWheelScroll = (event) => {
            if (this.shouldCancelWheel(event)) {
                event.preventDefault();
            }
        };
        /**
         * Run on touch events.
         * If touch happened as a result of user interaction, restore the original position
         * @param event Touch event
         * @returns {void}
         */
        this.onTouchScroll = (event) => {
            if (event.cancelable && this.shouldCancelTouch(event)) { /* Not all touch events can be cancelled */
                event.preventDefault();
            }
        };
    }
    /**
     * Get a collection of interactive elements
     * @param overlay Overlay to check
     * @returns interactive elements
     */
    static getInteractiveElements(overlay) {
        if (!overlay) {
            return [];
        }
        // overlay is always included
        const interactiveElements = [overlay];
        if (overlay.interactiveElements && overlay.interactiveElements.length) {
            return interactiveElements.concat(overlay.interactiveElements);
        }
        if (!overlay.lockPositionTarget && overlay.positionTarget instanceof HTMLElement) {
            interactiveElements.push(overlay.positionTarget);
        }
        return interactiveElements;
    }
    /**
     * The list of active overlays, which participate
     * in lock management
     */
    get overlays() {
        return getOverlays().filter(overlay => !overlay.noInteractionLock);
    }
    /**
     * Lock the screen and make top most overlay
     * and its position target interactive
     * @returns {void}
     */
    applyLock() {
        const topOverlay = this.overlays[0];
        const oldInteractiveElements = this.interactiveElements;
        const newInteractiveElements = ScrollLockManager.getInteractiveElements(topOverlay);
        // do nothing if the list is the same
        if (equal(oldInteractiveElements, newInteractiveElements)) {
            return;
        }
        if (!oldInteractiveElements.length && newInteractiveElements.length) {
            // lock the screen
            this.saveScrollPosition();
            this.lockEvents();
            this.applyLockBackdrop();
        }
        else if (oldInteractiveElements.length && !newInteractiveElements.length) {
            // unlock the screen
            this.unlockEvents();
            this.removeLockBackdrop();
        }
        // restore overlay events to original value
        for (let i = 0; i < oldInteractiveElements.length; i += 1) {
            this.restorePointerEvents(oldInteractiveElements[i]);
        }
        // make overlay interactive by applying pointer-events: auto;
        for (let i = 0; i < newInteractiveElements.length; i += 1) {
            this.setPointerEvents(newInteractiveElements[i]);
        }
        this.interactiveElements = newInteractiveElements;
    }
    /**
     * Set pointer events style tag
     * @param el Element to unlock
     * @param [value=auto] Value of pointer events
     * @returns {void}
     */
    setPointerEvents(el, value = 'auto') {
        if (el) {
            this.pointerEventsMap.set(el, el.style.pointerEvents);
            el.style.setProperty('pointer-events', value);
        }
    }
    /**
     * Restore pointer events style tag
     * @param el Element to restore
     * @returns {void}
     */
    restorePointerEvents(el) {
        if (el) {
            const pointerEvents = this.pointerEventsMap.get(el);
            this.pointerEventsMap.delete(el);
            if (pointerEvents) {
                el.style.setProperty('pointer-events', pointerEvents);
            }
            else {
                el.style.removeProperty('pointer-events');
            }
        }
    }
    /**
     * Get the top most interactive element
     * @returns element
     */
    get interactiveElement() {
        return this.interactiveElements[this.interactiveElements.length - 1];
    }
    /**
     * Memoize the scroll position of the outside scrolling element.
     * @returns {void}
     */
    saveScrollPosition() {
        if (document.scrollingElement) {
            this.scrollTop = document.scrollingElement.scrollTop;
            this.scrollLeft = document.scrollingElement.scrollLeft;
        }
        else {
            // Since we don't know if is the body or html, get max.
            this.scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            this.scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        }
    }
    /**
     * Resets the scroll position of the outside scrolling element.
     * @returns {void}
     */
    restoreScrollPosition() {
        if (document.scrollingElement) {
            document.scrollingElement.scrollTop = this.scrollTop;
            document.scrollingElement.scrollLeft = this.scrollLeft;
        }
        else {
            // Since we don't know if is the body or html, set both.
            document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop;
            document.documentElement.scrollLeft = document.body.scrollLeft = this.scrollLeft;
        }
    }
    /**
     * Listen for scroll and wheel events, to apply the correct lock logic
     * @returns {void}
     */
    lockEvents() {
        const wheelEventConf = {
            capture: true,
            passive: false
        };
        document.addEventListener('wheel', this.onWheelScroll, wheelEventConf);
        document.addEventListener('touchstart', this.onTouchScroll, wheelEventConf);
        document.addEventListener('touchmove', this.onTouchScroll, wheelEventConf);
        document.addEventListener('touchend', this.onTouchScroll, wheelEventConf);
        const scrollEventConf = {
            capture: true,
            passive: true /* passive improves scrolling performance. See https://developers.google.com/web/tools/lighthouse/audits/passive-event-listeners how. This does not work in IE11 */
        };
        document.addEventListener('scroll', this.onScroll, scrollEventConf);
        document.addEventListener('mousedown', this.applyScrollLock, scrollEventConf);
        document.addEventListener('touchstart', this.applyScrollLock, scrollEventConf);
        document.addEventListener('keydown', this.applyScrollLock, scrollEventConf);
        document.addEventListener('mouseup', this.removeScrollLock, scrollEventConf);
        document.addEventListener('touchend', this.removeScrollLock, scrollEventConf);
        document.addEventListener('keyup', this.removeScrollLock, scrollEventConf);
    }
    /**
     * Remove scroll and wheel listeners
     * @returns {void}
     */
    unlockEvents() {
        const wheelEventConf = {
            capture: true,
            passive: false
        };
        document.removeEventListener('wheel', this.onWheelScroll, wheelEventConf);
        document.removeEventListener('touchstart', this.onTouchScroll, wheelEventConf);
        document.removeEventListener('touchmove', this.onTouchScroll, wheelEventConf);
        document.removeEventListener('touchend', this.onTouchScroll, wheelEventConf);
        const scrollEventConf = {
            capture: true,
            passive: true
        };
        document.removeEventListener('scroll', this.onScroll, scrollEventConf);
        document.removeEventListener('mousedown', this.applyScrollLock, scrollEventConf);
        document.removeEventListener('touchstart', this.applyScrollLock, scrollEventConf);
        document.removeEventListener('keydown', this.applyScrollLock, scrollEventConf);
        document.removeEventListener('mouseup', this.removeScrollLock, scrollEventConf);
        document.removeEventListener('touchend', this.removeScrollLock, scrollEventConf);
        document.removeEventListener('keyup', this.removeScrollLock, scrollEventConf);
    }
    /**
     * Add locking backdrop and prevent pointer events on document
     * @returns {void}
     */
    applyLockBackdrop() {
        this.setPointerEvents(document.documentElement, 'none'); /* prevent scrolling on all other scrollable elements */
    }
    /**
     * Remove locking backdrop and prevent pointer events on document
     * @returns {void}
     */
    removeLockBackdrop() {
        this.restorePointerEvents(document.documentElement);
    }
    /**
     * Check if wheel event should be cancelled
     * @param event Touch event
     * @return shouldCancelTouch True if the touch event should be cancelled
     */
    shouldCancelTouch(event) {
        const { targetTouches, type, target } = event;
        if (type === 'touchend') {
            this.lastTouchPosition = undefined;
            return false;
        }
        // store touch position
        if (type === 'touchstart') {
            const touch = targetTouches[0];
            this.lastTouchPosition = {
                pageX: touch.pageX,
                pageY: touch.pageY,
                target
            };
            return false;
        }
        if (!this.lastTouchPosition) {
            return false;
        }
        // 'touchmove'
        const touch = targetTouches[0];
        const deltaX = this.lastTouchPosition.pageX - touch.pageX;
        const deltaY = this.lastTouchPosition.pageY - touch.pageY;
        return this.shouldCancelScroll(event, deltaY, deltaX);
    }
    /**
     * Check if wheel event should be cancelled
     * @param event Wheel event
     * @return shouldCancelWheel True if the scroll event should be cancelled
     */
    shouldCancelWheel(event) {
        const { deltaX, deltaY } = event;
        return this.shouldCancelScroll(event, deltaY, deltaX);
    }
    /**
     * Check if wheel event should be cancelled
     * @param event Wheel event
     * @param deltaY Scroll delta on Y axis
     * @param deltaX Scroll delta on X axis
     * @return shouldCancel True if the event should be cancelled
     */
    shouldCancelScroll(event, deltaY, deltaX) {
        const isVerticalScroll = Math.abs(deltaY) >= Math.abs(deltaX);
        const path = [...event.composedPath()];
        let idx = -1;
        const interactiveElements = [...this.interactiveElements];
        // calculate if the wheel event should be stopped according to locked
        while (idx === -1 && interactiveElements.length) {
            idx = path.indexOf(interactiveElements.pop());
        }
        // scroll happened outside the locked container
        if (idx === -1) {
            return true;
        }
        const checkSlice = path.slice(0, idx + 1);
        const canScroll = isVerticalScroll ? (element) => {
            const style = window.getComputedStyle(element);
            if (style.overflowY === 'scroll' || style.overflowY === 'auto') {
                // delta < 0 is scroll up, delta > 0 is scroll down.
                return deltaY < 0 ? element.scrollTop > 0 : element.scrollTop < element.scrollHeight - element.clientHeight;
            }
            return false;
        } : (element) => {
            const style = window.getComputedStyle(element);
            if (style.overflowX === 'scroll' || style.overflowX === 'auto') {
                // delta < 0 is scroll left, delta > 0 is scroll right.
                return deltaX < 0 ? element.scrollLeft > 0 : element.scrollLeft < element.scrollWidth - element.clientWidth;
            }
            return false;
        };
        while (checkSlice.length) {
            const node = checkSlice.shift();
            if (node && node.nodeType !== Node.ELEMENT_NODE) {
                continue;
            }
            if (canScroll(node)) {
                return false;
            }
        }
        return true;
    }
}
const locker = new ScrollLockManager(); /* Locker is a singleton */
/**
* Lock the screen and make top most overlay
* and its position target interactive
* @returns {void}
*/
export const applyLock = () => {
    locker.applyLock();
};
//# sourceMappingURL=interaction-lock-manager.js.map