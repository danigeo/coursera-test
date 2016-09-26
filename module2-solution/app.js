(function () {
  'use strict';

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {

  var toBuyList=this;
  toBuyList.emptyMessage="Everything is bought!";
  toBuyList.items=ShoppingListCheckOffService.getToBuyItems();
  toBuyList.moveItem = function(itemIndex){
    ShoppingListCheckOffService.moveItems(itemIndex);
  };

};

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {

  var alreadyBoughtList=this;
  alreadyBoughtList.emptyMessage="Nothing bought yet.";
  alreadyBoughtList.items=ShoppingListCheckOffService.getAlreadyBoughtItems();
};

function ShoppingListCheckOffService(){
  var service=this;
  var toBuyItems = [
    {quantity: "2", name: "watermelon"},
    {quantity: "5", name: "orange"},
    {quantity: "4", name: "banana"},
    {quantity: "6", name: "pear"},
    {quantity: "7", name: "grape"}
  ];

  var alreadyBoughtItems=[];

  service.getToBuyItems = function(){
    return toBuyItems;
  };

  service.getAlreadyBoughtItems = function(){
    return alreadyBoughtItems;
  };

  service.moveItems = function(index){
    alreadyBoughtItems.push(toBuyItems[index]);
    toBuyItems.splice( index, 1 );
  };

  service.countItems = function(list){
    return list.length;
  };
};



})();
