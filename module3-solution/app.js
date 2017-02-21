(function () {
  'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath',"https://davids-restaurant.herokuapp.com")
//.factory('FoundItemsFactory', FoundItemsFactory)
.directive('foundItems', FoundItemsDirective);
//.directive('FoundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      machedItems: '<',
      onRemove: '&',
      title: '@title'
    },
    controller: NarrowItDownController,
    controllerAs: 'narrow',
    bindToController: true
  };

  return ddo;
}

// NarrowItDownController.$inject = ['FoundItemsFactory'];
// function NarrowItDownController(FoundItemsFactory) {
//   var list = this;
//
//   // Use factory to create new shopping list service
//   var foundItems = FoundItemsFactory();
//
//   list.items = shoppingList.getItems();
//   var origTitle = "Shopping List #1";
//   list.title = origTitle + " (" + list.items.length + " items )";
//
//   list.removeItem = function (itemIndex) {
//     console.log("'this' is: ", this);
//     this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
//     shoppingList.removeItem(itemIndex);
//     this.title = origTitle + " (" + list.items.length + " items )";
//   };
// }

NarrowItDownController.$inject = ['MenuSearchService']
function NarrowItDownController(MenuSearchService) {

 var narrow = this;

 narrow.removeItem = function (itemIndex) {
   //console.log("on remove",itemIndex);
   narrow.machedItems.splice(itemIndex, 1);
 };

 narrow.getMatchedMenuItems = function (searchTerm) {

      if (typeof searchTerm === "undefined"  || searchTerm === "")
      {
        //console.log("no text");
        narrow.message='Nothing found';
        narrow.title='Nothing found';
      }
      else
      {
        //searchTerm = "sesame";
        var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
        //console.log("ok");
        promise.then(function (response) {
          //console.log(response.data);

          var allFoundItems=response.data;
          var machedItems = [];

          for (var i = 0; i < allFoundItems.menu_items.length; i++) {
            var string = allFoundItems.menu_items[i].description;
            var substring = searchTerm;

            if (string.indexOf(substring) !== -1)
            {
              machedItems.push(allFoundItems.menu_items[i]);
            };
          }
          //console.log(machedItems.length);
          if (machedItems.length==0)
          {
            narrow.message='Nothing found';
            narrow.title='Nothing found';
          }else{
            narrow.message='';
            narrow.title='';

          };
          narrow.machedItems=machedItems;

        })
        .catch(function (error) {
          console.log(error);
        })
      }

 };

};

MenuSearchService.$inject=['$http','ApiBasePath']
function MenuSearchService($http,ApiBasePath){
  var service=this;

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };

  service.getMatchedMenuItems_NotWorking = function(searchTerm){
    //return list.length;

    //https://davids-restaurant.herokuapp.com/menu_items.json
    //return $http({
    $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
    .then(
    function success(response) {
        //console.log(response.data);
        // process result and only keep items that match
        //$scope.message=response.data;
        var foundItems=response.data;
        var machedItems = [];

        for (var i = 0; i < foundItems.menu_items.length; i++) {
          var string = foundItems.menu_items[i].description;
          var substring = searchTerm;
          //console.log(substring);
          if (string.indexOf(substring) !== -1)
          {
            machedItems.push(foundItems.menu_items[i].description);
            //console.log("REMOVE" + string)
            //foundItems.menu_items.splice(i, 1);
          };
          //alert(foundItems.menu_items[i].description);
        }
        console.log(machedItems);

        // return processed items
        return machedItems;
    },
    function error(response){
      console.log("Something went wrong");
      return "Something went wrong";
    });

  };


};

})();
