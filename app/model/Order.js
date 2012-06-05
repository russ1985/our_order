Ext.define('OurOrder.model.Order', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'name', type: 'string' }
        ],
		validations:[
			{ type: 'presence', field: 'name' }
		],
		hasMany: 'OrderItem',
		belongsTo: 'Place'
    }
});