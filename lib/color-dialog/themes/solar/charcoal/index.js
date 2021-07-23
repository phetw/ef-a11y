import '@refinitiv-ui/elements/lib/text-field/themes/solar/charcoal';
import '@refinitiv-ui/elements/lib/number-field/themes/solar/charcoal';
import '@refinitiv-ui/elements/lib/button/themes/solar/charcoal';
import '@refinitiv-ui/elements/lib/panel/themes/solar/charcoal';
import '@refinitiv-ui/elements/lib/dialog/themes/solar/charcoal';

elf.customStyles.define('ef-color-dialog', ':host [part=content-section]{display:flex;min-width:0;padding:5px 0}:host [part=inputs-container]{display:flex;flex-direction:column;align-items:flex-end;padding-left:15px}:host [part=inputs-container]>*{display:flex;align-items:center;margin-bottom:5px}:host [part=color-input],:host [part=preview-color]{touch-action:manipulation;box-sizing:border-box;width:60px;margin:0 0 0 5px}:host [part=preview-color]{border:1px solid #4a4a52;height:30px;margin-bottom:15px}:host [part=palettes-container]{width:100%}:host [part=color-palettes]{width:100%;height:calc(100% - 23px)}:host [part=color-palettes],:host [part=grayscale-palettes]{touch-action:manipulation}:host [part=footer]{display:flex;justify-content:flex-end;align-items:center}:host [part=button]{touch-action:manipulation;margin:10px 10px 10px 3px}:host{width:300px}:host [part=grayscale-palettes]{height:18px;width:140px;margin:5px 0 0 23px}:host [part=button]:first-child{margin-right:3px}');
