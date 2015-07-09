module.exports = function (grunt) {
    grunt.initConfig({
        clean: ['build', '.tmp'],

        copy: {
            app: {
                src: '**/*.html',
                dest: 'build/app',
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

        usemin: {
            html: ['build/app/app.html']
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
    grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build',[
        'clean',
        'copy',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin',
        'usemin'
    ]);
};
