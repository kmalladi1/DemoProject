'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: audit-general', function() {

  var auditDate;
  var rowClassName = 'slick-pane slick-pane-top slick-pane-left';
  var colClassName = 'slick-pane slick-pane-top slick-pane-right';
  let arrOfTotalRows = [0, 1, 2, 3, 4, 5, 6, 7];

  describe('Test Step ID: 549912', function() {

    // Should open default document and un-check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should launch PA3 Application with "Client:/Pa3/Audit/AUDIT_DOC" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('audit-doc');
    });

    it('Verifying that "Weights" report is displayed blank.', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(found) {
        if (found) {
          expect(false).customError('"Weights" report is calculated');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 549913', function() {

    it('Should click on the "Wrench" icon in the "Weights " report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click();
    });

    it('Verify that "Audit" is not displayed in the "Weights" report dropdown', function() {
      expect(PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Audit').isPresent()).toBeFalsy();
    });
  });

  describe('Test Step ID: 549914', function() {

    it('Should click on the "Wrench" button on the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click();

      // Verifying if drop down menu appear
      expect(PA3MainPage.getWrenchIcon(true).isPresent()).toBeTruthy();
    });

    it('Should check "Automatic Calculation" option', function() {
      // check "Automatic Calculation" to force check it
      PA3MainPage.setAutomaticCalculation(true);

      // Click on Wrench button to un-check "Automatic Calculation"
      PA3MainPage.getWrenchIcon().click();
      expect(PA3MainPage.setAutomaticCalculation(false)).toBeTruthy();

      // check "Automatic Calculation" to force re-check it
      PA3MainPage.getWrenchIcon().click();
      PA3MainPage.setAutomaticCalculation(true);
    });

    it('Should wait for "Weights" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000);

      // Verifying if Contribution report is calculated
      expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
    });

    it('Should click on the "Wrench" icon in the "Weights " report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click();
    });

    it('select "Audit" from the "Weights" report Wrench Icon', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Audit').click();
    });

    it('Verify that application is changed to "AUDIT" mode', function() {
      expect(AuditMode.isAuditMode()).toBeTruthy();
    });

    it('Should contain a "Done" button in Audit view', function() {
      expect(AuditMode.getButton('Done').isPresent()).toBeTruthy();
      browser.sleep(4000);
    });

    it('Should wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verify that the top left most value ( Total- Port. Weight) in the Report view is highlighted in yellow', function() {
      AuditMode.getValueFromCalculatedReport('Weights', 'Total', 'Port. Weight', rowClassName, colClassName, true).then(function(value) {
        expect(value.getAttribute('class')).toContain('selected');
      });
    });

    it('Verifying that Column Help section is displayed with Title "Port. Ending Weight"', function() {
      expect(AuditMode.getColumnHelpSectionName().getText()).toEqual('Port. Ending Weight');
    });
  });

  describe('Test Step ID: 549915', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click();
    });

    it('Should select "Contribution - Audit Tests" from the LHP', function() {
      PA3MainPage.getReports('Contribution - Audit Tests').click();
    });

    it('Verify that "Contribution - Audit Tests" report calculated', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000);

      // Verifying if Contribution report is calculated
      PA3MainPage.isReportCalculated('Contribution - Audit Tests').then(function(displayed) {
        expect(displayed).customError('"Contribution - Audit Tests" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution - Audit Tests')).toBeTruthy();
        }
      });
    });

    it('Should click on the "Wrench" icon in the "Contribution - Audit Tests " report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Contribution - Audit Tests').click();
    });

    it('select "Audit" from the "Contribution - Audit Tests" report dropdown', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Audit').click();
    });

    it('Verify that application is changed to "AUDIT" mode', function() {
      expect(AuditMode.isAuditMode()).toBeTruthy();
    });

    it('Should contain a "Done" button in Audit view', function() {
      expect(AuditMode.getButton('Done').isPresent()).toBeTruthy();
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);
    });

    it('Verify that the top left most value (Total- Average Weight) in the Report view is highlighted in yellow', function() {
      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'Total', 'Average Weight', rowClassName, colClassName, true).then(function(value) {
        expect(value.getAttribute('class')).toContain('selected');
      });
    });

    it('Verifying that Column Help section is displayed with Title "Port. Average Weight"', function() {
      expect(AuditMode.getColumnHelpSectionName().getText()).toEqual('Port. Average Weight');
    });

    it('Should note the Date Range from Audit View for future verification', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(date) {
        auditDate = date;
      });
    });
  });

  describe('Test Step ID: 549918', function() {

    it('In the report view, drag the bottom scroll bar to extreme right hand side.', function() {
      AuditMode.getAllColumnOfCalculatedReport('Contribution - Audit Tests').each(function(eleRef, index) {
        if (index <= 15) {
          browser.actions().mouseMove(eleRef).perform();
        }
      });
    });

    it('Verify that Report View displays Ticker column.', function() {
      AuditMode.getAllColumnOfCalculatedReport('Contribution - Audit Tests').each(function(eleRef1, index) {
        if (index === 0) {
          expect(eleRef1.getText()).toEqual('Ticker');
          expect(eleRef1.isDisplayed()).toBeTruthy();
        }
      });
    });

    it('Verify that GroupNames Displayed in the Table', function() {
      AuditMode.getAllElementsFromCalculatedReport('Contribution - Audit Tests', 'slick-pane slick-pane-bottom slick-pane-left').each(function(references) {
        Utilities.scrollElementToVisibility(references);
        references.isDisplayed().then(function(flag) {
          if (!flag) {
            expect(false).customError('Group names are not displayed in the table');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 549916', function() {

    it('In report View Expand "Consumer Durables" and verify "Lennar Corporation Class A" is present in the tree', function() {
      AuditMode.expandTreeInCalculatedReport('Contribution - Audit Tests', 'Consumer Durables', 'Commercial Services');

      // Verifying that "Consumer Durables" is expanded
      AuditMode.checkIfTreeExpandedInCalculatedReport('Contribution - Audit Tests', 'Consumer Durables');
    });

    it('Should click on the "Average Weight" value for "Lennar Corporation Class A(LEN)" in report view', function() {
      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'LEN', 'Average Weight', undefined, undefined, true).then(function(reference) {
        reference.click();
      });
    });

    it('Waiting for "Audit" report to calculate', function() {
      browser.sleep(2000);
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying audit section Title is "Average Weight" and it should contain a value', function() {
      expect(AuditMode.getAuditViewHeaderName().getText()).toContain('Average Weight');
      expect(AuditMode.getAuditViewHeaderValue().getText()).not.toEqual('');
    });

    it('Verify that the value highlighted in report view should be same as value displayed in the Audit View"', function() {
      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'Lennar Corporation Class A', 'Average Weight', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right').then(function(reportValue) {
        AuditMode.getAuditViewHeaderValue().getText().then(function(value) {
          AuditMode.roundAndMatch(reportValue, value);
        });
      });
    });

    it('Verifying audit section Security Name is "Lennar Corporation Class A  (LEN)" ', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(value) {
        expect(value).toContain('Lennar Corporation Class A');
      });
    });

    it('Verify that Date Range from Audit View should match with the Date Range from previous step', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        expect(value).toEqual(auditDate);
      });
    });

    it('Verifying that Column Help section is displayed with Title "Port. Average Weight"', function() {
      expect(AuditMode.getColumnHelpSectionName().getText()).toEqual('Port. Average Weight');
    });
  });

  describe('Test Step ID: 549917', function() {

    it('Should click on the "Total Return" Value for "Consumer Durables-> LEN" in the report view', function() {
      AuditMode.getAllColumnOfCalculatedReport('Contribution - Audit Tests').each(function(eleRef, index) {
        if (index <= 5) {
          browser.actions().mouseMove(eleRef).perform();
        }
      });

      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'LEN', 'Total Return', undefined, undefined, true).then(function(reference) {
        reference.click();
      });
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);
    });

    var arrOptions = ['Port. Beginning Price', 'Port. Ending Price'];
    arrOptions.forEach(function(optionName, index) {
      it('Verifying the report contains values for "' + optionName + '"', function() {
        expect(AuditMode.getReportInputsSectionValues(index + 1, 1).getText()).toEqual(arrOptions[index]);
        expect(AuditMode.getReportInputsSectionValues(index + 1, 2).getText()).not.toBeNull();
      });
    });
  });

  describe('Test Step ID: 549919', function() {

    it('Should click on the "Price to Earnings" Value for "Consumer Durables-> LEN" in the report View ', function() {

      AuditMode.getAllColumnOfCalculatedReport('Contribution - Audit Tests').each(function(eleRef, index) {
        if (index <= 9) {
          browser.actions().mouseMove(eleRef).perform();
          eleRef.click();
        }
      });

      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'Lennar Corporation Class A', 'Price to Earnings', undefined, undefined, true).then(function(reference) {
        reference.click();
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verify that the value highlighted in report view should be same as value displayed in the Audit View"', function() {
      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'Lennar Corporation Class A', 'Price to Earnings', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right').then(function(reportValue) {
        AuditMode.getAuditViewHeaderValue().getText().then(function(value) {
          AuditMode.roundAndMatch(reportValue, value);
        });
      });
    });

    it('Verifying formula section is displayed in audit view', function() {
      AuditMode.getFormulaSection().getText().then(function(val) {
        if (val.replace(/\n/g, '') !== 'AVAIL( IF( FA_ISO_CODE = P_CURRENCY_CODE, ( P_PRICE( #ED ) // ' + 'AVAIL( FF_EPS_SECS( MON, #EM ), FF_EPS_SECS( MON, #EM - 1 ), FF_EPS( ANN, #EY ) ) ), ( P_PRICE( #ED, #CU ) // ' + 'AVAIL( FF_EPS_SECS( MON, #EM, #CU ), FF_EPS_SECS( MON, #EM - ' + '1, #CU ), FF_EPS( ANN, #EY, , #CU ) ) ) ) )') {
          expect(false).customError('"Formula" section is not displayed with expected value');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that Column Help section is diplayed with Title "Price / Earnings"', function() {
      expect(AuditMode.getColumnHelpSectionName().getText()).toEqual('Price / Earnings');
    });
  });

  describe('Test Step ID: 549922', function() {

    it('Should click on the "Wrench" icon in the "Audit View" ', function() {
      AuditMode.getWrenchIconInAuditView().click();
    });

    it('Should select "Toggle Formula" from the "Audit" Wrench dropdown', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Toggle Formula').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      browser.sleep(4000);
    });

    var arrOptions = ['FA_ISO_CODE', 'P_CURRENCY_CODE', 'P_PRICE( 20150206 )', 'FF_EPS_SECS( MON, 01/2015 )', 'FF_EPS_SECS( MON, 01/2015 - 1 )', 'FF_EPS( ANN, 2014 )', 'P_PRICE( 20150206, USD )', 'FF_EPS_SECS( MON, 01/2015, USD )', 'FF_EPS_SECS( MON, 01/2015 - 1, USD )', 'FF_EPS( ANN, 2014, , USD )', 'Price to Earnings'];
    var flag = 0;
    arrOptions.forEach(function(optionName, index) {
      it('Verifying that Report Input contains values for "' + optionName + '"', function() {
        AuditMode.getReportInputsSectionValues(index + 1, 1).getText().then(function(val) {
          expect(val === arrOptions[index]).customError('Report Input section does not have  "' + val + '" option');
          if (val !== arrOptions[index] && flag === 0) {
            CommonFunctions.takeScreenShot();
            flag = flag + 1;
          }
        });

        expect(AuditMode.getReportInputsSectionValues(index + 1, 2).getText()).not.toBeNull();
      });
    });
  });

  describe('Test Step ID: 549920', function() {

    it('In the report view, Should click on the Debt to Equity value for Consumer Durables->LEN ', function() {
      AuditMode.getAllColumnOfCalculatedReport('Contribution - Audit Tests').each(function(eleRef, index) {
        if (index <= 15) {
          browser.actions().mouseMove(eleRef).perform();
        }
      });

      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'Lennar Corporation Class A', 'Debt to Equity', undefined, undefined, true).then(function(reference) {
        reference.click();
      });
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);
    });

    it('Verifying formula section audit view is displayed as "FF_DEBT_EQ( QTR, #EQ )"', function() {
      expect(AuditMode.getFormulaSection().getText()).toEqual('FF_DEBT_EQ( QTR, #EQ )');
    });

    it('Verify that the value highlighted in report view should be same as value displayed in the Audit View"', function() {
      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'Lennar Corporation Class A', 'Debt to Equity', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right').then(function(reportValue) {
        AuditMode.getAuditViewHeaderValue().getText().then(function(value) {
          AuditMode.roundAndMatch(reportValue, value);
        });
      });
    });

    var arrOptions = ['Total Debt % Equity', 'Debt to Equity'];
    arrOptions.forEach(function(optionName, index) {
      it('Verifying the report contains values for "' + optionName + '"', function() {
        browser.sleep(1000);
        expect(AuditMode.getReportInputsSectionValues(index + 1, 1).getText()).toEqual(arrOptions[index]);
        expect(AuditMode.getReportInputsSectionValues(index + 1, 2).getText()).not.toBeNull();
      });
    });
  });

  describe('Test Step ID: 549923', function() {

    it('Should click on the "Wrench" icon in the "Audit View" ', function() {
      AuditMode.getWrenchIconInAuditView().click();
    });

    it('select "Toggle Formula" from the "Audit" Wrench drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Toggle Formula').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrOptions = ['FF_DEBT_EQ( QTR, 2014/4C )', 'Debt to Equity'];
    arrOptions.forEach(function(optionName, index) {
      it('Verfying the Report Input contains values for "' + optionName + '"', function() {
        expect(AuditMode.getReportInputsSectionValues(index + 1, 1).getText()).toEqual(arrOptions[index]);
      });
    });
  });

  describe('Test Step ID: 549921', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click();
    });

    it('Verifying that "Audit view" is closed without any issue', function() {
      AuditMode.isAuditMode().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit Mode" is not closed');
        }
      });
    });

    it('Verify that the application is displayed in normal mode', function() {
      expect(PA3MainPage.isNormalMode()).toBeTruthy();
    });
  });

  describe('Test Step ID: 716238', function() {

    it('Should select "Performance" report from LHP', function() {
      PA3MainPage.getReports('Performance').click();

      // Verifying that "Performance" report is selected
      PA3MainPage.getReports('Performance').getAttribute('class').then(function(ele) {
        if (ele.indexOf('selected') < 0) {
          expect(false).customError('Failed to click on "Performance" report in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait until "Performance" chart to calculate.', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Performance'), 200000);
    });

    it('Verify that "Performance" report calculated.', function() {
      PA3MainPage.isReportCalculated('Performance').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Error:Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Performance')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "wrench" icon in the report', function() {
      PA3MainPage.selectWrenchIcon('Performance');
    });

    it('Verifying if the "wrench" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Wrench" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Columns" from LHP', function() {
      ThiefHelpers.getOptionsPaneItemReference('Columns').select();

      // Verifying if "Columns" is selected from LHP
      TileOptions.getLHPOption('Columns').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Columns" did not select in LHP');
        }
      });
    });

    it('Should click on "Clear All" button from Selected section', function() {
      ThiefHelpers.getTransferBoxReference().target.clear();
    });

    it('Verifying if Selected section is empty', function() {
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsColumns.xpathSelectedContainer).getChildrenText().then(function(children) {
        if (children.length > 0) {
          expect(false).customError('Selected section is not empty');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "Port. Total" in the search field', function() {
      TileOptionsColumns.setSearchKeyword('Port. Total');

      // Verifying "Port. Total" is entered in search box or not
      element(by.xpath(TileOptionsColumns.xpathSearchField)).getAttribute('value').then(function(text) {
        if (text !== 'Port. Total') {
          expect(false).customError('"Port. Total" is not entered in search box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "Port. Total Return" option from Available section', function() {
      var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.getItemByText('Port. Total Return').then(function(item) {
        item.select();
        item.doubleClick();
      });
    });

    it('Verifying "Port. Total Return" option is added to selected section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Port. Total Return').isDisplayed().then(function(present) {
        if (!present) {
          expect(false).customError('"Port. Total Return" is not added to "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 716242', function() {

    it('Should highlight "Port. Total Return" from selected section', function() {
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection);

      group.getItemByText('Port. Total Return').isSelected().then(function(flag) {
        if (!flag) {
          group.getItemByText('Port. Total Return').select();
        }
      });
    });

    it('Should select "Additional Options" section from "Options" pane', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Additional Options').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Additional Options" section from "Options" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Notional Adjustment" from "Select an option..." drop down if not already selected', function() {
      ThiefHelpers.selectOptionFromDropDown('Notional Adjustment', undefined, TileOptionsColumns.xpathSelectAnOptionDropdown);
    });

    it('Should click on "OK" button from "Tile Options" page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait until "Performance" chart to calculate.', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Performance'), 200000);
    });

    it('Verify that "Performance" report calculated.', function() {
      PA3MainPage.isReportCalculated('Performance').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Error:Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Performance')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should right click on any date row and "Port. Total Return" column in "Performance" report and select "Audit Value" ', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Performance', '', '').then(function(colvalues) {
        SlickGridFunctions.getCellReference('Performance', colvalues[1], '', 'Port. Total Return', 'Russell 1000 Value').then(function(reference) {
          PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
        });
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verify that application is changed to "AUDIT" mode', function() {
      AuditMode.isAuditMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit Mode" is not appeared on the screen');
        }
      });
    });

    it('Verifying that the Audit view is displayed as "Auditing is unavailable for this column"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value === 'Auditing is unavailable for this column') {
          expect(false).customError('Audit view displays "Auditing is unavailable for this column"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID:720505', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click();
    });

    it('Verifying that "Audit view" is closed without any issue', function() {
      AuditMode.isAuditMode().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit Mode" is not closed');
        }
      });
    });

    it('Verify that the application is displayed in normal mode', function() {
      expect(PA3MainPage.isNormalMode()).toBeTruthy();
    });

  });

  describe(`Test Step ID: 771885`, () => {

    // Click on the Folder icon and click and select "New" from drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`New`);

    it('Click "Save Changes" on the "Document has changed" dialog', function() {
      element(by.xpath(CommonFunctions.replaceStringInXpath(CommonPageObjectsForPA3.xpathOfButtonOfDocumentHasChangedDialog, `Don't Save Changes`))).click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Document has changed" dialog box disappears', function() {
      element(by.xpath(CommonPageObjectsForPA3.xpathOfDocumentHasChangedDialog)).isPresent().then(function(present) {
        if (present) {
          expect(false).customError('"Document has changed" dialog is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Characteristics', 'Characteristics Overview', true, 'isSelected');

    let arrayOfReports = [`Summary Characteristics`, `Detail Characteristics`];

    arrayOfReports.forEach(reportName => {

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);
    });

    CommonPageObjectsForPA3.verifyIfChartIsDisplayed(`Characteristics Over Time`);

    it('Should right click on "Market Capitalization" group value from "Bench. Weight" column and select "Audit Value"', function() {
      SlickGridFunctions.getCellReference('Summary Characteristics', 'Market Capitalization', '', 'Data', 'Russell 1000 Value').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    AuditMode.verifyIfReportIsCalculated(`Market Capitalization - Russell 1000 Value`);

    it(`Double click on security column`, () => {
      SlickGridFunctions.getHeaderCellReference(`Market Capitalization - Russell 1000 Value`, `Symbol`).then(function(ref) {

        // Double clicking on the cell
        browser.actions().doubleClick(ref).perform();
      });
    });

    AuditMode.verifyIfReportIsCalculated(`Market Capitalization - Russell 1000 Value`);

    let arrOfSecurityNames = [];
    it('Storing the names to verify if the values are sorted in decending order', function() {
      arrOfTotalRows.forEach((value) => {
        SlickGridFunctions.getRowData('Market Capitalization - Russell 1000 Value', value, '').then(function(rowData) {
          arrOfSecurityNames.push(rowData[0]);
        });
      });
    });

    it(`Verifying if all the security names are displayed in decending order(Z-A)`, () => {
      let needScreenShot = 0;
      arrOfSecurityNames.reverse();
      arrOfTotalRows.forEach((value) => {
        SlickGridFunctions.getRowData('Market Capitalization - Russell 1000 Value', value, '').then(function(rowData) {
          if (rowData[0] === arrOfSecurityNames[value]) {
            expect(false).customError(`Expected: "${arrOfSecurityNames[value]}" but found: "${rowData[0]}" at index "${value}"`);
            needScreenShot++;
          }
        });
      });

      if (needScreenShot === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe(`Test Step ID: 771887`, () => {

    it(`Double click on security column`, () => {
      SlickGridFunctions.getHeaderCellReference(`Market Capitalization - Russell 1000 Value`, `Port. Ending Weight`).then(function(ref) {

        // Double clicking on the cell
        browser.actions().doubleClick(ref).perform();
      });
    });

    it(`Verify if downwards arrow is displayed`, () => {
      element(by.xpath(CommonFunctions.replaceStringInXpath(AuditMode.xpathOfArrowInAuditReportColumnHeader, 'desc'))).isPresent().
      then(present => {
        if (!present) {
          expect(false).customError(`"Down ward arrow is not present."`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    AuditMode.verifyIfReportIsCalculated(`Market Capitalization - Russell 1000 Value`);

    let arrOfPortEndingValues = [];
    it('Storing the values to verify if the values are sorted in decending order', function() {
      arrOfTotalRows.forEach((value) => {
        SlickGridFunctions.getRowData('Market Capitalization - Russell 1000 Value', value, '').then(function(rowData) {
          arrOfPortEndingValues.push(rowData[3]);
        });
      });
    });

    it(`Verify if the values are sorted in decending order`, () => {
      let needScreenShot = 0;
      arrOfPortEndingValues.reverse();
      arrOfTotalRows.forEach((value) => {
        SlickGridFunctions.getRowData('Market Capitalization - Russell 1000 Value', value, '').then(function(rowData) {
          if (rowData[3] === arrOfPortEndingValues[value]) {
            expect(false).customError(`Expected: "${arrOfPortEndingValues[value]}" but found: "${rowData[3]}" at "${value}".`);
            needScreenShot++;
          }
        });
      });

      if (needScreenShot === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe(`Test Step ID: 771889`, () => {

    let reportValue;
    it('Should click on the Data value for "Divide Yeild"', function() {
      SlickGridFunctions.getCellReference('Summary Characteristics', 'Dividend Yield', '', 'Data', 'Russell 1000 Value').then(function(reference) {
        reference.click();
        reference.getText().then(val => {
          reportValue = val;
        });
      });
    });

    AuditMode.verifyIfReportIsCalculated(`Dividend Yield - Russell 1000 Value`);

    it(`Verifying if "Divide Yeild" value of Report view is same as the value in "Audit" view`, function() {
      SlickGridFunctions.getRowData('Dividend Yield - Russell 1000 Value', 0, '').then(function(rowData) {
        AuditMode.roundAndMatch(reportValue, rowData[2]);
      });
    });

    AuditMode.verifyIfReportIsCalculated(`Dividend Yield - Russell 1000 Value`);

    it(`Double click on security column`, () => {
      SlickGridFunctions.getHeaderCellReference(`Dividend Yield - Russell 1000 Value`, `Symbol`).then(function(ref) {

        // Double clicking on the cell
        browser.actions().doubleClick(ref).perform();
      });
    });

    AuditMode.verifyIfReportIsCalculated(`Dividend Yield - Russell 1000 Value`);

    let arrOfSecurityNames = [];
    it('Storing the names to verify if the values are sorted in decending order', function() {
      arrOfTotalRows.forEach((value) => {
        SlickGridFunctions.getRowData('Dividend Yield - Russell 1000 Value', value, '').then(function(rowData) {
          arrOfSecurityNames.push(rowData[0]);
        });
      });
    });

    it(`Verifying if all the security names are displayed in decending order(Z-A)`, () => {
      let needScreenShot = 0;
      arrOfSecurityNames.reverse();
      arrOfTotalRows.forEach((value) => {
        SlickGridFunctions.getRowData('Dividend Yield - Russell 1000 Value', value, '').then(function(rowData) {
          if (rowData[0] === arrOfSecurityNames[value]) {
            expect(false).customError(`Expected: "${arrOfSecurityNames[value]}" but found: "${rowData[0]}" at "${value}".`);
            needScreenShot++;
          }
        });
      });

      if (needScreenShot === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe(`Test Step ID: 771890`, () => {

    it(`Double click on security column`, () => {
      SlickGridFunctions.getHeaderCellReference(`Dividend Yield - Russell 1000 Value`, `Dividend Yield`).then(function(ref) {

        // Double clicking on the cell
        browser.actions().doubleClick(ref).perform();
      });
    });

    it(`Verify if downwards arrow is displayed`, () => {
      element(by.xpath(CommonFunctions.replaceStringInXpath(AuditMode.xpathOfArrowInAuditReportColumnHeader, 'desc'))).isPresent().
      then(present => {
        if (!present) {
          expect(false).customError(`"Down ward arrow is not present."`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    let arrOfDivideYeildValues = [];
    it('Storing the values to verify if the values are sorted in decending order', function() {
      arrOfTotalRows.forEach((value) => {
        SlickGridFunctions.getRowData('Dividend Yield - Russell 1000 Value', value, '').then(function(rowData) {
          arrOfDivideYeildValues.push(rowData[3]);
        });
      });
    });

    it(`Verify if the values are sorted in decending order`, () => {
      let needScreenShot = 0;
      arrOfDivideYeildValues.reverse();
      arrOfTotalRows.forEach((value) => {
        SlickGridFunctions.getRowData('Dividend Yield - Russell 1000 Value', value, '').then(function(rowData) {
          if (rowData[3] === arrOfDivideYeildValues[value]) {
            expect(false).customError(`Expected: "${arrOfDivideYeildValues[value]}" but found: "${rowData[3]}" at "${value}".`);
            needScreenShot++;
          }
        });
      });

      if (needScreenShot === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

  });

});
