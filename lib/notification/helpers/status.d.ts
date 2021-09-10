import { Notification } from '../elements/notification';
/**
 * Show an info notification (default)
 * @param message Message to show in the notification.
 * @param duration Duration the notification should be displayed for.
 * @returns instance of the `Notification`.
 */
declare const info: (message: string, duration: number) => Notification;
/**
 * Show a confirmation notification
 * @param message Message to show in the notification.
 * @param duration Duration the notification should be displayed for.
 * @returns instance of the `Notification`.
 */
declare const confirm: (message: string, duration: number) => Notification;
/**
 * Show a warning notification
 * @param message Message to show in the notification.
 * @param duration Duration the notification should be displayed for.
 * @returns instance of the `Notification`.
 */
declare const warn: (message: string, duration: number) => Notification;
/**
 * Show an error notification
 * @param message Message to show in the notification.
 * @param duration Duration the notification should be displayed for.
 * @returns instance of the `Notification`.
 */
declare const error: (message: string, duration: number) => Notification;
export { info, confirm, warn, error };
//# sourceMappingURL=status.d.ts.map