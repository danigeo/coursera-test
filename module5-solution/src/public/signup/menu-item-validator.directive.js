(function () {

    angular.module('public').directive('menuItemValidator', ['MenuService', '$http', '$q', menuItemValidator]);

    function menuItemValidator(MenuService, $http, $q) {

      console.log("in menuItemValidator");

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModel) {
                ngModel.$asyncValidators.asyncValidator = function (modelValue, value) {

                  console.log("in asyncValidator" & value & " / " & modelValue);

                    return MenuService.getOneMenuItem(value).then(

                        function (data) {
                          console.log("data:" & data & " value:" & value);
                            return true;
                        }
                    );
                }
            }
        }
    }
})();
