Ext.define('OurOrder.model.Person', {
    extend: 'Ext.data.Model',
    config: {
		idProperty: 'id',
		fields: [
            { name: 'id', type: 'int' },
            { name: 'name', type: 'string' }
        ],
		validations:[
			{ type: 'presence', field: 'name' }
		],
		hasMany: {model:'OurOrder.model.MenuItem', name:'menuItems', foreignKey:'person_id'}
    }
});