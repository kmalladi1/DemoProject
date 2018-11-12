'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: projected-cashflows-2', function() {

  // Variables
  var arrDates = ['12/30/2011', '12/31/2012', '12/31/2013'];
  var arrColumns = ['Port. Projected Principal Cash Flow', 'Port. Projected Interest Cash Flow',
    'Port. Projected Total Cash Flow', 'Port. Projected Principal Balance', 'Port. Projected Cash Balance',];

  var arrExpected = ['549.1858', '157.6075', '706.7933', '', '', '373.3368', '299.9962', '673.3330', '', '',
    '1,327.5573', '280.6271', '1,608.1844', '', '',];

  describe('Test Step ID: 673736', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Fixed_income/FI_CASH_FLOW_DEFAULT"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('fi-cash-flow-default');
    });

    it('Verifying if "Cash Flows" Report calculated without any errors', function() {
      PA3MainPage.isReportCalculated('Cash Flows').then(function(found) {
        if (!found) {
          expect(false).customError('"Cash Flows" Report not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Cash Flows')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if Calculation error displayed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for the report to refres
      browser.sleep(4000);
    });

    // Known Issue: Value is taking as --
    // http://is.factset.com/rpd/summary.aspx?messageid=22663219
    var index = 0; var flag = 0;
    arrDates.forEach(function(date) {
      arrColumns.forEach(function(columnName) {
        it('Verifying the value corresponding to "' + date + '" > "' + columnName + '" for Total row', function() {
          SlickGridFunctions.getCellReference('Cash Flows', 'Total', '', columnName, date).then(function(element) {
            element.getText().then(function(val) {
              if (val !== arrExpected[index]) {
                expect(false).customError('Expected to have "' + arrExpected[index] + '" but found "' + val + '"');
                if (flag !== 2) {
                  flag = 1;
                }
              }

              index++;
            }).then(function() {
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
                flag = 2;
              }
            });
          });
        });
      });
    });

  });

});
