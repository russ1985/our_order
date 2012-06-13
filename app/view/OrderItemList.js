var OrderItemTpl = new Ext.XTemplate(
    '<div style="font-weight:bold;">{name}</div>',
    '<p><tpl for="toppings">',
		'<span style="font-size:12px;padding-left:5px;">{name} </span>', 
	'</p></tpl>'
);

Ext.define("OurOrder.view.OrderItemList", {
    extend: "Ext.dataview.List",
    alias: "widget.orderitemlist",
    config: {
        loadingText: "Loading Order Items...",
        emptyText: '</pre><div class="notes-list-empty-text">Nothing ordered.</div><pre>',
        onItemDisclosure: true,
        itemTpl: OrderItemTpl
    }
});
