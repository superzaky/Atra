(function () {
    'use strict';

    var settings = angular.module('settings');

    function SettingsCtrl ($rootScope, $scope, toastr, User) {
        $scope.settings = {
            form: {
                user: angular.copy($rootScope.session.user)
            },

            user: {
                save: function () {
                    User.api.save($scope.settings.form.user).$promise
                    .then(function (response) {
                        $rootScope.session.user = response;
                        toastr.success('You have successfully updated your settings', 'Success');
                    }, function (error) {
                        toastr.error(error.data, 'Error code ' + error.status);
                    });
                }
            }
        };
    }

    settings.controller('SettingsCtrl', ['$rootScope', '$scope', 'toastr', 'User', SettingsCtrl]);
})();
