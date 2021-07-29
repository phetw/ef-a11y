import '@refinitiv-ui/elements/lib/icon/themes/solar/charcoal';

elf.customStyles.define('ef-pill', ':host{touch-action:manipulation;transition:70ms;font-family:inherit;font-size:13rem;font-weight:400;min-width:22px;max-width:180px;outline:0;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;vertical-align:middle;position:relative;overflow:hidden}:host [part=close]{touch-action:manipulation;border-radius:100%;position:relative;display:flex;margin-left:4px;flex:none;box-sizing:border-box;cursor:pointer;background-clip:content-box;width:11px;height:11px;color:#c2c2c2;background-color:#000}:host [part=close]:active{border:1px solid transparent}:host([clears]:hover) [part=close]{display:flex}:host{background:#c2c2c2;border-radius:2px;padding:0 4px;color:#000;height:17px;margin:3px 3px 0 0}:host [part=close]:active{border:none}:host([readonly]){background:#c2c2c2}:host([toggles][active]){background:#f93;color:#000}:host([toggles][active]) [part=close]{color:#f93}@media (-ms-high-contrast:none),(pointer:fine){:host(:hover){background:#fff}:host([toggles][active]:hover){background:#ffb366}}');