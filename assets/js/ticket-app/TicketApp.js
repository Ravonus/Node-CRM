/*global angular */

var TicketApp = angular.module('TicketApp', ['ngResource', 'xeditable']);

TicketApp.run(function (editableOptions) {
    'use strict';
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});