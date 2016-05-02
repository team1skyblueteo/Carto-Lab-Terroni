'use strict';

angular.module('w3uiFrontendApp')
    .service('<%= name %>', function() {
        this.sayHello = function() {
            return "Hello, World!"
        };
    });