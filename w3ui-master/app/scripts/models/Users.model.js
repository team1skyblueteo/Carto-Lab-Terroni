'use strict';

angular.module('w3uiFrontendApp')
    .factory('Users', function ($resource) {
        return $resource(
            configuration.generateBackendURLHelper() + 'user/:Id',
            {Id: '@Id' }
        );
    });