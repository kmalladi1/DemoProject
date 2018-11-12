'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: acct-exclu', function() {

  describe('Test Step ID: 738710', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('accounts-exclusions-test');
    });
  });

  describe('Test Step ID: 738796', function() {

    it('Should enter "Client:EXCLUSIONS_TEST.ACCT" in "Portfolio" widget', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).setText('Client:EXCLUSIONS_TEST.ACCT');

      PA3MainPage.getWidgetBox('Portfolio').sendKeys(protractor.Key.ENTER);

      // Verifying that "CLIENT:EXCLUSIONS_TEST.ACCT" is entered
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).getText().then(function(text) {
        if (text !== 'CLIENT:EXCLUSIONS_TEST.ACCT') {
          expect(false).customError('Portfolio widget is not populated with "CLIENT:EXCLUSIONS_TEST.ACCT", Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click on "Hamburger" icon next to "Portfolio"', function() {
      var xpathOfPortfolioHambergerIcon = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathOfPortfolioOrBenchmarkHambergerIcon, 'Portfolio');

      ThiefHelpers.getButtonClassReference(undefined, xpathOfPortfolioHambergerIcon).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Hamburger" icon next to "Portfolio"');
        CommonFunctions.takeScreenShot();
      });

      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (!found) {
          expect(false).customError('Account dropdown was not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the pencil icon next to "Exclusions account"', function() {
      PA3MainPage.getAccountEditButton('portfolio', 'Exclusions account').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Modify Account (New)" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Modify Account (New)').then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "Modify Account (New)" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the expand button next to "PA" tab', function() {
      ThiefHelpers.expandGroup(undefined, 'PA', undefined, 'optionspane');
    });

    it('Should click on the "Exclusions" tab on the LHP of tile options view', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Exclusions', 'PA').select();

      // Verifying if "Exclusions" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(undefined, 'Exclusions', 'PA').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Exclusions" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "Edit Grouping" button next to Available section
    CommonPageObjectsForPA3.clickOnEditGroupingButtonAndVerify();

    var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(ModifyAccountNewPaExclusions.xpathOfEditGroupingAvailableOrSelectedContainer, 'Available');

    it('Should expand "FactSet|Sector & Industry|GICS|GICS - Multi-Sourced" in "Available" section and Double click on "Economic Sector"', function() {
      ThiefHelpers.expandAndGetListBoxItem(xpathOfAvailableSection, 'Economic Sector', 'FactSet|Sector & Industry|GICS|GICS - Multi-Sourced', 'FactSet').then(function(eleRef) {
        browser.actions().doubleClick(eleRef).perform();
      });
    });

    var xpathOfSelectedContainerlistbox = CommonFunctions.replaceStringInXpath(ModifyAccountNewPaExclusions.xpathOfEditGroupingAvailableOrSelectedContainer, 'Selected');

    it('Verifying if "Economic Sector - GICS - Multi-Sourced" item is added to selected section', function() {
      ThiefHelpers.getListBoxItem(xpathOfSelectedContainerlistbox, 'Economic Sector - GICS - Multi-Sourced').getText().then(function(name) {
        if (name !== 'Economic Sector - GICS - Multi-Sourced') {
          expect(false).customError('"Economic Sector - GICS - Multi-Sourced" is not present in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "Save" button of "Edit Grouping" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Edit Groupings');

    it('Double click on "Consumer Discretionary" in available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(ModifyAccountNewPaExclusions.xpathAvailableContainer).getGroupByText('Consumer Discretionary');
      group.select();

      group.doubleClick();
    });

    it('Verifying if the element "Consumer Discretionary" is moved to "Selected" section', function() {
      var arrEle = [];
      ThiefHelpers.getVirtualListboxClassReference(ModifyAccountNewPaExclusions.xpathSelectedContainer).getGroupByText('Economic Sector').getChildrenText().then(function(elements) {
        elements.forEach(function(childEle) {
          if (childEle.text !== 'Consumer Discretionary') {
            expect(false).cusotmError('"Consumer Discretionary" is not present in "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "Save" button of Modify Account (New)" view', function() {
      var xpathOfSaveButton = CommonFunctions.replaceStringInXpath(ModifyAccountNew.xpathHeaderButtons, 'Save');
      ThiefHelpers.getButtonClassReference(undefined, xpathOfSaveButton).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Save" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Save Account" dialog is displayed', function() {
      ThiefHelpers.isDialogOpen('Save Account', undefined, undefined).then(function(bool) {
        if (!bool) {
          expect(false).customError('"Save Account" dialog has not displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 738797', function() {

    it('Should select "PERSONAL" group is not selected', function() {
      ThiefHelpers.getListboxGroup(undefined, 'PERSONAL').select();

      ThiefHelpers.getListboxGroup(undefined, 'PERSONAL').isSelected()
        .then(function(bool) {
          if (!bool) {
            expect(false).customError('"PERSONAL" group is not selected.');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    // Click on the "Save" button of "Save Account" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Save Account');

    it('Click on "OK" button if "Over write" pop up appears', function() {
      element(by.xpath(ModifyAccountNewPaExclusions.xpathOfFactsetResearchSystemDialog)).isDisplayed().then(function(displayed) {
        if (displayed) {
          element(by.xpath(CommonFunctions.replaceStringInXpath(ModifyAccountNewPaExclusions.xpathOfFactsetResearchSystemDialogButtons, 'OK'))).click().then(function() {
          }, function(err) {

            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        }
      }, function(err) {
        expect(true).toBeTruthy();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Options');

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Weights" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Exclusions" tab on the LHP of tile options view', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Exclusions').select();

      // Verifying if "Exclusions" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Exclusions" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Restore Defaults" button of  header', function() {
      ThiefHelpers.getButtonClassReference('Restore Defaults').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Restore Defaults" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK', 'Do you want to replace your current settings with the account defaults?');

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verify that "Consumer Discretionary" is not displayed as group in the report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '', '').then(function(rowdata) {
        if (rowdata.indexOf('Consumer Discretionary') > -1) {
          expect(false).customError('"Consumer Discretionary" is displayed as group in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Excluded: Consumer Discretionary" hyperlink is displayed next to "Economic Sector".', function() {
      PA3MainPage.getExclusionsHyperLink('Weights').getText().then(function(value) {
        if (value !== 'Excluded: Consumer Discretionary') {
          expect(false).customError('"Excluded: Consumer Discretionary" hyperlink is not displayed next to "Economic Sector');
          CommonFunctions.takeScreenShot();
        }
      });

    });

  });
});
