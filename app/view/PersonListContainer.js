Ext.define("OurOrder.view.PersonListContainer", {
    extend: "Ext.Container",
    alias:"widget.personlistcontainer",
	
	config: {
		layout:'fit'
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
	
	initialize: function(){
		this.callParent(arguments);
		
		var topToolBar = {
            xtype: "toolbar",
            docked: "top",
            title: "Our Order",
            items: [{
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
		
		var personList = {
			xtype:'personList',
			store:Ext.getStore('People'),
			listeners:{
				disclose: {fn :this.onPersonListDisclose, scope:this}
			}
		};
		
		this.add([topToolBar,personList,bottomToolBar]);
	}
});
