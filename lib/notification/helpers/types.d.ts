import { Notification } from '../elements/notification';
export declare type Task = {
    el: Notification;
    options: TaskOptions;
};
export declare type TaskOptions = {
    message: string;
    type: string;
    duration: number;
};
