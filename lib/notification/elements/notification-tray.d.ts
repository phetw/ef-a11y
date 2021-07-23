import { ResponsiveElement, ElementSize, TemplateResult, PropertyValues } from '@refinitiv-ui/core';
import { Notification } from './notification';
import { TaskOptions } from '../helpers/types';
export declare class NotificationTray extends ResponsiveElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version(): string;
    private queue;
    private showing;
    private resizeTask;
    private nextToDismiss;
    private defaultTimeout;
    /**
     * Maximum number to show notification limit
     */
    max: number;
    /**
     * Attach point for notification top|bottom
     */
    attach: string;
    /**
     * Does the tray has room to show another notification?
     * @returns true if tray is ready to show
     */
    private get canShow();
    /**
     * Gets the next dismissable notification.
     * @returns notification task
     */
    private get nextDismissable();
    /**
     * On first updated lifecycle
     * @param changedProperties changed property
     * @returns {void}
     */
    protected firstUpdated(changedProperties: PropertyValues): void;
    /**
     * Validate attach value
     * @param attach attach value
     * @returns results
     */
    private isValidAttatchPoint;
    /**
     * Get the amount of padding to be applied to the document.
     * @param size element dimensions
     * @returns padding size
     */
    private getSizeFromAttachPoint;
    /**
     * Called when the element resizes
     * @ignore
     * @param size element dimensions
     * @returns {void}
     */
    resizedCallback(size: ElementSize): void;
    /**
     * Schedules the dismissal of the current dismissable notification.
     * @returns {void}
     */
    private dismissNext;
    /**
     * Process notifications
     * @returns {void}
     */
    private tick;
    /**
     * Pushes a new notification into the tray.
     * It will be shown when available to do so.
     * @param el notification element to append.
     * @param options notification options
     * @returns {void}
     */
    push(el: Notification, options: TaskOptions): void;
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @returns Render template
     */
    protected render(): TemplateResult;
}
