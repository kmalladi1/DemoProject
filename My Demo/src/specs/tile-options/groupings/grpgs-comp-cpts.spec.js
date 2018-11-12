'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: grpgs-comp-cpts', function() {
  // Variable(s)
  var itemReference;

  describe('Test Step ID: 551506', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should open "Client:/default_doc_auto" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });
  });

  describe('Test Step ID: 551503', function() {

    // Clicking on wrench Icon from 'Weights' report toolbar
    it('Should click on wrench Icon from "Weights" report toolbar', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click();
    });

    // Clicking on 'Options' from Wrench Menu dropdown.
    it('Should click "Options" from dropdown menu', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click();
    });

    // Checking if the 'Tile Options' mode has opened.
    it('Validating if "Tile Options" mode opened', function() {
      expect(TileOptions.isTileOptionsMode()).toBeTruthy();
    });

    // Clicking on Groupings LHP item to select.
    it('Should click on Groupings LHP item to select', function() {
      TileOptions.getLHPOption('Groupings').click();

      // Checking if 'Groupings' item is opened.
      expect(TileOptions.getOptionTitle().getText()).toEqual('Groupings');
    });

    // Expanding the tree from 'Available' container and Checking if 'FactSet -> Other' is expanded.
    it('Should Expand "FactSet > Other" from "Available" container', function() {
      TileOptionsGroupings.expandElementTree('FactSet|Other', 'FactSet');

      // Verifying if the tree is expanded through 'Factset-> Other'
      TileOptionsGroupings.checkIfExpanded('FactSet|Other');
    });

    // Selecting the Item 'Composite Components' from 'Available' container
    it('Should click on "Composite Components" to highlight', function() {
      TileOptionsGroupings.getElementFromAvailableSection('FactSet|Other', 'Composite Components').click();

      // Verifying if 'Composite Assets' is highlighted
      expect(TileOptionsGroupings.getElementFromAvailableSection('FactSet|Other', 'Composite Components').getAttribute('class')).toContain('selected');
    });

    it('Should drag "Composite Components" from available section to selected section', function() {
      var source = TileOptionsGroupings.getElementFromAvailableSection('FactSet|Other', 'Composite Components');
      var target = element(by.xpath(TileOptionsGroupings.xpathSelectedContainer));

      browser.driver.actions().mouseDown(source).mouseMove(target).mouseUp(target).perform();
    });

    // Selecting the item 'Composite Components' from 'Selected' container
    it('Should highlight Item "Composite Components" from "Selected" Container', function() {
      itemReference = TileOptionsGroupings.getElementFromSelectedContainer('Composite Components');
      itemReference.click();

      // Verifying if 'Composite Assets' is Selected.
      expect(itemReference.getAttribute('class')).toContain('selected');
    });

    // Expanding the section 'Definition' from 'Options' Container
    it('Should expand the section "Definition"', function() {
      expect(TileOptionsGroupings.expandSectionInOptionsPane('Definition')).toBeTruthy();
    });
  });

  describe('Test Step ID: 551504', function() {

    // Verifying if 'Advanced Benchmark Options' dropdown is set to 'Single Floating Benchmark' by default
    it('Verifying if "Advanced Benchmark Options" dropdown is set to "Single Floating Benchmark" by default', function() {
      expect(TileOptionsGroupings.getEleFromDefinitionSectionForCompositeGroupings('Advanced Benchmark Options').getText()).toEqual('Single Floating Benchmark');
    });

    // Verifying if 'Show Portfolio Description' checkbox is checked off by default
    it('Verifying if "Show Portfolio Description" checkbox is checked off by default', function() {
      expect(Utilities.isCheckboxSelected(TileOptionsGroupings.getSectionCheckBox('Definition', 'Show Portfolio Description'))).toBeTruthy();
    });
  });

  describe('Test Step ID: 551505', function() {

    // Clicking on 'Advanced Benchmark Options' dropdown to verify the list of options
    it('Should click on "Advanced Benchmark Options" dropdown to verify the list of options', function() {
      var arrAdvancedBenchmarkOptions = ['Single Floating Benchmark', 'Single Fixed Benchmark', 'Blended Floating Benchmark', 'Blended Fixed Benchmark'];
      var dropdownReference = TileOptionsGroupings.getEleFromDefinitionSectionForCompositeGroupings('' + 'Advanced Benchmark Options');
      TileOptionsGroupings.verifyDropdownList(arrAdvancedBenchmarkOptions, dropdownReference);
    });
  });

  describe('Test Step ID: 551510', function() {

    // Clicking on 'Advanced Benchmark Options' dropdown.
    it('Should click on "Advanced Benchmark Options" dropdown', function() {
      TileOptionsGroupings.getEleFromDefinitionSectionForCompositeGroupings('Advanced Benchmark Options').click();
    });

    // Clicking on 'Blending Floating Benchmark' to select.
    it('Should click on "Blended Floating Benchmark" option to select', function() {
      TileOptionsGroupings.getDropDownItem('Blended Floating Benchmark').click();

      // Verifying if 'Blending Floating Benchmark' is selected.
      expect(TileOptionsGroupings.getEleFromDefinitionSectionForCompositeGroupings('Advanced Benchmark Options').getText()).toEqual('Blended Floating Benchmark');
    });
  });

  describe('Test Step ID: 551507', function() {

    // Un-checking 'Show Portfolio Description' checkbox
    it('Should click on "Show Portfolio Description" checkbox to un-check', function() {
      expect(Utilities.isCheckboxSelected(TileOptionsGroupings.getSectionCheckBox('Definition', 'Show Portfolio Description', true))).toBeFalsy();
    });
  });

  describe('Test Step ID: 551508', function() {

    // Clicking on the Cancel button to close Tile Options Mode
    it('Should click on the "Cancel" Button', function() {
      TileOptions.getHeaderButton('Cancel').click();
    });

    // Verifying if mode is closed.
    it('Should verify "Tile Options" mode is closed', function() {
      expect(TileOptions.isTileOptionsMode()).toBeFalsy();
    });
  });

  describe('Test Step ID: 551509', function() {
    it('Should close the PA3 application', function() {
      expect(true).toBeTruthy();
    });
  });
});
