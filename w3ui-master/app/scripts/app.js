'use strict';

angular.module('w3uiFrontendApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ngGrid',
    'textAngular'
])

/**
 * Config Application
  */
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('master', {
        access: 'admin',
        url: '/',
        views: {
            'header': {
                controller: 'HeaderCtrl',
                templateUrl: 'views/master/header/header.view.html'
            },
            'main': {
                templateUrl: 'views/master/main.view.html'
            },
            'navigation@master': {
                controller: 'NavigationCtrl',
                templateUrl: 'views/master/navigation/navigation.view.html'
            },
            'breadcrumb@master': {
                controller: 'BreadcrumbCtrl',
                templateUrl: 'views/master/breadcrumb/breadcrumb.view.html'
            }
        }
    });


    $httpProvider.defaults.transformResponse.push(function (data, headerGetter) {
        try{
            var Authorization = headerGetter('Authorization');
            if(Authorization.indexOf("Bearer") != -1){
                console.log('API_AUTH_TOKEN', Authorization);
                configuration.set('API_AUTH_TOKEN', Authorization);
            }
        }catch(error){}
        return data;
    });
})

/**
 * Run Application
  */
.run(['$rootScope', '$state', 'Authentication', 'Noty',
    function ($rootScope, $state, Authentication, Noty) {

        $rootScope.appName = 'UI Template';
        $rootScope.searchBarVisible = false;

        $rootScope.$on('$stateChangeStart', function(event, next) {

            //Check if state is open for public
            if( next.access !== 'public' ){

                //Check if somebody is logged in
                if(!Authentication.isLoggedIn()){
                    event.preventDefault();
                    $state.go('authLogin');

                }else{
                    if( !Authentication.is(next.access) ){
                        event.preventDefault();
                        Noty.warning('Sie haben keine Berechtigung für diese Ansicht');

                    }

                }
            }
        });
}]);
