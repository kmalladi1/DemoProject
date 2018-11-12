'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: groupings-help', function() {

  var xpathOfFormulaTextArea = element(by.xpath(CreateEditCustomGroupings.xpathOfFormulaTextArea));

  // Verifying the data in the tab( to verify before and after)
  var data1 = function() {

    var arrTabNames = ['Description', 'Formula'];

    it('Verifying if 2 tabs is displayed', function() {
      CommonPageObjectsForPA3.verifyIfExpectedTabsAreDisplayed(2, arrTabNames);
    });

    it('Verify if "Description" tab is selected by default', function() {
      ThiefHelpers.getTabsClassReference().getSelectedTabText().getText().then(function(tabName) {
        if (tabName !== 'Description') {
          expect(false).customError('"Description" tab is not selected by default. Found:"' + tabName + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // verify the style of title and content
    CommonPageObjectsForPA3.verifyIfTitleIsBoldAndExpectedContent('Price to Book', 'Groups by price to book ratio. To modify the bins, click the Definitions button.');
  };

  // Verifying the data in the tab( to verify before and after)
  var data2 = function() {

    it('verify if only "Formula" tab is displayed', function() {
      CommonPageObjectsForPA3.verifyIfExpectedTabsAreDisplayed(1, undefined, 'Formula');
    });

    // verify the style of title and content
    CommonPageObjectsForPA3.verifyIfTitleIsBoldAndExpectedContent('Grpg help', 'P_PRICE');
  };

  // Verifying the data in the tab( to verify before and after)
  var data3 = function() {

    it('verify if only "Formula" tab is displayed', function() {
      CommonPageObjectsForPA3.verifyIfExpectedTabsAreDisplayed(1, undefined, 'Formula');
    });

    // verify the style of title and content
    CommonPageObjectsForPA3.verifyIfTitleIsBoldAndExpectedContent('Ref help', 'COL3');

  };

  describe('Test Step ID: 688676', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:pa3;grouping;grouping-help"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('grouping-help');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Right click on the "Commercial Services" and select "Expand All" from the menu in the "Attribution" report', function() {
      var elementReference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services');

      // Right click on "Commercial Services" and select "Expand All" from the menu
      PA3MainPage.rightClickAndSelectOption(elementReference, 'Grouping Help...');

      // Wait for securities to load in report
      browser.sleep(2000);
    });

    var arrTabNames = ['Description', 'Formula'];

    it('Verifying if 2 tabs are displayed', function() {
      CommonPageObjectsForPA3.verifyIfExpectedTabsAreDisplayed(2, arrTabNames);
    });

    it('Verify if "Description" tab is selected by default', function() {
      ThiefHelpers.getTabsClassReference().getSelectedTabText().getText().then(function(tabName) {
        if (tabName !== 'Description') {
          expect(false).customError('"Description" tab is not selected by default. Found:"' + tabName + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // verify the style of title and content
    CommonPageObjectsForPA3.verifyIfTitleIsBoldAndExpectedContent('Economic Sector', 'Groups by economic sector. To modify the definition, click the Definitions button.\nTo replicate official groups where available, ' +
      'click the Definitions button and select "Daily" from the Frequency drop-down menu.');

  });

  describe('Test Step ID: 688682', function() {

    it('Should select "Formula" tab', function() {
      ThiefHelpers.getTabsClassReference().selectTabByText('Formula');
    });

    // verify the style of title and content
    CommonPageObjectsForPA3.verifyIfTitleIsBoldAndExpectedContent('Economic Sector', 'FS_NEW');

  });

  describe('Test Step ID: 735911', function() {

    // Click on the close button in "Groupings Help" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Close', 'Grouping Help');

    // Click on "Economic Sector Hyperlink" and verify if Groupings is selected by default in tile options
    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    it('Should type "Price" into the "Search" field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsGroupings.xpathAvailableSearchBox).setText('Price');

      // Verifying that "Price" is typed into the search box
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsGroupings.xpathAvailableSearchBox).getText().then(function(text) {
        if (text !== 'Price') {
          expect(false).customError('Expected: "Price" but Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for search to happen
      browser.sleep(4000);
    });

    it('Should hover over on "Price to Book" under "FactSet|Equity" directory', function() {
      browser.actions().mouseMove(TileOptionsGroupings.getElementFromAvailableSection('FactSet|Equity', 'Price to Book')).perform();
    });

    it('Should click on i icon in "Price to Book"', function() {
      TileOptionsGroupings.getIconFromList('icon', 'Available', 'Price to Book', 'FactSet|Equity').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verify if data is displayed as expected
    data1();

    it('Double click on "Price to Book" from "FactSet|Equity" directory', function() {
      TileOptionsGroupings.getElementFromAvailableSection('FactSet|Equity', 'Price to Book').isPresent().then(function(option) {
        if (option) {
          browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('FactSet|Equity', 'Price to Book')).perform();
        } else {
          expect(false).customError('"Price to Book" is not present under "FactSet|Equity" directory');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('verifying if "Price to Book" is present in the selected section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Price to Book').getText().then(function(name) {
        if (name !== 'Price to Book') {
          expect(false).customError('"Price to Book" is not present in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 688691', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Click on "Economic Sector Hyperlink" and verify if Groupings is selected by default in tile options
    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    // Click on the "+" icon next to available section and select the option from the drop-down
    CommonPageObjectsForPA3.clickOnAddButtonAndSelectOptionFromDropdown('New/Reference', 'Groupings');

    it('Verifying if the "New" radio button is selected', function() {
      ThiefHelpers.getRadioClassReference('New').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"New" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Enter formula in to the formula section and  click outside
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_PRICE', undefined, undefined, 'Click Outside', 'P_PRICE');

    it('Should select "Personal" under directory', function() {
      ThiefHelpers.getRadioClassReference('Personal').select();

      // Verfying if "Personal" is selected under "Directory"
      ThiefHelpers.getRadioClassReference('Personal').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Personal" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Sub-directory:" drop down is set to "Personal"', function() {
      ThiefHelpers.verifySelectedDropDownText('Personal', 'Sub-directory:');
    });

    it('Type "Grpg help" into the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Grpg help');

      // Verifying that "Grpg help" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Grpg help') {
          expect(false).customError('"Grpg help" is not present in the "Name" field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "Save" button of "Groupings" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Groupings');

    it('Should expand "Personal" in "Available" section', function() {
      ThiefHelpers.expandGroup(TileOptionsGroupings.xpathOfAvailableContainer, 'Personal');
    });

    it('Should hover over on "Grpg help" under "Personal" directory', function() {
      browser.actions().mouseMove(TileOptionsGroupings.getElementFromAvailableSection('Personal', 'Grpg help')).perform();
    });

    it('Should click on i icon in "Grpg help"', function() {
      TileOptionsGroupings.getIconFromList('icon', 'Available', 'Grpg help', 'Personal').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verify if data is displayed as expected
    data2();

  });

  describe('Test Step ID: 688692', function() {

    it('Double click on "Grpg help" from "Personal" directory', function() {
      TileOptionsGroupings.getElementFromAvailableSection('Personal', 'Grpg help').isPresent().then(function(option) {
        if (option) {
          browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('Personal', 'Grpg help')).perform();
        } else {
          expect(false).customError('"Grpg help" is not present in "Personal" directory');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('verifying if "Grpg help" is present in the selected section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Grpg help').getText().then(function(name) {
        if (name !== 'Grpg help') {
          expect(false).customError('"Grpg help" is not present in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "+" icon next to available section and select the option from the drop-down
    CommonPageObjectsForPA3.clickOnAddButtonAndSelectOptionFromDropdown('New/Reference', 'Groupings');

    it('Select the "Reference" radio button', function() {
      ThiefHelpers.getRadioClassReference('Reference', undefined).select();

      // Verifying that "Reference" radio button is selected
      ThiefHelpers.getRadioClassReference('Reference', undefined).isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('The "Reference" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Double click on "Col 3: Port. Ending Weight" from the "Formula" tab', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getItemByText('Col 3: Port. Ending Weight').doubleClick();
    });

    // Verify if text is present in the formula section after selection option from type-ahead
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'COL3', true);

    it('Type "Ref help" into the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Ref help');

      // Verifying that "Ref help" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Ref help') {
          expect(false).customError('"Ref help" is not present in the "Name" field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "Save" button of "Groupings" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Groupings');

    it('Should expand "Document" in "Available" section', function() {
      ThiefHelpers.expandGroup(TileOptionsGroupings.xpathOfAvailableContainer, 'Document');
    });

    it('Should hover over on "Ref help" under "Document" directory', function() {
      browser.actions().mouseMove(TileOptionsGroupings.getElementFromAvailableSection('Document', 'Ref help')).perform();
    });

    it('Should click on i icon in "Ref help"', function() {
      TileOptionsGroupings.getIconFromList('icon', 'Available', 'Ref help', 'Document').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verify if data is displayed as expected
    data3();

    it('verifying if "Ref help" is present in the selected section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Ref help').getText().then(function(name) {
        if (name !== 'Ref help') {
          expect(false).customError('"Ref help" is not present in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 688693', function() {

    it('Should hover over on "Ref help" under "Document" directory', function() {
      browser.actions().mouseMove(TileOptionsGroupings.getElementFromSelectedContainer('Ref help')).perform();
    });

    it('Should click on i icon in "Ref help"', function() {
      TileOptionsGroupings.getIconFromList('icon', 'Selected', 'Ref help').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verify if data is displayed as expected
    data3();
  });

  describe('Test Step ID: 688694', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should expand "Commercial Services" group in the report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Commercial Services|Advertising/Marketing Services');

      //Checking if required tree is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Commercial Services|Advertising/Marketing Services');
    });

    // RPD:34232231 Known issue "P/B Quintile 1:"
    it('Verify if known issue is resolved and P/B Quintile 1 is displayed in the report', function() {
      SlickGridFunctions.getElementsFromTree('Weights', '', 'Commercial Services|Advertising/Marketing Services').then(function(arr) {
        arr.forEach(function(columnName) {
          if (columnName.indexOf('P/B Quintile 1') > -1) {
            expect(false).customError('P/B Quintile 1 is displayed in the report. Known issue RPD:34232231');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 688695', function() {

    // RPD:34232231 Known issue "P/B Quintile 1:"
    // Click on close button

    // Click on "Economic Sector Hyperlink" and verify if Groupings is selected by default in tile options
    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    it('Should expand "Personal" from Available section hover over "Grpg help" click on the "Remove" icon', function() {
      ThiefHelpers.expandGroup(TileOptionsGroupings.xpathOfAvailableContainer, 'Personal');
    });

    it('Hover over "Test" from "Personal" and click on the "Remove" icon', function() {
      TileOptionsGroupings.getIconFromList('Remove', 'Available', 'Grpg help', 'Personal').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verify if dialog appears with expected text and title and click on OK button
    CommonPageObjectsForPA3.verifyAndClickOnOkButtonOfConfirmationDialog('Delete Grouping', 'Are you sure you want to delete this grouping?');

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'TileOptions-Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

  });
});
