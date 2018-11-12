'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ca-unknown-id', function() {

  describe('Test Step ID: 544877', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch PA3 application "/pa3/universe/CA_UNKNOWN_SYMBOL" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('ca-unknown-symbol');
    });

    it('Waiting for "Weights" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 300000);
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
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

    it('Should select "Automatic Calculation" option', function() {
      // Un-check "Automatic Calculation" to force re-check it
      PA3MainPage.getWrenchIcon().click();
      PA3MainPage.setAutomaticCalculation(false);

      // Click on Wrench button to select "Automatic Calculation"
      PA3MainPage.getWrenchIcon().click();

      PA3MainPage.setAutomaticCalculation(true).then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for "Weights" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);
    });

    it('Verifying that report contains grouping called "unknown symbol ca" with "UNKNOWNSTOCK" shown inside of it', function() {
      PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1,
        'unknown symbol ca', 'grid-canvas grid-canvas-top grid-canvas-left').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Report does not contain "unknown symbol ca" grouping');
          CommonFunctions.takeScreenShot();
        }
      });

      PA3MainPage.getElementFromCalculatedTree('Weights', 'unknown symbol ca',
        'UNKNOWNSTOCK', 'grid-canvas grid-canvas-top grid-canvas-left').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Report does not contain "UNKNOWNSTOCK" inside "unknown symbol ca" grouping');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
