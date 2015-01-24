/*global ticketApp */
/*global console */

var userController = ticketApp.controller('UserController', ['$filter', '$scope', 'User', '$rootScope', '$location',
    function ($filter, $scope, User, $rootScope, $location, FormRet) {
        'use strict';

        $scope.users = [];

        $scope.user = {
            firstName: null,
            lastName: null,
            email: null,
            company: null,
            id: null
        };

        $scope.addUser = function () {

            console.log('addUser() called');

            if (!$scope.user.firstName || !$scope.user.lastName ||
                !$scope.user.email || !$scope.user.company) {
                // TODO something required is missing
                console.log('Missing field' + $scope.user.firstName);
                return false;
            }

            delete $scope.user.id;

            User.save($scope.user, function (data) {
                console.log('User saved!');
                console.dir(data);
                delete $scope.user.email;
                delete $scope.user.lastName;
                delete $scope.user.firstName;
                delete $scope.user.company;
            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });
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
                userId: userId,
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
                userId: userId,
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
}]);
