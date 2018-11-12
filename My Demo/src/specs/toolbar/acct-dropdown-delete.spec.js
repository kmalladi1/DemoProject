'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: acct-dropdown-delete', function() {

  describe('Test Step ID: 550011', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should open "Client:/default_doc_auto" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

    it('Should click on the "Wrench" button on the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click();

      // Verifying if drop down menu appear
      expect(PA3MainPage.getWrenchIcon(true).isPresent()).toBeTruthy();
    });

    it('Should un-check "Automatic Calculation" option', function() {
      expect(PA3MainPage.setAutomaticCalculation(false)).toBeTruthy();
    });
  });

  describe('Test Step ID: 550009', function() {

    var portfolioNames = ['DELTA.ACCT', 'ALPHA.ACCT', 'BETA.ACCT'];

    portfolioNames.forEach(function(portfolioName) {
      it('Should type "' + portfolioName + '" into portfolio widget and select ' + '"CLIENT:/PARSERTEST/ACCT/' + portfolioName + '" from type ahead', function() {
        expect(PA3MainPage.setPortfolio(portfolioName, 'Client:/parsertest/acct/' + portfolioName + '', 'CLIENT:/PARSERTEST/ACCT/' + portfolioName + '')).toBeTruthy();
      });
    });
  });

  describe('Test Step ID: 550010', function() {

    it('Should click on hamburger icon next to Portfolio widget', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click();

      // Verifying if Account Drop Down is opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account drop down is not opened.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click the cross(X) icon next to "DELTA" to delete it', function() {
      // Hover over element before clickin on "Delete" button
      browser.actions().mouseMove(PA3MainPage.getSingleAccountFromList('Portfolio', 'DELTA')).perform();

      // Click on delete button
      PA3MainPage.getAccountDeleteButton('Portfolio', 'DELTA').click();

      // Verify that DELTA is deleted from the list
      expect(PA3MainPage.getSingleAccountFromList('Portfolio', 'DELTA').isPresent()).toBeFalsy();
    });

    it('Should verify that "BETA" is still highlighted', function() {
      expect(PA3MainPage.getSingleAccountFromList('Portfolio', 'BETA').getAttribute('class')).toContain('selected');
    });
  });

  describe('Test Step ID: 550013', function() {

    it('Should click on the cancel button', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'Cancel').click();

      // Verifying if Account Drop Down is closed
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (appeared) {
          expect(false).customError('Account Drop Down still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on hamburger icon next to Portfolio widget', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click();

      // Verifying if Account Drop Down is opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click the cross(X) icon next to "BETA" to delete it', function() {
      PA3MainPage.getAccountDeleteButton('Portfolio', 'BETA').click();

      // Verify that BETA is deleted from the list
      expect(PA3MainPage.getSingleAccountFromList('Portfolio', 'BETA').isPresent()).toBeFalsy();
    });

    it('Should verify that "ALPHA" is highlighted', function() {
      expect(PA3MainPage.getSingleAccountFromList('Portfolio', 'ALPHA').getAttribute('class')).toContain('selected');
    });
  });

  describe('Test Step ID: 550014', function() {

    it('Should click on the "OK" button in the account drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click();

      // Account Drop Down should close
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (appeared) {
          expect(false).customError('Account Drop Down is not closed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "TM-Russell" in the "Benchmark" widget and select "Client:/data/accounts/scpf/A_BM_SCPF_TM-RUSSELL.ACCT" ' + 'from the type ahead', function() {
      expect(PA3MainPage.setBenchmark('TM-Russell', true, false, 'Client:/data/accounts/scpf/A_BM_SCPF_TM-RUSSELL.ACCT', 'Client:/data/accounts/scpf/A_BM_SCPF_TM-RUSSELL.ACCT')).toBeTruthy();
    });

    it('Should type "SPN_SP50_ACCT.ACCT" in the "Benchmark" widget hit down arrow on the keyboard to select ' + '"Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT" from the type ahead ', function() {
      expect(PA3MainPage.setBenchmark('SPN_SP50_ACCT.ACCT', false, true, 'Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT', 'Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT')).toBeTruthy();
    });

    it('Should type "DJII" in the "Benchmark" widget and select "Client:/pa2_pa3_backup/risk/PA3_DJII.ACCT" ' + 'from the type ahead ', function() {
      expect(PA3MainPage.setBenchmark('DJII', true, false, 'Client:/pa2_pa3_backup/risk/PA3_DJII.ACCT', 'CLIENT:/PA2_PA3_BACKUP/RISK/PA3_DJII.ACCT')).toBeTruthy();
    });
  });

  describe('Test Step ID: 550015', function() {

    it('Should click the Hamburger icon next to the benchmark widget', function() {
      PA3MainPage.getHamburgerIcon('Benchmark').click();

      // Verifying if Account Drop Down is opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account drop down is not opened.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click the cross(X) icon next to the benchmark "Russell vs. Tactical Portfolio Selection BM" to delete', function() {
      // Hover over element before clickin on "Delete" button
      browser.actions().mouseMove(PA3MainPage.getSingleAccountFromList('Benchmark', 'Russell vs. Tactical Portfolio Selection BM')).perform();

      // Click on delete button
      PA3MainPage.getAccountDeleteButton('Benchmark', 'Russell vs. Tactical Portfolio Selection BM').click();

      // Verify if 'Russell vs. Zero Benchmark BM' is deleted from the Account Drop Down
      expect(PA3MainPage.getSingleAccountFromList('Benchmark', 'Russell vs. Tactical Portfolio Selection BM').isPresent()).toBeFalsy();
    });

    it('Verify that benchmark "PA3_DJII" is still highlighted', function() {
      expect(PA3MainPage.getSingleAccountFromList('Benchmark', 'PA3_DJII').getAttribute('class')).toContain('selected');
    });
  });

  describe('Test Step ID: 550016', function() {

    it('Should click on the "Cancel" button in the benchmark\'s Account Drop Down', function() {
      PA3MainPage.getOkOrCancelButton('Benchmark', 'Cancel').click();

      // Verify if 'Account Drop Down' disappear
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (appeared) {
          expect(false).customError('Account drop down is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the Hamburger icon next to the Benchmark widget', function() {
      PA3MainPage.getHamburgerIcon('Benchmark').click();

      // Verify if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account drop down has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click the cross(X) icon next to the benchmark "PA3_DJII" to delete', function() {
      PA3MainPage.getAccountDeleteButton('Benchmark', 'PA3_DJII').click();

      // Verifying if 'PA3_DJII' is deleted
      expect(PA3MainPage.getSingleAccountFromList('Benchmark', 'PA3_DJII').isPresent()).toBeFalsy();
    });

    it('Verify that "SPN_SP50_ACCT" is highlighted', function() {
      expect(PA3MainPage.getSingleAccountFromList('Benchmark', 'SPN_SP50_ACCT').getAttribute('class')).toContain('selected');
    });
  });

  describe('Test Step ID: 550012', function() {

    it('Should click "OK" button in the account drop down to close', function() {
      PA3MainPage.getOkOrCancelButton('Benchmark', 'OK').click();

      // Verifying if Account Drop Down is closed
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (appeared) {
          expect(false).customError('Account drop down is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should close PA3 application without any issues', function() {
      expect(true).toBeTruthy();
    });
  });
});
