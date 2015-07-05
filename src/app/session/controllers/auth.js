(function () {
    'use strict';

    var session = angular.module('session');

    function AuthCtrl ($rootScope, $scope, Auth) {
        $scope.Auth = {
            login: function () {
                Auth.login($scope.email, $scope.password).then(function (response) {
                    $rootScope.session = response.data;
                    $('#login-modal').modal('hide'); // TODO: don't use jquery, use angular-bootstrap modals
                });
            },

            logout: function () {
                Auth.logout().then(function (response) {
                    $rootScope.session = null;
                });;
            }
        }
    }

    session.controller('AuthCtrl', ['$rootScope', '$scope', 'Auth', AuthCtrl]);
})();
