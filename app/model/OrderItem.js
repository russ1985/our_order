Ext.define('OurOrder.model.OrderItem', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'int' }
        ],
		hasMany:'MenuItem',
		belongsTo:'Order'
    }
});