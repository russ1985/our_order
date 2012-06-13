var personOrderTpl = new Ext.XTemplate(
    '<div style="font-weight:bold;">{name}</div>',
    '<p><tpl for="orderItems">',
        '<span style="font-size:16px;padding-left:5px;">{name} </span>', 
		'<p><tpl for="toppings">',
			'<span style="font-size:12px;padding-left:10px;">{name} </span>', 
		'</p></tpl>',
    '</p></tpl>'
);

Ext.define("OurOrder.view.PersonList", {
    extend: "Ext.dataview.List",
    alias: "widget.personList",
    config: {
        loadingText: "Loading People...",
        emptyText: '</pre><div class="notes-list-empty-text">Nobody has ordered anything.</div><pre>',
        onItemDisclosure: true,
        itemTpl:personOrderTpl
    }
});
