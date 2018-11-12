'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: term-date-missing-data', function() {

  describe('Test Step ID: 556185', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with Client:/Pa3/Dates/Term_Date_5 document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('term-date-5');
    });

    it('Should select "Automatic Calculation" option if not selected', function() {
      browser.wait(function() {
        return ThiefHelpers.isDialogOpen('Calculation Error').then(function(visible) {
          return visible;
        });
      }, 60000).then(function() {
      }, function() {
        // Un-check "Automatic Calculation" to force re-check it
        PA3MainPage.getWrenchIcon().click();
        PA3MainPage.setAutomaticCalculation(false);

        // Click on Wrench button to select "Automatic Calculation"
        PA3MainPage.getWrenchIcon().click();
        expect(PA3MainPage.setAutomaticCalculation(true)).toBeTruthy();
      });
    });

    it('Verify that Calculation Error message pop up appeared', function() {
      ThiefHelpers.waitForDialog('Calculation Error', 6000, true);

      ThiefHelpers.isDialogOpen('Calculation Error').then(function(errorFound) {
        expect(errorFound).customError('"Calculation Error" dialog did not appear.');
        if (!errorFound) {
          CommonFunctions.takeScreenShot();
        }
      }, function() {

        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click "OK" in the Calculation Error dialog', function() {
      ThiefHelpers.getDialogButton('Calculation Error', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verify that Calculation Error dialog is closed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(errorFound) {
        if (errorFound) {
          expect(false).customError('"Calculation Error" dialog box has not closed');
          CommonFunctions.takeScreenShot();
        }
      }, function() {

        CommonFunctions.takeScreenShot();
      });
    });

  });

});
