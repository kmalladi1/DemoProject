'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: fi-account-settings', function() {

  describe('Test Step ID: Startup Instructions', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 581019', function() {

    var valuesArray = ['100.000', '-0.318', '100.000', '0.167', '-0.485', '-0.116', '-0.027', '-0.341', '-0.000',
      '-0.485', '--', '-0.485', '1.581', '1.510', '5.920', '50.289', '44.809',];

    var columnsArray = ['Port. Average Weight', 'Port. Total Return', 'Bench. Average Weight', 'Bench. Total Return',
      'Variation in Total Return', 'Shift Effect ( Local )', 'Twist Effect ( Local )', 'Allocation Effect ( Local )',
      'Selection Effect ( Local )', 'Total Effect ( Local )', 'Total Currency Effect', 'Total Effect', 'Coupon Rate',
      'Port. Average Effective Duration', 'Bench. Average Effective Duration', 'Port. Average OAS', 'Bench. Average OAS',];

    it('Should open PA3 Application with "Client:/Pa3/Fixed_income/FI_PR_ANL_SRC"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('fi-pr-anl-src');
    });

    it('Should wait for "2 Factor Brinson Attribution" report to calculate', function() {
      // Waiting for "2 Factor Brinson Attribution" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('2 Factor Br' +
        'inson Attribution'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "2 Factor Brinson Attribution" report loaded without any error', function() {
      PA3MainPage.isReportCalculated('2 Factor Brinson Attribution').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"2 Factor Brinson Attribution" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var screenShot;
    columnsArray.forEach(function(column, index) {
      it('Verify that "Total" value for "' + column + '" column is "' + valuesArray[index] + '"', function() {
        SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', column).then(function(reference) {
          reference.getText().then(function(val) {
            if (val !== valuesArray[index]) {
              screenShot++;
              expect(false).customError('"Total" value for "' + column + '" column is not matched ' +
                'with"' + valuesArray[index] + '", Found: ' + val);
              if (screenShot === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });
});
