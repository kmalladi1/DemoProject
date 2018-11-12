'use strict';

require(__dirname + '/../../index.js');

var openDocumentOptionsAndVerifySettings = function() {

  it('Verifying if "ICE BofAML - FactSet" is displayed in "Prices - Selected" section ', function() {
    ThiefHelpers.getListBoxItem(PAPricesPortfolio.xpathPricesSelectedContainer, 'ICE BofAML - FactSet').getText().then(function(text) {
      if (text !== 'ICE BofAML - FactSet') {
        expect(false).customError('"ICE BofAML - FactSet" is not shown in the selected section of "Prices", Found: ' + text);
        CommonFunctions.takeScreenShot();
      }
    }, function(err) {

      if (err.toString().indexOf('No direct child') > 0) {
        expect(false).customError('"ICE BofAML - FactSet" is not shown in the Selected section of "Prices"');
        CommonFunctions.takeScreenShot();
      } else {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Verifying that "Restore Defaults" button is displayed in top right corner', function() {
    TileOptions.getRestoreDefaultsButton().isPresent().then(function(flag) {
      if (!flag) {
        expect(false).customError('"Restore Defaults" button is not dispayed');
        CommonFunctions.takeScreenShot();
      }
    });
  });

};

describe('Test Case: price-after-conv', function() {

  describe('Test Step ID: 608425', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Prices/PRIC_AFT_CONVT" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('pric-aft-convt');
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Verifying that Date hyperlink shows: "5/13/2016 - 5/20/2016"', function() {
      PA3MainPage.getDateHyperLink('Contribution').getText().then(function(value) {
        if (value !== '5/13/2016 - 5/20/2016') {
          expect(false).customError('Calculated report does not show time period as "5/13/2016 - 5/20/2016".');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 608426', function() {

    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSelectOption('Document Options');

    it('Verifying if "Document Options" page is opened', function() {
      ThiefHelpers.isModeBannerDisplayed('Document Options').then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "Document Options".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "BlackRock FI ETFs - FactSet" is displayed in "Prices - Selected" section ', function() {
      ThiefHelpers.getListBoxItem(PAPricesPortfolio.xpathPricesSelectedContainer, 'BlackRock FI ETFs - FactSet').getText().then(function(text) {
        if (text !== 'BlackRock FI ETFs - FactSet') {
          expect(false).customError('"BlackRock FI ETFs - FactSet" is not shown in the selected section of "Prices", Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"BlackRock FI ETFs - FactSet" is not shown in the Selected section of "Prices"');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Use Price Sources" checkbox is checked off', function() {
      // Verifying if "Use Price Source" checkbox is checked off
      ThiefHelpers.getCheckBoxClassReference('Use Price Sources').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Use Price Source" checkbox" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Defaults Applied" is displayed at top right corner', function() {
      DocumentOptions.getDefaultsApplied().isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Defaults Applied" is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 608428', function() {

    it('Should click on "X(Clear All)" button to clear selected section', function() {
      ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsPricesPortfolio.getClearSelectedItemsButton('Prices')).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "X" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Expand "Fixed Income|ICE BofAML" and select "ICE BofAML - FactSet"', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'ICE BofAML - FactSet', 'Fixed Income|ICE BofAML', undefined).select();

      // Verifying if the Item 'BofA Merrill Lynch' is selected.
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'ICE BofAML - FactSet', 'Fixed Income|ICE BofAML', 'Fixed Income|ICE BofAML').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"ICE BofAML - FactSet" is not selected in "Available section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking the right arrow button
    it('Clicking the right arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection(DocumentOptionsPricesPortfolio.getArrowButton('prices'));
    });

    openDocumentOptionsAndVerifySettings();

  });

  describe('Test Step ID: 608429', function() {

    // Click on "OK" button of header and verify if "Document options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document options');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    // Click on the folder icon and select "Save As..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Save As…');

    // Select personal directory and enter the document name
    // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.selectPersonalAndEnterDocumentNameInSaveAsDialog('Pricereport', undefined, true);

    it('Verify that "Personal:Pricereport" document is opened.', function() {
      browser.getTitle().then(function(title) {
        if (title.indexOf('Personal:Pricereport') === -1) {
          expect(false).customError('"Personal:Pricereport" is not opened, Found:' + title);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 698211', function() {

    // Click on the folder icon and select "Open..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Open...');

    // Select the required document from personal directory
    // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.openRequiredDocumentFromPersonal('Pricereport');

    it('Should type "FIXED_INCOME_SETTINGS.ACCT" into "Portfolio" widget and select "FIXED_INCOME_SETTINGS.ACCT | Client:/pa3/fixed_income/" from type ahead and verify', function() {
      PA3MainPage.setPortfolio('FIXED_INCOME_SETTINGS.ACCT', 'FIXED_INCOME_SETTINGS.ACCT | Client:/pa3/fixed_income/', 'Client:/pa3/fixed_income/FIXED_INCOME_SETTINGS.ACCT').then(function(option) {
        if (!option) {
          expect(false).customError('Not able to enter "FIXED_INCOME_SETTINGS.ACCT" into "Portfolio" widget and select "FIXED_INCOME SETTINGS.ACCT | Client:/pa3/fixed_income/" from type ahead');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Benchmark', PA3MainPage.xpathBenchmarkWidget, 'LFI:LHMN0001');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');
  });

  describe('Test Step ID: 699539', function() {

    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSelectOption('Document Options');

    it('Verifying if "Document Options" page is opened', function() {
      ThiefHelpers.isModeBannerDisplayed('Document Options').then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "Document Options".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    openDocumentOptionsAndVerifySettings();

    it('Verifying if "Use Price Sources" checkbox is checked off', function() {
      // Verifying if "Use Price Source" checkbox is checked off
      ThiefHelpers.getCheckBoxClassReference('Use Price Sources').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Use Price Source" checkbox" checkbox is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
