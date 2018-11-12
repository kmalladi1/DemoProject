'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: dt-lagng-jpy-hol-tr', function() {

  // Variables
  var arrColValues = [];

  describe('Test Step ID: 583200', function() {

    it('Should open "Client:/PA3/Dates/Date_Lagging_JPY" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('date-lagging-jpy');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Verifying if "Contribution" report is displayed with date as "1/31/2012 - 5/01/2012"', function() {
      PA3MainPage.getDateHyperLink('Contribution').getText().then(function(value) {
        if (value !== '1/31/2012 - 5/01/2012') {
          expect(false).customError('"Contribution" report is not displayed with date as "1/31/2012 - 5/01/2012".');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();

      });
    });

    it('Verifying if "Contribution" report is grouped by "Country of Exchange"', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution').getText().then(function(value) {
        if (value !== 'Country of Exchange') {
          expect(false).customError('"Contribution" report is not grouped by "Country of Exchange"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();

      });
    });

  });

  describe('Test Step ID: 583201', function() {

    // Select "Date Lagging" from Document options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Date Lagging', 'Dates', 'Document Options');

    it('Should select "Seven Day" from the "Lagging Calendar"', function() {
      ThiefHelpers.selectOptionFromDropDown('Seven Day', 'Lagging Calendar');

      // Verifying if Seven Day is selected from the Calendar
      ThiefHelpers.verifySelectedDropDownText('Seven Day', 'Lagging Calendar');
    });

    it('Verifying if "Portfoilo Return Calculation" is enabled', function() {
      CommonFunctions.isElementEnabled('Drop down', 'Portfoilo Return Calculation',
        DocumentOptionsDatesDateLagging.xpathPortolioReturnCalculation).then(function(isEnabled) {
        if (!isEnabled) {
          expect(false).customError('"Portfoilo Return Calculation" is not enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Benchmark Report Calculation" is enabled', function() {
      CommonFunctions.isElementEnabled('Drop down', 'Benchmark Return Calculation',
        DocumentOptionsDatesDateLagging.xpathBenchmarkReturnCalculation).then(function(isEnabled) {
        if (!isEnabled) {
          expect(false).customError('"Benchmark Return Calculation" is not enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Portfolio Report Calculation" have "Compounding" selected by default', function() {
      ThiefHelpers.verifySelectedDropDownText('Compounding', undefined,
        DocumentOptionsDatesDateLagging.xpathPortolioReturnCalculation);
    });

    it('Verifying if "Benchmark Report Calculation" have "Compounding" selected by default', function() {
      ThiefHelpers.verifySelectedDropDownText('Compounding', undefined,
        DocumentOptionsDatesDateLagging.xpathBenchmarkReturnCalculation);
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should expand "United States" from the Contribution report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Contribution', 'United States');

      // Verifying if tree expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution', 'United States');
    });

    var columns = ['Port. Ending Price', 'Bench. Ending Price'];
    columns.forEach(function(column) {
      it('Verifying if "' + column + '" of "United States > Zimmer Biomet Holdings, Inc." is "5,031.83"', function() {
        SlickGridFunctions.getCellReference('Contribution', 'Zimmer Biomet Holdings, Inc.', '', column).then(function(ref) {
          ref.getText().then(function(val) {
            if (val !== '5,031.83') {
              expect(false).customError('Expected to have "5,031.83" under "' + column + '" of ' +
                '"United States > Zimmer Biomet Holdings, Inc." but found "' + val + '" ');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Should collapse "United States" from the Contribution report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Contribution', 'United States');
      CommonFunctions.captureScreenShot('collapse');
    });

    var rows = ['United States', 'United Kingdom', 'Turkey', 'Thailand', 'Spain'];
    rows.forEach(function(row) {
      it('Capturing values of "Port. Total Return" of "' + row + '" for future reference', function() {
        SlickGridFunctions.getCellReference('Contribution', row, '', 'Port. Total Return').then(function(ref) {
          ref.getText().then(function(val) {
            arrColValues.push(val);
          });
        });
      });
    });

  });

  describe('Test Step ID: 583212', function() {

    // Select "Date Lagging" from Document options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Date Lagging', 'Dates', 'Document Options');

    it('Should select "HPR" from the "Portfolio Return Calculation" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('HPR', undefined, DocumentOptionsDatesDateLagging.xpathPortolioReturnCalculation);

      // Verifying if HPR is selected from the drop down
      ThiefHelpers.verifySelectedDropDownText('HPR', undefined,
        DocumentOptionsDatesDateLagging.xpathPortolioReturnCalculation);
    });

    it('Should select "HPR" from the "Benchmark Return Calculation" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('HPR', undefined, DocumentOptionsDatesDateLagging.xpathBenchmarkReturnCalculation);

      // Verifying if HPR Day is selected from the drop down
      ThiefHelpers.verifySelectedDropDownText('HPR', undefined,
        DocumentOptionsDatesDateLagging.xpathBenchmarkReturnCalculation);
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    var rows = ['United States', 'United Kingdom', 'Turkey', 'Thailand', 'Spain'];
    rows.forEach(function(row, index) {
      if (row === 'United States' || row === 'United Kingdom') {
        it('Verifying values of "Port. Total Return" of "' + row + '" with captured values at Test Step: 583212 differs', function() {
          SlickGridFunctions.getCellReference('Contribution', row, '', 'Port. Total Return').then(function(ref) {
            ref.getText().then(function(val) {
              if (val === arrColValues[index]) {
                expect(false).customError('Expected to have "' + arrColValues[index] + '" under "Port. Total Return" of ' +
                  '"' + row + '" but found "' + val + '" ');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        });
      } else {
        it('Verifying values of "Port. Total Return" of "' + row + '" with captured values at Test Step: 583212 is same', function() {
          SlickGridFunctions.getCellReference('Contribution', row, '', 'Port. Total Return').then(function(ref) {
            ref.getText().then(function(val) {
              if (val !== arrColValues[index]) {
                expect(false).customError('Expected to have "' + arrColValues[index] + '" under "Port. Total Return" of ' +
                  '"' + row + '" but found "' + val + '" ' + val);
                CommonFunctions.takeScreenShot();
              }
            });
          });
        });
      }
    });

  });

});
