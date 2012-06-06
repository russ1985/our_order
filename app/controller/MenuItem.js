Ext.define('OurOrder.controller.MenuItem', {
    extend: 'Ext.app.Controller',
	
	config: {
		refs: {
			menuItemListContainer: "menuitemlistcontainer",
			personListContainer: "personlistcontainer",
		},
		control: {
			menuItemListContainer: {
			    backToOrderCommmand: 'onBackToOrderCommmand',
				newMenuItemCommmand: 'onNewMenuItemCommmand',
				deletePersonCommand: 'onDeleteMenuItemCommand'
			}
		}
	},
	
	onBackToOrderCommmand: function(){
		var personListContainer = this.getPersonListContainer();
		Ext.Viewport.animateActiveItem(personListContainer, { type: 'slide', direction: 'right' });
	},
	
	onNewMenuItemCommmand: function(){
		var self = this;
		var menuItemListContainer = this.getMenuItemListContainer();
		Ext.Msg.prompt("Add To Order", "What do you want to add to thier order?", function(btnId, value){
				if(Ext.isEmpty(value)){
					Ext.Msg.alert("Error", "You have to add something.");
				}
				else{
					var store = menuItemListContainer.down('menuitemlist').getStore();
					store.add({name:value});
					store.sync();
				}
		});
	},
	
	onDeleteMenuItemCommand: function(personListContanier){

	},
	
	launch: function(){
		this.callParent(arguments);
	},
	
	init: function(){
		this.callParent(arguments);
	},
});