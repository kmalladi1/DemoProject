'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: autocalc-on-off', function() {

  describe('Test Step ID: 549953', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/default_doc_auto" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');
  });

  describe('Test Step ID: 549954', function() {

    // check automatic calculation from wrench menu
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSetAutomaticCalculation(true);

    // select and verify if report is selected in lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Attribution', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');
  });

  describe('Test Step ID: 549955', function() {

    // select and verify if report is selected in lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Weights', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');
  });

  describe('Test Step ID: 549956', function() {

    it('Should select "Performance" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Performance').then(function(reportRef) {
        reportRef.click().then(function() {
        }, function() {
          expect(false).customError('Unable to select "Performance" from LHP');
          CommonFunctions.takeScreenShot();
        });
      });
    });

    // Disabling wait for angular to handle loading icon
    it('Disabling wait for angular and select "Contribution" report from LHP', function() {
      browser.ignoreSynchronization = true;

      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Contribution').then(function(reportRef) {
        reportRef.click().then(function() {
        }, function() {
          expect(false).customError('Unable to select "Contribution" from LHP');
          CommonFunctions.takeScreenShot();
        });
      });

      browser.ignoreSynchronization = false;
    });

    it('Verify that "Performance" report should calculate', function() {
      PA3MainPage.isReportCalculated('Performance', true).then(function(option) {
        if (option) {
          expect(false).customError('"Performance" report did not get generated');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any calculation error appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');
  });

  describe('Test Step ID: 549957', function() {

    // un-check automatic calculation from wrench menu
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSetAutomaticCalculation(false);

    it('Should click on "Wrench" icon in app toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Wrench" icon in app toolbar');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should uncheck the "Automatic Calculation" in "Wrench" menu list', function() {
      PA3MainPage.isAutomaticCalculationChecked().then(function(check) {
        if (check) {
          expect(false).customError('Automatic Calculation is checked off');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verifying if "Performance" report is selected in lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Performance', true, 'isSelected');

    it('Verify that "Performance" report is not calculated & Blank screen is displayed', function() {
      PA3MainPage.isReportCalculated('Performance', true).then(function(displayed) {
        if (displayed) {
          expect(false).customError('Performance report is calculated. Known issues "RPD:28333440".');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 549959', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Portfolio', 'Prices', 'Document Options');
  });

  describe('Test Step ID: 549960', function() {

    it('Should clear all items of "Selected" container from "PRICES" section', function() {
      DocumentOptionsPricesPortfolio.getClearSelectedItemsButton('Prices').click().then(function() {}, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that all items are removed from the 'Selected' container
      expect(DocumentOptionsPricesPortfolio.getAllListElements('Prices', 'Selected').count()).toEqual(0);
    });

    it('Search "bofa" in the search field', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, DocumentOptionsPricesPortfolio.getSearchField('Prices')).setText('bofa');

      // Verifying if the text is entered into the search field
      ThiefHelpers.getTextBoxClassReference(undefined, DocumentOptionsPricesPortfolio.getSearchField('Prices')).getText().then(function(text) {
        if (text !== 'bofa') {
          expect(false).customError('"bofa" is not found in the search field; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Clicking on the item "ICE BofAML" to highlight', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'ICE BofAML', 'Fixed Income|ICE BofAML', 'Fixed Income|ICE BofAML').select();

      // Verifying if the Item 'BofA Merrill Lynch' is selected.
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'ICE BofAML', 'Fixed Income|ICE BofAML', 'Fixed Income|ICE BofAML').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"ICE BofAML" is not selected in "Available section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking the right arrow button
    it('Clicking the right arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection(DocumentOptionsPricesPortfolio.getArrowButton('prices'));
    });

    // Verifying if 'ICE BofAML' is added to the 'Selected' container
    it('Verifying if "ICE BofAML"  is added to the "Selected" container', function() {
      DocumentOptionsPricesPortfolio.getListItem('ICE BofAML', 'Prices', 'Selected').isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"ICE BofAML" is not added to the "Selected" container.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    it('Verify that "Performance" report is empty', function() {
      PA3MainPage.isReportCalculated('Performance', true).then(function(displayed) {
        if (displayed) {
          expect(false).customError('Performance report is calculated. Known issues "RPD:28333440".');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 549961', function() {

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Performance');
  });

  describe('Test Step ID: 549962', function() {

    // check automatic calculation from wrench menu
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSetAutomaticCalculation(true);

    // select and verify if report is selected in lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Valuation - Detail', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Valuation - Detail');
  });

  describe('Test Step ID: 549963', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Valuation - Detail', 'Dates');

    it('Should select Report frequency as "Monthly",in "Tile Options - Valuation - Detail" view', function() {
      ThiefHelpers.selectOptionFromDropDown('Monthly', 'Report Frequency:', undefined, '');

      // Verifying if Monthly is selected from the drop down
      ThiefHelpers.verifySelectedDropDownText('Monthly', 'Report Frequency:');
    });

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Valuation - Detail');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Valuation - Detail');
  });

  describe('Test Step ID: 549958', function() {

    it('Should close the browser', function() {
      expect(true).toBeTruthy();
    });
  });
});
