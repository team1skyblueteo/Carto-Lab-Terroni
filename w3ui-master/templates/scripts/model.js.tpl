'use strict';

angular.module('w3uiFrontendApp')
    .factory('<%= name %>', function ($resource, $http) {
        return $resource(
            configuration.generateBackendURLHelper() + '<%= url %>/:Id',
            {Id: '@Id' },
            {
                'getContent': {
                    method: 'GET',
                    url: configuration.generateBackendURLHelper() + '<%= url %>/:Id/content',
                    responseType: 'text',
                    isArray: false,
                    transformResponse: [function(responseData) {
                        return {
                            html: responseData
                        }
                    }].concat($http.defaults.transformResponse)
                }
            }
        );
    });