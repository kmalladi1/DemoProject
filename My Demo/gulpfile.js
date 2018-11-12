'use strict';

var gulp = require('gulp');
var NodeLibraryBuild = require('@fds/gulp-node-lib-build');

// Custom config to remove e2e from `gulp test`
var config = {
  node: {
    mocha: {
      source: [
        './test/unit/**/*.spec.js',
      ],
    },
  },
};

// gulp.registry(new NodeLibraryBuild()); // orig
gulp.registry(new NodeLibraryBuild(config));

const noop = function noop(done) {
  console.log('\nPlease use grunt task in PA3 gruntfile to release.....\n');
  return done();
};

gulp.task('release', noop);
