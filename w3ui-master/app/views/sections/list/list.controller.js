'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.sections.list',{
            access: 'authorized',
            url: '',
            data: {
                isNavi: false,
                title: 'Sektionen',
                subtitle: 'Alle',
                icon: 'leaf',
                parent: 'master.sections'
            },
            views :{
                'content': {
                    controller: 'SectionsListCtrl',
                    templateUrl: 'views/sections/list/list.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('SectionsListCtrl', function ($scope, $rootScope, $state, $location, $resource, Sections, Users, Authentication, Ajax, Noty, Progressbar) {
        $scope.modalID = 'modalDelete';
        $scope.admin = Authentication.is('admin');
        $rootScope.searchBarVisible = true;

        $scope.modalEntity = {};


        /**
         * Filter watch
         */
        $rootScope.$watch('searchValue', function() {
            $scope.gridOptions.filterOptions.filterText = this.last;
        }, true);

        /**
         * Grid Options
         */
        $scope.gridOptions = {
            data: 'myData',
            headerRowHeight: 40,
            rowHeight: 38,
            enableRowSelection: false,
            enableCellSelection: false,
            filterOptions: {
                filterText: '',
                useExternalFilter: false
            },
            columnDefs: [
                {field: 'id', displayName: 'ID'},
                {field: 'name', displayName: 'Name'},
                {field: 'updated_at', displayName: 'Bearbeitet am'},
                {field: 'updated_by_name', displayName: 'Bearbeitet von'},
                {
                    field: '',
                    displayName: 'Aktion',
                    width: '100px',
                    cellTemplate: '<div class="btn-toolbar" role="toolbar">' +
                        '<div class="btn-group btn-group-sm grid-buttons">' +
                        '<button ng-click="edit(row)" type="button" class="btn btn-primary btn-sm">' +
                        '<i class="glyphicons pencil"></i>' +
                        '</button>' +
                        '</div>' +
                        '<div class="btn-group btn-group-sm grid-buttons" data-ng-show="admin">' +
                        '<button ng-click="openDeleteModel(row)" type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#{{ modalID }}">' +
                        '<i class="glyphicons circle_remove"></i>' +
                        '</button>' +
                        '</div>' +
                        '</div>'
                }
            ]
        };

        /**
         * Get Data
         */
        $scope.getSections = function(){
            Progressbar.show(1, 'Lade Sections Daten');
            $scope.modalEntity = {};

            Authentication.setHttpHeaders();
            $scope.myData = Sections.query();
            $scope.myData.$promise.then(function (result) {

                Authentication.setHttpHeaders();
                var oUsers = Users.query();
                oUsers.$promise.then(function (list) {

                    for( var i = 0; i < result.length; i++ ){
                        var user = _.where(list, {id: result[i].updated_by});
                        result[i]['updated_by_name'] = user[0].fname + ' ' + user[0].lastname;
                    }

                    $scope.myData = result;
                    Progressbar.hide();
                });
            });
        };
        $scope.getSections();




        /**
         * Go to create state
         */
        $scope.create = function () {
            $state.go('master.sections.create');
        };

        /**
         * Open Edit Modal
         *
         * @param row
         */
        $scope.edit = function (row){
            $state.go('master.sections.edit', {'sectionId': row.entity.id});
        };

        /**
         * Open Delete Modal
         *
         * @param row
         */
        $scope.openDeleteModel = function (row){
            $scope.modalEntity = row.entity;
            $scope.modalTitle = '"' + $scope.modalEntity.name + '"' + ' löschen';
            $scope.modalButtonText = 'Löschen';
        };

        /**
         * Save Modal
         */
        $scope.submitModal = function () {
            $('#'+$scope.modalID).modal('hide');
            Progressbar.show(1, 'Daten überprüfen');

            Authentication.setHttpHeaders();
            $scope.modalEntity.$delete({Id: $scope.modalEntity.id}, function(result){
                $scope.myData = _.without($scope.myData, _.findWhere($scope.myData, {id: $scope.modalEntity.id}));
                Progressbar.hide();
            });
        };

    });