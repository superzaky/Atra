(function () {
    'use strict';

    var project = angular.module('project');

    function ProjectCtrl ($rootScope, $scope, $state, $modal, toastr, Project, projects) {
        projects.$promise.then(function (response) {
            $scope.projects = angular.fromJson(angular.toJson(response));

            $rootScope.$watch('toState', function (state) {
                if (state.name === 'projects.add') {
                    $modal.open({
                        animation: false,
                        templateUrl: '/app/_partials/modals/project/project-add-modal.html',
                        controller: 'ProjectModalCtrl',
                        resolve: { currentProject: function () { return null; }}
                    })
                    .result.then(function (response) { $scope.projects.unshift(response); })
                    .finally(function() { $state.go('^'); });
                } else if (state.name === 'projects.edit') {
                    $modal.open({
                        animation: false,
                        templateUrl: '/app/_partials/modals/project/project-edit-modal.html',
                        controller: 'ProjectModalCtrl',
                        resolve: { currentProject: function () { return angular.copy(_.findWhere($scope.projects, {_id: $state.params._id})); }}
                    })
                    .result.then(function (response) {
                        $scope.projects = _.each($scope.projects, function (project) {
                            if (project._id === response._id) angular.extend(project, response);
                        });
                    })
                    .finally(function() { $state.go('^'); });
                }
            });
        });

        $scope.Project = {
            remove: function (_id) {
                Project.delete({_id : _id}).$promise.then(function (response) {
                    toastr.success('Project has successfully been deleted', 'Success');
                    $scope.projects = _.reject($scope.projects, function (project) {
                        return project._id === _id;
                    });
                });
            }
        };
    }

    project.controller('ProjectCtrl', ['$rootScope', '$scope', '$state', '$modal', 'toastr', 'Project', 'projects', ProjectCtrl]);
})();
