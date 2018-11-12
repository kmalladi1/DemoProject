'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: grpgs-sub-divide', function() {

  describe('Test Step ID: 470390', function() {

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

  describe('Test Step ID: 470391', function() {

    // Click on "Economic Sector Hyperlink" and verify if Groupings is selected by default in tile options
    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    it('Select "Economic Sector - FactSet" in selected section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Economic Sector - FactSet').select();

      // Verifying if the item is selected
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Economic Sector - FactSet').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Economic Sector - FactSet" is not selected from the Selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Frequency:" drop down is displayed', function() {
      ThiefHelpers.verifySelectedDropDownText('Beginning of Period', 'Frequency:');
    });

    it('Verifying that the "Enable Grouping Overrides" checkbox is present', function() {
      ThiefHelpers.isPresent('checkbox', 'Enable Grouping Overrides').then(function(present) {
        if (!present) {
          expect(false).customError('The "Enable Grouping Overrides" checkbox is not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 482747', function() {

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

    it('Should type "GICS" into the "Search" field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsGroupings.xpathAvailableSearchBox).setText('GICS');

      // Verifying that "GICS" is typed into the search box
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsGroupings.xpathAvailableSearchBox).getText().then(function(text) {
        if (text !== 'GICS') {
          expect(false).customError('Expected: "GICS" but Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for search to happen
      browser.sleep(2000);
    });

    it('Double click on "Economic Sector" from "FactSet|Sector & Industry|GICS|GICS - Multi-Sourced" directory', function() {
      TileOptionsGroupings.getElementFromAvailableSection('FactSet|Sector & Industry|GICS|GICS - Multi-Sourced', 'Economic Sector').isPresent().then(function(option) {
        if (option) {
          browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('FactSet|Sector & Industry|GICS|GICS - Multi-Sourced', 'Economic Sector')).perform();
        } else {
          expect(false).customError('"Economic Sector" is not present under "FactSet|Sector & Industry|GICS|GICS - Multi-Sourced" directory');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('verifying if "Economic Sector - GICS - Multi-Sourced" is present in the selected section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Economic Sector - GICS - Multi-Sourced').getText().then(function(name) {
        if (name !== 'Economic Sector - GICS - Multi-Sourced') {
          expect(false).customError('"Economic Sector - GICS - Multi-Sourced" is not present in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "cog" icon next to "Economic Sector - GICS - Multi-Sourced" in "Selected" section', function() {
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Economic Sector - GICS - Multi-Sourced').click();

      // Verifying if options popup is appeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Economic Sector - GICS - Multi-Sourced', true).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Error: Failed to open "Options" popup');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Divide" radio button is displayed', function() {
      ThiefHelpers.isPresent('Radio', 'Divide').then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Divide" radio button is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 470392', function() {

    it('Should select "Divide" under directory', function() {
      ThiefHelpers.getRadioClassReference('Divide').select();

      // Verfying if "Divide" is selected under "Directory"
      ThiefHelpers.getRadioClassReference('Divide').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Divide" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in options popup', function() {
      TileOptionsGroupings.getOkOrCancelButtonOptionsPopuop('OK').click();
    });

    it('Click on the X icon in the search field', function() {
      ThiefHelpers.getTextBoxClassReference('Available').clearText();

      //Verifying the text in search field
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(value) {
        if (value !== '') {
          expect(false).customError('Text in search field is not cleared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should drag "Asset Type" from "FactSet" and drop over "Financials" in Selected section', function() {
      var src = TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Asset Type');
      var dest = TileOptionsGroupings.getElementFromSelectedSection('Divide by Economic Sector - GICS - Multi-Sourced', 'Financials');

      CommonPageObjectsForPA3.dragItemOrGroupFromSourceAndDropUnderTarget(src, dest);
    });

    it('verifying if "Asset Type" is present under "Financials" in the selected section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Asset Type', 'Financials').getText().then(function(name) {
        if (name !== 'Asset Type') {
          expect(false).customError('"Asset Type" is not present under "Financials" in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 470393', function() {

    it('Should drag "Currency" from "FactSet" and drop over "Information Technology" in Selected section', function() {
      var src = TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Currency');
      var dest = TileOptionsGroupings.getElementFromSelectedSection('Divide by Economic Sector - GICS - Multi-Sourced', 'Information Technology');

      CommonPageObjectsForPA3.dragItemOrGroupFromSourceAndDropUnderTarget(src, dest);
    });

    it('verifying if "Currency" is present under "Information Technology" in the selected section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Currency', 'Information Technology').getText().then(function(name) {
        if (name !== 'Currency') {
          expect(false).customError('"Currency" is not present under "Information Technology" in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrOfGroupsToBeExpanded = ['Financials', 'Information Technology'];

    arrOfGroupsToBeExpanded.forEach(function(groupName) {
      it('Should expand "' + groupName + '" group in the report', function() {
        PA3MainPage.expandTreeInCalculatedReport('Weights', groupName);

        //Checking if required tree is expanded
        PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', groupName);
      });
    });

    var parentGroupings = [{group: 'Financials', security: 'Equity Common'}, {group: 'Information Technology', security: 'U.S. Dollar'}];
    parentGroupings.forEach(function(element) {
      it('Verify if "' + element.security + '" is displayed under "' + element.group + '" grouping', function() {
        SlickGridFunctions.getElementsFromTree('Weights', '', element.group, '').then(function(elements) {
          if (elements.indexOf(element.security) < 0) {
            expect(false).customError(element.security + 'is not displayed under "' + element.group + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 470394', function() {

    // Click on "Economic Sector Hyperlink" and verify if Groupings is selected by default in tile options
    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    it('Select "Asset Type" in selected section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Asset Type', 'Financials').select();

      // Verifying if the item is selected
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Asset Type', 'Financials').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Asset Type" is not selected from the Selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "cog" icon next to "Asset Type" in "Selected" section', function() {
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Asset Type').click();

      // Verifying if options popup is appeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Asset Type', true).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Error: Failed to open "Options" popup');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Divide" under directory', function() {
      ThiefHelpers.getRadioClassReference('Divide').select();

      // Verfying if "Divide" is selected under "Directory"
      ThiefHelpers.getRadioClassReference('Divide').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Divide" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in options popup', function() {
      TileOptionsGroupings.getOkOrCancelButtonOptionsPopuop('OK').click();
    });

    it('Verifying that in "Selected" container "Asset Type" is displayed  as "Divide by Asset Type"', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer).getGroupByText('Financials');
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        if (childArr.indexOf('Divide by Asset Type') === -1 && childArr.indexOf('Asset Type') > -1) {
          expect(false).customError('"Asset Type" is not displayed  as "Divide by Asset Type"');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 470395', function() {

    it('Should type "FTSE" into the "Search" field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsGroupings.xpathAvailableSearchBox).setText('FTSE');

      // Verifying that "FTSE" is typed into the search box
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsGroupings.xpathAvailableSearchBox).getText().then(function(text) {
        if (text !== 'FTSE') {
          expect(false).customError('Expected: "FTSE" but Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for search to happen
      browser.sleep(2000);
    });

    it('Should drag "Country" from "FactSet|Country & Region|FTSE" and drop over "Divide by Economic Sector - GICS - Multi-Sourced|Divide by Asset Typ|Equity Common" in Selected section', function() {
      var src = TileOptionsGroupings.getElementFromAvailableSection('FactSet|Country & Region|FTSE', 'Country');
      var dest = TileOptionsGroupings.getElementFromSelectedSection('Divide by Economic Sector - GICS - Multi-Sourced|Divide by Asset Type', 'Equity Common');

      CommonPageObjectsForPA3.dragItemOrGroupFromSourceAndDropUnderTarget(src, dest);
    });

    it('verifying if "Country" is present under "Equity Common" in the selected section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Country - FTSE', 'Equity Common').getText().then(function(name) {
        if (name !== 'Country - FTSE') {
          expect(false).customError('"Country" is not present under "Equity Common" in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply To Weights" button from Tile Options Page', function() {
      ThiefHelpers.getButtonClassReference('Apply To Weights').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Apply To Weights" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should check the checkbox "Pre & Post Trade"', function() {
      ThiefHelpers.setCheckBox('Pre & Post Trade', undefined, true);

      // Verifying if the checkbox is checked
      ThiefHelpers.verifyStatusOfCheckbox('Pre & Post Trade', undefined, 'IsChecked');
    });

    it('Click on "OK" button', function() {
      var ref = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathOfApplyToWeightsButton, 'OK');
      ThiefHelpers.getButtonClassReference(undefined, ref).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should expand "Equity Common" group in the report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Financials|Equity Common', 'Financials');

      //Checking if required tree is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Financials|Equity Common');
    });

    var arrOfConsumerDiscretionaryChild = ['United States', '[Unassigned]'];

    it('Verify if "' + arrOfConsumerDiscretionaryChild + '" groupings are displayed under "Financials" in "Weights" report', function() {
      SlickGridFunctions.getElementsFromTree('Weights', '', 'Financials|Equity Common', '').then(function(elements) {
        if (elements.indexOf('United States') < 0) {
          expect(false).customError('"United States" grouping is not displayed under "Financials" in "Weights" report');
          CommonFunctions.takeScreenShot();
        }

        if (elements.length === 2) {
          if (elements.indexOf('[Unassigned]') < 0) {
            expect(false).customError('"[Unassigned]" is not displayed under "Financials" in "Weights" report');
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });
  });

  describe('Test Step ID: 470402', function() {

    // Click on "Economic Sector Hyperlink" and verify if Groupings is selected by default in tile options
    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    it('Should click on "cog" icon next to "Divide by Economic Sector - GICS - Multi-Sourced" in "Selected" section', function() {
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Divide by Economic Sector - GICS - Multi-Sourced').click();

      // Verifying if options popup is appeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Divide by Economic Sector - GICS - Multi-Sourced', true).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Error: Failed to open "Options" popup');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrOfRadioButtons = ['Undivide', 'Update'];

    arrOfRadioButtons.forEach(function(name) {
      it('Verifying if "' + name + '" radio button is displayed', function() {
        ThiefHelpers.isPresent('Radio', name).then(function(boolean) {
          if (!boolean) {
            expect(false).customError('"' + name + '" radio button is not displayed');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 470403', function() {

    it('Should select "Un-divide" under directory', function() {
      ThiefHelpers.getRadioClassReference('Undivide').select();

      // Verfying if "Divide" is selected under "Directory"
      ThiefHelpers.getRadioClassReference('Undivide').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Divide" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in options popup', function() {
      TileOptionsGroupings.getOkOrCancelButtonOptionsPopuop('OK').click();
    });

    it('Verifying that only "Economic Sector - GICS - Multi-Sourced" is displayed in the "Selected" container', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer);
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        if (childArr.length > 1 && childArr[0].text !== 'Economic Sector - GICS - Multi-Sourced') {
          expect(false).customError('"Economic Sector - GICS - Multi-Sourced" is not displayed in the selected section.');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 472689', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if sectors are directly displayed under "Financials"', function() {
      var group1Found;
      var parentID;
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(rowRef, index) {
          if (rowRef[0] === 'Financials' && rowRef.metadata.type === 'group') {
            SlickGridFunctions.scrollRowToTop('Weights', index);
            group1Found = true;
            parentID = rowRef.id;
            if (rowRef.expanded) {
              dataView.forEach(function(element) {
                if (parentID === element.parentId && element.metadata.type === 'group') {
                  expect(false).customError('sectors are not directly displayed under "Financials".');
                  CommonFunctions.takeScreenShot();
                }
              });
            } else {
              expect(false).customError('"Financials" grouping is present in the report but it is not expanded by default');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 480679', function() {

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Pre & Post Trade', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Pre & Post Trade');

    it('Should right click on "Communication Services" in "Pre & Post Trade" report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Pre & Post Trade', 1, 'Communication Services');
      PA3MainPage.rightClickOnGivenElement(reference).then(function() {
      }, function(value) {
        if (!value) {
          expect(false).customError('Menu list did not appear after performing right click on "Communication Services".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the option "Collapse>Level 1" from the menu list in "Pre & Post Trade" report', function() {
      PA3MainPage.getOptionFromCustomMenu('Collapse|Level 1').click().then(function() {
        Utilities.waitUntilElementDisappears(element(by.xpath(SlickGridFunctions.xpathSlickGridLoadingSpinner)), 40000);
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should expand "Financials|Equity Common" group in the "Pre & Post Trade" report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Pre & Post Trade', 'Financials|Equity Common');

      //Checking if required tree is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Pre & Post Trade', 'Financials|Equity Common');
    });

    var arrOfConsumerDiscretionaryChild = ['United States', '[Unassigned]'];

    it('Verify if "' + arrOfConsumerDiscretionaryChild + '" groupings are displayed under "Financials"', function() {
      SlickGridFunctions.getElementsFromTree('Pre & Post Trade', '', 'Financials|Equity Common', '').then(function(elements) {
        if (elements.indexOf('United States') < 0) {
          expect(false).customError('"United States" grouping is not displayed under "Financials" in "Pre & Post Trade" report');
          CommonFunctions.takeScreenShot();
        }

        if (elements.length === 2) {
          if (elements.indexOf('[Unassigned]') < 0) {
            expect(false).customError('"[Unassigned]" is not displayed under "Financials" in "Pre & Post Trade" report');
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });
  });
});
