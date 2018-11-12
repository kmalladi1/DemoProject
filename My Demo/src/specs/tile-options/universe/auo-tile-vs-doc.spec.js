'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: auo-tile-vs-doc', function() {

  describe('Test Step ID:544878', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch PA3 Application with "Client:/Pa3/Universe/AUO2" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('auo2');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');
  });

  describe('Test Step ID:544879', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Universe');

    it('Should un-check "Disable asset type adjustments" checkbox', function() {
      TileOptionsUniverse.getCheckBox('Disable asset type adjustments').click().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that check box is unchecked.
      expect(Utilities.isCheckboxSelected(TileOptionsUniverse.getCheckBox('Disable asset type adjustments'))).toBeFalsy();
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should be verifying that calculated values are matched against the expected values', function() {
      var arrPortValFromPage = ['', '', '-101.36', '-72.49', '', '-1,066.54', '', '', '35,441.08', '300.00'];
      var arrOptionsValFromPage = ['', '', '0.51', '0.36', '', '-0.63', '', '', '--', '--'];
      var arrSizeValFromPage = ['', '', '100', '100', '', '100', '', '', '--', '--'];

      PA3MainPage.getAllCellsOfGivenColumn('Contribution', 'Port. Beginning Quantity Held', 'slick-pane slick-pane-top slick-pane-right').then(function(references) {
        references.forEach(function(eleRef, index) {
          eleRef.getText().then(function(value) {
            if (value !== arrPortValFromPage[index]) {
              expect(false).customError('Expected:' + arrPortValFromPage[index] + ' but found:' + value + '');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

      PA3MainPage.getAllCellsOfGivenColumn('Contribution', 'Options Beg. Delta', 'slick-pane slick-pane-top slick-pane-right').then(function(references) {
        references.forEach(function(eleRef, index) {
          eleRef.getText().then(function(value) {
            if (value !== arrOptionsValFromPage[index]) {
              expect(false).customError('Expected:' + arrOptionsValFromPage[index] + ' but found:' + value + '');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

      PA3MainPage.getAllCellsOfGivenColumn('Contribution', 'Contract Size', 'slick-pane slick-pane-top slick-pane-right').then(function(references) {
        references.forEach(function(eleRef, index) {
          eleRef.getText().then(function(value) {
            if (value !== arrSizeValFromPage[index]) {
              expect(false).customError('Expected:' + arrSizeValFromPage[index] + ' but found:' + value + '');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID:544880', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Add/Remove', 'Asset Types', 'Document Options');

    it('Should de-select "Disable asset type adjustments', function() {
      DocumentOptionsAssetTypeAddRemove.getCheckBox('Disable asset type adjustments').click().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that check box is deselected
      expect(Utilities.isCheckboxSelected(DocumentOptionsAssetTypeAddRemove.getCheckBox('Disable asset type adjustments'))).toBeFalsy();
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should be verifying that calculated values are matched against the expected values', function() {

      var arrPortValFromPage = ['', '', '-10,135.93', '-7,248.92', '', '-106,654.41', '', '', '3,544,107.52', '300.00'];
      var arrOptionsValFromPage = ['', '', '0.51', '0.36', '', '-0.63', '', '', '--', '--'];
      var arrSizeValFromPage = ['', '', '100', '100', '', '100', '', '', '--', '--'];

      PA3MainPage.getAllCellsOfGivenColumn('Contribution', 'Port. Beginning Quantity Held', 'slick-pane slick-pane-top slick-pane-right').then(function(references) {
        references.forEach(function(eleRef, index) {
          eleRef.getText().then(function(value) {
            if (value !== arrPortValFromPage[index]) {
              expect(false).customError('Expected:' + arrPortValFromPage[index] + ' but found:' + value + '');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

      PA3MainPage.getAllCellsOfGivenColumn('Contribution', 'Options Beg. Delta', 'slick-pane slick-pane-top slick-pane-right').then(function(references) {
        references.forEach(function(eleRef, index) {
          eleRef.getText().then(function(value) {
            if (value !== arrOptionsValFromPage[index]) {
              expect(false).customError('Expected:' + arrOptionsValFromPage[index] + ' but found:' + value + '');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

      PA3MainPage.getAllCellsOfGivenColumn('Contribution', 'Contract Size', 'slick-pane slick-pane-top slick-pane-right').then(function(references) {
        references.forEach(function(eleRef, index) {
          eleRef.getText().then(function(value) {
            if (value !== arrSizeValFromPage[index]) {
              expect(false).customError('Expected:' + arrSizeValFromPage[index] + ' but found:' + value + '');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID:544881', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Universe');

    it('Should check "Disable asset type adjustments" checkbox', function() {
      TileOptionsUniverse.getCheckBox('Disable asset type adjustments').click().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that check box is unchecked.
      expect(Utilities.isCheckboxSelected(TileOptionsUniverse.getCheckBox('Disable asset type adjustments'))).toBeTruthy();
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should be verifying that calculated values are matched against the expected values', function() {

      var arrPortValFromPage = ['', '', '170,000.00', '', '', '-20,000.00', '-20,000.00', '', '', '300.00'];
      var arrOptionsValFromPage = ['', '', '-0.63', '', '', '0.51', '0.36', '', '', '--'];
      var arrSizeValFromPage = ['', '', '100', '', '', '100', '100', '', '', '--'];

      PA3MainPage.getAllCellsOfGivenColumn('Contribution', 'Port. Beginning Quantity Held', 'slick-pane slick-pane-top slick-pane-right').then(function(references) {
        references.forEach(function(eleRef, index) {
          eleRef.getText().then(function(value) {
            if (value !== arrPortValFromPage[index]) {
              expect(false).customError('Expected:' + arrPortValFromPage[index] + ' but found:' + value + '');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

      PA3MainPage.getAllCellsOfGivenColumn('Contribution', 'Options Beg. Delta', 'slick-pane slick-pane-top slick-pane-right').then(function(references) {
        references.forEach(function(eleRef, index) {
          eleRef.getText().then(function(value) {
            if (value !== arrOptionsValFromPage[index]) {
              expect(false).customError('Expected:' + arrOptionsValFromPage[index] + ' but found:' + value + '');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

      PA3MainPage.getAllCellsOfGivenColumn('Contribution', 'Contract Size', 'slick-pane slick-pane-top slick-pane-right').then(function(references) {
        references.forEach(function(eleRef, index) {
          eleRef.getText().then(function(value) {
            if (value !== arrSizeValFromPage[index]) {
              expect(false).customError('Expected:' + arrSizeValFromPage[index] + ' but found:' + value + '');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });
});
