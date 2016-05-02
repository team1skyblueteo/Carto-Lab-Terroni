'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('<%- state %>',{
            access: 'authorized',
            url: '<%- url %>',
            data: {
                isNavi: true,
                title: '<%- controller %>',
                subtitle: '',
                icon: 'leaf'
            },
            views :{
                '<%- uiview %>': {
                    controller: '<%- controller %>Ctrl',
                    templateUrl: 'views<%- url %>/<%- name %>.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('<%- controller %>Ctrl', function ($scope, Ajax, Noty, Progressbar) {

    });