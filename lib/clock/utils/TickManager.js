import { TimeoutTaskRunner } from '@refinitiv-ui/utils';
import { MILLISECONDS_IN_SECOND } from '@refinitiv-ui/utils';
const tickSet = new Set();
let timeout = null;
/**
 * Calculate diff time between current time and next time tick
 * @returns diff time
 */
const timeUntilNextTick = () => {
    const now = Date.now();
    const nextTick = Math.ceil(now / MILLISECONDS_IN_SECOND) * MILLISECONDS_IN_SECOND;
    const diff = nextTick - now;
    return diff === 0 ? MILLISECONDS_IN_SECOND : diff;
};
/**
 * Run callback on tick
 * @returns {void}
 */
const tick = () => {
    tickSet.forEach((tickCallback) => tickCallback());
};
/**
 * Start ticking
 * @returns {void}
 */
const startTimer = () => {
    if (timeout === null) {
        timeout = new TimeoutTaskRunner(timeUntilNextTick());
        timeout.schedule(() => {
            timeout = null;
            tick();
            startTimer();
        });
    }
};
/**
 * Stop ticking
 * @returns {void}
 */
const stopTimer = () => {
    if (timeout) {
        timeout.cancel();
        timeout = null;
    }
};
/**
 * Register new tick callback
 * @param tickCallback tick callback
 * @returns {void}
 */
const register = (tickCallback) => {
    tickSet.add(tickCallback);
    startTimer();
};
/**
 * Deregister existing tick callback
 * @param tickCallback tick callback
 * @returns {void}
 */
const deRegister = (tickCallback) => {
    tickSet.delete(tickCallback);
    if (!tickSet.size) {
        stopTimer();
    }
};
export { register, deRegister };
//# sourceMappingURL=TickManager.js.map