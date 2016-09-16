(function () {
  'use strict';

angular.module('LunchCheck',[])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {

$scope.message = "";
$scope.items="";
$scope.show = function(){

  if ($scope.items == ""){
    $scope.message='Please enter data first';
  }
  else{
    var numberOfItems = countItems($scope.items);
    if (numberOfItems < 4)
    {
      $scope.message='Enjoy!';
    }
    else if (numberOfItems>3)
    {
      $scope.message='Too much!';
    }
  }
};

function countItems(stringToSplit){
  var arrayOfItems = stringToSplit.split(",");
  return arrayOfItems.length;
}

}

})();
