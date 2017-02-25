(function () {
    "use strict";
    angular.module('public')
        .controller('MyinfoController', MyinfoController);

    MyinfoController.$inject = ['getUser','getOneMenuItem'];
    function MyinfoController(getUser,getOneMenuItem ) {

        console.log("myinfocontroller");

        var myinfoCtrl = this;
        myinfoCtrl.getUser = getUser;
        console.log(myinfoCtrl.getUser);

        if (myinfoCtrl.getUser.isRegistered) {
            console.log("registered user");
            console.log(myinfoCtrl.getUser.user.favourite);
            getOneMenuItem(myinfoCtrl.getUser.user.favourite).then(function (menuItem) {
                myinfoCtrl.favourite = menuItem;
            });
        }
        else {
          console.log("undefined, no user");
        }
    }
})();
