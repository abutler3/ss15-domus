'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  // .value('FIREBASE_URL', 'https://domusstatic.firebaseio.com/');
  .factory('FIREBASE_URL', function() {
    return 'https://domusstatic.firebaseio.com/';
  })
  .factory('authService', function($firebaseSimpleLogin, $location, FIREBASE_URL) {

    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(ref);

    var authServiceObject = {
      register: function(user) {
        auth.$createUser(user.email, user.password).then(function(data) {
          console.log(data);
          authServiceObject.login(user);
        });
      },
      login: function(user) {
        auth.$login('password', user).then(function(data) {
          console.log(data);
          $location.path('/meetings');
        });
      },
      logout: function() {
        auth.$logout();
        $location.path('/login');
      }
    };

    return authServiceObject;
  });
