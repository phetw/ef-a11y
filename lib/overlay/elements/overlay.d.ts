import { ResponsiveElement, TemplateResult, CSSResult, PropertyValues, ElementSize } from '@refinitiv-ui/core';
import { TransitionStyle, PositionTarget, Position, NullOrUndefined, PositionTargetStrategy } from '../helpers/types';
export { TransitionStyle, PositionTarget, Position, PositionTargetStrategy };
/**
 * Element to help building modals, dialogs and other overlay content
 * @fires closed - Dispatched when overlay becomes invisible and close animation finishes
 * @fires opened - Dispatched when the overlay becomes visible and the open animation finishes
 * @fires refit - Dispatched when refit algorithm finishes calculations
 * @fires opened-changed - Dispatched when when open attribute changes internally. Prevent default to stop opening/closing pipeline
 */
export declare class Overlay extends ResponsiveElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    protected readonly defaultTabIndex = -1;
    private _fullyOpened;
    private static Template;
    /**
     * A `CSSResult` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return CSS template
     */
    static get styles(): CSSResult | CSSResult[];
    /**
     * True if the overlay is currently displayed
     */
    opened: boolean;
    /**
     * True to add shadow
     */
    withShadow: boolean;
    /**
     * True to make overlay background transparent
     */
    transparent: boolean;
    /**
     * True to apply spacing for overlay content
     */
    spacing: boolean;
    /**
     * Set the transition style
     */
    transitionStyle: TransitionStyle | NullOrUndefined;
    /**
     * Set a preferable z-index to override automatically calculated z-index
     */
    zIndex: number | NullOrUndefined;
    /**
     * Set a specific x coordinate
     */
    x: number | NullOrUndefined;
    /**
     * Set a specific y coordinate
     */
    y: number | NullOrUndefined;
    /**
     * Set the position target as follows:
     * - HTMLElement if overlay is position next to the HTML element
     * - String containing `top`, `right`, `left`, `bottom`, `center` combinations to position against the screen.
     * For instance: `top left` - put the overlay at `top left` point of the screen; `bottom` - put overlay at `bottom center` point of the screen
     */
    positionTarget: HTMLElement | PositionTarget | NullOrUndefined;
    /**
     * A pixel value that will be added to the position calculated on the horizontal axis.
     * The offset will be applied either to the `left` or `right` depending on the `positionTarget`
     */
    horizontalOffset: number;
    /**
     * A pixel value that will be added to the position calculated on the vertical axis.
     * The offset will be applied either to the `top` or `bottom` depending on the `positionTarget`
     */
    verticalOffset: number;
    /**
     * A pixel value that will be added to the position calculated on the vertical or horizontal axis.
     * The offset is applied dynamically depending on the `positionTarget`
     */
    offset: number;
    /**
     * Set to true to disable canceling the overlay with the ESC key
     */
    noCancelOnEscKey: boolean;
    /**
     * Set to true to disable canceling the overlay by clicking outside it
     */
    noCancelOnOutsideClick: boolean;
    /**
     * Set to true to show overlay in full screen mode
     */
    fullScreen: boolean;
    /**
     * True to not overlap positionTarget
     */
    noOverlap: boolean;
    /**
     * Stop preventing user interaction when overlay is visible
     */
    noInteractionLock: boolean;
    /**
     * True to not apply focus management.
     * The overlay will not limit Tab behaviour or do auto-focusing
     */
    noFocusManagement: boolean;
    /**
     * True to lock position target
     * Valid only if noInteractionLock is false (default)
     */
    lockPositionTarget: boolean;
    /**
     * A list of elements, which are active when overlay is opened
     * Valid only if noInteractionLock is false (default)
     */
    interactiveElements: HTMLElement[];
    /**
     * True to show backdrop
     */
    withBackdrop: boolean;
    /**
     * Set to true to disable autofocusing the overlay or open
     */
    noAutofocus: boolean;
    /**
     * Used as a hook to support deprecation attributes from v3
     */
    private _position?;
    /**
     * Set position and align against the attach target.
     * Position may contain a single word or a comma separated list to set the priority.
     * Position is not applied if `attachTarget` is not HTML Element.
     * For instance: `[bottom-middle, top-middle]` - default position is bottom-middle, if cannot fit position top-middle;
     * or `[left, right]` - align is not set, set best position on the left or right
     *
     * Position can be: `top`, `right`, `bottom`, `left`, `center`
     * Align can be: `start`, `middle`, `end`
     *
     * @param value Position value
     */
    set position(value: Position[] | undefined);
    get position(): Position[] | undefined;
    /**
     * Parsed position for re-use
     */
    private _positionStrategy;
    /**
     * Get parsed position strategy or the default strategy if none provided
     * @returns positionStrategy as a list of tuples containing position and align
     */
    private get positionStrategy();
    /**
     * Get position target configuration based on positionTarget and fullScreen properties
     * Used for caching and calculations
     */
    get positionTargetConfig(): PositionTargetStrategy;
    /**
     * Set focus boundary to restrict tabbing. Default's overlay itself.
     * If external focus is required, set to null
     */
    focusBoundary: HTMLElement | ShadowRoot | null;
    /**
     * A hook to reset transition and transform when the overlay is opened.
     * This removes the complexity of calculating specific "transformed"
     * coordinates for descendant elements
     * @param animationReady True to set attribute
     */
    private set animationReady(value);
    /**
     * Run the animation reverse order when closing
     * @param animationReverse True to set attribute
     */
    private set animationReverse(value);
    /**
     * Used with dynamic `slide` animation to detect correct animation position
     * @param animationPosition Set animation position
     */
    private set animationPosition(value);
    private _firstResizeDone;
    /**
     * Used to set attribute after the initial callback has been fired
     * A function is here to sort IE11 flickering problem
     * @param firstResizeDone True if the initial resize has happened
     */
    private set firstResizeDone(value);
    private get firstResizeDone();
    /**
     * Used internally to keep calculated positions
     */
    private calculated;
    /**
     * All internal opened set events can be stoppable externally
     * Use this instead of setting opened directly
     * Protected method that can be used by managers or subclasses
     * @param opened True if opened
     * @returns {void}
     */
    protected setOpened(opened: boolean): void;
    disconnectedCallback(): void;
    /**
     * Called when the element’s DOM has been updated and rendered
     * @param changedProperties Properties that has changed
     * @returns shouldUpdate
     */
    protected shouldUpdate(changedProperties: PropertyValues): boolean;
    private redrawThrottler;
    /**
     * Run when opened attribute changes.
     * The function must be throttled in animation task to give time an element to be rendered
     * @returns {void}
     */
    private openedChange;
    /**
     * This function sets obligatory registers
     * and sets/removes optional registers
     * based on the fact whether the overlay is opened or not
     * or whether the register attribute has changed
     * @param changedProperties Changed properties
     * @returns {void}
     */
    private setRegisters;
    /**
     * This function is called in order to remove overlay from main registers
     * Registers must be removed in correct order, otherwise overlay might behave
     * unexpectedly. All other registers are removed inside onFullyClosed function
     * once animations are finished or on disconnectedCallback
     * @returns {void}
     */
    private removeMainRegisters;
    /**
     * Set and remove animation event listener
     * @returns {void}
     */
    private onOpenedChangedAnimation;
    /**
     * Ensure that the opened flag gets removed when transition has finished
     * Ensure that transitioned hook is applied when opened
     * @returns {void}
     */
    private onOpenedChangedAnimationEvent;
    /**
     * A helper method to fire opening events
     * @returns {void}
     */
    private onFullyOpened;
    /**
     * A helper method to deregister element from all listeners
     * once the overlay is fully closed
     * Note: some registries are remove immediately after close
     * @returns {void}
     */
    private onFullyClosed;
    /**
     * Run when the overlay has opened, initial positioning is done,
     * managers are registered and opening transition has finished
     * @returns {void}
     */
    protected onOpened(): void;
    /**
     * Run when the overlay has closed, managers are de-registered
     * and closing transition has finished
     * @returns {void}
     */
    protected onClosed(): void;
    /**
     * Here to avoid redundant call to set styles and calculate position
     */
    private cachedProperties;
    /**
     * A helper method to set or remove style property if the value is different
     * @param property Property name
     * @param value Property value
     * @returns {void}
     */
    private setPropertyIf;
    /**
     * Cache height and width.
     * Calculating offsetHeight and offsetWidth is expensive,
     * therefore try to use cached version
     * @returns {void}
     */
    private setResizeSizingInfo;
    /**
     * Get overlay with and height information
     * Sizing is cached and may not reflect the current
     */
    private get sizingRect();
    private _sizingInfo;
    /**
     * A helper getter to get sizing information for the overlay
     * @returns {Object} sizingInfo
     */
    private get sizingInfo();
    /**
     * Reset current sizing info to original values
     * @returns {void}
     */
    private resetSizingInfo;
    /**
     * Get information of view boundaries for the overlay
     */
    private get viewAreaInfo();
    /**
     * Enforce the overlay to fit the viewArea
     * @param [viewHeight=this._viewAreaInfo.viewHeight] Height to limit to
     * @param [viewWidth=this._viewAreaInfo.viewWidth] Width to limit to
     * @returns {void}
     */
    private limitToViewArea;
    /**
     * Set top, left, right, bottom to style tag taking into account offset.
     * If property is null or undefined, remove from style tag
     * @param style An object containing top, left, right and/or bottom
     * @returns {void}
     */
    private setPositionStyle;
    /**
     * Used to cache sizing info for easy comparison
     */
    private refitString;
    /**
     * This function serves as a safeguard between resize observer and internal logic to prevent resize loop
     * fit setting. Never refits the overlay if previous sizes are the same as last fit size
     * @param clb Callback to run if cache has changed
     * @returns {void}
     */
    private refitIfChanged;
    /**
     * Immediately run fit method without throttling
     * Use carefully as calling this function multiple times has a performance impact
     * @returns {void}
     */
    private fitNonThrottled;
    /**
     * Fit based on the position target
     * @returns {void}
     */
    private fitPositionTarget;
    /**
     * Clear all cached values.
     * Run when external changes occur to styles to re-calculate position.
     * @returns {void}
     */
    clearCached(): void;
    private fitThrottler;
    /**
     * Fit the overlay panel
     * @returns {void}
     */
    fit(): void;
    /**
     * Clear all cached values and fit the overlay.
     * Use this function if any of `maxWidth`, `maxHeight`, `minWidth`, `minHeight`, `height` or `width` changed
     * @returns {void}
     */
    refit(): void;
    private resizeHeight;
    private resizeWidth;
    private resizedThrottler;
    /**
     * Element resize callback
     * @param size dimension details
     * @returns {void}
     * @private
     */
    resizedCallback(size: ElementSize): void;
    /**
     * Move overlay to front of other overlays
     * @returns {void}
     */
    toFront(): void;
    /**
     * Returns true if the overlay is opened and animation is not running.
     * Returns false if overlay is closed and animation is not running
     * @readonly
     */
    get fullyOpened(): boolean;
    /**
     * Returns true if overlay is doing opening or closing transition
     * @readonly
     */
    get transitioning(): boolean;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    protected render(): TemplateResult;
}
