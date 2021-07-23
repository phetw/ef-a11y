import '@refinitiv-ui/elements/lib/text-field/themes/halo/dark';
import '@refinitiv-ui/elements/lib/number-field/themes/halo/dark';
import '@refinitiv-ui/elements/lib/button/themes/halo/dark';
import '@refinitiv-ui/elements/lib/panel/themes/halo/dark';
import '@refinitiv-ui/elements/lib/dialog/themes/halo/dark';

elf.customStyles.define('ef-color-dialog', ':host{width:425px}:host [part=content-section]{display:flex;min-width:0}:host [part=inputs-container]{display:flex;flex-direction:column;align-items:flex-end;padding-left:15px}:host [part=inputs-container]>*{display:flex;align-items:center;margin-bottom:5px}:host [part=color-input],:host [part=preview-color]{touch-action:manipulation;margin:2px;width:100px;box-sizing:border-box}:host [part=preview-color]{border:1px solid #404040;height:24px;margin-bottom:10px}:host [part=palettes-container]{width:100%}:host [part=color-palettes]{width:100%;height:calc(100% - 23px)}:host [part=grayscale-palettes]{height:23px}:host [part=color-palettes],:host [part=grayscale-palettes]{touch-action:manipulation}:host [part=footer]{display:flex;justify-content:flex-end;align-items:center}:host [part=button]{touch-action:manipulation;margin:8px}:host [part=button]:first-child{margin-right:0}');
