(function () {
    'use strict';

    var project = angular.module('project');

    function router ($stateProvider) {
        $stateProvider.state('projects', {
            url: '/projects',
            templateUrl: '/app/project/project.list.html',
            controller: 'ProjectCtrl',
            resolve: {
                projects: function (Project) {
                    return Project.list();
                }
            }
        });

        $stateProvider.state('projects.add', {
            url: '/add',
            controller: 'ProjectCtrl'
        });

        $stateProvider.state('projects.edit', {
            url: '/edit/:_id',
            controller: 'ProjectCtrl'
        });
    }

    project.config(['$stateProvider', router]);
})();
