/*global ticketApp */
/*global console */

var formController = ticketApp.controller('FormController', ['$filter', '$scope', 'Form', '$rootScope', '$location',
    function ($filter, $scope, Form, $rootScope, $location) {
        'use strict';

        $scope.forms = [];


        $scope.form = {
            formName: null,
            owner: null,
            data: null,
            data2: null,
            id: null,
        };

        $scope.addForm = function () {

            console.log('addForm() called');

            if (!$scope.form.firstName || !$scope.form.lastName ||
                !$scope.form.email || !$scope.form.password || !$scope.form.repeatPassword) {
                // TODO something required is missing
                console.log('Missing field');
                return false;
            } else if ($scope.form.password !== $scope.form.repeatPassword) {
                // TODO the passwords don't match
                console.log('Passwords don\'t match');
                return false;
            }

            delete $scope.form.id;
            delete $scope.form.repeatPassword;

            Form.save($scope.form, function (data) {
                console.log('Form saved!');
                console.dir(data);
            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });
        };




        $scope.removeForm = function (formId) {
            console.log('removeForm(' + formId + ') called');

            Form.remove({
                formId: formId
            }, function (data) {
                console.log('Form removed');

                $scope.forms = $filter('filter')($scope.forms, {
                    id: '!' + formId
                }, true);
            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });
        };




        $scope.updateForm = function (formId, index) {

            console.log('updateForm(' + formId + ') called');

            Form.update({
                formId: formId,
            }, $scope.forms[index], function (data) {
                console.log('Form updated');

            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });

        };
      
        $scope.updateFormProfile = function (formId, form) {

            console.log('updateForm(' + formId + ') called');

            Form.update({
                formId: formId,
            }, $scope.forms[form], function (data) {
                console.log('Form updated');

            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });

        };
        // Now call update passing in the ID first then the object you are updating



        $scope.getForm = function (formId) {
            console.log('Get form: ' + formId);
            $scope.form = Form.get({
                formId: formId
            });
        };

        $scope.listForms = function () {
            $scope.forms = Form.query();
        };

        $scope.getFormFromUrl = function () {
            var formId = $location.path().split("/")[2] || "Unknown";
                        console.log('Get form: ' + formId);
            $scope.form = Form.get({
                formId: formId
            });
        };



}]);