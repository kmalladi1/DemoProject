'use strict';

/*global XPathResult:true*/

require(__dirname + '/../../index.js');

describe('Test Case: multitile-right-click', function() {

  describe('Test Step ID: 408002', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should open "Client:;multi_tile_right_click" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('multi-tile-right-click');
    });

    it('Should enter "spn" in "Portfolio" widget', function() {
      PA3MainPage.setPortfolio('spn', 'Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT', 'Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT').then(function(option) {
        if (!option) {
          expect(false).customError('Not able to Type "test" into "Portfolio"' + ' widget and select "Test.ACCT | Client:/pa3" from type ahead');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verify that "multi_tile_right_click" document is opened.', function() {
      browser.getTitle().then(function(title) {
        if (title.indexOf('multi_tile_right_click') === -1) {
          expect(false).customError('"multi_tile_right_click" is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 407997', function() {

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Weights-Multi', true, 'isSelected');

    it('Verifying if "Weights" report tile is in the top left corner', function() {
      PA3MainPage.getMatrixTile(1, 1).getText().then(function(val) {
        if (val !== 'Weights') {
          expect(false).customError('"Weights" report tile is not located in the top left corner');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Pre & Post Trade" report tile is in the top right corner', function() {
      PA3MainPage.getMatrixTile(1, 2).getText().then(function(val) {
        if (val !== 'Pre & Post Trade') {
          expect(false).customError('"Pre & Post Trade" report tile is not located in the top right corner');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Top 10 Positions" report tile is in the bottom left corner', function() {
      PA3MainPage.getMatrixTile(2, 1).getText().then(function(val) {
        if (val !== 'Top 10 Positions') {
          expect(false).customError('"Top 10 Positions" report tile is not located in the bottom left corner');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Attribution" report tile is in the bottom right corner', function() {
      PA3MainPage.getMatrixTile(2, 2).getText().then(function(val) {
        if (val !== 'Attribution') {
          expect(false).customError('"Attribution" report tile is not located in the bottom right corner');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 407998', function() {

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrReports = ['Weights', 'Pre & Post Trade', 'Top 10 Positions', 'Attribution'];

    arrReports.forEach(function(reportName) {

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);

    });

  });

  describe('Test Step ID: 408000', function() {

    it('Right click on the "Commercial Services" and select "Expand|All" from the menu in "Weights" report', function() {
      var elementReference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services');

      // Right click on "Commercial Services" and select "Expand|All" from the menu
      PA3MainPage.rightClickAndSelectOption(elementReference, 'Expand|All');

      // Weight for securities to load in report
      browser.sleep(2000);
    });

    it('Verifying if all groupings are expanded in the "Weights" report', function() {
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(eleRef, rowIndex) {
          if (eleRef.metadata.type !== 'group') {
            if (eleRef.expanded === true) {
              SlickGridFunctions.scrollRowToTop('Weights', rowIndex - 1);
              CommonFunctions.takeScreenShot();
              expect(false).customError(eleRef[0] + ' grouping is not expanded which is at index(row) ' + rowIndex);
            }
          }
        });
      });
    });

    it('Right click on the "Commercial Services" and select "Collapse|Level 1" from the menu in "Pre & Post Trade" report', function() {
      var elementReference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Pre & Post Trade', 1, 'Commercial Services');

      // Right click on "Commercial Services" and select "Collapse|Level 1" from the menu
      PA3MainPage.rightClickAndSelectOption(elementReference, 'Collapse|Level 1');

      // Wait for securities to load in report
      browser.sleep(2000);
    });

    it('Verifying if all groupings are collapsed in the "Pre & Post Trade" report', function() {
      SlickGridFunctions.getAllRowsFromReport('Pre & Post Trade').then(function(dataView) {
        dataView.forEach(function(eleRef, rowIndex) {
          if (eleRef.metadata.type === 'group') {
            if (eleRef.expanded === true) {
              SlickGridFunctions.scrollRowToTop('Pre & Post Trade', rowIndex - 1);
              CommonFunctions.takeScreenShot();
              expect(false).customError(eleRef[0] + ' grouping is not expanded which is at index(row) ' + rowIndex);
            }
          }
        });
      });
    });

    it('Right click on the "10 Highest" and select "Collapse All" from the menu in the "Top 10 Positions" report', function() {
      var elementReference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Top 10 Positions', 1, '10 Highest');

      // Right click on "10 Highest" and select "Collapse All" from the menu
      PA3MainPage.rightClickAndSelectOption(elementReference, 'Collapse All');

      // Wait for securities to load in report
      browser.sleep(2000);
    });

    it('Verifying if all groupings are collapsed in the "Top 10 Positions" report', function() {
      SlickGridFunctions.getAllRowsFromReport('Top 10 Positions').then(function(dataView) {
        dataView.forEach(function(eleRef, rowIndex) {
          if (eleRef.metadata.type === 'group') {
            if (eleRef.expanded === true) {
              SlickGridFunctions.scrollRowToTop('Top 10 Positions', rowIndex - 1);
              CommonFunctions.takeScreenShot();
              expect(false).customError(eleRef[0] + ' grouping is not expanded which is at index(row) ' + rowIndex);
            }
          }
        });
      });
    });

    it('Right click on the "Commercial Services" and select "Expand All" from the menu in the "Attribution" report', function() {
      var elementReference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Attribution', 1, 'Commercial Services');

      // Right click on "Commercial Services" and select "Expand All" from the menu
      PA3MainPage.rightClickAndSelectOption(elementReference, 'Expand All');

      // Wait for securities to load in report
      browser.sleep(2000);
    });

    it('Verifying if all groupings are expanded in the "Attribution" report', function() {
      SlickGridFunctions.getAllRowsFromReport('Attribution').then(function(dataView) {
        dataView.forEach(function(eleRef, rowIndex) {
          if (eleRef.metadata.type === 'group') {
            if (eleRef.expanded !== true) {
              SlickGridFunctions.scrollRowToTop('Attribution', rowIndex - 1);
              CommonFunctions.takeScreenShot();
              expect(false).customError(eleRef[0] + ' grouping is not expanded which is at index(row) ' + rowIndex);
            }
          }
        });
      });
    });
  });
});
