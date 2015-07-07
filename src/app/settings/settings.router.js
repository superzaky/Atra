(function () {
    'use strict';

    var settings = angular.module('settings');

    function router ($stateProvider) {
        $stateProvider.state('settings', {
            url: '/settings',
            templateUrl: '/app/settings/settings.html',
            controller: 'SettingsCtrl'
        });
    }

    settings.config(['$stateProvider', router]);
})();
