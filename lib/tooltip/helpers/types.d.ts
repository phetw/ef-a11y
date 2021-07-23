import { OverlayPosition } from '../../overlay';
export declare type TooltipCondition = (target: HTMLElement, paths: EventTarget[]) => boolean;
export declare type TooltipRenderer = (target: HTMLElement) => undefined | null | string | HTMLElement | DocumentFragment;
export declare type TooltipPosition = 'auto' | 'above' | 'right' | 'below' | 'left';
export declare type TooltipPositionMap = {
    [K in TooltipPosition]: OverlayPosition[];
};
declare type MouseMoveCallback = (event: MouseEvent, paths: EventTarget[]) => void;
declare type MouseCallback = (event: MouseEvent) => void;
declare type WheelCallback = (event: WheelEvent) => void;
declare type FocusCallback = (event: FocusEvent) => void;
declare type KeyboardCallback = (event: KeyboardEvent) => void;
export declare type DocumentCallbacks = {
    mousemove: MouseMoveCallback;
    mousemoveThrottled: MouseMoveCallback;
    click: MouseCallback;
    mouseout: MouseCallback;
    mouseleave: MouseCallback;
    wheel: WheelCallback;
    keydown: KeyboardCallback;
    blur: FocusCallback;
};
export {};
