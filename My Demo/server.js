'use strict';

var lodash = require('lodash');
var express = require('express');
var findIp = require('my-ip');
var http = require('http');
var httpProxy = require('http-proxy');
var argv = require('yargs').argv;
var testConfig = require('./test-config.json');
var rp = require('request-promise');

var port = lodash.isNumber(argv.port) ? argv.port : 80;
var override = argv.override || testConfig.Stage;
var FDSAv2Overrides = testConfig.FDSAv2_Override || '';
var username = argv.username || testConfig.VMSUserID;
var serial = argv.serial || testConfig.SerialNumber;
var buildParent = argv.stage || testConfig.FDSAv2_stage;
var verbose = argv.verbose;

var proxyToken;
var sessionId;

var localhost = testConfig.localhost;
var host =  localhost ? '127.0.0.1:8080':'pa.staging-cauth.factset.com';

var limaOptions = {
  host: 'lima-staging.factset.com',
  port: 80,
  path: '/api-lima/credentials?username=' + username + '&serial=' + serial,
};

// Set session-id to set v2 overrides
function setV2SessionID() {
  // Setting "buildParent" to have "override" value if "FDSAv2_stage" is not passed
  if (buildParent.toString() === '-1') {
    buildParent = override;
  }

  // Setting default value of FDSAv2Overrides if no value is passed
  if (FDSAv2Overrides.toString() === '-1' || FDSAv2Overrides === undefined || FDSAv2Overrides === null) {
    FDSAv2Overrides = [];
  } else {
    FDSAv2Overrides = FDSAv2Overrides.toString().split(',');
  }

  var jsonObj = {
    method: 'POST',
    uri: 'http://lima-gateway-staging.factset.com/services/automation-version/sessions',
    body: {
      overrides: FDSAv2Overrides,
      versions: [buildParent.toLowerCase()],
    },
    json: true,
    headers: {
      'X-DataDirect-Auth-Token': proxyToken,
    },
  };

  return rp(jsonObj).then(function(response) {
    sessionId = response['session-id'];
  });
}

function startServer() {
  var server;
  var app = express();
  var proxy = httpProxy.createProxyServer({});

  proxy.on('proxyReq', function(proxyReq) {
    proxyReq.setHeader('X-Fds-Override-Name', override);
    proxyReq.setHeader('X-Fds-Application-Client', 'chromium-extension');
    proxyReq.setHeader('X-DataDirect-Auth-Token', proxyToken);
    proxyReq.setHeader('X-Requested-With', 'XMLHttpRequest');
    proxyReq.setHeader('Host', host);
    if (localhost) {
      proxyReq.setHeader('Referer', 'http://' + host + '/');
    } else {
      proxyReq.setHeader('Referer', 'https://' + host + '/');
    }
    //proxyReq.setHeader('X-Fdsav2-Session-Id', sessionId);
  });

  proxy.on('error', function(err, req, res) {
    if (verbose) {
      console.error('Handling proxy error: ' + err.name);
      console.error('\t' + err.message);
    }

    res.send('500 Error connecting to remote server from Proxy.');
  });

  app.use(express.static(__dirname + '../../../'));

  app.all('*', function(req, res) {
    if (localhost) {
      proxy.web(req, res, {
        target: 'http://127.0.0.1:8080/',
      });
    } else {
      proxy.web(req, res, {
        secure: false,
        target: 'https://' + host + '/',
        toProxy: true,
      });
    }
  });

  server = app.listen(port, function() {
    var thisIp = findIp();
    var address = {ip: thisIp, port: port || server.address().port};

    console.log('address %s:%d ', address.ip, address.port);

    // Report address if this is a child process
    if (process.send) {
      process.send(address);
    }
  });
}

http.get(limaOptions, function(res) {
  var body = '';
  res.on('data', function(chunk) {
    body += chunk;
  });

  res.on('end', function() {
    proxyToken = JSON.parse(body).token;
    setV2SessionID().then(function() {
      startServer();
    });
  });
})
  .on('error', function(e) {
    console.error('Attempt to get lima token failed with error: ' + e.message);
    process.exit(1);
  });
