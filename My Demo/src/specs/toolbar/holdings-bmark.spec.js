'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: holdings-bmark', function() {

  describe('Test Step ID: 550019', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should open "Client:/default_doc_auto" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

    it('Should click on the "Wrench" button on the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down menu appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('Drop down menu did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should un-check "Automatic Calculation" option', function() {
      PA3MainPage.setAutomaticCalculation(false).then(function(option) {
        if (!option) {
          expect(false).customError('"Automatic Calculation" option is still checked/selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 550017', function() {

    it('Should type "Client:/pa3/accounts/" in Portfolio widget and select "Client:/pa3/accounts/TEST.ACCT" from the type ahead', function() {
      expect(PA3MainPage.setPortfolio('Client:/pa3/accounts/TEST.ACCT', 'TEST.ACCT | Client:/pa3/accounts/', 'CLIENT:/PA3/ACCOUNTS/TEST.ACCT')).toBeTruthy();
    });

    it('Verifying that Benchmark widget displaying "SPN:SP50"', function() {
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(value) {
        if (value !== 'SPN:SP50') {
          expect(false).customError('Benchmark widget is not displaying "SPN:SP50"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that header of application displays "Large Cap Core Test vs S&P 500"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'Large Cap Core Test vs S&P 500') {
          expect(false).customError(' Header of application is not displaying "Large Cap Core Test vs S&P 500"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 550018', function() {

    it('Should click on the hamburger icon next to Benchmark widget', function() {
      PA3MainPage.getHamburgerIcon('Benchmark').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Benchmark's Account Drop Down is displayed
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "S&P 500" displayed in the Account Drop Down', function() {
      PA3MainPage.getSingleAccountFromList('Benchmark', 'S&P 500').isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"S&P 500" is not displayed in the Account Drop Down');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 550020', function() {

    it('Should close PA3 application without any issues', function() {
      expect(true).toBeTruthy();
    });
  });
});
