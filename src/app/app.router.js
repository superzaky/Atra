(function () {
    'use strict';

    var app = angular.module('app');

    function router ($urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        $urlRouterProvider.otherwise('home');
    }

    app.config(['$urlRouterProvider', '$locationProvider', router]);
})();
