Ext.define('OurOrder.model.Person', {
    extend: 'Ext.data.Model',
    config: {
        proxy: {
            type: 'localstorage',
            id  : 'ourorder-person-storage'
        },
		idProperty: 'id',
		fields: [
            { name: 'id', type: 'int' },
            { name: 'name', type: 'string' }
        ],
		validations:[
			{ type: 'presence', field: 'name' }
		],
		hasMany: {model:'OurOrder.model.MenuItem', name:'menuItems'}
    }
});