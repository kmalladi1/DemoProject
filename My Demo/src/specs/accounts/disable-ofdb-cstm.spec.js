'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: disable-ofdb-cstm', function() {

  describe('Test Step ID: 548052', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

  });

  describe('Test Step ID: 548053', function() {

    it('Should enter "Client:/pa3/accounts/81820.OFDB" in "Portfolio" widget', function() {
      PA3MainPage.getWidgetBox('Portfolio').sendKeys('Client:/pa3/accounts/81820.OFDB', protractor.Key.ENTER);
    });

    it('Verifying that error message comes up informing the user that "Error setting portfolio: .OFDB and .CSTM extensions are not ' +
      'supported in PA3.  Please create an account, .ACCT."', function() {
      PA3MainPage.getDialogWithText('Error setting portfolio: .OFDB and .CSTM extensions are not supported in PA3.  ' +
        'Please create an account, .ACCT.').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Error message popup is not appeared with expected text');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 548054', function() {

    it('Should click "OK" button to close error pop-up', function() {
      PA3MainPage.getButton('OK').click().then(function() {
      }, function(error) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(error);
      });

      // Verifying that error pop-up is disappeared
      expect(PA3MainPage.getDialog('Error Setting Portfolio').isPresent()).toBeFalsy();
    });

    it('Should enter "Client:/pa3/FI_TBR_CSTM.CSTM" in "Portfolio" widget', function() {
      // Clear the "Portfolio" widget before entering new account name
      PA3MainPage.getWidgetBox('Portfolio').clear();

      // Send the text to "Portfolio" input box
      PA3MainPage.getWidgetBox('Portfolio').sendKeys('Client:/pa3/FI_TBR_CSTM.CSTM', protractor.Key.ENTER);
    });

    it('Verifying that error message comes up informing the user that "Error setting portfolio: .OFDB and .CSTM extensions are not ' +
      'supported in PA3.  Please create an account, .ACCT."', function() {
      PA3MainPage.getDialogWithText('Error setting portfolio: .OFDB and .CSTM extensions are not supported in PA3.  ' +
        'Please create an account, .ACCT.').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Error message popup is not appeared with expected text');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 548055', function() {

    it('Should click "OK" button to close error pop-up', function() {
      PA3MainPage.getButton('OK').click().then(function() {
      }, function(error) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(error);
      });

      // Verifying that error pop-up is disappeared
      expect(PA3MainPage.getDialog('Error Setting Portfolio').isPresent()).toBeFalsy();
    });

    // Known issue : RPD:38829057, Enter full portfolio path in widget.
    it('Should enter "CLIENT:/PA3/ACCOUNTS/RESTORE_TEST.ACCT" in "Portfolio" widget and hit Enter key.', function() {
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).setText('Client:/pa3/accounts/RESTORE_TEST.ACCT', protractor.Key.ENTER);

      // Verifying that "CLIENT:/PA3/ACCOUNTS/RESTORE_TEST.ACCT" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).getText().then(function(text) {
        if (text !== 'CLIENT:/PA3/ACCOUNTS/RESTORE_TEST.ACCT') {
          expect(false).customError('"CLIENT:/PA3/ACCOUNTS/RESTORE_TEST.ACCT" is not entered in "Portfolio" widget.Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');
  });

});
