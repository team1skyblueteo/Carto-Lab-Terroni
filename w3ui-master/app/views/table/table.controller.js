'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.table',{
            access: 'authorized',
            url: 'table',
            data: {
                isNavi: true,
                title: 'Tabelle',
                icon: 'table'
            },
            views :{
                'body': {
                    controller: 'TableCtrl',
                    templateUrl: 'views/table/table.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('TableCtrl', function ($scope, $rootScope, Noty) {
        $rootScope.searchBarVisible = false;
        $scope.modalID = 'modalTable';


        $scope.myData = [
            {name: 'Moroni', age: 50},
            {name: 'Tiancum', age: 43},
            {name: 'Jacob', age: 27},
            {name: 'Nephi', age: 29},
            {name: 'Enos', age: 34}
        ];


        $scope.gridOptions = {
            data: 'myData',
            rowHeight: 30,
            enableRowSelection: false,
            enableCellSelection: false,
            columnDefs: [
                {field:'name', displayName:'Name'},
                {field:'age', displayName:'Age'},
                {field:'', width: '100px', cellTemplate: '<button data-toggle="modal" data-target="#{{ modalID }}" ng-click="openEditModel(row)" type="button" class="btn btn-primary btn-sm btn-block">' +
                    '<i class="glyphicons white pencil"></i>Bearbeiten</button>'
                },
                {field:'', width: '100px', cellTemplate: '<button ng-click="delete(row)" type="button" class="btn btn-danger btn-sm btn-block">' +
                    '<i class="glyphicons white circle_remove"></i>Löschen</button>'
                }
            ]
        };


        $scope.openAddModel = function(){
            $scope.modalTitle = 'Neue Daten erstellen';
            $scope.modalMode = 'Add';

            $scope.modalName = null;
            $scope.modalAge = null;

        };

        $scope.openEditModel = function(row){
            console.log('edit ', row) ;
            $scope.modalTitle = 'Daten bearbeiten';
            $scope.modalMode = 'Edit';

            $scope.modalName = row.entity.name;
            $scope.modalAge = row.entity.age;
        };


        $scope.saveModal = function(){
            console.log( 'save', $scope.modalMode, $scope.modalName, $scope.modalAge );
            $('#'+$scope.modalID).modal('hide');

            $scope.myData.push({name: $scope.modalName, age: $scope.modalAge});

            Noty.show('Wurde gespeichet','S');

        };





        $scope.delete = function(row){
            console.log('delete ', row);
            $scope.modalTitle = 'Daten löschen';
            $scope.modalMode = 'Delete';

            var index = $scope.myData.indexOf(row.entity);
            $scope.gridOptions.selectItem(index, false);
            $scope.myData.splice(index, 1);

        };


    });

