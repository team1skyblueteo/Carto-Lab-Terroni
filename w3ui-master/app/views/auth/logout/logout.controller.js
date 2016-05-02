'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('authLogout', {
            access: 'public',
            url: '/logout',
            views: {
                'header': {
                    controller: 'HeaderCtrl',
                    templateUrl: 'views/master/header/header.view.html'
                },
                'main': {
                    controller: 'LogoutCtrl',
                    templateUrl: 'views/auth/logout/logout.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('LogoutCtrl', function ($scope, $state, Authentication, Noty) {
        console.log('LogoutCtrl');
        Authentication.logout();
        $state.go('authLogin');
        Noty.success('Sie wurden erfolgreich abgemeldet!');

    });