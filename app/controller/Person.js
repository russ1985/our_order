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
				showOrderItemsCommand: 'onShowOrderItemsCommand',
				clearOrderCommand: 'onClearOrderCommand'
			}
		}
	},
	
	onNewPersonCommmand: function(){
		Ext.Msg.prompt("Add Person", "What is thier name?", function(btnId, value){
			if(Ext.isEmpty(value)){
				Ext.Msg.alert("Error", "Name can not be empty.");
			}
			else{
				//var Person = Ext.ModelManager.getModel('OurOrder.model.Person');	
				//var person = Person.create();
				var store = Ext.getStore("People");
				store.add({name:value});
				store.sync();
			}
		});
	},

	onDeletePersonCommand: function(personListContanier){
		if(personListContanier.down('personList').getSelection().length == 0){
				Ext.Msg.alert("Error", "Please select somebody.");
		}
		else{
			person = personListContanier.down('personList').getSelection()[0];
			Ext.Msg.confirm("Delete Person", "Are you sure you want to delete "+person.get('name')+" ?", function(answer){
					if(answer === 'yes'){
						personListContanier.down('personList').deselectAll();
						var store = Ext.getStore("People");
						store.remove(person);
						store.sync();
					}
			});
		}
	},
	
	onShowOrderItemsCommand: function(personListContanier, person){
		var menuItemListContainer = this.getMenuItemListContainer();
		person.menuItems().filter();
		menuItemListContainer.query('#toptoolbar')[0].setTitle(person.get('name') + "'s Order");
		menuItemListContainer.down('menuitemlist').setStore(person.menuItems());
		menuItemListContainer.setPerson(person);
		Ext.Viewport.animateActiveItem(menuItemListContainer, { type: 'slide', direction: 'left' });
	},
	
	onClearOrderCommand: function(personListContanier){
		if(!Ext.isEmpty(Ext.getStore('People'))){Ext.getStore('People').removeAll();Ext.getStore('People').sync();}
	},
	
	launch: function(){
		this.callParent(arguments);
		Ext.getStore("People").load();
	},
	
	init: function(){
		this.callParent(arguments);
	},
});