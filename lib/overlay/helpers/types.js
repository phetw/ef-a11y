/* align against the position. These are valid when position does not contain align information */
const DEFAULT_ALIGN = new Map([
    ['top', 'start'],
    ['bottom', 'start'],
    ['left', 'middle'],
    ['right', 'middle'],
    ['center', 'middle']
]);
/* strategies applied when positionTarget is HTML Element */
const DEFAULT_TARGET_STRATEGY = [
    ['bottom', 'start'],
    ['top', 'start'],
    ['right', 'middle'],
    ['left', 'middle']
];
export { DEFAULT_ALIGN, DEFAULT_TARGET_STRATEGY };
//# sourceMappingURL=types.js.map