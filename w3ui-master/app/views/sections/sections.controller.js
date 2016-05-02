'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.sections',{
            access: 'authorized',
            url: 'sections',
            data: {
                isNavi: true,
                title: 'Sektionen',
                icon: 'leaf',
                subtitle: ''
            },
            views :{
                'body': {
                    controller: 'SectionsCtrl',
                    templateUrl: 'views/sections/sections.view.html'
                },
                'content@master.sections': {
                    controller: 'SectionsListCtrl',
                    templateUrl: 'views/sections/list/list.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('SectionsCtrl', function ($scope, $rootScope) {
        $scope.subtitle = '';
        $rootScope.$on('$stateChangeStart', function(event, next) {
            $scope.subtitle = next.data.subtitle;
        });

    });
