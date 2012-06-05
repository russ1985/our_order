Ext.define("OurOrder.view.PersonListContainer", {
    extend: "Ext.Container",
    alias:"widget.personlistcontainer",
	
	config: {
		layout:'fit'
    },
	
	onNewPersonTap: function(){
		console.log('newPersonCommand');
		this.fireEvent('newPersonCommmand', this);
	},
	
	onPersonListDisclose: function(){
	
	},
	
	initialize: function(){
		this.callParent(arguments);
		
		var toolBar = {
            xtype: "toolbar",
            docked: "top",
            title: "Our Order",
            items: [{
                xtype: "spacer"
            }, {
                xtype: "button",
                text: "Add Person",
                ui: "action",
                id:"new-person-btn",
				handler:this.onPersonButtonTap,
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
		
		this.add(toolBar);
		this.add(personList);
	}
});
