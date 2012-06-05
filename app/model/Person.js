Ext.define('OurOrder.model.Person', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'id',
		fields: [
            { name: 'id', type: 'int' },
            { name: 'firstName', type: 'string' },
			{ name: 'lastName', type: 'string' }
        ],
		validations:[
			{ type: 'presence', field: 'firstName' },
			{ type: 'presence', field: 'lastName' }
		],
		hasMany:'OrderItem'
    }
});