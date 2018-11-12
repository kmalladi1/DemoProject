'use strict';

require(__dirname + '/../../../index.js');

var verifyDropDownValueInUniverseTab = function(reportName, valueSet) {

  // Click on "Wrench" icon and select "options" from the "wrench" menu
  CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption(reportName, 'Options');

  it('Verifying if view changed to "Tile Options - ' + reportName + '" mode', function() {
    ThiefHelpers.isModeBannerDisplayed('Tile Options - ' + reportName).then(function(found) {
      if (!found) {
        expect(false).customError('View if not changed to "Tile Options - ' + reportName + '" mode.');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Should click on the "Universe" tab in the LHP of tile options', function() {
    ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Universe').select();

    // Verifying if "Universe" is selected in the LHP
    ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Universe').isSelected().then(function(selected) {
      if (!selected) {
        expect(false).customError('"Universe" tab is not selected in the LHP.');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Verifying if "' + valueSet + '" is set to "Expand Composite Assets" drop down', function() {
    ThiefHelpers.verifySelectedDropDownText(valueSet, 'Expand Composite Assets:');
  });

};

var verifyCellValues = function(reportName, rowName, columnNamesArray, columnAndCellValuesArray) {
  columnAndCellValuesArray.forEach(function(value, index) {

    it('Verifying if "' + columnNamesArray[index] + '" column of "' + rowName + '" row is displayed with "' + columnAndCellValuesArray[index] + '" value', function() {
      SlickGridFunctions.getCellReference(reportName, rowName, '', columnNamesArray[index]).then(function(ref) {
        ref.getText().then(function(text) {
          if (text !== columnAndCellValuesArray[index]) {
            expect(false).customError('"' + columnNamesArray[index] + '" column for "' + rowName + '" row is not set to "' + columnAndCellValuesArray[index] + '" value, Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });
  });
};

var unCheckDefaultOrderingCheckBox = function(reportName) {
  // Click on "Wrench" icon and select "options" from the "wrench" menu
  CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption(reportName, 'Options');

  it('Verifying if view changed to "Tile Options - ' + reportName + '" mode', function() {
    ThiefHelpers.isModeBannerDisplayed('Tile Options - ' + reportName + '').then(function(found) {
      if (!found) {
        expect(false).customError('View if not changed to "Tile Options - ' + reportName + '" mode.');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Should click on the "Universe" tab in the LHP of tile options', function() {
    ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Universe').select();

    // Verifying if "Universe" is selected in the LHP
    ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Universe').isSelected().then(function(selected) {
      if (!selected) {
        expect(false).customError('"Universe" tab is not selected in the LHP.');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Should click on "Search Order" button', function() {
    ThiefHelpers.getButtonClassReference(undefined, TileOptionsUniverse.xpathSearchOrderButton).press().then(function() {
    }, function() {

      expect(false).customError('Unable to click on "Search Order" button');
      CommonFunctions.takeScreenShot();
    });
  });

  it('Verifying if "Asset Ordering" dialog appeared', function() {
    ThiefHelpers.isDialogOpen('Asset Ordering').then(function(option) {
      if (!option) {
        expect(false).customError('"Asset Ordering" dialog is not opened');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Should un-check "Use Default Ordering" checkbox from "Asset Ordering" dialog', function() {
    ThiefHelpers.getCheckBoxClassReference('Use Default Ordering').uncheck();

    // Verifying if "Use Default Ordering" is unchecked
    ThiefHelpers.getCheckBoxClassReference('Use Default Ordering').isChecked().then(function(flag) {
      if (flag) {
        expect(false).customError('"Groups" checkbox did not uncheck');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Should click on "OK" button in "Asset Ordering" dialog', function() {
    ThiefHelpers.getButtonClassReference('', PA3MainPage.getButton('OK')).press().then(function() {
    }, function() {
      expect(false).customError('Unable to click on "OK" button in "Asset Ordering');
      CommonFunctions.takeScreenShot();
    });
  });

  it('Verifying if "Asset Ordering" dialog is closed', function() {
    ThiefHelpers.isDialogOpen('Asset Ordering').then(function(option) {
      if (option) {
        expect(false).customError('"Asset Ordering" dialog is not closed');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - ' + reportName + '');
};

describe('Test Case: ri-search-order', function() {

  describe('Test Step ID: 701164', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/pa3/risk/Risk_Test_CA_Search_Order_Change" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('risk-test-ca-search-order-change');
    });

    it('Verifying if only two tiles are present in the report', function() {
      PA3MainPage.getAllTilesFromReport().count().then(function(reportCount) {
        if (reportCount !== 2) {
          expect(false).customError('More than two tiles are present in the report; Found: ' + reportCount);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Collapsed');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Expanded');

    // Verifying if "Weights" report is selected in lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Weights', 'Weights', undefined, 'isSelected');

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Portfolio', PA3MainPage.xpathPortfolioWidget, 'CLIENT:/PA3/RISK/CA_MAPPING_TEST_ORIGINAL_PORT.ACCT');

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Benchmark', PA3MainPage.xpathBenchmarkWidget, 'SPN:OEX');
  });

  describe('Test Step ID: 701165', function() {

    verifyDropDownValueInUniverseTab('Collapsed', 'None');
  });

  describe('Test Step ID: 701166', function() {

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Collapsed');

    verifyDropDownValueInUniverseTab('Expanded', 'All Levels');
  });

  describe('Test Step ID: 701167', function() {

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Expanded');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Expanded');

    var columnNames = ['Security Residual Risk', 'Security Factor Risk', 'Security Total Risk', 'Contr. to Absolute Risk', 'Contr. to Tracking Error'];
    var caTestVerificationArray = ['10.6980', '12.9736', '16.8155', '16.8155', '12.0649'];
    var frsRow = ['14.6136', '14.0979', '20.3054', '12.7198', '10.1953'];
    var IBMCRow = ['13.3637', '12.3468', '18.1942', '4.0957', '1.8013'];
    var totalValues = ['16.8155', '11.9559'];
    var reportNames = ['Collapsed', 'Expanded'];
    var columnNamesForTotal = ['Contr. to Absolute Risk', 'Contr. to Tracking Error'];

    verifyCellValues('Collapsed', 'RISK_CA_TEST_28427221', columnNames, caTestVerificationArray);

    verifyCellValues('Expanded', 'FactSet Research Systems Inc.', columnNames, frsRow);

    verifyCellValues('Expanded', 'International Business Machines Corporation', columnNames, IBMCRow);

    reportNames.forEach(function(reportName) {
      verifyCellValues(reportName, 'Total', columnNamesForTotal, totalValues);
    });
  });

  describe('Test Step ID: 701209', function() {

    unCheckDefaultOrderingCheckBox('Collapsed');

    unCheckDefaultOrderingCheckBox('Expanded');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Collapsed');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Expanded');

    it('Should click "Refresh" icon from the application header', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.xpathRefreshBtn).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Refresh" icon');
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Collapsed');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Expanded');

    var columnNames = ['Security Residual Risk', 'Security Factor Risk', 'Security Total Risk', 'Contr. to Absolute Risk', 'Contr. to Tracking Error'];
    var caTestVerificationArray = ['12.6939', '12.7630', '18.0009', '18.0009', '13.7033'];
    var appleIncRow = ['17.9222', '13.6756', '22.5439', '14.4592', '11.3422'];
    var GECRow = ['12.3068', '12.2449', '17.3608', '3.5416', '1.3088'];
    var totalValues = ['18.0009', '12.7247'];
    var reportNames = ['Collapsed', 'Expanded'];
    var columnNamesForTotal = ['Contr. to Absolute Risk', 'Contr. to Tracking Error'];

    verifyCellValues('Collapsed', 'RISK_CA_TEST_28427221', columnNames, caTestVerificationArray);

    verifyCellValues('Expanded', 'Apple Inc.', columnNames, appleIncRow);

    verifyCellValues('Expanded', 'General Electric Company', columnNames, GECRow);

    reportNames.forEach(function(reportName) {
      verifyCellValues(reportName, 'Total', columnNamesForTotal, totalValues);
    });
  });
});
