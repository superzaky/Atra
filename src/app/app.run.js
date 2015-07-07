(function () {
    'use strict';

    var app = angular.module('app');

    function run ($rootScope, $state, $stateParams, Auth) {
        var privateStates = [
            'settings',
            'chat',
            'projects.add',
            'projects.edit'
        ];

        Auth.getCurrentSession()
        .then(function (response) {
            $rootScope.session = response.data;
        }, function (error) {
            $rootScope.session = null;
        }).then(function () {
            if (!$rootScope.session && _.contains(privateStates, $rootScope.toState.name)) {
                $state.go('home');
            }
        });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.toState = toState;
            $rootScope.fromState = fromState;
            $rootScope.toParams = toParams;
            $rootScope.fromParams = fromParams;
        });
    }

    app.run(['$rootScope', '$state', '$stateParams', 'Auth', run]);
})();
