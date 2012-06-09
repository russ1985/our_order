Ext.define("OurOrder.view.MenuItemListContainer", {
    extend: "Ext.Container",
    alias:"widget.menuitemlistcontainer",
	person:null,
	
	config: {
		layout:'fit'
    },
	
	onBackToPeopleTap: function(){
		this.fireEvent('backToPeopleCommmand', this);
	},
	
	onNewMenuItemTap: function(){
		this.fireEvent('newMenuItemCommmand', this);
	},
	
	onMenuItemDeleteTap: function(){
		this.fireEvent('deleteMenuItemCommand', this);
	},
	
	onShowToppingsCommand: function(list, record, target, index, e, eopts){
		this.fireEvent('showToppingsCommand', this, record);
	},
	
	setPerson: function(person){
		this.person = person;
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
				disclose: {fn :this.onShowToppingsCommand, scope:this}
			}
		};
		
		this.add([topToolBar,menuItemList,bottomToolBar]);
	}
});
