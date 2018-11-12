'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: currency-link', function() {

  describe('Test Step ID: 485295', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });
  });

  describe('Test Step ID: 485296', function() {

    it('Should enter "CLIENT:/PA3/ACCOUNTS/EQUITY_ACCOUNT.ACCT" in "Portfolio" widget', function() {
      PA3MainPage.getWidgetBox('Portfolio').sendKeys('CLIENT:/PA3/ACCOUNTS/EQUITY_ACCOUNT.ACCT', protractor.Key.ENTER);

      // Verifying that "CLIENT:/PA3/ACCOUNTS/EQUITY_ACCOUNT.ACCT" is entered
      expect(PA3MainPage.getWidgetBox('Portfolio').getAttribute('value')).toEqual('CLIENT:/PA3/ACCOUNTS/EQUITY_ACCOUNT.ACCT');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);
  });

  describe('Test Step ID: 485297', function() {

    it('Should click on currency drop down', function() {
      PA3MainPage.getCurrencyDropDown().click();

      // Verifying if drop down is appeared
      expect(PA3MainPage.getDropDownItem('Euro').isPresent()).toBeTruthy();
    });

    it('Should select "U.S. Dollar" from  currency drop down', function() {
      PA3MainPage.getDropDownItem('U.S. Dollar').click();

      // Verifying if "U.S. Dollar" is selected
      expect(PA3MainPage.getCurrencyDropDown().getText()).toEqual('U.S. Dollar');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);
  });

  describe('Test Step ID: 485298', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Advanced', 'Prices', 'document options');

    it('Verifying if "Currency" drop down is set to "U.S.Dollar"', function() {
      ThiefHelpers.verifySelectedDropDownText('U.S. Dollar', undefined, DocumentOptionsPricesAdvanced.xpathOfCurrencyDropDown);
    });
  });

  describe('Test Step ID: 485299', function() {

    it('Should click on "Restore Defaults" on the top right corner', function() {
      DocumentOptions.getRestoreDefaultsButton().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK');

    it('Verifying that "Euro" is set in the currency drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Euro', undefined, DocumentOptionsPricesAdvanced.xpathOfCurrencyDropDown);
    });
  });

  describe('Test Step ID: 485300', function() {

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Dcoument Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying that "Euro" is set in the "Currency" drop down', function() {
      PA3MainPage.getCurrencyDropDown().getText().then(function(value) {
        if (value !== 'Euro') {
          expect(false).customError('"Currency" drop down is not set to "Euro"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
