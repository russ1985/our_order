Ext.define('OurOrder.controller.Person', {
    extend: 'Ext.app.Controller',
	
	config: {
		refs: {
			personListContainer: "personlistcontainer"
		},
		control: {
			personListContainer: {
				newPersonCommmand: 'onNewPersonCommmand'
			}
		}
	},
	
	onNewPersonCommmand: function(){
		console.log('onNewPersonCommmand');
	},
	
	launch: function(){
		this.callParent(arguments);
		Ext.getStore("People").load();
        console.log("launch");
	},
	
	init: function(){
		this.callParent(arguments);
	},
});