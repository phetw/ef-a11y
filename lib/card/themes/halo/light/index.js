import '@refinitiv-ui/elements/lib/button/themes/halo/light';
import '@refinitiv-ui/elements/lib/overlay-menu/themes/halo/light';
import '@refinitiv-ui/elements/lib/label/themes/halo/light';

elf.customStyles.define('ef-card', ':host{width:400px;box-shadow:0 2px 8px 0 rgba(0,0,0,.25);padding:16px;background-color:#fff;box-shadow:0 2px 8px 0 rgba(0,0,0,.25)}:host [part=body]{flex:1 0 auto}:host [part=header]{display:flex;position:relative;margin-bottom:16px}:host [part=menu-button]{transform:rotate(90deg);font-size:16px;margin:0;height:20px}:host [part=header-text]{font-size:16px;font-weight:700;width:100%}:host [part=footer]{border-top:1px solid #d9d9d9;margin-top:16px;padding-top:8px;width:100%}:host(:not([header])) [part=header]{justify-content:flex-end}');
