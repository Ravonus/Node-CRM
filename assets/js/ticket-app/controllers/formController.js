/*global ticketApp */

var formController = ticketApp.controller('FormController', ['$filter', '$scope', 'Form', function ($filter, $scope, Form) {
        'use strict';

        $scope.forms = [];


        $scope.form = {
            formName: null,
            members: null,
            roll: null,
            type: null,
            id: null
        };

        $scope.addForm = function () {

            console.log('addForm() called');

            if (!$scope.form.formName || !$scope.form.email ||
                !$scope.form.location || !$scope.form.billing) {
                // TODO something required is missing
                console.log('Missing field');
                return false;
            }

            delete $scope.form.id;

            Form.save($scope.form, function (data) {
                console.log('Form saved!');
                console.dir(data);
            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });
        };

            $scope.removeForm = function (userId) {
                console.log('removeForm(' + userId + ') called');

                Form.remove({
                    userId: userId
                }, function (data) {
                    console.log('Form removed');

                    $scope.forms = $filter('filter')($scope.forms, {
                        id: '!' + userId
                    }, true);
                }, function (data) {
                    console.log('Error!');
                    console.dir(data);
                });
            };
                                                                   

        $scope.updateForm = function () {

        };

        $scope.getForm = function () {

        };

        $scope.listForms = function () {
            $scope.forms = Form.query();
        };

}]);