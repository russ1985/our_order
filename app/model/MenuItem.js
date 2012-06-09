Ext.define('OurOrder.model.MenuItem', {
    extend: 'Ext.data.Model',
    config: {
		proxy: {
            type: 'localstorage',
            id  : 'ourorder-menuitems-storage'
        },
		idProperty: 'id',
		fields: [
            { name: 'id', type: 'int' },
			{ name: 'person_id', type: 'int' },
			{ name: 'id', type: 'int' },
            { name: 'name', type: 'string' }
        ],
		validations:[
			{ type: 'presence', field: 'name' }
		],
		associations: [
            { type: 'belongsTo', model: 'OurOrder.model.Person', name:'person', foreignKey: 'person_id' },
			{ type: 'hasMany', model: 'OurOrder.model.Topping', name:'toppings', foreignKey: 'menuItem_id' }
        ]
    }
});