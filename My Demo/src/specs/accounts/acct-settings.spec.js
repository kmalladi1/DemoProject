'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: acct-settings', function() {

  describe('Test Step ID: 548097', function() {

    // Should open default document and un-check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should launch the PA3 application with document client:/default_doc_auto.', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

  });

  describe('Test Step ID: 548090', function() {

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Weights', true, 'isSelected');

    it('Should click on "Refresh" icon from application', function() {
      PA3MainPage.getRefreshIcon().click();
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying if "Portfolio" is set to "CLIENT:/PA3/TEST.ACCT"', function() {
      expect(PA3MainPage.getWidgetBox('Portfolio').getAttribute('value')).toEqual('CLIENT:/PA3/TEST.ACCT');
    });

    it('Verifying if "Benchmark" is set to "RUSSELL:1000"', function() {
      expect(PA3MainPage.getWidgetBox('Benchmark').getAttribute('value')).toEqual('RUSSELL:1000');
    });

  });

  describe('Test Step ID: 548091', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Portfolio', 'Prices', 'document options');

    it('Should Expand "Client Provided" and double click on "Client Security Master" to add to "Selected" container', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'Client Security Master', 'Client Provided').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Verifying if the "Restore Defaults" button is present', function() {
      expect(DocumentOptions.getRestoreDefaultsButton().isPresent()).toBeTruthy();
    });

  });

  describe('Test Step ID: 548092', function() {

    it('Should click on "Restore Defaults" button', function() {
      DocumentOptions.getRestoreDefaultsButton().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verification of dialog content is done in next step
  });

  describe('Test Step ID: 548093', function() {

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK', 'Do you want to replace your current settings with the account defaults?');

    it('Verifying that "FactSet - Equity" is shown in the "Selected" container of "PRICES" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'FactSet - Equity').getText().then(function(text) {
        if (text !== 'FactSet - Equity') {
          expect(false).customError('"FactSet - Equity" is not shown in the "Selected" container of "PRICES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"FactSet - Equity" is not found in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Client Portfolio" is shown in the "Selected" container of "PRICES" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'Client Portfolio').getText().then(function(text) {
        if (text !== 'Client Portfolio') {
          expect(false).customError('"Client Portfolio" is not shown in the "Selected" container of "PRICES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Client Portfolio" is not found in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "FactSet" is shown in the "Selected" container of "EXCHANGE RATES" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathExchangeRatesSelectedContainer, 'FactSet').getText().then(function(text) {
        if (text !== 'FactSet') {
          expect(false).customError('"FactSet" is not shown in the "Selected" container of "EXCHANGE RATES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"FactSet" is not found in the "Selected" container of "EXCHANGE RATES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 548094', function() {

    it('Should click on the "Benchmark" tab from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Benchmark', 'Prices').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Benchmark', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Benchmark" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Client Provided" and double click on "Client Portfolio" to add to "Selected" container', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesBenchmark.xpathPricesAvailableContainer, 'Client Portfolio', 'Client Provided').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Verifying if "Defaults Applied" text is changed to "Restore Defaults" button', function() {
      expect(DocumentOptions.getDefaultsApplied().isPresent()).toBeFalsy();

      // Verifying that "Restore Defaults" button is visible
      expect(DocumentOptions.getRestoreDefaultsButton().isPresent()).toBeTruthy();
    });

  });

  describe('Test Step ID: 548095', function() {

    it('Should click on "Restore Defaults" button', function() {
      DocumentOptions.getRestoreDefaultsButton().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // FYI: The verification of the current step is done in the next step i.e. Test Step ID: 548096

  });

  describe('Test Step ID: 548096', function() {

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'Cancel', 'Do you want to replace your current settings with the account defaults?');

    it('Verifying if the "Restore Defaults" button is enabled', function() {
      expect(DocumentOptions.getRestoreDefaultsButton().isPresent()).toBeTruthy();
    });

  });

  describe('Test Step ID: 548130', function() {

    // Click on "Cancel" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Dcoument Options');

    it('Should close the PA3 application', function() {
      expect(true).toBeTruthy();
    });

  });

});
