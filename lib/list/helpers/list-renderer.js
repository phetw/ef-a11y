import '../../item';
import { Renderer } from '../renderer';
/**
 * Renders list items as `ef-item` elements.
 * This is the default renderer for lists.
 */
export class ListRenderer extends Renderer {
    constructor(context) {
        /**
         * Create and return render function
         */
        super((item, composer, element) => {
            /**
             * Element to render
             */
            const el = (element || document.createElement('ef-item'));
            /**
             * Tooltip value to be used, if any.
             */
            const tooltip = composer.getItemPropertyValue(item, 'tooltip');
            el.id = composer.getItemPropertyValue(item, 'id');
            el.role = 'option';
            el.label = composer.getItemPropertyValue(item, 'label');
            el.subLabel = composer.getItemPropertyValue(item, 'subLabel');
            el.value = composer.getItemPropertyValue(item, 'value');
            el.icon = composer.getItemPropertyValue(item, 'icon');
            el.highlighted = composer.getItemPropertyValue(item, 'highlighted') === true;
            el.selected = composer.getItemPropertyValue(item, 'selected') === true;
            el.disabled = composer.getItemPropertyValue(item, 'disabled') === true;
            el.hidden = composer.getItemPropertyValue(item, 'hidden') === true;
            el.type = composer.getItemPropertyValue(item, 'type');
            el.multiple = !!context && context.multiple === true;
            tooltip ? el.setAttribute('title', tooltip) : el.removeAttribute('title');
            return el;
        });
    }
}
//# sourceMappingURL=list-renderer.js.map