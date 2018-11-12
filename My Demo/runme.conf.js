// Check if chromedriver.exe path is correct
var fs  = require('fs');
var path = require('path');
var chrmDriverPath;

if(fs.existsSync(path.resolve(__dirname + '/../../protractor/node_modules/webdriver-manager/selenium/chromedriver_2.28.exe'))) {
  chrmDriverPath = path.resolve(__dirname + '/../../protractor/node_modules/webdriver-manager/selenium/chromedriver_2.28.exe');
} else if(fs.existsSync(path.resolve(__dirname + '/node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.28.exe'))) {
  chrmDriverPath = path.resolve(__dirname + '/node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.28.exe');
}

exports.config = {
  // Setting the parameters to use chromedriver.exe for running the script
  chromeDriver: chrmDriverPath,
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    browserName: 'chrome',
    version: '54',
    chromeOptions: {
      args: ['start-maximized', 'disable-extensions'],
      prefs: {
        credentials_enable_service: false,
        profile: {
          password_manager_enabled: false,
        },
      },
    },
  },

  onPrepare: function() {
    var jasmineReporters = require('jasmine-reporters');
    var junitReporter = new jasmineReporters.JUnitXmlReporter({
      savePath: __dirname + '/Logs',
      consolidateAll: true,
    });
    jasmine.getEnv().addReporter(junitReporter);

    // Add module to give more verbose output
    let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
  },

  params: {
    path: __dirname,
  },

  allScriptsTimeout: 480000,

  // Spec patterns are relative to conf.js
  specs: [

    // Accounts
    './lib/specs/accounts/*.spec.js',

    // Audit
    './lib/specs/audit/*.spec.js',

    // BVT (Retired tests)
    //'./lib/specs/bvt - pa3/*.spec.js',

    // Caching (these tests need to be run with different caccess)
    // './lib/specs/caching/*.spec.js',

    // Caching-service (these tests need to be run with different caccess)
    //'./lib/specs/caching-service/*.spec.js',

    // Charts
    './lib/specs/charts/*.spec.js',

    // Document Options - asset-types
    './lib/specs/document-options/asset-types/*.spec.js',

    // Document Options - dates
    './lib/specs/document-options/dates/*.spec.js',

    // Document Options - fixed-income
    './lib/specs/document-options/fixed-income/*.spec.js',

    // Document Options - pricing
    './lib/specs/document-options/pricing/*.spec.js',

    // Document Options - risk
    './lib/specs/document-options/risk/*.spec.js',

    // FDSWeb (New tests)
    './lib/specs/fdsweb/*.spec.js',

    // Fixed Income Analytics Override
    './lib/specs/fi-anoverride/*.spec.js',

    // General
    './lib/specs/general/*.spec.js',

    // georev
    './lib/specs/georev/*.spec.js',

    // LHP
    './lib/specs/lhp/*.spec.js',
    
    // lot-level-data (these tests need to be run with different caccess)
    //'./lib/specs/lot-level-data/*.spec.js',

    // Report
    './lib/specs/report/*.spec.js',

    // Right-Click
    './lib/specs/right-click-1/*.spec.js',

    // Smart Cache (Retired tests)
    //'./lib/specs/smart-cache/*.spec.js',

    // Smart Caching Dev (Retired tests)
    // './lib/specs/smart-caching-dev/*.spec.js',

    // Smart Caching SM (Retired tests)
    // './lib/specs/smart-caching-sm/*.spec.js',

    // Tile-Options - Columns
    './lib/specs/tile-options/columns/*.spec.js',

    // Tile-Options - Dates
    './lib/specs/tile-options/dates/*.spec.js',

    // Tile-Options - exclusions
    './lib/specs/tile-options/exclusions/*.spec.js',

    // Tile-Options - groupings
    './lib/specs/tile-options/groupings/*.spec.js',

    // Tile-Options - risk
    './lib/specs/tile-options/risk/*.spec.js',

    // Tile-Options - scenarios
    './lib/specs/tile-options/scenarios/*.spec.js',

    // Tile-Options - universe
    './lib/specs/tile-options/universe/*.spec.js',

    // Toolbar
    './lib/specs/toolbar/*.spec.js',

    // TRU
    './lib/specs/tru/*.spec.js',

    './lib/specs/pa3-url-test.spec.js',
  ],

  rootElement: 'body',

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    print: function() {
    },
    includeStackTrace: true,
    defaultTimeoutInterval: 480000,
  },
};
