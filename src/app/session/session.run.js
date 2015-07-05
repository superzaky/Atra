(function () {
    'use strict';

    var session = angular.module('session');

    function run ($rootScope, Auth) {
        Auth.getCurrentSession().then(function (response) {
            if (typeof response === 'object') {
                $rootScope.session = response.data;
            } else {
                $rootScope.session = null;
            }
        });
    }

    session.run(['$rootScope', 'Auth', run]);
})();
