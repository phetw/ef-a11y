import { ElementSize } from '@refinitiv-ui/core';
import { SwingGaugeData, SwingGaugeDrawOption } from './types';
declare const helpers: {
    draw: (drawData: SwingGaugeData, drawCtx: CanvasRenderingContext2D, canvasSize: ElementSize, drawParams: SwingGaugeDrawOption) => void;
    clear: (canvasSize: ElementSize, drawCtx: CanvasRenderingContext2D) => void;
    elasticOut: (time: number) => number;
};
export { helpers };
//# sourceMappingURL=canvas.d.ts.map