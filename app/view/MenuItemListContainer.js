Ext.define("OurOrder.view.MenuItemListContainer", {
    extend: "Ext.Container",
    alias:"widget.menuitemlistcontainer",
	person:null,
	
	config: {
		layout:'fit'
    },
	
	onBackToOrderTap: function(){
		this.fireEvent('backToOrderCommmand', this);
	},
	
	onNewMenuItemTap: function(){
		this.fireEvent('newMenuItemCommmand', this);
	},
	
	onMenuItemDeleteTap: function(){
		this.fireEvent('deleteMenuItemCommand', this);
	},
	
	onMenuItemDisclose: function(){
		this.fireEvent('deleteMenuItemCommand', this);
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
                text: "Back To Order",
                ui: "back",
				handler:this.onBackToOrderTap,
				scope:this
            },
			{
                xtype: "spacer"
            }, {
                xtype: "button",
                text: "Add To Order",
                ui: "action",
				handler:this.onNewMenuItemTap,
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
				handler:this.onMenuItemDeleteTap,
				scope:this
            }]
		};
		
		var menuItemList = {
			xtype:'menuitemlist',
			listeners:{
				disclose: {fn :this.onMenuItemDisclose, scope:this}
			}
		};
		
		this.add([topToolBar,menuItemList,bottomToolBar]);
	}
});