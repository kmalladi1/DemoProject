'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: dates-long-short', function() {

  var arrColumnNames = ['Port. Beginning Weight', 'Total Return', 'Contribution To Return',
    'Port. Beginning Market Value', 'Port. Ending Market Value', 'Purchase', 'Sale',];
  var arrCellValues = [];

  describe('Test Step ID: 719744', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:;pa3;dates;date_long_short_1M" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('date-long-short-1M');
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    // Verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Contribution - Long/Short_1m', undefined, 'isSelected');

    it('Should note all cell values of "Total" row', function() {
      arrColumnNames.forEach(function(columnName) {
        SlickGridFunctions.getCellReference('Contribution to Return', 'Total', '', columnName, undefined).then(function(eleRef) {
          eleRef.getText().then(function(text) {
            arrCellValues.push(text);
          });
        });
      });
    });

  });

  describe('Test Step ID: 719745', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:;pa3;dates;date_long_short_3M" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('date-long-short-3M');
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    // Verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Contribution - Long/Short_Summary', undefined, 'isSelected');

    var screenShot = 0;
    it('Verifying if cell values of "Total" row "12/31/2013 to 1/31/2014" header are same as previously collected values', function() {
      arrColumnNames.forEach(function(columnName, index) {
        SlickGridFunctions.getCellReference('Contribution to Return', 'Total', '', columnName, '12/31/2013 to 1/31/2014').then(function(eleRef) {
          eleRef.getText().then(function(text) {
            if (arrCellValues[index] !== text) {
              expect(false).customError('Cell value for "' + columnName + '" column is not same as previously ' +
                'collected value. Expected "' + text + '", found ' + arrCellValues[index]);
              screenShot++;
              if (screenShot === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

  });
});
