'use strict';

angular.module('w3uiFrontendApp')

/**
 * Noty Service
 */
    .factory('Noty', function () {
        //Queue
        var queue = [];

        //Defaults
        $.noty.defaults = {
            layout: 'bottomRight',
            theme: 'defaultTheme',
            type: 'alert',
            text: '', // can be html or string
            dismissQueue: true, // If you want to use queue feature set this true
            template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
            animation: {
                open: {height: 'toggle'},
                close: {height: 'toggle'},
                easing: 'swing',
                speed: 500 // opening & closing animation speed
            },
            timeout: false, // delay for closing event. Set false for sticky notifications
            force: false, // adds notification to the beginning of queue when set to true
            modal: false,
            maxVisible: 5, // you can set max visible notification for dismissQueue true option,
            killer: false, // for close all notifications before show
            closeWith: ['click'], // ['click', 'button', 'hover']
            callback: {
                onShow: function () {
                },
                afterShow: function () {
                },
                onClose: function () {
                },
                afterClose: function () {
                }
            },
            buttons: false // an array of buttons
        };


        function print(message, type, timeout){
            if(timeout === undefined){
                timeout = 5000;
            }

            var n = noty({
                text: message,
                type: type,
                dismissQueue: true,
                layout: 'bottomRight',
                theme: 'defaultTheme',
                timeout: timeout
            });

            queue.push(n);
            return n.options.id;
        }


        // Public API here
        return {
            /**
             * Clear all Noty's
             */
            clear: function (){
                queue = [];
                $.noty.closeAll();
            },

            /**
             * Close Noty by ID or just the last one
             *
             * @param id
             */
            close: function( id ){
                if(id === undefined){
                    id = queue[queue.length-1].options.id;
                }

                $.noty.close(id);

                for( var index=0; index < queue.length; index++ ){}
                if( queue[index].options.id === id ){
                    queue.splice(index, 1);
                }
            },

            alert: function (message, timeout) {
                return print(message, 'alert', timeout);
            },
            info: function (message, timeout) {
                return print(message, 'information', timeout);
            },
            success: function (message, timeout) {
                return print(message, 'success', timeout);
            },
            warning: function (message, timeout) {
                return print(message, 'warning', timeout);
            },
            error: function (message, timeout) {
                return print(message, 'error', timeout);
            },
            confirm: function (message, timeout) {
                return print(message, 'alert', timeout);
            },


            show: function (message, type) {

                switch (type) {
                    case 'a':
                    case 'A':
                        type = 'alert';
                        break;

                    case 's':
                    case 'S':
                        type = 'success';
                        break;

                    case 'e':
                    case 'E':
                        type = 'error';
                        break;

                    case 'w':
                    case 'W':
                        type = 'warning';
                        break;

                    case 'i':
                    case 'I':
                        type = 'information';
                        break;

                    case 'c':
                    case 'C':
                        type = 'information';
                        break;

                    default:
                        type = 'alert';
                }

                var n = noty({
                    text: message,
                    type: type,
                    dismissQueue: true,
                    layout: 'bottomRight',
                    theme: 'defaultTheme',
                    timeout: 5000
                });

                queue.push(n);
                return n.options.id;

            }
        };
    });