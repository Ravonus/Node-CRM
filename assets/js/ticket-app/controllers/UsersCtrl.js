/*global TicketApp */
/*global console */

var UsersCtrl = TicketApp.controller('UsersCtrl', ['$filter', '$scope', 'Users',
    function ($filter, $scope, Users) {
        'use strict';

        $scope.users = [];


        $scope.user = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            repeatPassword: null,
            id: null,
            nickname: 'barney'
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

            Users.save($scope.user, function (data) {
                console.log('User saved!');
                console.dir(data);
            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });
        };




        $scope.removeUser = function (userId) {
            console.log('removeUser(' + userId + ') called');

            Users.remove({
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
            $scope.user = Users.get({userId: userId});
        };

        $scope.listUsers = function () {
            $scope.users = Users.query();
        };

}]);