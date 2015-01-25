/*global ticketApp */
/*global console */

var userController = ticketApp.controller('UserController', ['$filter', '$scope', 'User', '$rootScope', '$location', 'LxDialogService', 'LxNotificationService', 'Company',
    function ($filter, $scope, User, $rootScope, $location, LxDialogService, LxNotificationService, Company) {
        'use strict';
        $scope.users = [];
        var dialogMsg;

        $scope.user = {
            firstName: null,
            lastName: null,
            email: null,
            company: null,
            id: null
        };

        $scope.addUser = function () {

            console.log('addUser() called');

            if (!$scope.user.firstName || !$scope.user.lastName || !$scope.user.email || !$scope.user.company) {
                // TODO something required is missing
                console.log('Missing field');
                return false;
            }

            delete $scope.user.id;


            // User.save($scope.user, function (data) {
            //         function (data) {
            //   console.log('Error!');
            //     console.dir(data);
            //    });
            var found = ($scope.companyNames.indexOf($scope.user.company) > -1);
            if (!found) {
                dialogMsg = 'Warning new company selected. This must be created.';
                $scope.company.companyName = $scope.user.company;
                LxDialogService.open('company');
            } else {
                User.save($scope.user, function (data) {
                    console.log('User saved!');
                    delete $scope.user.firstName;
                    delete $scope.user.lastName;
                    delete $scope.user.email;
                    delete $scope.user.company;
                    console.dir(data);
                }, function (data) {
                    console.log('Error!');
                    console.dir(data);
                });
            }
        };

        $scope.removeUser = function (userId) {
            console.log('removeUser(' + userId + ') called');

            User.remove({
                userId: userId
            }, function (data) {
                console.log('User removed');

                $scope.users = $filter('filter')($scope.users, {
                    id: '!' + userId
                }, true);
            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });
        };

        $scope.updateUser = function (userId, index) {

            console.log('updateUser(' + userId + ') called');

            User.update({
                userId: userId
            }, $scope.users[index], function (data) {
                console.log('User updated');

            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });

        };

        $scope.updateUserProfile = function (userId) {

            console.log('updateUser(' + userId + ') called');

            User.update({
                userId: userId
            }, $scope.user, function (data) {
                console.log('User updated');

            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });

        };
        // Now call update passing in the ID first then the object you are updating
        $scope.getUser = function (userId) {
            console.log('Get user: ' + userId);
            $scope.user = User.get({
                userId: userId
            });
        };

        $scope.listUsers = function () {
            $scope.users = User.query();
        };

        $scope.refresh = function () {
            $window.location.reload();
        };

        $scope.getUserFromUrl = function () {
            var userId = $location.path().split("/")[2] || "Unknown";
            console.log('Get user: ' + userId);
            $scope.user = User.get({
                userId: userId
            });
        };

        $scope.closingDialog = function () {
            LxNotificationService.info(dialogMsg);
        };

        $scope.userCompanySave = function () {

            if (!$scope.company.companyName || !$scope.company.email || !$scope.company.location || !$scope.company.billing) {
                // TODO something required is missing
                console.log('Missing field');
                return false;
            }

            delete $scope.company.id;

            var found1 = ($scope.companyNames.indexOf($scope.company.companyName) > -1);
            if (!found1) {

                Company.save($scope.company, function (data) {
                    console.log('Company saved!');
                    console.dir(data);
                }, function (data) {
                    console.log('Error!');
                    console.dir(data);
                });

                User.save($scope.user, function (data) {
                    console.log('User saved!');
                    dialogMsg = 'Company ' + $scope.company.companyName + ' has been created. ' +
                        $scope.user.firstName + $scope.user.lastName + ' has been created.';
                    delete $scope.user.firstName;
                    delete $scope.user.lastName;
                    delete $scope.user.email;
                    delete $scope.user.company;
                    delete $scope.company.companyName;
                    delete $scope.company.email;
                    delete $scope.company.location;
                    delete $scope.company.billing;
                    LxDialogService.close('company');
                    console.dir(data);
                    console.log(dialogMsg)
                }, function (data) {
                    console.log('Error!');
                    console.dir(data);
                });
            } else {
                LxNotificationService.info($scope.company.companyName + ' already exists');
            }

        };
    }]);
