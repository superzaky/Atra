(function () {
    'use strict';

    var user = angular.module('user');

    function User ($resource) {
        return {
            api: $resource('/api/users/:_id', {_id: '@_id'}, {
                list: {url: '/api/users', method: 'GET', isArray: true}
            }),

            current: {
                list: [],
                instance: null
            }
        }
    }

    user.factory('User', ['$resource', User]);
})();
