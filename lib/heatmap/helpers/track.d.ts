/**
 * Utility class use for calculating :
 *
 * Track - the whole container
 * Lane - each blocks inside the track
 * Content - content that lies inside the lane
 */
export declare class Track {
    private _laneSizes;
    private _laneStarts;
    private _trackSize;
    private _margin;
    /**
     * Get track size
     * @returns track size
     */
    get trackSize(): number;
    /**
     * Sets track size
     * @param value number of track size
     */
    set trackSize(value: number);
    /**
     * Get lane count
     * @returns lane count
     */
    get laneCount(): number;
    /**
     * Sets lane count
     * @param value number of lane count
     */
    set laneCount(value: number);
    /**
     * Get margin
     * @returns margin in pixel
     */
    get margin(): number;
    /**
     * Sets cells margin
     * @param value number margin
     */
    set margin(value: number);
    /**
     * Initialise track
     * @param trackSize track size
     * @param laneCount lane count
     * @returns {void}
     */
    init(trackSize: number, laneCount: number): void;
    /**
     * Get lane start
     * @returns lane start position in pixel
     */
    get laneStarts(): number[];
    /**
     * Get lane size
     * @returns lane size in pixel
     */
    get laneSizes(): number[];
    /**
     * Get lane size
     * @param index of lane Array
     * @returns lane start position in pixel
     */
    private getLaneSize;
    /**
     * Get lane start position
     * @param index of lane Array
     * @returns lane start position in pixel
     */
    private getLaneStart;
    /**
     * Get lane end position
     * @param index of lane Array
     * @returns lane end position in pixel
     */
    private getLaneEnd;
    /**
     * Get content size
     * @param index of lane Array
     * @returns content size in pixel
     */
    getContentSize(index: number): number;
    /**
     * Get content start position
     * @param index of lane Array
     * @returns content position in pixel
     */
    getContentStart(index: number): number;
    /**
     * Get content end position
     * @param index of lane Array
     * @returns content position in pixel
     */
    getContentEnd(index: number): number;
    /**
     * Finds lane's index using the mouse position in pixel
     * @param mousePixel current mouse position in pixel
     * @returns index of the lane
     */
    hitTest(mousePixel: number): number;
}
