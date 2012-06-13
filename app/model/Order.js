Ext.define('OurOrder.model.Order', {
    extend: 'Ext.data.Model',
    config: {
		idProperty: 'id',
		proxy: {
            type: 'localstorage',
            id  : 'ourorder-orders-storage'
        },
        fields: [
            { name: 'id', type: 'int' },
			{ name: 'person_id', type: 'int' }
        ],
		validations:[
			{ type: 'presence', field: 'person_id' }
		]
	},
	removeOrderItems:function(){
		var orderItemStore = Ext.getStore('OrderItem');
		var orderItem = orderItemStore.findRecord('order_id', this.get('id'), 0, false, true, true);
		while(!Ext.isEmpty(orderItem)){
			orderItem.removeToppings();
			orderItemStore.remove(orderItem);
			orderItemStore.sync();
			orderItem = orderItemStore.findRecord('order_id', this.get('id'), 0, false, true, true);
		}
	}
});