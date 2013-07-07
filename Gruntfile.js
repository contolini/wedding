module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    /**
     * Pull in the package.json file so we can read its metadata.
     */
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Here's a banner with some template variables.
     * We'll be inserting it at the top of minified assets.
     */
    banner: {

      jquery:
        '/*!\n' +
         '  * jQuery JavaScript Library v1.10.1\n' +
         '  * http://jquery.com/\n' +
         '  *\n' +
         '  * Includes Sizzle.js\n' +
         '  * http://sizzlejs.com/\n' +
         '  *\n' +
         '  * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors\n' +
         '  * Released under the MIT license\n' +
         '  * http://jquery.org/license\n' +
         '  *\n' +
         '  * Date: 2013-05-30T21:25Z\n' +
         '  */\n\n',

      sizzle:
        '/* Sizzle CSS Selector Engine v1.9.4-pre\n' +
         '  * http://sizzlejs.com/\n' +
         '  *\n' +
         '  * Copyright 2013 jQuery Foundation, Inc. and other contributors\n' +
         '  * Released under the MIT license\n' +
         '  * http://jquery.org/license\n' +
         '  *\n' +
         '  * Date: 2013-05-27\n' +
         '  */\n\n'

    },

    /**
     * LESS: https://github.com/gruntjs/grunt-contrib-less
     * 
     * Compile LESS files to CSS.
     */
    less: {
      main: {
        options: {
          paths: ['src/static']
        },
        files: {
          'dist/static/css/main.css': ['src/static/less/main.less']
        }
      }
    },

    /**
     * CSSMin: https://github.com/gruntjs/grunt-contrib-cssmin
     * 
     * Compress CSS files.
     */
    cssmin: {
      combine: {
        files: {
          'dist/static/css/main.min.css': ['dist/static/css/main.css']
        }
      }
    },

    /**
     * JSHint: https://github.com/gruntjs/grunt-contrib-jshint
     * 
     * Validate files with JSHint.
     * Below are options that conform to idiomatic.js standards.
     * Feel free to add/remove your favorites: http://www.jshint.com/docs/#options
     */
    jshint: {
      options: {
        camelcase: true,
        curly: true,
        eqeqeq: true,
        forin: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        quotmark: true,
        sub: true,
        undef: true,
        boss: true,
        evil: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
          $: true,
          Backbone: true,
          _: true,
          module: true,
          require: true,
          define: true,
          console: true
        }
      },
      files: ['Gruntfile.js', 'src/static/js/**/*.js']
    },

    /**
     * Shell: https://github.com/sindresorhus/grunt-shell
     * 
     * Grunt task to run shell commands.
     * For now we're just copying the src file over to dist and
     * zipping the example directory.
     */
    shell: {
      packageExample: {
        command: [
          'cp src/* dist/',
          'cp src/static/vendor/video.js/video-js.swf dist/static/video-js.swf'
        ].join('&&')
      }
    },

    /**
     * Uglify: https://github.com/gruntjs/grunt-contrib-uglify
     * 
     * Minify JS files.
     * Make sure to add any other JS libraries/files you'll be using.
     */
    uglify: {
      options: {
        banner: '<%= banner.jquery %> <%= banner.sizzle %>',
        beautify: true
      },
      main: {
        files: {
          'dist/static/js/main.min.js': [
            'src/static/vendor/jquery/jquery.js',
            'src/static/vendor/jquery-ui/ui/jquery-ui.js',
            'src/static/vendor/jquery-ui/ui/jquery.ui.mouse.js',
            'src/static/vendor/jquery-ui/ui/jquery.ui.slider.js',
            'src/static/vendor/imagesloaded/imagesloaded.min.js',
            'src/static/vendor/video.js/video.js',
            'src/static/vendor/FitText.js/jquery.fittext.js',
            'src/static/js/bigvideo.js',
            'src/static/js/plugins.js',
            'src/static/js/main.js'
          ]
        }
      }
    },

    /**
     * Connect: https://github.com/gruntjs/grunt-contrib-connect
     * 
     * Start a connect web server.
     */
    connect: {
      demo: {
        options: {
          port: 8000,
          base: 'dist'
        }
      }
    },

    /**
     * Watch: https://github.com/gruntjs/grunt-contrib-watch
     * 
     * Run predefined tasks whenever watched file patterns are added, changed or deleted.
     * Add files to monitor below.
     */
    watch: {
      scripts: {
        files: ['src/**/*.html', 'src/static/**/*.less', 'src/static/**/*.js'],
        tasks: ['build']
      }
    }

  });

  /**
   * The above tasks are loaded here.
   */
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-connect');

  /**
   * Create task aliases by registering new tasks
   */
  grunt.registerTask('build', ['uglify', 'shell', 'less', 'cssmin']);

  /**
   * The 'default' task will run whenever `grunt` is run without specifying a task
   */
  grunt.registerTask('default', ['connect:demo', 'watch']);

};
