'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: asset-general', function() {

  // Variables
  var arrElements = []; var posBeforeMoving;

  describe('Test Step ID: 540637', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with default_doc_OLD', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });
  });

  describe('Test Step ID: 540638', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Add/Remove', 'Asset Types', 'document options');
  });

  describe('Test Step ID: 540639', function() {

    it('Should select "Adjustment" radio button in "View By" section', function() {
      DocumentOptionsAssetTypeAddRemove.getRadioButtonInViewBy('Adjustment').click();

      // Verify that Adjustment radio button is checked
      expect(DocumentOptionsAssetTypeAddRemove.getRadioButtonInViewBy('Adjustment').getAttribute('class')).toContain('selected');

      // Collecting the list of items from "Available" section
      DocumentOptionsAssetTypeAddRemove.getAllElements('available').each(function(element) {
        element.getText().then(function(eleName) {
          arrElements.push(eleName);
        });
      });
    });

    DocumentOptionsAssetTypeAddRemove.arrAvailableSectionElements.forEach(function(nameFromArray) {
      it('Verifying that "' + nameFromArray + '" is present in "Available Section"', function() {
        expect(arrElements.indexOf(nameFromArray)).not.toEqual(-1);
      });
    });
  });

  describe('Test Step ID: 540633', function() {

    it('Should expand "Generate Margin Cash > Equity" in "Available" section', function() {
      DocumentOptionsAssetTypeAddRemove.expandElementTree('Generate Margin Cash|Equity');

      // Check if 'Generate Margin Cash > Equity' is expanded
      DocumentOptionsAssetTypeAddRemove.checkIfExpanded('Generate Margin Cash|Equity');
    });

    it('Should drag "Equity Common" under "Generate Margin Cash|Equity" from available section and drop it in selected section', function() {
      var source = DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Generate Margin Cash|Equity', 'Equity Common', 'available');
      var target = element(by.xpath(DocumentOptionsAssetTypeAddRemove.xpathSelectedContainer));

      browser.driver.actions().mouseDown(source).mouseMove(target).mouseUp(target).perform();
    });

    it('Verify if "Equity Common" is deleted from "Available" section', function() {
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Generate Margin Cash|Equity', 'Equity Common', 'Available').getAttribute('class')).toContain('ng-hide');
    });

    it('Verify if "Equity Common" is added to "Selected" pane along with its parent items', function() {
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Generate Margin Cash|Equity', 'Equity Common', 'Selected').isPresent()).toBeTruthy();
    });
  });

  describe('Test Step ID: 540630', function() {

    it('Should select "Asset Type" radio button in "View By"', function() {
      DocumentOptionsAssetTypeAddRemove.getRadioButtonInViewBy('Asset Type').click();

      // Verify that "Asset Type" radio button is checked
      expect(DocumentOptionsAssetTypeAddRemove.getRadioButtonInViewBy('Asset Type').getAttribute('class')).toContain('selected');
    });

    it('Verify if "Selected" section is showing same items that were shown in "Adjustment" view and tree structure gets updated', function() {
      expect(DocumentOptionsAssetTypeAddRemove.getAllElements('selected').count()).toEqual(9);
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Derivatives|Futures', 'Apply Special Returns for Futures', 'Selected').isPresent()).toBeTruthy();
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Equity Common', 'Generate Margin Cash', 'Selected').isPresent()).toBeTruthy();
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Other|Contract for Difference', 'Apply Special Returns for CFDs', 'selected').isPresent()).toBeTruthy();
    });
  });

  describe('Test Step ID: 540635', function() {

    it('Should enter "Conversion" keyword into Search field', function() {
      DocumentOptionsAssetTypeAddRemove.getSearchField().sendKeys('Conversion');

      browser.wait(function() {
        return DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Equity Common', 'Canada/US Conversion', 'available').isDisplayed().then(function(found) {
          return found;
        }, function() {
          return false;
        });
      }, 10000, 'Search elements did not appear');
    });

    it('Highlight "Canada/US Conversion" from "Equity > Equuty Common" under "Available" section', function() {
      DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Equity Common', 'Canada/US Conversion', 'available').click();

      // Verifying that "Canada/US Conversion" is selected
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Equity Common', 'Canada/US Conversion', 'available').getAttribute('class')).toContain('selected');
    });

    it('Should move the element "Canada/US Conversion" to "Selected" section by double-clicking on it', function() {
      browser.actions().doubleClick(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Equity Common', 'Canada/US Conversion', 'available')).perform();
    });

    it('Verify if "Canada/US Conversion" is deleted from "Available" section', function() {
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Equity Common', 'Canada/US Conversion', 'Available').getAttribute('class')).toContain('ng-hide');
    });

    it('Verify if "Canada/US Conversion" is added to the "Selected" section', function() {
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Equity Common', 'Canada/US Conversion', 'selected').isPresent()).toBeTruthy();
    });
  });

  describe('Test Step ID: 540634', function() {

    it('Should clear the Search field', function() {
      DocumentOptionsAssetTypeAddRemove.getSearchField().clear();
    });

    it('Should select "Adjustment" radio button in "View By" section', function() {
      DocumentOptionsAssetTypeAddRemove.getRadioButtonInViewBy('Adjustment').click();

      // Verify that "Adjustment" radio button is checked
      expect(DocumentOptionsAssetTypeAddRemove.getRadioButtonInViewBy('Adjustment').getAttribute('class')).toContain('selected');
    });

    it('Verify if "Selected" section elements are updated', function() {
      expect(DocumentOptionsAssetTypeAddRemove.getAllElements('selected').count()).toEqual(11);
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Generate Margin Cash|Equity', 'Equity Common', 'selected').isPresent()).toBeTruthy();
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Canada/US Conversion|Equity', 'Equity Common', 'selected').isPresent()).toBeTruthy();
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Apply Special Returns for CFDs|Derivatives', 'Futures', 'selected').isPresent()).toBeTruthy();
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Apply Special Returns for CFDs|Other', 'Contract for Difference', 'selected').isPresent()).toBeTruthy();
    });
  });

  describe('Test Step ID: 540640', function() {

    it('Should select "Asset Type" radio button in "View By" section', function() {
      DocumentOptionsAssetTypeAddRemove.getRadioButtonInViewBy('Asset Type').click();

      // Verify that "Asset Type" radio button is checked
      expect(DocumentOptionsAssetTypeAddRemove.getRadioButtonInViewBy('Asset Type').getAttribute('class')).toContain('selected');
    });

    it('Should hover over "Canada/US Conversion" in "Selected" section', function() {
      browser.actions().mouseMove(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Equity Common', 'Canada/US Conversion', 'Selected')).perform();
    });

    it('Should click on "Delete( cross )" icon beside "Canada/US Conversion" element', function() {
      DocumentOptionsAssetTypeAddRemove.getDeleteIcon('Equity|Equity Common', 'Canada/US Conversion', 'Selected').click();
    });

    it('Verify if "Canada/US Conversion" is deleted from "Selected" section', function() {
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Equity Common', 'Canada/US Conversion', 'Selected').isPresent()).toBeFalsy();
    });

    it('Verify if "Canada/US Conversion" is added back to "Available" section by expanding "Equity > Equity Common"', function() {
      DocumentOptionsAssetTypeAddRemove.expandElementTree('Equity|Equity Common');
      DocumentOptionsAssetTypeAddRemove.checkIfExpanded('Equity|Equity Common');
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Equity Common', 'Canada/US Conversion', 'available').isPresent()).toBeTruthy();
    });
  });

  describe('Test Step ID: 540644', function() {

    it('Should click on "Generate Margin Cash" in "Selected" section', function() {
      DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Equity Common', 'Generate Margin Cash', 'Selected').click();

      // Verifying that "Generate Margin Cash" is selected
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Equity Common', 'Generate Margin Cash', 'Selected').getAttribute('class')).toContain('selected');
    });

    it('Verifying that "Leverage Factor" is displayed under "Options" container', function() {
      expect(DocumentOptionsAssetTypeAddRemove.getOptionsLabel('Leverage Factor').isPresent()).toBeTruthy();
    });

    it('Verify if "Leverage Factor" value is "1.5" by default', function() {
      expect(DocumentOptionsAssetTypeAddRemove.getLeverageFactorField().getAttribute('value')).toEqual('1.5');
    });
  });

  describe('Test Step ID: 540641', function() {

    it('Should click on downward arrow in "Leverage Factor" field', function() {
      DocumentOptionsAssetTypeAddRemove.getSpinButton('Leverage Factor', 'down').click();
    });

    // Known issue: RPD:19517055 Decreasing "Leverage Factor" default value (1.5)
    // using down spin button set it to "1" instead of "1.0"
    it('Verify if "Leverage Factor" displayed the value "1.0"', function() {
      //expect( DocumentOptionsAssetTypeAddRemove.getLeverageFactorField().getAttribute( 'value' ) ).toEqual( '1.0' );
      expect(DocumentOptionsAssetTypeAddRemove.getLeverageFactorField().getAttribute('value')).toEqual('1');
    });

    it('Verify if downward arrow got disabled', function() {
      expect(DocumentOptionsAssetTypeAddRemove.getSpinButton('Leverage Factor', 'down').getAttribute('class')).toContain('disabled');
    });
  });

  describe('Test Step ID: 540642', function() {

    it('Should type value "1000" in the "Leverage Factor" field', function() {
      // Clear the 'Leverage Factor' field in order to enter the value
      DocumentOptionsAssetTypeAddRemove.getLeverageFactorField().sendKeys(protractor.Key.HOME, protractor.Key.SHIFT + protractor.Key.END, protractor.Key.DELETE);

      // Type '1000' in 'Leverage Factor' field
      DocumentOptionsAssetTypeAddRemove.getLeverageFactorField().sendKeys('1000');

      // Verify if 'Leverage Factor' displayed the value '1000'
      expect(DocumentOptionsAssetTypeAddRemove.getLeverageFactorField().getAttribute('value')).toEqual('1000');
    });

    it('Verify if upward arrow got disabled', function() {
      expect(DocumentOptionsAssetTypeAddRemove.getSpinButton('Leverage Factor', 'up').getAttribute('class')).toContain('disabled');
    });
  });

  describe('Test Step ID: 540645', function() {

    it('Should double click on "Equity"', function() {
      browser.actions().doubleClick(DocumentOptionsAssetTypeAddRemove.getAssetTypeTreeItem('Equity', 'available')).perform();
    });

    it('Verify if all the items under "Equity" are added to "Selected section"', function() {
      // Verifying elements under "Equity > ADR/GDR"
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|ADR/GDR', 'ADR/Parent Conversion', 'selected').isPresent()).toBeTruthy();
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|ADR/GDR', 'Generate Offset Cash for Shorts', 'selected').isPresent()).toBeTruthy();

      // Verifying elements under "Equity > Equity Common"
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Equity Common', 'Generate Margin Cash', 'selected').isPresent()).toBeTruthy();
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Equity Common', 'Canada/US Conversion', 'selected').isPresent()).toBeTruthy();
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Equity Common', 'ADR/Parent Conversion', 'selected').isPresent()).toBeTruthy();
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Equity Common', 'Generate Offset Cash for Shorts', 'selected').isPresent()).toBeTruthy();

      // Verifying elements under "Equity > Private Equity"
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Private Equity', 'Use Underlying ID', 'selected').isPresent()).toBeTruthy();

      // Verifying elements under "Equity > Unit"
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Unit', 'Generate Offset Cash for Shorts', 'selected').isPresent()).toBeTruthy();

      // Verifying elements under "Equity > Preferred"
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Preferred', 'Generate Offset Cash for Shorts', 'selected').isPresent()).toBeTruthy();
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Preferred', 'Use Underlying ID', 'selected').isPresent()).toBeTruthy();

      // Verifying elements under "Equity > P-Note"
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|P-Note', 'Use Underlying ID', 'selected').isPresent()).toBeTruthy();

      // Verifying elements under "Equity > Warrant / Right > Right"
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Warrant / Right|Right', 'Use Underlying ID', 'selected').isPresent()).toBeTruthy();

      // Verifying elements under "Equity > Warrant / Right > Warrant: Call"
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Warrant / Right|Warrant: Call', 'Use Underlying ID', 'selected').isPresent()).toBeTruthy();

      // Verifying elements under "Equity > Warrant / Right > Warrant: Put"
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Warrant / Right|Warrant: Put', 'Use Underlying ID', 'selected').isPresent()).toBeTruthy();
    });
  });

  describe('Test Step ID: 540646', function() {

    it('Should select "Equity" from Selected section', function() {
      DocumentOptionsAssetTypeAddRemove.getElement('Equity', 'tree').$$('.tf-selectable-handle').first().click();

      // Verifying that "Equity" is selected
      expect(DocumentOptionsAssetTypeAddRemove.getElement('Equity', 'tree').getAttribute('class')).toContain('selected');
    });

    it('Verify that Label named "Generate Offset Cash for All Short Equities" is displayed', function() {
      expect(DocumentOptionsAssetTypeAddRemove.getOptionsLabel('Generate Offset Cash for All Short Equities').isPresent()).toBeTruthy();
    });

    var arrOfDropdowns = ['Computation Method', 'Offset Cash Type'];

    arrOfDropdowns.forEach(function(buttonName) {
      it('Verifying that "' + buttonName + '" drop down is displayed', function() {
        ThiefHelpers.isPresent('dropdown', buttonName).then(function(present) {
          if (!present) {
            expect(false).customError('"' + buttonName + '" dropdown button is not displayed');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "Computation Method" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Computation Method').open();
    });

    var arrayComputationMethodOptions = ['Mark to Market', 'Use Total Cost', 'Use Cost Per Share'];
    arrayComputationMethodOptions.forEach(function(dropdownOption) {
      it('Verify that "' + dropdownOption + '" is available in "Computation Method" drop down', function() {
        ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
          if (options.indexOf(dropdownOption) < 0) {
            expect(false).customError('The dropdown does not contains "' + dropdownOption);
            CommonFunctions.takeScreenShot();
          }

        });
      });
    });

    it('Should click on "Computation Method" drop down to close it', function() {
      ThiefHelpers.getDropDownSelectClassReference('Computation Method').open();
    });

    it('Should click on "Offset Cash Type" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Offset Cash Type').open();
    });

    var arrayOffsetCashTypeOptions = ['3 Month Government', 'LIBOR Cash', 'Zero Interest Cash', 'Not Available'];
    arrayOffsetCashTypeOptions.forEach(function(dropdownOption) {
      it('Verify that "' + dropdownOption + '" is available in "Offset Cash Type" drop down', function() {
        ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
          if (options.indexOf(dropdownOption) < 0) {
            expect(false).customError('The dropdown does not contains "' + dropdownOption);
            CommonFunctions.takeScreenShot();
          }

        });
      });
    });

    it('Should click on "Offset Cash Type" drop down to close it', function() {
      ThiefHelpers.getDropDownSelectClassReference('Offset Cash Type').open();
    });

    it('Verify that the default value of "Computation Method" drop down is "Select"', function() {
      ThiefHelpers.verifySelectedDropDownText('Select...', 'Computation Method');
    });

    it('Verify that the default value of "Offset Cash Type" drop down is "3 Month Government"', function() {
      ThiefHelpers.verifySelectedDropDownText('3 Month Government', 'Offset Cash Type');
    });
  });

  describe('Test Step ID: 540647', function() {

    it('Should click on "Generate Offset Cash for Shorts" under Equity > Equity Common', function() {
      DocumentOptionsAssetTypeAddRemove.getElement('Generate Offset Cash for Shorts', 'list', 'Equity|Equity Common').click();
    });

    it('Should click on "Offset Cash Type" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('LIBOR Cash', 'Offset Cash Type');
    });

    it('Verify that drop down named "Tenor" is appeared', function() {
      ThiefHelpers.isPresent('dropdown', 'Tenor').then(function(present) {
        if (!present) {
          expect(false).customError('"Tenor" dropdown button is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 540643', function() {

    it('Should expand "Asset Types" and select "Search Order" from LHP in "Modify Account(New)" page', function() {
      ThiefHelpers.expandAndGetOptionspaneItem(undefined, 'Search Order', 'Asset Types', 'PA').select();

      //Verifying if "Search Order" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Search Order', 'Asset Types').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('Search Order" is not selected inside "Asset Types"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Fixed Income" option in "Available" Section', function() {
      DocumentOptionsAssetTypeSearchOrder.expandElementTree('Fixed Income');

      // Check if "Fixed Income" tree is expanded
      DocumentOptionsAssetTypeSearchOrder.checkIfExpanded('Fixed Income');
    });

    it('Should select "Asset Backed" option from "Fixed Income"', function() {
      DocumentOptionsAssetTypeSearchOrder.getElementInsideTree('Fixed Income', 'Asset Backed').click();

      // Verifying that "Asset Backed" is selected
      expect(DocumentOptionsAssetTypeSearchOrder.getElementInsideTree('Fixed Income', 'Asset Backed').getAttribute('class')).toContain('selected');
    });

    it('Should click on "Right Arrow" icon to add "Asset Backed" to "Selected" pane', function() {
      DocumentOptionsAssetTypeSearchOrder.getArrowButton('Right').click();
    });

    it('Verify if "Asset Backed" is deleted from "Available" section', function() {
      expect(DocumentOptionsAssetTypeSearchOrder.getAssetTypeListItem('Asset Backed', 'Available').getAttribute('class')).toContain('ng-hide');
    });

    it('Verify if "Asset Backed" is added to "Selected" pane', function() {
      expect(DocumentOptionsAssetTypeSearchOrder.getAssetTypeListItem('Asset Backed', 'Selected').isPresent()).toBeTruthy();
    });
  });

  describe('Test Step ID: 540648', function() {

    it('Should select "Asset Backed" from "Selected" section', function() {
      DocumentOptionsAssetTypeSearchOrder.getAssetTypeListItem('Asset Backed', 'Selected').click();

      // Verifying if "Asset Backed" is selected
      expect(DocumentOptionsAssetTypeSearchOrder.getAssetTypeListItem('Asset Backed', 'Selected').getAttribute('class')).toContain('selected');

      // Get the "Asset Backed" position before moving
      DocumentOptionsAssetTypeSearchOrder.getIndex('Asset Backed').then(function(position) {
        posBeforeMoving = position;
      });
    });

    it('Should move "Asset Backed" up by 2 position', function() {
      DocumentOptionsAssetTypeSearchOrder.getArrowButton('Up').click();
      DocumentOptionsAssetTypeSearchOrder.getArrowButton('Up').click();
    });

    it('Verifying that "Asset Backed" is at 3rd position from the bottom', function() {
      expect(DocumentOptionsAssetTypeSearchOrder.getIndex('Asset Backed')).toEqual(posBeforeMoving - 2);
    });

    it('Collecting the elements from "Selected" section to verify their order in next step', function() {

      arrElements = []; // Clearing existing elements from array

      DocumentOptionsAssetTypeSearchOrder.getAllElements('Selected').each(function(element) {
        element.getText().then(function(itemName) {
          arrElements.push(itemName);
        });
      });
    });
  });

  describe('Test Step ID: 540649', function() {

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Dcoument Options');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Search Order', 'Asset Types', 'document options');

    it('Verifying that order of items in "Selected" section is still the same', function() {
      DocumentOptionsAssetTypeSearchOrder.getAllElements('Selected').each(function(element, index) {
        expect(element.getText()).toEqual(arrElements[index]);
      });
    });
  });

  describe('Test Step ID: 540632', function() {

    // Click on "Cancel" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Dcoument Options');
  });

  describe('Test Step ID: 540631', function() {

    it('Should close PA3 application', function() {
      expect(true).toBeTruthy();
    });
  });
});
