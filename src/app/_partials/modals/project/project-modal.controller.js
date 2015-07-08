(function () {
    'use strict';

    var modals = angular.module('modals');

    function ProjectModalCtrl ($scope, $state, $modalInstance, Project, toastr) {
        Project.current.instance = _.findWhere(Project.current.list, {_id: $state.params._id});

        $scope.instance = {
            modal: {
                close: function () {
                    $modalInstance.dismiss('cancel');
                }
            },

            form: {
                project: angular.copy(Project.current.instance)
            },

            Project: {
                add: function () {
                    Project.api.save($scope.instance.form.project).$promise
                    .then(function (response) {
                        Project.current.list.unshift(response);
                        toastr.success('Project has successfully been added', 'Success');
                    }, function (error) {
                        toastr.error(error.data, 'Error code ' + error.status);
                    })
                    .finally(function (response) {
                        $modalInstance.close();
                    });
                },

                edit: function () {
                    $scope.instance.form.project.$save()
                    .then(function (response) {
                        angular.extend(Project.current.instance, $scope.instance.form.project);
                        toastr.success('Project has successfully been modified', 'Success');
                    }, function (error) {
                        toastr.error(error.data, 'Error code ' + error.status);
                    })
                    .finally(function (response) {
                        $modalInstance.close();
                    });
                }
            }
        };
    }

    modals.controller('ProjectModalCtrl', ['$scope', '$state', '$modalInstance', 'Project', 'toastr', ProjectModalCtrl]);
})();
