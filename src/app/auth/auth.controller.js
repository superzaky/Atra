(function () {
    'use strict';

    var auth = angular.module('auth');

    function AuthCtrl ($rootScope, $scope, $state, $modal, Auth, toastr) {
        $scope.Auth = {
            logout: function () {
                Auth.api.logout()
                .then(function (response) {
                    $state.go('home');
                    $rootScope.session = Auth.current.instance = null;
                    toastr.success('You have successfully signed off', 'Success');
                });
            },

            modal: {
                open: function () {
                    $modal.open({
                        animation: false,
                        templateUrl: '/app/_partials/modals/login/login-modal.html',
                        controller: 'LoginModalCtrl'
                    });
                }
            }
        }
    }

    auth.controller('AuthCtrl', ['$rootScope', '$scope', '$state', '$modal', 'Auth', 'toastr', AuthCtrl]);
})();
