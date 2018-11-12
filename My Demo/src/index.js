/*global webdriver:true*/

// Requiring other modules
require('selenium-webdriver');

// Import the helpers
TestHelpers = require('@fds/thief-angular-testing');

// Requiring all page object of PLM
//require(__dirname + '/../../PageObjects/PLM/all-page-objects.po.js');

// Requiring "qa-protractor-common"
require('@fds/qa-protractor-common');

// Requiring "qa-test-plm"
require('@fds/qa-test-plm');

// Requiring "Thief grid"
ThiefAngularGrid = require('@fds/thief-angular-grid/lib/grid');

// Requiring loadash
_ = require('lodash');

// Requiring bluebird
bluebird = require('bluebird');

// Creating objects for all the page objects
Utilities = require(__dirname + '/page-objects/utilities.po.js');
SlickGridFunctions = require(__dirname + '/page-objects/slick-grid-functions.po');

// PA3 application
PA3MainPage = require(__dirname + '/page-objects/pa3-main-page.po');
PA3EditMode = require(__dirname + '/page-objects/pa3-edit-mode.po');
PA3EditReportList = require(__dirname + '/page-objects/lhp/pa3-edit-report-list.po');
PA3EditChartMode = require(__dirname + '/page-objects/charting/pa3-edit-chart-mode.po');
Japanese = require(__dirname + '/page-objects/japanese.po');
ChartingUtilities = require(__dirname + '/page-objects/charting/charting-utilities.po');
DeleteConfirmationDialog = require(__dirname + '/page-objects/lhp/delete-confirmation-dialog.po');
DocumentOptions = require(__dirname + '/page-objects/document-options/document-options.po');
TileOptions = require(__dirname + '/page-objects/tile-options/tile-options.po');
GroupingManager = require(__dirname + '/page-objects/grouping-manager.po');
Footnotes = require(__dirname + '/page-objects/footnotes.po');
CommonPageObjectsForPA3 = require(__dirname + '/page-objects/common-page-objects-for-pa3.po');

/*********************************************************************************************************/
/*                                          DOCS                                                         */
/*********************************************************************************************************/
PA3Json = require(__dirname + '/docs/pa3.json');
DocumentJson = require(__dirname + '/docs/document.json');
TestConfig = require(__dirname + '/../test-config.json');
DocumentWebJson = require(__dirname + '/docs/documentWeb.json');
JapaneseUnicode = require(__dirname + '/docs/japanese-unicode.json');

//*********************************************************************************************************/
/*                                          Modify Account(New)                                          */
/*********************************************************************************************************/

//"general"
ModifyAccountGeneralAddtionalOptions = require(__dirname + '/page-objects/modify-account/general/modify-account-general-additional-options.po.js');
ModifyAccountGeneralBasics = require(__dirname + '/page-objects/modify-account/general/modify-account-general-basics.po.js');
ModifyAccountGeneralDates = require(__dirname + '/page-objects/modify-account/general/modify-account-general-dates.po.js');
ModifyAccountGeneralHoldings = require(__dirname + '/page-objects/modify-account/general/modify-account-general-holdings.po.js');
ModifyAccountGeneralReturns = require(__dirname + '/page-objects/modify-account/general/modify-account-general-returns.po.js');

//"gips"
ModifyAccountGips = require(__dirname + '/page-objects/modify-account/gips/modify-account-gips.po.js');

//"PA"
ModifyAccountNewPaGroupings = require(__dirname + '/page-objects/modify-account/pa/modify-account-new-pa-groupings.po');
ModifyAccountPaPricesBenchmark = require(__dirname + '/page-objects/modify-account/pa/modify-account-new-pa-prices-benchmark.po.js');
ModifyAccountPaAssetTypesAddRemove = require(__dirname + '/page-objects/modify-account/pa/modify-account-pa-asset-types-add-remove.po.js');
ModifyAccountPaAssetTypesSearchOrder = require(__dirname + '/page-objects/modify-account/pa/modify-account-pa-asset-types-search-order.po.js');
ModifyAccountPaDatabases = require(__dirname + '/page-objects/modify-account/pa/modify-account-pa-databases.po.js');
ModifyAccountPaFixedIncomeAnalyticsSource = require(__dirname + '/page-objects/modify-account/pa/modify-account-pa-fixed-income-analytics-source.po.js');
ModifyAccountPaPricesAdvanced = require(__dirname + '/page-objects/modify-account/pa/modify-account-pa-prices-advanced.po.js');
ModifyAccountPaPricesPortfolio = require(__dirname + '/page-objects/modify-account/pa/modify-account-pa-prices-portfolio.po.js');
ModifyAccountNewPaExclusions = require(__dirname + '/page-objects/modify-account/pa/modify-account-new-pa-exclusions.po.js');

//"publisher"
ModifyAccountPublisherDiscipline = require(__dirname + '/page-objects/modify-account/publisher/modify-account-publisher-discipline.po.js');
ModifyAccountPublisherBenchmarks = require(__dirname + '/page-objects/modify-account/publisher/modify-account-publisher-benchmarks.po.js');
ModifyAccountPublisherManagers = require(__dirname + '/page-objects/modify-account/publisher/modify-account-publisher-managers.po.js');
ModifyAccountClientContacts = require(__dirname + '/page-objects/modify-account/publisher/modify-account-client-contacts.po.js');

//"spar"
ModifyAccountSpar = require(__dirname + '/page-objects/modify-account/spar/modify-account-spar.po.js');

//"risk"
ModifyAccountRiskRiskModels = require(__dirname + '/page-objects/modify-account/risk/modify-account-risk-risk-models.po.js');
ModifyAccountRiskUniverse = require(__dirname + '/page-objects/modify-account/risk/modify-account-risk-universe.po.js');

//"Main Page"
ModifyAccountCreateEditCustomGrouping = require(__dirname + '/page-objects/modify-account/modify-account-create-edit-custom-grouping.po.js');
ModifyAccountEditFee = require(__dirname + '/page-objects/modify-account/modify-account-edit-fee.spec.js');
ModifyAccountNew = require(__dirname + '/page-objects/modify-account/modify-account-new.po');

/*********************************************************************************************************/
/*                                          Document Options                                             */
/*********************************************************************************************************/

// "Prices"
DocumentOptionsPricesPortfolio = require(__dirname + '/page-objects/document-options/pricing/document-options-prices-portfolio.po');
DocumentOptionsPricesBenchmark = require(__dirname + '/page-objects/document-options/pricing/document-options-prices-benchmark.po');
DocumentOptionsPricesAdvanced = require(__dirname + '/page-objects/document-options/pricing/document-options-prices-advanced.po');

// "Fixed Income"
DocumentOptionsFixedIncomeAnalyticsSource = require(__dirname + '/page-objects/document-options/fixed-income' +
  '/document-options-fixed-income-analytics-source.po');
DocumentOptionsFixedIncomeAnalytics = require(__dirname + '/page-objects/document-options/fixed-income/document-options-fixed-income-analytics.po');
DocumentOptionsFixedIncomeAttribution = require(__dirname + '/page-objects/document-options/fixed-income' +
  '/document-options-fixed-income-attribution.po');

// "Asset Type"
DocumentOptionsAssetTypeAddRemove = require(__dirname + '/page-objects/document-options/asset-types/document-options-asset-type-add-remove.po');
DocumentOptionsAssetTypeSearchOrder = require(__dirname + '/page-objects/document-options/asset-types/document-options-asset-type-search-order.po');

// "Databases"
DocumentOptionsDatabases = require(__dirname + '/page-objects/document-options/databases/document-options-databases.po');

// "Dates"
DocumentOptionsDates = require(__dirname + '/page-objects/document-options/dates/document-options-dates.po');
DocumentOptionsDatesDateLagging = require(__dirname + '/page-objects/document-options/dates/document-options-dates-date-lagging.po');

// "Risk"
DocumentOptionsRiskTab = require(__dirname + '/page-objects/document-options/risk/document-options-risk-tab.po');

/*********************************************************************************************************/
/*                                          Reports Options                                              */
/*********************************************************************************************************/

// "Dates"
TileOptionsDates = require(__dirname + '/page-objects/tile-options/dates/tile-options-dates.po');

// "Groupings"
TileOptionsGroupings = require(__dirname + '/page-objects/tile-options/groupings/tile-options-groupings.po');
CreateEditCustomGroupings = require(__dirname + '/page-objects/tile-options/groupings/create-edit-custom-groupings.po');

// "Columns"
TileOptionsColumns = require(__dirname + '/page-objects/tile-options/columns/tile-options-columns.po');
CreateEditCustomColumns = require(__dirname + '/page-objects/tile-options/columns/create-edit-custom-columns.po');
AddNewCategory = require(__dirname + '/page-objects/tile-options/columns/add-new-category.po');

// "Exclusions"
TileOptionsExclusions = require(__dirname + '/page-objects/tile-options/exclusions/tile-options-exclusions.po');
TileOptionsExclusionsEditGroupings = require(__dirname + '/page-objects/tile-options/exclusions/tile-options-exclusions-edit-groupings.po');
TileOptionsExclusionsEditGroupingsAddRemove = require(__dirname + '/page-objects/tile-options/exclusions' +
  '/tile-options-exclusions-edit-groupings-add-remove.po');
TileOptionsExclusionsEditGroupingsOptions = require(__dirname + '/page-objects/tile-options/exclusions' +
  '/tile-options-exclusions-edit-groupings-options.po');

// "Hidden"
TileOptionsHidden = require(__dirname + '/page-objects/tile-options/hidden/tile-options-hidden.po');
TileOptionsHiddenEditGroupings = require(__dirname + '/page-objects/tile-options/hidden/tile-options-hidden-edit-groupings.po');
TileOptionsHiddenEditGroupingsAddRemove = require(__dirname + '/page-objects/tile-options/hidden' +
  '/tile-options-hidden-edit-groupings-add-remove.po');

// TileOptionsScenariosAndCashFlows
TileOptionsScenariosAndCashFlows = require(__dirname + '/page-objects/tile-options/scenarios/tile-options-scenarios-and-cash-flows.po');

// "Risk"
TileOptionsRiskRiskModels = require(__dirname + '/page-objects/tile-options/risk/tile-options-risk-risk-models.po');
TileOptionsRiskStressTests = require(__dirname + '/page-objects/tile-options/risk/tile-options-risk-stress-tests.po');
TileOptionsRiskOtherOptions = require(__dirname + '/page-objects/tile-options/risk/tile-options-risk-other-options.po');
CreateNewStressTest = require(__dirname + '/page-objects/tile-options/risk/create-new-stress-test.po');
CreateNewFactorGrouping = require(__dirname + '/page-objects/tile-options/risk/create-new-factor-grouping.po');
EditStressTest = require(__dirname + '/page-objects/tile-options/risk/edit-stress-test.po');

// "Universe"
TileOptionsUniverse = require(__dirname + '/page-objects/tile-options/universe/tile-options-universe.po');
AssetOrdering = require(__dirname + '/page-objects/tile-options/universe/asset-ordering.po.js');

// "Fixed Income"
ReportOptionsFixedIncomeTab = require(__dirname + '/page-objects/tile-options/fixed-income/report-options-fixed-income-tab.po');

// "Audit" Mode
AuditMode = require(__dirname + '/page-objects/audit/audit-mode.po');

// PA3 Analytics Override
AnalyticsOverrideEditor = require(__dirname + '/page-objects/fi-anoverride/analytics-override-editor.po');

// "Change Series"
ChangeSeries = require(__dirname + '/page-objects/changeSeries.po.js');

// "Identifier Lookup dialog"
IdentifierLookup = require(__dirname + '/page-objects/identifier-lookup.po.js');
