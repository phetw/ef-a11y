import '@refinitiv-ui/elements/lib/overlay/themes/halo/dark';

elf.customStyles.define('ef-tooltip', ':host [part=tooltip]{--panel-background-color:#FFFFFF;pointer-events:none;border:1px solid hsla(220,12%,75%,.15);padding:4px 8px;background-color:#fff;border-radius:0;overflow:hidden;max-width:320px;overflow-wrap:break-word;word-wrap:break-word;margin:4px;border:none;min-height:18px;line-height:18px;color:#0d0d0d}:host(:not([position])) [part=tooltip],:host([position=auto]) [part=tooltip]{margin-top:20px;margin-left:0}');
