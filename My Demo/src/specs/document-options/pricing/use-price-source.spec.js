'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: use-price-source', function() {

  // Variables
  var UsePriceSourceReference;
  describe('Test Step ID: 542546', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should open "Client:/pa3/Auto_New" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('auto-new');
    });
  });

  describe('Test Step ID: 542547', function() {

    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSelectOption('Document Options');
  });

  describe('Test Step ID: 542548', function() {

    it('Should select "Portfolio" from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Portfolio', 'Prices').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Portfolio', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Portfolio" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that workspace view is changed to "Prices - Portfolio"', function() {
      expect(DocumentOptions.getOptionTitle().getText()).toEqual('Prices - Portfolio');
    });

    it('Un-check "Use Price Sources" checkbox from "Exchange Rates" section', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Price Sources').uncheck();

      // Verifying if "Use Price Source" checkbox is unchecked
      ThiefHelpers.getCheckBoxClassReference('Use Price Sources').isChecked().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Use Price Source" checkbox is checked under the "Exchange Rates" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Exchange Rates" section is Enabled', function() {
      var eleRef = element(by.xpath(DocumentOptionsPricesPortfolio.xpathExchangeRatesSections + '/parent::*'));
      eleRef.getAttribute('disabled').then(function(flag) {
        if (flag !== null) {
          expect(false).customError('"Exchange Rates" section is not Enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 542549', function() {

    it('Should select "Use Price Sources" checkbox', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Price Sources').check();

      // Verifying if "Use Price Source" checkbox is checked off
      ThiefHelpers.getCheckBoxClassReference('Use Price Sources').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Use Price Source" checkbox" checkbox is not checked under the "Exchange Rates" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Exchange Rates" section is Disabled', function() {
      var eleRef = element(by.xpath(DocumentOptionsPricesPortfolio.xpathExchangeRatesSections + '/parent::*'));
      eleRef.getAttribute('disabled').then(function(flag) {
        if (flag.indexOf('true') === -1) {
          expect(false).customError('"Exchange Rates" section is not disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 542550', function() {

    // Click on "Cancel" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Document Options');
  });

  describe('Test Step ID: 542551', function() {

    it('Should close PA3 application', function() {
      // After completing all the test steps protractor will close the browser automatically
      expect(true).toBeTruthy();
    });
  });
});
