'use strict';

angular.module('w3uiFrontendApp')

/**
 * And of course we define a controller for our route.
 */
    .controller('HeaderCtrl', function ($scope, Authentication, $rootScope) {
        $scope.isLoggedIn = false;
        $scope.username = Authentication.get('user').username;

        if($scope.username){
            $scope.isLoggedIn = true;
        }

        $scope.title = $rootScope.appName;


    });