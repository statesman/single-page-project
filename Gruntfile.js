var fs = require("fs");
var request = require("request");

module.exports = function(grunt) {
  'use strict';

  // This is the slug title of the project
  // For example, "single-page-project"
  var slug = "";

  // This is the projects folder where the project will be deployed
  // For example:
  //     Enter "news" for http://projects.statesman.com/news
  //     Enter "sports" for http://projects.statesman.com/sports
  var projectsDirectory = "";

  // This is the directory path to your project on the stage/prod servers
  var site_path = projectsDirectory + "/" + slug;

  // Project configuration.
  grunt.initConfig({

    // Copy FontAwesome files to the fonts/ directory
    copy: {
      fonts: {
        src: 'node_modules/font-awesome/fonts/**',
        dest: 'public/fonts/',
        flatten: true,
        expand: true
      }
    },

    // Transpile LESS
    less: {
      options: {
        sourceMap: true,
        paths: ['node_modules/bootstrap/less']
      },
      prod: {
        options: {
          compress: true,
          cleancss: false
        },
        files: {
          "public/dist/style.css": "src/less/style.less"
        }
      }
    },


    // Run our JavaScript through JSHint
    jshint: {
      js: {
        src: ['src/js/**.js']
      }
    },
    // Use Uglify to bundle up a pym file for the home page
    uglify: {
      options: {
        sourceMap: true
      },
      prod: {
        files: {
          'public/dist/scripts.js': [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/bootstrap/js/button.js',
            'node_modules/bootstrap/js/collapse.js',
            'node_modules/bootstrap/js/dropdown.js',
            'node_modules/bootstrap/js/transition.js',
            'src/js/main.js'
          ]
        }
      }
    },

// jqury, button, collapse, transition, dropdown

    // Lint our Bootstrap usage
    bootlint: {
      options: {
        relaxerror: ['W005']
      },
      files: 'public/**.php',
    },

    // Watch for changes in LESS and JavaScript files,
    // relint/retranspile when a file changes
    watch: {
      options: {
        livereload: true
      },
      markup: {
        files: ['public/*.php','public/includes/*.inc']
      },
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['jshint', 'uglify']
      },
      styles: {
        files: ['src/less/**/*.less'],
        tasks: ['less']
      }
    },

    // stage path needs to be set
    ftpush: {
      stage: {
        auth: {
          host: 'host.coxmediagroup.com',
          port: 21,
          authKey: 'cmg'
        },
        src: 'public',
        dest: '/stage_aas/projects/' + site_path,
        exclusions: ['dist/tmp','Thumbs.db','.DS_Store'],
        simple: false,
        useList: false
      },
      // prod path will need to change
      prod: {
        auth: {
          host: 'host.coxmediagroup.com',
          port: 21,
          authKey: 'cmg'
        },
        src: 'public',
        dest: '/stage_aas/projects/' + site_path,
        exclusions: ['dist/tmp','Thumbs.db','.DS_Store'],
        simple: false,
        useList: false
      }
    }



  });

  // register a custom task to hit slack
  grunt.registerTask('slack', function(where_dis_go) {

      // first, check to see if there's a .slack file
      // (this file has the webhook endpoint)
      if(grunt.file.isFile('.slack')) {

          // homeboy here runs async, so
          var done = this.async();

          // prod or stage?
          var ftp_path = where_dis_go === "prod" ? "http://projects.statesman.com/" + site_path : "http://stage.host.coxmediagroup.com/aas/projects/" + site_path;

          // do whatever makes you feel happy here
          var payload = {
              "text": "yo dawg i heard you like pushing code to *" + slug + "*: " + ftp_path,
              "channel": "#bakery",
              "username": "Xzibit",
              "icon_url": "http://projects.statesman.com/slack/icon_img/xzibit.jpg"
          };

          // send the request
          request.post(
              {
                  url: fs.readFileSync('.slack', {encoding: 'utf8'}),
                  json: payload
              },
              function callback(err, res, body) {
                  done();
                  if (body !== "ok") {
                      return console.error('upload failed:', body);
                  }
              console.log('we slacked it up just fine people, good work');
          });
      }
      // if no .slack file, log it
      else {
          grunt.log.warn('No .slack file exists. Skipping Slack notification.');
      }
  });

  // Load the task plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ftpush');
  grunt.loadNpmTasks('grunt-bootlint');

  grunt.registerTask('default', ['copy', 'less', 'jshint','bootlint','uglify']);
  grunt.registerTask('stage', ['default','ftpush:stage','slack:stage']);
  grunt.registerTask('prod', ['default','ftpush:prod','slack:prod']);

};
