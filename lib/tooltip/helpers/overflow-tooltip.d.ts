import { TooltipRenderer } from './types';
/**
 * Register the element to show a tooltip for overflow content
 * @param target Target element
 * @param [render] Optional renderer. By default target `textContent` is returned
 * @returns {void}
 */
declare const register: (target: HTMLElement, render?: TooltipRenderer) => void;
export { register };
