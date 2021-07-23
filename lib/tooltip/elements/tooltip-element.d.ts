import '../index';
import { Tooltip } from '../index';
import { TooltipCondition, TooltipRenderer } from '../helpers/types';
/**
 * Add the new condition to the default tooltip
 * @param condition Condition to add
 * @param renderer Renderer for condition
 * @returns {void}
 */
declare const addTooltipCondition: (condition: TooltipCondition, renderer: TooltipRenderer) => void;
/**
 * Remove the existing condition from default tooltip
 * @param condition Condition to remove
 * @returns {void}
 */
declare const removeTooltipCondition: (condition: TooltipCondition) => void;
/**
 * The default tooltip, which is used to replicate `title` attribute
 * and to show tooltips for EF elements
 */
declare const tooltipElement: Tooltip;
export { tooltipElement, addTooltipCondition, removeTooltipCondition };
