'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.sections.edit', {
            access: 'authorized',
            url: '/edit/{sectionId}',
            data: {
                isNavi: false,
                title: 'Sektionen',
                subtitle: 'Bearbeiten',
                icon: 'pencil',
                parent: 'master.sections'
            },
            views: {
                'content': {
                    controller: 'SectionsEditCtrl',
                    templateUrl: 'views/sections/form.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('SectionsEditCtrl', function ($scope, $rootScope, $state, $stateParams, Sections, Authentication, Ajax, Noty, Progressbar) {
        $rootScope.searchBarVisible = false;

        console.log($stateParams);
        Progressbar.show(2, 'Lade Sections Daten');


        /**
         * Get section
         *
         * @param id
         */
        $scope.getSection = function (id) {
            Authentication.setHttpHeaders();
            $scope.Section = Sections.get({Id: id}, function () {
                $scope.getContent(id);
            });
        };

        /**
         * Get HTML content
         *
         * @param id
         */
        $scope.getContent = function (id) {
            Progressbar.next('Lade Content');
            Authentication.setHttpHeaders('text/html', 'text/html');
            $scope.Content = Sections.getContent({Id: id}, function (response) {
                $scope.htmlcontent = response.html;
                Progressbar.hide();
            });
        };

        /**
         * Init Process
         */
        $scope.getSection($stateParams.sectionId);

        /**
         * Saves the changes
         */
        $scope.save = function () {
            //Validation
            Progressbar.show(3, 'Daten werden überprüft...');

            //Updating section
            Progressbar.next('Speichere neues Element..');
            Authentication.setHttpHeaders();
            $scope.Section.$save({Id: $stateParams.sectionId}, function () {
                $scope.updateContent($stateParams.sectionId);
            });

        };

        /**
         * Updating the content of the section
         *
         * @param id
         */
        $scope.updateContent = function (id) {
            Progressbar.next('Speichere Text...');
            Ajax.put({
                    url: 'section/' + id + '/content',
                    contentType: 'text/html',
                    data: $scope.htmlcontent
                },
                function () {
                    $state.go('master.sections');
                    Progressbar.hide();
                    Noty.success('Neues Element wurde erfolgreich erstellt');
                },
                function () {
                    Noty.error('Fehler beim Speichern der Daten');
                }
            );

        };




    });