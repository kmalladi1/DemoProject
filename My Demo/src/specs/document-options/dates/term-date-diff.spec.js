'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: term-date-diff', function() {

  var arrMultiHeaders = [];

  var verifyMultiHeader = function(levelNumber) {

    var takeScreenShot = 0;
    it('Verifying if "Beginning of Period" header names of "' + levelNumber + '" level are same as "End of Period"', function() {
      PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Beginning of Period', levelNumber).then(function(beginningHeaders) {
        PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('End of Period', levelNumber).then(function(endingHeaders) {
          if (levelNumber === 1) {
            arrMultiHeaders = beginningHeaders;
          }

          beginningHeaders.forEach(function(beginingHeaderName, index) {
            if (beginingHeaderName !== endingHeaders[index]) {
              expect(false).customError('"Beginning of Period" header name: "' + beginingHeaderName + '" is not ' +
                'same as "End of Period" header name: "' + endingHeaders[index] + '" at level ' + levelNumber);
              takeScreenShot++;
              if (takeScreenShot === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

  };

  describe('Test Step ID: 556182', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:/Pa3/Dates/Term_Date_4" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('term-date-4');
    });

    it('Should select "Automatic Calculation" option is not selected', function() {
      // Check if "Progress Spinner" is seen
      browser.wait(function() {
        return PA3MainPage.getReportCalculationDlg('Contribution').isPresent().then(function(visible) {
          return visible;
        });
      }, 10000).then(function() {
      }, function() {
        // Un-check "Automatic Calculation" to force re-check it
        PA3MainPage.getWrenchIcon().click();
        PA3MainPage.setAutomaticCalculation(false);

        // Click on Wrench button to select "Automatic Calculation"
        PA3MainPage.getWrenchIcon().click();
        expect(PA3MainPage.setAutomaticCalculation(true)).toBeTruthy();
      });

    });

    it('Verify that "Contribution" report is calculated', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);

      // Check if report calculation indication exist in DOM
      PA3MainPage.isReportCalculated('Contribution', true).then(function(reportExistInDom) {
        if (!reportExistInDom) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Contribution').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Contribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 556183', function() {

    it('Should click on Portfolio Account drop down', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click();
    });

    it('Should select "5 Day Test (5/2 to 9/16; 9/17 to 10/4)" account from the drop down', function() {
      PA3MainPage.getSingleAccountFromList('portfolio', '5 Day Test (5/2 to 9/16; 9/17 to 10/4)').click();
    });

    it('Should click on "OK" to close the drop down', function() {
      PA3MainPage.getOkOrCancelButton('portfolio', 'OK').click();
    });

    it('Verify that "Contribution" report calculates', function() {
      browser.sleep(2000);
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);

      // Check if report calculation indication exist in DOM
      PA3MainPage.isReportCalculated('Contribution', true).then(function(reportExistInDom) {
        if (!reportExistInDom) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Contribution').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Contribution" report: ' + err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Contribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 556184', function() {

    it('Should click on Portfolio Account drop down', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click();
    });

    it('Should select "Contains 1_TBR, 4_TBR, 5_TBR (from 5/2 to 10/4)" account from the drop down', function() {
      PA3MainPage.getSingleAccountFromList('portfolio', 'Contains 1_TBR, 4_TBR, 5_TBR (from 5/2 to 10/4)').click();
    });

    it('Should click on OK to close the drop down', function() {
      PA3MainPage.getOkOrCancelButton('portfolio', 'OK').click();
    });

    it('Verify that "Contribution" report calculates', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);

      //verifying if Contribution report is calculated
      expect(PA3MainPage.getReportCalculationDlg('Contribution')).toBeTruthy();
    });

  });

  describe('Test Step ID: 764286', function() {

    it('Should click on the "Wrench" button on the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();

      // Verifying if drop down menu appear.
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Wrench dropdown is not present.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should uncheck "Automatic Calculation" option', function() {
      PA3MainPage.setAutomaticCalculation(false).then(function(option) {
        if (!option) {
          expect(false).customError('"Automatic Calculation" is checked.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should launch PA3 Application with "Client:;Pa3;Audit;AUDIT_PERF" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('multiPort_highLow_endofPeriod');
    });

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    var arrReports = ['Beginning of Period', 'End of Period'];

    arrReports.forEach(function(reportname) {
      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportname);
    });

    it('Verifying if "Beginning of Period" date range is same as "End of Period" date range', function() {
      PA3MainPage.getDateHyperLink('Beginning of Period').getText().then(function(value1) {
        PA3MainPage.getDateHyperLink('End of Period').getText().then(function(value2) {
          if (value1 !== value2) {
            expect(false).customError('"Beginning of Period" date range ("' + value1 + '") is not same as ' +
              '"End of Period" date range ("' + value2 + '")');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if the groupings hyperlink for "Beginning of Period" report is same as "End of Period" report', function() {
      PA3MainPage.getGroupingsHyperLink('Beginning of Period').getText().then(function(text1) {
        PA3MainPage.getGroupingsHyperLink('End of Period').getText().then(function(text2) {
          if (text1 !== text2) {
            expect(false).customError('Grouping hyperlink for "Beginning of Period" report ("' + text1 + '") is not ' +
              'same as "End of Period" report ("' + text2 + '")');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    verifyMultiHeader(1);

    verifyMultiHeader(2);

    var screenShot = 0;
    it('Verifying if "Beginning of Period" column names are same as "End of Period" column names', function() {
      SlickGridFunctions.getColumnNames('Beginning of Period').then(function(beginningColumnNames) {
        SlickGridFunctions.getColumnNames('End of Period').then(function(endColumnNames) {
          beginningColumnNames.forEach(function(beginningColumnName, index) {
            if (beginningColumnName !== endColumnNames[index]) {
              expect(false).customError('"Beginning of Period" column name: "' + beginningColumnName + '" is not same as ' +
                '"End of Period" column name: "' + endColumnNames[index] + '"');
              screenShot++;
              if (screenShot === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

    it('Verify if "Beginning of Period" row names are same as "End of Period" column names', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Beginning of Period', '').then(function(beginningRowName) {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('End of Period', '').then(function(endRowNames) {
          beginningRowName.forEach(function(rowName, index) {
            if (rowName !== endRowNames[index]) {
              expect(false).customError('"Beginning of Period" row name: "' + rowName + '" is not same as ' +
                '"End of Period" row name: "' + endRowNames[index] + '"');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if "Ticker" column is same for two reports', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Beginning of Period', 'Ticker').then(function(beginningRowName) {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('End of Period', 'Ticker').then(function(endRowNames) {
          beginningRowName.forEach(function(rowName, index) {
            if (rowName !== endRowNames[index]) {
              expect(false).customError('"Beginning of Period" row name: "' + rowName + '" is not same as ' +
                '"End of Period" row name: "' + endRowNames[index] + '"');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if values are displayed in "Beginning of Period" report are same for "End of Period" report', function() {
      arrMultiHeaders.forEach(function(multiHeaderName) {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Beginning of Period', 'Total Return', multiHeaderName).then(function(beginningcellValues) {
          SlickGridFunctions.getAllCellValuesFromSingleColumn('End of Period', 'Total Return', multiHeaderName).then(function(endCellValues) {
            beginningcellValues.forEach(function(cellValue, index) {
              if (parseFloat(cellValue).toFixed(2) !== parseFloat(endCellValues[index]).toFixed(2)) {
                expect(false).customError('"Beginning of Period" cell value: "' + parseFloat(cellValue).toFixed(2) + '" is not same as ' +
                  '"End of Period" cell value: "' + parseFloat(endCellValues[index]).toFixed(2) + '" at row number' + index);
                CommonFunctions.takeScreenShot();
              }
            });
          });
        });
      });
    });

  });

})
;
