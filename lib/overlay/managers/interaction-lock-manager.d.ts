/**
 * Scroll lock manager singleton is responsible for locking
 * all scrollbars apart one in the active overlay
 */
export declare class ScrollLockManager {
    /**
     * Get a collection of interactive elements
     * @param overlay Overlay to check
     * @returns interactive elements
     */
    private static getInteractiveElements;
    private scrollTop;
    private scrollLeft;
    private lockScroll;
    /**
     * A list of elements that are currently interactive
     * aka `pointer-events: auto` applied
     */
    private interactiveElements;
    private pointerEventsMap;
    private scrollThrottler;
    private lastTouchPosition;
    /**
     * The list of active overlays, which participate
     * in lock management
     */
    private get overlays();
    /**
     * Lock the screen and make top most overlay
     * and its position target interactive
     * @returns {void}
     */
    applyLock(): void;
    /**
     * Set pointer events style tag
     * @param el Element to unlock
     * @param [value=auto] Value of pointer events
     * @returns {void}
     */
    private setPointerEvents;
    /**
     * Restore pointer events style tag
     * @param el Element to restore
     * @returns {void}
     */
    private restorePointerEvents;
    /**
     * Get the top most interactive element
     * @returns element
     */
    private get interactiveElement();
    /**
     * Memoize the scroll position of the outside scrolling element.
     * @returns {void}
     */
    private saveScrollPosition;
    /**
     * Resets the scroll position of the outside scrolling element.
     * @returns {void}
     */
    private restoreScrollPosition;
    /**
     * Listen for scroll and wheel events, to apply the correct lock logic
     * @returns {void}
     */
    private lockEvents;
    /**
     * Remove scroll and wheel listeners
     * @returns {void}
     */
    private unlockEvents;
    /**
     * Add locking backdrop and prevent pointer events on document
     * @returns {void}
     */
    private applyLockBackdrop;
    /**
     * Remove locking backdrop and prevent pointer events on document
     * @returns {void}
     */
    private removeLockBackdrop;
    /**
     * Run on scroll event. If onscroll happened as a result of user interaction, restore the original position
     * @param event Scroll event
     * @returns {void}
     */
    private onScroll;
    /**
     * Apply scroll lock as a result of user interaction
     * @returns {void}
     */
    private applyScrollLock;
    /**
     * Remove scroll lock when user interaction has finished
     * @returns {void}
     */
    private removeScrollLock;
    /**
     * Run on wheel event
     * If wheel happened as a result of user interaction, restore the original position
     * @param event Wheel event
     * @returns {void}
     */
    private onWheelScroll;
    /**
     * Run on touch events.
     * If touch happened as a result of user interaction, restore the original position
     * @param event Touch event
     * @returns {void}
     */
    private onTouchScroll;
    /**
     * Check if wheel event should be cancelled
     * @param event Touch event
     * @return shouldCancelTouch True if the touch event should be cancelled
     */
    private shouldCancelTouch;
    /**
     * Check if wheel event should be cancelled
     * @param event Wheel event
     * @return shouldCancelWheel True if the scroll event should be cancelled
     */
    private shouldCancelWheel;
    /**
     * Check if wheel event should be cancelled
     * @param event Wheel event
     * @param deltaY Scroll delta on Y axis
     * @param deltaX Scroll delta on X axis
     * @return shouldCancel True if the event should be cancelled
     */
    private shouldCancelScroll;
}
/**
* Lock the screen and make top most overlay
* and its position target interactive
* @returns {void}
*/
export declare const applyLock: () => void;
