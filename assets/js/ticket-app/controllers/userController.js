/*global ticketApp */
/*global console */

var userController = ticketApp.controller('UserController', ['$filter', '$scope', 'User', function ($filter, $scope, User) {
        'use strict';

        $scope.users = [];


        $scope.user = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            repeatPassword: null,
            id: null,
        };

        $scope.addUser = function () {

            console.log('addUser() called');

            if (!$scope.user.firstName || !$scope.user.lastName ||
                !$scope.user.email || !$scope.user.password || !$scope.user.repeatPassword) {
                // TODO something required is missing
                console.log('Missing field');
                return false;
            } else if ($scope.user.password !== $scope.user.repeatPassword) {
                // TODO the passwords don't match
                console.log('Passwords don\'t match');
                return false;
            }

            delete $scope.user.id;
            delete $scope.user.repeatPassword;

            User.save($scope.user, function (data) {
                console.log('User saved!');
                console.dir(data);
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

            Users.update({
                userId: userId,
            }, $scope.users[index] , function (data) {
                console.log('User updated');

            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });

        };

        // Now call update passing in the ID first then the object you are updating



        $scope.getUser = function (userId) {
            console.log('Get user: ' + userId);
            $scope.user = User.get({userId: userId});
        };

        $scope.listUsers = function () {
            $scope.users = User.query();
        };
        

}]);