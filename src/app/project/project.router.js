(function () {
    'use strict';

    var project = angular.module('project');

    function router ($stateProvider) {
        $stateProvider.state('projects', {
            url: '/projects',
            templateUrl: '/app/project/project.list.html',
            controller: 'ProjectCtrl',
            resolve: {
                projects: ['Project', function (Project) {
                    return Project.api.list().$promise;
                }]
            }
        });

        $stateProvider.state('projects.add', {
            url: '/add',
            controller: 'ProjectCtrl',
            onEnter: ['$state', '$modal', function ($state, $modal) {
                var modal = $modal.open({
                    animation: false,
                    templateUrl: '/app/_partials/modals/project/project-add-modal.html',
                    controller: 'ProjectModalCtrl',
                    size: 'lg'
                })
                .result.finally(function() {
                    $state.go('^');
                    modal.dismiss('cancel');
                });
            }]
        });

        $stateProvider.state('projects.edit', {
            url: '/edit/:_id',
            controller: 'ProjectCtrl',
            onEnter: ['$state', '$modal', function ($state, $modal) {
                var modal = $modal.open({
                    animation: false,
                    templateUrl: '/app/_partials/modals/project/project-edit-modal.html',
                    controller: 'ProjectModalCtrl',
                    size: 'lg'
                })
                .result.finally(function() {
                    $state.go('^');
                    modal.dismiss('cancel');
                });
            }]
        });
    }

    project.config(['$stateProvider', router]);
})();
