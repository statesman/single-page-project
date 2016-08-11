var fs = require("fs");
var request = require("request");

module.exports = function(grunt) {
  'use strict';

  var config = {
    // the site section to publish to
    site_dir: "news",

    // the endpoint to publish to
    site_path: "single-page-project",

    // name of your notifier slack bot
    slack_username: "Neckbeard Bot",

    // slack emoji (don't forget the colons)
    slack_icon_emoji: ":neckbeard:"
  };

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

    // Squish all that js into one file
    uglify: {
      options: {
        sourceMap: true
      },
      prod: {
        files: {
          'public/dist/scripts.js': [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/underscore/underscore.js',
            'node_modules/bootstrap/js/button.js',
            'node_modules/bootstrap/js/collapse.js',
            'node_modules/bootstrap/js/dropdown.js',
            'node_modules/bootstrap/js/transition.js',
            'src/js/main.js'
          ]
        }
      }
    },

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
        files: ['public/*.php', 'public/includes/*.inc']
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

    ftpush: {
      stage: {
        auth: {
          host: 'host.coxmediagroup.com',
          port: 21,
          authKey: 'cmg'
        },
        src: 'public',
        dest: ['/stage_aas/projects', config.site_dir, config.site_path].join("/"),
        exclusions: ['dist/tmp', 'Thumbs.db', '.DS_Store'],
        simple: false,
        useList: false
      },
      prod: {
        auth: {
          host: 'host.coxmediagroup.com',
          port: 21,
          authKey: 'cmg'
        },
        src: 'public',
        dest: ['/prod_aas/projects', config.site_dir, config.site_path].join("/"),
        exclusions: ['dist/tmp', 'Thumbs.db', '.DS_Store'],
        simple: false,
        useList: false
      }
    }

  });

  // register a custom task to hit slack
  grunt.registerTask('slack', function(where_dis_go) {

    // first, check to see if there's a .slack file
    // (this file has the webhook endpoint)
    if (grunt.file.isFile('.slack')) {

      // homeboy here runs async, so
      var done = this.async();

      // prod or stage?
      var ftp_path = where_dis_go === "prod" ? ["http://projects.statesman.com", config.site_dir, config.site_path].join("/") : ["http://stage.host.coxmediagroup.com/aas/projects", config.site_dir, config.site_path].join("/");

      var payload = {
        "text": "hello yes i am pushing code to *" + config.site_path + "*: " + ftp_path,
        "channel": "#bakery",
        "username": config.slack_username,
        "icon_emoji": config.slack_icon_emoji
      };

      // send the request
      request.post({
          url: fs.readFileSync('.slack', {
            encoding: 'utf8'
          }),
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

  grunt.registerTask('default', ['copy', 'less', 'jshint', 'bootlint', 'uglify']);
  grunt.registerTask('stage', ['default', 'ftpush:stage', 'slack:stage']);
  grunt.registerTask('prod', ['default', 'ftpush:prod', 'slack:prod']);

};
