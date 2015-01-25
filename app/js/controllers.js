'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('LoginController', ['$scope', 'authService', function($scope, authService) {
    $scope.name = 'Drew';
    // var ref = new Firebase(FIREBASE_URL);
    // var auth = $firebaseSimpleLogin(ref);
    $scope.user = { email: '', password: '' };

    $scope.register = function() {
      // auth.$createUser($scope.user.email, $scope.user.password).then(function(data) {
      //   console.log(data);
      //   auth.$login('password', $scope.user);
      //   $location.path('/meetings');
      // });
      authService.register($scope.user);
    };


    $scope.login = function() {
      // auth.$login('password', $scope.user).then(function(data) {
      //   console.log(data);
      //   $location.path('/meetings');
      // });
      authService.login($scope.user);
    };

    $scope.logout = function() {
      // auth.$logout();
      // $locqtion.path('/login');
      authService.logout();
    }

  }])
  // .controller('RegisterController', ['$scope', '$firebaseSimpleLogin', '$location', '$rootScope', function($scope, $firebaseSimpleLogin, $location, $rootScope) {
  //   $scope.name = 'Andrew';
  //   var ref = new Firebase('https://domusstatic.firebaseio.com/');
  //   var auth = $firebaseSimpleLogin(ref);
  //   $scope.user = { email: '', password: '' };
  //
  //   $scope.register = function() {
  //     auth.$createUser($scope.user.email, $scope.user.password).then(function(data) {
  //       console.log(data);
  //       auth.$login('password', $scope.user);
  //       $location.path('/meetings');
  //     });
  //   }
  //
  //   $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
  //     $rootScope.currentUser = user;
  //   });
  //
  //   $rootScope.$on("$firebaseSimpleLogin:logout", function() {
  //     $rootScope.currentUser = null;
  //   });
  //
  // }])
  .controller('MeetingsController', ['$scope', '$firebase', function($scope, $firebase) {
    $scope.name = 'Tiny';
    var ref = new Firebase('https://domusstatic.firebaseio.com/meetings');
    $scope.meetings = $firebase(ref);
    $scope.meeting = { name: '', date: Firebase.ServerValue.TIMESTAMP,
      detail: '' };

    $scope.addMeeting = function() {
      $scope.meetings.$add($scope.meeting);
      $scope.meeting = { name: '', date: Firebase.ServerValue.TIMESTAMP,
      detail: '' };
    }

    $scope.removeMeeting = function(key) {
        meetings.$remove(key);
    }
  }])
  .controller('LandingPageController', [function() {

  }]);
