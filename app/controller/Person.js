Ext.define('OurOrder.controller.Person', {
    extend: 'Ext.app.Controller',
	
	config: {
		refs: {
			personListContainer: "personlistcontainer",
			orderItemListContainer: "orderitemlistcontainer",
		},
		control: {
			personListContainer: {
				newPersonCommmand: 'onNewPersonCommmand',
				deletePersonCommand: 'onDeletePersonCommand',
				showOrderItemsCommand: 'onShowOrderItemsCommand',
				clearOrderCommand: 'onClearOrderCommand'
			}
		}
	},
	
	onNewPersonCommmand: function(){
		var self = this;
		Ext.Msg.prompt("Add Person", "What is thier name?", function(btnId, value){
			if(Ext.isEmpty(value)){
				Ext.Msg.alert("Error", "Name can not be empty.");
			}
			else{
				var store = Ext.getStore("Person");
				store.add({name:value});
				store.sync();
				self.getPersonListContainer().renderPersonList();
			}
		});
	},

	onDeletePersonCommand: function(personListContanier){
		var self = this;
		if(personListContanier.down('personList').getSelection().length == 0){
				Ext.Msg.alert("Error", "Please select somebody.");
		}
		else{
			personSelected = personListContanier.down('personList').getSelection()[0];
			Ext.Msg.confirm("Delete Person", "Are you sure you want to delete "+personSelected.get('name')+" ?", function(answer){
					if(answer === 'yes'){
						var personStore = Ext.getStore("Person");
						var person = personStore.findRecord('id', personSelected.get('id'), 0, false, true, true);
						// remove any orders assoicated to this person
						person.removeOrders();
						
						personListContanier.down('personList').deselectAll();
						personStore.remove(person);
						personStore.sync();
						self.getPersonListContainer().renderPersonList();
					}
			});
		}
	},
	
	onShowOrderItemsCommand: function(personListContanier, person){
		//get the order for this person
		var orderStore = Ext.getStore("Order");
		var order = orderStore.findRecord('person_id', person.get('id'), 0, false, true, true);
		if(Ext.isEmpty(order)){
			orderStore.add({person_id:person.get('id')});
			orderStore.sync();
			order = orderStore.findRecord('person_id', person.get('id'));
		}
	
		var orderItemListContainer = this.getOrderItemListContainer();
		orderItemListContainer.query('#toptoolbar')[0].setTitle(person.get('name') + "'s Order");
		orderItemListContainer.setOrder(order);
		Ext.Viewport.animateActiveItem(orderItemListContainer, { type: 'slide', direction: 'left' });
		orderItemListContainer.renderOrderItemList();
	},
	
	onClearOrderCommand: function(personListContanier){
		if(!Ext.isEmpty(Ext.getStore('Person'))){
			Ext.getStore('Person').removeAll();Ext.getStore('Person').sync();
			Ext.getStore('Order').removeAll();Ext.getStore('Order').sync();
			Ext.getStore('OrderItem').removeAll();Ext.getStore('OrderItem').sync();
			Ext.getStore('Topping').removeAll();Ext.getStore('Topping').sync();
		}
		this.getPersonListContainer().renderPersonList();
	},
	
	launch: function(){
		this.callParent(arguments);
		this.getPersonListContainer().renderPersonList();
	},
	
	init: function(){
		this.callParent(arguments);
	},
});