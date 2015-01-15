/*global angular */

var ticketApp = angular.module('ticketApp', ['ngResource', 'xeditable']);

ticketApp.run(function (editableOptions) {
    'use strict';
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});