'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: rpt-opts-support-cols', function() {

  // Saving the Column Options in an array so that we can perform iteration easily
  var arrayColumnOptions = [
    'Trade Impact Quantity Held',
    'Port. Ending Weight',
    'Bench. Ending Weight',
    'Variation in Ending Weight',
  ];

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: 544463', function() {

    // Should un-check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should launch the PA3 application with "Client:default_doc_auto" document', function() {
      PA3MainPage.switchToDocument('default-doc-auto');
    });

    it('Should un-check "Automatic Calculation" option if not already un-checked', function() {
      expect(PA3MainPage.setAutomaticCalculation(false)).toBeTruthy();
    });

  });

  describe('Test Step ID: 544458', function() {

    it('Should select "Pre & Post Trade" report from LHP', function() {
      PA3MainPage.getReports('Pre & Post Trade').click();

      // Check if report - 'Pre & Post Trade' is selected
      expect(PA3MainPage.getReports('Pre & Post Trade').getAttribute('class')).toContain('selected');
    });

    it('Should click on the "Wrench" icon in the "Pre & Post Trade\'s" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Pre & Post Trade').click();

      // Verifying if Wrench menu list appeared
      expect(PA3MainPage.getWrenchIconFromReportWorkspace('Pre & Post Trade', true).isPresent()).toBeTruthy();
    });

    it('Select "Options" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click();
    });

    it('Verifying if view changed to "Tile Options - Pre & Post Trade" mode', function() {
      expect(element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText())
        .toEqual('Tile Options - Pre & Post Trade');
    });

    it('Should select "Columns" from LHP', function() {
      TileOptions.getLHPOption('Columns').click();

      // Verifying that view changed to "Columns"
      expect(TileOptions.getOptionTitle().getText()).toEqual('Columns');
    });

    // Get each element from array and verify that it is available in 'Selected' section
    arrayColumnOptions.forEach(function(option) {
      it('Verify that the grayed Column ( ' + option + ' ) is available in "Selected" section', function() {
        // Verify that element is grayed out
        expect(TileOptionsColumns.getSelectedSectionElement(option, 'Pre-Trade vs. Post-Trade Impact')
          .getAttribute('class')).toContain('pa-hidden-col');
      });
    });

  });

  describe('Test Step ID: 544459', function() {

    // Select each element from array and see if 'Reference Calculation' check box is selected
    arrayColumnOptions.forEach(function(value) {
      it('Should select "' + value + '" form Selected section', function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Pre-Trade vs. Post-Trade Impact');
        group.getItemByText(value).then(function(columnName) {
          columnName.select();
        });

        // Verify if 'Bench. Ending Weight' is selected
        group.getItemByText(value).then(function(columnName) {
          columnName.isSelected().then(function(seleted) {
            if (!seleted) {
              expect(false).customError('"' + value + '" is not selected');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

      it('Should expand "Statistics" section under the options list', function() {
        expect(TileOptionsColumns.expandSectionInOptionsPane('Statistics')).toBeTruthy();
      });

      it('Verify that "Reference Calculation" item is displayed above "Add a statistics" drop down', function() {
        expect(TileOptionsColumns.getSelectedStatistic('Reference Calculation').isPresent()).toBeTruthy();
      });
    });

  });

  describe('Test Step ID: 544460', function() {

    it('Should select "Trade Impact Quantity Held" form Selected section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Pre-Trade vs. Post-Trade Impact');
      group.getItemByText('Trade Impact Quantity Held').then(function(columnName) {
        columnName.select();
      });

      // Verify if 'Bench. Ending Weight' is selected
      group.getItemByText('Trade Impact Quantity Held').then(function(columnName) {
        columnName.isSelected().then(function(seleted) {
          if (!seleted) {
            expect(false).customError('"Trade Impact Quantity Held" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should expand "Additional Options" section under the options list', function() {
      expect(TileOptionsColumns.expandSectionInOptionsPane('Additional Options')).toBeTruthy();
    });

    it('Verify that "In portfolio" is displayed above "Select an option" drop down.', function() {
      expect(TileOptionsColumns.getSelectedAdditionalOptions('In Portfolio').isPresent()).toBeTruthy();
    });

    it('Verify that "Display Total Column" is displayed above "Select an option" drop down.', function() {
      expect(TileOptionsColumns.getSelectedAdditionalOptions('Display Total Column').isPresent()).toBeTruthy();
    });

  });

  describe('Test Step ID: 544461', function() {

    it('Should click on "Cancel" button from "Tile Options - Pre & Post Trade" header bar', function() {
      TileOptions.getHeaderButton('Cancel').click();
    });

    it('"Tile Options - Pre & Post Trade" view should be closed after clicking on "Cancel" button', function() {
      expect(TileOptions.isTileOptionsMode()).toBeFalsy();
    });

    it('Should close PA3 application', function() {
      expect(true).toBeTruthy();
    });

  });

});
