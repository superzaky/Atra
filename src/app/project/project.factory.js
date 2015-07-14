(function () {
    'use strict';

    var project = angular.module('project');

    function Project ($resource) {
        return {
            api: $resource('/api/projects/:_id', {_id: '@_id'}, {
                list: {url: '/api/projects', method: 'GET', isArray: true},

                vote: function (_id) {
                    return $http.post('/api/projects', {
                        _id: _id
                    });
                },

                lol: function (_id) {
                    return $http.post('/api/projects', {
                        _id: _id,
                        isArray: true
                    });
                },
            }),

            current: {
                list: [],
                instance: null
            }
        }
    }

    project.factory('Project', ['$resource', Project]);
})();
