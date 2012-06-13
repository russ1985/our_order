Ext.define("OurOrder.view.OrderItemList", {
    extend: "Ext.dataview.List",
    alias: "widget.orderitemlist",
    config: {
        loadingText: "Loading Order Items...",
        emptyText: '</pre><div class="notes-list-empty-text">Nothing ordered.</div><pre>',
        onItemDisclosure: true,
        itemTpl: '</pre><div class="list-item-title">{name}</div><pre>'
    }
});
