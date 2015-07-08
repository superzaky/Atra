(function () {
    'use strict';

    var app = angular.module('app');

    function AppCtrl ($rootScope, $scope) {
        $scope.app = {
            title: 'Project Atra',
            config: {
                language: 'en-US',
                colors: {}
            }
        };
    }

    app.controller('AppCtrl', ['$rootScope', '$scope', AppCtrl]);
})();
