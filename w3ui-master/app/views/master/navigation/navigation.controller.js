'use strict';

angular.module('w3uiFrontendApp')

/**
 * And of course we define a controller for our route.
 */
    .controller('NavigationCtrl', function ($scope, $rootScope, $state) {

        /**
         * Defines the first view in the body part
         *
         * @type {string}
         */
        var startState = 'master.home';

        /**
         * Navigation list
         *
         * @type {*[]}
         */
        $scope.list = [];
        var array = $state.get();
        for(var index in array) {
            try{
                if( array[index].data.isNavi ){

                    if( !array[index].data.state ){
                        array[index].data.state = array[index].name;
                    }

                    array[index].data.children = [];
                    array[index].data.class = '';
                    if( startState == array[index].data.state ){
                        array[index].data.class = 'active';
                    }
                    $scope.list.push(array[index].data);
                }
            }catch(error){}
        }

        /**
         * Return a navigation item
         *
         * @param statePath
         * @returns {*}
         */
        function get(statePath){
            var array = $scope.list;

            if( statePath === undefined ){
                return array;
            }

            for(var index in array) {
                try{
                    if( array[index].state == statePath ){
                        return array[index];
                    }
                }catch(error){}
            }
            return false;
        }

        /**
         * Resets the active tag at all navigation items
         */
        function resetActiveTag(){
            var array = $scope.list;
            for(var index in array) {
                try{
                    array[index].class = '';
                }catch(error){}
            }
        }

        /**
         * When the states are changing the active tag will be reset and set
         */
        $rootScope.$on('$stateChangeStart', function(event, next) {
            try{
                resetActiveTag();

                if( next.data.parent !== undefined ){
                    console.log('resetActiveTag', next.data.parent);
                    get(next.data.parent).class = 'active';
                }else{
                    get(next.name).class = 'active';
                }

            }catch(error){}
        });

        /**
         * Opens the subnavigation items
         *
         * @param item
         * @param self
         */
        $scope.onClickNavigationItem = function(item, self){
            var $mainContainer = $('.main-container');
            var $navigationItem = $('#main-navigation-item-'+self.$id);

            //if has children
            if(item.children.length > 0){
                var dblHeight = parseFloat($('ul.sub-menu').children().height()) * parseFloat($navigationItem.find('ul.sub-menu').children().length);
                var dblWidth = 220;

                //when dash is active
                if ($mainContainer.hasClass('dash-active')) {
                    //close selected one
                    if ($navigationItem.hasClass('open')) {
                        $navigationItem.find('ul.sub-menu').width(0).delay(300).queue(function () {
                            $navigationItem.dequeue();
                            $navigationItem.parent().removeClass('open');
                        });

                    } else {
                        //remove old one
                        $mainContainer.find('.main-navigation-menu > li.open').removeClass('open').find('ul.sub-menu').width(0);

                        //open new one
                        $navigationItem.addClass('open').find('ul.sub-menu').width(dblWidth);
                    }

                }else{
                    //close selected one
                    if ($navigationItem.hasClass('open')) {
                        $navigationItem.removeClass('open').find('ul.sub-menu').height(0);

                    } else {
                        //remove old one
                        $mainContainer.find('.main-navigation-menu > li.open').removeClass('open').find('ul.sub-menu').height(0);

                        //open new one
                        $navigationItem.addClass('open').find('ul.sub-menu').height(dblHeight);
                    }
                }

            }else{
                $mainContainer.find('.main-navigation-menu > li.open').removeClass('open').find('ul.sub-menu').height(0);
            }
        };

        /**
         * On toggle the navigation. this changes the look of the navigation
         *
         * @param self
         */
        $scope.onToggleNavigation = function(self){
            var $mainContainer = $('.main-container');

            //go to dash inactive
            if ($mainContainer.hasClass('dash-active')) {
                $mainContainer.find('.main-navigation-menu > li.open').removeClass('open').find('ul.sub-menu').height(0);
                $mainContainer.removeClass('dash-active').addClass('dash-inactive');

                //201 width
                $mainContainer.find('ul.sub-menu').width(201);
                setTimeout(function(){
                    $(window).trigger('resize');
                },300);

            //go to dash active
            } else {
                $mainContainer.find('.main-navigation-menu > li.open').removeClass('open').find('ul.sub-menu').height(0);
                $mainContainer.addClass('dash-active').removeClass('dash-inactive');
                setTimeout(function(){
                    $(window).trigger('resize');
                },300);
            }

        };

    });