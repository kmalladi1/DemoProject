'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: dates-order', function() {

  var colNames = ['Ticker', '', 'HSFI_BBCODE', 'ISAV(HSFI_BBCODE)=1', 'ISON_HSFI_UNIV'];

  var gridElementsArray = [];

  describe('Test Step ID: 685585', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/PA3/HSBC_UNKNOWN" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('hsbc-unknown');
    });

    it('Waiting for "Contribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Contribution" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(found) {
        if (!found) {
          expect(false).customError('"Contribution" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Portfolio widget is populated with "CLIENT:/PA3/HSBC_UNKNOWN.ACTM"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathPortfolioWidget).getText().then(function(text) {
        if (text !== 'CLIENT:/PA3/HSBC_UNKNOWN.ACTM') {
          expect(false).customError('Portfolio widget is not populated with "CLIENT:/PA3/HSBC_UNKNOWN.ACTM"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that the "Benchmark" widget is displayed blank', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathBenchmarkWidget).getText().then(function(text) {
        if (text !== '') {
          expect(false).customError('"Benchmark" widget is not blank; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Recording column values of "Ticker", "", "HSFI_BBCODE", "ISAV(HSFI_BBCODE)=1", "ISON_HSFI_UNIV" in an array for later verification', function() {
      colNames.forEach(function(colName) {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', colName).then(function(colvalues) {
          gridElementsArray.push(colvalues);
        });
      });
    });
  });

  describe('Test Step ID: 685586', function() {

    it('Should click on "wrench" icon in the report', function() {
      PA3MainPage.selectWrenchIcon('Contribution');
    });

    it('Verifying if the "wrench" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Wrench" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Date Order" drop down and select "Latest to Earliest"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Date Order:').open();

      // Selecting Latest to Earliest
      ThiefHelpers.getDropDownSelectClassReference('Date Order:').selectItemByText('Latest to Earliest');
    });

    it('Verifying if the "Date Order" drop down is set to "Latest to Earliest"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Date Order:').getSelectedText().then(function(text) {
        if (text !== 'Latest to Earliest') {
          expect(false).customError('"Date Order" drop down did not set to "Latest to Earliest"; Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options" page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Contribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Contribution" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(found) {
        if (!found) {
          expect(false).customError('"Contribution" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    colNames.forEach(function(column, index) {

      // Values are stored from Step ID: 685585
      it('Verifying if the "' + column + '" column contains the previously stored values', function() {
        var flag = 0;
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', column).then(function(colvalues) {
          gridElementsArray[index].forEach(function(value, indexValue) {
            if (value !== colvalues[indexValue]) {
              flag = flag + 1;
              expect(false).customError('The "' + colvalues[indexValue] + '" in the "' + column + '" column did not match with "' + value + '" from the previous step in the "' + indexValue + '" row');
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 686586', function() {

    it('Should click on "wrench" icon in the report', function() {
      PA3MainPage.selectWrenchIcon('Contribution');
    });

    it('Verifying if the "wrench" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Wrench" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Date Order" drop down and select "Earliest to Latest"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Date Order:').open();

      // Selecting Earliest to Latest
      ThiefHelpers.getDropDownSelectClassReference('Date Order:').selectItemByText('Earliest to Latest');
    });

    it('Verifying if the "Date Order" drop down is set to "Earliest to Latest"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Date Order:').getSelectedText().then(function(text) {
        if (text !== 'Earliest to Latest') {
          expect(false).customError('"Date Order" drop down did not set to "Earliest to Latest"; Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options" page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Contribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Contribution" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(found) {
        if (!found) {
          expect(false).customError('"Contribution" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    colNames.forEach(function(column, index) {

      // Values are stored from Step ID: 685585
      it('Verifying if the "' + column + '" column contains the previously stored values', function() {
        var flag = 0;
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', column).then(function(colvalues) {
          gridElementsArray[index].forEach(function(value, indexValue) {
            if (value !== colvalues[indexValue]) {
              flag = flag + 1;
              expect(false).customError('The "' + colvalues[indexValue] + '" in the "' + column + '" column did not match with "' + value + '" from the previous step in the "' + indexValue + '" row');
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });
});
