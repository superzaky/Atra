(function () {
    'use strict';

    var modals = angular.module('modals');

    function LoginModalCtrl ($rootScope, $scope, $modalInstance, Auth, toastr) {
        $scope.instance = {
            modal: {
                close: function () {
                    $modalInstance.dismiss('cancel');
                }
            },

            Auth: {
                login: function () {
                    Auth.login($scope.instance.form.user.email, $scope.instance.form.user.password)
                    .then(function (response) {
                        $rootScope.session = response.data;
                        $modalInstance.close();
                        toastr.success('You have successfully signed in', 'Success');
                    }, function (error) {
                        toastr.error(error.data, 'Error code ' + error.status);
                    });
                }
            }
        } 
    }

    modals.controller('LoginModalCtrl', ['$rootScope', '$scope', '$modalInstance', 'Auth', 'toastr', LoginModalCtrl]);
})();
