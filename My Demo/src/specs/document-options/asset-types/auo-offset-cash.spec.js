'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: auo-offset-cash', function() {

  describe('Test Step ID: Startup Instructions', function() {

    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 486069', function() {

    it('Should launch the PA3 application with "Client:;Pa3;Universe;AUO_CONV_1"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('auto-conv-1');
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

    it('Verifying if the Portfolio tile name is "ADR_GDR"', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        if (text !== 'ADR_GDR') {
          expect(false).customError('Portfolio tile name did not set as "ADR_GDR"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var groupings = ['Equity Common', 'Long', 'Preferred', '[Cash]'];
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

    // Verifying the approximate total value by rounding off the actual
    it('Should verify if the Total value of "Port. Ending Market Value" is displayed with "73,217,812.89"', function() {
      SlickGridFunctions.getCellReference('Weights', 'Total', '', 'Port. Ending Market Value', '').then(
        function(cellRef) {
          cellRef.getText().then(function(value) {
            var reportValue = Math.round(parseFloat(value.replace(/,/g, '')));
            if (reportValue !== 73217813) {
              expect(false).customError('Total value of "" column is not displayed as 73,217,812.89, Expected: 73217813(round off value),Found: ' + reportValue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
    });
  });

  describe('Test Step ID: 486211', function() {

    it('Should click on the wrench icon in the app tool bar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Should select "Document Options" from the app tool bar', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view is changed to "Document Options" mode', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(mode) {
        if (!mode) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Document Options" mode is not appeared');
        }
      });
    });

    it('Should select "Add/Remove" in the "Asset Type" section of LHP', function() {
      DocumentOptions.getLHPOption('Add/Remove').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Add/Remove" from LHP');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should check "Disable asset type adjustments" check box', function() {
      ThiefHelpers.getCheckBoxClassReference('Disable asset type adjustments').check();
    });

    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on "OK" button in "Document Options" mode', function() {
      DocumentOptions.getHeaderButton('OK').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should Wait for "Weights" report is calculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Weights'), 20000);

      // Verifying report is recalculating
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

    var groupings = ['ADR/GDR', 'Equity Common', 'Long', '[Cash]'];
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

    it('Should verify if the Total value of "Port. Ending Market Value" is displayed with "73,217,813.00"', function() {
      SlickGridFunctions.getCellReference('Weights', 'Total', '', 'Port. Ending Market Value', '').then(
        function(cellRef) {
          cellRef.getText().then(function(value) {
            var reportValue = Math.round(parseFloat(value.replace(/,/g, '')));
            if (reportValue !== 73217813) {
              expect(false).customError('Total value of "Port. Ending Market Value" column is not displayed as 73,217,813.00, Expected: 73217813(round off value),Found: ' + reportValue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
    });
  });

  describe('Test Step ID: 486212', function() {

    it('Should click on the "Hamburger" icon next to "account lookup"', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click();
    });

    it('Verifying if the drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "MULTISTRAT_DEMO_ACCT" from the drop down', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'MULTISTRAT_DEMO_ACCT').click();
    });

    it('Should click "OK" in the "Accounts" drop down to exit', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" from drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for reports to calculate', function() {
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

    var groupings = ['Equity Common', 'Long', 'Short', 'Equity Option: Call', 'Equity Option: Put', 'Exchange Traded Fund', 'Index Future', 'Metal Future'];
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

    it('Should verify if the Total value of "Port. Ending Market Value" is displayed with "24,506,223.04"', function() {
      SlickGridFunctions.getCellReference('Weights', 'Total', '', 'Port. Ending Market Value', '').then(
        function(cellRef) {
          cellRef.getText().then(function(value) {
            var reportValue = Math.round(parseFloat(value.replace(/,/g, '')));
            if (reportValue !== 24506223) {
              expect(false).customError('Total value of "Port. Ending Market Value" column is not displayed as 24,506,223.04, Expected: 24506223(round off value),Found:' + reportValue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
    });
  });

  describe('Test Step ID: 486214', function() {

    it('Should click on the wrench icon in the app tool bar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Should select "Document Options" from the app tool bar', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view is changed to "Document Options" mode', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Document Options" mode is not appeared');
        }
      });
    });

    it('Should select "Add/Remove" in the "Asset Type" section of LHP', function() {
      DocumentOptions.getLHPOption('Add/Remove').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Add/Remove" from LHP');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should uncheck "Disable asset type adjustments" check box', function() {
      ThiefHelpers.getCheckBoxClassReference('Disable asset type adjustments').uncheck();
    });

    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on "OK" button in "Document Options" mode', function() {
      DocumentOptions.getHeaderButton('OK').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should Wait for "Weights" report is calculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Weights'), 20000);

      // Verifying report is recalculating
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

    var groupings = ['Equity Common', 'Long', 'Short', 'Equity Option: Call', 'Equity Option: Put', 'Exchange Traded Fund', 'Index Future', 'Metal Future', '[Cash]'];
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

    it('Should verify if the Total value of "Port. Ending Market Value" is displayed with "23,489,704.95"', function() {
      SlickGridFunctions.getCellReference('Weights', 'Total', '', 'Port. Ending Market Value', '').then(
        function(cellRef) {
          cellRef.getText().then(function(value) {
            var reportValue = Math.round(parseFloat(value.replace(/,/g, '')));
            if (reportValue !== 23489705) {
              expect(false).customError('Total value of "Port. Ending Market Value" column is not displayed as 23,489,704.95, Expected: 23489705(round off value),Found: ' + reportValue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
    });
  });
});
