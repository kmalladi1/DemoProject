'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: exclu-high-low', function() {

  // Variables
  var arrSelected = [];

  describe('Test Step ID: 566937', function() {

    // Should un-check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should launch the PA3 application with "Client:default_doc_auto" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });
  });

  describe('Test Step ID: 566940', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Columns');

    it('Should save element names from "Selected" section into an array for future reference', function() {
      TileOptionsColumns.getAllElements('Selected').each(function(elementRef) {
        elementRef.getText().then(function(eleName) {
          if (eleName !== 'Ticker' && eleName !== 'Security Name') {
            arrSelected.push(eleName);
          }
        });
      });
    });

    it('Should select "Groupings" from LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Groupings').select();

      // Verifying if "Groupings" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Groupings').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Groupings" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "FactSet > Other" tree', function() {
      TileOptionsGroupings.expandElementTree('FactSet|Other', 'FactSet');

      // Verifying if the tree is expanded
      TileOptionsGroupings.checkIfExpanded('FactSet|Other');
    });

    it('Should double click on the "High/Low" element', function() {
      // Get the reference of "High/Low"
      var tabref = TileOptionsGroupings.getElementFromAvailableSection('FactSet|Other', 'High/Low');
      browser.actions().doubleClick(tabref).perform();
    });

    it('Verifying if the "High/Low" is last element in "Selected" section', function() {
      TileOptionsGroupings.getAllElements('Selected').last().getText().then(function(value) {
        expect(value).toEqual('High/Low');
      });
    });
  });

  describe('Test Step ID: 566936', function() {

    it('Should click on "Select High / Low Column" dropdown', function() {
      ThiefHelpers.getDropDownSelectClassReference('Select High / Low Column:').open();
    });

    arrSelected.forEach(function(dropdownOption) {
      it('Verifying all the dropdown items', function() {
        ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
          if (options.indexOf(dropdownOption) < 0) {
            expect(false).customError('The dropdown does not contains "' + dropdownOption);
            CommonFunctions.takeScreenShot();
          }

        });
      });
    });

    it('Should click on "Select High / Low Column" dropdown to close it', function() {
      ThiefHelpers.getDropDownSelectClassReference('Select High / Low Column:').open();
    });
  });

  describe('Test Step ID: 566939', function() {

    it('Should select "Exclusions" from LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Exclusions').select();

      // Verifying if "Exclusions" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Exclusions" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "Edit Groupings" button next to Available section
    CommonPageObjectsForPA3.clickOnEditGroupingButtonAndVerify();

    it('Should select "Options" pill', function() {
      ThiefHelpers.getPillsClassReference().selectPillByText('Options');

      ThiefHelpers.getPillsClassReference().getSelectedPillText().then(function(text) {
        if (text !== 'Options') {
          expect(false).customError('"Options" pill is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should select "High/Low" from the selected container', function() {
      ThiefHelpers.getListBoxItem(TileOptionsExclusionsEditGroupings.xpathOfOptionsSelectedSection, 'High/Low', undefined).select();

      ThiefHelpers.getListBoxItem(TileOptionsExclusionsEditGroupings.xpathOfOptionsSelectedSection, 'High/Low', undefined).isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"High/Low" is not selected from the Available section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on the "Select High / Low Column:" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsExclusionsEditGroupings.xpathOfSelectHighLowColumnDropDown).open();
    });

    it('Verifying all from "Select High / Low Column:" drop down is matching with one present in "Columns\'" selected section', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(array) {
        arrSelected.forEach(function(option) {
          if (array.indexOf(option) < 0) {
            expect(false).customError('"' + option + '" did not present in the drop down');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 566938', function() {

    // Click on the "Cancel" button of "Edit Grouping" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Cancel', 'Edit Groupings');

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');
  });
});
