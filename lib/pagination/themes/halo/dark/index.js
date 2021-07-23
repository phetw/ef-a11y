import '@refinitiv-ui/elements/lib/button/themes/halo/dark';
import '@refinitiv-ui/elements/lib/text-field/themes/halo/dark';
import '@refinitiv-ui/elements/lib/button-bar/themes/halo/dark';
import '@refinitiv-ui/elements/lib/layout/themes/halo/dark';

elf.customStyles.define('ef-pagination', ':host [part=container]{align-items:center;justify-content:flex-end}:host [part=info]{margin-right:10px;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([disabled]) [part=info]{color:rgba(204,204,204,.5)}:host [part=input]{min-width:40px;text-align:center;height:22px;width:150px;margin:0}:host [part=button],:host [part=input]{touch-action:manipulation}:host{--responsive-width:400;margin:1px 0}:host [part=buttons]{margin:0}');
