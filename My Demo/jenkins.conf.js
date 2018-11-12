var protractorConfig = require('./conf.js');

var specs;

switch (process.env.BATCH) {
  case 'batch1':
    specs = [

      // Accounts
      './lib/specs/accounts/*.spec.js',

      // Right-Click
      './lib/specs/right-click-1/*.spec.js',

      // Smart Cache (Retired tests)
      //'./lib/specs/smart-cache/*.spec.js',

      // Smart Caching Dev (Retired tests)
      // './lib/specs/smart-caching-dev/*.spec.js',

      // Smart Caching SM (Retired tests)
      // './lib/specs/smart-caching-sm/*.spec.js',

      // Tile-Options - scenarios
      './lib/specs/tile-options/scenarios/*.spec.js',

      // Tile-Options - universe
      './lib/specs/tile-options/universe/*.spec.js',

      // Tile-Options - risk
      './lib/specs/tile-options/risk/*.spec.js',

    ];
    break;
  case 'batch2':
    specs = [

      // Audit
      './lib/specs/audit/*.spec.js',

      // BVT (Retired tests)
      //'./lib/specs/bvt - pa3/*.spec.js',

      // Caching (these tests need to be run with different caccess)
      // './lib/specs/caching/*.spec.js',

      // Caching-service (these tests need to be run with different caccess)
      //'./lib/specs/caching-service/*.spec.js',

      // lot-level-data (these tests need to be run with different caccess)
      //'./lib/specs/lot-level-data/*.spec.js',

      './lib/specs/pa3-url-test.spec.js',

      // FDSWeb (New tests)
      './lib/specs/fdsweb/*.spec.js',

      // LHP
      './lib/specs/lhp/*.spec.js',

      // Charts
      './lib/specs/charts/*.spec.js',

    ];
    break;
  case 'batch3':
    specs = [

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

    // Tile-Options - exclusions
    './lib/specs/tile-options/exclusions/*.spec.js',

    // TRU
    './lib/specs/tru/*.spec.js',

    ];
    break;
  case 'batch4':
    specs = [

      // Fixed Income Analytics Override
      './lib/specs/fi-anoverride/*.spec.js',

      // General
      './lib/specs/general/*.spec.js',

      // georev
      './lib/specs/georev/*.spec.js',

      // Report
      './lib/specs/report/*.spec.js',

      // Tile-Options - groupings
      './lib/specs/tile-options/groupings/*.spec.js',

    ];
    break;
  case 'batch5':
    specs = [

      // Tile-Options - Columns
      './lib/specs/tile-options/columns/*.spec.js',

      // Tile-Options - Dates
      './lib/specs/tile-options/dates/*.spec.js',

      // Toolbar
      './lib/specs/toolbar/*.spec.js',

    ];
    break;
  default:
    specs = [];
}

protractorConfig.config.specs = specs;
protractorConfig.config.jasmineNodeOpts.includeStackTrace = false;
protractorConfig.config.jasmineNodeOpts.isVerbose = false;
protractorConfig.config.jasmineNodeOpts.print = function() {};

exports.config = protractorConfig.config;
