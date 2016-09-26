(function(){
'use strict';

angular.module('ShoppingListCheckOff',[])
.controller("ToBuyController",ToBuyController)
.controller("AlreadyBoughtController", AlreadyBoughtController)
.service("ShoppingListCheckOffService", ShoppingListCheckOffService)

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var toBuy = this;

  toBuy.items = function(){
    try{
      return ShoppingListCheckOffService.getToBuyItems();
    }
    catch(e)
    {
      toBuy.allAreBought = "Everything is bought!";
    }
  }

  toBuy.buy = function(itemIndex){
    try {
      ShoppingListCheckOffService.buyItem(itemIndex);
    } catch (e) {

    }
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var alreadyBought = this;

  alreadyBought.items = function(){
    try {
      var list = ShoppingListCheckOffService.getBoughtItems();
      alreadyBought.nothingBought = null;
      return list;

    } catch (e) {
      alreadyBought.nothingBought = e.message;
    }
  }
}

function ShoppingListCheckOffService(){
  var service = this;

  var toBuyItems = [
    { name: "Paracetamol", quantity: 5 },
    { name: "Emzoron Tonic" , quantity: 1},
    { name: "Em-B-Plex Syrup X 100ml" , quantity: 3},
    { name: "Emvite Syrup X 100ml" , quantity: 2},
    { name: "Emgyl Suspension" , quantity: 4}
  ]

  var boughtItems = [];

  service.getToBuyItems = function(){
    if(toBuyItems.length == 0)
      throw new Error("Everything is bought!");
    else
      return toBuyItems;
  }

  service.getBoughtItems = function(){
    if(boughtItems.length == 0){
      throw new Error("Nothing bought yet.");
    }
    else{
      return boughtItems;
    }
  };

  service.buyItem = function(itemIndex){
    var item = toBuyItems[itemIndex];
    boughtItems.push(item);
    toBuyItems.splice(itemIndex,1);
  }
}

})();
