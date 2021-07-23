/**
 * A helper functions that assist in working with Text.
 */
export declare class TextHelpers {
    /**
     * Removes white space and line terminator characters from a string.
     * @param str string to be trimmed
     * @returns Trimmed string
     */
    static trim(str: string): string;
    /**
     * Keep truncating character until textNode width is not larger than container width
     * @param textNode text node
     * @param containerWidth parent width
     * @param fullText text to be truncated
     * @returns {void}
     */
    static middleEllipsis(textNode: HTMLElement, containerWidth: number, fullText: string): void;
    /**
     * Insert Middle ellipsis to truncated string
     * @param text string
     * @param endLeft last index of left side
     * @param startRight start index of right side
     * @returns Middle ellipsis string
     */
    private static insertMiddleEllipsis;
    /**
     * Return the closest indexes for middle ellipsis
     * @param fullText text to be truncated
     * @param containerWidth parent width
     * @param actualWidth text node width that contains text to be truncated
     * @returns TruncateOffset
     */
    private static estimateTruncateOffset;
}
