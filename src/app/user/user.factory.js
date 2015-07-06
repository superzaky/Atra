(function () {
    'use strict';

    var user = angular.module('user');

    function User ($resource) {
        return $resource('/api/users/:_id', {_id: '@_id'}, {
            list: {url: '/api/users', method: 'GET', isArray: true}
        });
    }

    user.factory('User', ['$resource', User]);
})();
