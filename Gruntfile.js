module.exports = function (grunt) {
    grunt.initConfig({
        build: {

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

    grunt.loadNpmTasks('grunt-contrib-watch');
};
