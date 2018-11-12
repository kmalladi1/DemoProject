'use strict';

const fs = require('fs');
var fileName;
if (process.env.BATCH) {
  fileName = './test-configs/' + process.env.BATCH + '/test-config.json';
} else {
  fileName = './test-config.json';
}

let config = require(fileName);

let requestConfigData = {
  RequestJson: {
    vmsusername: config.VMSUserID,
    serialnumber: config.SerialNumber,
  },
};

if (config.FDSAv2_stage !== -1) {
  requestConfigData.RequestJson.fdsav2stage = config.FDSAv2_stage;
}

if (config.FDSAv2_Override !== -1) {
  requestConfigData.RequestJson.fdsav2overrides = config.FDSAv2_Override;
}

if (process.env.JENKINS) {
  requestConfigData.RequestJson.fdsav2overrides = 'test-e2e-pa3';
}

if (config.CaccessCode !== -1) {
  requestConfigData.RequestJson.caccess = config.CaccessCode;
}


const requestConfig = JSON.stringify(requestConfigData);
console.log('Requesting Serial number :' + requestConfig);
const https = require('http');
var options = {
    host: 'tellusstgb02',
    port: 8080,
    method: 'POST',
    path: '/tellusci/ci/request',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Content-Length': requestConfig.length,
    },
  };

let req = https.request(options, res => {
  let responseString = "";
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
    config.SerialNumber = ResponseJson.serialnumber;
    fs.writeFile(fileName, JSON.stringify(config, null, 4), function (err) {
      if (err) return console.log(err);
      console.log('Successfully updated ' + fileName + ' with new serial number: ' + config.SerialNumber);
    });
  } else {
    console.log('No serialnumber present in response.!!!');
  }
};
