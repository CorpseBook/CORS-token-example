var corpseFaceApp = angular.module('corpseFaceApp', []);

corpseFaceApp.controller('requestCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window)
{


    // this configures the headers for all HTTP requests

    corpseFaceApp.config(function($httpProvider)
    {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

      // $httpProvider.interceptors.push(function($q, $cookies) {
      //     return {
      //      'request': function(config) {

      //           config.headers['Token'] = "$cookies.loginTokenCookie";
      //           return config;
      //       }
      //     };
      //   });
    });

    // this is a test method for GET requests to the server - it is successful (i.e. without CORS errors)

  $scope.testGet = function ()
  {
    var config = {
      method: 'GET',
      url: 'http://localhost:3000/stories',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    $http(config)
    .success(function (data){
      console.log(data);
    });
  }

    // this is a method for posting user signIn objects - it is currently not fleshed out

    $scope.user = {};

    $scope.signIn = function (user)
    {
        var user = {user: user}
        var config = {
          method: 'POST',
          url: 'http://localhost:3000/token',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          data: user
        }

        $http(config)
        .success(function (data){
          console.log(data);
          $window.sessionStorage.token = data.token
        });
    }

    $scope.signOut = function() {
      var config = {
        method: 'POST',
        url: 'http://localhost:3000/sign_out',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
      $http(config)
      .success(function(data){
        console.log(data)
        delete $window.sessionStorage.token
        // render login form
      });
    }

    // this is a method for posting story objects to the server - it is currently getting CORS errors

    $scope.story = {};

     $scope.createNewStory = function (story)
      {
        story = {story : story}
        console.log(story);

        var config =
        {
            method: 'POST',
            url: 'http://localhost:3000/stories',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
          data: story
        };

        $http(config)
          .success(function (data)
          {
            console.log(data);
          })
          .error(function (data, status)
          {
            console.log('error');
          });
      }
}]);

corpseFaceApp.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Token token=' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
});

corpseFaceApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
