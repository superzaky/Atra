(function () {
    'use strict';

    var auth = angular.module('auth');

    function AuthCtrl ($rootScope, $scope, $state, $modal, Auth, toastr) {
        $scope.Auth = {
            login: function () {
                Auth.login($scope.Auth.email, $scope.Auth.password)
                .then(function (response) {
                    $rootScope.session = response.data;
                    toastr.success('You have successfully signed in', 'Success');
                });
            },

            logout: function () {
                Auth.logout()
                .then(function (response) {
                    $state.go('home');
                    $rootScope.session = null;
                    toastr.success('You have successfully signed off', 'Success');
                });
            },

            modal: {
                open: function (size) {
                    $modal.open({
                        animation: false,
                        templateUrl: '/app/_partials/modals/login/login-modal.html',
                        controller: 'LoginModalCtrl',
                        size: size
                    });
                }
            }
        }
    }

    auth.controller('AuthCtrl', ['$rootScope', '$scope', '$state', '$modal', 'Auth', 'toastr', AuthCtrl]);
})();
