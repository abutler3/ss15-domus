'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('LoginController', ['$scope', '$firebaseSimpleLogin', '$location', '$rootScope', function($scope, $firebaseSimpleLogin, $location, $rootScope) {
    $scope.name = 'Drew';
    var ref = new Firebase('https://domusstatic.firebaseio.com/');
    var auth = $firebaseSimpleLogin(ref);
    $scope.user = { email: '', password: '' };

    $scope.login = function() {
      auth.$login('password', $scope.user).then(function(data) {
        console.log(data);
        $location.path('/meetings');
      });
    }

    $scope.logout = function() {
      auth.$logout();
    }

    $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
      $rootScope.currentUser = user;
    });

    $rootScope.$on("$firebaseSimpleLogin:logout", function() {
      $rootScope.currentUser = null;
    });
  }])
  .controller('RegisterController', ['$scope', '$firebaseSimpleLogin', '$location', '$rootScope', function($scope, $firebaseSimpleLogin, $location, $rootScope) {
    $scope.name = 'Andrew';
    var ref = new Firebase('https://domusstatic.firebaseio.com/');
    var auth = $firebaseSimpleLogin(ref);
    $scope.user = { email: '', password: '' };

    $scope.register = function() {
      auth.$createUser($scope.user.email, $scope.user.password).then(function(data) {
        console.log(data);
        auth.$login('password', $scope.user);
        $location.path('/meetings');
      });
    }

    $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
      $rootScope.currentUser = user;
    });

    $rootScope.$on("$firebaseSimpleLogin:logout", function() {
      $rootScope.currentUser = null;
    });

  }])
  .controller('MeetingsController', ['$scope', '$firebase', function($scope, $firebase) {
    $scope.name = 'Tiny';
    var ref = new Firebase('https://domusstatic.firebaseio.com/meetings');
    $scope.meetings = $firebase(ref);
    // $scope.meetings = meetings.$asObject();

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
