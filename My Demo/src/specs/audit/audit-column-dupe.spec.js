'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: audit-column-dupe', function() {

  describe('Test Step ID: 703290', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Audit/audit_dupe_column"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('audit-dupe-column');
    });

    it('Should wait for "Weights" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Portfolio widget is populated with "SPN:OEX"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).getText().then(function(val) {
        if (val !== 'SPN:OEX') {
          expect(false).customError('Portfolio widget is not populated with "SPN:OEX", Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Benchmark widget is populated with "SPN:SP50"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathBenchmarkWidget).getText().then(function(val) {
        if (val !== 'SPN:SP50') {
          expect(false).customError('Benchmark widget is not populated with "SPN:SP50", Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 703291', function() {

    it('Should right click on "Communications" group value from "Port. Weight" column and select "Audit Value"', function() {
      SlickGridFunctions.getCellReference('Weights', 'Communications', '', 'Port. Weight', undefined).then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying if "Audit Mode" page is opened', function() {
      AuditMode.isAuditMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Audit Mode" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Report view "Communications" value of "Port. Weight" column match with Audit view ' + '"Port. Weight" column values', function() {
      AuditMode.getValueFromCalculatedReport('Weights', 'Communications', 'Port. Weight', undefined, undefined, undefined).then(function(auditValue) {
        AuditMode.getValueFromCalculatedReport('Port. Weight', 'Communications', 'Port. Weight', undefined, undefined, undefined).then(function(reportValue) {
          AuditMode.roundAndMatch(auditValue, reportValue);
        });
      });
    });

    it('Verifying if the title if Audit view is set to "Port. Weight"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(text) {
        if (text !== 'Port. Weight') {
          expect(false).customError('Audit view title is not displayed as "Port. Weight", Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 703292', function() {

    it('Should click on "Communications" row value under "Port. Ending Weight_2" column in report view', function() {
      SlickGridFunctions.getCellReference('Weights', 'Communications', '', 'Port. Ending Weight_2', undefined, undefined).then(function(reference) {
        reference.click().then(function() {
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying audit section Title is "Port. Ending Weight_2"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(title) {
        if (title !== 'Port. Ending Weight_2') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit title is not matched with "Port. Ending Weight_2", Found: ' + title);
        }
      });
    });
  });

  describe('Test Step ID: 706783', function() {

    it('Should click on "Done" button to close the Audit mode', function() {
      ThiefHelpers.getButtonClassReference('Done').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Done" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Weights" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if "Audit Mode" page is close', function() {
      AuditMode.isAuditMode().then(function(flag) {
        if (flag) {
          expect(false).customError('"Audit Mode" page did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the folder icon on app toolbar', function() {
      PA3MainPage.getFolderDropDown().click();
    });

    it('Should select "New" from list', function() {
      PA3MainPage.getOptionFromFolderMenu('New').click();
    });

    it('Should wait for "Weights" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if "Weights" report loaded without any error', function() {

      // Verifying if "Weights" report calculated
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Weights" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Contribution" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should right click on "Consumer Durables" group value from "Bench. Weight" column and select "Audit Value"', function() {
      SlickGridFunctions.getCellReference('Weights', 'Consumer Durables', '', 'Bench. Weight', undefined).then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying if "Audit Mode" page is opened', function() {
      AuditMode.isAuditMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Audit Mode" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Done" button to close the Audit mode', function() {
      ThiefHelpers.getButtonClassReference('Done').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Done" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Weights" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if "Audit Mode" page is close', function() {
      AuditMode.isAuditMode().then(function(flag) {
        if (flag) {
          expect(false).customError('"Audit Mode" page did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Consumer Durables" in "Weights" report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Consumer Durables');
    });

    it('Verifying if "Consumer Durables" grouping is expanded', function() {
      // Verifying that "Consumer Durables" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Consumer Durables');
    });
  });

  describe('Test Step ID: 706784', function() {

    it('Should click maximize square box in "Weights" tile', function() {
      PA3MainPage.getMaximizeOrMinimizeWindowButton('Weights').click();

      // Verifying if Report is maximized
      PA3MainPage.getMaximizeOrMinimizeWindowButton('Weights').getAttribute('ng-if').then(function(text) {
        if (text.indexOf('maximize') < 0) {
          expect(false).customError('Report did not maximize');
          CommonFunctions.takeScreenShot();
        }
      });

      browser.sleep(5000);
    });

    it('Should right click on "Communications" group value from "Port. Weight" column and select "Audit Value"', function() {
      SlickGridFunctions.getCellReference('Weights', 'Communications', '', 'Port. Weight', undefined).then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying if "Audit Mode" page is opened', function() {
      AuditMode.isAuditMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Audit Mode" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Communications" in "Weights" report', function() {
      AuditMode.expandTreeInCalculatedReport('Weights', 'Communications');
    });

    it('Verifying if "Communications" grouping is expanded in "Weights" report view', function() {
      // Verifying that "Communications" is expanded
      AuditMode.checkIfTreeExpandedInCalculatedReport('Weights', 'Communications');
    });
  });

  describe('Test Step ID: 711719', function() {

    it('Should click on "Done" button to close the Audit mode', function() {
      ThiefHelpers.getButtonClassReference('Done').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Done" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Weights" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if "Audit Mode" page is close', function() {
      AuditMode.isAuditMode().then(function(flag) {
        if (flag) {
          expect(false).customError('"Audit Mode" page did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the folder icon on app toolbar', function() {
      PA3MainPage.getFolderDropDown().click();
    });

    it('Should select "New" from list', function() {
      PA3MainPage.getOptionFromFolderMenu('New').click();
    });

    it('Verifying if "Document has changed" pop up is appeared on the screen and click on "Don\'t Save Changes" button', function() {
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(found) {
        if (found) {
          PA3MainPage.getButton('Don\'t Save Changes').click().then(function() {
          }, function(error) {

            CommonFunctions.takeScreenShot();
            expect(false).customError(error);
          });

          // Verifying that error pop-up is disappeared
          PA3MainPage.getDialog('Document has changed').isPresent().then(function(found) {
            if (found) {
              expect(false).customError('"Document has changed" dialog is not disappeared');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });

    it('Should open PA3 Application with "Client:/Pa3/Audit/audit_tile_resize"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('audit-tile-resize');
    });

    it('Verifying if the report is loaded with 4 tiles', function() {
      PA3MainPage.getAllTilesFromReport().count().then(function(count) {
        if (count !== 4) {
          expect(false).customError('Report is not loaded with two reports, Found: ' + count);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if 3 tiles are displayed in the left side of report view', function() {
      PA3MainPage.getMatrixTile(1, 1, undefined, true).count().then(function(count) {
        if (count !== 3) {
          expect(false).customError('Report is not loaded with 3 reports on left side of report view, Found: ' + count);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if 1 tiles are displayed in the right side of report view', function() {
      PA3MainPage.getMatrixTile(1, 2, undefined, true).count().then(function(count) {
        if (count !== 1) {
          expect(false).customError('Report is not loaded with one report on right side of report view, Found: ' + count);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if 3 tile in the left of report display with scroll bars', function() {
      PA3MainPage.getMatrixTile(1, 1, undefined, true).then(function(refArray) {
        refArray.forEach(function(tileRef) {
          tileRef.getText().then(function(tileName) {
            PA3MainPage.isScrollBarPresent(tileName, undefined, 'Veritical');
          });
        });
      });
    });
  });

  describe('Test Step ID: 711720', function() {

    it('Should right click on "Commercial Services" group value from "Port. Weight" column and select "Audit Value"', function() {
      SlickGridFunctions.getCellReference('Weights', 'Commercial Services', '', 'Port. Weight', undefined).then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying if "Audit Mode" page is opened', function() {
      AuditMode.isAuditMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Audit Mode" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if vertical scroll bar is not displayed in weights report in Audit view', function() {
      PA3MainPage.isScrollBarPresent('Weights', undefined, 'Vertical', false, true);
    });
  });

  describe('Test Step ID: 725145', function() {

    it('Should click on "Done" button to close the Audit mode', function() {
      ThiefHelpers.getButtonClassReference('Done').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Done" button');
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should launch PA3 application with "Client:Pa3;audit;audit_GRP_Security"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('audit-grp-security');
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('2 Factor Brinson Attribution');

    it('Should right click on the "Port. Total Return" value for "09-JUN-2016 to 10-JUN-2016" header for ' +
      '"Fixed Income|Americas" row and select audit Value', function() {
      SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Americas', '', 'Port. Total Return',
        '09-JUN-2016 to 10-JUN-2016', 'Fixed Income').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Verify that application is changed to "AUDIT" mode', function() {
      AuditMode.isAuditMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit Mode" is not appeared in the view');
        }
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verify that Report View "Port. Total return" value should match with Audit view "Port. Total Return" value', function() {
      SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Americas', '', 'Port. Total Return',
        '09-JUN-2016 to 10-JUN-2016', 'Fixed Income').then(function(reportValueRef) {
        reportValueRef.getText().then(function(reportValue) {
          SlickGridFunctions.getCellReference('Port. Total Return', 'Americas', '', 'Port. Total Return', undefined, 'Fixed Income').then(function(value) {
            value.getText().then(function(auditValue) {
              AuditMode.roundAndMatch(reportValue, auditValue);
            });
          });
        });
      });
    });

    it('Verifying audit section Title is "Port. Total Return"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Port. Total Return') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Port. Total Return". Found' + value);
        }
      });
    });

  });

  describe('Test Step ID: 725206', function() {

    it('Should click on "Done" button to close the Audit mode', function() {
      ThiefHelpers.getButtonClassReference('Done').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Done" button');
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('2 Factor Brinson Attribution');

    it('Should right click on the "Port. Total Return" value for "09-JUN-2016 to 10-JUN-2016" header for ' +
      '"Fixed Income|Americas|Ford Motor Company 4.75% 15-jan-2043" row and select audit Value', function() {
      SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Ford Motor Company 4.75% 15-jan-2043', '', 'Port. Total Return',
        '09-JUN-2016 to 10-JUN-2016', 'Fixed Income|Americas').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Verify that application is changed to "AUDIT" mode', function() {
      AuditMode.isAuditMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit Mode" is not appeared in the view');
        }
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verify that Report View "Port. Total return" value should match with Audit view "Port. Total Return" value', function() {
      SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Ford Motor Company 4.75% 15-jan-2043', '', 'Port. Total Return',
        '09-JUN-2016 to 10-JUN-2016', 'Fixed Income|Americas').then(function(reportValueref) {
        reportValueref.getText().then(function(reportValue) {
          AuditMode.getReportInputsSectionValues(6, 2).getText().then(function(value) {
            AuditMode.roundAndMatch(reportValue, value);
          });
        });
      });
    });

    it('Verifying audit section Title is "Port. Total Return"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Port. Total Return') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Port. Total Return". Found' + value);
        }
      });
    });

  });

});
