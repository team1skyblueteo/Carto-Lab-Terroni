'use strict';

angular.module('w3uiFrontendApp')

/**
 * And of course we define a controller for our route.
 */
    .controller('BreadcrumbCtrl', function ($scope, $rootScope) {

        /**
         * Defines the startpage
         *
         * @type {string}
         */
        $scope.breadcrumbTitle = 'Home';
        $scope.breadcrumbIcon = 'home';
        $scope.breadcrumbSubTitle = 'Dashboard';
        $scope.breadcrumbStateUrl = 'home';

        /**
         * Search value watch
         */
        $scope.$watch('searchValue', function() {
            $rootScope.searchValue = this.last;
        }); // initialize the watch

        /**
         * Updates the breadcrumb when state is going to change
         */
        $rootScope.$on('$stateChangeStart', function(event, next, params, last) {
            $scope.breadcrumbTitle = next.data.title;
            $scope.breadcrumbIcon = next.data.icon;
            $scope.breadcrumbSubTitle = next.data.subtitle;

            if(next.data.parent !== undefined){
                $scope.breadcrumbStateUrl = last.url;
            }else{
                $scope.breadcrumbStateUrl = next.url;
            }
        });


    });