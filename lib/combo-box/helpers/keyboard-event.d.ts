/**
 * A helper class to propagate KeyBoard event to the list
 * Done is this way to cover IE11
 */
export declare class CustomKeyboardEvent extends Event {
    key?: string;
    shiftKey?: boolean;
    altKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
    /**
     * Create custom keyboard event
     * @param type Event type
     * @param eventInitDict Keyboard event init object
     */
    constructor(type: string, eventInitDict?: KeyboardEventInit);
}
//# sourceMappingURL=keyboard-event.d.ts.map