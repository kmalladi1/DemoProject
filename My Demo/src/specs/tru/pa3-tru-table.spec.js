'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: pa3-tru-table', function() {

  var arrDiffColValues = [];

  describe('Test Step ID: 678420', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Tru/QA_TAX_RATE"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('qa-tax-rate');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    var flag = 0;
    var arrValues = [{name: 'Portfolio', val: 'BENCH:ACALLE00'}, {name: 'benchmark', val: 'CASH:USD',},];
    arrValues.forEach(function(values) {
      it('Verifying that "' + values.name + '" widget has "' + values.val + '" ', function() {
        PA3MainPage.getWidgetBox(values.name).getAttribute('value').then(function(value) {
          if (value !== values.val) {
            flag = flag + 1;
            expect(false).customError('"' + values.name + '" widget did not have "' + values.val + '", Found: "' + value + '"');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Verify that the "DIFF" column values are in between "-10 to +10"', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution to Return', '').then(function(colValues) {
        colValues.forEach(function(rowName) {
          SlickGridFunctions.getCellReference('Contribution to Return', rowName, '', 'DIFF').then(
            function(cellRef) {
              cellRef.getText().then(function(value) {
                arrDiffColValues.push(value);
                if (parseFloat(value) < -10 && parseFloat(value) > 10) {
                  flag = flag + 1;
                  expect(false).customError(rowName + ' value for "DIFF" column is not in between "-10 to 10", Found ' + value);
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

  describe('Test Step ID: 678434', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Advanced', 'Prices', 'document options');

    it('Should uncheck "Apply Custom Tax Withholding Rates" check box', function() {
      ThiefHelpers.getCheckBoxClassReference('Apply Custom Tax Withholding Rates').uncheck();

      // Verifying if "Apply Custom Tax Withholding Rates" checkbox is unchecked
      ThiefHelpers.getCheckBoxClassReference('Apply Custom Tax Withholding Rates').isChecked().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Apply Custom Tax Withholding Rates" checkbox is checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that textbox under the checkbox is grayed out and displays the text: "Client:/pa3/tru/TAX-TABLE"', function() {
      CommonFunctions.isElementEnabled('Textbox', undefined, DocumentOptionsPricesAdvanced.xpathTaxTableTextbox).then(function(isEnabled) {
        if (isEnabled) {
          expect(false).customError('text box is not disabled');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying that "Client:/pa3/tru/TAX-TABLE" is typed into the search box
      ThiefHelpers.getTextBoxClassReference(undefined, DocumentOptionsPricesAdvanced.xpathTaxTableTextbox).getText().then(function(text) {
        if (text !== 'Client:/pa3/tru/TAX-TABLE') {
          expect(false).customError('Expected text is not displayed in textbox, Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 678436', function() {

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Dcoument Options');

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Performance', 'Contribution Detail', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    var flag = 0;

    it('Verify that "DIFF" column values are different when compared values noted in test step: 678420', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution to Return', '').then(function(colValues) {
        colValues.forEach(function(rowName, index) {
          SlickGridFunctions.getCellReference('Contribution to Return', rowName, '', 'DIFF').then(
            function(cellRef) {
              cellRef.getText().then(function(value) {
                if (parseFloat(value) === parseFloat(arrDiffColValues[index])) {
                  flag = flag + 1;
                  expect(false).customError(rowName + 'row value matched with the value noted in 678420 : ' + value);
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

  describe('Test Step ID: 678439', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Advanced', 'Prices', 'document options');

    it('Should check "Apply Custom Tax Withholding Rates" check box', function() {
      ThiefHelpers.getCheckBoxClassReference('Apply Custom Tax Withholding Rates').check();

      // Verifying if "Apply Custom Tax Withholding Rates" checkbox is unchecked
      ThiefHelpers.getCheckBoxClassReference('Apply Custom Tax Withholding Rates').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Apply Custom Tax Withholding Rates" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Dcoument Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    var flag = 0;

    it('Verify that "DIFF" column values are same when compared values noted in test step: 678420', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution to Return', '').then(function(colValues) {
        colValues.forEach(function(rowName, index) {
          SlickGridFunctions.getCellReference('Contribution to Return', rowName, '', 'DIFF').then(
            function(cellRef) {
              cellRef.getText().then(function(value) {
                if (value !== arrDiffColValues[index]) {
                  flag = flag + 1;
                  expect(false).customError(rowName + 'row expected value "' + arrDiffColValues[index] + '" , Found : "' + value + '"');
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

});
