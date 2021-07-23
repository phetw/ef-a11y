import { RadioButton } from './index';
/**
 * Remove radio button from registry
 * @param radio Radio button to remove
 * @returns {void}
 */
declare const removeFromRegistry: (radio: RadioButton) => void;
/**
 * Add radio button to registry group of radio has a name
 * If radio does not have the name, remove from the group
 * @param radio Radio button to add
 * @returns {void}
 */
declare const applyRegistry: (radio: RadioButton) => void;
/**
 * Get the group of same name radio buttons
 * @param radio A radio to get a group for
 * @returns collection of radio buttons
 */
declare const getRadioGroup: (radio: RadioButton) => RadioButton[];
export { applyRegistry, removeFromRegistry, getRadioGroup };
