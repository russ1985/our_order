Ext.define("OurOrder.view.MenuItemList", {
    extend: "Ext.dataview.List",
    alias: "widget.menuitemlist",
    config: {
        loadingText: "Loading Order Items...",
        emptyText: '</pre><div class="notes-list-empty-text">Nothing ordered.</div><pre>',
        onItemDisclosure: true,
        itemTpl: '</pre><div class="list-item-title">{name}</div><pre>'
    }
});
