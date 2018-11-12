'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: mult-port-bench-a', function() {

  describe('Test Step ID: 537673', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should clear the cache before opening "CACHE_DOC" document', function() {
      browser.executeAsyncScript(function(callback) {
        callback(angular.element($('#pa3App')).injector().get('paReportCalcCache').deleteServerCache());
      }).then(function(value) {
        expect(value.$$state.status).toEqual(0);
      });
    });

    it('Should open "Client:/Pa3/Automation/CACHE_DOC" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('cache-doc');
    });

    it('Should select "Automatic Calculation" option', function() {
      // Un-check "Automatic Calculation" to force re-check it
      PA3MainPage.getWrenchIcon().click();
      PA3MainPage.setAutomaticCalculation(false);

      // Click on Wrench button to select "Automatic Calculation"
      PA3MainPage.getWrenchIcon().click();
      expect(PA3MainPage.setAutomaticCalculation(true)).toBeTruthy();
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      // Check if report calculation indication exist in DOM
      PA3MainPage.isReportCalculated('Attribution', true).then(function(reportExistInDom) {
        if (!reportExistInDom) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Attribution').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Attribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 537674', function() {

    it('Should click on "Save" icon from application toolbar', function() {
      PA3MainPage.getSaveIcon().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Document has changed" dialog box appeared', function() {
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Document has changed" dialog box has not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save Changes" button to save the current changes', function() {
      PA3MainPage.getButton('Save Changes').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that 'Document has changed' dialog box disappeared
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(disapeared) {
        if (disapeared) {
          expect(false).customError('"Document has changed" dialog box is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 537694', function() {

    it('Wait for 180 seconds and re-open the "CACHE_DOC" document', function() {
      // Waiting for 180 seconds (3 minutes)
      browser.sleep(180000);

      PA3MainPage.launchHtmlDialogAndOpenDocument('cache-doc');

      // Close QA Info box if present
      PA3MainPage.closeQAInfoBox();

      // Select "Automatic Calculation" if it is not selected
      PA3MainPage.getWrenchIcon().click();
      PA3MainPage.setAutomaticCalculation(true);
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      // Check if report calculation indication exist in DOM
      PA3MainPage.isReportCalculated('Attribution', true).then(function(reportExistInDom) {
        if (!reportExistInDom) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Attribution').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while ' + '"Attribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if text saying "Cached data from" appeared next to "Footnotes"', function() {
      PA3MainPage.getCachedData().isPresent().then(function(option) {
        if (option) {
          PA3MainPage.getCachedData().getText().then(function(text) {
            if (text.indexOf('Cached data from') < 0) {
              expect(false).customError('The message saying ' + '"Cached data from..." is not displayed next to Footnotes.');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('The message saying ' + '"Cached data from..." is not displayed next to Footnotes.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 537675', function() {

    it('Should click on the "Hamburger" icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "MSCI Europe" from the list of accounts', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'MSCI Europe').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "MSCI Europe" account is selected
      expect(PA3MainPage.getSingleAccountFromList('Portfolio', 'MSCI Europe').getAttribute('class')).toContain('selected');
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class')).not.toContain('active');
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      // Check if report calculation indication exist in DOM
      PA3MainPage.isReportCalculated('Attribution', true).then(function(reportExistInDom) {
        if (!reportExistInDom) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Attribution').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Attribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 537676', function() {

    it('Should click on the "Hamburger" icon next to "Benchmark" widget', function() {
      PA3MainPage.getHamburgerIcon('Benchmark').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Russell 2000" from the list of accounts', function() {
      PA3MainPage.getSingleAccountFromList('Benchmark', 'Russell 2000').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Russell 2000" account is selected
      expect(PA3MainPage.getSingleAccountFromList('Benchmark', 'Russell 2000').getAttribute('class')).toContain('selected');
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Benchmark', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Benchmark').getAttribute('Class')).not.toContain('active');
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      // Check if report calculation indication exist in DOM
      PA3MainPage.isReportCalculated('Attribution', true).then(function(reportExistInDom) {
        if (!reportExistInDom) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Attribution').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Attribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 537677', function() {

    it('Should click on the "Hamburger" icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "MSCI EAFE" from the list of accounts', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'MSCI EAFE').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "MSCI EAFE" account is selected
      expect(PA3MainPage.getSingleAccountFromList('Portfolio', 'MSCI EAFE').getAttribute('class')).toContain('selected');
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class')).not.toContain('active');
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      // Check if report calculation indication exist in DOM
      PA3MainPage.isReportCalculated('Attribution', true).then(function(reportExistInDom) {
        if (!reportExistInDom) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Attribution').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Attribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 537695', function() {

    it('Should click on the "Hamburger" icon next to "Benchmark" widget', function() {
      PA3MainPage.getHamburgerIcon('Benchmark').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Russell 3000" from the list of accounts', function() {
      PA3MainPage.getSingleAccountFromList('Benchmark', 'Russell 3000').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Russell 3000" account is selected
      expect(PA3MainPage.getSingleAccountFromList('Benchmark', 'Russell 3000').getAttribute('class')).toContain('selected');
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Benchmark', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Benchmark').getAttribute('Class')).not.toContain('active');
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      // Check if report calculation indication exist in DOM
      PA3MainPage.isReportCalculated('Attribution', true).then(function(reportExistInDom) {
        if (!reportExistInDom) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Attribution').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Attribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 537678', function() {

    it('Should click on "Save" icon from application toolbar', function() {
      PA3MainPage.getSaveIcon().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Document has changed" dialog box appeared', function() {
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Document has changed" dialog box has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save Changes" button to save the current changes', function() {
      PA3MainPage.getButton('Save Changes').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that 'Document has changed' dialog box disappeared
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(disapeared) {
        if (disapeared) {
          expect(false).customError('"Document has changed" dialog box is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 537696', function() {

    it('Wait for 180 seconds and re-open the "CACHE_DOC" document', function() {
      // Waiting for 180 seconds (3 minutes)
      browser.sleep(180000);

      PA3MainPage.launchHtmlDialogAndOpenDocument('cache-doc');

      // Close QA Info box if present
      PA3MainPage.closeQAInfoBox();

      // Select "Automatic Calculation" if it is not selected
      PA3MainPage.getWrenchIcon().click();
      PA3MainPage.setAutomaticCalculation(true);
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      // Check if report calculation indication exist in DOM
      PA3MainPage.isReportCalculated('Attribution', true).then(function(reportExistInDom) {
        if (!reportExistInDom) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Attribution').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Attribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that report opened with "MSCI:EAFE" portfolio selected', function() {
      PA3MainPage.getWidgetBox('Portfolio').getAttribute('value').then(function(name) {
        if (name !== 'MSCI:EAFE') {
          expect(false).customError('The report opened with portfolio selected as "' + name + '" but Expected: "MSCI:EAFE" .');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that report opened with "RUSSELL:3000" benchmark selected', function() {
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(name) {
        if (name !== 'RUSSELL:3000') {
          expect(false).customError('The report opened with benchmark selected as "' + name + ' but Expected: ""RUSSELL:3000" ');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if text saying "Cached data from" appeared next to "Footnotes"', function() {
      PA3MainPage.getCachedData().isPresent().then(function(option) {
        if (option) {
          PA3MainPage.getCachedData().getText().then(function(text) {
            if (text.indexOf('Cached data from') < 0) {
              expect(false).customError('The message saying ' + '"Cached data from..." is not displayed next to Footnotes.');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('The message saying ' + '"Cached data from..." is not displayed next to Footnotes.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 537679', function() {

    it('Should click on the "Hamburger" icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "MSCI Europe" from the list of accounts', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'MSCI Europe').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "MSCI Europe" account is selected
      expect(PA3MainPage.getSingleAccountFromList('Portfolio', 'MSCI Europe').getAttribute('class')).toContain('selected');
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class')).not.toContain('active');
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      // Check if report calculation indication exist in DOM
      PA3MainPage.isReportCalculated('Attribution', true).then(function(reportExistInDom) {
        if (!reportExistInDom) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Attribution').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Attribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if text saying "Cached data from" appeared next to "Footnotes"', function() {
      PA3MainPage.getCachedData().isPresent().then(function(option) {
        if (option) {
          PA3MainPage.getCachedData().getText().then(function(text) {
            if (text.indexOf('Cached data from') < 0) {
              expect(false).customError('The message saying ' + '"Cached data from..." is not displayed next to Footnotes.');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('The message saying ' + '"Cached data from..." is not displayed next to Footnotes.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 537697', function() {

    it('Should click on the "Hamburger" icon next to "Benchmark" widget', function() {
      PA3MainPage.getHamburgerIcon('Benchmark').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Russell 2000" from the list of accounts', function() {
      PA3MainPage.getSingleAccountFromList('Benchmark', 'Russell 2000').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Russell 2000" account is selected
      expect(PA3MainPage.getSingleAccountFromList('Benchmark', 'Russell 2000').getAttribute('class')).toContain('selected');
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Benchmark', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Benchmark').getAttribute('Class')).not.toContain('active');
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      // Check if report calculation indication exist in DOM
      PA3MainPage.isReportCalculated('Attribution', true).then(function(reportExistInDom) {
        if (!reportExistInDom) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Attribution').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Attribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if text saying "Cached data from" appeared next to "Footnotes"', function() {
      PA3MainPage.getCachedData().isPresent().then(function(option) {
        if (option) {
          PA3MainPage.getCachedData().getText().then(function(text) {
            if (text.indexOf('Cached data from') < 0) {
              expect(false).customError('The message saying ' + '"Cached data from..." is not displayed next to Footnotes.');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('The message saying ' + '"Cached data from..." is not displayed next to Footnotes.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 690295', function() {

    it('Should right click on the "Total" value for "Variation > Total Return Difference" header and select audit Value', function() {
      SlickGridFunctions.getCellReference('Attribution', 'Total', '', 'Total Return Difference').then(function(reference) {
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

    it('Verifying if "Total" value for "Variation > Total Return Difference" is highlighted in report view', function() {
      SlickGridFunctions.getCellReference('Attribution', 'Total', '', 'Total Return Difference').then(function(reference) {
        reference.getAttribute('class').then(function(val) {
          if (val.indexOf('selected') < 0) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('"Total" value for "Variation > Total Return Difference" is not highlighted');
          }
        });
      });
    });

    it('Verifying that the Audit view is calculated for "Total Return Difference"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Total Return Difference') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Total Return Difference", Found: ' + value);
        }
      });
    });

    it('Verifying if Audit view is calculated for "Total"', function() {
      AuditMode.getAuditViewSubHeaderName().getText().then(function(value) {
        if (value !== 'Total') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated with "Total" security, Found: ' + value);
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "5/19/2009"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '22-MAR-2013 - 04-FEB-2015') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated with "22-MAR-2013 - 04-FEB-2015" date range, Found: ' + value);
        }
      });
    });

    it('Verifying that description section is displayed with Title "Variation in Total Return"', function() {
      AuditMode.getColumnHelpSectionName().getText().then(function(value) {
        if (value !== 'Variation in Total Return') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Description section is not displayed with Title "Variation in Total Return"');
        }
      });
    });

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Done" button' + err);
      });
    });

    it('Verifying if "Audit view" is closed without any issue', function() {
      AuditMode.isAuditMode().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit Mode" is not closed.');
        }
      });
    });
  });
});
