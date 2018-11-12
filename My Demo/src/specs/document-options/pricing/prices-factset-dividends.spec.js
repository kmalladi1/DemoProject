'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: prices-factset-dividends', function() {

  describe('Test Step ID: 703106', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/pa3/prices/Fallback_FDS_Div" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('fallback-fds-div');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Verifying if header displays "Factset Dividends" in "Contribution" report', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        if (text !== 'Factset Dividends') {
          expect(false).customError('Header of application is not showing "Factset Dividends". ' + 'Expected: "Factet Dividends", Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrOfColumnNames = ['Price Change (%)', 'Total Return', 'Contribution To Return', 'Port. Income'];

    arrOfColumnNames.forEach(function(columnName) {
      it('Verifying that all the cells in "Port. Weight" column displays data', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', columnName).then(function(columnData) {
          columnData.forEach(function(value, index) {
            if (value !== ('', '--', 'NA', '.0')) {
              expect(false).customError('"' + columnName + '" column displayed values. Expected: "--" but Found: "' + value + '"');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 703111', function() {

    // Select "Advanced" tab from Document options dialog
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Advanced', 'Prices', 'Document Options');

    it('Should check "Fall Back to FactSet Dividends for Client Sources" checkbox.', function() {
      ThiefHelpers.getCheckBoxClassReference('Fall Back to FactSet Dividends for Client Sources').check();
    });

    it('Verifying if the "Fall Back to FactSet Dividends for Client Sources" checkbox is selected', function() {
      ThiefHelpers.getCheckBoxClassReference('Fall Back to FactSet Dividends for Client Sources').isChecked().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Fall Back to FactSet Dividends for Client Sources" checkbox is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Verifying if header displays "Factset Dividends" in "Contribution" report', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        if (text !== 'Factset Dividends') {
          expect(false).customError('Header of application is not showing "Factset Dividends". ' + 'Expected: "Factet Dividends", Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrOfColumnNames = ['Total Return', 'Contribution To Return', 'Port. Income'];
    var count = 0;

    arrOfColumnNames.forEach(function(columnName) {
      it('Verifying that all the cells in "' + columnName + '" column displays some values', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', columnName).then(function(columnData) {
          columnData.forEach(function(value) {
            if (value !== ('', '--', 'NA', '.0')) {
              count = count + 1;
            }

            if (count <= '0') {
              expect(false).customError('"' + columnName + '" column displayed values. Expected: "value" but Found: "' + value + '"');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying that all the cells in "Port. Weight" column displays no values', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Price Change (%)').then(function(columnData) {
        columnData.forEach(function(value) {
          if (value !== ('', '--', 'NA', '.0')) {
            expect(false).customError('"Price Change (%)" column displayed values. Expected: "--" but Found: "' + value + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });
});
