'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: projected-cashflows-1', function() {

  describe('Test Step ID: 673920', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Fixed_income/FI_PRJ_CASH_FLOW_DATES"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('fi-prj-cash-flow-dates');
    });

    it('Should wait for "Weight" report to calculate', function() {
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

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var columnNames = ['Port. Weight', 'Port. Projected Principal Cash Flow', 'Port. Projected Interest Cash Flow',
        'Port. Projected Total Cash Flow', 'Port. Projected Principal Balance', 'Port. Projected Cash Balance',];
    var values = ['100.00', '4,139,757.78', '1,108,727.29', '5,248,485.07', '35,020,587.18', '5,248,485.07'];

    columnNames.forEach(function(column, index) {

      it('Verifying if "' + column + '" values is "' + values[index] + '" for "Total" row', function() {
        SlickGridFunctions.getCellReference('Weights', 'Total', '', column).then(function(ref) {
          ref.getText().then(function(text) {
            if (text !== values[index]) {
              expect(false).customError('"' + column + '" values did not "' + values[index] + '" for "Total" row;' +
                ' Found :' + text);
              CommonFunctions.takeScreenShot();
            }
          });
        });

      });
    });

  });

});
