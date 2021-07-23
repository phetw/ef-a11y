const registry = [];
/**
 * Remove radio button from registry
 * @param radio Radio button to remove
 * @returns {void}
 */
const removeFromRegistry = (radio) => {
    const idx = registry.indexOf(radio);
    if (idx !== -1) {
        registry.splice(idx, 1);
    }
};
/**
 * Add radio button to registry group of radio has a name
 * If radio does not have the name, remove from the group
 * @param radio Radio button to add
 * @returns {void}
 */
const applyRegistry = (radio) => {
    const idx = registry.indexOf(radio);
    if (radio.name && idx === -1) {
        registry.push(radio);
    }
    else if (!radio.name && idx !== -1) {
        removeFromRegistry(radio);
    }
};
/**
 * Get the group of same name radio buttons
 * @param radio A radio to get a group for
 * @returns collection of radio buttons
 */
const getRadioGroup = (radio) => {
    if (!registry.includes(radio)) {
        return [];
    }
    const groupName = radio.name;
    return registry.filter(radio => radio.name === groupName);
};
export { applyRegistry, removeFromRegistry, getRadioGroup };
//# sourceMappingURL=radio-button-registry.js.map