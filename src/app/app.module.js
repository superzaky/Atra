(function () {
    'use strict';

    var app = angular.module('app', [
        'ui.router',
        'ngSanitize',
        'modals',
        'home',
        'settings',
        'auth',
        'user',
        'project',
        'ngAnimate',
        'angular-loading-bar'
    ]);
})();
