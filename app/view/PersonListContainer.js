Ext.define("OurOrder.view.PersonListContainer", {
    extend: "Ext.Container",
    alias:"widget.personlistcontainer",
	
	config: {
		layout:'card'
    },
	
	onNewPersonTap: function(){
		this.fireEvent('newPersonCommmand', this);
	},
	
	onPersonDeleteTap: function(){
		this.fireEvent('deletePersonCommand', this);
	},
	
	onPersonListDisclose: function(list, record, target, index, e, eopts){
		this.fireEvent('showOrderItemsCommand', this, record);
	},
	
	onClearOrder: function(){
		this.fireEvent('clearOrderCommand', this);
	},
	
	renderPersonList: function(){
	    var currentPersonList = this.down('#personlist-container');
		if(!Ext.isEmpty(currentPersonList)){
			this.remove(currentPersonList);
		}
		
		var personlist = this.down('personList');
		var dataArray = [];
		
		Ext.getStore('Person').each(function(person){
			var personData = {};
			personData['name'] = person.get('name');
			personData['id'] = person.get('id');
			var order = Ext.getStore("Order").findRecord('person_id', person.get('id'), 0, false, true, true);
			personData['orderItems'] = [];
			Ext.getStore('OrderItem').clearFilter();
			if(!Ext.isEmpty(order)){
				Ext.getStore('OrderItem').filter('order_id',order.get('id'))
				Ext.getStore('OrderItem').each(function(orderItem){
					var orderItemData = {name:orderItem.get('name'),toppings:[]};
					Ext.getStore('Topping').clearFilter();
					Ext.getStore('Topping').filter('orderItem_id',orderItem.get('id'))
					Ext.getStore('Topping').each(function(topping){
						orderItemData['toppings'].push({name:topping.get('name')});
					});
					personData['orderItems'].push(orderItemData);
				});
			}
			dataArray.push(personData);
		});
		
		this.add({
			xtype:'personList',
			itemId:'personlist-container',
			data:dataArray,
			listeners:{
				disclose: {fn :this.onPersonListDisclose, scope:this}
			}
		});
	},
	
	initialize: function(){
		this.callParent(arguments);
		
		var topToolBar = {
            xtype: "toolbar",
            docked: "top",
            title: "Our Order",
            items: [
			{
                xtype: "button",
                text: "Clear Order",
                ui: "action",
				handler:this.onClearOrder,
				scope:this
            },
			{
                xtype: "spacer"
            }, {
                xtype: "button",
                text: "Add Person",
                ui: "action",
				handler:this.onNewPersonTap,
				scope:this
            }]
        };
		
		var bottomToolBar = {
			xtype: "toolbar",
            docked: "bottom",
            items: [{
                xtype: "button",
                iconCls: "trash",
				iconMask: true,
				handler:this.onPersonDeleteTap,
				scope:this
            }]
		};
		
		this.add([topToolBar,bottomToolBar]);
	}
});
