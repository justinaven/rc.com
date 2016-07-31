module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        autoprefixer: {
          main: {
            options: {
              browsers: ['> 1%', 'last 2 versions', 'ie >= 8'],
              map: true
            },
            src: 'css/*.css'
          }
        },

        clean: [".sass-cache"],

        concat: {
            dist: {
                files: {
                    'js/global.js' : [
                    'js/scripts/logging.js',
                    'vendor/prism.js',
                    'js/scripts/custom.js'
                    ]
                }
            },

            ie: {
                files: {
                    'js/ie.js' : [
                    'vendor/html5shiv/dist/html5shiv.js',
                    'vendor/selectivizr/selectivizr.js'
                    ]
                }
            }
        },

        concurrent: {
            target: {
                tasks: ['jekyll:server', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        jekyll: {
            server: {
                options: {
                    serve: true
                }
            },
            dev: {
            }
        },


        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'true'
                },
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        scsslint: {
            files: 'sass/**/*.scss',
            options: {
                config: '.scss-lint.yml',
                reporterOutput: null,
                colorizeOutput: true,
                compact: true,
                // force: true
            }
        },

        uglify: {
            dist: {
                files: [{
                expand: true,
                cwd: 'js',
                src: ['*.js', '!*.min.js'],
                dest: 'js',
                ext: '.min.js'
                }]
            }
        },

        watch: {
            css: {
                files: 'sass/**/*.scss',
                tasks: ['scsslint', 'sass', 'autoprefixer'],
                options: {
                    spawn: false,
                    interrupt: true,
                    livereload: true
                }
            },

            js: {
                files: 'js/**/*.js',
                tasks: ['concat:dist', 'uglify'],
                options: {
                    spawn: false,
                    interrupt: true
                }
            },

            jekyll: {
                files: ['**/*', '!node_modules/**', '!_site/**'],
                tasks: ['jekyll:dev'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        }
    });

    // on watch events configure scsslint to only run on changed file
    grunt.event.on('watch', function(action, filepath) {
        grunt.config('scsslint.files', filepath);
    });

    grunt.registerTask('default', ['clean', 'sass', 'autoprefixer', 'concat', 'uglify', 'concurrent:target', 'watch']);

    // plugin tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-scss-lint');
}
