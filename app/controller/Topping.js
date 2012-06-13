Ext.define('OurOrder.controller.Topping', {
    extend: 'Ext.app.Controller',
	
	config: {
		refs: {
			orderItemListContainer: "orderitemlistcontainer",
			toppingListContainer: "toppinglistcontainer",
		},
		control: {
			toppingListContainer: {
			    newToppingCommmand: 'onNewToppingCommmand',
				deleteToppingCommand: 'onDeleteToppingCommand',
				backToOrderItemCommand: 'onBackToOrderItemCommand'
			}
		}
	},
	
	onNewToppingCommmand: function(){
		var toppingListContainer = this.getToppingListContainer();
		Ext.Msg.prompt("Add a topping", "What do you want to add as a topping?", function(btnId, value){
				if(Ext.isEmpty(value)){
					Ext.Msg.alert("Error", "You have to add something.");
				}
				else{
					toppingStore = Ext.getStore('Topping');
					toppingStore.add({name:value, orderItem_id:toppingListContainer.orderItem.get('id')});
					toppingStore.sync();
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
							toppingListContanier.down('toppinglist').deselectAll();
							toppingStore = Ext.getStore('Topping');
							toppingStore.remove(topping);
					        toppingStore.sync();
						}
				});
		}
	},
	
	onBackToOrderItemCommand: function(){
		Ext.Viewport.animateActiveItem(this.getOrderItemListContainer(), { type: 'slide', direction: 'right' });
	},
	
	launch: function(){
		this.callParent(arguments);
	},
	
	init: function(){
		this.callParent(arguments);
	},
});