Ext.define('OurOrder.controller.OrderItem', {
    extend: 'Ext.app.Controller',
	config: {
		refs: {
			orderItemListContainer: "orderitemlistcontainer",
			personListContainer: "personlistcontainer",
			toppinglistcontainer: "toppinglistcontainer"
		},
		control: {
			orderItemListContainer: {
			    backToPeopleCommmand: 'onBackToPeopleCommmand',
				newOrderItemCommmand: 'onNewOrderItemCommmand',
				deleteOrderItemCommand: 'onDeleteOrderItemCommand',
				showToppingsCommand: 'onShowToppingsCommand'
			}
		}
	},
	
	onBackToPeopleCommmand: function(){
		var personListContainer = this.getPersonListContainer();
		personListContainer.renderPersonList();
		Ext.Viewport.animateActiveItem(personListContainer, { type: 'slide', direction: 'right' });
	},
	
	onNewOrderItemCommmand: function(){
		var orderItemListContainer = this.getOrderItemListContainer();
		Ext.Msg.prompt("Add To Order", "What do you want to add to thier order?", function(btnId, value){
				if(Ext.isEmpty(value)){
					Ext.Msg.alert("Error", "You have to add something.");
				}
				else{
					orderItemStore = Ext.getStore('OrderItem');
					orderItemStore.add({name:value,order_id:orderItemListContainer.order.get('id')});
					orderItemStore.sync();
					orderItemListContainer.renderOrderItemList();
				}
		});
	},
	
	onDeleteOrderItemCommand: function(orderItemListContainer){
		if(orderItemListContainer.down('orderitemlist').getSelection().length == 0){
				Ext.Msg.alert("Error", "Please select something.");
		}
		else{
			orderItem = orderItemListContainer.down('orderitemlist').getSelection()[0];
			Ext.Msg.confirm("Delete Selection", "Are you sure you want to delete "+orderItem.get('name')+" ?", function(answer){
						if(answer === 'yes'){
							//remove all related toppings
							orderItem.removeToppings();
							
							orderItemListContainer.down('orderitemlist').deselectAll();
							orderItemStore = Ext.getStore('OrderItem');
							orderItemStore.remove(orderItem);
					        orderItemStore.sync();
							orderItemListContainer.renderOrderItemList();
						}
				});
		}
	},
	
	onShowToppingsCommand: function(menuItemListContanier, orderItem){
		//filter the OrderItem store by this order
		Ext.getStore('Topping').clearFilter();
		Ext.getStore('Topping').filter('orderItem_id',orderItem.get('id'));
		
		var toppingListContainer = this.getToppinglistcontainer();
		toppingListContainer.query('#toptoolbar')[0].setTitle(orderItem.get('name')+ "'s Toppings");
		toppingListContainer.setOrderItem(orderItem);
		Ext.Viewport.animateActiveItem(toppingListContainer, { type: 'slide', direction: 'left' });
	},
	
	launch: function(){
		this.callParent(arguments);
	},
	
	init: function(){
		this.callParent(arguments);
	},
});