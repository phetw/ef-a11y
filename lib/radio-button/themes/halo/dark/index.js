import '@refinitiv-ui/elements/lib/tooltip/themes/halo/dark';

elf.customStyles.define('ef-radio-button', ':host{margin:1px 0;vertical-align:middle;display:inline-flex;align-items:center;flex-wrap:nowrap;font-size:inherit;font-weight:inherit;touch-action:manipulation;--check-color:#6678FF;color:#ccc}:host(:focus){outline:0}:host [part=container]{-webkit-appearance:none;-moz-appearance:none;appearance:none;display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;border-radius:100%;background-color:#0d0d0d;transition:box-shadow 150ms,border-color 150ms;box-shadow:inset 0 0 0 rgba(0,0,0,.5);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;border:1px solid #404040;width:14px;height:14px}:host [part=check]{display:flex;justify-content:center;align-items:center;box-sizing:border-box;color:var(--check-color,#6678ff);border:none;background-color:currentColor;transform:none;border-radius:100%;margin:0;width:8px;height:8px}:host [part=label]{margin:0 7px;cursor:default}:host([disabled]) [part=check],:host([readonly]) [part=check]{color:var(--check-color,#ccc)}:host([disabled]) [part=check]{opacity:.5}:host([disabled][checked]) [part=check]{opacity:.5}:host([disabled]) [part=label]{opacity:.65}@media (-ms-high-contrast:none),(pointer:fine){:host(:focus) [part=container]{border-color:#334bff;box-shadow:0 0 0 #334bff}}:host(:not([readonly])){cursor:pointer}:host(:hover:not([checked]):not([readonly])) [part=container]{border-color:grey}:host(:hover:not([readonly])){color:#fff}:host([disabled]),:host([disabled]) [part=label]{opacity:.5}:host([checked]) [part=container]{border:1px solid #334bff}:host(:focus[readonly]:not([checked])) [part=container]{border-color:#404040}:host([focused=visible]){outline:#334bff solid 1px;outline-offset:2px}');