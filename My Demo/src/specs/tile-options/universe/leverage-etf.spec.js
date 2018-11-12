'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: leverage-etf', function() {

  // Test Case Specific Variables
  var directValue1;
  var directValue2;
  var directValue3;
  var directValue4;
  var cashValue1;
  var cashValue2;
  var cashValue3;
  var cashValue4;
  var totalValue1;
  var totalValue2;
  var ultraShortValue;

  describe('Test Step ID: 555998', function() {

    it('Should launch the PA3 application with document client:/pa3/universe/LEVERAGE_ADJ_ETF.', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('leverage-adj-etf');
    });

    // check automatic calculation from wrench menu
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSetAutomaticCalculation(true);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights(Asset Type)');

    it('Should collapse all trees from calculated list', function() {
      PA3MainPage.rightClickAndSelectOption(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights(Asset Type)', 1, 'Direct', 'slick-pane slick-pane-bottom slick-pane-left'), 'Collapse|Level 1');
    });

    it('Storing "Port. Ending Market Values" of groupings Direct, [Cash], Total', function() {
      // Storing Direct value
      PA3MainPage.getValueFromCalculatedReport('Weights(Asset Type)', 'Direct', 'Port. Ending Market Value', 'grid-canvas grid-canvas-bottom grid-canvas-left', 'grid-canvas grid-canvas-bottom grid-canvas-right').then(function(value) {
        value = value.replace(/\,/g, '');
        directValue1 = parseFloat(value);
      });

      // Storing Cash value
      PA3MainPage.getValueFromCalculatedReport('Weights(Asset Type)', '[Cash]', 'Port. Ending Market Value', 'grid-canvas grid-canvas-bottom grid-canvas-left', 'grid-canvas grid-canvas-bottom grid-canvas-right').then(function(value) {
        value = value.replace(/\,/g, '');
        cashValue1 = parseFloat(value);
      });

      // Storing Total value
      PA3MainPage.getValueFromCalculatedReport('Weights(Asset Type)', 'Total', 'Port. Ending Market Value', 'slick-viewport slick-viewport-top slick-viewport-left', 'slick-viewport slick-viewport-top slick-viewport-right').then(function(value) {
        value = value.replace(/\,/g, '');
        totalValue1 = parseFloat(value);
      });
    });
  });

  describe('Test Step ID: 555999', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights(Asset Type)', 'Options');

    it('Verifying if view changed to "Tile Options - Weights(Asset Type)" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights(Asset Type)').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Weights(Asset Type)" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Universe LHP item to select.
    it('Should click on Universe LHP item to select', function() {
      TileOptions.getLHPOption('Universe').click();

      // Checking if 'Universe' item is opened.
      expect(TileOptions.getOptionTitle().getText()).toEqual('Universe');
    });

    it('Should click on "Funds" from the Available Section', function() {
      TileOptionsUniverse.getElement('Funds', 'Available').click().then(function() {}, function(err) {
        expect(false).CustomError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Funds is selected in the Available section.
      TileOptionsUniverse.checkIfSelected('Funds', 'Available');
    });

    it('Should click on right arrow to add "Funds" to Selected section', function() {
      TileOptionsUniverse.getArrowButton('Right').click().then(function() {}, function(err) {
        expect(false).CustomError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verify that "Funds" is added to Selected section.
      expect(TileOptionsUniverse.getElement('Funds', 'Selected').isPresent()).toBeTruthy();
    });

    it('Verifying if "Funds" is added to Selected section at the top of the list', function() {
      TileOptionsUniverse.getIndex('Funds', 'Selected').then(function(index) {
        expect(index).toEqual(0);
      });
    });
  });

  describe('Test Step ID: 556000', function() {

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights(Asset Type)');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights(Asset Type)');

    it('Storing new Port. Ending Market Values of groupings Direct, [Cash], Total', function() {
      // Storing new Direct value
      PA3MainPage.getValueFromCalculatedReport('Weights(Asset Type)', 'Direct', 'Port. Ending Market Value', 'grid-canvas grid-canvas-bottom grid-canvas-left', 'grid-canvas grid-canvas-bottom grid-canvas-right').then(function(value) {
        value = value.replace(/\,/g, '');
        directValue2 = parseFloat(value);
      });

      // Storing new Cash value
      PA3MainPage.getValueFromCalculatedReport('Weights(Asset Type)', '[Cash]', 'Port. Ending Market Value', 'grid-canvas grid-canvas-bottom grid-canvas-left', 'grid-canvas grid-canvas-bottom grid-canvas-right').then(function(value) {
        value = value.replace(/\,/g, '');
        cashValue2 = parseFloat(value);
      });

      // Storing new Total value
      PA3MainPage.getValueFromCalculatedReport('Weights(Asset Type)', 'Total', 'Port. Ending Market Value', 'slick-viewport slick-viewport-top slick-viewport-left', 'slick-viewport slick-viewport-top slick-viewport-right').then(function(value) {
        value = value.replace(/\,/g, '');
        totalValue2 = parseFloat(value);
      });
    });

    it('Verifying if groupings Direct decreases, Cash increases and Total remains same.', function() {
      expect(directValue2).toBeLessThan(directValue1);
      expect(cashValue2).toBeGreaterThan(cashValue1);
      expect(totalValue2).toEqual(totalValue1);
    });
  });

  describe('Test Step ID: 556001', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights(Asset Type)', 'Options');

    // Checking if the 'Tile Options' mode has opened.
    it('Validating if "Tile Options" mode opened', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights(Asset Type)').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Weights(Asset Type)" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Universe LHP item to select.
    it('Should click on Universe LHP item to select', function() {
      TileOptions.getLHPOption('Universe').click();

      // Checking if 'Universe' item is opened.
      expect(TileOptions.getOptionTitle().getText()).toEqual('Universe');
    });

    it('Should click "Expand Composite Assets:" drop down and select "All Levels"', function() {
      ThiefHelpers.selectOptionFromDropDown('All Levels', 'Expand Composite Assets:');
    });

    it('Verifying if "All Levels" is selected in the drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('All Levels', 'Expand Composite Assets:');
    });

    // Clicking on the OK button to close Tile Options Mode
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights(Asset Type)');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights(Asset Type)');

    var arrGroupings = ['Direct', 'UltraShort Health Care ProShares', '[Cash]'];
    arrGroupings.forEach(function(grouping) {
      it('Verifying if "' + grouping + '" is present in the calculated report.', function() {
        PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights(Asset Type)', 1, grouping, 'slick-pane slick-pane-bottom slick-pane-left').isDisplayed().then(function(present) {
          if (!present) {
            expect(false).customError('"' + grouping + '" is not present in the calculated report');
            CommonFunctions.takeScreenShot();
          }
        });

        // Verifying if any error dialog box appeared
        PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
          if (option) {
            expect(false).customError('"Calculation Error" dialog appeared');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Storing Port. Ending Market Value group totals of Direct, UltraShort Health Care ProShares, [Cash]', function() {
      // Storing Direct value
      PA3MainPage.getValueFromCalculatedReport('Weights(Asset Type)', 'Direct', 'Port. Ending Market Value', 'grid-canvas grid-canvas-bottom grid-canvas-left', 'grid-canvas grid-canvas-bottom grid-canvas-right').then(function(value) {
        value = value.replace(/\,/g, '');
        directValue3 = parseFloat(value);
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Storing UltraShort Health Care ProShares value
      PA3MainPage.getValueFromCalculatedReport('Weights(Asset Type)', 'UltraShort Health Care ProShares', 'Port. Ending Market Value', 'grid-canvas grid-canvas-bottom grid-canvas-left', 'grid-canvas grid-canvas-bottom grid-canvas-right').then(function(value) {
        value = value.replace(/\,/g, '');
        ultraShortValue = parseFloat(value);
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Storing [Cash] value
      PA3MainPage.getValueFromCalculatedReport('Weights(Asset Type)', '[Cash]', 'Port. Ending Market Value', 'grid-canvas grid-canvas-bottom grid-canvas-left', 'grid-canvas grid-canvas-bottom grid-canvas-right').then(function(value) {
        value = value.replace(/\,/g, '');
        cashValue3 = parseFloat(value);
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 556002', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights(Asset Type)', 'Options');

    // Checking if the 'Tile Options' mode has opened.
    it('Validating if "Tile Options" mode opened', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights(Asset Type)').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Weights(Asset Type)" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Universe LHP item to select.
    it('Should click on Universe LHP item to select', function() {
      TileOptions.getLHPOption('Universe').click();

      // Checking if 'Universe' item is opened.
      expect(TileOptions.getOptionTitle().getText()).toEqual('Universe');
    });

    it('Should click on "Derivatives" in Selected section to select', function() {
      TileOptionsUniverse.getElement('Derivatives', 'Selected').click().then(function() {}, function(err) {
        expect(false).CustomError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Derivatives is select in the Selected section.
      TileOptionsUniverse.checkIfSelected('Derivatives', 'Selected');
    });

    it('Should click on left arrow to remove "Derivatives" tree from Selected section', function() {
      TileOptionsUniverse.getArrowButton('Left').click().then(function() {}, function(err) {
        expect(false).CustomError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Derivatives" is removed from the Selected section'
      expect(TileOptionsUniverse.getElement('Derivatives', 'Selected').isPresent()).toBeFalsy();
    });

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights(Asset Type)');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights(Asset Type)');

    it('Storing new Port. Ending Market Values of groupings Direct, [Cash]', function() {
      // Storing new Direct value
      PA3MainPage.getValueFromCalculatedReport('Weights(Asset Type)', 'Direct', 'Port. Ending Market Value', 'grid-canvas grid-canvas-bottom grid-canvas-left', 'grid-canvas grid-canvas-bottom grid-canvas-right').then(function(value) {
        value = value.replace(/\,/g, '');
        directValue4 = parseFloat(value);
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Storing new [Cash] value
      PA3MainPage.getValueFromCalculatedReport('Weights(Asset Type)', '[Cash]', 'Port. Ending Market Value', 'grid-canvas grid-canvas-bottom grid-canvas-left', 'grid-canvas grid-canvas-bottom grid-canvas-right').then(function(value) {
        value = value.replace(/\,/g, '');
        cashValue4 = parseFloat(value);
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if grouping Direct value increases, [Cash] value decreases', function() {
      expect(directValue4).toBeGreaterThan(directValue3);
      expect(cashValue4).toBeLessThan(cashValue3);
    });
  });

  describe('Test Step ID: 556006', function() {

    it('Should open the document "Client:/pa3/universe/Refresh_Test"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('refresh-test');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');
  });

  describe('Test Step ID: 556003', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Contribution', 'Options');

    // Checking if the 'Tile Options' mode has opened.
    it('Validating if "Tile Options" mode opened', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Contribution').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Contribution" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Universe LHP item to select.
    it('Should click on Universe LHP item to select', function() {
      TileOptions.getLHPOption('Universe').click();

      // Checking if 'Universe' item is opened.
      expect(TileOptions.getOptionTitle().getText()).toEqual('Universe');
    });

    it('Should select "Adjustment" radio button.', function() {
      TileOptionsUniverse.getRadioButton('Adjustment').click();

      // Verifying if "Adjustment" radio button is selected.
      expect(TileOptionsUniverse.getRadioButton('Adjustment').getAttribute('class')).toContain('selected');
    });

    it('Should expand "Generate Delta Adjusted Exposure > Derivatives > Options > Equity Options" in Available section', function() {
      TileOptionsUniverse.expandElementTree('Generate Delta Adjusted Exposure|Derivatives|Options|Equity Options', 'Available');

      // Verifying if "Generate Delta Adjusted Exposure > Derivatives > Options > Equity Options" is expanded.
      TileOptionsUniverse.checkifExpanded('Generate Delta Adjusted Exposure|Derivatives|Options|Equity Options', 'Available');
    });

    it('Should double click on "Equity Option: Put"', function() {
      browser.actions().doubleClick(TileOptionsUniverse.getElement('Generate Delta Adjusted Exposure|Derivatives|Options' + '|Equity Options|Equity Option: Put', 'Available')).perform();
    });

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');
  });

  describe('Test Step ID: 556004', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Contribution', 'Options');

    // Checking if the 'Tile Options' mode has opened.
    it('Validating if "Tile Options" mode opened', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Contribution').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Contribution" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Universe LHP item to select.
    it('Should click on Universe LHP item to select', function() {
      TileOptions.getLHPOption('Universe').click();

      // Checking if 'Universe' item is opened.
      expect(TileOptions.getOptionTitle().getText()).toEqual('Universe');
    });

    it('Verifying if "Generate Delta Adjusted Exposure > Derivatives >Options > Equity Options > Equity Options:Put" is present in' + ' Selected section.', function() {
      expect(TileOptionsUniverse.getElement('Generate Delta Adjusted Exposure|Derivatives|Options|Equity Options' + '|Equity Option: Put', 'Selected').isDisplayed()).toBeTruthy();
    });
  });

  describe('Test Step ID: 556005', function() {

    it('Should select "Asset Type" radio button in Universe tab', function() {
      TileOptionsUniverse.getRadioButton('Asset Type').click();

      // Verifying if "Asset Type" radio button is selected.
      expect(TileOptionsUniverse.getRadioButton('Asset Type').getAttribute('class')).toContain('selected');
    });

    it('Verifying if "Derivatives > Options > Equity Options > Equity Options:Put > Generate Delta Adjusted Exposure" is present in' + ' Selected section.', function() {
      expect(TileOptionsUniverse.getElement('Derivatives|Options|Equity Options|Equity Option: Put|Generate Delta Adjusted' + ' Exposure', 'Selected').isDisplayed()).toBeTruthy();
    });
  });
});
