'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: invalid-date', function() {

  describe('Test Step ID: 592552', function() {

    it('Should launch the PA3 application with "Client:;PA3;Dates;DATE_GAP" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('date-gap');
    });

    it('Verifying if a "Calculation Error" dialog appears stating "There are invalid dates in the portfolio or benchmark."', function() {
      ThiefHelpers.waitForDialog('Calculation Error', 20000, true, 1).then(function(status) {
        if (status) {
          ThiefHelpers.getDialogClassReference('Calculation Error', undefined).
          getContent().getText().then(function(dialogContent) {
            if (dialogContent.indexOf('There are invalid dates in the portfolio or benchmark.') < 0) {
              expect(false).customError('"Calculation Error" dialog not appeared stating "There are invalid dates in the portfolio ' +
                'or benchmark." instead "' + dialogContent + '" found');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Calculation Error" dialog not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in "Calculation Error" pop up', function() {
      ThiefHelpers.getDialogButton('Calculation Error', 'OK', 1).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Calculation Error" pop up');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if a "Calculation Error" dialog is closed', function() {
      ThiefHelpers.getDialogClassReference('Calculation Error', undefined, undefined).isOpen().then(function(dialogStatus) {
        if (dialogStatus) {
          expect(false).customError('"Calculation Error" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
