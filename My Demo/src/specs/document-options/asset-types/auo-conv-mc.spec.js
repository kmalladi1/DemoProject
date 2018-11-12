'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: auo-conv-mc', function() {

  describe('Test Step ID: 486219', function() {

    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:/Pa3/Universe/AUO_CONV_MC_1"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('auo-conv-mc-1');
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);
    });

    it('Verifying if the "Weights" report is generated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Weights" report did not get generated');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any calculation error appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Total" contains "Port. Ending Market Value" as "1,680,766.68"', function() {
      SlickGridFunctions.getCellReference('Weights', 'Total', '', 'Port. Ending Market Value').then(function(value) {
        value.getText().then(function(text) {
          if (text !== '1,680,766.68') {
            expect(false).customError('"Total" does not contains "Port. Ending Market Value" as "1,680,766.68"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var groupings = ['Equity Common', 'Short', 'CMS Energy Corporation', 'Equity Residential', '[Cash]', '[Cash]', 'Short Cash - U.S. Dollar', 'U.S. Dollar'];
    var marketValues = ['-1,680,766.68', '-1,680,766.68', '-851,864.58', '-828,902.10', '3,361,533.36', '3,361,533.36', '1,680,766.68', '1,680,766.68'];
    var groupingNames;

    it('Should record all the groupings in the report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(col) {
        col.splice(0, 1);
        groupingNames = col;
      });
    });

    groupings.forEach(function(value, index) {

      it('Verifying if "' + value + '" grouping is present in the "Weights" report', function() {
        if (value !== groupingNames[index]) {
          expect(false).customError('"' + value + '" grouping did not display in "Weights" report; ' + 'Found: ' + groupingNames[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "' + groupings.length + '" groupings are present in the report', function() {
      if (groupings.length !== groupingNames.length) {
        expect(false).customError('"' + groupings.length + '" groupings did not display in the report; ' + 'Found: ' + groupingNames.length);
        CommonFunctions.takeScreenShot();
      }
    });

    groupings.forEach(function(value, index) {

      it('Verifying if "' + marketValues[index] + '" value is present against "' + value + '" grouping' + ' in the "Weights" report', function() {
        SlickGridFunctions.getCellReference('Weights', value, '', 'Port. Ending Market Value', undefined).then(function(ref) {
          ref.getText().then(function(portValue) {
            if (parseFloat(portValue).toFixed(2) !== parseFloat(marketValues[index]).toFixed(2)) {
              expect(false).customError('"' + marketValues[index] + '" value did not display ' + 'against "' + value + '" grouping in the "Weights" report; Found: ' + portValue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 486220', function() {

    it('Should click on the wrench icon in the app tool bar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Should select "Document Options" from the app tool bar', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click().then(function() {}, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view is changed to "Document Options" mode', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(found) {
        if (!found) {
          expect(false).customError('"Document Options" mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Add/Remove" in the "Asset Type" section of LHP', function() {
      DocumentOptions.getLHPOption('Add/Remove').click().then(function() {}, function() {

        expect(false).customError('Unable to click on "Add/Remove" from LHP');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should check "Disable asset type adjustments" check box', function() {
      ThiefHelpers.getCheckBoxClassReference('Disable asset type adjustments').check();
    });

    // Disabling wait for angular to handle loading icon
    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on "OK" button in "Document Options" mode', function() {
      DocumentOptions.getHeaderButton('OK').click().then(function() {}, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for "Weights" report calculation', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Weights'), 20000);

      // Verifying report is recalculated
      PA3MainPage.getReportCalculationDlg('Weights').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights" report did not recalculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);
    });

    it('Verifying if the "Weights" report is generated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Weights" report did not get generated');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any calculation error appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Total" contains "Port. Ending Market Value" as "-1,680,766.68"', function() {
      SlickGridFunctions.getCellReference('Weights', 'Total', '', 'Port. Ending Market Value').then(function(value) {
        value.getText().then(function(text) {
          if (text !== '-1,680,766.68') {
            expect(false).customError('"Total" does not contains "Port. Ending Market Value" as "1,680,766.68"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var groupings = ['Equity Common', 'Short', 'CMS Energy Corporation', 'Equity Residential'];
    var marketValues = ['-1,680,766.68', '-1,680,766.68', '-851,864.58', '-828,902.10'];
    var groupingNames;

    it('Should record all the groupings in the report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(col) {
        col.splice(0, 1);
        groupingNames = col;
      });
    });

    groupings.forEach(function(value, index) {

      it('Verifying if "' + value + '" grouping is present in the "Weights" report', function() {
        if (value !== groupingNames[index]) {
          expect(false).customError('"' + value + '" grouping did not display in "Weights" report; ' + 'Found: ' + groupingNames[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "' + groupings.length + '" groupings are present in the report', function() {
      if (groupings.length !== groupingNames.length) {
        expect(false).customError('"' + groupings.length + '" groupings did not display in the report; ' + 'Found: ' + groupingNames.length);
        CommonFunctions.takeScreenShot();
      }
    });

    groupings.forEach(function(value, index) {

      it('Verifying if "' + marketValues[index] + '" value is present against "' + value + '" grouping' + ' in the "Weights" report', function() {
        SlickGridFunctions.getCellReference('Weights', value, '', 'Port. Ending Market Value', undefined).then(function(ref) {
          ref.getText().then(function(portValue) {
            if (parseFloat(portValue).toFixed(2) !== parseFloat(marketValues[index]).toFixed(2)) {
              expect(false).customError('"' + marketValues[index] + '" value did not display ' + 'against "' + value + '" grouping in the "Weights" report; Found: ' + portValue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 486221', function() {

    it('Should launch the PA3 application with "Client:/pa3/universe/AUO_CONV_MC_2"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('auo-conv-mc-2');
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);
    });

    it('Verifying if the "Weights" report is generated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Weights" report did not get generated');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any calculation error appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Total" contains "Port. Ending Market Value" as "840,383.34"', function() {
      SlickGridFunctions.getCellReference('Weights', 'Total', '', 'Port. Ending Market Value').then(function(value) {
        value.getText().then(function(text) {
          if (text !== '840,383.34') {
            expect(false).customError('"Total" does not contains "Port. Ending Market Value" as "840,383.34"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var groupings = ['Equity Common', 'Short', 'CMS Energy Corporation', 'Equity Residential', '[Cash]', '[Cash]', 'Short Cash - U.S. Dollar', 'U.S. Dollar'];
    var marketValues = ['-1,680,766.68', '-1,680,766.68', '-851,864.58', '-828,902.10', '2,521,150.02', '2,521,150.02', '1,680,766.68', '840,383.34'];
    var groupingNames;

    it('Should record all the groupings in the report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(col) {
        col.splice(0, 1);
        groupingNames = col;
      });
    });

    groupings.forEach(function(value, index) {

      it('Verifying if "' + value + '" grouping is present in the "Weights" report', function() {
        if (value !== groupingNames[index]) {
          expect(false).customError('"' + value + '" grouping did not display in "Weights" report; ' + 'Found: ' + groupingNames[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "' + groupings.length + '" groupings are present in the report', function() {
      if (groupings.length !== groupingNames.length) {
        expect(false).customError('"' + groupings.length + '" groupings did not display in the report; ' + 'Found: ' + groupingNames.length);
        CommonFunctions.takeScreenShot();
      }
    });

    groupings.forEach(function(value, index) {

      it('Verifying if "' + marketValues[index] + '" value is present against "' + value + '" grouping' + ' in the "Weights" report', function() {
        SlickGridFunctions.getCellReference('Weights', value, '', 'Port. Ending Market Value', undefined).then(function(ref) {
          ref.getText().then(function(portValue) {
            if (parseFloat(portValue).toFixed(2) !== parseFloat(marketValues[index]).toFixed(2)) {
              expect(false).customError('"' + marketValues[index] + '" value did not display ' + 'against "' + value + '" grouping in the "Weights" report; Found: ' + portValue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 486222', function() {

    it('Should click on the wrench icon in the app tool bar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Should select "Document Options" from the app tool bar', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click().then(function() {}, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view is changed to "Document Options" mode', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(found) {
        if (!found) {
          expect(false).customError('"Document Options" mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Add/Remove" in the "Asset Type" section of LHP', function() {
      DocumentOptions.getLHPOption('Add/Remove').click().then(function() {}, function() {

        expect(false).customError('Unable to click on "Add/Remove" from LHP');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should check "Disable asset type adjustments" check box', function() {
      ThiefHelpers.getCheckBoxClassReference('Disable asset type adjustments').check();
    });

    // Disabling wait for angular to handle loading icon
    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on "OK" button in "Document Options" mode', function() {
      DocumentOptions.getHeaderButton('OK').click().then(function() {}, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for "Weights" report calculation', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Weights'), 20000);

      // Verifying report is recalculated
      PA3MainPage.getReportCalculationDlg('Weights').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights" report did not recalculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);
    });

    it('Verifying if the "Weights" report is generated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Weights" report did not get generated');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any calculation error appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Total" contains "Port. Ending Market Value" as "-1,680,766.68"', function() {
      SlickGridFunctions.getCellReference('Weights', 'Total', '', 'Port. Ending Market Value').then(function(value) {
        value.getText().then(function(text) {
          if (text !== '-1,680,766.68') {
            expect(false).customError('"Total" does not contains "Port. Ending Market Value" as "1,680,766.68"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var groupings = ['Equity Common', 'Short', 'CMS Energy Corporation', 'Equity Residential'];
    var marketValues = ['-1,680,766.68', '-1,680,766.68', '-851,864.58', '-828,902.10'];
    var groupingNames;

    it('Should record all the groupings in the report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(col) {
        col.splice(0, 1);
        groupingNames = col;
      });
    });

    groupings.forEach(function(value, index) {

      it('Verifying if "' + value + '" grouping is present in the "Weights" report', function() {
        if (value !== groupingNames[index]) {
          expect(false).customError('"' + value + '" grouping did not display in "Weights" report; ' + 'Found: ' + groupingNames[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "' + groupings.length + '" groupings are present in the report', function() {
      if (groupings.length !== groupingNames.length) {
        expect(false).customError('"' + groupings.length + '" groupings did not display in the report; ' + 'Found: ' + groupingNames.length);
        CommonFunctions.takeScreenShot();
      }
    });

    groupings.forEach(function(value, index) {

      it('Verifying if "' + marketValues[index] + '" value is present against "' + value + '" grouping' + ' in the "Weights" report', function() {
        SlickGridFunctions.getCellReference('Weights', value, '', 'Port. Ending Market Value', undefined).then(function(ref) {
          ref.getText().then(function(portValue) {
            if (parseFloat(portValue).toFixed(2) !== parseFloat(marketValues[index]).toFixed(2)) {
              expect(false).customError('"' + marketValues[index] + '" value did not display ' + 'against "' + value + '" grouping in the "Weights" report; Found: ' + portValue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });
});
