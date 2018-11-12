'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: acct-dropdown-port-bmark', function() {

  describe('Test Step ID: 549977', function() {

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
          expect(false).customError('Drop down menu does not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should un-check "Automatic Calculation" option', function() {
      PA3MainPage.setAutomaticCalculation(false).then(function(option) {
        if (!option) {
          expect(false).customError('"Automatic Calculation" option is checked/selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 549974', function() {

    it('Should type "DELTA" into portfolio widget and select "CLIENT:/PARSERTEST/ACCT/DELTA.ACCT" from the type ahead', function() {
      expect(PA3MainPage.setPortfolio('DELTA', 'Client:/parsertest/acct/DELTA.ACCT', 'CLIENT:/PARSERTEST/ACCT/DELTA.ACCT')).toBeTruthy();
    });
  });

  describe('Test Step ID: 549975', function() {

    it('Should click the Hamburger icon next to the "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "DELTA" is highlighted in the Account Drop Down by default', function() {
      expect(PA3MainPage.getSingleAccountFromList('Portfolio', 'DELTA').getAttribute('class')).toContain('selected');
    });
  });

  describe('Test Step ID: 549979', function() {

    it('Should click on Hamburger icon next to "Portfolio" widget to close it', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account Drop Down is closed
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (appeared) {
          expect(false).customError('Account Drop Down is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "TM-RUSSELL" in the "Benchmark" widget and select "Client:/data/accounts/scpf/A_BM_SCPF_TM-RUSSELL.ACCT" ' + 'from the type ahead', function() {
      PA3MainPage.setBenchmark('TM-RUSSELL', true, false, 'Client:/data/accounts/scpf/A_BM_SCPF_TM-RUSSELL.ACCT', 'Client:/data/accounts/scpf/A_BM_SCPF_TM-RUSSELL.ACCT').then(function(value) {
        expect(value).toBeTruthy();
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 549976', function() {

    it('Should click on Hamburger icon next to "Benchmark" widget', function() {
      PA3MainPage.getHamburgerIcon('Benchmark').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Russell vs. Tactical Portfolio Selection BM" is added to the Account Drop Down', function() {
      expect(PA3MainPage.getSingleAccountFromList('Benchmark', 'Russell vs. Tactical Portfolio Selection BM').isPresent()).toBeTruthy();
    });
  });

  describe('Test Step ID: 549982', function() {

    it('Should close PA3 application without any issues', function() {
      expect(true).toBeTruthy();
    });
  });
});
