'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-gemlt-curr', function() {

  //Variables
  var usEndOfLastYear = [];
  var usEndOfLastMonth = [];
  var jyEndOfLastYear = [];
  var jyEndOfLastMonth = [];
  var splitArray = [];
  var flag = 0;
  var riskModel = ['Barra Global Total Market Model for Long Term Investors - Stable Variant (GEMLTL)',
    'Axioma World-Wide Fundamental Equity Risk Model MH 2.1',
    'Barra Global Long-Term Model (GEM2L)',
    'Barra Global Long-Term Model (GEM3L)',];
  var riskFactor = ['Active Factor Risk', 'Active Risk'];

  describe('Test Step ID: 638353 ', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Risk/BARRAGEM-CCY-ADJ"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('barragem-ccy-adj');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk');

    var arrValues = [{name: 'Portfolio', val: 'US:DJII', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'CASH:JPY', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });

    it('Verifying the currency drop down value is "U.S. Dollar"', function() {
      ThiefHelpers.verifySelectedDropDownText('U.S. Dollar', undefined, PA3MainPage.xpathCurrencyDropdown);
    });

    it('Fetching the date range present on "Risk" reports workspace', function() {
      PA3MainPage.getDateHyperLink('Risk').getText().then(function(value) {
        splitArray = value.split(' ');
        if (!value) {
          expect(false).customError('Unable to fetch the date range');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    riskModel.forEach(function(riskModel) {
      it('Verifying if values are displayed for 2 rows (Active Factor Risk and Active Risk) in "' + riskModel + '" risk model' + ' for "End of Last Year Date" in us Dollar currency', function() {
        riskFactor.forEach(function(riskFactor) {
          SlickGridFunctions.getCellReference('Risk', riskFactor, '', 'Data', splitArray[0], riskModel).then(function(valueRef) {
            valueRef.getText().then(function(value) {
              if (value === null) {
                flag = flag + 1;
                expect(false).customError('values are not displayed for "' + riskFactor + '" rows  in "' + riskModel + '"');
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        });
      });
    });

    riskModel.forEach(function(riskModel) {
      it('Verifying if values are are displayed for 2 rows (Active Factor Risk and Active Risk) in "' + riskModel + '" risk model' + 'for "End of Last Month" in us Dollar currency', function() {
        riskFactor.forEach(function(riskFactor) {
          SlickGridFunctions.getCellReference('Risk', riskFactor, '', 'Data', splitArray[2], riskModel).then(function(valueRef) {
            valueRef.getText().then(function(value) {
              if (value === null) {
                flag = flag + 1;
                expect(false).customError('values are not displayed for "' + riskFactor + '" rows  in "' + riskModel + '"');
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        });
      });
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Risk', 'Dates');

    it('Verifying that the value of start date is displayed as "End of Last Year" and value of end date is displayed as " End of Last Month "', function() {
      ThiefHelpers.getDatepickerClassReference('Start Date:').getDate().then(function(value) {
        if (value !== 'End of Last Year') {
          expect(false).customError('End of Last Year is not selected in start date calender widget');
          CommonFunctions.takeScreenShot();
        }
      });

      //Verifying End of Last Month is selected in end date calender widget
      ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(value) {
        if (value !== 'End of Last Month') {
          expect(false).customError('End of Last Month is not selected in end date calender widget');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Risk');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk');
  });

  describe('Test Step ID: 653673 ', function() {

    riskModel.forEach(function(riskModel) {
      it('Should store values for 2 rows (Active Factor Risk and Active Risk) in "' + riskModel + '" risk models for the ' + ' date column " End of Last Year Date "  in us Dollar currency in "End of Last Year" array', function() {
        riskFactor.forEach(function(riskFactor) {
          SlickGridFunctions.getCellReference('Risk', riskFactor, '', 'Data', splitArray[0], riskModel).then(function(valueRef) {
            valueRef.getText().then(function(value) {
              usEndOfLastYear.push(value);
            });
          });
        });
      });
    });

    riskModel.forEach(function(riskModel) {
      it('Should store values for 2 rows (Active Factor Risk and Active Risk) in "' + riskModel + '" risk models for the' + '  date column " End of Last Month Date " in us Dollar currency in " usEndOfLastMonth " array  ', function() {
        riskFactor.forEach(function(riskFactor) {
          SlickGridFunctions.getCellReference('Risk', riskFactor, '', 'Data', splitArray[2], riskModel).then(function(valueRef) {
            valueRef.getText().then(function(value) {
              usEndOfLastMonth.push(value);
            });
          });
        });
      });
    });

    it('Verifying the values of two columns stored in two arrays are not empty', function() {
      if (usEndOfLastYear.length === 0) {
        expect(false).customError('"usEndOfLastYear" is empty array');
      }

      if (usEndOfLastMonth.length === 0) {
        expect(false).customError('"usEndOfLastMonth" is empty array');
      }
    });
  });

  describe('Test Step ID: 638354 ', function() {

    it('Should change the currency from "U.S. Dollar" to "Japanese Yen"', function() {
      ThiefHelpers.selectOptionFromDropDown('Japanese Yen', undefined, PA3MainPage.xpathCurrencyDropdown, 1);

      // Verify "Japanese Yen" is selected
      ThiefHelpers.verifySelectedDropDownText('Japanese Yen', undefined, PA3MainPage.xpathCurrencyDropdown);
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk');

    it('Handling Stale Element Reference error for the next step to get cell value', function() {
      // Handling Stale Element Reference error for the next step to get cell value
      var eleRef = SlickGridFunctions.getCellReference('Risk', 'Active Factor Risk', '', 'Data', splitArray[0], 'Barra Global Total Market Model for Long Term Investors - Stable Variant (GEMLTL)');
      eleRef.then(function() {
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          CommonFunctions.waitUntilElementAppears(eleRef, 4000, 'Cell value for Active Factor Risk and ' + 'Active Risk is not appeared even after waiting for 4 seconds.').then(function() {
          }, function(error) {

            if (error.name === 'StaleElementReferenceError') {
              expect(false).customError('StaleElementReferenceError appeared even after waiting for 4 ' + 'seconds to make element appear on web page');
            }
          });
        }
      });
    });

    riskModel.forEach(function(riskModel) {
      it('Should store values for 2 rows (Active Factor Risk and Active Risk) in "' + riskModel + '" risk model for' + '"End of Last Year Date" in Japanese Yen currency', function() {
        riskFactor.forEach(function(riskFactor) {
          SlickGridFunctions.getCellReference('Risk', riskFactor, '', 'Data', splitArray[0], riskModel).then(function(valueRef) {
            valueRef.getText().then(function(value) {
              jyEndOfLastYear.push(value);
            });
          });
        });
      });
    });

    riskModel.forEach(function(riskModel) {
      it('Should store values for 2 rows (Active Factor Risk and Active Risk) in "' + riskModel + '" risk model for ' + '"End of Last Month Date" in Japanese Yen currency ', function() {
        riskFactor.forEach(function(riskFactor) {
          SlickGridFunctions.getCellReference('Risk', riskFactor, '', 'Data', splitArray[2], riskModel).then(function(valueRef) {
            valueRef.getText().then(function(value) {
              jyEndOfLastMonth.push(value);
            });
          });
        });
      });
    });

    it('Verifying the values of two columns stored in two arrays for Japanese Currency are not empty', function() {
      if (jyEndOfLastYear.length === 0) {
        expect(false).customError('"jyEndOfLastYear" is empty array');
      }

      if (jyEndOfLastMonth.length === 0) {
        expect(false).customError('"jyEndOfLastMonth" is empty array');
      }
    });

    it('Comparing values of End of Last Year', function() {
      var usEndYear_actual = Utilities.roundingArrayValues(usEndOfLastYear, 2);
      var jyEndYear_expected = Utilities.roundingArrayValues(jyEndOfLastYear, 2);

      //Array comparison of usEndYear_actual and juEndYear_expected
      Utilities.arrayCompare(usEndYear_actual, jyEndYear_expected);
    });

    it('Comparing values of End Of LastMonth', function() {
      //Rounding array two decimal numbers
      var usEndMonth_actual = Utilities.roundingArrayValues(usEndOfLastMonth, 2);
      var jylEndMonth_expected = Utilities.roundingArrayValues(jyEndOfLastMonth, 2);

      //Array comparison of usEndMonth_actual and jylEndMonth_expected
      Utilities.arrayCompare(usEndMonth_actual, jylEndMonth_expected);
    });
  });
});
