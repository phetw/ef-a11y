var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ResponsiveElement, html, customElement, property } from '@refinitiv-ui/core';
import { TimeoutTaskRunner } from '@refinitiv-ui/utils';
import { VERSION } from '../../';
let NotificationTray = class NotificationTray extends ResponsiveElement {
    constructor() {
        super(...arguments);
        this.queue = [];
        this.showing = [];
        this.resizeTask = new TimeoutTaskRunner();
        this.nextToDismiss = null;
        this.defaultTimeout = 10000;
        /**
         * Maximum number to show notification limit
         */
        this.max = 1;
        /**
         * Attach point for notification top|bottom
         */
        this.attach = '';
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
        return VERSION;
    }
    /**
     * Does the tray has room to show another notification?
     * @returns true if tray is ready to show
     */
    get canShow() {
        return this.queue.length >= 0 && this.showing.length < this.max;
    }
    /**
     * Gets the next dismissable notification.
     * @returns notification task
     */
    get nextDismissable() {
        return this.showing.filter(item => item.options.duration !== Infinity)[0];
    }
    /**
     * On first updated lifecycle
     * @param changedProperties changed property
     * @returns {void}
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.addEventListener('collapsed', (event) => this.removeChild(event.target), true);
        this.max = parseInt(this.getComputedVariable('--max'), 10) || 1;
        this.defaultTimeout = parseInt(this.getComputedVariable('--default-timeout'), 10) || 10000;
    }
    /**
     * Validate attach value
     * @param attach attach value
     * @returns results
     */
    isValidAttatchPoint(attach) {
        return (/^(top|bottom)$/).test(attach);
    }
    /**
     * Get the amount of padding to be applied to the document.
     * @param size element dimensions
     * @returns padding size
     */
    getSizeFromAttachPoint(size) {
        // Only push the app if the tray is top or bottom.
        if (this.isValidAttatchPoint(this.attach)) {
            return size.height;
        }
        return 0;
    }
    /**
     * Called when the element resizes
     * @ignore
     * @param size element dimensions
     * @returns {void}
     */
    resizedCallback(size) {
        // Defer the root padding to prevent a resize loop error
        // when this causes other elements to resize.
        this.resizeTask.schedule(() => {
            const root = document.documentElement;
            const padding = this.getSizeFromAttachPoint(size);
            const paddingPoint = `padding-${this.isValidAttatchPoint(this.attach) ? this.attach : 'top'}`;
            if (padding) {
                root.style.setProperty('box-sizing', 'border-box');
                root.style.setProperty(paddingPoint, `${padding}px`);
            }
            else {
                root.style.removeProperty('border-sizing');
                root.style.removeProperty(paddingPoint);
            }
        });
    }
    /**
     * Schedules the dismissal of the current dismissable notification.
     * @returns {void}
     */
    dismissNext() {
        const next = this.nextDismissable;
        if (next && next !== this.nextToDismiss) {
            const duration = next.options.duration;
            this.nextToDismiss = next;
            const timeout = setTimeout(() => {
                next.el.dismiss();
            }, typeof duration === 'number' ? duration : this.defaultTimeout);
            next.el.addEventListener('dismiss', () => {
                clearTimeout(timeout);
            }, { once: true });
        }
    }
    /**
     * Process notifications
     * @returns {void}
     */
    tick() {
        if (this.canShow) {
            const showing = this.showing;
            const item = this.queue.shift();
            if (item) {
                showing.push(item);
                this.appendChild(item.el);
                item.el.addEventListener('dismiss', () => {
                    showing.splice(showing.indexOf(item), 1);
                    this.dismissNext();
                    this.tick();
                }, { once: true });
                this.dismissNext();
            }
        }
    }
    /**
     * Pushes a new notification into the tray.
     * It will be shown when available to do so.
     * @param el notification element to append.
     * @param options notification options
     * @returns {void}
     */
    push(el, options) {
        this.queue.push({ el, options });
        this.tick();
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @returns Render template
     */
    render() {
        return html `<slot></slot>`;
    }
};
__decorate([
    property({ type: Number })
], NotificationTray.prototype, "max", void 0);
__decorate([
    property({ type: String, reflect: true })
], NotificationTray.prototype, "attach", void 0);
NotificationTray = __decorate([
    customElement('ef-notification-tray', {
        alias: 'amber-notification-tray'
    })
], NotificationTray);
export { NotificationTray };
//# sourceMappingURL=notification-tray.js.map