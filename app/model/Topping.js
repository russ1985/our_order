Ext.define('OurOrder.model.Topping', {
    extend: 'Ext.data.Model',
    config: {
		idProperty: 'id',
		proxy: {
            type: 'localstorage',
            id  : 'ourorder-toppings-storage'
        },
        fields: [
            { name: 'id', type: 'int' },
			{ name: 'menuItem_id', type: 'int' },
            { name: 'name', type: 'string' }
        ],
		validations:[
			{ type: 'presence', field: 'name' }
		],
		associations: [
            { type: 'belongsTo', model: 'OurOrder.model.MenuItem', name:'menuItem', foreignKey: 'menuItem_id' },
        ]
    }
});