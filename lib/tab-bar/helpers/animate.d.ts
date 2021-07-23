interface Configs {
    target: HTMLElement;
    startPosition: number;
    endPosition: number;
    duration?: number;
    easing?: string;
    complete?: () => void;
}
declare const ANIMATION_DURATION = 100;
/**
 * Common easing equations from https://easings.net
 * @param configs animate config
 * @returns {void}
 */
declare const tweenAnimate: (configs: Configs) => void;
export { tweenAnimate, ANIMATION_DURATION };
