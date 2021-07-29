import '@refinitiv-ui/elements/lib/overlay/themes/solar/pearl';
import '@refinitiv-ui/elements/lib/panel/themes/solar/pearl';
import '@refinitiv-ui/elements/lib/header/themes/solar/pearl';
import '@refinitiv-ui/elements/lib/button/themes/solar/pearl';
import '@refinitiv-ui/elements/lib/icon/themes/solar/pearl';

elf.customStyles.define('ef-dialog', ':host{scrollbar-face-color:#8a8a96;scrollbar-shadow-color:#8a8a96;scrollbar-highlight-color:#8a8a96;scrollbar-arrow-color:#8a8a96;scrollbar-track-color:#fff;scrollbar-3dlight-color:#fff;scrollbar-darkshadow-color:#fff;scrollbar-color:#8a8a96 #fff}:host([full-screen]){width:100%}:host [part=close]{touch-action:manipulation;position:relative;opacity:.8;transition:70ms;opacity:1;right:0;width:16px;height:16px;padding:6px;background:#d94255;color:#fff}:host [part=close]:hover{opacity:1;background:#db4b5e}:host [part=close]:active{opacity:.6;background:#c33b4d}:host [part=default-button]{touch-action:manipulation;width:83px;margin:10px 10px 10px 3px}:host [part=default-button]:first-child{margin-right:0}:host [part=footer]{border-top:1px solid #d5d8db;background:#f2f3f7;border-left:2px solid #d0d4db;border-right:2px solid #d0d4db;border-bottom:2px solid #d0d4db}::-webkit-scrollbar{width:13px;height:13px}::-webkit-scrollbar-button{background:0 0/1px 2px no-repeat #fff;height:12px;width:12px;display:block}::-webkit-scrollbar-thumb{background:#8a8a96;border-radius:7px;border:2px solid #fff}::-webkit-scrollbar-thumb:hover{background:#a9afba}::-webkit-scrollbar-thumb:active{background:#ee7600}::-webkit-scrollbar-track{background:#fff}::-webkit-scrollbar-corner{background:#fff}::-webkit-scrollbar-button:end:decrement,::-webkit-scrollbar-button:start:increment{display:none}::-webkit-scrollbar-button:horizontal{background-size:2px 1px}::-webkit-scrollbar-button:vertical:start:decrement{background-image:linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96);background-position:10px 6.5px,9px 5.5px,8px 4.5px,7px 3.5px,6px 2.5px,5px 3.5px,4px 4.5px,3px 5.5px,2px 6.5px}::-webkit-scrollbar-button:vertical:start:decrement:hover{background-image:linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba);background-position:10px 6.5px,9px 5.5px,8px 4.5px,7px 3.5px,6px 2.5px,5px 3.5px,4px 4.5px,3px 5.5px,2px 6.5px}::-webkit-scrollbar-button:vertical:start:decrement:active{background-image:linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600);background-position:10px 6.5px,9px 5.5px,8px 4.5px,7px 3.5px,6px 2.5px,5px 3.5px,4px 4.5px,3px 5.5px,2px 6.5px}::-webkit-scrollbar-button:vertical:end:increment{background-image:linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96);background-position:10px 3.5px,9px 4.5px,8px 5.5px,7px 6.5px,6px 7.5px,5px 6.5px,4px 5.5px,3px 4.5px,2px 3.5px}::-webkit-scrollbar-button:vertical:end:increment:hover{background-image:linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba);background-position:10px 3.5px,9px 4.5px,8px 5.5px,7px 6.5px,6px 7.5px,5px 6.5px,4px 5.5px,3px 4.5px,2px 3.5px}::-webkit-scrollbar-button:vertical:end:increment:active{background-image:linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600);background-position:10px 3.5px,9px 4.5px,8px 5.5px,7px 6.5px,6px 7.5px,5px 6.5px,4px 5.5px,3px 4.5px,2px 3.5px}::-webkit-scrollbar-button:horizontal:start:decrement{background-image:linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96);background-position:6.5px 10px,5.5px 9px,4.5px 8px,3.5px 7px,2.5px 6px,3.5px 5px,4.5px 4px,5.5px 3px,6.5px 2px}::-webkit-scrollbar-button:horizontal:start:decrement:hover{background-image:linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba);background-position:6.5px 10px,5.5px 9px,4.5px 8px,3.5px 7px,2.5px 6px,3.5px 5px,4.5px 4px,5.5px 3px,6.5px 2px}::-webkit-scrollbar-button:horizontal:start:decrement:active{background-image:linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600);background-position:6.5px 10px,5.5px 9px,4.5px 8px,3.5px 7px,2.5px 6px,3.5px 5px,4.5px 4px,5.5px 3px,6.5px 2px}::-webkit-scrollbar-button:horizontal:end:increment{background-image:linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96);background-position:3.5px 10px,4.5px 9px,5.5px 8px,6.5px 7px,7.5px 6px,6.5px 5px,5.5px 4px,4.5px 3px,3.5px 2px}::-webkit-scrollbar-button:horizontal:end:increment:hover{background-image:linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba);background-position:3.5px 10px,4.5px 9px,5.5px 8px,6.5px 7px,7.5px 6px,6.5px 5px,5.5px 4px,4.5px 3px,3.5px 2px}::-webkit-scrollbar-button:horizontal:end:increment:active{background-image:linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600);background-position:3.5px 10px,4.5px 9px,5.5px 8px,6.5px 7px,7.5px 6px,6.5px 5px,5.5px 4px,4.5px 3px,3.5px 2px}:host [part=header]{border:2px solid #d0d4db;border-bottom:1px solid #d0d4db}:host [part=content]{border-left:2px solid #d0d4db;border-right:2px solid #d0d4db}:host [part=default-button]:first-of-type{margin-right:3px}');