(function () {
    'use strict';

    var app = angular.module('app');

    function run ($rootScope, $state, Auth) {
        var nextState = null;
        var privateStates = [
            'settings',
            'chat'
        ];

        Auth.getCurrentSession()
        .then(function (response) {
            $rootScope.session = response.data;
        }, function (error) {
            $rootScope.session = null;
        }).then(function () {
            if (!$rootScope.session && _.contains(privateStates, nextState)) {
                $state.go('home');
            }
        });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            nextState = toState.name;
        });
    }

    app.run(['$rootScope', '$state','Auth', run]);
})();
