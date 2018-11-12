'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: invalid_date', function() {

  describe('Test Step ID: 714474', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should navigate the "PA3 application" with "Client:;PA3;Dates;INVALID_DATE"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('invalid-date');
    });

    it('Verifying if "Calculation Error" pop up is appeared', function() {
      // Verifying if any calculation error appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (!found) {
          expect(false).customError('"Calculation Error" dialog is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Calculation Error" pop up stating "Calculation Service: There are invalid dates in the portfolio or benchmark."', function() {
      ThiefHelpers.getDialogClassReference('Calculation Error').getContent().getText().then(function(content) {
        if (content !== 'Calculation Service: There are invalid dates in the portfolio or benchmark.') {
          expect(false).customError('Expected dialog box content not matched' +
            'but Found: "' + content + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
