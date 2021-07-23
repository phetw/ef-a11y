import '@refinitiv-ui/elements/lib/button/themes/halo/dark';

elf.customStyles.define('ef-button-bar', ':host{vertical-align:bottom;margin:1px 0;border-radius:0;box-shadow:0 0 0 0 rgba(0,0,0,.5);touch-action:manipulation;background:0 0}::slotted(ef-button:not(:hover):not(:focus)){box-shadow:0 0 1px rgba(0,0,0,.5)}:host ::slotted(ef-button:not(:focus):hover),:host ::slotted(ef-button:not(:focus)[active][toggles]:hover){border-color:#0d0d0d}:host ::slotted(ef-button-bar:not(:first-child)),:host ::slotted(ef-button:not(:first-child)){margin-left:-1px}');
