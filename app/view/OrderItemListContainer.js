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
		
		var orderItemList = {
			xtype:'orderitemlist',
			store:Ext.getStore('OrderItem'),
			listeners:{
				disclose: {fn :this.onShowToppingsCommand, scope:this}
			}
		};
		
		this.add([topToolBar,orderItemList,bottomToolBar]);
	}
});
