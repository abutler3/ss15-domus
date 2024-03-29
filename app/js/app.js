'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'firebase'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginController'});
  $routeProvider.when('/register', {templateUrl: 'partials/register.html', controller: 'LoginController'});
  $routeProvider.when('/meetings', {templateUrl: 'partials/meetings.html', controller: 'MeetingsController'});
  $routeProvider.when('/', {templateUrl: 'partials/landingpage.html', controller: 'LandingPageController'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
