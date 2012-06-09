Ext.define("OurOrder.view.ToppingListContainer", {
    extend: "Ext.Container",
    alias:"widget.toppinglistcontainer",
	menuItem:null,
	
	config: {
		layout:'fit'
    },
	
	onNewToppingTap: function(){
		this.fireEvent('newToppingCommmand', this);
	},
	
	onToppingDeleteTap: function(){
		this.fireEvent('deleteToppingCommand', this);
	},
	
	onBackToOrderTap: function(){
		this.fireEvent('backToOrderCommand', this);
	},
	
	setMenuItem: function(menuItem){
		this.menuItem = menuItem;
	},
	
	initialize: function(){
		this.callParent(arguments);
		
		var topToolBar = {
            xtype: "toolbar",
			itemId:'toptoolbar',
            docked: "top",
            title: "Toppings",
            items: [
			{
                xtype: "button",
                text: "Back To Order",
                ui: "back",
				handler:this.onBackToOrderTap,
				scope:this
            },
			{
                xtype: "spacer"
            }, {
                xtype: "button",
                text: "Add Topping",
                ui: "action",
				handler:this.onNewToppingTap,
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
				handler:this.onToppingDeleteTap,
				scope:this
            }]
		};
		
		var toppingsList = {
			xtype:'toppinglist'
		};
		
		this.add([topToolBar,toppingsList,bottomToolBar]);
	}
});
