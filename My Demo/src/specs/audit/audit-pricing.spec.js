'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: audit-pricing', function() {

  var arrOptions = ['FactSet  -  Equity', 'Client Portfolio', 'FactSet  -  Options', 'Bloomberg Barclays  -  FactSet',
    'Bloomberg Barclays',];
  var subHeader;
  var headerName;

  describe('Test Step ID: 549863', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch PA3 Application with "Client:;Pa3;Audit;AUDIT_PRICING" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('audit-pricing');
    });

    it('Should select "Automatic Calculation" option', function() {
      // Un-check "Automatic Calculation" to force re-check it
      PA3MainPage.getWrenchIcon().click();
      PA3MainPage.setAutomaticCalculation(false);

      // Click on Wrench button to select "Automatic Calculation"
      PA3MainPage.getWrenchIcon().click();
      expect(PA3MainPage.setAutomaticCalculation(true)).toBeTruthy();
    });

    it('Should select "Contribution - Audit Tests" from the LHP', function() {
      PA3MainPage.getReports('Contribution - Audit Tests').click();
    });

    it('Should Wait for "Contribution - Audit Tests" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Contribution - Audit Tests" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Contribution - Audit Tests').then(function(displayed) {
        expect(displayed).customError('"Contribution - Audit Tests" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution - Audit Tests')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Contribution - Audit Tests" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      expect(PA3MainPage.getDialog('Calculation Error').isPresent()).toBeFalsy();
    });

    it('Verifying that report is grouped by "Economic Sector"', function() {
      expect(PA3MainPage.getGroupingsHyperLink('Contribution - Audit Tests').getText()).toContain('Economic Sector');
      browser.sleep(3000);
    });

  });

  describe('Test Step ID: 549864', function() {

    it('Should right click in the "Beginning Price Column" value for "Frontier Communications Corporation (FTR) ' +
      'and select "Audit Value"', function() {
      PA3MainPage.getValueFromCalculatedReport('Contribution - Audit Tests', 'FTR',
        'Beginning Price', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right',
        true).then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Verifying if the application is launched in "AUDIT" mode', function() {
      AuditMode.isAuditMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit Mode" is not appeared on the screen');
        }
      });
    });

    it('Should contain a "Done" button in Audit view', function() {
      AuditMode.getButton('Done').isPresent().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Done" button is not appeared on the screen');
        }
      });
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('verify that Report View Beginning Price value should match with Audit view Beginning Price.', function() {
      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'FTR',
        'Beginning Price', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right').then(function(reportValue) {
        AuditMode.getAuditViewHeaderValue().getText().then(function(value) {
          AuditMode.roundAndMatch(reportValue, value);
        });
      });
    });

    var flag = 0;
    arrOptions.forEach(function(optionName, index) {
      it('Verifying that audit view contains report input values for "' + optionName + '"', function() {
        browser.sleep(1000);
        AuditMode.getReportInputsSectionValues(index + 1, 1).getText().then(function(value) {
          if (value !== arrOptions[index]) {
            expect(false).customError('Report Inputs section does not contain value for "' + optionName + '"');
            flag = flag + 1;
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
        expect(AuditMode.getReportInputsSectionValues(index + 1, 2).getText()).not.toBeNull();
      });
    });

    it('Verifying that Column Help section is displayed with Title "Beginning Price"', function() {
      AuditMode.getColumnHelpSectionName().getText().then(function(name) {
        if (name !== 'Beginning Price') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Column Help section is not displayed with Title "Beginning Price". Found' + name);
        }
      });
    });

  });

  describe('Test Step ID: 549865', function() {

    it('In the report View Should click on the "Ending Price" Value for "Frontier Communications Corporation (FTR)"',
      function() {
        AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'FTR',
          'Ending Price', undefined, undefined, true).then(function(reference) {
          reference.click();
        });
      });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);
    });

    it('verify that Report View Ending Price value should match with Audit view Ending Price.', function() {
      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'FTR',
        'Ending Price', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right').then(function(reportValue) {
        AuditMode.getAuditViewHeaderValue().getText().then(function(value) {
          AuditMode.roundAndMatch(reportValue, value);
        });
      });
    });

    var flag = 0;
    arrOptions.forEach(function(optionName, index) {
      it('Verifying that audit view contains report input values for "' + optionName + '"', function() {
        browser.sleep(1000);
        AuditMode.getReportInputsSectionValues(index + 1, 1).getText().then(function(value) {
          if (value !== arrOptions[index]) {
            expect(false).customError('Report Inputs section does not contain value for "' + optionName + '"');
            flag = flag + 1;
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
        expect(AuditMode.getReportInputsSectionValues(index + 1, 2).getText()).not.toBeNull();
      });
    });

  });

  describe('Test Step ID: 549866', function() {

    it('In the report View Should click on the "Price Change (%)" Value for "Frontier Communications Corporation (FTR)"',
      function() {
        AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'FTR',
          'Price Change (%)', undefined, undefined, true).then(function(reference) {
          reference.click();
        });
      });

    it('Waiting for "Audit" report to calculate', function() {
      browser.sleep(4000);
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    var arrOptions = ['Beginning Price', 'Ending Price'];
    arrOptions.forEach(function(optionName, index) {
      it('Verifying that audit view contains report input values for "' + optionName + '"', function() {
        expect(AuditMode.getReportInputsSectionValues(index + 1, 1).getText()).toEqual(arrOptions[index]);
      });
    });

  });

  describe('Test Step ID: 549867', function() {

    var auditViewValue;
    it('Should store "Beginning Price" value for future reference', function() {
      AuditMode.getReportInputsSectionValues(1, 2).getText().then(function(value) {
        auditViewValue = value;
      });

    });

    it('In the Audit view, click on the Beginning Price value hyperlink ', function() {
      element(by.xpath(AuditMode.xpathReportInputsTable + '/tr[1]/td[2]/a')).click();
    });

    it('Waiting for "Audit" report to calculate', function() {
      browser.sleep(4000);
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying audit section Title is "Beginning Price"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Beginning Price') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Beginning Price". Found' + value);
        }
      });
    });

    it('Verifying that the Audit view header shows previously collected value next to "Beginning Price"', function() {
      AuditMode.getAuditViewHeaderValue().getText().then(function(value) {
        if (value !== auditViewValue) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Beginning Price" with ' +
            'value "' + auditViewValue + '". Found' + value);
        }
      });
    });

  });

  describe('Test Step ID: 549868', function() {

    it('Should click on left arrow button in the Audit View', function() {
      ThiefHelpers.getButtonClassReference(undefined, AuditMode.getArrowButton('left')).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on button from Audit View');
        CommonFunctions.takeScreenShot();
      });
    });

    var auditViewValue;
    it('Should store "Ending Price" value for future reference', function() {
      AuditMode.getReportInputsSectionValues(2, 2).getText().then(function(value) {
        auditViewValue = value;
      });
    });

    it('In the Audit view, click on the Ending Price value hyperlink ', function() {
      element(by.xpath(AuditMode.xpathReportInputsTable + '/tr[2]/td[2]/a')).click();
    });

    it('Verifying audit section Title is "Ending Price"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Ending Price') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Ending Price". Found' + value);
        }
      });
    });

    it('Verifying that the Audit view header shows previously collected value next to "Ending Price"', function() {
      AuditMode.getAuditViewHeaderValue().getText().then(function(value) {
        if (value !== auditViewValue) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Ending Price" with ' +
            'value "' + auditViewValue + '". Found' + value);
        }
      });
    });

  });

  describe('Test Step ID: 716741', function() {

    it('Should click on "Total Return" value for the "FTR" ticker, In report view', function() {
      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'FTR', 'Total Return', undefined, undefined, true).then(function(reference) {
        Utilities.scrollElementToVisibility(reference);
        reference.click().then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
      browser.sleep(2000);
    });

    var auditViewValue;
    it('Should store "Port. Beginning Price" value for future reference', function() {
      AuditMode.getReportInputsSectionValues(1, 2).getText().then(function(value) {
        auditViewValue = value;
      });

    });

    it('Should click on "Port. Beginning Price" value', function() {
      AuditMode.getReportInputsSectionValues(1, 2).$('a').click();
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
      browser.sleep(2000);
    });

    it('Verifying that the Audit view is calculated for "Port. Beginning Price"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Port. Beginning Price') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Port. Beginning Price". Found' + value);
        }
      });
    });

    it('Verifying that the Audit view header shows previously collected value next to "Port. Beginning Price"', function() {
      AuditMode.getAuditViewHeaderValue().getText().then(function(value) {
        if (value !== auditViewValue) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Port. Beginning Price" with value "' + auditViewValue + '". Found' + value);
        }
      });
    });

    arrOptions.forEach(function(reportInput, index) {
      it('Verify if "' + reportInput + '" has value or --', function() {
        AuditMode.getReportInputsSectionValues(index + 1, 1).getText().then(function(text) {
          if (text === reportInput) {
            AuditMode.getReportInputsSectionValues(index + 1, 2).getText().then(function(value) {
              if (value === '') {
                expect(false).customError('Value is not seen for "' + reportInput + '"');
                CommonFunctions.takeScreenShot();
              }
            });
          } else {
            expect(false).customError('"' + reportInput + '" not found at "' + index + 1 + '" row.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verify if value next to "Port. Beginning Price" is same as previously collected value', function() {
      AuditMode.getReportInputsSectionValues(6, 2).getText().then(function(value) {
        if (value !== auditViewValue) {
          expect(false).customError('Value next to "Port. Beginning Price" is not equal to "' + auditViewValue + '". Found' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 716742', function() {

    it('Should click on left arrow button in the Audit View', function() {
      ThiefHelpers.getButtonClassReference(undefined, AuditMode.getArrowButton('left')).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on button from Audit View');
        CommonFunctions.takeScreenShot();
      });
    });

    var auditViewValue;
    it('Should store "Port. Ending Price" value for future reference', function() {
      AuditMode.getReportInputsSectionValues(2, 2).getText().then(function(value) {
        auditViewValue = value;
      });

    });

    it('Should click on "Port. Ending Price" value hyperlink', function() {
      AuditMode.getReportInputsSectionValues(2, 2).$('a').click();
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
      browser.sleep(2000);
    });

    it('Verifying that the Audit view is calculated for "Port. Ending Price"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Port. Ending Price') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Port. Ending Price". Found' + value);
        }
      });
    });

    it('Verifying that the Audit view header shows previously collected value next to "Port. Ending Price"', function() {
      AuditMode.getAuditViewHeaderValue().getText().then(function(value) {
        if (value !== auditViewValue) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Port. Ending Price" with value "' + auditViewValue + '". Found' + value);
        }
      });
    });

    arrOptions.forEach(function(reportInput, index) {
      it('Verify if "' + reportInput + '" has value or --', function() {
        AuditMode.getReportInputsSectionValues(index + 1, 1).getText().then(function(text) {
          if (text === reportInput) {
            AuditMode.getReportInputsSectionValues(index + 1, 2).getText().then(function(value) {
              if (value === '') {
                expect(false).customError('Value is not seen for "' + reportInput + '"');
                CommonFunctions.takeScreenShot();
              }
            });
          } else {
            expect(false).customError('"' + reportInput + '" not found at "' + index + 1 + '" row.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verify if value next to "Port. Ending Price" is same as previously collected value', function() {
      AuditMode.getReportInputsSectionValues(6, 2).getText().then(function(value) {
        if (value !== auditViewValue) {
          expect(false).customError('Value next to "Port. Ending Price" is not equal to "' + auditViewValue + '". Found' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 549869', function() {

    it('Should click on left arrow button in the Audit View', function() {
      ThiefHelpers.getButtonClassReference(undefined, AuditMode.getArrowButton('left')).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on button from Audit View');
        CommonFunctions.takeScreenShot();
      });
    });

    it('In the report View Should click on the "Market Capitalization" Value for "Frontier Communications Corporation (FTR)"',
      function() {
        AuditMode.getAllColumnOfCalculatedReport('Contribution - Audit Tests').each(function(eleRef, index) {
          if (index <= 8) {
            browser.actions().mouseMove(eleRef).perform();
          }
        });
        AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'FTR',
          'Market Capitalization', undefined, undefined, true).then(function(reference) {
          reference.click();
        });
      });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);
    });

    it('Verifying that Audit window should display the formula as CM_MKT_VALUE( #EM ) * P( #CU #ED )/P( #ED )', function() {
      expect(AuditMode.getFormulaSection().getText()).toEqual('CM_MKT_VALUE( #EM ) * P_PRICE( #ED, #CU )/P_PRICE( #ED )');
    });

    it('verify that Report View Market Capitalization value should match with Audit view Market Capitalization value', function() {
      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'FTR',
        'Market Capitalization', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right').then(function(reportValue) {
        AuditMode.getAuditViewHeaderValue().getText().then(function(value) {
          AuditMode.roundAndMatch(reportValue, value);
          AuditMode.getReportInputsSectionValues(4, 2).getText().then(function(val) {
            AuditMode.roundAndMatch(reportValue, val);
          });
        });
      });
    });

  });

  describe('Test Step ID: 549870', function() {

    it('In the report View Should click on the "Price to Earnings" Value for "Frontier Communications Corporation (FTR)"',
      function() {
        AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'FTR',
          'Price to Earnings', undefined, undefined, true).then(function(reference) {
          reference.click();
        });
      });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying that Audit window should display the formula as CM_MKT_VALUEP( #ED ) // AVAIL( MEPS( #EM ), MEPS( #EM - 1 ) )',
      function() {
        expect(AuditMode.getFormulaSection().getText()).toEqual('P( #ED ) // AVAIL( MEPS( #EM ), MEPS( #EM - 1 ) )');
      });

    it('verify that Report View Price to Earnings value should match with Audit view Price to Earnings value', function() {
      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'FTR',
        'Price to Earnings', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right').then(function(reportValue) {
        AuditMode.getAuditViewHeaderValue().getText().then(function(value) {
          AuditMode.roundAndMatch(reportValue, value);
          AuditMode.getReportInputsSectionValues(4, 2).getText().then(function(val) {
            AuditMode.roundAndMatch(reportValue, val);
          });
        });
      });
    });

  });

  describe('Test Step ID: 549871', function() {

    it('In the report View Should click on the "Long EV/EBITDA" Value for "Frontier Communications Corporation (FTR)"',
      function() {
        AuditMode.getAllColumnOfCalculatedReport('Contribution - Audit Tests').each(function(eleRef, index) {
          if (index <= 12) {
            browser.actions().mouseMove(eleRef).perform();
          }
        });
        AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'FTR',
          'Long EV/EBITDA', undefined, undefined, true).then(function(reference) {
          reference.click();
        });
      });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying that Audit window should display the formula', function() {
      AuditMode.getFormulaSection().getText().then(function(text) {
        text = text.replace('\n', '').replace('\n', '').replace('\n', '').replace('\n', '').replace('\n', '').replace('\n', '').replace('\n', '');
        if (text !== 'AVAIL( FF_ENTRPR_VAL( QTR, 0 ) // ( ( FF_SALES( QTR, 0 ) - ( FF_COGS_XDEP( QTR, 0 ) + ' +
          'FF_DEP_AMORT_EXP( QTR, 0 ) ) - FF_SGA( QTR, 0 ) - FF_OPER_EXP_OTH( QTR, 0 ) ) + FF_DEP_AMORT_EXP( QTR, 0 ) ),' +
          ' FF_ENTRPR_VAL( QTR, 0 ) // ( ( FF_SALES( QTR,  - 1 ) - ( FF_COGS_XDEP( QTR,  - 1 ) + ' +
          'FF_DEP_AMORT_EXP( QTR,  - 1 ) ) - FF_SGA( QTR,  - 1 ) - FF_OPER_EXP_OTH( QTR,  - 1 ) ) + ' +
          'FF_DEP_AMORT_EXP( QTR,  - 1 ) ) )') {
          expect(false).customError('Error');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('verify that Report View Long EV/EBITDA value should match with Audit view Long EV/EBITDA', function() {
      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'FTR',
        'Long EV/EBITDA', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right').then(function(reportValue) {
        AuditMode.getAuditViewHeaderValue().getText().then(function(value) {
          AuditMode.roundAndMatch(reportValue, value);
        });
      });
    });

  });

  describe('Test Step ID: 549872', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click();
    });

    it('Verifying that "Audit view" is closed without any issue', function() {
      expect(AuditMode.isAuditMode()).toBeFalsy();
    });

    it('Verify that the application is displayed in normal mode', function() {
      expect(PA3MainPage.isNormalMode()).toBeTruthy();
    });

  });

});
