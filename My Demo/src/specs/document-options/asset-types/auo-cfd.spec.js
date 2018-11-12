'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: auo-cfd', function() {

  describe('Test Step ID: 492352', function() {

    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:/Pa3/Universe/AUO_CONV_SR"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('auto-conv-sr');
    });

    it('Should wait for "Contribution" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Contribution'), 180000);
    });

    it('Verifying if the "Contribution" report is generated', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Contribution" report did not get generated');
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

    it('Verifying that "Contribution" report is opened with "CLIENT:/PA3/UNIVERSE/AUO_CFD.ACCT" as portfolio', function() {
      PA3MainPage.getWidgetBox('Portfolio').getAttribute('value').then(function(name) {
        if (name !== 'CLIENT:/PA3/UNIVERSE/AUO_CFD.ACCT') {
          expect(false).customError('The "Weights" report did not open with portfolio ' + '"CLIENT:/PA3/UNIVERSE/AUO_CFD.ACCT" but opened with: ' + name);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that report is opened with "RUSSELL:1000" as benchmark', function() {
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(name) {
        if (name !== 'RUSSELL:1000') {
          expect(false).customError('The "Weights" report did not open with benchmark "RUSSELL:1000" but ' + 'opened with: ' + name);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Total" contains "Total Return" value "-0.86"', function() {
      SlickGridFunctions.getCellReference('Contribution', 'Total', '', 'Total Return').then(function(value) {
        value.getText().then(function(text) {
          if (text !== '-0.86') {
            expect(false).customError('"Total" does not contains "Total Return" value "-0.86"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "TRAVIS PERKINS PLC (LN*)-CFD" is present inside "Contract for Difference"', function() {
      PA3MainPage.getElementFromCalculatedTree('Contribution', 'Contract for Difference', 'TRAVIS PERKINS PLC (LN*)-CFD').isPresent().then(function(bool) {
        if (!bool) {
          expect(false).customError('"TRAVIS PERKINS PLC (LN*)-CFD" is not present inside "Contract for Difference"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 492353', function() {

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
          expect(false).customError('"Document Options" mode is not appeared');
          CommonFunctions.takeScreenShot();
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

    // Disabling wait for angular to handle loading icon
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

    it('Wait for "Contribution" report calculation', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Contribution'), 20000);

      // Verifying report is recalculated
      PA3MainPage.getReportCalculationDlg('Contribution').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Contribution" report did not recalculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Should wait for "Contribution" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Contribution'), 180000);
    });

    it('Verifying if the "Contribution" report is generated', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Contribution" report did not get generated');
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

    it('Verifying if "Total" contains "Total Return" value "-1.52"', function() {
      SlickGridFunctions.getCellReference('Contribution', 'Total', '', 'Total Return').then(function(value) {
        value.getText().then(function(text) {
          if (text !== '-1.52') {
            expect(false).customError('"Total" does not contains "Total Return" value "-1.52"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "TRAVIS PERKINS PLC (LN*)-CFD" is present inside "Contract for Difference"', function() {
      PA3MainPage.getElementFromCalculatedTree('Contribution', 'Contract for Difference', 'TRAVIS PERKINS PLC (LN*)-CFD').isPresent().then(function(bool) {
        if (!bool) {
          expect(false).customError('"TRAVIS PERKINS PLC (LN*)-CFD" is not present inside "Contract for Difference"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 492355', function() {

    it('Should launch the PA3 application with "Client:/Pa3/universe/auo_conv_uid"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('auo-conv-uid');
    });

    it('Should wait for "Contribution" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Contribution'), 180000);
    });

    it('Verifying if the "Contribution" report is generated', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Contribution" report did not get generated');
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

    it('Verifying if "Total" contains "Total Return" value "-1.52"', function() {
      SlickGridFunctions.getCellReference('Contribution', 'Total', '', 'Total Return').then(function(value) {
        value.getText().then(function(text) {
          if (text !== '-1.52') {
            expect(false).customError('"Total" does not contains "Total Return" value "-1.52"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Travis Perkins plc" is present inside "Equity Common"', function() {
      PA3MainPage.getElementFromCalculatedTree('Contribution', 'Equity Common', 'Travis Perkins plc').isPresent().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Travis Perkins plc" is not present inside "Equity Common"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 492356', function() {

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
          expect(false).customError('"Document Options" mode is not appeared');
          CommonFunctions.takeScreenShot();
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

    // Disabling wait for angular to handle loading icon
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

    it('Wait for "Contribution" report calculation', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Contribution'), 20000);

      // Verifying report is recalculated
      PA3MainPage.getReportCalculationDlg('Contribution').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Contribution" report did not recalculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Should wait for "Contribution" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Contribution'), 180000);
    });

    it('Verifying if the "Contribution" report is generated', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Contribution" report did not get generated');
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

    it('Verifying if "Total" contains "Total Return" value "-1.52"', function() {
      SlickGridFunctions.getCellReference('Contribution', 'Total', '', 'Total Return').then(function(value) {
        value.getText().then(function(text) {
          if (text !== '-1.52') {
            expect(false).customError('"Total" does not contains "Total Return" value "-1.52"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should expand "Contract for Difference" grouping', function() {
      PA3MainPage.expandTreeInCalculatedReport('Contribution', 'Contract for Difference');

      // Verify if "Contract for difference" grouping is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution', 'Contract for Difference');
    });

    it('Verifying if "TRAVIS PERKINS PLC (LN*)-CFD" is present inside "Contract for Difference"', function() {
      PA3MainPage.getElementFromCalculatedTree('Contribution', 'Contract for Difference', 'TRAVIS PERKINS PLC (LN*)-CFD').isPresent().then(function(bool) {
        if (!bool) {
          expect(false).customError('"TRAVIS PERKINS PLC (LN*)-CFD" is not present inside "Contract for Difference"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Ticker" column contains "0773960_CFD"', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(value) {
        if (value.indexOf('0773960_CFD') < 0) {
          expect(false).customError('"Ticker" column  does not contains "0773960_CFD"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
