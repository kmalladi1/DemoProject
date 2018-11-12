'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: term-date-force', function() {

  describe('Test Step ID: 556186', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:/Pa3/Dates/Term_Date_6" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('term-date-6');
    });

    it('Verify that "Calculation Error" message pop up appeared', function() {
      ThiefHelpers.waitForDialog('Calculation Error', 6000, true).then(function(errorFound) {
        expect(errorFound).customError('"Calculation Error" dialog did not appear.');
        if (!errorFound) {
          CommonFunctions.takeScreenShot();
        }
      }, function() {

        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that Calculation Error pop up having text "Calculation Service: Gaps were detected in the portfolio CLIENT:/NEW_PA_TEST_SUITE/' +
      'DATES/13_TBR.ACTM at the following range(s): 10/05/2012 - 10/31/2012"', function() {
        ThiefHelpers.getDialogClassReference('Calculation Error').getContent().getText().then(function(text) {
          if (text !== 'Calculation Service: Gaps were detected in the portfolio CLIENT:/NEW_PA_TEST_SUITE' +
            '/DATES/13_TBR.ACTM at the following range(s): 10/05/2012 - 10/31/2012') {
            expect(false).customError('Expected text is not matched in the "Calculation Error" popup. ' +
              'Found: "' + text + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });

  });

  describe('Test Step ID: 556187', function() {

    it('Should click "OK" in the Calculation Error dialog', function() {
      ThiefHelpers.getDialogButton('Calculation Error', 'OK').click();

      // Verify if Calculation Error Dialog is closed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is still seen after clicking on "OK" button.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Options', 'Dates', 'document options');

    it('Should select "Force Start Date After Inception"', function() {
      ThiefHelpers.setCheckBox('Force Start Date After Inception', CommonFunctions.replaceStringInXpath(DocumentOptionsDates.xpathOfCheckboxes,
        'Force Start Date After Inception'), true);
    });

    it('Should deselect "Force End Date Before Termination" ', function() {
      ThiefHelpers.setCheckBox('Force End Date Before Termination', CommonFunctions.replaceStringInXpath(DocumentOptionsDates.xpathOfCheckboxes,
        'Force End Date Before Termination'), false);
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Dcoument Options');

    it('Verify that Calculation Error message pop up appeared', function() {
      ThiefHelpers.waitForDialog('Calculation Error', 6000, true).then(function(errorFound) {
        expect(errorFound).customError('"Calculation Error" dialog did not appear.');
        if (!errorFound) {
          CommonFunctions.takeScreenShot();
        }
      }, function() {

        CommonFunctions.takeScreenShot();
      });

      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        expect(found).customError('"Calculation Error" dialog did not appear.');
        if (!found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that Calculation Error pop up having text "Calculation Service: Gaps were detected in the portfolio CLIENT:/NEW_PA_TEST_SUITE/DATES/' +
      '13_TBR.ACTM at the following range(s): 10/05/2012 - 10/31/2012"', function() {
        ThiefHelpers.getDialogClassReference('Calculation Error').getContent().getText().then(function(text) {
          if (text !== 'Calculation Service: Gaps were detected in the portfolio CLIENT:/NEW_PA_TEST_SUITE/' +
            'DATES/13_TBR.ACTM at the following range(s): 10/05/2012 - 10/31/2012') {
            expect(false).customError('Expected text is not matched in the "Calculation Error" popup. ' +
              'Found: "' + text + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
  });

  describe('Test Step ID: 556188', function() {

    it('Should click "OK" in the Calculation Error dialog', function() {
      ThiefHelpers.getDialogButton('Calculation Error', 'OK').click();

      // Verify that Calculation Error dialog is closed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is still seen after clicking on "OK" button.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Dates');

    it('Should set the "Start date" to "4/30/2012"', function() {
      ThiefHelpers.setDateInCalendar('4/30/2012');
    });

    it('Verify that "Start Date" field is showing "4/30/2012"', function() {
      ThiefHelpers.getDatepickerClassReference('Start Date:').getDate().then(function(text) {
        if (text !== '4/30/2012') {
          expect(false).customError('Start Date is not set to "4/30/2012" instead found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    it('Verify that Calculation Error message pop up appeared', function() {
      ThiefHelpers.waitForDialog('Calculation Error', 6000, true);

      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        expect(found).customError('"Calculation Error" dialog did not appear.');
        if (!found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "OK" in the Calculation Error dialog', function() {
      ThiefHelpers.getDialogButton('Calculation Error', 'OK').click();

      // Verify that Calculation Error dialog is closed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is still seen after clicking on "OK" button.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
