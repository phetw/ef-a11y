/**
 * Default filter used by combo box
 * @param el ComboBox instance to filter
 * @returns Filter accepting an item
 */
export const defaultFilter = (el) => {
    // reference query string for validating queryRegExp cache state
    let query = '';
    // cache RegExp
    let queryRegExp;
    // Get current RegExp, or renew if out of date
    // this is fetched on demand by filter/renderer
    // only created once per query
    const getRegularExpressionOfQuery = () => {
        if (el.query !== query || !queryRegExp) {
            query = el.query || '';
            queryRegExp = new RegExp(query.replace(/(\W)/g, '\\$1'), 'i');
        }
        return queryRegExp;
    };
    // return scoped custom filter
    return (item) => {
        const regex = getRegularExpressionOfQuery();
        const result = regex.test(item.label);
        // this example uses global scope, so the index needs resetting
        regex.lastIndex = 0;
        return result;
    };
};
//# sourceMappingURL=filter.js.map