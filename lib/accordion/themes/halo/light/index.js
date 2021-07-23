import '@refinitiv-ui/elements/lib/collapse/themes/halo/light';

elf.customStyles.define('ef-accordion', ':host([spacing]) ::slotted(ef-collapse){--panel-padding:12px 8px}:host ::slotted(ef-collapse:not(:last-child):not([expanded])){border-bottom:1px solid #d9d9d9}');
