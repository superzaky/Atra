(function () {
    'use strict';

    var app = angular.module('app');

    function run ($rootScope, $state, $stateParams, Auth) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        var privateStates = [
            'settings',
            'chat',
            'projects.add',
            'projects.edit'
        ];

        Auth.api.getMySession()
        .then(function (response) {
            $rootScope.session = Auth.current.instance = response.data;
        }, function (error) {
            $rootScope.session = Auth.current.instance = null;
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
