'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: grpgs-update', function() {

  // Getting the xpath of the Selected section of groupings tab
  var xpathOfSelectedSectionOfGroupings = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathOfAvailableOrSelectedContainer, 'Selected');

  describe('Test Step ID: 470969', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/Pa3/Grouping/Divided_test" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('divided-test');
    });

    it('Should enter "pa3 testing" in "Portfolio" widget and select "PA3_TEST.ACCT | Client:" from type ahead', function() {
      PA3MainPage.setPortfolio('pa3 testing', 'PA3_TEST.ACCT | Client:', 'Client:PA3_TEST.ACCT').then(function(option) {
        if (!option) {
          expect(false).customError('"PA3_TEST.ACCT | Client:" is not selected from type ahead.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying that report is opened with "RUSSELL:1000" as benchmark', function() {
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(name) {
        if (name !== 'RUSSELL:1000') {
          expect(false).customError('The "Weights" report did not open with benchmark "RUSSELL:1000" but ' + 'opened with: ' + name);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 470970', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Groupings');

    it('Should click on "X(Clear All)" button to clear selected section', function() {
      ThiefHelpers.getTransferBoxReference(TileOptionsGroupings.xpathOfTransferBox).target.clear();
    });

    it('Verifying if the "Selected" section is empty', function() {
      TileOptionsGroupings.getAllElements('Selected').then(function(reference) {
        if (reference.length !== 0) {
          expect(false).customError('"Selected" section did not get empty');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Double click on "Currency" to add it to "Selected" container', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('FactSet',
        'Currency')).perform();
    });

    it('verifying if "Currency" is present in the selected section', function() {
      ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, 'Currency').getText().then(function(name) {
        if (name !== 'Currency') {
          expect(false).customError('"Currency" is not present in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "cog" icon next to "Currency" in "Selected" section', function() {
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Currency').click();

      // Verifying if options popup is appeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Currency', true).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Error: Failed to open "Options" popup');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Divide" radio button in option popup', function() {
      TileOptionsGroupings.getRadioBtnFromOptionsPopup('Divide').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button in options popup', function() {
      TileOptionsGroupings.getOkOrCancelButtonOptionsPopuop('OK').click();
    });

    it('verifying if "Currency" is present in the selected section', function() {
      ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, 'Currency').getText().then(function(name) {
        if (name === 'Currency') {
          expect(false).customError('"Currency" is  present in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(true).toBeTruthy();
      });
    });

    it('verifying if "Divide by Currency" is present in the selected section', function() {
      ThiefHelpers.getListboxGroup(xpathOfSelectedSectionOfGroupings, 'Divide by Currency').getText().then(function(name) {
        if (name !== 'Divide by Currency') {
          expect(false).customError('"Divide by Currency" is  not present in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 470971', function() {

    it('Should type "GICS" into the "Search" field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsGroupings.xpathAvailableSearchBox).setText('GICS');

      // Verifying that "Average" is typed into the search box
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsGroupings.xpathAvailableSearchBox).getText().then(function(text) {
        if (text !== 'GICS') {
          expect(false).customError('Expected:"GICS" but Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for search to happen
      browser.sleep(4000);
    });

    it('Should drag "Industry" from "Sector & Industry|FactSet" and drop over "Airlines" in Selected section', function() {
      var src = TileOptionsGroupings.getElementFromAvailableSection('FactSet|Sector & Industry|GICS|GICS - Multi-Sourced', 'Economic Sector');
      var dest = TileOptionsGroupings.getElementFromSelectedSection('Divide by Currency', 'U.S. Dollar');

      browser.actions().mouseMove(src).mouseDown().mouseMove(dest).perform();
      browser.actions().mouseMove({x: 0, y: 5}).perform();
      browser.actions().mouseUp().perform();
    });

    it('verifying if "Economic Sector - GICS - Multi-Sourced" is present in the selected section', function() {
      ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, 'Economic Sector - GICS - Multi-Sourced', 'Divide by Currency|U.S. Dollar').getText().then(function(columnName) {
        if (columnName !== 'Economic Sector - GICS - Multi-Sourced') {
          expect(false).customError('Expected: "Economic Sector - GICS - Multi-Sourced" to be present but Found: "' + columnName + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 472690', function() {

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verify if only "U.S. Dollar" is displayed in the weights report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(colValues) {
        if (colValues.length <= 2) {
          if (colValues.indexOf('U.S. Dollar') < 0) {
            expect(false).customError('"U.S. Dollar" is not displayed in the weights report.');
            CommonFunctions.takeScreenShot();
          }
        } else {
          expect(false).customError('Many currencies are displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 470972', function() {

    it('Enter "CLIENT:/COMPLETE_ACCTS/DEMO_EAFE.ACCT" in the "Portfolio" widget and enter', function() {
      // Clear the widget if some text already exists
      PA3MainPage.getWidgetBox('Portfolio').clear();

      // Enter "CLIENT:/COMPLETE_ACCTS/DEMO_EAFE.ACCT" into the "Portfolio" widget
      PA3MainPage.getWidgetBox('Portfolio').sendKeys('CLIENT:/COMPLETE_ACCTS/DEMO_EAFE.ACCT', protractor.Key.ENTER);
    });

    it('Verifying if header displays "International Equity vs MSCI EAFE"', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        if (text !== 'International Equity vs MSCI EAFE') {
          expect(false).customError('Header of application is not showing "International Equity vs MSCI EAFE". ' + 'Expected: "International Equity vs MSCI EAFE", Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if more currencies are displayed in the weights report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(colValues) {
        if (colValues.length < 1) {
          expect(false).customError('Many currencies are not displayed in the report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 470973', function() {

    it('Should click on "Currency" hyperlink', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').click().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Weights" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Groupings" is selected in the LHP', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Groupings').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Groupings" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "cog" icon next to "Divide by Currency" in "Selected" section', function() {
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Divide by Currency').click();

      // Verifying if options popup is appeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Divide by Currency', true).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Error: Failed to open "Options" popup');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Update" radio button in option popup', function() {
      TileOptionsGroupings.getRadioBtnFromOptionsPopup('Update').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button in options popup', function() {
      TileOptionsGroupings.getOkOrCancelButtonOptionsPopuop('OK').click();
    });

    it('Verify if more currencies are displayed under "Divide by Currency"', function() {
      var groupPath = ThiefHelpers.getListboxGroup(xpathOfSelectedSectionOfGroupings, 'Divide by Currency');
      var child = groupPath.getChildrenText();
      child.then(function(items) {
        if (items.lenght <= 1) {
          expect(false).customError('More currencies are displayed under "Divide by Currency"');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 472691', function() {

    it('Should type "region" into the "Search" field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsGroupings.xpathAvailableSearchBox).setText('region');

      // Verifying that "Average" is typed into the search box
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsGroupings.xpathAvailableSearchBox).getText().then(function(text) {
        if (text !== 'region') {
          expect(false).customError('Expected:"region" but Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for search to happen
      browser.sleep(4000);
    });

    it('Should drag "Region of Domicile" from "FactSet|Country & Region|FactSet" and drop over "Divide by Currency|Euro" in Selected section', function() {
      var src = TileOptionsGroupings.getElementFromAvailableSection('FactSet|Country & Region|FactSet', 'Region of Domicile');
      var dest = TileOptionsGroupings.getElementFromSelectedSection('Divide by Currency', 'Euro');

      browser.actions().mouseMove(src).mouseDown().mouseMove(dest).perform();
      browser.actions().mouseMove({x: 0, y: 5}).perform();
      browser.actions().mouseUp().perform();
    });

    it('verifying if "Region of Domicile - FactSet" is added to the selected section', function() {
      ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, 'Region of Domicile - FactSet', 'Divide by Currency|Euro').getText().then(function(columnName) {
        if (columnName !== 'Region of Domicile - FactSet') {
          expect(false).customError('Expected: "Region of Domicile - FactSet" to be present but Found: "' + columnName + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrOfItems = ['Euro', 'U.S. Dollar'];
    arrOfItems.forEach(function(elementPath) {
      it('Should expand "' + elementPath + '" in "Exposures" report', function() {
        PA3MainPage.expandTreeInCalculatedReport('Weights', elementPath);
      });

      it('Verifying that "' + elementPath + '" is expanded', function() {
        PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', elementPath);

        browser.sleep(2000);
      });
    });

    var arrOfEuroChild = ['North America', 'Western Europe'];

    arrOfEuroChild.forEach(function(childName) {
      it('Verify if "' + childName + '" are displayed under "Euro"', function() {
        SlickGridFunctions.getElementsFromTree('Weights', '', 'Euro', '').then(function(elements) {
          if (elements.indexOf(childName) < 0) {
            expect(false).customError(childName + 'is not displayed under "Euro"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verify if "Industrials" is displayed under "U.S. Dollar"', function() {
      SlickGridFunctions.getElementsFromTree('Weights', '', 'U.S. Dollar', '').then(function(elements) {
        if (elements.indexOf('Industrials') < 0) {
          expect(false).customError('"Industrials" is not displayed under "Euro"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });
});
