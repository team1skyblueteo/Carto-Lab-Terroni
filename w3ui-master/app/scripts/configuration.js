'use strict';

(function (exports) {
    var configuration = {

        // Environment
        APP_ENVIRONMENT: 'development',

        //API Request Config
        API_HOST: 'http://localhost',
        API_END_POINT: '80',
        API_SERVER_PATH: '/www/baselanwaelte.ch/api',

        API_HOST_DEV: 'http://localhost',
        API_END_POINT_DEV: '80',
        API_SERVER_PATH_DEV: '/www/baselanwaelte.ch/api',

        API_KEY: '1234567890',
        API_SECRET: 'davidvilla7',
        CONTENT_TYPE: 'application/json',
        API_AUTH_TOKEN: null,


        //i18n Config
        I18N_DEFAULT_LANGUAGE: 'de_DE',
        I18N_CONFIGURED_LANGUAGES: [
            {
                value: 'de_CH',
                text: 'DE'
            },
            {
                value: 'en_US',
                text: 'EN'
            }
        ],

        /* List all the roles you wish to use in the app
         * You have a max of 31 before the bit shift pushes the accompanying integer out of
         * the memory footprint for an integer a
         */
        /*AUTH_ROLES: [
            'public',
            'administrator'
        ],
        */

        /*
         Build out all the access levels you want referencing the roles listed above
         You can use the '*' symbol to represent access to all roles
         */
        AUTH_ROLES_ACCESSLEVELS: {
            'public': ['*'],
            'authorized': ['ADMIN', 'WRITER'],
            'admin': ['ADMIN'],
            'user-admin': ['ADMIN', 'USER-ADMIN']
        }
    };

    /**
     * Getter
     *
     * @param key
     * @returns {*}
     */
    var get = function (key) {
        try {
            return configuration[key];
        } catch (e) {
            return false;
        }
    };
    exports.get = get;

    /**
     * Setter
     *
     * @param key
     * @param value
     * @returns {*}
     */
    var set = function (key, value) {
        try {
            configuration[key] = value;
            return configuration[key];
        } catch (e) {
            return false;
        }
    };
    exports.set = set;

    /**
     * URL helper function
     *
     * @param functionName
     * @param envName
     * @returns {string}
     */
    var generateBackendURLHelper = function (functionName, envName) {
        var env = configuration.APP_ENVIRONMENT,
            url = '';

        if (envName) {
            env = envName;
        }

        //Get language
        var sLanguage = configuration.I18N_DEFAULT_LANGUAGE;
        sLanguage = sLanguage.split('_')[0];

        switch (env) {
            case 'development':
                url = configuration.API_HOST_DEV + ':' + configuration.API_END_POINT_DEV + configuration.API_SERVER_PATH_DEV + '/' + sLanguage + '/' + (functionName ? '/' + functionName : '');
                break;
            case 'production':
                url = configuration.API_HOST + ':' + configuration.API_END_POINT + configuration.API_SERVER_PATH + '/' + sLanguage + '/' + (functionName ? '/' + functionName : '');
                break;
            default:
                url = configuration.API_HOST + ':' + configuration.API_END_POINT + configuration.API_SERVER_PATH + '/' + sLanguage + '/' + (functionName ? '/' + functionName : '');
        }
        return url;
    };
    exports.generateBackendURLHelper = generateBackendURLHelper;


})(typeof exports === 'undefined' ? this.configuration = {} : exports);