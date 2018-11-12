'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: thai-alien', function() {

  describe('Test Step ID: 703164', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "thai alien test" document from "Client/pa3/prices;"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('thai-alien-test-v2');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verify that "Thai Alien Test" report is selected from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Weights', 'Thai Alien Test').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('" Thai Alien Test " report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if report header contains "THAI_ALIEN_TEST"', function() {
      PA3MainPage.getHeader().getText().then(function(reportHeader) {
        if (reportHeader !== 'THAI_ALIEN_TEST') {
          expect(false).customError('Report did not match. ' + 'Expected: "THAI_ALIEN_TEST", Found: "' + reportHeader + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that the "Portfolio" widget displays "CLIENT:/PA3/ACCOUNTS/THAI_ALIEN_TEST.ACCT"', function() {
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).getText().then(function(option) {
        if (option !== 'CLIENT:/PA3/ACCOUNTS/THAI_ALIEN_TEST.ACCT') {
          expect(false).customError('"CLIENT:/PA3/ACCOUNTS/THAI_ALIEN_TEST.ACCT" did not display in "Portfolio" widget');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that the "Benchmark" widget displays value "LION:F23935"', function() {
      ThiefHelpers.getTextBoxClassReference('Benchmark', PA3MainPage.xpathBenchmarkWidget).getText().then(function(option) {
        if (option !== 'LION:F23935') {
          expect(false).customError('"LION:F23935" did not display in"Benchmark" widget');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrCols = ['14-OCT-2016', '17-OCT-2016', '18-OCT-2016', '19-OCT-2016'];
    var flag = 0;
    arrCols.forEach(function(col) {
      it('Verify if "' + col + '>Price" Column value is  "20.90000"', function() {
        SlickGridFunctions.getCellReference('Weights', 'Thai Union Group Public Company Limited(Alien Mkt)', '', 'Price', col).then(function(reference) {
          reference.getText().then(function(value) {
            if (value !== '20.900000') {
              flag = flag + 1;
              expect(false).customError(col + ' column doesnot have a value, Found ' + value);
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 703165', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Advanced', 'Prices', 'Document Options');

    it('Should check " Map Thai Alien to Parent After" check box', function() {
      ThiefHelpers.getCheckBoxClassReference('Map Thai Alien to Parent After').check();

      // Verifying if "Map Thai Alien to Parent After" checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('Map Thai Alien to Parent After').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Map Thai Alien to Parent After" checkbox is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should set "Map Thai Alien to Parent After" to 0 days', function() {
      // Getting the xpath of the text box
      var xpath = DocumentOptionsPricesAdvanced.xpathTextBoxNextToMapThaiAlienCheckBox;

      // Enter "5" in the "Daily" text box
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText('0');

      // Verifying if "0" is entered in the text box
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(date) {
        if (date !== '0') {
          expect(false).customError('Failed to enter "0" in the Test Box of Custom. Found: "' + date + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Disabling wait for angular to handle loading icon
    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    it('Verifying if the report is recalculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Weights'), 20000);

      // Verifying report is recalculating
      PA3MainPage.getReportCalculationDlg('Weights').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights" report did not recalculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrCols = ['14-OCT-2016', '17-OCT-2016', '18-OCT-2016', '19-OCT-2016'];
    var arrValues = [];
    arrCols.forEach(function(col, index) {
      it('Should note"Price" Column value for all dates', function() {
        SlickGridFunctions.getCellReference('Weights', 'Thai Union Group Public Company Limited(Alien Mkt)', '', 'Price', col).then(function(reference) {
          reference.getText().then(function(value) {
            arrValues.push(value);
          });
        });
      });
    });

    arrCols.forEach(function(col, index) {
      it('Verify "' + col + '>Price" Column value is different when compared to other date Price values ', function() {
        for (var j = index + 1; j < arrValues.length; j++) {
          if (arrValues[index] === arrValues[j]) {
            expect(false).customError(col + ' Price value is equal to ' + arrCols[j]);
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });
  });
});
