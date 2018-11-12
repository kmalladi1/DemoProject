'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: grpg-exclusion', function() {

  var xpathOfAvailableSectionListbox = element.all(by.xpath(CommonFunctions.replaceStringInXpath(TileOptionsHiddenEditGroupingsAddRemove.xpathOfAvailableOrSelectedContainerItemsAndGroups, 'Available')));
  var xpathOfSelectedContainerlistbox = CommonFunctions.replaceStringInXpath(TileOptionsHiddenEditGroupingsAddRemove.xpathOfAvailableOrSelectedContainerItemsAndGroups, 'selected');

  var xpathAvailableVirtualListBox = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Available');
  var xpathSelectedVirtualListBox = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: 509922', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:;PA3;Grouping;Exclusions_test"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('exclusions-test');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying that "Weights" report is opened with "CLIENT:PA3_TEST.ACCT" portfolio', function() {
      PA3MainPage.getWidgetBox('Portfolio').getAttribute('value').then(function(name) {
        if (name !== 'CLIENT:PA3_TEST.ACCT') {
          expect(false).customError('The "Weights" report did not open with portfolio "CLIENT:PA3_TEST.ACCT" ' +
            'but opened with: ' + name);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that report is opened with "RUSSELL:1000" benchmark', function() {
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(name) {
        if (name !== 'RUSSELL:1000') {
          expect(false).customError('The "Weights" report did not open with benchmark "RUSSELL:1000" but ' +
            'opened with: ' + name);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 509925', function() {

    it('Should expand the sector "Information Technology" from the "Weights" report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Information Technology');
    });

    it('Verifying if the sector "Information Technology" is expanded', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Information Technology');
    });

    it('Verifying if the "U.S. Dollar" is displayed under "Information Technology"', function() {
      PA3MainPage.getElementFromCalculatedTree('Weights', 'Information Technology', 'U.S. Dollar').isDisplayed()
        .then(function(displayed) {
          if (!displayed) {
            expect(false).customError('"U.S. Dollar" did not display under "Information Technology"');
            CommonFunctions.takeScreenShot();
          }
        });
    });

  });

  describe('Test Step ID: 611134', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Exclusions');

    it('Verifying if the "Available" section under "Exclusions" tab is enabled', function() {
      element(by.xpath(xpathAvailableVirtualListBox)).getAttribute('class').then(function(value) {
        if (value.indexOf('disabled') !== -1) {
          expect(false).customError('"Available" section under "Exclusions" tab did not enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 761017', function() {

    // Click on the "Edit Grouping" button next to Available section
    CommonPageObjectsForPA3.clickOnEditGroupingButtonAndVerify();

    it('Should click on "Clear All/X" button to clear groupings in selected section of "Edit Groupings" dialog', function() {
      ThiefHelpers.getTransferBoxReference(TileOptionsExclusionsEditGroupings.xpathOfDialogTransferBox).target.clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should enter "GICS" into the search field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available', TileOptionsExclusionsEditGroupings.xpathAvailableSectionSearchBox).setText('GICS');

      // Verifying that "GICS" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available', TileOptionsExclusionsEditGroupings.xpathAvailableSectionSearchBox).getText().then(function(text) {
        if (text !== 'GICS') {
          expect(false).customError('"GICS" is not present in search field of "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });
      browser.sleep(2000);
    });

    it('Double click on "Bloomberg Barclays" from "FactSet|Sector & Industry|Bloomberg Barclays"', function() {
      ThiefHelpers.getListBoxItem(xpathOfAvailableSectionListbox, 'Economic Sector', 'FactSet|Sector & Industry|GICS|GICS - Multi-Sourced').then(function(eleRef) {
        browser.actions().doubleClick(eleRef).perform();
      });
    });

    it('Verifying if "Economic Sector - GICS - Multi-Sourced" item is added to selected section', function() {
      ThiefHelpers.getListBoxItem(xpathOfSelectedContainerlistbox, 'Economic Sector - GICS - Multi-Sourced').getText().then(function(name) {
        if (name !== 'Economic Sector - GICS - Multi-Sourced') {
          expect(false).customError('"Economic Sector - GICS - Multi-Sourced" is not present in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Info" icon in "Economic Sector - GICS - Multi-Sourced" item', function() {
      TileOptionsExclusionsEditGroupings.getInfoBoxIconOfAnItemFromDialog('Selected', 'Economic Sector - GICS - Multi-Sourced').click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Formula" tab', function() {
      ThiefHelpers.getTabsClassReference().selectTabByText('Formula');
    });

    // verify the style of title and content
    CommonPageObjectsForPA3.verifyIfTitleIsBoldAndExpectedContent('Economic Sector', 'GLOBAL_GICS_SECTOR');
  });

  describe('Test Step ID: 661952', function() {

    // Click on the "Cancel" button of "Edit Grouping" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Cancel', 'Edit Groupings');

    it('Should select "Hidden" fromm LHP in "Tile Options" page', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Hidden').select();

      // Verifying if "Hidden" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Hidden').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Hidden" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Available" section under "Hidden" tab is enabled', function() {
      element(by.xpath(xpathAvailableVirtualListBox)).getAttribute('class').then(function(value) {
        if (value.indexOf('disabled') !== -1) {
          expect(false).customError('"Available" section under "Hidden" tab is not enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 611142', function() {

    var submenu = [];

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should right click on "U.S. Dollar" and select "Exclusions"', function() {
      PA3MainPage.rightClickAndSelectOption(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights',
        2, 'U.S. Dollar'), 'Exclusions');
    });

    it('Recording the options in the sub menu in an array for verification', function() {
      PA3MainPage.getAllOptionsAfterRightClickOnReport('Submenu').each(function(ref) {
        ref.getText().then(function(value) {
          submenu.push(value);
        });
      });
    });

    var arrElements = ['Exclude Selected Rows', 'Hide Selected Rows', 'Clear Exclusions', 'Edit Exclusions…'];

    it('Verifying if three options are present in the sub menu', function() {
      if (submenu.length !== 4) {
        expect(false).customError('Sub menu is not displayed  with 4 menu items, Found: ' + submenu.length);
        CommonFunctions.takeScreenShot();
      }
    });

    arrElements.forEach(function(element, index) {
      it('Verifying that "' + element + '" is displayed in the sub menu', function() {
        if (submenu[index] !== element) {
          expect(false).customError('"' + element + '" did not display in the sub menu; Found: ' + submenu[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 611144', function() {

    var submenu = [];

    it('Should expand "Information Technology > U.S. Dollar" from the "Weights" report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Information Technology|U.S. Dollar', 'Information Technology');
    });

    it('Verifying if the Information Technology > U.S. Dollar is expanded', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Information Technology|U.S. Dollar');
    });

    it('Should right click on "Accenture Plc Class A" and select "Exclusions"', function() {
      PA3MainPage.rightClickAndSelectOption(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights',
        3, 'Accenture Plc Class A'), 'Exclusions');
    });

    it('Recording the options in the sub menu in an array for verification', function() {
      PA3MainPage.getAllOptionsAfterRightClickOnReport('submenu').each(function(ref) {
        ref.getText().then(function(value) {
          submenu.push(value);
        });
      });
    });

    var arrElements = ['Exclude Selected Rows', 'Hide Selected Rows', 'Clear Exclusions', 'Edit Exclusions…'];

    it('Verifying if three options are present in the sub menu', function() {
      if (submenu.length !== 4) {
        expect(false).customError('Sub menu is not displayed  with 4 menu items, Found:' + submenu.length);
        CommonFunctions.takeScreenShot();
      }
    });

    arrElements.forEach(function(element, index) {
      it('Verifying that "' + element + '" is displayed in the sub menu', function() {
        if (submenu[index] !== element) {
          expect(false).customError('"' + element + '" did not display in the sub menu; Found: ' + submenu[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 509926', function() {

    var xpath = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.getRadioButtonFromOptionsPopup, 'Undivide');

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    it('Should click on "cog" wheel next to "Divide by Economic Sector - GICS - Multi-Sourced" in "Selected" section', function() {
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Divide by Economic Sector - GICS - Multi-Sourced').click();

      // Verifying if options popup is appeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Divide by Economic Sector - GICS - Multi-Sourced', true)
        .isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Options" popup did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Undivide" radio button in "Options" popup', function() {
      ThiefHelpers.getRadioClassReference(undefined, xpath).select();
    });

    it('Verifying if "Undivide" radio button is selected', function() {
      ThiefHelpers.getRadioClassReference(undefined, xpath).isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Undivide" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in the popup', function() {
      TileOptionsGroupings.getOkOrCancelButtonOptionsPopuop('Ok').click();

      // Verifying if options popup is disappeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Divide by Economic Sector - GICS - Multi-Sourced', true)
        .isPresent().then(function(found) {
        if (found) {
          expect(false).customError('Error: Failed to close "Options" popup');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should right click on "Information Technology" and select "Collapse All" from the drop down', function() {
      PA3MainPage.rightClickAndSelectOption(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights',
        1, 'Information Technology'), 'Collapse All');
    });

    it('Should expand "Materials" from the "Weights" report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Materials');
    });

    it('Verifying if the "Materials" is expanded', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Materials');
    });

    it('Should right click on "Ball Corporation" and select "Exclusions" and then select "Exclude Selected Rows"', function() {
      PA3MainPage.rightClickAndSelectOption(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights',
        2, 'Ball Corporation'), 'Exclusions|Exclude Selected Rows');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should right click on "Industrials" and select "Exclusions" and then select "Exclude Selected Rows"', function() {
      PA3MainPage.rightClickAndSelectOption(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights',
        1, 'Industrials'), 'Exclusions|Exclude Selected Rows');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click on "Excluded: Multiple Securities" hyperlink in the report', function() {
      PA3MainPage.getExclusionsHyperLink('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the "Info box" arrow is pointing towards the hyperlink', function() {
      PA3MainPage.isArrowPointingTowardsHyperlink().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Info box" arrow did not pointing towards the hyperlink');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var infoBoxElements = ['Consumer Discretionary', 'Industrials', 'Materials > Ball Corporation'];

    infoBoxElements.forEach(function(element, index) {

      it('Verifying if the "Excluded: Multiple Securities" popup displays "' + element + '"', function() {
        PA3MainPage.getAllItemsFromExcludedInfoBox().get(index).getText().then(function(text) {
          if (text !== element) {
            expect(false).customError('"Excluded: Multiple Securities" did not display "' + element + '"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Verifying if "Ball Corporation" is not displayed under "Materials" grouping in "Weights" report', function() {
      PA3MainPage.getElementFromCalculatedTree('Weights', 'Materials', 'Ball Corporation').isPresent()
        .then(function(found) {
          if (found) {
            expect(false).customError('"Ball Corporation" is displayed under "Materials" grouping in "Weights" report');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if the "Industrials" grouping is not displayed in "Weights" report', function() {
      PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Industrials').isPresent()
        .then(function(found) {
          if (found) {
            expect(false).customError('"Industrials" grouping is displayed in "Weights" report');
            CommonFunctions.takeScreenShot();
          }
        });
    });

  });

  describe('Test Step ID: 611145', function() {

    var xpath = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.getRadioButtonFromOptionsPopup, 'Divide');

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    it('Should click on "cog" wheel next to "Economic Sector - GICS - Multi-Sourced" in "Selected" section', function() {
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Economic Sector - GICS - Multi-Sourced').click();

      // Verifying if options popup is appeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Economic Sector - GICS - Multi-Sourced', true)
        .isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Options" popup did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Divide" radio button in "Options" popup', function() {
      ThiefHelpers.getRadioClassReference(undefined, xpath).select();
    });

    it('Verifying if "Divide" radio button is selected', function() {
      ThiefHelpers.getRadioClassReference(undefined, xpath).isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Divide" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in the popup', function() {
      TileOptionsGroupings.getOkOrCancelButtonOptionsPopuop('Ok').click();

      // Verifying if options popup is disappeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Economic Sector - GICS - Multi-Sourced', true)
        .isPresent().then(function(found) {
        if (found) {
          expect(false).customError('Error: Failed to close "Options" popup');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait until "Selected" section reloads', function() {
      Utilities.waitUntilElementAppears(element(by.xpath(TileOptionsGroupings.xpathSelectedContainer)), 18000);
    });

    it('Should select "Exclusions" from LHP in "Tile Options" view', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Exclusions').select();

      // Verifying if "Exclusions" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Exclusions" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Available" section under "Exclusions" tab is enabled', function() {
      element(by.xpath(xpathAvailableVirtualListBox)).getAttribute('class').then(function(value) {
        if (value.indexOf('disabled') !== -1) {
          expect(false).customError('"Available" section under "Exclusions" tab is not enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform double click on "Energy" from available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getGroupByText('Energy');
      group.select();

      group.doubleClick();
    });

    it('Verifying if the element "Energy" is moved to "Selected" section', function() {
      var arrEle = [];
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Economic Sector').getChildrenText().then(function(elements) {
        elements.forEach(function(ele) {
          arrEle.push(ele.text);
        });
      }).then(function() {
        if (arrEle.indexOf('Energy') < 0) {
          expect(false).customError('"Energy" is not added to "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arr = ['Industrials', 'Energy'];

    arr.forEach(function(element) {
      it('Verifying if "' + element + '" is disabled in "Available" section', function() {
        TileOptionsExclusions.getGroupStatus(element, 'Available').getAttribute('class')
          .then(function(text) {
            if (text.indexOf('disabled') < 0) {
              expect(false).customError('"' + element + '" is not disabled in "Available" section');
              CommonFunctions.takeScreenShot();
            }
          });
      });
    });

    var selected = ['Industrials', 'Consumer Discretionary', 'Energy', 'Materials > Ball Corporation'];
    it('Verifying that "Selected" section displays only "Industrials", "Consumer Discretionary", "Energy" and "Materials > Ball Corporation" under ' +
      '"Economic Sector"', function() {
      var arrEle = [];
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Economic Sector').getChildrenText().then(function(elements) {
        elements.forEach(function(ele) {
          arrEle.push(ele.text);
        });
      }).then(function() {
        selected.forEach(function(value) {
          if (arrEle.length === 4) {
            if (arrEle.indexOf(value) < 0) {
              expect(false).customError('"' + value + '" is not added to "Selected" section');
              CommonFunctions.takeScreenShot();
            }
          } else {
            expect(false).customError('"Selected" section contains less or more than 4 elements');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 611146', function() {

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if the "Energy" grouping is not displayed in "Weights" report', function() {
      PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Energy').isPresent()
        .then(function(found) {
          if (found) {
            expect(false).customError('"Energy" grouping is displayed in "Weights" report');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should right click on "Materials" grouping and select "Exclusions" and click "Clear Exclusions"', function() {
      PA3MainPage.rightClickAndSelectOption(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights',
        1, 'Materials'), 'Exclusions|Clear Exclusions');
    });

    it('Verifying "Excluded" hyperlink is not displayed in "Weights" report', function() {
      PA3MainPage.getExclusionsHyperLink('Weights').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Excluded" hyperlink displayed in the "Weights" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Ball Corporation" is displayed under "Materials" grouping in "Weights" report', function() {
      PA3MainPage.getElementFromCalculatedTree('Weights', 'Materials', 'Ball Corporation').isPresent()
        .then(function(found) {
          if (!found) {
            expect(false).customError('"Ball Corporation" did not display under "Materials" grouping in "Weights" report');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    var arr = ['Industrials', 'Energy'];
    arr.forEach(function(element) {
      it('Verifying if the "' + element + '" grouping is displayed in "Weights" report', function() {
        PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, element).isPresent()
          .then(function(found) {
            if (!found) {
              expect(false).customError('"' + element + '" grouping did not display in "Weights" report');
              CommonFunctions.takeScreenShot();
            }
          });
      });
    });

  });

  describe('Test Step ID: 641161', function() {

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    it('Should click on "x" button to clear selected section', function() {
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

    it('Should click on "+" icon in the "Available" section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsGroupings.xpathNewButton).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "New/Reference" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('New/Reference').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "Groupings" dialog is displayed', function() {
      ThiefHelpers.isDialogOpen('Groupings').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Groupings" dialog did not display');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Reference" radio button in "Groupings" window', function() {
      ThiefHelpers.getRadioClassReference('Reference').select();

      // Verifying if the "Reference" radio button is selected
      ThiefHelpers.getRadioClassReference('Reference').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Reference" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Formula" tab from the "Groupings" window', function() {
      CreateEditCustomGroupings.getTab('Formula').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Formula" tab is selected
      Utilities.isElementSelected(CreateEditCustomGroupings.getTab('Formula')).then(function(bool) {
        if (!bool) {
          expect(false).customError('"Formula" tab is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Col 5: Bench. Ending Weight" under "Formula" Tab', function() {
      ThiefHelpers.getVirtualListboxClassReference().getItemByText('Col 5: Bench. Ending Weight').select();
    });

    it('Should Click on Add button', function() {
      CreateEditCustomGroupings.getButtonFromFormulaTab('Add').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should enter "Reference Bench" into the "Name" field', function() {
      CreateEditCustomGroupings.getNameField().sendKeys('Reference Bench').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Reference Bench" is entered into the Name Field
      CreateEditCustomGroupings.getNameField().getAttribute('value').then(function(text) {
        if (text !== 'Reference Bench') {
          expect(false).customError('"Reference Bench" did not get entered into the "Name" Field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save" button to save the settings', function() {
      CreateEditCustomGroupings.getButton('Save').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var value;

    it('Recording value for later verification', function() {
      browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
        '.grid.getCellNode( arguments[0], arguments[1] )', 1, 0).then(function(reference) {
        reference.getText().then(function(num) {
          value = num;
        });
      });
    });

    it('Should right click on cell with value "0.000000" and select "Exclusions" and select "Exclude Selected Rows"', function() {
      PA3MainPage.rightClickAndSelectOption(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights',
        1, value), 'Exclusions|Exclude Selected Rows');
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);
    });

    it('Verifying if the grouping "0.000000" is not displayed in the report', function() {
      PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, value).isPresent()
        .then(function(found) {
          if (found) {
            expect(false).customError('"' + value + '" grouping displays in "Weights" report');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if the "Excluded: 0.000000" hyperlink is seen in the report', function() {
      PA3MainPage.getExclusionsHyperLink('Weights').getText().then(function(text) {
        if (text !== 'Excluded: ' + value + '') {
          expect(false).customError('"Excluded: ' + value + '" hyperlink did not display in the report; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 704224', function() {

    it('Should click on the folder icon on app toolbar', function() {
      PA3MainPage.getFolderDropDown().click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking:' + err);
      });
    });

    it('Should select "New" from list', function() {
      PA3MainPage.getOptionFromFolderMenu('New').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking:' + err);
      });
    });

    it('Verifying if "Document has changed" pop up is appeared on the screen and click on "Don\'t Save Changes" button', function() {
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(found) {
        if (found) {
          PA3MainPage.getButton('Don\'t Save Changes').click().then(function() {
          }, function(error) {

            CommonFunctions.takeScreenShot();
            expect(false).customError(error);
          });

          // Verifying that error pop-up is disappeared
          PA3MainPage.getDialog('Document has changed').isPresent().then(function(found) {
            if (found) {
              expect(false).customError('"Document has changed" dialog is not disappeared');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });

    it('Should enter "Client:/pa3/accounts/FIXED_INCOME_ACCT.ACCT" in "Portfolio" widget and hit Enter key.', function() {
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).setText('Client:/pa3/accounts/FIXED_INCOME_ACCT.ACCT', protractor.Key.ENTER);

      // Verifying that "Client:/pa3/accounts/FIXED_INCOME_ACCT.ACCT" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).getText().then(function(text) {
        if (text !== 'CLIENT:/PA3/ACCOUNTS/FIXED_INCOME_ACCT.ACCT') {
          expect(false).customError('"CLIENT:/PA3/ACCOUNTS/FIXED_INCOME_ACCT.ACCT" is not entered in ' +
            '"Portfolio" widget.Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);

      // Closing Qa info box as it hides chart icon in the report
      PA3MainPage.closeQAInfoBox();
    });

    it('Verifying if the "Weights" report is generated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('"Weights" report did not get generated');
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

    it('Verifying if grouping name is "Credit Rating"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(text) {
        if (text !== 'Credit Rating') {
          expect(false).customError('Grouping name is not "Credit Rating"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Credit Rating');

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

    it('Should type "Sector" into the "Search" field of "Available" section', function() {
      TileOptionsGroupings.getAvailableSectionSearchBox().sendKeys('Sector').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that 'Sector' is entered into the Search field
      TileOptionsGroupings.getAvailableSectionSearchBox().getAttribute('value').then(function(name) {
        if (name !== 'Sector') {
          expect(false).customError('Expected: "Sector" to be entered into the Search field but' +
            ' Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var groupings = ['Sector-Main', 'Sector', 'Sector Subgroup'];
    groupings.forEach(function(groupingName) {
      it('Select "' + groupingName + '" from "FactSet > Sector & Industry > FactSet - Fixed Income" in "Available" section', function() {
        var reference = TileOptionsGroupings.getElementFromAvailableSection('FactSet|Sector & Industry|FactSet - Fixed Income', groupingName);
        browser.actions().doubleClick(reference).perform();
      });
    });

    groupings.forEach(function(groupingName) {
      it('Verifying that "' + groupingName + ' - Fixed Income" is added to the "Selected" section', function() {
        TileOptionsGroupings.getElementFromSelectedContainer(groupingName + ' - FactSet - Fixed Income').isPresent().then(function(added) {
          if (!added) {
            expect(false).customError('"' + groupingName + ' - FactSet - Fixed Income" is not added to the "Selected" section.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 704225', function() {

    // Clicking on Exclusions LHP item to select.
    it('Should click on Exclusions LHP item to select', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Exclusions').select();

      // Verifying if "Exclusions" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Exclusions" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000))
        .toBeTruthy();
    });

    // Click on the "Edit Grouping" button next to Available section
    CommonPageObjectsForPA3.clickOnEditGroupingButtonAndVerify();

    it('Should click on "Clear All/X" button to clear groupings in selected section of "Edit Groupings" dialog', function() {
      ThiefHelpers.getTransferBoxReference(TileOptionsExclusionsEditGroupings.xpathOfDialogTransferBox).target.clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should enter "Class4" into the search field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available', TileOptionsExclusionsEditGroupings.xpathAvailableSectionSearchBox).setText('Class4');

      // Verifying that "Class4" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available', TileOptionsExclusionsEditGroupings.xpathAvailableSectionSearchBox).getText().then(function(text) {
        if (text !== 'Class4') {
          expect(false).customError('"Class4" is not present in search field of "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the Search Result to appear
      browser.sleep(4000);
    });

    it('Double click on "Bloomberg Barclays" from "FactSet|Sector & Industry|Bloomberg Barclays"', function() {
      ThiefHelpers.getListboxGroup(xpathOfAvailableSectionListbox, 'FactSet|Sector & Industry|Bloomberg Barclays|Bloomberg Barclays').then(function(eleRef) {
        browser.actions().doubleClick(eleRef).perform();
      });
    });

    it('Verifying if "Class4 - Bloomberg Barclays" item is added to selected section', function() {
      ThiefHelpers.getListBoxItem(xpathOfSelectedContainerlistbox, 'Class4 - Bloomberg Barclays').getText().then(function(name) {
        if (name !== 'Class4 - Bloomberg Barclays') {
          expect(false).customError('"Class4 - Bloomberg Barclays" is not present in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "Save" button of "Edit Grouping" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Edit Groupings');

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsHidden.xpathDataSpinner)), 60000))
        .toBeTruthy();
    });

    var arrExclusions = ['Auto', 'Banking'];
    arrExclusions.forEach(function(exclusion) {
      it('Should perform double click on "' + exclusion + '" from available section', function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getGroupByText(exclusion);
        group.select();

        group.doubleClick();
      });

      it('Verifying if the element "' + exclusion + '" is moved to "Selected" section', function() {
        var arrEle = [];
        ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Class4').getChildrenText().then(function(elements) {
          elements.forEach(function(ele) {
            arrEle.push(ele.text);
          });
        }).then(function() {
          if (arrEle.indexOf(exclusion) < 0) {
            expect(false).customError('"' + exclusion + '" is not added to "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    // Verify if the report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should right click on "ABS" and select "Expand > All" option', function() {
      var eleRef = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'ABS');

      PA3MainPage.rightClickAndSelectOption(eleRef, 'Expand|All');

      // Waiting for loading spinner in the grid to disappear
      Utilities.waitUntilElementDisappears(element(by.xpath(
        SlickGridFunctions.xpathSlickGridLoadingSpinner)), 80000);
    });

    it('Verifying if "ABS" grouping is expanded and is displayed as "ABS|ABS - Other|AUTOLEASE ABS" in the report', function() {
      var group1Found = false;
      var group2Found = false;
      var childeElement = false;
      var parentID;
      var parentID2;
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(rowRef, index) {
          if (rowRef[0] === 'ABS' && rowRef.metadata.type === 'group') {
            SlickGridFunctions.scrollRowToTop('Weights', index);
            group1Found = true;
            parentID = rowRef.id;
            if (rowRef.expanded) {
              dataView.forEach(function(element) {
                if (parentID === element.parentId && element[0] === 'ABS-Other') {
                  group2Found = true;
                  parentID2 = element.id;
                  dataView.forEach(function(element1) {
                    if (parentID2 === element1.parentId && element1[0] === 'AUTOLEASE ABS') {
                      childeElement = true;
                    }
                  });
                }
              });
            } else {
              expect(false).customError('"ABS" grouping is present in the report but it is not expanded by default');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      }).then(function() {
        if (group1Found === false) {
          expect(false).customError('No group found with "ABS" at Level 1');
          CommonFunctions.takeScreenShot();
        } else if (group2Found === false) {
          expect(false).customError('No group found with "ABS - Other" under "ABS" grouping');
          CommonFunctions.takeScreenShot();
        } else if (group2Found === false) {
          expect(false).customError('No group found with "AUTOLEASE ABS" under "ABS|ABS - Other" grouping');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 728097', function() {

    it('Should click on "Benchmark hamburger icon" from the application toolbar', function() {
      PA3MainPage.getHamburgerIcon('Benchmark').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the drop down is opened', function() {
      // Verifying if Benchmark Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Drop down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "X" icon next to each list item in Benchmark widget drop down', function() {
      PA3MainPage.getListFromAccountDropdown('Benchmark', true).then(function(arrListItems) {
        arrListItems.forEach(function(item) {
          item.getText().then(function(text) {
            // Hover on list item to get the x icon in visible state
            browser.actions().mouseMove(PA3MainPage.getSingleAccountFromList('Benchmark', text)).perform();

            PA3MainPage.getAccountDeleteButton('Benchmark', text).click().then(function() {
            }, function(error) {
              expect(false).customError('Unable to click on "X" icon next to "' + item + '" in ' + 'Benchmark widget drop down. Error found: ' + error);
              CommonFunctions.takeScreenShot();
            });
          });
        });
      });
    });

    it('Verifying if all list items are removed from Benchmark widget drop down', function() {
      PA3MainPage.getListFromAccountDropdown('Benchmark').count().then(function(count) {
        if (count !== 0) {
          expect(false).customError('List items are still present in the Benchmark drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Groupings');

    it('Should click on "Clear All/X" button to clear groupings in selected section of "Edit Groupings" dialog', function() {
      ThiefHelpers.getTransferBoxReference(TileOptionsGroupings.xpathOfTransferBox).target.clear();
    });

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    it('Should enter "Client:/pa3/exclusions/EXCLUSIONS_PORT1.ACCT" in "Portfolio" widget and hit Enter key.', function() {
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).setText('Client:/pa3/exclusions/EXCLUSIONS_PORT1.ACCT', protractor.Key.ENTER);

      // Verifying that "CLIENT:/PA3/EXCLUSIONS/EXCLUSIONS_PORT1.ACCT" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).getText().then(function(text) {
        if (text !== 'CLIENT:/PA3/EXCLUSIONS/EXCLUSIONS_PORT1.ACCT') {
          expect(false).customError('"CLIENT:/PA3/EXCLUSIONS/EXCLUSIONS_PORT1.ACCT" is not entered in ' + '"Portfolio" widget.Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Exclusions');

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000)).toBeTruthy();
    });

    it('Verify if "Benchmark must be populated" text is seen in available section', function() {
      element(by.xpath(TileOptionsExclusions.xpathAvailableSection + '//*[contains(text(),"Benchmark must be populated")]')).isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('The text "Benchmark must be populated" is not seen in Available section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "Exclude Benchmark" check box', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsExclusions.getCheckbox('Exclude Benchmark')).check();
    });

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000)).toBeTruthy();
    });

    var arrElements = ['Alphabet Inc. Class A', 'Apple Inc.', 'International Business Machines Corporation', 'Visa Inc. Class A'];
    var takeScreenShot = 0;
    it('Verifying if ' + arrElements + ' is present in "Available" container', function() {
      var arrEle = [];
      ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getChildrenText().then(function(elements) {
        elements.forEach(function(ele) {
          arrEle.push(ele.text);
        });
        if (arrEle.length !== 4) {
          expect(false).customError('The count of elements is not 4. Found ' + arrEle.length);
          CommonFunctions.takeScreenShot();
        }
      }).then(function() {
        arrElements.forEach(function(item) {
          if (arrEle.indexOf(item) < 0) {
            expect(false).customError('"' + item + '" is not found in "Available" section. Found ' + item);
            takeScreenShot = takeScreenShot + 1;
            if (takeScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 728246', function() {

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Weights');

    it('Should enter "Client:/pa3/exclusions/EXCLUSIONS_PORT2.ACCT" in "Benchmark" widget and hit Enter key.', function() {
      ThiefHelpers.getTextBoxClassReference('Benchmark', PA3MainPage.xpathBenchmarkWidget).setText('Client:/pa3/exclusions/EXCLUSIONS_PORT2.ACCT', protractor.Key.ENTER);

      // Verifying that "CLIENT:/PA3/EXCLUSIONS/EXCLUSIONS_PORT2.ACCT" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathBenchmarkWidget).getText().then(function(text) {
        if (text !== 'CLIENT:/PA3/EXCLUSIONS/EXCLUSIONS_PORT2.ACCT') {
          expect(false).customError('"CLIENT:/PA3/EXCLUSIONS/EXCLUSIONS_PORT2.ACCT" is not entered in ' + '"Benchmark" widget.Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Exclusions');

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000)).toBeTruthy();
    });

    var arrElements = ['Alphabet Inc. Class A', 'Apple Inc.', 'FactSet Research Systems Inc.',
      'International Business Machines Corporation', 'Microsoft Corporation', 'Visa Inc. Class A',];
    var takeScreenShot = 0;
    it('Verifying if ' + arrElements + ' are present in "Available" section', function() {
      var arrEle = [];
      ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getChildrenText().then(function(elements) {
        elements.forEach(function(ele) {
          arrEle.push(ele.text);
        });
        if (arrEle.length !== 6) {
          expect(false).customError('The count of elements is not 6. Found ' + arrEle.length);
          CommonFunctions.takeScreenShot();
        }
      }).then(function() {
        arrElements.forEach(function(item) {
          if (arrEle.indexOf(item) < 0) {
            expect(false).customError('"' + item + '" is not found in "Available" section. Found ' + item);
            takeScreenShot = takeScreenShot + 1;
            if (takeScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 727380', function() {

    it('Should check "Exclude Benchmark" check box', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsExclusions.getCheckbox('Exclude Benchmark')).check();
    });

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000)).toBeTruthy();
    });

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000)).toBeTruthy();
    });

    var arrElements = ['Alphabet Inc. Class A', 'Apple Inc.', 'International Business Machines Corporation', 'Visa Inc. Class A'];
    var takeScreenShot = 0;
    it('Verifying ' + arrElements + ' are present in "Available" container', function() {
      var arrEle = [];
      ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getChildrenText().then(function(elements) {
        elements.forEach(function(ele) {
          arrEle.push(ele.text);
        });
        if (arrEle.length !== 4) {
          expect(false).customError('The count of elements is not 4. Found ' + arrEle.length);
          CommonFunctions.takeScreenShot();
        }
      }).then(function() {
        arrElements.forEach(function(item) {
          if (arrEle.indexOf(item) < 0) {
            expect(false).customError('"' + item + '" is not found in "Available" section. Found' + item);
            takeScreenShot = takeScreenShot + 1;
            if (takeScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

  });

});
