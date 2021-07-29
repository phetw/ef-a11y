import '@refinitiv-ui/elements/lib/item/themes/solar/pearl';
import '@refinitiv-ui/elements/lib/icon/themes/solar/pearl';
import '@refinitiv-ui/elements/lib/overlay/themes/solar/pearl';

elf.customStyles.define('ef-overlay-menu', ':host{min-width:150px;max-width:300px;scrollbar-face-color:#8a8a96;scrollbar-shadow-color:#8a8a96;scrollbar-highlight-color:#8a8a96;scrollbar-arrow-color:#8a8a96;scrollbar-track-color:#fff;scrollbar-3dlight-color:#fff;scrollbar-darkshadow-color:#fff;scrollbar-color:#8a8a96 #fff;background-color:#fafbfc}:host([compact]){min-width:250px}:host [part=menu-back]{border-bottom:1px solid #a9afba}:host [part=menu-back]:hover{background-color:rgba(0,0,0,.08)}::-webkit-scrollbar{width:13px;height:13px}::-webkit-scrollbar-button{background:0 0/1px 2px no-repeat #fff;height:12px;width:12px;display:block}::-webkit-scrollbar-thumb{background:#8a8a96;border-radius:7px;border:2px solid #fff}::-webkit-scrollbar-thumb:hover{background:#a9afba}::-webkit-scrollbar-thumb:active{background:#ee7600}::-webkit-scrollbar-track{background:#fff}::-webkit-scrollbar-corner{background:#fff}::-webkit-scrollbar-button:end:decrement,::-webkit-scrollbar-button:start:increment{display:none}::-webkit-scrollbar-button:horizontal{background-size:2px 1px}::-webkit-scrollbar-button:vertical:start:decrement{background-image:linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96);background-position:10px 6.5px,9px 5.5px,8px 4.5px,7px 3.5px,6px 2.5px,5px 3.5px,4px 4.5px,3px 5.5px,2px 6.5px}::-webkit-scrollbar-button:vertical:start:decrement:hover{background-image:linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba);background-position:10px 6.5px,9px 5.5px,8px 4.5px,7px 3.5px,6px 2.5px,5px 3.5px,4px 4.5px,3px 5.5px,2px 6.5px}::-webkit-scrollbar-button:vertical:start:decrement:active{background-image:linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600);background-position:10px 6.5px,9px 5.5px,8px 4.5px,7px 3.5px,6px 2.5px,5px 3.5px,4px 4.5px,3px 5.5px,2px 6.5px}::-webkit-scrollbar-button:vertical:end:increment{background-image:linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96);background-position:10px 3.5px,9px 4.5px,8px 5.5px,7px 6.5px,6px 7.5px,5px 6.5px,4px 5.5px,3px 4.5px,2px 3.5px}::-webkit-scrollbar-button:vertical:end:increment:hover{background-image:linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba);background-position:10px 3.5px,9px 4.5px,8px 5.5px,7px 6.5px,6px 7.5px,5px 6.5px,4px 5.5px,3px 4.5px,2px 3.5px}::-webkit-scrollbar-button:vertical:end:increment:active{background-image:linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600);background-position:10px 3.5px,9px 4.5px,8px 5.5px,7px 6.5px,6px 7.5px,5px 6.5px,4px 5.5px,3px 4.5px,2px 3.5px}::-webkit-scrollbar-button:horizontal:start:decrement{background-image:linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96);background-position:6.5px 10px,5.5px 9px,4.5px 8px,3.5px 7px,2.5px 6px,3.5px 5px,4.5px 4px,5.5px 3px,6.5px 2px}::-webkit-scrollbar-button:horizontal:start:decrement:hover{background-image:linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba);background-position:6.5px 10px,5.5px 9px,4.5px 8px,3.5px 7px,2.5px 6px,3.5px 5px,4.5px 4px,5.5px 3px,6.5px 2px}::-webkit-scrollbar-button:horizontal:start:decrement:active{background-image:linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600);background-position:6.5px 10px,5.5px 9px,4.5px 8px,3.5px 7px,2.5px 6px,3.5px 5px,4.5px 4px,5.5px 3px,6.5px 2px}::-webkit-scrollbar-button:horizontal:end:increment{background-image:linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96),linear-gradient(#8a8a96,#8a8a96);background-position:3.5px 10px,4.5px 9px,5.5px 8px,6.5px 7px,7.5px 6px,6.5px 5px,5.5px 4px,4.5px 3px,3.5px 2px}::-webkit-scrollbar-button:horizontal:end:increment:hover{background-image:linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba),linear-gradient(#a9afba,#a9afba);background-position:3.5px 10px,4.5px 9px,5.5px 8px,6.5px 7px,7.5px 6px,6.5px 5px,5.5px 4px,4.5px 3px,3.5px 2px}::-webkit-scrollbar-button:horizontal:end:increment:active{background-image:linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600),linear-gradient(#ee7600,#ee7600);background-position:3.5px 10px,4.5px 9px,5.5px 8px,6.5px 7px,7.5px 6px,6.5px 5px,5.5px 4px,4.5px 3px,3.5px 2px}');