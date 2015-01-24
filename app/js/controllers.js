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
  .controller('MeetingsController', ['$scope', '$firebase', function($scope, $firebase) {
    $scope.name = 'Tiny';
    var ref = new Firebase('https://domusstatic.firebaseio.com/meetings');
    var meetings = $firebase(ref);
    $scope.meetings = meetings.$asObject();

    $scope.addMeeting = function() {
      meetings.$push({
        name: $scope.meetingname,
        date: Firebase.ServerValue.TIMESTAMP,
        detail: $scope.meetingdetail
      }).then(function() {
        $scope.meetingname = '';
        $scope.meetingdetail = '';
      });
    }

    $scope.removeMeeting = function(key) {
        meetings.$remove(key);
    }
  }]);
