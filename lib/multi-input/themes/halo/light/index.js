import '@refinitiv-ui/elements/lib/text-field/themes/halo/light';
import '@refinitiv-ui/elements/lib/pill/themes/halo/light';

elf.customStyles.define('ef-multi-input', ':host{display:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;text-align:left;font-family:inherit;font-size:12rem;font-weight:400;max-width:100%;outline:0;box-sizing:border-box;display:inline-flex;align-items:center;position:relative;vertical-align:middle;color:#404040;border-radius:0;background-color:#fff;text-overflow:ellipsis;border:1px solid #595959;display:flex;width:100%;height:auto;min-height:24px;justify-content:normal;scrollbar-face-color:#999;scrollbar-shadow-color:#999;scrollbar-highlight-color:#999;scrollbar-arrow-color:#999;scrollbar-track-color:#f2f2f2;scrollbar-3dlight-color:#f2f2f2;scrollbar-darkshadow-color:#f2f2f2;scrollbar-color:#999 #f2f2f2;scrollbar-width:thin;margin:0;padding:0}:host([disabled]){color:rgba(64,64,64,.5);border:1px solid rgba(89,89,89,.5)}:host([type=number]){padding-right:0}:host([warning]){border:1px solid #cca000}:host([warning][disabled]){color:rgba(64,64,64,.5);border:1px solid rgba(204,160,0,.5)}:host([error]),:host([error][warning]){border:1px solid #b63243}:host([error][disabled]),:host([error][warning][disabled]){color:rgba(64,64,64,.5);border:1px solid rgba(182,50,67,.5)}:host ::-ms-clear{display:none}:host([focused]){background-size:100% 2px,100% 1px!important;background-position:center bottom!important;border-color:#334bff}:host [part=search-holder]{align-items:center}::-webkit-scrollbar-corner{background:0 0}::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-thumb{background:#999;border-radius:0;border:1px solid transparent}::-webkit-scrollbar-thumb:hover{background:#334bff}::-webkit-scrollbar-thumb:active{background:#0f1e8a}::-webkit-scrollbar-track{background:#f2f2f2}::-webkit-scrollbar-thumb:horizontal{background-size:auto 6px;background-repeat:repeat-x;background-image:linear-gradient(to bottom,#999,#999);background-color:transparent;background-position:center}::-webkit-scrollbar-thumb:horizontal:hover{background-image:linear-gradient(to bottom,#334bff,#334bff);background-color:transparent;background-position:center}::-webkit-scrollbar-thumb:horizontal:active{background-image:linear-gradient(to bottom,#0f1e8a,#0f1e8a);background-color:transparent;background-position:center}::-webkit-scrollbar-thumb:vertical{background-size:6px auto;background-repeat:repeat-y;background-image:linear-gradient(to right,#999,#999);background-color:transparent;background-position:center}::-webkit-scrollbar-thumb:vertical:hover{background-image:linear-gradient(to right,#334bff,#334bff);background-color:transparent;background-position:center}::-webkit-scrollbar-thumb:vertical:active{background-image:linear-gradient(to right,#0f1e8a,#0f1e8a);background-color:transparent;background-position:center}::-webkit-scrollbar-track:horizontal{border-top:1px solid #fff;border-bottom:1px solid #fff}::-webkit-scrollbar-track:vertical{border-left:1px solid #fff;border-right:1px solid #fff}::-webkit-scrollbar-button{background:0 0/1px 2px no-repeat #f2f2f2;height:16px;width:16px;display:none;border:1px solid #fff}::-webkit-scrollbar-button:end:decrement,::-webkit-scrollbar-button:start:increment{display:none}::-webkit-scrollbar-button:hover{background-color:#334bff;border:1px solid #334bff}::-webkit-scrollbar-button:active{background-color:#0f1e8a;border:1px solid #fff}::-webkit-scrollbar-button:horizontal{background-size:2px 1px}::-webkit-scrollbar-button:vertical:start:decrement{border-bottom-color:#fff;background-image:linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959);background-position:10.55px 8px,9.55px 7px,8.55px 6px,7.55px 5px,6.55px 4px,5.55px 5px,4.55px 6px,3.55px 7px,2.55px 8px}::-webkit-scrollbar-button:vertical:start:decrement:hover{background-image:linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff);background-position:10.55px 8px,9.55px 7px,8.55px 6px,7.55px 5px,6.55px 4px,5.55px 5px,4.55px 6px,3.55px 7px,2.55px 8px;border-bottom-color:#334bff}::-webkit-scrollbar-button:vertical:start:decrement:active{background-image:linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff);background-position:10.55px 8px,9.55px 7px,8.55px 6px,7.55px 5px,6.55px 4px,5.55px 5px,4.55px 6px,3.55px 7px,2.55px 8px;border-bottom-color:#fff}::-webkit-scrollbar-button:vertical:end:increment{border-top-color:#fff;background-image:linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959);background-position:10.55px 4px,9.55px 5px,8.55px 6px,7.55px 7px,6.55px 8px,5.55px 7px,4.55px 6px,3.55px 5px,2.55px 4px}::-webkit-scrollbar-button:vertical:end:increment:hover{background-image:linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff);background-position:10.55px 4px,9.55px 5px,8.55px 6px,7.55px 7px,6.55px 8px,5.55px 7px,4.55px 6px,3.55px 5px,2.55px 4px;border-top-color:#334bff}::-webkit-scrollbar-button:vertical:end:increment:active{background-image:linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff);background-position:10.55px 4px,9.55px 5px,8.55px 6px,7.55px 7px,6.55px 8px,5.55px 7px,4.55px 6px,3.55px 5px,2.55px 4px;border-top-color:#fff}::-webkit-scrollbar-button:horizontal:start:decrement{border-right-color:#fff;background-image:linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959);background-position:7.5px 10.55px,6.5px 9.55px,5.5px 8.55px,4.5px 7.55px,3.5px 6.55px,4.5px 5.55px,5.5px 4.55px,6.5px 3.55px,7.5px 2.55px}::-webkit-scrollbar-button:horizontal:start:decrement:hover{background-image:linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff);background-position:7.5px 10.55px,6.5px 9.55px,5.5px 8.55px,4.5px 7.55px,3.5px 6.55px,4.5px 5.55px,5.5px 4.55px,6.5px 3.55px,7.5px 2.55px;border-right-color:#334bff}::-webkit-scrollbar-button:horizontal:start:decrement:active{background-image:linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff);background-position:7.5px 10.55px,6.5px 9.55px,5.5px 8.55px,4.5px 7.55px,3.5px 6.55px,4.5px 5.55px,5.5px 4.55px,6.5px 3.55px,7.5px 2.55px;border-right-color:#fff}::-webkit-scrollbar-button:horizontal:end:increment{border-left-color:#fff;background-image:linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959),linear-gradient(#595959,#595959);background-position:5px 10.55px,6px 9.55px,7px 8.55px,8px 7.55px,9px 6.55px,8px 5.55px,7px 4.55px,6px 3.55px,5px 2.55px}::-webkit-scrollbar-button:horizontal:end:increment:hover{background-image:linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff);background-position:5px 10.55px,6px 9.55px,7px 8.55px,8px 7.55px,9px 6.55px,8px 5.55px,7px 4.55px,6px 3.55px,5px 2.55px;border-left-color:#334bff}::-webkit-scrollbar-button:horizontal:end:increment:active{background-image:linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff),linear-gradient(#fff,#fff);background-position:5px 10.55px,6px 9.55px,7px 8.55px,8px 7.55px,9px 6.55px,8px 5.55px,7px 4.55px,6px 3.55px,5px 2.55px;border-left-color:#fff}:host [part=pill]{margin:2px;height:18px}:host [part=search]{margin:0;height:20px}:host(:not([readonly]):not([error]):not([warning]):hover){border-color:#0d0d0d}:host([readonly]:not([focused])){border-color:rgba(89,89,89,.5)}:host([warning]){border-color:#cca000}:host([warning]:hover:not([readonly])){border-color:#ffe999}:host([error]){border-color:#d94255}:host([error]:hover:not([readonly])){border-color:#eeacb4}');