import { CdnLoader } from '@refinitiv-ui/utils';
/**
 * Caches and provides flag SVGs, Loaded either by name from CDN or directly by URL.
 * Uses singleton pattern
 */
declare class FlagLoader extends CdnLoader {
    private cdnPrefix;
    private _isPrefixSet;
    /**
     * @returns {boolean} clarify whether prefix has been set or not.
     */
    get isPrefixSet(): boolean;
    /**
     * Sets clarify whether prefix has been set or not
     * @param value - new value that is going to set.
     */
    set isPrefixSet(value: boolean);
    /**
     * @returns promise, which will be resolved with CDN prefix, once set.
     */
    getCdnPrefix(): Promise<string>;
    /**
     * Sets CDN prefix to load source.
     * Resolves deferred promise with CDN prefix and sets src used to check whether prefix is already set or not.
     * @param prefix - CDN prefix.
     * @returns {void}
     */
    setCdnPrefix(prefix: string): void;
    /**
     * Creates complete source using CDN prefix and src.
     * Waits for CDN prefix to be set.
     * @param flagName - resource path for download
     * @returns Promise, which will be resolved with complete source.
     */
    getSrc(flagName: string): Promise<string>;
    loadSVG(flag: string): Promise<string | undefined>;
}
declare const flagLoaderInstance: FlagLoader;
export { flagLoaderInstance as FlagLoader };
/**
 * Helper function to preload set of flags.
 * It could help to reduce flag loading delay when flag has a known set of flags that it can use.
 * @param attrs - list of arguments, representing flags.
 * Could be flag names, complete flag URLs or mix of both.
 * @returns Array of promises, which will be resolved with SVG bodies.
 */
export declare const preload: (...attrs: string[]) => Promise<string | undefined>[];
//# sourceMappingURL=FlagLoader.d.ts.map