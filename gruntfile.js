/*global module, require */

module.exports = function(grunt) {
    // Load libs
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-handlebars-requirejs');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks("grunt-node-webkit-builder");

    // Setup
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {
                options: {
                    layout: 'byComponent',
                    targetDir: 'www/src/libs/'
                }
            }
        },

        copy: {
            localLibs: {
                cwd: 'src',
                expand: true,
                src: ["**/*"],
                dest: 'www/src/libs'
            },
            images: {
                cwd: 'src/images',
                expand: true,
                src: ['**/*'],
                dest: 'www/images'
            },
            favicon: {
                cwd: 'src/images',
                expand: true,
                src: ['favicon.ico'],
                dest: 'www'
            },
            // FIXME: Should be part of the require deployment
                helpers: {
                cwd: 'src/templates',
                expand: true,
                src: ['helpers/**'],
                dest: 'www/src/templates/'
            },
            //FIXME: Should be part of the require deployment
            templates: {
                cwd: 'tmp/templates/src/',
                expand: true,
                src: ['templates/**/*.js'],
                dest: 'www/src/'
            },
        },

        sass: {
            dist: {
                options: {
                    includePaths: ['src/styles/']
                },
                files: {
                    'www/css/main.css': 'src/styles/main.scss'
                }
            }
        },

        handlebars_requirejs: {
            templates: {
                options: {
                    makePartials: true
                },
                files: {
                    'tmp/templates/': 'src/**/*.hbs'
                }
            }
        },

        requirejs: {
            compile: {
                options: {
                    mainConfigFile: "./src/js/app.js",
                    findNestedDependencies: true,
                    appDir: 'src/js',
                    dir: 'www/src/js',
                    optimize: 'none',
                    generateSourceMaps: true,
                    preserveLicenseComments: false,
                    keepBuildDir: false,
                    inlineText: true,
                    removeCombined: true,
                    stubModules: ['text']
                }
            }
        },

        jshint: {
            files: [
                'gruntfile.js',
                'src/**/*.js',
                'test/**/*.js'
            ],
            options: {
                globals: {
                    console: true
                },
                undef: true,
            }
        },

        jslint: {
            default: {
                src: [
                    'src/**/*.js'
                ]
           },
           ci: {
                src: [
                    'src/**/*.js',
                    'test/**/*.js'
                ],
                options: {
                    failOnError: false,
                    checkstyle: 'jslint.xml',
                }
           }
        },

        clean: {
            build: ['buildtmp', 'tmp', 'www/css', 'www/src', 'www/images', 'jslint.xml', 'xunit.xml'],
            bower: ['bower_components']
        },

        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                pushTo: 'origin',
                commitFiles: ['package.json', 'bower.json']
            }
        },

        watch: {
            //Install browser extension to get watch to trigger automatic
            //browser reload: http://goo.gl/o7SBk
            options: {
                livereload: true
            },
            scripts: {
                files: ['src/**/*.js', 'bower.json', 'gruntfile.js'],
                tasks: ['default'],
                options: {
                    atBegin: true
                }
            },
            templates: {
                files: ['src/templates/**'],
                tasks: ['handlebars_requirejs', 'copy:templates']
            },
            lib: {
                files: ['lib/**'],
                tasks: ['copy:lib']
            },
            stylesheets: {
                files: ['src/styles/**'],
                tasks: ['sass']
            },
            tests: {
                files: ['test/**'],
                tasks: ['test']
            },
            images: {
                files: ['src/images/**'],
                tasks: ['copy:images']
            },
            files: {
                files: ['www/index.html'],
                //Just reload in browser
            }
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'www'
                    // middleware: function (connect, options) {
                    //     var config = [
                    //         // Serve static files.
                    //         connect.static(options.base),
                    //         // Make empty directories browsable.
                    //         connect.directory(options.base)
                    //     ];
                    //     var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                    //     config.unshift(proxy);
                    //     return config;
                    // }
                }
            },
            test: {
                options: {
                    port: 9002,
                    base: '.'
                }
            },
            proxies: [
                //Proxy urls starting with /touch to nesstar-dev to prevent
                //same-origin problems when talking to rest server.
                {
                    // context: '/touch',
                    // host: 'nesstar-dev.nsd.uib.no',
                    // port: 80,
                    context: '/',
                    host: 'localhost',
                    port: 3000,
                    https: false,
                    changeOrigin: false,
                    xforward: false
                }
            ]
        },

        mocha: {
            default: {
                options: {
                    urls: [ 'http://localhost:9002/test/index.html' ]
                }
            },
            ci: {
                options: {
                    reporter: 'xunit-file',
                    urls: [ 'http://localhost:9002/test/index.html' ]
                }
            }
        },

        nodewebkit: {
            options: {
                app_name: "nodewebkitapp",
                build_dir: "./webkitbuilds",
                win: true,
                mac: false
            },
            src: ["www/**/*"] 
        }
   });

    // Tasks
    /* jshint scripturl: true */
    grunt.registerTask('test', [
        'jshint',
        'connect:test',
        'mocha:default'
    ]);

    grunt.registerTask('lint', [
        'jslint:default'
    ]);

    grunt.registerTask('build', [
        'handlebars_requirejs',
        'requirejs',
        'sass',
        'copy',
        'bower'
    ]);

    grunt.registerTask('server', [
        'configureProxies',
        'connect:server',
        'watch'
    ]);

    grunt.registerTask('ci', [
        'build',
        'connect:test',
        'mocha:ci',
        'jslint:ci',
        "nodewebkit"
    ]);

    grunt.registerTask('default', [
        'build',
        'test',
        'lint'
    ]);
};
