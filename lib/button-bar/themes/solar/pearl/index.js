import '@refinitiv-ui/elements/lib/button/themes/solar/pearl';

elf.customStyles.define('ef-button-bar', ':host{vertical-align:bottom;margin:1px 0;border-radius:0;box-shadow:0 0 0 0 rgba(0,0,0,.3);touch-action:manipulation;background:0 0}::slotted(ef-button:not(:hover):not(:focus)){box-shadow:0 0 1px rgba(0,0,0,.3)}:host ::slotted(ef-button-bar:not(:first-child)),:host ::slotted(ef-button:not(:first-child)){margin-left:-1px}:host ::slotted(ef-button){box-shadow:none}');
