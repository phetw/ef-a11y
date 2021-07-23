import { addTooltipCondition } from '../elements/tooltip-element';
const registry = new WeakMap();
const overflowCondition = (target) => registry.has(target) && (target.scrollWidth - target.offsetWidth) > 1;
const overflowRenderer = (target) => target.textContent;
const tooltipRenderer = (target) => {
    const renderer = registry.get(target);
    return renderer ? renderer(target) : undefined;
};
addTooltipCondition(overflowCondition, tooltipRenderer);
/**
 * Register the element to show a tooltip for overflow content
 * @param target Target element
 * @param [render] Optional renderer. By default target `textContent` is returned
 * @returns {void}
 */
const register = (target, render = overflowRenderer) => {
    registry.set(target, render);
};
export { register };
//# sourceMappingURL=overflow-tooltip.js.map