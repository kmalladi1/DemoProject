'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: exclu-security', function() {

  var xpathAvailableVirtualListBox = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Available');
  var xpathSelectedVirtualListBox = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: 554948', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

    it('Should type "demo_eafe" and select "Client:/complete_acct/DEMO_EAFE.ACCT" from the drop down', function() {
      expect(PA3MainPage.setPortfolio('demo_eafe', 'Client:/complete_accts/DEMO_EAFE.ACCT', 'CLIENT:/COMPLETE_ACCTS/DEMO_EAFE.ACCT')).toBeTruthy();
    });

    it('Verifying if "MSCI:EAFE" is set Benchmark widget without any errors', function() {
      // Verifying Benchmark widget.
      expect(PA3MainPage.getWidgetBox('Benchmark').getAttribute('value')).toEqual('MSCI:EAFE');

      //Verifying if Error Setting Portfolio is not appeared.
      expect(PA3MainPage.getDialog('Error Setting portfolio').isPresent()).toBeFalsy();
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);
  });

  describe('Test Step ID: 544949', function() {

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    it('Should click on "Clear All" button from Selected section', function() {
      ThiefHelpers.getTransferBoxReference(TileOptionsGroupings.xpathOfTransferBox).target.clear();
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Should verify if only "Security Name" is present at the top of calculated report.', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(value) {
        expect(value).toEqual('Security Name');
      });
    });
  });

  describe('Test Step ID: 544950', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Exclusions');

    it('Waiting for Available Section Securities to load.', function() {
      Utilities.waitUntilElementDisappears(TileOptionsExclusions.getLoadingIcon(), 20000);
    });

    it('Should click on "ABB Ltd." in Available Section under Exclusion tab to select.', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getItemByText('ABB Ltd.');
      group.select();

      // Verifying if "ABB Ltd." is selected.
      group.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"ABB Ltd." is not selected from "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Right arrow button to add "ABB Ltd." to Selected Section.', function() {
      TileOptionsExclusions.getArrowButton('Right').click();

      // Verifying if "ABB Ltd." is added to Selected Section.
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Ungrouped Exclusion').getChildrenText().then(function(columnName) {
        if (columnName[0].text !== 'ABB Ltd.') {
          expect(false).customError('"ABB Ltd." is not added to "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544951', function() {

    it('Should enter "adidas" in the Available Section search field.', function() {
      TileOptionsExclusions.getSearchField('Available').sendKeys('adidas');
    });

    it('Should select "adidas AG"  from the search results', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getItemByText('adidas AG');
      group.select();

      // Verifying if "adidas AG" is selected.
      group.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"adidas AG" is not selected from "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Right arrow button to add "adidas AG" to Selected Section.', function() {
      TileOptionsExclusions.getArrowButton('Right').click();

      // Verifying if "adidas AG" is added to Selected Section.
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Ungrouped Exclusion').getChildrenText().then(function(columnName) {
        if (columnName[1].text !== 'adidas AG') {
          expect(false).customError('"adidas AG" is not added to "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Should verify if "ABB Ltd." and "adidas AG" Limited are not displayed in the report.', function() {
      expect(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'ABB Ltd.').isPresent()).toBeFalsy();
      expect(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'adidas AG').isPresent()).toBeFalsy();
    });
  });

  describe('Test Step ID: 544952', function() {

    CommonPageObjectsForPA3.clickOnExcludeExclusionsHyperlink('Weights', 'Excluded: Multiple Securities');

    it('Should verify if "ABB Ltd." and "adidas AG" are present in Exclusions Info Box', function() {
      PA3MainPage.getItemFromExcludedInfoBox('Weights', 'ABB Ltd.').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"ABB Ltd." is not present in Exclusions Info Box');
        }
      });

      PA3MainPage.getItemFromExcludedInfoBox('Weights', 'adidas AG').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"adidas AG" is not present in Exclusions Info Box');
        }
      });
    });
  });

  describe('Test Step ID: 544953', function() {

    it('Should click on "Edit Exclusions" hyperlink in Exclusions Info Box to open Exclusions tab in the Options dialog', function() {
      PA3MainPage.getEditExclusionsHyperlinkFromInfoBox('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "Tile Options - Weights" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Exclusions" is selected in the LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Exclusions" tab is not selected in the LHP by default.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on blast button at the top-right corner of "Exclusions" header', function() {
      TileOptionsExclusions.getApplyToButton().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if blast panel appeared after clicking on button
      expect(element(by.xpath(TileOptionsExclusions.xpathBlastingWindow)).isPresent()).toBeTruthy();
    });

    it('Select "Attribution" checkbox from the blasted window', function() {
      TileOptionsExclusions.getCheckBoxFromBlastWindow('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Attribution" checkbox is selected.
      expect(TileOptionsExclusions.getCheckBoxFromBlastWindow('Attribution').getAttribute('data-checked')).not.toBeUndefined();
    });

    it('Click "OK" button from blasted window', function() {
      TileOptionsExclusions.getOkOrCancelButtonFromBlastedWindow('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Verify if "Weights" report is selected from LHP
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Attribution', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Attribution`);

    it('Should verify if data grouped by "Economic Sector" in the calculated report.', function() {
      PA3MainPage.getGroupingsHyperLink('Attribution').getText().then(function(value) {
        if (value !== 'Economic Sector') {
          expect(false).customError('Data grouped by "Economic Sector" is not in the calculated report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544954', function() {

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Attribution', 'Economic Sector');

    it('Should click on "Clear All" button from Selected section', function() {
      ThiefHelpers.getTransferBoxReference(TileOptionsGroupings.xpathOfTransferBox).target.clear();
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Attribution`);

    it('Should verify if only "Security Name" is present at the top of calculated report.', function() {
      PA3MainPage.getGroupingsHyperLink('Attribution').getText().then(function(value) {
        if (value !== 'Security Name') {
          expect(false).customError('"Security Name" is not present at the top of calculated report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "ABB Ltd." and "adidas AG" are not displayed in the report.', function() {
      expect(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'ABB Ltd.').isPresent()).toBeFalsy();
      expect(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'adidas AG').isPresent()).toBeFalsy();
    });
  });
});
