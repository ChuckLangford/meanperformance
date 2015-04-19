'use strict';

var app = angular.module('meanperformance', [])
  .controller('AppController',
    function AppController($scope) {
      $scope.greeting = 'Welcome!';
    });
