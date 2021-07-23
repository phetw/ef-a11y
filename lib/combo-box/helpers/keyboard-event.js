/**
 * A helper class to propagate KeyBoard event to the list
 * Done is this way to cover IE11
 */
export class CustomKeyboardEvent extends Event {
    /**
     * Create custom keyboard event
     * @param type Event type
     * @param eventInitDict Keyboard event init object
     */
    constructor(type, eventInitDict = {}) {
        super(type, eventInitDict);
        this.key = eventInitDict.key;
        this.shiftKey = eventInitDict.shiftKey;
        this.altKey = eventInitDict.altKey;
        this.ctrlKey = eventInitDict.ctrlKey;
        this.metaKey = eventInitDict.metaKey;
    }
}
//# sourceMappingURL=keyboard-event.js.map