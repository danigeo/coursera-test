(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['getMenuItems', 'register','getOneMenuItem'];
function SignupController(getMenuItems, register, getOneMenuItem) {
  console.log("in SignupController");
    var signupCtrl = this;
    signupCtrl.isRegistered = false;
    signupCtrl.getMenuItems = getMenuItems;
    console.log(signupCtrl.getMenuItems);
    signupCtrl.register = register;



    signupCtrl.submitForm = function (isValid) {
        if (isValid) {  // form validation
            signupCtrl.isRegistered = true;
            register(signupCtrl.First, signupCtrl.Last, signupCtrl.Email, signupCtrl.Phone, signupCtrl.Favourite);
        }
        else
        {
          throw "not valid user";
        }
      };
    }
})();
