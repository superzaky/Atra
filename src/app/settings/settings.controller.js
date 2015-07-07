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
                    User.get({_id: $rootScope.session.user._id}, function (user) {
                        angular.extend(user, $scope.settings.form.user);

                        user.$save().then(function (response) {
                            toastr.success('You have successfully updated your settings', 'Success');
                            $rootScope.session.user = angular.fromJson(angular.toJson(response));
                            delete $rootScope.session.user.password;
                        }, function (error) {
                            toastr.error(error.data, 'Error code ' + error.status);
                        });
                    });
                }
            }
        };
    }

    settings.controller('SettingsCtrl', ['$rootScope', '$scope', 'toastr', 'User', SettingsCtrl]);
})();
