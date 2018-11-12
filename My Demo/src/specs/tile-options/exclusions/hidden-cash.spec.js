'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: hidden-cash', function() {

  describe('Test Step ID: 583154', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

    it('Enter "Hide Cash" in the "Portfolio" widget and select "CLIENT:/PA3/TEST.ACCT" from type ahead', function() {
      // Selecting the value to portfolio widget
      PA3MainPage.setPortfolio('Hide Cash', 'HIDE_CASH.ACCT | Client:/pa3/', 'Client:/pa3/HIDE_CASH.ACCT').then(
        function(option) {
          if (!option) {
            expect(false).customError('"CLIENT:/PA3/TEST.ACCT" is not selected from type ahead.');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should enter "Client:/pa3/CASH.ACCT" in the "Benchmark" widget and  hit enter key', function() {
      // Entering the value to Banchmark Widget
      PA3MainPage.getWidgetBox('Benchmark').sendKeys('Client:/pa3/CASH.ACCT', protractor.Key.ENTER);

      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(option) {
        if (option !== 'CLIENT:/PA3/CASH.ACCT') {
          expect(false).customError('"Client:/Pa3/CASH.ACCT" is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);
  });

  describe('Test Step ID: 583156	', function() {

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    it('Should click on "Clear All" button from Selected section', function() {
      ThiefHelpers.getTransferBoxReference(TileOptionsGroupings.xpathOfTransferBox).target.clear();
    });

    it('Verifying groupings are removed from selected section', function() {
      // Verifying groupings are removed
      var allElements = TileOptionsColumns.getAllElements('selected');
      allElements.count().then(function(count) {
        if (count !== 0) {
          expect(false).customError('Groupings are not removed from selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Double click on "Asset Type" to add it to "Selected" section', function() {
      //Selecting an item to selected section
      TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Asset Type').isPresent().then(function(option) {
        if (option) {
          browser.actions().doubleClick(
            TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Asset Type')).perform();
        } else {
          expect(false).customError('"Asset Type" is not found under "FactSet" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Asset Type" is added to the "Selected" section', function() {
      // Verifying Asset type is added to selected section
      TileOptionsGroupings.getElementFromSelectedContainer('Asset Type').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Asset Type" was not added to the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying weights reports are grouped by "Asset Type"', function() {
      // Verifying weights reports
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(option) {
        if (option !== 'Asset Type') {
          expect(false).customError('weights reports are not grouped by "Asset Type"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying asset "Equity Common" and "Cash" are displayed in weights report', function() {
      //Verifying "Equity Common" and "Cash"
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(cols) {
        if (cols.indexOf('Equity Common') === -1) {
          expect(false).customError('Equity Common is not present in the columns');
          CommonFunctions.takeScreenShot();
        }

        if (cols.indexOf('[Cash]') === -1) {
          expect(false).customError('[Cash] is not present in the columns');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 583155', function() {

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Asset Type');

    it('Should click on the "Hidden" on the LHP of tile options', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Hidden').select();

      // Verifying if "Hidden" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Hidden').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Hidden" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Hide Cash" checkbox.', function() {
      ThiefHelpers.getCheckBoxClassReference('Hide Cash').check();
    });

    it('Verifying if the "Hide Cash" checkbox is selected', function() {
      ThiefHelpers.getCheckBoxClassReference('Hide Cash').isChecked().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Hide Cash" checkbox is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply to weights" menu at the top right corner', function() {
      ThiefHelpers.getButtonClassReference('Apply To Weights').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should check Contribution in the blasting menu', function() {
      ThiefHelpers.getCheckBoxClassReference('Contribution').check();

      //Verifying the checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('Contribution').isChecked().then(function(value) {
        if (!value) {
          expect(false).customError('"Contribution" is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in "Blasting Menu"', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsHidden.getOkOrCancelButtonFromBlastedWindow('OK')).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Blasting Menu"');
        CommonFunctions.takeScreenShot();
      });
    });

    // Click on "Cancel" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying "[CASH]" is not present on the weights report', function() {
      //Verifying "Equity Common" and "Cash"
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(cols) {
        if (cols.indexOf('[CASH]') !== -1) {
          expect(false).customError('"[CASH]" is present in the Weights report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Equity Common" is present in the weights report', function() {
      //Verifying "Equity Common"
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(cols) {
        if (cols.indexOf('Equity Common') === -1) {
          expect(false).customError('"Equity Common" is not present in the Weights report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 721911', function() {

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Contribution', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Contribution`);

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Contribution', 'Economic Sector');

    it('Should click on the "Hidden" on the LHP of tile options', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Hidden').select();

      // Verifying if "Hidden" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Hidden').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Hidden" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Hide Cash" checkbox is selected', function() {
      ThiefHelpers.getCheckBoxClassReference('Hide Cash').isChecked().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Hide Cash" checkbox is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Cancel" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options');

  });

});
