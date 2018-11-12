/*global webdriver:true*/

// Requiring other modules
webdriver = require('selenium-webdriver');

// Import the helpers
TestHelpers = require('@fds/thief-angular-testing');

// Requiring all page object of PLM
require(__dirname + '/../../PageObjects/PLM/all-page-objects.po.js');

// Requiring custom matcher file
require(__dirname + '/../common-files/custom-matchers.po');
CommonFunctions = require(__dirname + '/../common-files/common-functions.po');
ThiefHelpers = require(__dirname + '/../common-files/thief-helpers.po');
ChartHelpers = require(__dirname + '/../common-files/chart-helpers.po');

// Creating objects for all the page objects
Utilities = require(__dirname + '/utilities.po');
SlickGridFunctions = require(__dirname + '/slick-grid-functions.po');

// PA3 application
PA3MainPage = require(__dirname + '/pa3-main-page.po');
PA3EditMode = require(__dirname + '/pa3-edit-mode.po');
PA3Json = require(__dirname + '/pa3.json');
PA3EditReportList = require(__dirname + '/lhp/pa3-edit-report-list.po');
PA3EditChartMode = require(__dirname + '/charting/pa3-edit-chart-mode.po');
ChartingUtilities = require(__dirname + '/charting/charting-utilities.po');
DeleteConfirmationDialog = require(__dirname + '/lhp/delete-confirmation-dialog.po');
DocumentOptions = require(__dirname + '/document-options/document-options.po');
TileOptions = require(__dirname + '/tile-options/tile-options.po');
GroupingManager = require(__dirname + '/grouping-manager.po');

/*********************************************************************************************************/
/*                                          Modify Account(New)                                          */
/*********************************************************************************************************/

//"general"
ModifyAccountGeneralAddtionalOptions = require(__dirname + '/modify-account/general/modify-account-general-additional-options.po.js');
ModifyAccountGeneralBasics = require(__dirname + '/modify-account/general/modify-account-general-basics.po.js');
ModifyAccountGeneralDates = require(__dirname + '/modify-account/general/modify-account-general-dates.po.js');
ModifyAccountGeneralHoldings = require(__dirname + '/modify-account/general/modify-account-general-holdings.po.js');
ModifyAccountGeneralReturns = require(__dirname + '/modify-account/general/modify-account-general-returns.po.js');

//"gips"
ModifyAccountGips = require(__dirname + '/modify-account/gips/modify-account-gips.po.js');

//"PA"
ModifyAccountNewPaGroupings = require(__dirname + '/modify-account/pa/modify-account-new-pa-groupings.po');
ModifyAccountPaPricesBenchmark = require(__dirname + '/modify-account/pa/modify-account-new-pa-prices-benchmark.po.js');
ModifyAccountPaAssetTypesAddRemove = require(__dirname + '/modify-account/pa/modify-account-pa-asset-types-add-remove.po.js');
ModifyAccountPaAssetTypesSearchOrder = require(__dirname + '/modify-account/pa/modify-account-pa-asset-types-search-order.po.js');
ModifyAccountPaDatabases = require(__dirname + '/modify-account/pa/modify-account-pa-databases.po.js');
ModifyAccountPaFixedIncomeAnalyticsSource = require(__dirname + '/modify-account/pa/modify-account-pa-fixed-income-analytics-source.po.js');
ModifyAccountPaPricesAdvanced = require(__dirname + '/modify-account/pa/modify-account-pa-prices-advanced.po.js');
ModifyAccountPaPricesPortfolio = require(__dirname + '/modify-account/pa/modify-account-pa-prices-portfolio.po.js');

//"publisher"
ModifyAccountPublisherDiscipline = require(__dirname + '/modify-account/publisher/modify-account-publisher-discipline.po.js');
ModifyAccountPublisherBenchmarks = require(__dirname + '/modify-account/publisher/modify-account-publisher-benchmarks.po.js');
ModifyAccountPublisherManagers = require(__dirname + '/modify-account/publisher/modify-account-publisher-managers.po.js');
ModifyAccountClientContacts = require(__dirname + '/modify-account/publisher/modify-account-client-contacts.po.js');

//"spar"
ModifyAccountSpar = require(__dirname + '/modify-account/spar/modify-account-spar.po.js');

//"risk"
ModifyAccountRiskRiskModels = require(__dirname + '/modify-account/risk/modify-account-risk-risk-models.po.js');
ModifyAccountRiskUniverse = require(__dirname + '/modify-account/risk/modify-account-risk-universe.po.js');

//"Main Page"
ModifyAccountCreateEditCustomGrouping = require(__dirname + '/modify-account/modify-account-create-edit-custom-grouping.po.js');
ModifyAccountEditFee = require(__dirname + '/modify-account/modify-account-edit-fee.spec.js');
ModifyAccountNew = require(__dirname + '/modify-account/modify-account-new.po');

/*********************************************************************************************************/
/*                                          Document Options                                             */
/*********************************************************************************************************/

// "Prices"
DocumentOptionsPricesPortfolio = require(__dirname + '/document-options/pricing/document-options-prices-portfolio.po');
DocumentOptionsPricesBenchmark = require(__dirname + '/document-options/pricing/document-options-prices-benchmark.po');
DocumentOptionsPricesAdvanced = require(__dirname + '/document-options/pricing/document-options-prices-advanced.po');

// "Fixed Income"
DocumentOptionsFixedIncomeAnalyticsSource = require(__dirname + '/document-options/fixed-income' +
  '/document-options-fixed-income-analytics-source.po');
DocumentOptionsFixedIncomeAnalytics = require(__dirname + '/document-options/fixed-income/document-options-fixed-income-analytics.po');
DocumentOptionsFixedIncomeAttribution = require(__dirname + '/document-options/fixed-income' +
  '/document-options-fixed-income-attribution.po');

// "Asset Type"
DocumentOptionsAssetTypeAddRemove = require(__dirname + '/document-options/asset-types/document-options-asset-type-add-remove.po');
DocumentOptionsAssetTypeSearchOrder = require(__dirname + '/document-options/asset-types/document-options-asset-type-search-order.po');

// "Databases"
DocumentOptionsDatabases = require(__dirname + '/document-options/databases/document-options-databases.po');

// "Dates"
DocumentOptionsDates = require(__dirname + '/document-options/dates/document-options-dates.po');
DocumentOptionsDatesDateLagging = require(__dirname + '/document-options/dates/document-options-dates-date-lagging.po');

// "Risk"
DocumentOptionsRiskTab = require(__dirname + '/document-options/risk/document-options-risk-tab.po');

/*********************************************************************************************************/
/*                                          Reports Options                                              */
/*********************************************************************************************************/

// "Dates"
TileOptionsDates = require(__dirname + '/tile-options/dates/tile-options-dates.po');

// "Groupings"
TileOptionsGroupings = require(__dirname + '/tile-options/groupings/tile-options-groupings.po');
CreateEditCustomGroupings = require(__dirname + '/tile-options/groupings/create-edit-custom-groupings.po');

// "Columns"
TileOptionsColumns = require(__dirname + '/tile-options/columns/tile-options-columns.po');
CreateEditCustomColumns = require(__dirname + '/tile-options/columns/create-edit-custom-columns.po');
AddNewCategory = require(__dirname + '/tile-options/columns/add-new-category.po');

// "Exclusions"
TileOptionsExclusions = require(__dirname + '/tile-options/exclusions/tile-options-exclusions.po');
TileOptionsExclusionsEditGroupings = require(__dirname + '/tile-options/exclusions/tile-options-exclusions-edit-groupings.po');
TileOptionsExclusionsEditGroupingsAddRemove = require(__dirname + '/tile-options/exclusions' +
  '/tile-options-exclusions-edit-groupings-add-remove.po');
TileOptionsExclusionsEditGroupingsOptions = require(__dirname + '/tile-options/exclusions' +
  '/tile-options-exclusions-edit-groupings-options.po');

// "Hidden"
TileOptionsHidden = require(__dirname + '/tile-options/hidden/tile-options-hidden.po');
TileOptionsHiddenEditGroupings = require(__dirname + '/tile-options/hidden/tile-options-hidden-edit-groupings.po');
TileOptionsHiddenEditGroupingsAddRemove = require(__dirname + '/tile-options/hidden' +
  '/tile-options-hidden-edit-groupings-add-remove.po');

// TileOptionsScenariosAndCashFlows
TileOptionsScenariosAndCashFlows = require(__dirname + '/tile-options/scenarios/tile-options-scenarios-and-cash-flows.po');

// "Risk"
TileOptionsRiskRiskModels = require(__dirname + '/tile-options/risk/tile-options-risk-risk-models.po');
TileOptionsRiskStressTests = require(__dirname + '/tile-options/risk/tile-options-risk-stress-tests.po');
TileOptionsRiskOtherOptions = require(__dirname + '/tile-options/risk/tile-options-risk-other-options.po');
CreateNewStressTest = require(__dirname + '/tile-options/risk/create-new-stress-test.po');
CreateNewFactorGrouping = require(__dirname + '/tile-options/risk/create-new-factor-grouping.po');
EditStressTest = require(__dirname + '/tile-options/risk/edit-stress-test.po');

// "Universe"
TileOptionsUniverse = require(__dirname + '/tile-options/universe/tile-options-universe.po');

// "Fixed Income"
ReportOptionsFixedIncomeTab = require(__dirname + '/tile-options/fixed-income/report-options-fixed-income-tab.po');

// "Audit" Mode
AuditMode = require(__dirname + '/audit/audit-mode.po');

// PA3 Analytics Override
AnalyticsOverrideEditor = require(__dirname + '/fi-anoverride/analytics-override-editor.po');

// "Change Series"
ChangeSeries = require(__dirname + '/changeSeries.po.js');

// "STU"
STUMainPage = require(__dirname + '/stu/stu-main-page.po');
STUTraderPage = require(__dirname + '/stu/stu-trader-page.po');
STUSolverPage = require(__dirname + '/stu/stu-solver-page.po');
AddRemoveColumns = require(__dirname + '/stu/add-remove-columns.po');
UtilitySlickgrid = require(__dirname + '/stu/utility-slickgrid.po');
