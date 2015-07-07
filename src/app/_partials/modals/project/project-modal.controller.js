(function () {
    'use strict';

    var modals = angular.module('modals');

    function ProjectModalCtrl ($scope, $modalInstance, Project, toastr, currentProject) {
        $scope.instance = {
            form: {
                project: currentProject
            },

            modal: {
                close: function () {
                    $modalInstance.dismiss('cancel');
                }
            },

            Project: {
                add: function () {
                    var project = angular.copy($scope.instance.form.project);

                    Project.save(project).$promise.then(function (response) {
                        $modalInstance.close(angular.fromJson(angular.toJson(response)));
                        toastr.success('Project has successfully been added', 'Success');
                    }, function (error) {
                        toastr.error(error.data, 'Error code ' + error.status);
                    });
                },

                edit: function () {
                    Project.save({_id: currentProject._id}, $scope.instance.form.project)
                    .$promise.then(function (response) {
                        $modalInstance.close(angular.fromJson(angular.toJson(response)));
                        toastr.success('Project has successfully been modified', 'Success');
                    }, function (error) {
                        toastr.error(error.data, 'Error code ' + error.status);
                    });
                }
            }
        };
    }

    modals.controller('ProjectModalCtrl', ['$scope', '$modalInstance', 'Project', 'toastr', 'currentProject', ProjectModalCtrl]);
})();
