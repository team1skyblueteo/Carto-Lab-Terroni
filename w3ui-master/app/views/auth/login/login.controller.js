'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('authLogin', {
            access: 'public',
            url: '/login',
            views: {
                'header': {
                    controller: 'HeaderCtrl',
                    templateUrl: 'views/master/header/header.view.html'
                },
                'main': {
                    controller: 'LoginCtrl',
                    templateUrl: 'views/auth/login/login.view.html'
                }
            }
        });
    })


/**
 * And of course we define a controller for our route.
 */
    .controller('LoginCtrl', function ($scope, $state, $location, Authentication, Noty, Progressbar) {
        $scope.server = configuration.get('APP_ENVIRONMENT');

        $scope.username = 'gery.hirschfeld@w3tec.ch';
        $scope.password = '1234';

        $scope.login = function () {
            Progressbar.show(1,'Überprüfen Anmeldung');

            Authentication.login({
                    username: $scope.username,
                    password: $scope.password,
                    server: $scope.server
                },
                function (user, message, status) {
                    if (event.preventDefault) {
                        event.preventDefault();
                    } else {
                        event.returnValue = false;
                    }
                    $state.go('master.home');

                    Progressbar.hide();

                    Noty.success( 'Erflogriech Angemeldet' );
                },
                function (err) {
                    Progressbar.hide();

                }
            );
        };
    });