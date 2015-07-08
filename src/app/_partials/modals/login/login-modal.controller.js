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
                    Auth.api.login($scope.instance.form.user.email, $scope.instance.form.user.password)
                    .then(function (response) {
                        $rootScope.session = Auth.current.instance = response.data;
                        toastr.success('You have successfully signed in', 'Hi ' + response.data.user.first_name + ' ' + response.data.user.last_name);
                        $modalInstance.close();
                    }, function (error) {
                        toastr.error(error.data, 'Error code ' + error.status);
                    });
                }
            }
        } 
    }

    modals.controller('LoginModalCtrl', ['$rootScope', '$scope', '$modalInstance', 'Auth', 'toastr', LoginModalCtrl]);
})();
