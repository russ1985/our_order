Ext.define("OurOrder.view.ToppingList", {
    extend: "Ext.dataview.List",
    alias: "widget.toppinglist",
    config: {
        loadingText: "Loading Toppings...",
        emptyText: '</pre><div class="notes-list-empty-text">No toppings have been selected.</div><pre>',
        onItemDisclosure: false,
        itemTpl: '</pre><div class="list-item-title">{name}</div><pre>'
    }
});
