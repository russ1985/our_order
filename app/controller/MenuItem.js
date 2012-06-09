Ext.define('OurOrder.controller.MenuItem', {
    extend: 'Ext.app.Controller',
	config: {
		refs: {
			menuItemListContainer: "menuitemlistcontainer",
			personListContainer: "personlistcontainer",
			toppinglistcontainer: "toppinglistcontainer"
		},
		control: {
			menuItemListContainer: {
			    backToPeopleCommmand: 'onBackToPeopleCommmand',
				newMenuItemCommmand: 'onNewMenuItemCommmand',
				deleteMenuItemCommand: 'onDeleteMenuItemCommand',
				showToppingsCommand: 'onShowToppingsCommand'
			}
		}
	},
	
	onBackToPeopleCommmand: function(){
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
					menuItemListContainer.person.menuItems().add({name:value});
					menuItemListContainer.person.menuItems().sync();
				}
		});
	},
	
	onDeleteMenuItemCommand: function(menuItemListContainer){
		if(menuItemListContainer.down('menuitemlist').getSelection().length == 0){
				Ext.Msg.alert("Error", "Please select something.");
		}
		else{
			menuItem = menuItemListContainer.down('menuitemlist').getSelection()[0];
			Ext.Msg.confirm("Delete Selection", "Are you sure you want to delete "+menuItem.get('name')+" ?", function(answer){
						if(answer === 'yes'){
							menuItemListContainer.person.menuItems().remove(menuItem);
					        menuItemListContainer.person.menuItems().sync();
						}
				});
		}
	},
	
	onShowToppingsCommand: function(menuItemListContanier, menuItem){
		var toppingListContainer = this.getToppinglistcontainer();
		toppingListContainer.query('#toptoolbar')[0].setTitle(menuItem.getPerson().get('name') + "'s " +menuItem.get('name')+ "'s Toppings");
		toppingListContainer.down('toppinglist').setStore(menuItem.toppings());
		toppingListContainer.setMenuItem(menuItem);
		Ext.Viewport.animateActiveItem(toppingListContainer, { type: 'slide', direction: 'left' });
	},
	
	launch: function(){
		this.callParent(arguments);
	},
	
	init: function(){
		this.callParent(arguments);
	},
});