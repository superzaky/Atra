(function () {
    'use strict';

    var app = angular.module('app');

    function filter ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    }

    app.filter('trustHtml', ['$sce', filter]);
})();
