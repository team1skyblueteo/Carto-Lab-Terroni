'use strict';

angular.module('w3uiFrontendApp')
    .directive('<%= name %>', function() {
        return {
            template: 'Name: {{customer.name}} Address: {{customer.address}}'
        };
    });