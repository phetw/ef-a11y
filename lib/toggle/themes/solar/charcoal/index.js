
elf.customStyles.define('ef-toggle', ':host{touch-action:manipulation;font-size:13rem;text-align:center;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;outline:0;border-radius:0;box-shadow:inset 0 0 0 rgba(0,0,0,.6);transition:box-shadow .2s,border-color .2s;width:44px;height:24px;color:#e2e2e2;background-color:#000;line-height:18px}:host [part=toggle]{cursor:pointer;display:block;position:relative;width:100%;height:100%;box-sizing:border-box;border:1px solid #4a4a52;border-radius:inherit;text-overflow:inherit;overflow:inherit;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host [part=toggle]::after{content:\'\';position:absolute;top:1px;left:1px;width:calc(50% - 1px);height:calc(100% - (1px * 2));background-color:#555d6c;box-sizing:border-box;border-radius:inherit}:host([label]){width:67.6px;min-width:52px;min-width:44px}:host([readonly]) [part=toggle]{cursor:default}:host([disabled]) [part=toggle]{opacity:.5}:host([checked]) [part=toggle]::after{right:1px;left:auto;border-color:#f93;background-color:#f93}:host(:hover:not([readonly])),:host([focused=visible]){box-shadow:0 0 0 #f93}:host(:hover:not([readonly])) [part=toggle],:host([focused=visible]) [part=toggle]{border-color:#f93;border-style:dotted}:host [part=toggle] ::after{top:1px;left:1px;width:calc(50% - 1px);height:calc(100% - (1px * 2));background-image:linear-gradient(rgba(255,255,255,.1) 10%,rgba(255,255,255,0) 100%)}:host([label][checked]) [part=toggle]{padding-right:24px;padding-left:3px}:host([label]) [part=toggle]{padding:3px 3px 3px 24px}:host([label]) [part=toggle]::after{width:20px}:host([checked]) [part=toggle] ::after{right:1px}');