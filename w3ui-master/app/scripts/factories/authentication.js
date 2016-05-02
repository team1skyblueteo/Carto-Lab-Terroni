'use strict';

angular.module('w3uiFrontendApp')
    .factory('Authentication', function ($http, $cookieStore) {
        // Service logic
        var store = {
            user: false,
            token: configuration.get('API_AUTH_TOKEN')
        };

        var loggedIn = false;


        // Public API here
        return {
            get: function (key) {
                try {
                    if(key == 'token'){
                        return configuration.get('API_AUTH_TOKEN');
                    }

                    return store[key];
                } catch (e) {
                    return false;
                }
            },
            set: function (key, value) {
                try {
                    store[key] = value;

                    if(key == 'token'){
                        configuration.set('API_AUTH_TOKEN', value);
                        $http.defaults.headers.common['Authorization'] = value;
                    }

                    return true;
                } catch (e) {
                    return false;
                }
            },
            setHttpHeaders: function( contentType, accept ){
                if( contentType === undefined ){
                    contentType = 'application/json'
                }
                if( accept === undefined ){
                    accept = 'application/json'
                }

                $http.defaults.headers.common['Authorization'] = configuration.get('API_AUTH_TOKEN');
                $http.defaults.headers.common['Content-Type'] = contentType;
                $http.defaults.headers.common['Accept'] = accept;
            },
            isLoggedIn: function () {
                if (store.user === undefined) {
                    return false;
                }
                return loggedIn;
            },
            logout: function () {
                loggedIn = false;
                store.user = false;
                store.token = false;
            },
            is: function(accessLevel){
                accessLevel.toUpperCase();
                var authLevels = configuration.get('AUTH_ROLES_ACCESSLEVELS');
                var userRoles = store.user.roles;
                try{
                    userRoles = split(userRoles, ';');
                }catch (error){}

                try{
                    var array = authLevels[accessLevel];

                    if( typeof userRoles != 'string'){
                        for(var index in userRoles){
                            if( array.indexOf(userRoles[index]) >= 0 ){
                                return true;
                            }
                        }
                    }else{
                        if( array.indexOf(userRoles) >= 0 ){
                            return true;
                        }
                    }


                }catch(error){}
                return false;
            },
            login: function (formUser, success, error) {
                $cookieStore.put('APP_ENVIRONMENT', configuration.set('APP_ENVIRONMENT', formUser.server));

                var url = configuration.generateBackendURLHelper();

                $http.defaults.headers.common['API-Key'] = configuration.get('API_KEY');

                $http({
                    method: 'GET',
                    url: url + 'auth/login',
                    headers: {
                        'Accept': configuration.get('CONTENT_TYPE'),
                        'API-Secret': configuration.get('API_SECRET'),
                        'Authorization': 'Basic ' + Base64.encode(formUser.username + ':' + formUser.password)
                    }
                }).success(function (data, status, headers) {
                    var newUserObj = {};
                    newUserObj.id = data.id;
                    newUserObj.fname = data.fname;
                    newUserObj.lastname = data.lastname;
                    newUserObj.email = data.email;
                    newUserObj.username = newUserObj.fname + ' ' + newUserObj.lastname;
                    newUserObj.roles = data.roles;

                    store.user = newUserObj;
                    store.token = headers().authorization;

                    //$cookieStore.put('W3_TOKEN', Base64.encode(store.token));
                    $cookieStore.put('W3_USER', Base64.encode(JSON.stringify(store.user)));

                    loggedIn = true;

                    success(store.user);

                }).error(error);
            }
        };
    });
