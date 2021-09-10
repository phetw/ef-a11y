import { Tooltip } from '../index';
import { DocumentCallbacks } from '../helpers/types';
/**
 * Register the new tooltip
 * @param tooltip Tooltip
 * @param documentCallbacks Callback to attach on document and body
 * @returns {void}
 */
export declare const register: (tooltip: Tooltip, documentCallbacks: DocumentCallbacks) => void;
/**
 * Deregister the tooltip
 * @param tooltip Tooltip
 * @returns {void}
 */
export declare const deregister: (tooltip: Tooltip) => void;
//# sourceMappingURL=tooltip-manager.d.ts.map