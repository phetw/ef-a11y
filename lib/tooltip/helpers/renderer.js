/**
 * A default renderer that renders `tooltip` attribute
 * @param target Target to check
 * @returns tooltip or null or undefined
 */
const tooltipRenderer = (target) => {
    if (target.hasAttribute('tooltip')) {
        return target.getAttribute('tooltip');
    }
};
export { tooltipRenderer };
//# sourceMappingURL=renderer.js.map