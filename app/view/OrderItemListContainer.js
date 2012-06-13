Ext.define("OurOrder.view.OrderItemListContainer", {
    extend: "Ext.Container",
    alias:"widget.orderitemlistcontainer",
	order:null,
	
	config: {
		layout:'fit'
    },
	
	onBackToPeopleTap: function(){
		this.fireEvent('backToPeopleCommmand', this);
	},
	
	onNewOrderItemTap: function(){
		this.fireEvent('newOrderItemCommmand', this);
	},
	
	onOrderItemDeleteTap: function(){
		this.fireEvent('deleteOrderItemCommand', this);
	},
	
	onShowToppingsCommand: function(list, record, target, index, e, eopts){
		this.fireEvent('showToppingsCommand', this, record);
	},
	
	setOrder: function(order){
		this.order = order;
	},
	
	renderOrderItemList: function(){
	    var currentOrderItemList = this.down('#orderitemlist-container');
		if(!Ext.isEmpty(currentOrderItemList)){
			this.remove(currentOrderItemList);
		}
		
		var dataArray = [];
		
		Ext.getStore('OrderItem').filter('order_id',this.order.get('id'))
		Ext.getStore('OrderItem').each(function(orderItem){
			var orderItemData = {name:orderItem.get('name'),id:orderItem.get('id'),toppings:[]};
			Ext.getStore('Topping').clearFilter();
			Ext.getStore('Topping').filter('orderItem_id',orderItem.get('id'))
			Ext.getStore('Topping').each(function(topping){
				orderItemData['toppings'].push({name:topping.get('name')});
			});
			dataArray.push(orderItemData);
		});
		
		this.add({
			xtype:'orderitemlist',
			itemId:'orderitemlist-container',
			data:dataArray,
			listeners:{
				disclose: {fn :this.onShowToppingsCommand, scope:this}
			}
		});
	},
	
	initialize: function(){
		this.callParent(arguments);
		
		var topToolBar = {
		    itemId:'toptoolbar',
            xtype: "toolbar",
            docked: "top",
            items: [
			{
                xtype: "button",
                text: "Back To People",
                ui: "back",
				handler:this.onBackToPeopleTap,
				scope:this
            },
			{
                xtype: "spacer"
            }, {
                xtype: "button",
                text: "Add To Order",
                ui: "action",
				handler:this.onNewOrderItemTap,
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
				handler:this.onOrderItemDeleteTap,
				scope:this
            }]
		};
		
		this.add([topToolBar,bottomToolBar]);
	}
});
