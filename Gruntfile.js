module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js: {
        src: [
          'public/javascript/*.js'
        ],
        dest: 'public/javascript/concat.js'
      }
    },

    uglify: {
      build: {
        src: 'public/javascript/concat.js',
        dest: 'public/javascript/script.js'
      }
    },

    watch: {
      options: {
        livereload: true
      },

      html_source: {
        files: [
          'app/*.ejs',
          'app/admin/*.ejs',
          'app/_partials/*.ejs'
        ],
        tasks: []
      },

      js_source: {
        files: [
          'public/javascript/*.js'
        ],
        tasks: []
      },

      css_source: {
        files: [
          'public/css/*.js'
        ],
        tasks: []
      },

      image_source: {
        files: [
          'public/images/*.*'
        ],
        tasks: []
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify']);
};
