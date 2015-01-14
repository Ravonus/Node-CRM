/*global TicketApp */

var CompanyCtrl = TicketApp.controller('CompaniesCtrl', ['$scope', 'Companies', function ($scope, Companies) {
    'use strict';
    
    
    $scope.companies = [];
    
    
    
    $scope.company = {
        companyName: null,
        location: null,
        email: null,
        billing: null,
        id: null
    };
    
    $scope.addCompany = function () {
    };
    
    $scope.removeCompany = function () {
        
    };
    
    $scope.updateCompany = function () {
        
    };
    
    $scope.getCompany = function () {
        
    };
    
    $scope.listCompanies = function () {
        $scope.companies = Companies.query();
        
    };
    
}]);