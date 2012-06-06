Ext.define('OurOrder.controller.Person', {
    extend: 'Ext.app.Controller',
	
	config: {
		refs: {
			personListContainer: "personlistcontainer",
			menuItemListContainer: "menuitemlistcontainer",
		},
		control: {
			personListContainer: {
				newPersonCommmand: 'onNewPersonCommmand',
				deletePersonCommand: 'onDeletePersonCommand',
				showOrderItemsCommand: 'onShowOrderItemsCommand'
			}
		}
	},
	
	onNewPersonCommmand: function(){
		Ext.Msg.prompt("Add Person", "What is thier name?", function(btnId, value){
				if(Ext.isEmpty(value)){
					Ext.Msg.alert("Error", "Name can not be empty.");
				}
				else{
					var Person = Ext.ModelManager.getModel('OurOrder.model.Person');	
					var person = Person.create({name:value});
					person.save();
					Ext.getStore("People").load();
				}
		});
	},
	//Ext.getStore("OrderItems").applyData();
	onDeletePersonCommand: function(personListContanier){
		if(personListContanier.down('personList').getSelection().length == 0){
				Ext.Msg.alert("Error", "Please select somebody.");
		}
		else{
			person = personListContanier.down('personList').getSelection()[0];
			Ext.Msg.confirm("Delete Person", "Are you sure you want to delete "+person.get('name')+" ?", function(answer){
						if(answer === 'yes'){
							person.erase();
							Ext.getStore("People").load();
						}
				});
		}
	},
	
	onShowOrderItemsCommand: function(personListContanier, person){
		var menuItemListContainer = this.getMenuItemListContainer();
		menuItemListContainer.query('#toptoolbar')[0].setTitle(person.get('name') + "'s Order");
		menuItemListContainer.down('menuitemlist').setStore(person.menuItems());
		menuItemListContainer.down('menuitemlist').getStore().load();
		Ext.Viewport.animateActiveItem(menuItemListContainer, { type: 'slide', direction: 'left' });
	},
	
	launch: function(){
		this.callParent(arguments);
		Ext.getStore("People").load();
	},
	
	init: function(){
		this.callParent(arguments);
	},
});