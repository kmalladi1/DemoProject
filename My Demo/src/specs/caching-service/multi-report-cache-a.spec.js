'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: multi-report-cache-a', function() {

  var clickOnOkButtonOfCalculationErrorDialog = function() {
    ThiefHelpers.getDialogButton('Calculation Error', 'OK').click().then(function() {
    }, function(err) {
      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });

    // Verify if Calculation Error Dialog is closed
    ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
      if (found) {
        expect(false).customError('"Calculation Error" dialog is not closed');
        CommonFunctions.takeScreenShot();
      }
    });
  };

  describe('Test Step ID: 537699', function() {

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

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');
  });

  describe('Test Step ID: 537682', function() {

    it('Should select "Cache Report 2" from LHP', function() {
      PA3MainPage.getReports('Cache Report 2').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Cache Report 2" is selected
      expect(PA3MainPage.getReports('Cache Report 2').getAttribute('class')).toContain('selected');
    });

    it('Waiting for "Attribution" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(4000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();

      // Waiting for web elements to load
      browser.sleep(3000);
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

  describe('Test Step ID: 537683', function() {

    it('Should select "Cache Report 3" from LHP', function() {
      PA3MainPage.getReports('Cache Report 3').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Cache Report 3" is selected
      expect(PA3MainPage.getReports('Cache Report 3').getAttribute('class')).toContain('selected');
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

    });

    it('Verifying if "Calculation Error" dialog is displayed if Start Date and End date is same ', function() {
      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          PA3MainPage.getDateHyperLink().getText().then(function(value) {
            console.log(value);
            var dates = value.split(' - ');
            console.log(dates[0], dates[1]);
            if (dates[0] === dates[1]) {
              clickOnOkButtonOfCalculationErrorDialog();
            } else {
              expect(!found).customError('"Calculation Error" dialog is seen while "Attribution" report was calculating.');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });

    });
  });

  describe('Test Step ID: 537700', function() {

    it('Should open "Client:/Pa3/Automation/CACHE_DOC2" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('cache-doc2');
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Should click on the "Wrench" button on the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down menu appear
      expect(PA3MainPage.getWrenchIcon(true).isPresent()).toBeTruthy();
    });

    it('Should select "Automatic Calculation" option', function() {
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

  describe('Test Step ID: 537684', function() {

    it('Should select "Cache Report 5" from LHP', function() {
      PA3MainPage.getReports('Cache Report 5').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Cache Report 5" is selected
      expect(PA3MainPage.getReports('Cache Report 5').getAttribute('class')).toContain('selected');
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

  describe('Test Step ID: 537685', function() {

    it('Should select "Cache Report 6" from LHP', function() {
      PA3MainPage.getReports('Cache Report 6').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Cache Report 6" is selected
      expect(PA3MainPage.getReports('Cache Report 6').getAttribute('class')).toContain('selected');
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

  describe('Test Step ID: 537686', function() {

    it('Wait for 180 seconds', function() {
      // Waiting for 180 seconds (3 minutes)
      browser.sleep(180000);
    });

    it('Should open "Client:;Pa3;Automation;CACHE_DOC" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('cache-doc');
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

  describe('Test Step ID: 537687', function() {

    it('Should select "Cache Report 2" from LHP', function() {
      PA3MainPage.getReports('Cache Report 2').click();

      // Verifying that "Cache Report 2" is selected
      expect(PA3MainPage.getReports('Cache Report 2').getAttribute('class')).toContain('selected');
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

  describe('Test Step ID: 537688', function() {

    it('Should select "Cache Report 3" from LHP', function() {
      PA3MainPage.getReports('Cache Report 3').click();

      // Verifying that "Cache Report 3" is selected
      expect(PA3MainPage.getReports('Cache Report 3').getAttribute('class')).toContain('selected');
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

  describe('Test Step ID: 537689', function() {

    it('Wait for 180 seconds', function() {
      // Waiting for 180 seconds (3 minutes)
      browser.sleep(180000);
    });

    it('Should open "Client:/Pa3/Automation/CACHE_DOC2" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('cache-doc2');
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

  describe('Test Step ID: 537690', function() {

    it('Should select "Cache Report 5" from LHP', function() {
      PA3MainPage.getReports('Cache Report 5').click();

      // Verifying that "Cache Report 5" is selected
      expect(PA3MainPage.getReports('Cache Report 5').getAttribute('class')).toContain('selected');
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

  describe('Test Step ID: 537691', function() {

    it('Should select "Cache Report 6" from LHP', function() {
      PA3MainPage.getReports('Cache Report 6').click();

      // Verifying that "Cache Report 6" is selected
      expect(PA3MainPage.getReports('Cache Report 6').getAttribute('class')).toContain('selected');
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

  describe('Test Step ID: 639994', function() {

    it('Should select "Cache Report 5" from LHP', function() {
      PA3MainPage.getReports('Cache Report 5').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Cache Report 5" is selected
      expect(PA3MainPage.getReports('Cache Report 5').getAttribute('class')).toContain('selected');
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
});
