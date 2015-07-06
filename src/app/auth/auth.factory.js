(function () {
    'use strict';

    var auth = angular.module('auth');

    function Auth ($http) {
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

    auth.factory('Auth', ['$http', Auth]);
})();
