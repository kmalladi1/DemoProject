'use strict';

var childProcess = require('child_process');
var dargs = require('dargs');
var path = require('path');
var protractor = require('gulp-protractor');
var testConfig = require('./test-config.json');

var protractorPath = protractor.getProtractorDir() + '/protractor' + (/^win/.test(process.platform) ? '.cmd' : '');

module.exports = function(options, cb) {
  var debugMode = options.debug || false;
  var override = options.override || testConfig.Stage;
  var username = options.username || testConfig.VMSUserID;  // FDS_DEMO_C was chosen because it has stable permissions
  var serialNumber = options.serial || testConfig.SerialNumber;
  var seleniumAddress = options.address || debugMode ? 'http://127.0.0.1:4444/wd/hub' : 'http://swarmtsa01.prod.factset.com:4444/wd/hub';
  var verbose = options.verbose;

  var proxyProcess = childProcess.fork(path.resolve(__dirname, './server.js'), dargs({
    override: override,
    username: username,
    serial: serialNumber,
    verbose: verbose,
    port: /^win/.test(process.platform) ? 8000 : 0,
  }));

  console.log('lima-proxy %s %s %s', override, username, serialNumber);

  // Request location
  proxyProcess.on('message', function(proxyLocation) {
    var protractorArgs = [
      path.normalize(__dirname + '/runme.conf.js'),
      '--baseUrl=' + 'http://' + proxyLocation.ip + ':' + proxyLocation.port,
    ];

    if (verbose) {
      protractorArgs.push('--verbose');
    }

    if (seleniumAddress && debugMode) {
      protractorArgs.push('--seleniumAddress=' + seleniumAddress);
    }

    if (debugMode) {
      protractorArgs.unshift('debug');
    }

    var protractorProcess = childProcess
      .spawn(path.resolve(protractorPath), protractorArgs, {
        stdio: 'inherit',
        env: process.env,
      })
      .on('exit', function(code) {
        // NOTE: We get here when the tests end
        proxyProcess.kill();

        cb(code);
      });

    process.on('exit', function() {
      protractorProcess.kill();
      proxyProcess.kill();
    });
  });
};

var argv = require('yargs').argv;

module.exports(argv, function(code) {
  process.exit(code);
});
