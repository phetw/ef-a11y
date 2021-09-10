import { ItemType } from '../../item';
export declare type AutosuggestSelectItemEvent = CustomEvent<{
    query: string;
    suggestion: Suggestion;
}>;
export declare type AutosuggestHighlightItem = {
    highlighted: boolean;
};
export declare type AutosuggestHighlightItemEvent = CustomEvent<{
    target: AutosuggestHighlightItem;
    oldTarget: AutosuggestHighlightItem;
}>;
export declare type AutosuggestQueryAction = (event: CustomEvent) => void;
export declare type AutosuggestReason = 'value-changed' | 'input-focus' | 'suggestions-revealed' | 'escape-pressed' | 'enter-pressed' | 'more-results';
export interface Suggestion {
    type?: ItemType;
    label?: string;
    title?: string;
    icon?: string;
    disabled?: boolean;
    value?: string;
    group?: string;
}
export declare type AutosuggestItem = Suggestion | string | unknown;
export interface AutosuggestQuery {
    toString(): string;
}
export declare type AutosuggestTargetElement = HTMLElement & {
    value: string;
};
export declare type AutosuggestMethodType = 'click' | 'enter' | 'clear' | 'reset' | 'navigation';
export declare type AutosuggestRenderer = (suggestion: AutosuggestItem, query: AutosuggestQuery | null) => HTMLElement;
export declare type AutosuggestHighlightable = (suggestion: AutosuggestItem, target: HTMLElement) => boolean;
//# sourceMappingURL=types.d.ts.map