'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: grpgs-pe-rank', function() {

  var PEQuintileBeforeChange = [];
  var PEQuintileAfterChange = [];
  var values = [];
  var PEValueFirstPartBeforeChange = [];
  var PEValueSecondPartBeforeChange = [];
  var values1 = [];
  var PEValueFirstPartAfterChange = [];
  var PEValueSecondPartAfterChange = [];
  var screenShot = 0;

  describe('Test Step ID: 577319', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should select "2 Factor Brinson Attribution" option from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Attribution', '2 Factor Brinson Attribution').then(function(reportRef) {
        reportRef.click().then(function() {
        }, function() {
          expect(false).customError('Unable to select "2 Factor Brinson Attribution" option from LHP');
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should click the "Portfolio" widget search box and type "Russell:1000" and hit enter', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathPortfolioWidget).setText('Russell:1000', protractor.Key.ENTER);
    });

    it('Should click the "Benchmark" widget search box and type "Russell:2000" and hit enter', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathBenchmarkWidget).setText('Russell:2000', protractor.Key.ENTER);
    });

    it('Should wait for "2 Factor Brinson Attribution" and "2 Factor Brinson Attribution Over Time" reports to calculate', function() {
      // Waiting for "2 Factor Brinson Attribution" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('2 Factor Brinson Attribution'), 60000);

      // Waiting for "2 Factor Brinson Attribution Over Time" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('2 Factor Brinson Attribution Over Time'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for elements to load in DOM
      browser.sleep(3000);
    });

    it('Verifying if "2 Factor Brinson Attribution" report loaded without any error', function() {
      PA3MainPage.isReportCalculated('2 Factor Brinson Attribution').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"2 Factor Brinson Attribution" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('2 Factor Brinson Attribution')).toBeTruthy();
          PA3MainPage.isReportCalculated('2 Factor Brinson Attribution').then(function() {
          }, function(error) {
            expect(false).custsomError(error);
          });
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "2 Factor Brinson Attribution Over Time" report loaded without any error', function() {
      PA3MainPage.isInChartFormat('2 Factor Brinson Attribution Over Time').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"2 Factor Brinson Attribution Over Time" chart is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 577320', function() {

    it('Should click on "Restore" icon in "2 Factor Brinson Attribution" report to maximize the file', function() {
      PA3MainPage.getMaximizeOrMinimizeWindowButton('2 Factor Brinson Attribution').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Restore" icon in "2 Factor Brinson Attribution" report');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Wrench" icon from "2 Factor Brinson Attribution" report toolbar', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('2 Factor Brinson Attribution').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Wrench" icon from "2 Factor Brinson Attribution" ' + 'report toolbar');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Options" from the Wrench drop down', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function() {
        expect(false).customError('Unable to select "Options" from the Wrench drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Validating if "Tile Options" mode is opened', function() {
      TileOptions.isTileOptionsMode().then(function(status) {
        if (!status) {
          expect(false).customError('"Tile Options" mode is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Groupings from LHP', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on Groupings in LHP');
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Grouping is opened"
      TileOptions.getOptionTitle().getText().then(function(option) {
        if (option !== 'Groupings') {
          expect(false).customError('Groupings is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Clear All/X" icon from the  selected section', function() {
      ThiefHelpers.getButtonClassReference('Clear All').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Clear All/X" icon from the  selected section');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should type "earnings" in the Available section search field', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('earnings');

      // Waiting to load elements in DOM
      browser.sleep(2000);
    });

    it('Should double click on "Price to Earnings" under "FactSet > Equity" in Available section', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('FactSet|Equity', 'Pric' + 'e to Earnings')).perform();
    });

    it('Verifying if "Price to Earnings" is added to Selected section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Price to Earnings').isPresent().then(function(elementStatus) {
        if (!elementStatus) {
          expect(false).customError('"Price to Earnings" is not added to Selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Low Values Rank Higher" checkbox is not checked off under "Definition" section', function() {
      ThiefHelpers.getCheckBoxClassReference('Low Values Rank Higher').isChecked().then(function(checkBox) {
        if (checkBox) {
          expect(false).customError('"Low Values Rank Higher" checkbox is checked under "Definition" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 577321', function() {

    it('Should click on "OK" button at the top right corner of the report', function() {
      ThiefHelpers.getButtonClassReference('OK').press();
    });

    it('Verifying if "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(status) {
        if (status) {
          expect(false).customError('"Tile Options" mode is opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "2 Factor Brinson Attribution" report to calculate', function() {
      // Waiting for "2 Factor Brinson Attribution" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('2 Factor Brinson Attribution'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for elements to load in DOM
      browser.sleep(3000);
    });

    it('Verifying if "2 Factor Brinson Attribution" report is calculated', function() {
      PA3MainPage.isReportCalculated('2 Factor Brinson Attribution', true).then(function(displayed) {
        expect(displayed).customError('"2 Factor Brinson Attribution" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          PA3MainPage.isReportCalculated('2 Factor Brinson Attribution').then(function() {
          }, function(error) {
            expect(false).customError(error);
          });
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should get the values of "PE Quintile" groups from slick-grid in "2 Factor Brinson Attribution" report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('2 Factor Brinson Attribution', '', '').then(function(PEQuintileGroupArray) {
        for (var i = 1; i < PEQuintileGroupArray.length - 1; i++) {
          PEQuintileBeforeChange.push(PEQuintileGroupArray[i]);
        }
      });
    });

    it('Should split the "PE Quintile" group value and storing in arrays for future comparison', function() {
      // Splitting the names of expand collapse icons, to get only values from the name
      PEQuintileBeforeChange.forEach(function(quintile) {
        values.push(quintile.split(': ')[1]);
      });
      for (var i = 0; i < values.length; i++) {
        PEValueFirstPartBeforeChange.push(values[i].split(' -')[0]);
        PEValueSecondPartBeforeChange.push(values[i].split(' -')[1]);
      }
    });

    it('Verifying if lowest "PE Quintile" value is displayed at the bottom of the list', function() {
      for (var i = 0; i < PEValueFirstPartBeforeChange.length; i++) {
        if (PEValueFirstPartBeforeChange[PEValueFirstPartBeforeChange.length - 1] > PEValueFirstPartBeforeChange[i] && PEValueSecondPartBeforeChange[PEValueSecondPartBeforeChange.length - 1] > PEValueSecondPartBeforeChange[i]) {
          screenShot++;
        }

        if (screenShot === 1) {
          expect(false).customError('Lowest "PE Quintile" value is not displayed at the bottom of the list');
          CommonFunctions.takeScreenShot();
        }
      }
    });
  });

  describe('Test Step ID: 577322', function() {

    it('Should click on "Price to Earnings" grouping hyperlink in "2 Factor Brinson Attribution" report', function() {
      PA3MainPage.getGroupingsHyperLink('2 Factor Brinson Attribution').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Price to Earnings" grouping hyperlink in "2 Factor Brinson Att' + 'ribution" report');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Options" mode is opened', function() {
      TileOptions.isTileOptionsMode().then(function(status) {
        if (!status) {
          expect(false).customError('"Tile Options" mode is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "Low Values Rank Higher" checkbox under "Definition" section', function() {
      ThiefHelpers.getCheckBoxClassReference('Low Values Rank Higher').isChecked().then(function(checkBox) {
        if (!checkBox) {
          ThiefHelpers.getCheckBoxClassReference('Low Values Rank Higher').check();
        }
      });
    });

    it('Should click on "OK" button at the top right corner of the report', function() {
      ThiefHelpers.getButtonClassReference('OK').press();
    });

    it('Verifying if "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(status) {
        if (status) {
          expect(false).customError('"Tile Options" mode is opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "2 Factor Brinson Attribution" report to calculate', function() {
      // Waiting for "2 Factor Brinson Attribution" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('2 Factor Brinson Attribution'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting to load Elements in DOM
      browser.sleep(3000);
    });

    it('Verifying if "2 Factor Brinson Attribution" report is calculated', function() {
      PA3MainPage.isReportCalculated('2 Factor Brinson Attribution').then(function(displayed) {
        expect(displayed).customError('"2 Factor Brinson Attribution" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('2 Factor Brinson Attribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should get the values of "PE Quintile" groups from slick-grid in "2 Factor Brinson Attribution" report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('2 Factor Brinson Attribution', '', '').then(function(PEQuintileGroupArray) {
        for (var i = 1; i < PEQuintileGroupArray.length - 1; i++) {
          PEQuintileAfterChange.push(PEQuintileGroupArray[i]);
        }
      });
    });

    it('Should split the "PE Quintile" group value and storing in arrays for future comparison', function() {
      // Splitting the names of expand collapse icons, to get only values from the name
      PEQuintileAfterChange.forEach(function(quintile) {
        values1.push(quintile.split(': ')[1]);
      });
      for (var i = 0; i < values1.length; i++) {
        PEValueFirstPartAfterChange.push(values1[i].split(' -')[0]);
        PEValueSecondPartAfterChange.push(values1[i].split(' -')[1]);
      }
    });

    it('Verifying if lowest "PE Quintile" value is displayed at the top of the list', function() {
      for (var i = 0; i < PEValueFirstPartAfterChange.length; i++) {
        if (PEValueFirstPartAfterChange[0] > PEValueFirstPartAfterChange[i] && PEValueSecondPartAfterChange[0] > PEValueSecondPartAfterChange[i]) {
          screenShot++;
        }

        if (screenShot === 1) {
          expect(false).customError('Lowest "PE Quintile" value is not displayed at the top of the list');
          CommonFunctions.takeScreenShot();
        }
      }
    });
  });
});
