import { CdnLoader } from '@refinitiv-ui/utils';
/**
 * Caches and provides icon SVGs, Loaded either by name from CDN or directly by URL.
 * Uses singleton pattern
 */
declare class IconLoader extends CdnLoader {
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
     * @param iconName - resource path for download
     * @returns Promise, which will be resolved with complete source.
     */
    getSrc(iconName: string): Promise<string>;
    loadSVG(icon: string): Promise<string | undefined>;
}
declare const iconLoaderInstance: IconLoader;
export { iconLoaderInstance as IconLoader };
/**
 * Helper function to preload set of icons.
 * It could help to reduce icon loading delay when ef-icon has a known set of icons that it can use.
 * @param attrs - list of arguments, representing icons.
 * Could be icon names, complete icon URLs or mix of both.
 * @returns Array of promises, which will be resolved with SVG bodies.
 */
export declare const preload: (...attrs: string[]) => Promise<string | undefined>[];
//# sourceMappingURL=IconLoader.d.ts.map