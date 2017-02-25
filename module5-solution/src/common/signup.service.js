(function () {
"use strict";

angular.module('common')
.service('SignupService', SignupService);


//SignupService.$inject = [];
function SignupService() {
  var service = this;
  var test  = "this is test";
  var user = { isRegistered: false,
              user: {}
            };

  //registers new user after validation
  service.register = function (first, last, mail, phone, favourite) {
      console.log("registering...");
      user.isRegistered = true;
      user.user = { first: first,
                    last: last,
                    mail: mail,
                    phone: phone,
                    favourite: favourite
      };
      console.log(user.user);
  };

 //gets user previously validated/registered
  service.getUser = function () {
    //console.log("test" & test);
    //console.log("in service" & user);
    // user.user = { first: "a",
    //               last: "a",
    //               email: "a",
    //               phone: "a",
    //               favourite: "a"
    // };
    return user;

  };

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

}



})();
