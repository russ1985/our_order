Ext.define('OurOrder.model.Person', {
    extend: 'Ext.data.Model',
    config: {
		idProperty: 'id',
		proxy: {
            type: 'localstorage',
            id  : 'ourorder-person-storage'
        },
		fields: [
            { name: 'id', type: 'int' },
            { name: 'name', type: 'string' }
        ],
		validations:[
			{ type: 'presence', field: 'name' }
		]
    },
	removeOrders:function(){
		var orderStore = Ext.getStore('Order');
		var order = orderStore.findRecord('person_id', this.get('id'), 0, false, true, true);
		while(!Ext.isEmpty(order)){
			order.removeOrderItems();
			orderStore.remove(order);
			orderStore.sync();
			order = orderStore.findRecord('person_id', this.get('id'), 0, false, true, true);
		}
	}
});