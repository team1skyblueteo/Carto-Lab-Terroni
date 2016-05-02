'use strict';

angular.module('w3uiFrontendApp')
    .factory('Progressbar', function () {

        /**
         *  Local variables
         */
        var id = '#modalProgressbar';
        var dialog = $(id);
        var $Progressbar = $('#modalProgressbar-progressbar');
        var $Text = $('#modalProgressbar-text');
        var max = 1;
        var count = 0;
        var widthMax = 80;
        var isHidden = true;

        /**
         * Init
         */
        function init() {
            isHidden = true;
            $Progressbar.css('width', '0%');
        }

        /**
         * Add close task of progress
         *
         * @param value
         */
        function add(value) {
            $Progressbar.css('width', value + '%');
        }

        /**
         * Finish bar
         *
         * @param value
         */
        function finish() {
            isHidden = true;
            $Progressbar.css('width', '100%');
            setTimeout(function(){
                dialog.modal('hide');
            },300);
        }

        /**
         * Set status text
         *
         * @param text
         */
        function setText(text) {
            if (text === undefined) {
                text = '';
            }
            $Text.html($.trim(text) + '...');
        }

        /**
         * Show progress bar in modal
         *
         * @param amountTasks
         * @param text
         */
        function show(amountTasks, text) {
            setText(text);
            init();

            if (amountTasks === undefined) {
                amountTasks = 1;
            }
            max = amountTasks;
            count = 0;

            isHidden = false;
            dialog.modal('show');
            add(20);
        }

        /**
         * Close one task and prepare for the next one
         *
         * @param text
         */
        function next(text) {
            setText(text);
            var widthStep = widthMax / max;
            count++;
            add(20 + ( widthStep * count  ));
        }


        /**
         * Public API
         */
        return {
            show: function (amountTasks, text) {
                if (isHidden) {
                    show(amountTasks, text);
                } else {
                    next(text);
                }
            },
            hide: function () {
                finish();
            },
            next: function (text) {
                next(text);
            }
        };
    });