Ext.define('OurOrder.controller.Topping', {
    extend: 'Ext.app.Controller',
	
	config: {
		refs: {
			menuItemListContainer: "menuitemlistcontainer",
			toppingListContainer: "toppinglistcontainer",
		},
		control: {
			toppingListContainer: {
			    newToppingCommmand: 'onNewToppingCommmand',
				deleteToppingCommand: 'onDeleteToppingCommand',
				backToOrderCommand: 'onBackToOrderCommand'
			}
		}
	},
	
	onNewToppingCommmand: function(){
		var self = this;
		var toppingListContainer = this.getToppingListContainer();
		Ext.Msg.prompt("Add a topping", "What do you want to add as a topping?", function(btnId, value){
				if(Ext.isEmpty(value)){
					Ext.Msg.alert("Error", "You have to add something.");
				}
				else{
					toppingListContainer.menuItem.toppings().add({name:value});
					toppingListContainer.menuItem.toppings().sync();
				}
		});
	},
	
	onDeleteToppingCommand: function(toppingListContanier){
		if(toppingListContanier.down('toppinglist').getSelection().length == 0){
				Ext.Msg.alert("Error", "Please select something.");
		}
		else{
			topping = toppingListContanier.down('toppinglist').getSelection()[0];
			Ext.Msg.confirm("Delete Selection", "Are you sure you want to delete "+topping.get('name')+" ?", function(answer){
						if(answer === 'yes'){
							toppingListContainer.menuItem.toppings().remove(topping);
							toppingListContainer.menuItem.toppings().sync();
						}
				});
		}
	},
	
	onBackToOrderCommand: function(){
		Ext.Viewport.animateActiveItem(this.getMenuItemListContainer(), { type: 'slide', direction: 'right' });
	},
	
	launch: function(){
		this.callParent(arguments);
	},
	
	init: function(){
		this.callParent(arguments);
	},
});