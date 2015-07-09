module.exports = function (grunt) {
    grunt.initConfig({
        clean: ['build', '.tmp'],

        copy: {
            app: {
                src: 'app.html',
                dest: 'build',
                cwd: 'src/app',
                expand: true
            },

            images: {
                src: '*',
                dest: 'build/assets/images',
                cwd: 'src/assets/images',
                expand: true
            }
        },

        useminPrepare: {
            html: 'src/app/app.html',
            options: {
                dest: 'build',
                root: 'src'
            }
        },

        ngtemplates: {
            app: {
                src: 'app/*/**/*.html',
                dest: 'build/app.js',
                cwd: 'src',
                options: {
                    usemin: 'app.js',
                    prefix: '/'
                }
            }
        },

        rev: {
            files: {
                src: ['build/**.{js,css}']
            }
        },

        usemin: {
            html: ['build/app.html'],
            options: {
                assetsDirs: ['build']
            }
        },

        watch: {
            options: {
                livereload: true
            },

            source: {
                expand: true,
                files: ['src/**'],
                tasks: []
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build',[
        'clean',
        'copy',
        'useminPrepare',
        'ngtemplates',
        'concat',
        'uglify',
        'cssmin',
        'rev',
        'usemin'
    ]);
};
