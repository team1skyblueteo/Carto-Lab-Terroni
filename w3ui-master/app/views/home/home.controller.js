'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {

        $stateProvider.state('master.home',{
            access: 'authorized',
            url: 'home',
            data: {
                isNavi: true,
                title: 'Home',
                icon: 'home'
            },
            views :{
                'body': {
                    controller: 'HomeCtrl',
                    templateUrl: 'views/home/home.view.html'
                }
            }
        });

    })

/**
 * And of course we define a controller for our route.
 */
    .controller('HomeCtrl', function ($scope, $rootScope) {
        $rootScope.searchBarVisible = false;


        /**
         * Rest API Test and Example
         */
        
        Authentication.setHttpHeaders();
        var Users = $resource(configuration.generateBackendURLHelper() + 'user/:id');

        var User = Users.get({id:2}, function(response, getResponseHeaders) {
            Authentication.set('token', getResponseHeaders('Authorization'));

            User.fname = 'Mooorise';

            User.$save({id:2});

        });
        
    });
