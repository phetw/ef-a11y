import { CollectionItem } from '@refinitiv-ui/utils';
export declare type SelectionIndex = number | null;
export declare type MultiInputEvents = 'item-added' | 'item-removed' | 'item-error';
export declare type MultiInputData = MultiInputDataItem[];
export interface MultiInputDataItem extends CollectionItem {
    value: string;
    label: string;
    id?: string;
    readonly?: boolean;
    disabled?: boolean;
}
