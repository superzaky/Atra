(function () {
    'use strict';

    var project = angular.module('project');

    function Project ($resource) {
        return $resource('/api/projects/:_id', {_id: '@_id'}, {
            list: {url: '/api/projects', method: 'GET', isArray: true}
        });
    }

    project.factory('Project', ['$resource', Project]);
})();
