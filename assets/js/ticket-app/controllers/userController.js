/*global ticketApp */
/*global console */
var userController = ticketApp.controller('UserController', ['$filter', '$scope', '$window', 'User', '$rootScope', '$location', 'LxDialogService', 'LxNotificationService', 'Company', '$http', '$log',
        function ($filter, $scope, $window, User, $rootScope, $location, LxDialogService, LxNotificationService, Company, $http, $log) {
        'use strict';
        $scope.users = [];
        var dialogMsg, dialogIcon, dialogType, upload, findByName, companyName, upload2, companyName2;
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
            // function (data) {
            // console.log('Error!');
            // console.dir(data);
            // });
            var found = ($scope.companyNames.indexOf($scope.user.company) > -1);
            if (!found) {
                dialogMsg = 'Warning new company selected. This must be created.';
                dialogType = 'warning';
                $scope.company.companyName = $scope.user.company;
                LxDialogService.open('company');
            } else {
                $scope.companyName = [];
                $http.get('/company/name/' + $scope.user.company)
                    .success(function (data) {
                        $scope.companyName = data;
                        console.dir($scope.companyName.id);

                        upload2 = angular.copy($scope.user);
                        upload2.company = $scope.companyName.id;
                        User.save(upload2, function () {
                                console.log('User saved!');
                                console.dir(upload2);
                            },
                            function (upload2) {
                                console.log(upload2);
                                // console.dir(companyName.id);
                            });
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

        $scope.updateUser = function (index, data) {

            console.log('updateUser(' + userId + ') called');

            User.get({
                    userId: userId
                },

                $scope.users[index],
                function (data) {
                    $scope.companyName2 = data.company.companyName;
                    //console.log($scope.users.firstName)


                    $scope.companyName = [];
                    $http.get('/company/name/' + data.company.companyName)
                        .success(function (data2) {
                            $scope.companyName = data2;
                            console.dir($scope.companyName.id);

                            upload2 = {
                                firstName: data.firstName,
                                lastName: data.lastName,
                                email: data.email,
                                company: $scope.companyName.id,
                                userId: null
                            };
                            upload2.company = $scope.companyName.id;

                            User.update({
                                    userId: userId
                                }, upload2, function (upload2) {
                                    console.log('User saved!ers');
                                    //  console.dir(upload2);
                                },
                                function (upload2) {
                                    console.log(upload2);
                                    // console.dir(companyName.id);
                                });
                        });


                },
                function (data) {
                    //console.log($scope.users.firstName)
                });
        };

        $scope.updateUserProfile = function (userId) {
            console.log('updateUser(' + userId + ') called');
            User.update({
                    userId: userId
                },
                $scope.user,
                function (data) {
                    console.log('User updated');
                },
                function (data) {
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
            if (dialogType === 'warning') {
                LxNotificationService.warning(dialogMsg);
            } else if (dialogType === 'success') {
                LxNotificationService.success(dialogMsg);
            } else if (dialogType === 'error') {
                LxNotificationService.error(dialogMsg);
            }
        };
        $scope.userCompanySave = function () {
            if (!$scope.company.companyName || !$scope.company.email || !$scope.company.location || !$scope.company.billing) {
                // TODO something required is missing
                LxNotificationService.warning('missing a field');
                console.log('Missing field');
                return false;
            }
            delete $scope.company.id;
            var found1 = ($scope.companyNames.indexOf($scope.company.companyName) > -1);
            if (!found1) {
                Company.save($scope.company, function (data) {
                    $scope.user.company = data.id;
                    upload = {
                        firstName: $scope.user.firstName,
                        lastName: $scope.user.lastName,
                        email: $scope.user.email,
                        company: $scope.user.company,
                        id: null
                    };
                    User.save(upload, function () {
                        // console.log('ADDED' + data);
                        dialogMsg = 'Company ' + $scope.company.companyName + ' has been created.' + $scope.user.firstName + ' ' + $scope.user.lastName + ' has been created.';
                        // dialogIcon = 'success'
                        $scope.user = {};
                        $scope.company = {};
                        dialogType = 'success';
                        LxDialogService.close('company');
                        // console.dir(data);
                        // console.log(dialogMsg)
                    }, function (err) {
                        console.log('Error!');
                        console.dir(err);
                    });
                });
            } else {
                LxNotificationService.error($scope.company.companyName + ' already exists');
            }
        };
        /*// console.log(data.id);
        // console.dir(upload);
        },
        function (data) {
        console.log('Error!');
        console.dir(data);
        });*/





        }]);
