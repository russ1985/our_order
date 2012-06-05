Ext.define("OurOrder.view.PersonList", {
    extend: "Ext.dataview.List",
    alias: "widget.personList",
    config: {
        loadingText: "Loading Notes...",
        emptyText: '</pre><div class="notes-list-empty-text">No notes found.</div><pre>',
        onItemDisclosure: true,
        itemTpl: '</pre><div class="list-item-title">{firstName} {lastName}</div><div class="list-item-narrative">{narrative}</div><pre>',
    }
});
