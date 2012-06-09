Ext.define("OurOrder.store.People",{
	extend: "Ext.data.Store",
	config: {
        model: "OurOrder.model.Person",
		proxy: {
            type: 'localstorage',
            id  : 'ourorder-people-storage'
        }
    }
});
