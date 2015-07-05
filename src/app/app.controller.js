(function () {
    'use strict';

    var app = angular.module('app');

    function AppCtrl ($scope) {
        $scope.app = {
            title: 'Project Atra',
            config: {
                language: 'en-US',
                colors: {}
            }
        };

        $scope.$watch('app', function(newVal, oldVal) {
            // do stuff if app property changes
        }, true);
    }

    app.controller('AppCtrl', ['$scope', AppCtrl]);
})();
