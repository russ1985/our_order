Ext.define('OurOrder.model.OrderItem', {
    extend: 'Ext.data.Model',
    config: {
		idProperty: 'id',
		proxy: {
            type: 'localstorage',
            id  : 'ourorder-orderitems-storage'
        },
		fields: [
            { name: 'id', type: 'int' },
			{ name: 'order_id', type: 'int' },
            { name: 'name', type: 'string' }
        ],
		validations:[
			{ type: 'presence', field: 'name' },
			{ type: 'presence', field: 'order_id' }
		]
    },
	removeToppings : function(){
		var toppingStore = Ext.getStore('Topping');
		var topping = toppingStore.findRecord('orderItem_id', this.get('id'), 0, false, true, true);
		while(!Ext.isEmpty(topping)){
			toppingStore.remove(topping);
			toppingStore.sync();
			topping = toppingStore.findRecord('orderItem_id', this.get('id'), 0, false, true, true);
		}
	}
});