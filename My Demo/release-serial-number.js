'use strict';

const fs = require('fs');
let fileName;
if (process.env.BATCH) {
  fileName = './test-configs/' + process.env.BATCH + '/test-config.json';
} else {
  fileName = './test-config.json';
}

let config = require(fileName);

let requestConfigData = {
  RequestJson: {
    serialnumber: config.SerialNumber,
  },
};

const requestConfig = JSON.stringify(requestConfigData);
console.log('Releasing Serial number :' + requestConfig);
const https = require('http');
var options = {
    host: 'tellusstgb02',
    port: 8080,
    method: 'POST',
    path: '/tellusci/ci/release',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Content-Length': requestConfig.length,
    },
  };

let req = https.request(options, res => {
  let responseString = '';
  res.on('data', data => {
    responseString += data;
  });
  res.on('end', () => {
    let response = JSON.parse(responseString);
    updateConfigFile(response.ResponseJson);
    console.log(response.ResponseJson);
  });
  res.on('error', (e) => {
    console.log(e.message);
  });
});

req.write(requestConfig);
req.end();

let updateConfigFile = function(ResponseJson) {
  if (ResponseJson.serialnumber) {
    config.SerialNumber = 'random';
    fs.writeFile(fileName, JSON.stringify(config, null, 4), function(err) {
      if (err) return console.log(err);
      console.log('Successfully released the serial number: ' + ResponseJson.serialnumber);
    });
  } else {
    console.log('No serialnumber present in response.!!!');
  }
};
