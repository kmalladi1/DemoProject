'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: audit-fixed-inc', function() {

  var selectedPortfolioEle = [];
  var selectedBenchmarkEle = [];
  var rowClassName = 'slick-pane slick-pane-bottom slick-pane-left';
  var colClassName = 'slick-pane slick-pane-bottom slick-pane-right';

  describe('Test Step ID: 549903', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "AUDIT_FI" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('audit-fi');
    });

    it('Should select "Automatic Calculation" option', function() {
      // Un-check "Automatic Calculation" to force re-check it
      PA3MainPage.getWrenchIcon().click();
      PA3MainPage.setAutomaticCalculation(false);

      // Click on Wrench button to select "Automatic Calculation"
      PA3MainPage.getWrenchIcon().click();
      expect(PA3MainPage.setAutomaticCalculation(true)).toBeTruthy();
    });

    it('Verify that "Weights" report calculated', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000);

      // Verifying if Weights report is calculated
      PA3MainPage.isReportCalculated('Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
      browser.sleep(3000);
    });

    it('Verifying that the report is grouped by "Economic Sector"', function() {
      // Verifying if the report is grouped by "Economic Sector"
      expect(PA3MainPage.getGroupingsHyperLink('Weights').getText()).toEqual('Economic Sector');
    });

  });

  describe('Test Step ID: 549910', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Portfolio', 'Prices', 'document options');

    selectedPortfolioEle = ['FactSet - Equity', 'Client Portfolio', 'FactSet - Options', 'Barclays', 'Barclays - FactSet',
      'Barclays Muni', 'Barclays Muni - FactSet', 'Barclays Inflation Linked',];
    it('Verifying if the expected elements are present in "Selected" section', function() {
      DocumentOptionsPricesPortfolio.getAllListElements('Prices', 'Selected').each(function(item, index) {
        item.getText().then(function(itemName) {
          // selectedPortfolioEle[ index ] = selectedPortfolioEle[ index ].replace( /\s\s+/g, ' ' );
          expect(itemName).toContain(selectedPortfolioEle[index]);
        });
      });
    });

  });

  describe('Test Step ID: 549911', function() {

    it('Should select "Benchmark" from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Benchmark', 'Prices').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(undefined, 'Benchmark', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Benchmark" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    selectedBenchmarkEle = ['ICE BofAML', 'ICE BofAML - FactSet'];
    it('Verifying if the expected elements are present in "Selected" section', function() {
      DocumentOptionsPricesBenchmark.getAllListElements('Prices', 'Selected').each(function(item, index) {
        item.getText().then(function(itemName) {
          //selectedBenchmarkEle[ index ] = selectedBenchmarkEle[ index ].replace( /\s\s+/g, ' ' );
          expect(itemName).toContain(selectedBenchmarkEle[index]);
        });
      });
    });

  });

  describe('Test Step ID: 549904', function() {

    it('Should click on "Cancel" button from application header', function() {
      DocumentOptions.getHeaderButton('Cancel').click();
    });

    it('Verify if "Document Options" view is closed after clicking on "Cancel" button', function() {
      expect(DocumentOptions.isDocumentOptionsMode()).toBeFalsy();
    });

    it('Should expand "Unassigned" Sector and verifying that "Alberta Energy Co. Ltd. 7.375% 01-nov-2031" is present under' +
      '"[Unassigned] section"', function() {
      browser.sleep(3000);
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', '[Unassigned]|[Unassigned]');

      // Verifying "Alberta Energy Co. Ltd. 7.375% 01-nov-2031" is present in the report
      PA3MainPage.getElementFromCalculatedTree('Weights', '[Unassigned]|[Unassigned]',
        'Alberta Energy Co. Ltd. 7.375% 01-nov-2031').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Alberta Energy Co. Ltd. 7.375% 01-nov-2031" is not present in the report');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should right click in the "Port. Ending Effective Duration" value for "Alberta Energy Co. Ltd. 7.375% 01-nov-2031" grouping',
      function() {
        browser.sleep(3000);
        PA3MainPage.getValueFromCalculatedReport('Weights', 'Alberta Energy Co. Ltd. 7.375% 01-nov-2031',
          'Port. Ending Effective Duration', rowClassName, colClassName, true).then(function(reference) {
          PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
        });
      });

    it('Verifying if the Application is launched in "AUDIT" mode', function() {
      expect(AuditMode.isAuditMode()).toBeTruthy();
    });

    it('Waiting for "Audit" report to calculate', function() {
      browser.sleep(3000);
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
      browser.sleep(3000);
    });

    selectedPortfolioEle.forEach(function(optionName, index) {
      it('Verifying the report contains values for "' + optionName + '"', function() {
        AuditMode.getReportInputsSectionValues(index + 1, 1).getText().then(function(itemName) {
          itemName = itemName.replace(/\s\s+/g, ' ');
          expect(itemName).toContain(selectedPortfolioEle[index]);
        });
      });

    });

    it('Verify that Security name in the Report view should match with security name in the Audit view', function() {
      AuditMode.getAuditViewSubHeaderName().getText().then(function(value) {
        AuditMode.getValueFromCalculatedReport('Weights', value,
          'Port. Ending Effective Duration', undefined, undefined, true).then(function(value) {
          expect(value.getAttribute('class')).toContain('selected');
        });
      });
    });

    var reportValue;
    var flag = 0;
    it('Verify that "Bloomberg Barclays" in Report Inputs section displays showing the same value as the actual column ' +
      'value being audited', function() {
      AuditMode.getValueFromCalculatedReport('Weights', 'Alberta Energy Co. Ltd. 7.375% 01-nov-2031',
        'Port. Ending Effective Duration', rowClassName, colClassName).then(function(value) {
        reportValue = parseFloat(value).toFixed(2);
        expect(AuditMode.getReportInputsSectionValues(4, 1).getText()).toEqual('Bloomberg Barclays');
        AuditMode.getReportInputsSectionValues(4, 2).getText().then(function(element) {
          var value2 = parseFloat(element).toFixed(2);
          if (value2 !== reportValue) {
            expect(false).customError('Bloomberg Barclays in Report Inputs section is not showing the ' +
              'same value as the actual column value being audited. Expected: "' + reportValue + '" ' +
              'Found: "' + value2 + '".');
            flag = 1;
          }
        });
      });
    });

    it('Verifying that "Port. Ending Effective Duration" contains same value as the actual column value being audited ' +
      'and is displayed beneath the Report Inputs ', function() {
      expect(AuditMode.getReportInputsSectionValues(9, 1).getText()).toEqual('Port. Ending Effective Duration');
      AuditMode.getReportInputsSectionValues(9, 2).getText().then(function(element) {
        var value = parseFloat(element).toFixed(2);
        if (value !== reportValue) {
          expect(false).customError('"Port. Ending Effective Duration" does\'nt contains same value as the' +
            'actual column value being audited and is displayed beneath the Report Inputs. ' +
            'Expected: "' + reportValue + '" Found: "' + value + '".');
          flag = 1;
        }

        if (flag === 1) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 549905', function() {

    it('In report view should click on the "Bench. Ending Effective Duration" value for "Alberta Energy Co. Ltd. 7.375% 01-nov-2031"', function() {
      AuditMode.getValueFromCalculatedReport('Weights', 'Alberta Energy Co. Ltd. 7.375% 01-nov-2031',
        'Bench. Ending Effective Duration', undefined, undefined, true).then(function(reference) {
        reference.click();
      });
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    var screenShot = 0;
    selectedBenchmarkEle.forEach(function(optionName, index) {
      it('Verifying the report contains values for "' + optionName + '"', function() {
        AuditMode.getReportInputsSectionValues(index + 1, 1).getText().then(function(itemName) {
          itemName = itemName.replace(/\s\s+/g, ' ');
          if (itemName !== selectedBenchmarkEle[index]) {
            screenShot++;
            expect(false).customError('"' + itemName + '" is not equal to "' + selectedBenchmarkEle[index] + '"');
            if (screenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });

    });

    it('Verifying that "Bench. Ending Effective Duration" is displayed beneath the Report Inputs ', function() {
      expect(AuditMode.getReportInputsSectionValues(3, 1).getText()).toEqual('Bench. Ending Effective Duration');
    });

    it('Verify that the value of Bench. Ending Effective Duration should be same in both audit and report value', function() {
      AuditMode.getValueFromCalculatedReport('Weights', 'Alberta Energy Co. Ltd. 7.375% 01-nov-2031',
        'Bench. Ending Effective Duration', rowClassName, colClassName).then(function(reportValue) {
        reportValue = parseFloat(reportValue).toFixed(2);
        AuditMode.getReportInputsSectionValues(3, 2).getText().then(function(element) {
          var value = parseFloat(element).toFixed(2);
          if (value !== reportValue) {
            expect(false).customError('Value of "Bench. Ending Effective Duration" ' +
              'is not same in both audit and report value. Expected: "' + reportValue + '" Found: "' + value + '".');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 549906', function() {

    it('In report view should click on the "Coupon Rate" value for "Alberta Energy Co. Ltd. 7.375% 01-nov-2031"', function() {
      AuditMode.getValueFromCalculatedReport('Weights', 'Alberta Energy Co. Ltd. 7.375% 01-nov-2031',
        'Coupon Rate', undefined, undefined, true).then(function(reference) {
        reference.click();
      });
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying audit section Title is "Coupon Rate"', function() {
      expect(AuditMode.getAuditViewHeaderName().getText()).toEqual('Coupon Rate');
    });

    it('Verifying that Audit window should display the formula as ' +
      'AVAIL( LBC_COUPON( #ED ), LBC_COUPON( #ED - 1 ), LBC_COUPON( #ED - 2 ) )', function() {
      AuditMode.getFormulaSection().getText().then(function(val) {
        if (val.replace(/\n/g, '') !== 'AVAIL( LBC_COUPON( #ED ), LBC_COUPON( #ED - 1 ), LBC_COUPON( #ED - 2 ) )') {
          expect(false).customError('"Formula" section is not displayed with expected value');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that Column Help section is displayed', function() {
      expect(AuditMode.getColumnHelpSectionName().getText()).toEqual('Coupon Rate');
    });

    it('Verifying that Column Help section is displayed with data "Coupon rate paid by the security. ' +
      'This value is expressed as a percentage."', function() {
      element(by.xpath(AuditMode.columnHelpSectionData)).getText().then(function(value) {
        var temp = value.split('\n');
        if (temp[1] !== 'Coupon rate paid by the security. This value is expressed as a percentage.') {
          expect(false).customError('Column Help section is displayed with "Coupon rate paid by the security. This value ' +
            'is expressed as a percentage.", found: ' + temp[1]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 549908', function() {

    it('In report view should click on the " Port. Ending Accrued Interest ( % )" value for ' +
      '"Alberta Energy Co. Ltd. 7.375% 01-nov-2031"', function() {
      AuditMode.getValueFromCalculatedReport('Weights', 'Alberta Energy Co. Ltd. 7.375% 01-nov-2031',
        'Port. Ending Accrued Interest ( % )', undefined, undefined, true).then(function(reference) {
        reference.click();
      });
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    var reportValue;
    var flag = 0;
    it('Verify that "Bloomberg Barclays" in Report Inputs section displays the same value as the actual column value' +
      ' being audited', function() {
      AuditMode.getValueFromCalculatedReport('Weights', 'Alberta Energy Co. Ltd. 7.375% 01-nov-2031',
        'Port. Ending Accrued Interest ( % )', rowClassName, colClassName).then(function(value) {
        reportValue = parseFloat(value).toFixed(4);
        expect(AuditMode.getReportInputsSectionValues(4, 1).getText()).toEqual('Bloomberg Barclays');
        AuditMode.getReportInputsSectionValues(4, 2).getText().then(function(value) {
          AuditMode.roundAndMatch(reportValue, value);
          if (value !== reportValue) {
            expect(false).customError('"Bloomberg Barclays in Report Inputs section not displaying ' +
              'the same value as the actual column value being audited. ' +
              'Expected: "' + reportValue + '" Found: "' + value + '".');
            flag = 1;
          }
        });
      });
    });

    it('Verifying that "Port. Ending Accrued Interest ( % )" displays the same value as the actual column value being audited ' +
      'and is displayed beneath the Report Inputs ', function() {
      expect(AuditMode.getReportInputsSectionValues(9, 1).getText()).toEqual('Port. Ending Accrued Interest ( % )');
      AuditMode.getReportInputsSectionValues(9, 2).getText().then(function(value) {
        if (value !== reportValue) {
          expect(false).customError(' "Port. Ending Accrued Interest ( % )"  not displaying the same value as the actual' +
            ' column value being audited and is displayed beneath the Report Inputs. ' +
            'Expected: "' + reportValue + '" Found: "' + value + '".');
          flag = 1;
        }

        if (flag === 1) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 549909', function() {

    it('In report view should click on the " Bench. Ending Accrued Interest ( % )" value for "Alberta Energy Co. Ltd. 7.375% 01-nov-2031"', function() {

      AuditMode.getValueFromCalculatedReport('Weights', 'Alberta Energy Co. Ltd. 7.375% 01-nov-2031',
        'Bench. Ending Accrued Interest ( % )', undefined, undefined, true).then(function(reference) {
        reference.click();
      });
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    var screenShot = 0;
    selectedBenchmarkEle.forEach(function(optionName, index) {
      it('Verifying the report contains values for "' + optionName + '"', function() {
        AuditMode.getReportInputsSectionValues(index + 1, 1).getText().then(function(itemName) {
          itemName = itemName.replace(/\s\s+/g, ' ');
          screenShot++;
          if (itemName !== selectedBenchmarkEle[index]) {
            expect(false).customError('"' + itemName + '" is not equal to "' + selectedBenchmarkEle[index] + '"');
            if (screenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });

    });

    var reportValue;
    var flag = 0;
    it('Verify that ICE BofAML in Report Inputs section displays the same value as the actual column value being audited',
      function() {
        AuditMode.getValueFromCalculatedReport('Weights', 'Alberta Energy Co. Ltd. 7.375% 01-nov-2031',
          'Bench. Ending Accrued Interest ( % )', rowClassName, colClassName).then(function(value) {
          reportValue = parseFloat(value).toFixed(4);
          AuditMode.getReportInputsSectionValues(1, 1).getText().then(function(value) {
            if (value !== 'ICE BofAML') {
              expect(false).customError('Report input section is not displayed with "ICE BofAML", Found:' + value);
              CommonFunctions.takeScreenShot();
            }
          });
          AuditMode.getReportInputsSectionValues(1, 2).getText().then(function(value) {
            if (value !== reportValue) {
              expect(false).customError('ICE BofAML in Report Inputs section not displaying ' +
                'the same value as the actual column value being audited. ' +
                'Expected: "' + reportValue + '" Found: "' + value + '".');
              flag = 1;
            }
          });
        });
      });

    it('Verifying that "Bench. Ending Accrued Interest ( % )" is displays the same value as the actual column value being audited ' +
      'and is displayed beneath the Report Inputs ', function() {
      expect(AuditMode.getReportInputsSectionValues(3, 1).getText()).toEqual('Bench. Ending Accrued Interest ( % )');
      AuditMode.getReportInputsSectionValues(3, 2).getText().then(function(value) {
        if (value !== reportValue) {
          expect(false).customError('"Bench. Ending Accrued Interest ( % )" is not displaying the same value as the actual' +
            ' column value being audited and is displayed beneath the Report Inputs. ' +
            'Expected: "' + reportValue + '" Found: "' + value + '".');
          flag = 1;
        }

        if (flag === 1) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 549907', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click();
    });

    it('Should verify that the report is dispalyed ', function() {
      browser.sleep(3000);
      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
      expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
    });
  });

});
