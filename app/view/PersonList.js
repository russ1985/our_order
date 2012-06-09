Ext.define("OurOrder.view.PersonList", {
    extend: "Ext.dataview.List",
    alias: "widget.personList",
    config: {
        loadingText: "Loading People...",
        emptyText: '</pre><div class="notes-list-empty-text">Nobody has ordered anything.</div><pre>',
        onItemDisclosure: true,
        itemTpl: '</pre><div class="list-item-title">{name}</div><div class="list-item-narrative">{menuitems}</div><pre>'
    }
});
