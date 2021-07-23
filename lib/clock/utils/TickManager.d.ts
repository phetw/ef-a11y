declare type TickCallback = () => void;
/**
 * Register new tick callback
 * @param tickCallback tick callback
 * @returns {void}
 */
declare const register: (tickCallback: TickCallback) => void;
/**
 * Deregister existing tick callback
 * @param tickCallback tick callback
 * @returns {void}
 */
declare const deRegister: (tickCallback: TickCallback) => void;
export { register, deRegister };
