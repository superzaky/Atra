(function () {
    'use strict';

    var session = angular.module('session');

    function Auth ($http, $q) {
        return {
            login: function (email, password) {
                return $http.post('/api/login', { 
                    email: email,
                    password: password
                });
            },

            logout: function () {
                return $http.get('/api/logout');
            },

            getCurrentSession: function () {
                return $http.get('/api/sessions/me');
            }
        };
    }

    session.factory('Auth', ['$http', '$q', Auth]);
})();
