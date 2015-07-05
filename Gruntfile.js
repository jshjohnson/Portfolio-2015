'use strict';
 
module.exports = function(grunt) {
    // Show elapsed time after tasks run
    require('time-grunt')(grunt);
    // Load all Grunt tasks
    require('jit-grunt')(grunt, {
        buildcontrol: 'grunt-build-control',
    });
    
    grunt.initConfig({
        app: {
            app: 'app',
            dist: 'dist',
            baseurl: ''
        },
        
        watch: {
            sass: {
                files: ['<%= app.app %>/assets/scss/**/*.{scss,sass}'],
                tasks: ['sass:server', 'autoprefixer', 'cssmin']
            },
            scripts: {
                files: ['<%= app.app %>/assets/js/**/*.{js}'],
                tasks: ['uglify']
            },
            jekyll: {
                files: [
                    '<%= app.app %>/**/*.{html,yml,md,mkd,markdown}'
                ],
                tasks: ['jekyll:server']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '.jekyll/**/*.{html,yml,md,mkd,markdown}',
                    '.tmp/<%= app.baseurl %>/assets/css/*.css',
                    '.tmp/<%= app.baseurl %>/assets/js/*.js',
                    '<%= app.app %>/assets/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
                ]
            }
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: {
                        target: 'http://localhost:9000/<%= app.baseurl %>'
                    },
                    base: [
                        '.jekyll',
                        '.tmp',
                        '<%= app.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: {
                        target: 'http://localhost:9000/<%= app.baseurl %>'
                    },
                    base: [
                        '<%= app.dist %>',
                        '.tmp'
                    ]
                }
            }
        },

        clean: {
            server: [
                '.jekyll',
                '.tmp'
            ],
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= app.dist %>/*',
                        '!<%= app.dist %>/.git*'
                    ]
                }]
            }
        },

        jekyll: {
            options: {
                config: '_config.yml,_config.build.yml',
                src: '<%= app.app %>'
            },
            dist: {
                options: {
                    dest: '<%= app.dist %>/<%= app.baseurl %>',
                }
            },
            server: {
                options: {
                    config: '_config.yml',
                    dest: '.jekyll/<%= app.baseurl %>'
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    removeEmptyAttributes: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.dist %>/<%= app.baseurl %>',
                    src: '**/*.html',
                    dest: '<%= app.dist %>/<%= app.baseurl %>'
                }]
            }
        },

        uglify: {
            options: {
                preserveComments: false
            },
            dist: {
                files: {
                    '.tmp/<%= app.baseurl %>/assets/js/scripts.js': ['<%= app.app %>/assets/js/**/*.js']
                }
            }
        },

        sass: {
            server: {
                options: {
                    quiet: false,
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.app %>/assets/scss',
                    src: '**/*.{scss,sass}',
                    dest: '.tmp/<%= app.baseurl %>/assets/css',
                    ext: '.css'
                }]
            },
            dist: {
                options: {
                    bundleExec: true,
                    debugInfo: false,
                    lineNumbers: false,
                    precision: 8,
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.app %>/assets/scss',
                    src: '**/*.{scss,sass}',
                    dest: '<%= app.dist %>/<%= app.baseurl %>/assets/css',
                    ext: '.css'
                }]
            },
        },

        uncss: {
            options: {
                htmlroot: '<%= app.dist %>/<%= app.baseurl %>',
                report: 'gzip'
            },
            dist: {
                src: '<%= app.dist %>/<%= app.baseurl %>/**/*.html',
                dest: '<%= app.dist %>/<%= app.baseurl %>/assets/css/screen.css'
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 3 versions']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/<%= app.baseurl %>/assets/css',
                    src: '**/*.css',
                    dest: '.tmp/<%= app.baseurl %>/assets/css'
                }]
            }
        },

        cssmin: {
            dist: {
                options: {
                    keepSpecialComments: 0,
                    check: 'gzip'
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.dist %>/<%= app.baseurl %>/assets/css',
                    src: ['*.css'],
                    dest: '<%= app.dist %>/<%= app.baseurl %>/assets/css',
                }]
            }
        },

        imagemin: {
            options: {
                progressive: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= app.dist %>/<%= app.baseurl %>/assets/img',
                    src: '**/*.{jpg,jpeg,png,gif}',
                    dest: '<%= app.dist %>/<%= app.baseurl %>/assets/img'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= app.dist %>/<%= app.baseurl %>/assets/img',
                    src: '**/*.svg',
                    dest: '<%= app.dist %>/<%= app.baseurl %>/assets/img'
                }]
            }
        },

        copy: {
            inlinecss: {
                files: [{
                        expand: true, 
                        flatten: true, 
                        src: ['.tmp/<%= app.baseurl %>/assets/css/screen.css'], 
                        dest: '<%= app.app %>/<%= app.baseurl %>/_includes/', 
                        filter: 'isFile',
                        rename: function(dest, matchedSrcPath, options) {
                            // return the destination path and filename:
                            return (dest + matchedSrcPath).replace('.css', '.html');
                        }
                    },
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '.tmp/<%= app.baseurl %>',
                    src: [
                        'css/**/*',
                        'js/**/*'
                    ],
                    dest: '<%= app.dist %>/<%= app.baseurl %>'
                }]
            }
        },

        buildcontrol: {
            dist: {
                options: {
                    dir: '<%= app.dist %>/<%= app.baseurl %>',
                    remote: 'git@github.com:jshjohnson/jshjohnson.github.io.git',
                    branch: 'master',
                    commit: true,
                    push: true,
                    connectCommits: false
                }
            }
        }
    });
 
    // Define Tasks
    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }
 
        grunt.task.run([
            'clean:server',
            'jekyll:server',
            'sass:server',
            'autoprefixer',
            'uncss',
            'cssmin',
            // 'copy:inlinecss',
            'uglify',
            'connect:livereload',
            'watch'
        ]);
    });
 
    grunt.registerTask('build', [
        'clean:dist',
        'jekyll:dist',
        'imagemin',
        'svgmin',
        'sass:dist',
        'autoprefixer',
        'uncss',
        'cssmin',
        // 'copy:inlinecss',
        'uglify',
        'htmlmin',
        'copy',
    ]);
 
    grunt.registerTask('deploy', [
        'build',
        'buildcontrol'
    ]);
    
    grunt.registerTask('default', [
        'serve'
    ]);
};