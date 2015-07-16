(function () {
    'use strict';

    var project = angular.module('project');

    function Project ($resource) {
        return {
            api: $resource('/api/projects/:_id', {_id: '@_id'}, {
                list: {url: '/api/projects', method: 'GET', isArray: true},
                query: {url: '/api/projects', method:'POST', params:{_id:'_id'}, isArray:true},
            }),

            lol: $resource('/api/projects', {_id: '@_id'}, {
                query: {url: '/api/projects', method:'POST', params:{_id:'_id'}, isArray:true}
            }),

            current: {
                list: [],
                instance: null
            }
        }
    }

    project.factory('Project', ['$resource', Project]);
})();
