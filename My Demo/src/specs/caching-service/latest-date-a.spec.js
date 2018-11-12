'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: latest-date-a', function() {

  describe('Test Step ID: 537693', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should clear the cache before opening "CACHE_LATEST" document', function() {
      browser.executeAsyncScript(function(callback) {
        callback(angular.element($('#pa3App')).injector().get('paReportCalcCache').deleteServerCache());
      }).then(function(value) {
        expect(value.$$state.status).toEqual(0);
      });
    });

    it('Should open "Client:/Pa3/Automation/CACHE_LATEST" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('cache-latest');
    });

    it('Should select "Automatic Calculation" option', function() {
      // Un-check "Automatic Calculation" to force re-check it
      PA3MainPage.getWrenchIcon().click();
      PA3MainPage.setAutomaticCalculation(false);

      // Click on Wrench button to select "Automatic Calculation"
      PA3MainPage.getWrenchIcon().click();
      expect(PA3MainPage.setAutomaticCalculation(true)).toBeTruthy();
    });

    it('Waiting for "Attribution" and "Attribution 2" reports to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Attribution'), 300000)).toBeTruthy();

      // Waiting for "Attribution 2" report's progress bar to disappear
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Attribution 2'), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" and "Attribution 2" reports appeared without any issues', function() {
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

      // Check if report calculation indication exist in DOM
      PA3MainPage.isReportCalculated('Attribution 2', true).then(function(reportExistInDom) {
        if (!reportExistInDom) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Attribution 2').then(function(reportVisible) {
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
        expect(!found).customError('"Calculation Error" dialog is seen while "Attribution" ' + 'or "Attribution2" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for 180 seconds', function() {
      // Waiting for 180 seconds (3 minutes)
      browser.sleep(180000);
    });
  });

  describe('Test Step ID: 537701', function() {

    it('Re-open the "CACHE_LATEST" document', function() {
      // Refresh the web page
      browser.refresh(120);

      // Wait for report calculation to start
      browser.sleep(5000);

      // Close QA Info Box if it is found
      PA3MainPage.closeQAInfoBox();
    });

    it('Waiting for "Attribution" and "Attribution 2" reports to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Attribution'), 300000)).toBeTruthy();

      // Waiting for "Attribution 2" report's progress bar to disappear
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Attribution 2'), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" and "Attribution 2" reports appeared without any issues', function() {
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

      // Check if report calculation indication exist in DOM
      PA3MainPage.isReportCalculated('Attribution 2', true).then(function(reportExistInDom) {
        if (!reportExistInDom) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Attribution 2').then(function(reportVisible) {
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
        expect(!found).customError('"Calculation Error" dialog is seen while ' + '"Attribution" or "Attribution2" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if text saying "Cached Data from" appeared next to "Footnotes"', function() {
      PA3MainPage.getCachedData().isPresent().then(function(found) {
        expect(!found).customError('"Cached data from" message is displayed in the "Attribution" report.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 537692', function() {

    it('Should click on the "Refresh" icon from the application toolbar', function() {
      PA3MainPage.getRefreshIcon().click().then(function() {}, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Wait for report calculation to start
      browser.sleep(5000);
    });

    it('Waiting for "Attribution" and "Attribution 2" reports to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Attribution'), 300000)).toBeTruthy();

      // Waiting for "Attribution 2" report's progress bar to disappear
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Attribution 2'), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" and "Attribution 2" reports appeared without any issues', function() {
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

      // Check if report calculation indication exist in DOM
      PA3MainPage.isReportCalculated('Attribution 2', true).then(function(reportExistInDom) {
        if (!reportExistInDom) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Attribution 2').then(function(reportVisible) {
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
        expect(!found).customError('"Calculation Error" dialog is seen while ' + '"Attribution" or "Attribution2" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that warning message saying "report is displaying cached data..." is not displayed', function() {
      PA3MainPage.getReportCachingAlertIcon('Attribution').isPresent().then(function(found) {
        expect(!found).customError('"Report is displaying cached data" alert is ' + 'displayed in the "Attribution" report.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });

      PA3MainPage.getReportCachingAlertIcon('Attribution2').isPresent().then(function(found) {
        expect(!found).customError('"Report is displaying cached data" alert is ' + 'displayed in the "Attribution2" report.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
