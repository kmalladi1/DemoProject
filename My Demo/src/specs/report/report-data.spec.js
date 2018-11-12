'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: report-data', function() {

  describe('Test Step ID: 549971', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/pa3/georev/Georev_speed" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('georev-speed');
    });

    it('Should select "Automatic Calculation" option', function() {
      // Un-check "Automatic Calculation" to force re-check it
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
      PA3MainPage.setAutomaticCalculation(false);

      // Click on Wrench button to select "Automatic Calculation"
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
      expect(PA3MainPage.setAutomaticCalculation(true)).toBeTruthy();
    });

    it('Verifying "Client:/pa3/georev/Georev_speed" document is opened with ' + '"RUSSELL:3000" in portfolio widget by default', function() {
      expect(PA3MainPage.getWidgetBox('Portfolio').getAttribute('value')).toEqual('RUSSELL:3000');
    });

    it('Verifying "Contribution" report is selected by default in LHP', function() {
      expect(PA3MainPage.getReports('Contribution').getAttribute('class')).toContain('selected');
    });

    it('Waiting for 8 minutes for "Contribution" report to load', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Contribution'), 480000);
    });

    it('Verifying that "Contribution" report is calculated', function() {
      // Verifying Contribution Report is calculated
      PA3MainPage.isReportCalculated('Contribution').then(function(displayed) {
        if (!displayed) {
          expect(false).customError('"Contribution" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
