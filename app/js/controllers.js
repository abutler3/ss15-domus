'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('LoginController', ['$scope', '$location', function($scope, $location) {
    $scope.name = 'Drew';

    $scope.login = function() {
      $location.path('/meetings');
    }
  }])
  .controller('RegisterController', ['$scope', '$location', function($scope, $location) {
    $scope.name = 'Andrew';
    $scope.register = function() {
      $location.path('/meetings');
    }
  }])
  .controller('MeetingsController', ['$scope', function($scope) {
    $scope.name = 'Tiny';
  }]);
