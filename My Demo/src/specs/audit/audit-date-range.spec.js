'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: audit-date-range', function() {

  // Variable(s)
  var dateRange = ['5/29/2014 to 5/30/2014', '5/28/2014 to 5/29/2014', '5/27/2014 to 5/28/2014',
    '5/23/2014 to 5/27/2014', '5/22/2014 to 5/23/2014', '5/21/2014 to 5/22/2014', '5/20/2014 to 5/21/2014',
    '5/19/2014 to 5/20/2014', '5/16/2014 to 5/19/2014', '5/15/2014 to 5/16/2014', '5/14/2014 to 5/15/2014',
    '5/13/2014 to 5/14/2014', '5/12/2014 to 5/13/2014', '5/09/2014 to 5/12/2014', '5/08/2014 to 5/09/2014',
    '5/07/2014 to 5/08/2014', '5/06/2014 to 5/07/2014', '5/05/2014 to 5/06/2014', '5/02/2014 to 5/05/2014',
    '5/01/2014 to 5/02/2014', '4/30/2014 to 5/01/2014',];

  var auditValue;
  var secName;
  var rowClassName = 'slick-pane slick-pane-top slick-pane-left';
  var colClassName = 'slick-pane slick-pane-top slick-pane-right';

  describe('Test Step ID: 503622', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch PA3 Application with "Client:;Pa3;Audit;AUDIT_PERF" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('audit-perf');
    });

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Performance', true, 'isSelected');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Performance');

    it('Verifying if "Performance" report is grouped by date range: "3/31/2014 - 3/31/2015"', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(value) {
        if (value !== '3/31/2014 - 3/31/2015') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Report was not grouped by date range: "3/31/2014 - 3/31/2015"');
        }
      });

      //waiting for the elements to load in the browser.
      browser.sleep(3000);
    });
  });

  describe('Test Step ID: 503624', function() {

    it('Should right click on the "Russell 1000 Value-> Total Return" value for "4/30/2014 to 5/30/2014" grouping and ' + 'select "Audit Value"', function() {
      PA3MainPage.getCellValueForMultiHeaderColumn('Performance', '4/30/2014 to 5/30/2014', 1,
        'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right', true).then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);

      //waiting for the elements to load in the browser.
      browser.sleep(2000);
    });

    it('Verifying audit section Title is "Total Return - Russell 1000 Value"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Total Return - Russell 1000 Value') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Total Return - Russell 1000 Value"');
        }
      });
    });

    var arr = ['Port. Total Return', 'Cumulative Port. Total Return'];
    arr.forEach(function(col, index) {
      it('Verifying that Audit view should display Daily date range values for "' + col + '"', function() {
        dateRange.forEach(function(ref) {
          AuditMode.getValueFromCalculatedMultiHeaderReport('Total Return - Russell 1000 Value', ref, index + 1).then(function(value) {
            expect(value).not.toBeNull();
          });
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Verifying that the daily data range values should be within "4/30/2014 to 5/30/2014".', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Total Return - Russell 1000 Value', '').then(function(rowRef) {
        if (rowRef.indexOf('Total') > -1) {
          if (rowRef.length - 1 !== dateRange.length) {
            expect(false).customError('Daily data range values are not within "4/30/2014 to 5/30/2014"' +
              ',Expected: ' + dateRange.length + '. Found: ' + rowRef.length - 1);
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "4/30/2014 - 5/30/2014"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '4/30/2014 - 5/30/2014') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('The Audit date range is not matched with "4/30/2014 - 5/30/2014"');
        }
      });
    });

    it('Verifying that Column Help section is diplayed with Title "Portfolio Total Return"', function() {
      AuditMode.getColumnHelpSectionName().getText().then(function(value) {
        if (value !== 'Portfolio Total Return') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Column Help section is not diplayed with Title "Portfolio Total Return"');
        }
      });
    });
  });

  describe('Test Step ID: 503626', function() {

    it('Should click on the "Port. Total Return" value for the date range: "5/29/2014 to 5/30/2014", in "Audit view"', function() {
      SlickGridFunctions.getCellReference('Total Return - Russell 1000 Value', '5/29/2014 to 5/30/2014', '', 'Port. Total Return').then(function(cellRef) {
        cellRef.click().then(function() { }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);

      //waiting for the elements to load in the browser.
      browser.sleep(2000);
    });

    it('Verifying audit section Title is "Port. Total Return - Russell 1000 Value"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Port. Total Return - Russell 1000 Value') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Port. Total Return - Russell 1000 Value". Found' + value);
        }
      });
    });

    it('Verifying that the Audit view displays "Total Return" Column values at security level', function() {
      AuditMode.getAllExpandCollapseButtonsFromCalculatedReport('Port. Total Return - Russell 1000 Value', rowClassName).each(function(reference) {
        reference.isPresent().then(function(found) {
          if (found) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('"Total Return" values are not displayed at security level');
          }
        });
      });
    });
  });

  describe('Test Step ID: 503657', function() {

    it('Should click on the "Russell 1000 Growth -> Total Return" value for "4/30/2014 to 5/30/2014" grouping in Report View and ' + 'select audit Value', function() {
      AuditMode.getValueFromCalculatedMultiHeaderReport('Performance', '4/30/2014 to 5/30/2014', 3, 0, true, 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right').then(function(reference) {
        reference.click().then(function() { }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);

      //waiting for the elements to load in the browser.
      browser.sleep(3000);
    });

    it('Verifying audit section Title is "Total Return - Russell 1000 Growth"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Total Return - Russell 1000 Growth') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Total Return - Russell 1000 Growth"');
        }
      });
    });

    var arr = ['Port. Total Return', 'Cumulative Port. Total Return'];
    arr.forEach(function(col, index) {
      dateRange.forEach(function(ref) {
        it('Verifying that Audit view should display "' + ref + '" values for "' + col + '"', function() {
          expect(AuditMode.getValueFromCalculatedMultiHeaderReport('Total Return - Russell 1000 Growth', ref, index + 1, true)).not.toBeNull();
        });
      });
    });

    it('Verifying that the daily data range values should be within "4/30/2014 to 5/30/2014".', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Total Return - Russell 1000 Growth', '').then(function(rowRef) {
        if (rowRef.indexOf('Total') > -1) {
          if (rowRef.length - 1 !== dateRange.length) {
            expect(false).customError('Daily data range values are not within "4/30/2014 to 5/30/2014"' + ',Expected: ' + dateRange.length + '. Found: ' + rowRef.length - 1);
            CommonFunctions.takeScreenShot();
          }
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that Date range at the top of the Audit view should display as "4/30/2014 - 5/30/2014"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '4/30/2014 - 5/30/2014') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Date range dis not matched with "4/30/2014 - 5/30/2014"');
        }
      });
    });
  });

  describe('Test Step ID: 503658', function() {

    it('Should click on the "Port. Total Return" value for "5/29/2014 to 5/30/2014" in "Audit View"', function() {
      SlickGridFunctions.getCellReference('Total Return - Russell 1000 Growth', '5/29/2014 to 5/30/2014', '', 'Port. Total Return').then(function(cellRef) {
        cellRef.click().then(function() { }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);

      //waiting for the elements to load in the browser.
      browser.sleep(2000);
    });

    it('Verifing that the Audit view displays "Port. Total Return" values at security level', function() {
      AuditMode.getAllExpandCollapseButtonsFromCalculatedReport('Total Return - Russell 1000 Growth', rowClassName).each(function(reference) {
        reference.isPresent().then(function(found) {
          if (found) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('"Port. Total Return" values are not displayed at security level');
          }
        });
      });
    });

    it('Verifying audit section Title is "Port. Total Return - Russell 1000 Growth"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Port. Total Return - Russell 1000 Growth') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Port. Total Return - Russell 1000 Growth". Found:' + value);
        }
      });
    });
  });

  describe('Test Step ID: 503665', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Done" button' + err);
      });
    });

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Characteristics - Summary', true, 'isSelected');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Characteristics - Summary');

    it('Should click on date hyperlink in "Characteristics - Summary" report', function() {
      var xpathInfobox = PA3MainPage.getDateHyperLink('Characteristics - Summary');
      ThiefHelpers.getInfoboxLinkClassReference(xpathInfobox).press().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    it('Verifying if infobox drop down is opened', function() {
      element(by.xpath('//tf-infobox[contains(@open,"opened")]')).isPresent().then(function(opened) {
        if (!opened) {
          expect(false).customError('Infobox dropdown is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "One Week Ago" from the End Date dropdown and verify the same', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').selectOptionByText('One Week Ago').then(function() { }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "One Week Ago" is set in End Date input box
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(text) {
        if (text !== 'One Week Ago') {
          expect(false).customError('"One Week Ago" is not set in "End Date" input box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the OK button', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() { }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should right click on the "Russell 1000 Value -> Data" value for "Dividend Yield" grouping and ' + 'select audit Value', function() {
      PA3MainPage.getCellValueForMultiHeaderColumn('Characteristics - Summary', 'Dividend Yield',
        1, rowClassName, colClassName, true).then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Should Wait for audit report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);

      //waiting for the elements to load in the browser.
      browser.sleep(3000);
    });

    var arr = ['Dividend Yield', 'Port. Ending Weight', 'Normalized Weight'];
    arr.forEach(function(column) {
      it('Verify that "Dividend yield" is Audited for all the securities for "' + column + '" column', function() {
        AuditMode.getAllCellsOfGivenColumn('Dividend Yield - Russell 1000 Value', column,
          'slick-pane slick-pane-bottom slick-pane-right').then(function(element) {
          element.forEach(function(ele) {
            ele.getText().then(function(value) {
              expect(value).not.toBeNull();
            });
          });
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Verifying audit section Title is "Dividend Yield - Russell 1000 Value"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Dividend Yield - Russell 1000 Value') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Dividend Yield - Russell 1000 Value"');
        }
      });
    });

    it('Verifying that Column Help section is diplayed with Title "Dividend Yield"', function() {
      AuditMode.getColumnHelpSectionName().getText().then(function(value) {
        if (value !== 'Dividend Yield') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Column Help section is not displayed with Title "Dividend Yield"');
        }
      });
    });
  });

  describe('Test Step ID: 503675', function() {

    it('Fetchng security name from the Audit report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Dividend Yield - Russell 1000 Value', '').then(function(rowRef) {
        if (rowRef.indexOf('Aaron\'s, Inc.') > -1) {
          secName = 'Aaron\'s, Inc.';
        } else {
          secName = rowRef[1];
        }
      });
    });

    it('Should Note the "Dividend Yield" value in Audit view', function() {
      SlickGridFunctions.getCellReference('Dividend Yield - Russell 1000 Value', secName, '', 'Dividend Yield').then(function(reference) {
        reference.getText().then(function(value) {
          auditValue = value;
        });
      });
    });

    it('Should click on the "Dividend Yield" Value for "' + secName + '" in "Audit view"', function() {
      SlickGridFunctions.getCellReference('Dividend Yield - Russell 1000 Value', secName, '', 'Dividend Yield').then(function(cellRef) {
        cellRef.click().then(function() { }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);

      //waiting for the elements to load in the browser.
      browser.sleep(2000);
    });

    it('Verifying that "Audit view" should contain "Report Input" section', function() {
      AuditMode.getReportInputsSection('Dividend Yield').isPresent().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit" is not showing "Report Input" section');
        }
      });
    });

    it('Verifying that Audit window should display the formula as ' +
      '"( AVAIL( FM_DIV( #EM, USD ), FM_DIV( #EM - 1, USD ) )/P_PRICE( USD #ED ) ) * 100"', function() {
      AuditMode.getFormulaSection().getText().then(function(val) {
        if (val.replace(/\n/g, '') !== '( AVAIL( FM_DIV( #EM, USD ), FM_DIV( #EM - 1, USD ) )/P_PRICE( #ED, USD ) ) * 100') {
          expect(false).customError('"Formula" section is not displayed with expected value');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that the value noted earlier should be same as value displayed in the "Audit View"', function() {
      AuditMode.getAuditViewHeaderValue().getText().then(function(value) {
        if (auditValue !== value) {
          expect(false).customError('Audit value is not matched with the expected value. Value noted earlier:' + auditValue + '. Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying audit section Title is "Dividend Yield"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Dividend Yield') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Dividend Yield"');
        }
      });
    });
  });

  describe('Test Step ID: 503677', function() {

    it('Should click on the "Russell 1000 Growth -> Data" value for "Price/Earnings->Weighted Average" value, in Report View ', function() {
      AuditMode.getValueFromCalculatedMultiHeaderReport('Characteristics - Summary', 'Weighted Average',
        3, 2, true, rowClassName, colClassName).then(function(reference) {
        reference.click().then(function() { }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);

      //waiting for the elements to load in the browser.
      browser.sleep(2000);
    });

    it('Verify that Audit View should display "Symbol", "Price/Earnings", "Port. Ending Weight" and "Normalized Weight" columns', function() {
      var arrOptions = ['Symbol', 'Price/Earnings', 'Port. Ending Weight', 'Normalized Weight'];
      SlickGridFunctions.getAllColumnFieldValue('Price/Earnings - Russell 1000 Growth').then(function(references) {
        arrOptions.forEach(function(columnName, index) {
          //Utilities.scrollElementToVisibility(columnName);
          if (references.indexOf(columnName) < 0) {
            CommonFunctions.takeScreenShot();
            expect(false).customError(columnName + ' Column is not found in the Audit report');
          }
        });
      });
    });

    it('Verify that Report view  "Price/Earnings - Weighted Average" value should match with Audit view  "Price/Earnings - ' + 'Weighted Average" value', function() {
      SlickGridFunctions.getCellReference('Characteristics - Summary', 'Weighted Average', '', 'Data', 'Russell 1000 Growth', 'Price/Earnings').then(function(ref) {
        ref.getText().then(function(reportValue) {
          SlickGridFunctions.getCellReference('Price/Earnings - Russell 1000 Growth', 'Weighted Average', '', 'Price/Earnings').then(function(auditRef) {
            auditRef.getText().then(function(auditValue) {
              if (parseFloat(reportValue).toFixed(1) !== parseFloat(auditValue).toFixed(1)) {
                CommonFunctions.takeScreenShot();
                expect(false).customError('Report and Audit view values are not matched. ' + 'Report Value:' + reportValue + ',Audit Value:' + auditValue);
              }
            });
          });
        });
      });
    });

    it('Verifying audit section Title is "Price/Earnings - Russell 1000 Growth"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Price/Earnings - Russell 1000 Growth') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Price/Earnings - Russell 1000 Growth"');
        }
      });
    });
  });

  describe('Test Step ID: 503679', function() {

    it('Should Note "Price/Earnings" column value for "A.O. Smith Corporation" in Audit view,', function() {
      SlickGridFunctions.getCellReference('Price/Earnings - Russell 1000 Growth', 'A. O. Smith Corporation', '', 'Price/Earnings').then(function(ele) {
        ele.getText().then(function(value) {
          auditValue = value;
        });
      });
    });

    it('Should click on the "Price/Earnings" Value for "A.O. Smith Corporation" in Audit view', function() {
      SlickGridFunctions.getCellReference('Price/Earnings - Russell 1000 Growth', 'A. O. Smith Corporation', '', 'Price/Earnings').then(function(reference) {
        reference.click().then(function() { }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);

      //waiting for the elements to load in the browser.
      browser.sleep(2000);
    });

    it('Verifying that "Audit view" should contain "Report Inputs" section', function() {
      AuditMode.getReportInputsSection('Price/Earnings').isPresent().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit" is not showing "Report Input" section');
        }
      });
    });

    it('Verifying that Audit window should display the formula as "AVAIL( IF( FA_ISO_CODE = P_CURRENCY_CODE, ( P_PRICE( #ED ) // \n' +
      'AVAIL( FF_EPS_SECS( MON, #EM ), FF_EPS_SECS( MON, #EM - \n1 ), FF_EPS( ANN, #EY ) ) ), ( P_PRICE( #CU #ED ) // \n' +
      'AVAIL( FF_EPS_SECS( MON, #EM, #CU ), FF_EPS_SECS( MON, #EM - \n' + '1, #CU ), FF_EPS( ANN, #EY, , #CU ) ) ) ) )"', function() {
      AuditMode.getFormulaSection().getText().then(function(val) {
        if (val.replace(/\n/g, '') !== 'AVAIL( IF( FA_ISO_CODE = P_CURRENCY_CODE, ( P_PRICE( #ED ) // ' +
          'AVAIL( FF_EPS_SECS( MON, #EM ), FF_EPS_SECS( MON, #EM - 1 ), FF_EPS( ANN, #EY ) ) ), ( P_PRICE( #ED, #CU ) // ' +
          'AVAIL( FF_EPS_SECS( MON, #EM, #CU ), FF_EPS_SECS( MON, #EM - ' + '1, #CU ), FF_EPS( ANN, #EY, , #CU ) ) ) ) )') {
          expect(false).customError('"Formula" section is not displayed with expected value');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that the value noted earlier should be same as value displayed in the Audit View"', function() {
      AuditMode.getAuditViewHeaderValue().getText().then(function(value) {
        expect(auditValue === value).customError('Audit value "' + value + '" is not matched with the value ' + 'noted earlier' + auditValue);
      });
    });

    it('Verify that audit section Title is "Price/Earnings"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Price/Earnings') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Price/Earnings"');
        }
      });
    });
  });

  describe('Test Step ID: 503882', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() { }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Performance', true, 'isSelected');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Performance');

    it('Should right click on the "Russell 1000-> Cumulative Total value" value for "Total" grouping and ' + 'select audit Value', function() {
      PA3MainPage.getCellValueForMultiHeaderColumn('Performance', 'Total', 2, rowClassName, colClassName, true).then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);

      //waiting for the elements to load in the browser.
      browser.sleep(2000);
    });

    it('Verify that Audit View display "Port Total Return" and "Cumulative Port. Total Return columns"', function() {
      var arrOptions = ['Port. Total Return', 'Cumulative Port. Total Return'];
      SlickGridFunctions.getAllColumnFieldValue('Total Return Cumulative - Russell 1000 Value').then(function(references) {
        arrOptions.forEach(function(columnName, index) {
          //Verifying the arrOptions value with the column names
          if (references.indexOf(columnName) < 0) {
            CommonFunctions.takeScreenShot();
            expect(false).customError(columnName + ' column is not seen in the Audit view.');
          }
        });
      });
    });

    it('Verifying that report view "Total Return Cumulative total value" should match with Audit view ' +
      '"Cumulative Port Total Return total  value"', function() {
      AuditMode.getValueFromCalculatedMultiHeaderReport('Performance', 'Total', 2, 0, undefined,
        rowClassName, colClassName).then(function(reportValue) {
        AuditMode.getValueFromCalculatedReport('Total Return Cumulative - Russell 1000 Value',
          'Total', 'Cumulative Port. Total Return', rowClassName, colClassName).then(function(auditValue) {
          if (parseFloat(reportValue).toFixed(2) !== parseFloat(auditValue).toFixed(2)) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('Report and Audit view values are not matched. ' +
              'Report value:' + reportValue + ', Audit value:' + auditValue);
          }
        });
      });
    });

    it('Verify if audit section Title is displayed as "Total Return Cumulative - Russell 1000 Value"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Total Return Cumulative - Russell 1000 Value') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Total Return Cumulative - Russell 1000 Value"');
        }
      });
    });

    it('Verify that Date Range from "Audit View" should match with the Date Range from "Report View"', function() {
      AuditMode.getReportDate('Performance').getWebElement().then(function(reportDateRef) {
        reportDateRef.getText().then(function(reportDate) {
          element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
            if (value !== reportDate) {
              CommonFunctions.takeScreenShot();
              expect(false).customError('The report date range is not matched with audit view');
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 503883', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() { }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Weights', true, 'isSelected');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should expand "Commercial Services|Advertising/Marketing Services" in "Weights" report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Commercial Services|Advertising/Marketing Services');

      // Verifying that "Commercial Services|Advertising/Marketing Services" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Commercial Services|Advertising/Marketing Services');

      //waiting for the elements to load in the browser.
      browser.sleep(3000);
    });

    it('Should right click on the "Dividend Yield" value for "Clear Channel Outdoor Holdings, Inc. Class A" and ' +
      'select "Audit Value"', function() {
      PA3MainPage.getValueFromCalculatedReport('Weights', 'Clear Channel Outdoor Holdings, Inc. Class A',
        'Dividend Yield', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right',
        true).then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Verifying audit section Title is "Dividend Yield"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Dividend Yield') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Dividend Yield"');
        }
      });
    });

    it('Verify that the value highlighted in report view should be same as value displayed in the Audit View"', function() {
      AuditMode.getValueFromCalculatedReport('Weights', 'Clear Channel Outdoor Holdings, Inc. Class A',
        'Dividend Yield', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right').then(function(reportValue) {
        AuditMode.getAuditViewHeaderValue().getText().then(function(auditValue) {
          AuditMode.roundAndMatch(reportValue, auditValue);
        });
      });
    });

    it('Verifying that Audit window should display the formula as ' +
      '"( AVAIL( FM_DIV( #EM, USD ), FM_DIV( #EM - 1, USD ) )/P_PRICE( USD #ED ) ) * 100"', function() {
      AuditMode.getFormulaSection().getText().then(function(val) {
        if (val.replace(/\n/g, '') !== '( AVAIL( FM_DIV( #EM, USD ), FM_DIV( #EM - 1, USD ) )/P_PRICE( #ED, USD ) ) * 100') {
          expect(false).customError('"Formula" section is not displayed with expected value');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 594086', function() {

    it('Should click on the "Wrench" icon in the "Audit View" ', function() {
      AuditMode.getWrenchIconInAuditView().click().then(function() { }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Toggle Formula" from the "Audit" Wrench dropdown', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Toggle Formula').then(function() { }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrReportInputs = ['FM_DIV( 03/2016, USD )', 'FM_DIV( 03/2016 - 1, USD )', 'P_PRICE( 03/31/2016, USD )'];
    var flag = 0;
    arrReportInputs.forEach(function(optionName, index) {
      it('Verfying the Report Input contains values for "' + optionName + '"', function() {
        AuditMode.getReportInputsSectionValues(index + 1, 1).getText().then(function(val) {
          expect(val === arrReportInputs[index]).customError('Report Input section does not have  "' + val + '" option');
          if (val !== arrReportInputs[index] && flag === 0) {
            CommonFunctions.takeScreenShot();
            flag = flag + 1;
          }
        });
      });
    });
  });

  describe('Test Step ID: 594337', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() { }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Attribution', true, 'isSelected');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    it('Should click on date hyperlink in "Attribution" report', function() {
      var xpathInfobox = PA3MainPage.getDateHyperLink('Attribution');
      ThiefHelpers.getInfoboxLinkClassReference(xpathInfobox).press().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    it('Verifying if infobox drop down is opened', function() {
      element(by.xpath('//tf-infobox[contains(@open,"opened")]')).isPresent().then(function(opened) {
        if (!opened) {
          expect(false).customError('Infobox dropdown is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "One Week Ago" from the Start Date dropdown and verify the same', function() {
      ThiefHelpers.getTextBoxClassReference('Start Date:').selectOptionByText('One Week Ago').then(function() { }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "One Week Ago" is set in Start Date input box
      ThiefHelpers.getTextBoxClassReference('Start Date:').getText().then(function(text) {
        if (text !== 'One Week Ago') {
          expect(false).customError('"One Week Ago" is not set in "Start Date" input box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the OK button', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() { }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should right click on the "Port. Average Weight" value for "Consumer Non-Durables > Altria Group Inc" and ' +
      'select "Audit Value"', function() {
      PA3MainPage.getValueFromCalculatedReport('Attribution', 'Altria Group Inc', 'Port. Average Weight',
        'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right', true).then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    AuditMode.verifyIfReportIsCalculated('Port. Average Weight');

    it('Verifying audit section Title is "Port. Average Weight"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Port. Average Weight') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Port. Average Weight"');
        }
      });

      //waiting for the elements to load in the browser.
      browser.sleep(3000);
    });

    it('Verify that Report view "Port. Average Weight" value should match with "Audit view - Port. Average Weight total" value', function() {
      SlickGridFunctions.getCellReference('Attribution', 'Altria Group Inc', '', 'Port. Average Weight',
        'Russell 1000 Value').then(function(reportValueRef) {
        reportValueRef.getText().then(function(reportValue) {
          SlickGridFunctions.getCellReference('Port. Average Weight', 'Total', '', 'Port. Average Weight').then(function(auditValueRef) {
            auditValueRef.getText().then(function(auditValue) {
              AuditMode.roundAndMatch(reportValue, auditValue);
            });
          });
        });
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that Date Range from "Audit View" should match with the Date Range from "Report View"', function() {
      AuditMode.getReportDate('Attribution').getWebElement().then(function(reportDateRef) {
        reportDateRef.getText().then(function(reportDate) {
          element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
            if (value !== reportDate) {
              CommonFunctions.takeScreenShot();
              expect(false).customError('The report date range is not matched with audit view');
            }
          });
        });
      });
    });

    it('Verify that "Audit" view should display "Port. Average Weight" against different date ranges', function() {
      var arrDate = [];
      var dateRanges = function(i) {
        Utilities.isDate(arrDate[i]).then(function(val) {
          if (!val) {
            expect(false).customError('Audit view is not shown for date range' + arrDate[i]);
            CommonFunctions.takeScreenShot();
          }
        });
      };

      SlickGridFunctions.getAllCellValuesFromSingleColumn('Port. Average Weight', '').then(function(eleRef) {
        eleRef.forEach(function(ele) {
          if (ele !== 'Total') {
            arrDate = ele.split(' to ');
            for (var i = 0; i <= 1; i++) {
              dateRanges(i);
            }
          }
        });
      });
    });
  });

  describe('Test Step ID: 600004', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() { }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    // Click on report wrench icon and select "Options" from the menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Attribution', 'Options');

    it('Verifying if view changed to "Tile Options - Attribution" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Attribution').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Weights" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Groupings" tab from LHP', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while selecting "Groupings":' + err);
      });

      // Verifying that view changed to "Groupings"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Groupings') {
          expect(false).customError('"Groupings" option is not seleced from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "X" Icon on "Economic Sector - FactSet" element to remove from list', function() {
      TileOptionsGroupings.getRemoveButtonOfElementInSelectedSection('Economic Sector - FactSet').click().then(function() { }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Economic Sector - FactSet" is removed from Selected section
      TileOptionsGroupings.getElementFromSelectedContainer('Economic Sector - FactSet').isPresent().then(function(option) {
        if (option) {
          expect(option).customError('"Economic Sector - FactSet" column was not deleted list.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'Index out of bound') {
          expect(true).toBeTruthy();
        }
      });
    });

    it('Should click on "OK" button', function() {
      TileOptions.getHeaderButton('OK').click().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking:' + err);
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    it('Verifing that the "PA3" report displays securities without any Groupings', function() {
      var i = 1;
      PA3MainPage.getAllExpandCollapseButtonsFromCalculatedReport('Attribution', 'slick-pane slick-pane-bottom slick-pane-left').each(function(reference) {
        reference.isPresent().then(function(found) {
          expect(found).customError('"Total Return" values are not displayed at security level');
          if (found && i === 1) {
            CommonFunctions.takeScreenShot();
            i = i + 1;
          }
        });
      });

      //waiting for the elements to load in the browser.
      browser.sleep(3000);
    });
  });

  describe('Test Step ID: 600005', function() {

    it('Should right click on the "Port. Average Weight" value for "Abbott Laboratoriesn" grouping and ' +
      'select "Audit Value"', function() {
      PA3MainPage.getValueFromCalculatedReport('Attribution', 'Abbott Laboratories', 'Port. Average Weight',
        undefined, undefined, true).then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    AuditMode.verifyIfReportIsCalculated('Port. Average Weight');

    it('Verify that "Audit" view should display "Port. Average Weight" against different date ranges', function() {
      var arrDate = [];
      var dateRanges = function(i) {
        Utilities.isDate(arrDate[i]).then(function(val) {
          if (!val) {
            expect(false).customError('Audit view is not shown for date range' + arrDate[i]);
            CommonFunctions.takeScreenShot();
          }
        });
      };

      SlickGridFunctions.getAllCellValuesFromSingleColumn('Port. Average Weight', '').then(function(eleRef) {
        eleRef.forEach(function(ele) {
          if (ele !== 'Total') {
            arrDate = ele.split(' to ');
            for (var i = 0; i <= 1; i++) {
              dateRanges(i);
            }
          }
        }, function() {

          expect(false).customError('"Audit" view is not displaying "Port. Average Weight" against different date ranges');
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Verifying audit section Title is "Port. Average Weight"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Port. Average Weight') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Port. Average Weight"');
        }
      });

      browser.sleep(3000);
    });

    it('Verify that Report view  "Port. Average Weight" value should match with Audit view  "Port. Average Weight" value', function() {
      SlickGridFunctions.getCellReference('Attribution', 'Abbott Laboratories', '', 'Port. Average Weight').then(function(reportValueRef) {
        reportValueRef.getText().then(function(reportValue) {
          SlickGridFunctions.getCellReference('Port. Average Weight', 'Total', '', 'Port. Average Weight').then(function(auditValueRef) {
            auditValueRef.getText().then(function(auditValue) {
              AuditMode.roundAndMatch(reportValue, auditValue);
            });
          });
        });
      });
    });

    it('Verify that Date Range from "Audit View" should match with the Date Range from "Report View"', function() {
      AuditMode.getReportDate('Attribution').getWebElement().then(function(reportDateRef) {
        reportDateRef.getText().then(function(reportDate) {
          element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
            if (value !== reportDate) {
              CommonFunctions.takeScreenShot();
              expect(false).customError('The report date range is not matched with audit view');
            }
          });
        });
      });
    });

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() { }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 678774', function() {

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports',
      'Contribution - Audit Tests', true, 'isSelected');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution - Audit Tests');

    it('Should right click on the "Total Return" value for "Communications > AT&T Inc" ticker and select audit Value', function() {
      SlickGridFunctions.getCellReference('Contribution - Audit Tests', 'AT&T Inc.', '',
        'Total Return', undefined, 'Communications').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Verify that application is changed to "AUDIT" mode', function() {
      AuditMode.isAuditMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit Mode" is not appeared on the screen');
        }
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verify that Report view "Total Return" value should match with Audit view "Total Return" value', function() {
      SlickGridFunctions.getCellReference('Contribution - Audit Tests', 'AT&T Inc.', '',
        'Total Return', undefined, 'Communications').then(function(reference) {
        reference.getText().then(function(reportValue) {
          AuditMode.getAuditViewHeaderValue().getText().then(function(auditValue) {
            AuditMode.roundAndMatch(reportValue, auditValue);
          });
        });
      });
    });
  });

  describe('Test Step ID: 678796', function() {

    it('Should Click on "Port. Total Return" value for "2/02/2015 to 2/03/2015" in Audit view', function() {
      SlickGridFunctions.getCellReference('Total Return', '2/02/2015 to 2/03/2015', '',
        'Port. Total Return').then(function(reference) {
        reference.click().then(function() { }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Verify that Report view "Port. Total Return" value should match with Audit view "Port. Ending Price"', function() {
      AuditMode.getAuditViewHeaderValue().getText().then(function(auditHeaderValue) {
        AuditMode.getReportInputsSectionValues(3, 2).getText().then(function(reportInputValue) {
          AuditMode.roundAndMatch(auditHeaderValue, reportInputValue);
        });
      });
    });

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() { }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 714918', function() {

    it('Should launch PA3 Application with "Client:;Pa3;Audit;AUDIT_DATE" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('audit-date');
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    // Click on the wrench icon of application toolbar and select "Document Options"
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSelectOption('Document Options');

    it('Verifying if "Document Options" page is opened', function() {
      ThiefHelpers.isModeBannerDisplayed('Document Options').then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "Document Options".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Date Options" tab under "Dates" from LHP', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Date Options', 'Dates').select();

      // Verifying if required is selected in the LHP
      ThiefHelpers.getOptionspaneItem(undefined, 'Date Options', 'Dates').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Date Options" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select on "DD/MM/YYYY" option from "Date Format:" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('DD/MM/YYYY', 'Date Format:');
    });

    it('Verifying "DD/MM/YYYY" option is selected from "Date Format:" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('DD/MM/YYYY', 'Date Format:');
    });

    // Click on "OK" button of header and verify if "Document options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document options');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');
  });

  describe('Test Step ID: 714919', function() {

    it('Should right click on the "Port. Total Return" value for "Commercial Services" grouping and and select "Audit Value"', function() {
      PA3MainPage.getValueFromCalculatedReport('Attribution', 'Commercial Services',
        'Port. Total Return', undefined, undefined, true).then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    AuditMode.verifyIfReportIsCalculated('Port. Total Return');

    it('Should click on the "Port. Total Return" value for the date range: "30/06/2017 to 25/07/2017", in "Audit view"', function() {
      SlickGridFunctions.getCellReference('Port. Total Return', '30/06/2017 to 25/07/2017', '', 'Port. Total Return').then(function(cellRef) {
        cellRef.click().then(function() { }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);
    });

    it('Should click on the "Port. Total Return" value for the date range: "24/07/2017 to 25/07/2017", in "Audit view"', function() {
      SlickGridFunctions.getCellReference('Port. Total Return', '24/07/2017 to 25/07/2017', '', 'Port. Total Return').then(function(cellRef) {
        cellRef.click().then(function() { }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);
    });

    it('Should click on the "Port. Total Return" value for "Booz Allen Hamilton Holding Corporation Class A" grouping, in "Audit view"', function() {
      SlickGridFunctions.getCellReference('Port. Total Return', 'Booz Allen Hamilton Holding Corporation Class A', '', 'Port. Total Return').then(function(cellRef) {
        cellRef.click().then(function() { }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000).then(function() { }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrOptions = ['Port. Beginning Price', 'Port. Ending Price', 'Port. Total Return'];
    arrOptions.forEach(function(optionName, index) {
      it('Verifying the report contain value for "' + optionName + '"', function() {
        AuditMode.getReportInputsSectionValues(index + 1, 1).getText().then(function(val) {
          if (val !== arrOptions[index]) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('"' + arrOptions[index] + '" is not found in the Audit report; Found: ' + val);
          } else {
            expect(AuditMode.getReportInputsSectionValues(index + 1, 2).getText()).not.toBeNull();
          }
        });
      });
    });
  });
});
