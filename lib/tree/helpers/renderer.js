import { TreeManager, TreeManagerMode, CheckedState } from '../managers/tree-manager';
import { Renderer } from '../../list/renderer';
import '../elements/tree-item';
export class TreeRenderer extends Renderer {
    constructor(scope) {
        let manager;
        let currentMode;
        let currentComposer;
        super((item, composer, element = document.createElement('ef-tree-item')) => {
            const el = element;
            const multiple = !!scope && scope.multiple === true;
            const noRelation = !!scope && scope.noRelation === true;
            const mode = !multiple || !noRelation ? TreeManagerMode.RELATIONAL : TreeManagerMode.INDEPENDENT;
            if (currentComposer !== composer || currentMode !== mode) {
                currentMode = mode;
                currentComposer = composer;
                manager = new TreeManager(composer, mode);
            }
            el.multiple = multiple;
            el.item = item;
            el.depth = composer.getItemDepth(item);
            el.parent = composer.getItemChildren(item).length > 0;
            el.expanded = manager.isItemExpanded(item);
            el.checkedState = !multiple && el.parent ? CheckedState.UNCHECKED : manager.getItemCheckedState(item);
            el.label = composer.getItemPropertyValue(item, 'label');
            el.disabled = composer.getItemPropertyValue(item, 'disabled') === true;
            el.readonly = composer.getItemPropertyValue(item, 'readonly') === true;
            el.highlighted = composer.getItemPropertyValue(item, 'highlighted') === true;
            return el;
        });
    }
}
//# sourceMappingURL=renderer.js.map