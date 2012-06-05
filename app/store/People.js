Ext.define("OurOrder.store.People", {
    extend: "Ext.data.Store",
    config: {
        model: "OurOrder.model.Person",
        data: [
            { id: 1, firstName: "Russell", lastName: "Holmes" },
            { id: 2, firstName: "John", lastName: "Holmes" },
            { id: 3, firstName: "Timothy", lastName: "Holmes" },
        ]
    }
});
