'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      assemble: {
        files: [
          'src/{assets,content,data,templates}/{,*/}*.{scss,md,hbs,html,yml}'
        ],
        tasks: ['build']
      },
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs'
        },
        files: {
          '<%= config.dist %>/': [
            '<%= config.src %>/templates/pages/*.html'
          ]
        }
      }
    },

    sass: {
       dist: {
         files: {
           'dist/assets/css/app.css': 'src/assets/app.scss'
         }
       }
    },
    copy: {
      bootstrap: {
        expand: true,
        cwd: 'bower_components/bootstrap/dist/',
        src: '**',
        dest: '<%= config.dist %>/assets/'
      }
    },
    clean: ['<%= config.dist %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble');

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'sass',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
