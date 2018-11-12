'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: eqt-prcng-fallbk', function() {

  describe('Test Step ID: 690965', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should opne "Client:;PA3;Prices;FDS_FALLBACK" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('fds-fallback');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    var colNames = [{name: 'Beginning Price', value: '0.77'}, {
      name: 'Ending Price',
      value: '1.50',
    }, {name: 'Total Return', value: '50.00'},];

    var flag;

    colNames.forEach(function(column) {
      it('Verify that "' + column.name + '" column for "500588" ticker shows "' + column.value + '"', function() {
        SlickGridFunctions.getCellReference('Contribution', '500588', 'Ticker', column.name, undefined, undefined).then(function(cellRef) {
          cellRef.getText().then(function(value) {
            if (value !== column.value) {
              flag = flag + 1;
              expect(false).customError('"500588" row expected value for "' + column.name + '" column  is "' + column.value + '" , Found : "' + value + '"');
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 690966', function() {

    // Select Advanced tab from Document options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Advanced', 'Prices', 'Document Options');

    it('Should uncheck "FactSet Equity Fall Back to Secondary Sources" check box', function() {
      ThiefHelpers.getCheckBoxClassReference('FactSet Equity Fall Back to Secondary Sources', undefined).uncheck();

      // Verifying that "FactSet Equity Fall Back to Secondary Sources" check box is checked
      ThiefHelpers.getCheckBoxClassReference('FactSet Equity Fall Back to Secondary Sources', undefined).isChecked().then(function(checked) {
        if (checked) {
          expect(false).customError('"FactSet Equity Fall Back to Secondary Sources" checkbox is checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    var colNames = [{name: 'Beginning Price', value: '0.77'}, {
      name: 'Ending Price',
      value: 'NA',
    }, {name: 'Total Return', value: '0.00'},];

    var flag;

    colNames.forEach(function(column) {
      it('Verify that "' + column.name + '" column for "500588" ticker shows "' + column.value + '"', function() {
        SlickGridFunctions.getCellReference('Contribution', '500588', 'Ticker', column.name, undefined, undefined).then(function(cellRef) {
          cellRef.getText().then(function(value) {
            if (value !== column.value) {
              flag = flag + 1;
              expect(false).customError('"500588" row expected value for "' + column.name + '" column  is "' + column.value + '" , Found : "' + value + '"');
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });
});
