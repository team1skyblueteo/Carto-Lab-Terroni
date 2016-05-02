'use strict';

angular.module('w3uiFrontendApp')
    .factory('Ajax', function ($http, $state, Authentication) {

        /**
         * Global variables
         */
        var backendUrl = configuration.generateBackendURLHelper();

        /**
         * Run Http Request
         *
         * @param requestData
         * @param requestSuccess
         * @param requestError
         */
        function run(requestData, requestSuccess, requestError, requestDone) {
            var url = $.trim(backendUrl + requestData.url);
            var method = $.trim(requestData.method);

            if( !('contentType' in requestData) ){
                requestData.contentType = configuration.get('CONTENT_TYPE');
            }

            if( !('accept' in requestData) ){
                requestData.accept = configuration.get('CONTENT_TYPE');
            }

            var headers = {
                'Accept': $.trim(requestData.accept),
                'Content-Type': $.trim(requestData.contentType),
                'Authorization': Authentication.get('token')
            };


            //Check function vars
            var isRequestSuccessSet = false;
            var isRequestErrorSet = false;
            var isRequestDoneSet = false;
            if (typeof requestSuccess === 'function') {
                isRequestSuccessSet = true;
            }
            if (typeof requestError === 'function') {
                isRequestErrorSet = true;
            }
            if (typeof requestDone === 'function') {
                isRequestDoneSet = true;
            }


                //Without request data
            if (method === 'GET' || method === 'OPTIONS' || method === 'DELETE') {
                $http({
                    method: method,
                    url: url,
                    headers: headers
                }).success(function (responseBody, status, headers) {
                    Authentication.set('token', headers().authorization);

                    if(isRequestSuccessSet){
                        try {
                            if( headers()['content-type'] == 'application/json' ){
                                requestSuccess(responseBody);
                            }else{
                                requestSuccess(responseBody);
                            }

                        } catch (e) {
                            console.error('#ERROR - AJAX Factory: No Success Function Defined');
                        }
                    }

                    if(isRequestDoneSet){
                        try {
                            requestDone(headers);
                        } catch (e) {
                            console.error('#ERROR - AJAX Factory: No Done Function Defined');
                        }
                    }

                }).error(function (responseBody, status, headers) {

                    if( status == 401 ){
                        /*$state.go('authLogin');*/
                    }else{
                        if(isRequestErrorSet){
                            try {
                                requestError(responseBody, status);
                            } catch (e) {
                                console.error('#ERROR - AJAX Factory: No Error Function Defined');
                            }
                        }

                        if(isRequestDoneSet){
                            try {
                                requestDone(headers);
                            } catch (e) {
                                console.error('#ERROR - AJAX Factory: No Done Function Defined');
                            }
                        }
                    }
                });


            //With request data
            } else {
                var data = requestData.data;
                if (requestData.contentType === 'application/json') {
                    data = JSON.stringify(data);
                }



                $http({
                    method: method,
                    url: url,
                    data: data,
                    headers: headers
                }).success(function (responseBody, status, headers) {
                    Authentication.set('token', headers().authorization);

                    if(isRequestSuccessSet){
                        try {
                            if( headers()['content-type'] == 'application/json' ){
                                requestSuccess(responseBody.data, responseBody.message, responseBody.status);
                            }else{
                                requestSuccess(responseBody);
                            }
                        } catch (e) {
                            console.error('#ERROR - AJAX Factory: No Success Function Defined');
                        }
                    }

                    if(isRequestDoneSet){
                        try {
                            requestDone(headers);
                        } catch (e) {
                            console.error('#ERROR - AJAX Factory: No Done Function Defined');
                        }
                    }


                }).error(function (responseBody, status, headers) {
                    if(isRequestErrorSet){
                        try {
                            requestError(responseBody, status);
                        } catch (e) {
                            console.error('#ERROR - AJAX Factory: No Error Function Defined');
                        }
                    }

                    if(isRequestDoneSet){
                        try {
                            requestDone(headers);
                        } catch (e) {
                            console.error('#ERROR - AJAX Factory: No Done Function Defined');
                        }
                    }

                });
            }
        }


        /**
         * Public API
         */
        return {
            get: function (options, success, error, done) {
                options.method = 'GET';
                run(options, success, error, done);
            },
            post: function (options, success, error, done) {
                options.method = 'POST';
                run(options, success, error, done);
            },
            put: function (options, success, error, done) {
                options.method = 'PUT';
                run(options, success, error, done);
            },
            delete: function (options, success, error, done) {
                options.method = 'DELETE';
                run(options, success, error, done);
            }
        };
    });
