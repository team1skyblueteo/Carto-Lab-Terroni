// Generated on 2014-01-13 using generator-angular 0.7.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'app',
            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js','<%= yeoman.app %>/views/**/*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            compass: {
                files: [
                    '<%= yeoman.app %>/styles/{,*/}*.{scss,sass}',
                    '<%= yeoman.app %>/views/{,*/}*.{scss,sass}'
                ],
                tasks: ['sass-directory-imports','compass:server','compass:serverViews', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '<%= yeoman.app %>/views/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yeoman.dist %>/*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '{,*/}*.css',
                        dest: '.tmp/styles/'
                    }
                ]
            }
        },

        // Automatically inject Bower components into the app
        'bower-install': {
            app: {
                html: '<%= yeoman.app %>/index.html',
                ignorePath: '<%= yeoman.app %>/'
            }
        },


        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            },
            serverViews: {
                options: {
                    sassDir: '<%= yeoman.app %>/views',
                    debugInfo: true
                }
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.{png,jpg,jpeg,gif}',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.dist %>',
                        src: ['*.html', 'views/{,*/}*.html'],
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/concat/scripts',
                        src: '*.js',
                        dest: '.tmp/concat/scripts'
                    }
                ]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'views/{,*/}*.html',
                            'bower_components/**/*',
                            'images/{,*/}*.{webp}',
                            'styles/fonts/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/images',
                        src: ['generated/*']
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server', 'compass:serverViews'
            ],
            test: [
                'compass'
            ],
            dist: [
                'compass:dist',
                'imagemin',
                'svgmin'
            ]
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css',
        //         '<%= yeoman.app %>/styles/{,*/}*.css'
        //       ]
        //     }animate.css
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/scripts/scripts.js': [
        //         '<%= yeoman.dist %>/scripts/scripts.js'
        //       ]
        //     }
        //   }
        // },
        // concat: {
        //   dist: {}
        // },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        // Custom Task for creation files with a template
        'template': {
            'state':{
                'options': {
                    'data':{
                        'dest': 'app/views/',
                        'ui-view': 'body',
                        'state': 'master.',
                        'name': '',
                        'url': '',
                        'controller': ''
                    }
                },
                'files': {
                    '<%= template.state.options.data.dest %>/<%= template.state.options.data.name %>.view.html': ['templates/views/.view.html.tpl'],
                    '<%= template.state.options.data.dest %>/<%= template.state.options.data.name %>.controller.js': ['templates/views/.controller.js.tpl'],
                    '<%= template.state.options.data.dest %>/<%= template.state.options.data.name %>.style.scss': ['templates/views/.style.scss.tpl']
                }
            },
            'factory': {
                'options': {
                    'data':{
                        'dest': 'app/scripts/factories/',
                        'name': '',
                        'title': '',
                        'path': ''
                    }
                },
                'files': {
                    '<%= template.factory.options.data.dest %><%= template.factory.options.data.name %>.js': ['templates/scripts/factory.js.tpl']
                }
            },
            'model': {
                'options': {
                    'data':{
                        'dest': 'app/scripts/models/',
                        'name': '',
                        'url': ''
                    }
                },
                'files': {
                    '<%= template.model.options.data.dest %><%= template.model.options.data.name %>.model.js': ['templates/scripts/model.js.tpl']
                }
            },
            'filter': {
                'options': {
                    'data':{
                        'dest': 'app/scripts/filter/',
                        'name': '',
                        'title': '',
                        'path': ''
                    }
                },
                'files': {
                    '<%= template.filter.options.data.dest %><%= template.filter.options.data.name %>.js': ['templates/scripts/filter.js.tpl']
                }
            },
            'provider': {
                'options': {
                    'data':{
                        'dest': 'app/scripts/provider/',
                        'name': '',
                        'title': '',
                        'path': ''
                    }
                },
                'files': {
                    '<%= template.provider.options.data.dest %><%= template.provider.options.data.name %>.js': ['templates/scripts/provider.js.tpl']
                }
            },
            'directives': {
                'options': {
                    'data':{
                        'dest': 'app/scripts/directives/',
                        'name': '',
                        'title': '',
                        'path': ''
                    }
                },
                'files': {
                    '<%= template.directives.options.data.dest %><%= template.directives.options.data.name %>.js': ['templates/scripts/directives.js.tpl']
                }
            }

        },

        // Custom Task Configuration
        'sass-directory-imports': {
            // This is an arbitrary name for this sub-task

            views: {
                options: {
                    dest: 'app/styles/views.scss'
                },
                files: {
                    src: [
                        'app/views/**/*style.scss'
                    ]
                }
            }
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'bower-install',
            'sass-directory-imports',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'bower-install',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);

    /**
     * Create-Factory from a template
     */
    grunt.registerTask('create-factory', 'Create a factory template', function(input) {
        if (input == null) {
            grunt.warn('Create templates must be specified, like create-factory:Test');
        }else{
            var targetPath = grunt.config.get('template.factory.options.data.dest'); //'app/scripts/factories/';
            var name = input;
            var title = name.charAt(0).toUpperCase() + name.slice(1);
            if(input.indexOf('/') !== -1){
                var arrayInput = input.split('/');
                title = arrayInput[arrayInput.length-1];
                title = title.charAt(0).toUpperCase() + title.slice(1);
            }
            grunt.config.set('template.factory.options.data.title', title);
            grunt.config.set('template.factory.options.data.name', name);
            grunt.config.set('template.factory.options.data.path', name);
            if( !grunt.file.exists(targetPath + name) ){
                grunt.task.run(['template:factory']);
            }else{
                grunt.log.errorlns('Directory "' + targetPath + name + '" already exists');
            }
        }
    });

    /**
     * Create-Directives from a template
     */
    grunt.registerTask('create-directives', 'Create a directives template', function(input) {
        if (input == null) {
            grunt.warn('Create templates must be specified, like create-directives:Test');
        }else{
            var targetPath = grunt.config.get('template.directives.options.data.dest');
            var name = input;
            var title = name.charAt(0).toUpperCase() + name.slice(1);
            if(input.indexOf('/') !== -1){
                var arrayInput = input.split('/');
                title = arrayInput[arrayInput.length-1];
                title = title.charAt(0).toUpperCase() + title.slice(1);
            }
            grunt.config.set('template.directives.options.data.title', title);
            grunt.config.set('template.directives.options.data.name', name);
            grunt.config.set('template.directives.options.data.path', name);
            if( !grunt.file.exists(targetPath + name) ){
                grunt.task.run(['template:directives']);
            }else{
                grunt.log.errorlns('Directory "' + targetPath + name + '" already exists');
            }
        }
    });

    /**
     * Create-Model from a template
     */
    grunt.registerTask('create-model', 'Create a model template', function(input) {
        if (input == null) {
            grunt.warn('Create templates must be specified, like create-model:Test');
        }else{
            var targetPath = grunt.config.get('template.model.options.data.dest'); //'app/scripts/factories/';
            var name = input;
            var title = name.charAt(0).toUpperCase() + name.slice(1);

            if(input.indexOf('/') !== -1){
                var arrayInput = input.split('/');
                title = arrayInput[arrayInput.length-1];
                title = title.charAt(0).toUpperCase() + title.slice(1);
            }

            grunt.config.set('template.model.options.data.name', title);
            grunt.config.set('template.model.options.data.url', name.toLowerCase());
            if( !grunt.file.exists(targetPath + name) ){
                grunt.task.run(['template:model']);
            }else{
                grunt.log.errorlns('Directory "' + targetPath + name + '" already exists');
            }
        }
    });

    /**
     * Create-Filter from a template
     */
    grunt.registerTask('create-filter', 'Create a filter template', function(input) {
        if (input == null) {
            grunt.warn('Create templates must be specified, like create-filter:Test');
        }else{
            var targetPath = grunt.config.get('template.filter.options.data.dest'); //'app/scripts/factories/';
            var name = input;
            var title = name.charAt(0).toUpperCase() + name.slice(1);
            if(input.indexOf('/') !== -1){
                var arrayInput = input.split('/');
                title = arrayInput[arrayInput.length-1];
                title = title.charAt(0).toUpperCase() + title.slice(1);
            }
            grunt.config.set('template.filter.options.data.title', title);
            grunt.config.set('template.filter.options.data.name', name);
            grunt.config.set('template.filter.options.data.path', name);
            if( !grunt.file.exists(targetPath + name) ){
                grunt.task.run(['template:filter']);
            }else{
                grunt.log.errorlns('Directory "' + targetPath + name + '" already exists');
            }
        }
    });

    /**
     * Create-Provider from a template
     */
    grunt.registerTask('create-provider', 'Create a provider template', function(input) {
        if (input == null) {
            grunt.warn('Create templates must be specified, like create-provider:Test');
        }else{
            var targetPath = grunt.config.get('template.provider.options.data.dest'); //'app/scripts/factories/';
            var name = input;
            var title = name.charAt(0).toUpperCase() + name.slice(1);
            if(input.indexOf('/') !== -1){
                var arrayInput = input.split('/');
                title = arrayInput[arrayInput.length-1];
                title = title.charAt(0).toUpperCase() + title.slice(1);
            }
            grunt.config.set('template.provider.options.data.title', title);
            grunt.config.set('template.provider.options.data.name', name);
            grunt.config.set('template.provider.options.data.path', name);
            if( !grunt.file.exists(targetPath + name) ){
                grunt.task.run(['template:provider']);
            }else{
                grunt.log.errorlns('Directory "' + targetPath + name + '" already exists');
            }
        }
    });

    /**
     * Create-Service from a template
     */
    grunt.registerTask('create-service', 'Create a service template', function(input) {
        if (input == null) {
            grunt.warn('Create templates must be specified, like create-service:Test');
        }else{
            var targetPath = grunt.config.get('template.service.options.data.dest'); //'app/scripts/factories/';
            var name = input;
            var title = name.charAt(0).toUpperCase() + name.slice(1);
            if(input.indexOf('/') !== -1){
                var arrayInput = input.split('/');
                title = arrayInput[arrayInput.length-1];
                title = title.charAt(0).toUpperCase() + title.slice(1);
            }
            grunt.config.set('template.service.options.data.title', title);
            grunt.config.set('template.service.options.data.name', name);
            grunt.config.set('template.service.options.data.path', name);
            if( !grunt.file.exists(targetPath + name) ){
                grunt.task.run(['template:service']);
            }else{
                grunt.log.errorlns('Directory "' + targetPath + name + '" already exists');
            }
        }
    });

    /**
     * Create-State from a template
     */
    grunt.registerTask('create-state', 'Create a template', function(input) {
        if (input == null) {
            grunt.warn('Create templates must be specified, like create-state:Test');

        }else{
            var targetPath = grunt.config.get('template.state.options.data.dest');
            var name = input;
            var state = name;
            var uiView = grunt.config.get('template.state.options.data.ui-view');
            var url = '/' + name;
            var controller = name.charAt(0).toUpperCase() + name.slice(1);
            targetPath = targetPath + name;

            //Nested state
            if(name.indexOf('/') !== -1){
                var aName = name.split('/');
                name = aName[aName.length-1];
                controller = name.charAt(0).toUpperCase() + name.slice(1);
                state = aName.join('.');
                uiView = name;
            }

            state = grunt.config.get('template.state.options.data.state') + state;

            //Set options for the task
            grunt.config.set('template.state.options.data.name', name);
            grunt.config.set('template.state.options.data.dest', targetPath);
            grunt.config.set('template.state.options.data.state', state);
            grunt.config.set('template.state.options.data.url', url);
            grunt.config.set('template.state.options.data.controller', controller);
            grunt.config.set('template.state.options.data.ui-view', uiView);

            if( !grunt.file.exists(targetPath) ){
                grunt.task.run(['template:state', 'sass-directory-imports']);

            }else{
                grunt.log.errorlns('Directory "' + targetPath + '" already exists');
                grunt.warn('This state already exists');
            }

        }
    });


    grunt.registerMultiTask(
        'sass-directory-imports',
        'Write SASS @import statements to a single file to include a directory\'s entire contents dynamically.',
        function () {
            var srcFiles = this.filesSrc; //grunt.config.get('sass-directory-imports.views.files.src'); //this.filesSrc;
            var destFile = grunt.config.get('sass-directory-imports.views.options.dest');

            var newFileContents = [
                '// This file imports all view styles .scss files in this directory.',
                '// It is automatically generated by the grunt compass-directory-includes task.',
                '// Do not directly modify this file.',
                ''
            ];

            srcFiles.forEach(function (filepath) {
                var includeFile = filepath.replace('app','..');
                newFileContents.push('@import "' + includeFile + '";');
                grunt.log.oklns('@import "' + includeFile + '";');

            });

            newFileContents = newFileContents.join('\n');
            grunt.file.write(destFile, newFileContents);

        }
    );
};
