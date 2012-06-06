Ext.define('OurOrder.model.Topping', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'int' },
			{ name: 'menu_item_id', type: 'int' },
            { name: 'name', type: 'string' },
			{ name: 'description', type: 'string' }
        ],
		validations:[
			{ type: 'presence', field: 'name' },
			{ type: 'presence', field: 'description' }
		],
		belongsTo:'MenuItem'
    }
});