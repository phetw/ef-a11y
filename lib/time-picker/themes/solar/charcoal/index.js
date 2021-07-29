import '@refinitiv-ui/elements/lib/number-field/themes/solar/charcoal';
import '@refinitiv-ui/elements/lib/icon/themes/solar/charcoal';

elf.customStyles.define('ef-time-picker', ':host{display:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;text-align:left;font-family:inherit;font-size:13rem;font-weight:400;height:23px;max-width:100%;margin:1px 0;outline:0;box-sizing:border-box;display:inline-flex;align-items:center;position:relative;vertical-align:middle;color:#c2c2c2;border-radius:0;text-overflow:ellipsis;width:auto;min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content;background-color:#000;border:1px solid #4a4a52;padding:0}:host([focused]){background-size:100% 2px,100% 1px!important;background-position:center bottom!important;border-color:#f93;border-style:dotted}:host [part=input]{margin:0;text-align:center;padding:0;color:inherit;width:25px}:host [part=divider]::before{content:\':\'}:host [part=toggle]{width:20px;display:flex;flex-flow:column nowrap;align-items:center;justify-content:center;outline:0;cursor:pointer;touch-action:manipulation;font-size:70%;line-height:1}:host [part=input],:host [part=toggle]{height:100%;position:relative}:host [part=input]:focus::after,:host [part=input][focused]::after,:host [part=toggle]:focus::after,:host [part=toggle][focused]::after{content:\'\';border-right:8px solid transparent;border-bottom:4px solid #f93;border-left:8px solid transparent;position:absolute;content:\'\';border:none;left:calc(50% - 7px);bottom:-1px;width:14px;height:1px;background:#f93}:host [part=toggle-item]{opacity:.5}:host [part=toggle-item][active]{opacity:1}:host([disabled]){border:1px solid rgba(74,74,82,.6);color:rgba(194,194,194,.6)}:host([readonly]){border:1px solid rgba(74,74,82,.6)}:host(:not([focused]):not(:focus):hover){border:1px solid #77777d}:host([warning]){background-color:#000;border:1px solid #f93}:host([warning][disabled]){border:1px solid rgba(255,153,51,.6);color:rgba(194,194,194,.6)}:host([warning][readonly]){border:1px solid rgba(255,153,51,.6)}:host([warning]:not([focused]):not(:focus):hover){border:1px solid #ffb366}:host([error]),:host([error][warning]:not([focused])){background-color:#000;border:1px solid #f5475b}:host([error][disabled]),:host([error][warning]:not([focused])[disabled]){border:1px solid rgba(245,71,91,.6);color:rgba(194,194,194,.6)}:host([error][readonly]),:host([error][warning]:not([focused])[readonly]){border:1px solid rgba(245,71,91,.6)}:host([error]:not([focused]):not(:focus):hover),:host([error][warning]:not([focused]):not([focused]):not(:focus):hover){border:1px solid #f87584}:host([highlight]){background-color:#1b252f;border:1px solid #4a4a52}:host([highlight][disabled]){border:1px solid rgba(74,74,82,.6);color:rgba(194,194,194,.6);background-color:rgba(27,37,47,.6)}:host([highlight][readonly]){border:1px solid rgba(74,74,82,.6)}:host([highlight]:not([focused]):not(:focus):hover){border:1px solid #77777d}:host([indirect]){color:#0fd;background-color:#000;border:1px solid #898623}:host([indirect][disabled]){border:1px solid rgba(137,134,35,.6);color:rgba(0,255,221,.6)}:host([indirect][readonly]){border:1px solid rgba(137,134,35,.6)}:host([indirect]:not([focused]):not(:focus):hover){border:1px solid #a7a45a}');