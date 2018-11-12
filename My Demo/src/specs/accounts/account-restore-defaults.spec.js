'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: account-restore-defaults', function() {

  var checkboxes = ['Include ADR Currency Return', 'Map Thai Alien to Parent After', 'Include Zero Prices', 'Fall back on OMS Data', 'Calculate Returns with Missing Accrued Interest', 'Apply SFE Valuation to Futures', 'Fall Back to FactSet Dividends for Client Sources', 'Apply Custom Tax Withholding Rates'];

  describe('Test Step ID: 548056', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

  });

  describe('Test Step ID: 548047', function() {

    it('Should enter "Client:/pa3/TEST2.ACCT" in "Portfolio" widget', function() {
      // Entering the value to Benchmark Widget
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).setText('Client:/pa3/TEST2.ACCT');

      PA3MainPage.getWidgetBox('Portfolio').sendKeys(protractor.Key.ENTER);

      // Verifying that "Client:/pa3/TEST2.ACCT" is entered
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).getText().then(function(val) {
        if (val !== 'CLIENT:/PA3/TEST2.ACCT') {
          expect(false).customError('Portfolio widget is not populated with "CLIENT:/PA3/TEST2.ACCT", Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

  });

  describe('Test Step ID: 548048', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Portfolio', 'Prices', 'document options');

    it('Should expand and double click on the "Client Portfolio" from "Client Provided" to add it to the "Selected" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'Client Portfolio', 'Client Provided').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Verifying if "Client Portfolio" is added to the "Selected" Section', function() {
      var listItemRef = DocumentOptionsPricesPortfolio.getElementFromPricesSelectedContainer('Client Portfolio');

      // Wait until list item appeares in DOM
      Utilities.waitUntilElementAppears(listItemRef).then(function(displayed) {
        if (!displayed) {
          expect(false).customError('"Client Portfolio" is not added to the "Selected" Section');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Defaults Applied" button is changed to "Restore Defaults"', function() {
      // Verifying if "Defaults Applied" button is not present on the page
      expect(DocumentOptions.getDefaultsApplied().isPresent()).toBeFalsy();

      // Waiting for "Defaults" applied text to change to "Restore Defaults"
      var buttonRef = DocumentOptions.getRestoreDefaultsButton();
      Utilities.waitUntilElementAppears(buttonRef).then(function(displayed) {
        if (!displayed) {
          expect(false).customError('"Restore Defaults" button is not present on the page.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 548049', function() {

    it('Should click on the "Restore Defaults" button', function() {
      DocumentOptions.getRestoreDefaultsButton().click();
    });

    // FYI: The verification of the step is done in the next step i.e. Test Step ID: 548050

  });

  describe('Test Step ID: 548050', function() {

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'Cancel', 'Do you want to replace your current settings with the account defaults?');

    it('Verifying that document settings are maintained', function() {
      // Verifying that "Client Portfolio" is present in the "Selected" section
      expect(DocumentOptionsPricesPortfolio.getElementFromPricesSelectedContainer('Client Portfolio')
        .isPresent()).toBeTruthy();

      // Verifying if "Restore Defaults" button is still available
      expect(DocumentOptions.getRestoreDefaultsButton().isPresent()).toBeTruthy();

      // Verifying that "Client Provided" from "Available" container is still expanded
      DocumentOptionsPricesPortfolio.getListItem('Client Provided', 'PRICES', 'Available').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') <= 0) {
          expect(false).customError('"Client Provided" from "Available" container is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 548051', function() {

    it('Should click on the "Restore Defaults" button', function() {
      DocumentOptions.getRestoreDefaultsButton().click();
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK', 'Do you want to replace your current settings with the account defaults?');

    it('Verifying that default settings is applied', function() {
      // Verifying that "Client Portfolio" is not present in "Selected" of "PRICES" section
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'Client Portfolio').getText().then(function(text) {
        if (text === 'Client Portfolio') {
          expect(false).customError('"Client Portfolio" is still shown in the "Selected" container of "PRICES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          console.log('Default settings');
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Note:Please see known issue RPD:15282756/RPD:17047840
      // Verifying that "Client Provided" has "Client Portfolio" underneath it under "Available" section
      DocumentOptionsPricesPortfolio.getListItem('Client Provided', 'PRICES', 'Available').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Client Provided" from "Available" container does not contain "Client Portfolio"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Restore Defaults" button is changed to "Defaults Applied"', function() {
      // Verifying that "Restore Defaults" button disappeared
      DocumentOptions.getRestoreDefaultsButton().isPresent().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Restore Defaults" button was not disappeared');
        }
      });

      // Verifying that "Defaults Applied" is visible now
      DocumentOptions.getDefaultsApplied().isPresent().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Defaults Applied" button was not appeared');
        }
      });
    });

  });

  describe('Test Step ID: 548131', function() {

    // Click on "Ok" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);
  });

  describe('Test Step ID: 716853', function() {

    it('Should open "Client:/Pa3/Accounts/ADV_PRICING" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('adv-pricing');
    });

    it('Should click on "Portfolio hamburger" icon', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
        expect(true).toBeTruthy();
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Edit/Pencil" icon beside to "CLIENT:/PA3/ACCOUNTS/PA_PRICES_ADVANCE.ACCT"', function() {
      PA3MainPage.getAccountEditButton('portfolio', 'CLIENT:/PA3/ACCOUNTS/PA_PRICES_ADVANCE.ACCT').click();
    });

    it('Verify if "Modify Account(New)" view is opened', function() {
      ModifyAccountNew.isModifyAccountMode().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Modify Account(New)" view is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "PA|Prices" from LHP and select "Advanced" tab', function() {
      ThiefHelpers.expandAndGetOptionspaneItem(undefined, 'Advanced', 'PA|Prices').select();
    });

    checkboxes.forEach(function(checkboxName) {

      it('Verifying if "' + checkboxName + '" checkbox is checked', function() {
        ThiefHelpers.getCheckBoxClassReference(checkboxName).isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"' + checkboxName + '" checkbox is not checked');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 716854', function() {

    it('Should click on "Cancel" button of "Modify Account(New)" mode header', function() {
      ThiefHelpers.getButtonClassReference('Cancel').press();
    });

    it('Verify if "Modify Account(New)" dialog box is closed', function() {
      ModifyAccountNew.isModifyAccountMode().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Modify Account(New)" dialog box is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Advanced', 'Prices', 'document options');

    it('Click on "Restore Defaults" button on top right corner', function() {
      TileOptions.getRestoreDefaultsButton().click();
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK');

    it('Verifying if confirmation dialog box disappeared', function() {
      TileOptionsExclusions.getDialog('FactSet Research Systems').isPresent().then(function(present) {
        if (present) {
          expect(false).customError('"FactSet Research Systems" dialog did not disappear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Restore Defaults" button is changed to "Defaults Applied"', function() {
      TileOptions.getDefaultsApplied().isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Restore Defaults" button is not changed to "Defaults Applied"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    checkboxes.forEach(function(checkboxName) {

      it('Verifying if "' + checkboxName + '" checkbox is checked', function() {
        ThiefHelpers.getCheckBoxClassReference(checkboxName).isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"' + checkboxName + '" checkbox is not checked');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 716855', function() {

    // Click on "Ok" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');
  });

});
