/*global angular */

var Companies = TicketApp.factory('Companies', ['$resource', function ($resource){
    'use strict';
    
    return $resource('companies/:userId', {}, {
                     
    });
}]);