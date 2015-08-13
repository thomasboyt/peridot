module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    secret: grunt.file.readYAML('_private.yml'),

    // TODO: This won't rm removed resources automatically!
    sftp: {
      options: {
        path: '<%= secret.ssh_path %>',
        host: '<%= secret.ssh_host %>',
        username: '<%= secret.ssh_username %>',
        agent: process.env.SSH_AUTH_SOCK,
        showProgress: true,
        createDirectories: true
      },

      posts: {
        options: {
          srcBasePath: '_site/',
        },
        files: {
          './': ['_site/**']
        }
      },

      public: {
        options: {
          srcBasePath: 'public/',
        },
        files: {
          './': ['public/**']
        }
      }
    },

    exec: {
      build: './bin/nite-flights build'
    }

  });

  grunt.registerTask('deploy', ['exec:build', 'sftp']);
};
