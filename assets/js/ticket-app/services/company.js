/*global angular */

var company = ticketApp.factory('Company', ['$resource', function ($resource){
    'use strict';
    
    return $resource('companies/:userId', {}, {
                     
    });
}]);