'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  // .value('FIREBASE_URL', 'https://domusstatic.firebaseio.com/');
  .factory('FIREBASE_URL', function() {
    return 'https://domusstatic.firebaseio.com/';
  })
  .factory('dataService', function($firebase, FIREBASE_URL) {
    var dataRef = new Firebase(FIREBASE_URL);
    var fireData = $firebase(dataRef);

    return fireData;
  })
  .factory('meetingService', function(dataService) {
    // var ref = new Firebase(FIREBASE_URL + 'meetings');
    // var meetings = $firebase(ref);

    // var meetings = dataService.$child('meetings');
    var users = dataService.$child('users');

    var meetingServiceObject = {
      // meetings: meetings,
      addMeeting: function(meeting, userId) {
        // meetings.$add(meeting);
        users.$child(userId).$child('meetings').$add(meeting);
      },
      getMeetingsByUserId: function(userId) {
        return users.$child(userId).$child('meetings');
      }
    };

    return meetingServiceObject;

  })
  .factory('authService', function($firebaseSimpleLogin, $location, FIREBASE_URL, $rootScope) {

    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(ref);

    var authServiceObject = {
      register: function(user) {
        auth.$createUser(user.email, user.password).then(function(data) {
          authServiceObject.login(user);
        });
      },
      login: function(user) {
        auth.$login('password', user).then(function(data) {
          $location.path('/meetings');
        });
      },
      logout: function() {
        auth.$logout();
        $location.path('/login');
      },
      getCurrentUser: function() {
        return auth.$getCurrentUser();
      }
    };

    $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
      $rootScope.currentUser = user;
    });

    $rootScope.$on("$firebaseSimpleLogin:logout", function() {
      $rootScope.currentUser = null;
    });

    return authServiceObject;
  });
