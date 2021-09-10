import { DataItem } from '@refinitiv-ui/utils';
import { ComboBox } from '../index';
import { ComboBoxFilter } from './types';
import { ItemData } from '../../item';
/**
 * Default filter used by combo box
 * @param el ComboBox instance to filter
 * @returns Filter accepting an item
 */
export declare const defaultFilter: <T extends DataItem = ItemData>(el: ComboBox<T>) => ComboBoxFilter<T>;
//# sourceMappingURL=filter.d.ts.map