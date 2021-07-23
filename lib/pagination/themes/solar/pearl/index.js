import '@refinitiv-ui/elements/lib/button/themes/solar/pearl';
import '@refinitiv-ui/elements/lib/text-field/themes/solar/pearl';
import '@refinitiv-ui/elements/lib/button-bar/themes/solar/pearl';
import '@refinitiv-ui/elements/lib/layout/themes/solar/pearl';

elf.customStyles.define('ef-pagination', ':host [part=container]{align-items:center;justify-content:flex-end}:host [part=info]{margin-right:10px;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([disabled]) [part=info]{color:rgba(72,72,72,.6)}:host [part=input]{min-width:40px;text-align:center;height:23px;width:150px;margin:0 1px}:host [part=button],:host [part=input]{touch-action:manipulation}:host{--first-icon:previous;--last-icon:next;--previous-icon:left;--next-icon:right;--responsive-width:300}');
