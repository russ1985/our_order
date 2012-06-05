Ext.define('OurOrder.model.MenuItem', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'name', type: 'string' },
			{ name: 'description', type: 'string' }
        ],
		validations:[
			{ type: 'presence', field: 'name' },
			{ type: 'presence', field: 'description' }
		],
		hasMany:'Topping',
		belongsTo:'OrderItem'
		belongsTo:'Person'
    }
});