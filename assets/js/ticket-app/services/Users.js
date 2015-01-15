/*global angular */

var Users = TicketApp.factory('Users', ['$resource', function ($resource){
    'use strict';
    
return $resource('users/:userId', {}, {
        'update': { method:'PUT' }
    });
}]);
