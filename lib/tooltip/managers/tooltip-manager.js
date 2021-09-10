import { TimeoutTaskRunner } from '@refinitiv-ui/utils';
/**
 * Helper to check if the browser is IE
 * @returns True if the browser is IE
 */
const isIE = () => !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
/**
 * Tooltip manager is here to avoid setting multiple
 * events on document and do expensive pre-processing
 * in a common way
 */
class TooltipManager {
    constructor() {
        this.registry = new Map();
        /* 5 is chosen randomly to give long enough delay to avoid performance issues, but
        short enough for not showing the default title
        */
        this.titleThrottler = new TimeoutTaskRunner(5);
        /**
         * @param event Mouse move event
         * @returns {void}
         */
        this.onMouseMove = (event) => {
            const paths = event.composedPath(); /* paths may be lost if used in schedule */
            this.registry.forEach(({ mousemove }) => mousemove(event, paths));
            this.titleThrottler.schedule(() => {
                TooltipManager.overrideTitle(paths);
                this.registry.forEach(({ mousemoveThrottled }) => mousemoveThrottled(event, paths));
            });
        };
        /**
         * @param event Mouse click or contextmenu event
         * @returns {void}
         */
        this.onClick = (event) => {
            this.registry.forEach(({ click }) => click(event));
        };
        /**
         * @param event Mouse out event
         * @returns {void}
         */
        this.onMouseOut = (event) => {
            this.registry.forEach(({ mouseout }) => mouseout(event));
        };
        /**
         * @param event Mouse leave event
         * @returns {void}
         */
        this.onMouseLeave = (event) => {
            this.registry.forEach(({ mouseleave }) => mouseleave(event));
        };
        /**
         * @param event Wheel event
         * @returns {void}
         */
        this.onWheel = (event) => {
            this.registry.forEach(({ wheel }) => wheel(event));
        };
        /**
         * @param event Keyboard event
         * @returns {void}
         */
        this.onKeyDown = (event) => {
            this.registry.forEach(({ keydown }) => keydown(event));
        };
        /**
         * @param event Focus event
         * @returns {void}
         */
        this.onBlur = (event) => {
            this.registry.forEach(({ blur }) => blur(event));
        };
    }
    /**
     * Override default title attribute
     * @param paths Event paths
     * @returns {void}
     */
    static overrideTitle(paths) {
        const l = paths.length;
        for (let i = 0; i < l; i += 1) {
            const node = paths[i];
            if (node.nodeType !== Node.ELEMENT_NODE) {
                continue;
            }
            if (node === document.body || node === document.documentElement) {
                break;
            }
            const element = node;
            const title = element.getAttribute('title');
            if (title) {
                element.title = title;
            }
        }
    }
    register(tooltip, documentCallbacks) {
        if (!this.registry.size) {
            // IE11 does not support event options
            const supportOptions = !isIE();
            const eventOptions = supportOptions ? { passive: true } : undefined;
            document.addEventListener('mousemove', this.onMouseMove, eventOptions);
            document.addEventListener('mouseout', this.onMouseOut, eventOptions);
            document.addEventListener('mouseleave', this.onMouseLeave, eventOptions);
            document.addEventListener('wheel', this.onWheel, eventOptions);
            document.addEventListener('keydown', this.onKeyDown, eventOptions);
            document.body.addEventListener('blur', this.onBlur, eventOptions);
            const clickEventOptions = supportOptions ? { passive: true, capture: true } : true;
            document.addEventListener('click', this.onClick, clickEventOptions);
            document.addEventListener('contextmenu', this.onClick, clickEventOptions);
        }
        this.registry.set(tooltip, documentCallbacks);
    }
    deregister(tooltip) {
        this.registry.delete(tooltip);
        if (!this.registry.size) {
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseout', this.onMouseOut);
            document.removeEventListener('mouseleave', this.onMouseLeave);
            document.removeEventListener('wheel', this.onWheel);
            document.removeEventListener('keydown', this.onKeyDown);
            document.body.removeEventListener('blur', this.onBlur);
            document.removeEventListener('click', this.onClick, true);
            document.removeEventListener('contextmenu', this.onClick, true);
        }
    }
}
const tooltipManager = new TooltipManager();
/**
 * Register the new tooltip
 * @param tooltip Tooltip
 * @param documentCallbacks Callback to attach on document and body
 * @returns {void}
 */
export const register = (tooltip, documentCallbacks) => {
    tooltipManager.register(tooltip, documentCallbacks);
};
/**
 * Deregister the tooltip
 * @param tooltip Tooltip
 * @returns {void}
 */
export const deregister = (tooltip) => {
    tooltipManager.deregister(tooltip);
};
//# sourceMappingURL=tooltip-manager.js.map