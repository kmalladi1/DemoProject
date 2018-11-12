// Variable(s)
var path = require('path');
var confPath = __dirname;
require('@fds/qa-protractor-common');
CommonConfiguration.getBrowserParamsPath(confPath);

if (process.env.JENKINS) {
  CommonConfiguration.getTestConfigPath(confPath + process.env.CONF_PATH);
}

exports.config = {
  framework: 'jasmine',
  allScriptsTimeout: 480000,
  onPrepare: function() {
    require('@fds/qa-protractor-common');
    CommonConfiguration.onPrepare(!!process.env.JENKINS);
  },
  baseUrl: CommonConfiguration.baseURL(),
  rootElement: '[ng-app]',
  seleniumAddress: CommonConfiguration.getBrowserInfo().hubURL,
  seleniumArgs: CommonConfiguration.seleniumArgsValue(),
  directConnect: JSON.parse(CommonConfiguration.getBrowserInfo().bDirectConnect.toString()),
  capabilities: CommonConfiguration.browserConf()[0],
  chromeDriver: CommonConfiguration.chromeDriverLocation(),
  jasmineNodeOpts: {
    isVerbose: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 480000,
  },

  // Spec patterns are relative to conf.js when Protractor is called.
  specs: [],

  params: {
    path: __dirname,
  },

};
