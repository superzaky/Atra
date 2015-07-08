(function () {
    'use strict';

    var auth = angular.module('auth');

    function Auth ($http) {
        return {
            api: {
                login: function (email, password) {
                    return $http.post('/api/login', {
                        email: email,
                        password: password
                    });
                },

                logout: function () {
                    return $http.get('/api/logout');
                },

                getMySession: function () {
                    return $http.get('/api/sessions/me');
                }
            },

            current: {
                instance: null
            }
        }
    }

    auth.factory('Auth', ['$http', Auth]);
})();
