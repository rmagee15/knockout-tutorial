//This is a view model for the page that stores and handles the changes to any observables
function MyViewModel() {
   var thisModel = this;
   this.name = ko.observable("John Doe"); //name of person
   this.event = ko.observable("Christmas"); //event for the wishlist

   //A computed observable for the description of the wishlist that combines the above 
   //two variables into a single sentence
   this.description = ko.dependentObservable(function() {
      return this.name() + "'s " + this.event() + " ideas.";
   }, this);

   //Item types for the select tag of under the Type header of the table
   this.itemTypes = [
      {typeName: "Electronics"},
      {typeName: "Books"},
      {typeName: "Services"},
      {typeName: "Other"}
   ];

   //Observable array that keeps track of a changing list of items currently on the wishlist
   //We add one placeholder item as an example
   this.items = ko.observableArray([
      new ItemRow("Name of Item", "www.amazon.com", thisModel.itemTypes[3], "$0.00"),
   ]);

   //Function that handles the addition of a new item to the table by adding to the above array
   this.addItem = function() {
      thisModel.items.push(new ItemRow("", "", thisModel.itemTypes[3], "$0.00"));
   }
};

//Function that handles the item rows of the wishlist table
function ItemRow(item, link, type, price) {
   this.item = ko.observable(item);
   this.link = ko.observable(link);
   this.type = ko.observable(type);
   this.price = ko.observable(price);
   this.onSale = ko.observable(false);
   this.salePrice = ko.observable("Sale Price");
}

//Activates the view model
ko.applyBindings(new MyViewModel());
