(function () {
    'use strict';

    var project = angular.module('project');
    function ProjectCtrl ($rootScope, $scope, $state, $modal, toastr, Project, projects) {
        $scope.projects = Project.current.list = projects;

        $scope.Project = {
            remove: function (_id) {
                Project.api.delete({_id : _id}).$promise.then(function (response) {
                    toastr.success('Project has successfully been deleted', 'Success');
                    $scope.projects = _.reject($scope.projects, function (project) {
                        return project._id === _id;
                    });
                });
            },

            like: function (_id) {
                    Project.api.save({_id : _id, like : true}).$promise.then(function (response) {
                        toastr.success('Project has successfully been liked', 'Success');
                    });
            },

            dislike: function (_id) {
                    Project.api.save({_id : _id, like : false}).$promise.then(function (response) {
                        toastr.success('Project has successfully been disliked', 'Success');
                    });
            }
        };
    }

    project.controller('ProjectCtrl', ['$rootScope', '$scope', '$state', '$modal', 'toastr', 'Project', 'projects', ProjectCtrl]);
})();
