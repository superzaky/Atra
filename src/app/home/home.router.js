(function () {
    'use strict';

    var home = angular.module('home');

    function router ($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/app/home/home.html'
        });
    }

    home.config(['$stateProvider', router]);
})();
