'use strict';

angular.module('w3uiFrontendApp')
    .factory('Sections', function ($resource, $http) {
        return $resource(
            configuration.generateBackendURLHelper() + 'section/:Id',
            {Id: '@Id' },
            {
                'getContent': {
                    method: 'GET',
                    url: configuration.generateBackendURLHelper() + 'section/:Id/content',
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