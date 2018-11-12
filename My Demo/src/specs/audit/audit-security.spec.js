'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: audit-security', function() {

  var rowClassName = 'slick-pane slick-pane-bottom slick-pane-left';
  var colclassName = 'slick-pane slick-pane-bottom slick-pane-right';

  describe('Test Step ID: 549873', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch PA3 Application with "Client:;Pa3;Audit;AUDIT_SECURITY" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('audit-security');
    });

    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSetAutomaticCalculation(true);

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Contribution - Audit Tests', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution - Audit Tests');

    it('Verifying that report is grouped by "Economic Sector"', function() {
      expect(PA3MainPage.getGroupingsHyperLink('Contribution - Audit Tests').getText()).toContain('Economic Sector');
      browser.sleep(3000);
    });

  });

  describe('Test Step ID: 549874', function() {

    it('Should right click in the "Contribution To Return" Column value for ' +
      '"Frontier Communications Corporation Class B (FTR) and select "Audit Value"', function() {
      PA3MainPage.getValueFromCalculatedReport('Contribution - Audit Tests', 'FTR',
        'Contribution To Return', rowClassName, colclassName, 'true').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Verifying if the Application is launched in "AUDIT" mode', function() {
      AuditMode.isAuditMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit Mode" is not appeared on the screen');
        }
      });
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);
    });

    it('Verify that Report View Contribution To Return value should match with Audit view Contribution To Return value', function() {
      AuditMode.getAllColumnOfCalculatedReport('Contribution - Audit Tests').each(function(eleRef, index) {
        if (index <= 6) {
          browser.actions().mouseMove(eleRef).perform();
        }
      });

      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'FTR', 'Contribution To Return',
        rowClassName, colclassName).then(function(reportValue) {
        AuditMode.getReportInputsSectionValues(3, 2).getText().then(function(value) {
          AuditMode.roundAndMatch(reportValue, value);
        });
      });
    });

    var arrOptions = ['Port. Beginning Weight', 'Port. Total Return'];
    arrOptions.forEach(function(optionName, index) {
      it('Verifying that audit view contains report input values for "' + optionName + '"', function() {
        expect(AuditMode.getReportInputsSectionValues(index + 1, 1).getText()).toEqual(arrOptions[index]);
        expect(AuditMode.getReportInputsSectionValues(index + 1, 2).getText()).not.toBeNull();
      });
    });

    it('Verify that Date Range from Report View should match with the Date Range in the Audit View', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(auditDate) {
        element(by.xpath(AuditMode.xpathReportDate)).getText().then(function(reportDate) {
          if (auditDate !== reportDate) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('Date Range from "Report" View is not matched with "Audit View"');
          }
        });
      });
    });

    it('Verifying audit section Security Name contains Ticker "(FTR)" ', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(value) {
        if (value.indexOf('(FTR)') <= -1) {
          expect(false).customError('Security value did not "(FTR)"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that Column Help section is displayed with Title "Port. Contribution to Return"', function() {
      expect(AuditMode.getColumnHelpSectionName().getText()).toEqual('Port. Contribution to Return');
    });

  });

  describe('Test Step ID: 549875', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click();
    });

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Contribution - Audit Tests', 'Options');

    it('Verifying if view changed to "Tile Options - Contribution - Audit Tests" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Contribution - Audit Tests').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Contribution - Audit Tests" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Columns" tab in the LHP of tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').select();

      // Verifying if "Columns" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Columns" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Definition" in "Options" pane', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Definition').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Definition" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Symbol" from "Definition" Section dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Symbol', undefined, TileOptionsColumns.xpathDefinitionDropDown);

      // verifying if 'Symbol' is selected from "Definition" section dropdown
      ThiefHelpers.verifySelectedDropDownText('Symbol', undefined, TileOptionsColumns.xpathDefinitionDropDown);

      //TileOptionsColumns.getDropDownFromDefinitionSection().click();
    });

  });

  describe('Test Step ID: 549876', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution - Audit Tests');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution - Audit Tests');

    var symbolName;
    var arrSymbols = [];
    it('Should right click in the "Contribution To Return" Column value for 35906A10 symbol (pick any symbol within group if unable to find 35906A10 Symbol)' +
      'and select "Audit Value"', function() {
      SlickGridFunctions.getElementsFromTree('Contribution - Audit Tests', '', 'Communications', '').then(function(reference) {
        reference.forEach(function(rowname) {
          SlickGridFunctions.getCellReference('Contribution - Audit Tests', rowname, '', 'Symbol', '', undefined).then(function(reference) {
            reference.getText().then(function(value) {
              arrSymbols.push(value);
            });
          });
        });

        return arrSymbols;
      }).then(function(arrSymbols) {
        if (arrSymbols.indexOf('35906A10') > -1) {
          symbolName = '35906A10';
          PA3MainPage.getValueFromCalculatedReport('Contribution - Audit Tests', '35906A10',
            'Contribution To Return', rowClassName, colclassName, true).then(function(reference) {
            PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
          });
        } else {
          symbolName = arrSymbols[0];
          PA3MainPage.getValueFromCalculatedReport('Contribution - Audit Tests', arrSymbols[0],
            'Contribution To Return', rowClassName, colclassName, true).then(function(reference) {
            PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
          });
        }
      });
    });

    it('Verifying if the Application is launched in "AUDIT" mode', function() {
      AuditMode.isAuditMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit Mode" is not appeared on the screen');
        }
      });
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);
    });

    it('Verify that Report View "Contribution To Return" value should match with Audit view "Contribution To Return" value',
      function() {
        AuditMode.getAllColumnOfCalculatedReport('Contribution - Audit Tests').each(function(eleRef, index) {
          if (index <= 8) {
            browser.actions().mouseMove(eleRef).perform();
          }
        });

        AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', symbolName, 'Contribution To Return',
          rowClassName, colclassName).then(function(reportValue) {
          AuditMode.getAuditViewHeaderValue().getText().then(function(value) {
            AuditMode.roundAndMatch(reportValue, value);
            AuditMode.getReportInputsSectionValues(3, 2).getText().then(function(auditValue) {
              AuditMode.roundAndMatch(reportValue, auditValue);
            });
          });
        });
      });

    it('verify that Symbol in the Report view should match with the symbol in the Audit view.', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(headerText) {
        if (headerText.indexOf(symbolName) < 0) {
          expect(false).customError('Symbol in the Report view did not match with the symbol in the Audit view. ' +
            'Expected:"' + symbolName + '", found"' + headerText + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 549877', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click();
    });

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Weights', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Options');

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Weights" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Columns" tab in the LHP of tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').select();

      // Verifying if "Columns" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Columns" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Definition" in "Options" pane', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Definition').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Definition" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Click on the dropdown from Definition Section', function() {
      TileOptionsColumns.getDropDownFromDefinitionSection().click();
    });

    it('Should select "Ticker-Region" from Report Frequency dropdown', function() {
      TileOptionsColumns.getDropDownOptionFromDefinitionSection('Ticker-Region').click();
    });

    it('Should expand "Format" in "Options" pane', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Format').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Format" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Check the Show Column check box if it is unchecked', function() {
      expect(TileOptionsColumns.setShowColumnCheckBox(true)).toBeTruthy();
    });

    it('Verify that the "Ticker-Region" is seen at the top of the Selected section', function() {
      expect(TileOptionsColumns.getIndexFromSelected('Ticker-Region')).toEqual(0);
    });

  });

  describe('Test Step ID: 549878', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Expand "Consumer Durables > Home Furnishings." and verify  JAH-US is present in the tree', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Consumer Durables|Home Furnishings');

      // Verifying that "Consumer Durables > Home Furnishings" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Consumer Durables|Home Furnishings');

      // Verifying "JAH-US" is present in the report
      PA3MainPage.getElementFromCalculatedTree('Weights', 'Consumer Durables|Home Furnishings', 'JAH-US').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"JAH-US" is not present under "Consumer Durables > Home Furnishings"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should right click in the "Bench. Weight Column" value for "JAH-US" and select "Audit Value"', function() {
      PA3MainPage.getValueFromCalculatedReport('Weights', 'JAH-US', 'Bench. Weight',
        'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right', 'true').then(
        function(reference) {
          PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
        });

      browser.sleep(4000);
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);
    });

    it('verify that Symbol in the Report view should match with the symbol in the Audit view.', function() {
      expect(AuditMode.getAuditViewSubHeader().getText()).toContain('(JAH-US)');
    });

  });

  describe('Test Step ID: 549879', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Options');

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Weights" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Columns" tab in the LHP of tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').select();

      // Verifying if "Columns" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Columns" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Definition" in "Options" pane', function() {
      expect(TileOptionsColumns.expandSectionInOptionsPane('Definition')).toBeTruthy();
    });

    it('Should Click on the dropdown from Definition Section', function() {
      browser.actions().mouseMove(TileOptionsColumns.getDropDownFromDefinitionSection(), 5, 5).click().perform();
    });

    it('Should select "Ticker" from Definition section dropdown', function() {
      TileOptionsColumns.getDropDownOptionFromDefinitionSection('Ticker').click();
    });

    it('Should expand "Format" in "Options" pane', function() {
      expect(TileOptionsColumns.expandSectionInOptionsPane('Format')).toBeTruthy();
    });

    it('Should un-check the "Show Column" check box if it is unchecked', function() {
      expect(TileOptionsColumns.setShowColumnCheckBox(false)).toBeTruthy();
    });

  });

  describe('Test Step ID: 549880', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should right click in the "Contribution To Return" Column value for "Jarden Corporation" and select "Audit Value"',
      function() {
        PA3MainPage.getValueFromCalculatedReport('Weights', 'Jarden Corporation', 'Bench. Weight', rowClassName,
          colclassName, 'true').then(function(reference) {
          PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
        });
      });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);
    });

    it('verify that hidden ticker is displayed in the Audit view.', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(value) {
        expect(value).toContain('(JAH)');
      });
    });

  });

  describe('Test Step ID: 549881', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Contribution - Audit Tests', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution - Audit Tests');

    it('Should right click in the "Price Change (%)" value for "98919V10" and select "Audit Value"', function() {

      PA3MainPage.getValueFromCalculatedReport('Contribution - Audit Tests', '98919V10', 'Price Change (%)',
        rowClassName, colclassName, 'true').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');

      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          PA3MainPage.getValueFromCalculatedReport('Contribution - Audit Tests', '98919V10', 'Price Change (%)',
            rowClassName, colclassName, 'true').then(function(reference) {
            PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
          });
        }
      });
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);
    });

    var arrOptions = ['Beginning Price', 'Ending Price'];
    arrOptions.forEach(function(optionName, index) {
      it('Verifying that audit view contains report input values for "' + optionName + '"', function() {
        expect(AuditMode.getReportInputsSectionValues(index + 1, 1).getText()).toEqual(arrOptions[index]);
        expect(AuditMode.getReportInputsSectionValues(index + 1, 2).getText()).not.toBeNull();
      });
    });

    it('Verifying that Audit window should not display the formula section', function() {
      AuditMode.getFormulaSection().isPresent().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Formula section is displayed in the Audit window');
        }
      });
    });

  });

  describe('Test Step ID: 549882', function() {

    it('In the report View Should click on the "Market Capitalization" Value for "98919V10"', function() {
      AuditMode.getAllColumnOfCalculatedReport('Contribution - Audit Tests').each(function(eleRef, index) {
        if (index <= 9) {
          browser.actions().mouseMove(eleRef).perform();
        }
      });

      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', '98919V10', 'Market Capitalization',
        undefined, undefined, true).then(function(reference) {
        reference.click();
      });
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying that Audit window should display the formula as CM_MKT_VALUE( #EM ) * P( #CU #ED )/P( #ED )', function() {
      AuditMode.getFormulaSection().getText().then(function(val) {
        if (val.replace(/\n/g, '') !== 'CM_MKT_VALUE( #EM ) * P_PRICE( #ED, #CU )/P_PRICE( #ED )') {
          expect(false).customError('"Formula" section is not displayed with "CM_MKT_VALUE( #EM ) * P( #CU #ED )/P( #ED )", Found:' + val);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrOptions = ['Market Value', 'Price  -  Close or Current Intraday', 'Price  -  Close or Current Intraday'];
    arrOptions.forEach(function(optionName, index) {
      it('Verfying that audit view contains report input values for "' + optionName + '"', function() {
        expect(AuditMode.getReportInputsSectionValues(index + 1, 1).getText()).toEqual(arrOptions[index]);
        expect(AuditMode.getReportInputsSectionValues(index + 1, 2).getText()).not.toBeNull();
      });
    });
  });

  describe('Test Step ID: 549883', function() {

    it('In the report View Should click on the "Debt to Equity" Value for "98919V10"', function() {
      AuditMode.getAllColumnOfCalculatedReport('Contribution - Audit Tests').each(function(eleRef, index) {
        if (index <= 14) {
          browser.actions().mouseMove(eleRef).perform();
        }
      });

      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', '98919V10', 'Debt to Equity',
        undefined, undefined, 'true').then(function(reference) {
        reference.click();
      });
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);
    });

    it('Verifying that Audit window should display the formula as FF_DEBT_EQ( QTR, #EQ )', function() {
      expect(AuditMode.getFormulaSection().getText()).toEqual('FF_DEBT_EQ( QTR, #EQ )');
    });

    it('Verifying that audit view contains report input values for "Total Debt % Equity"', function() {
      expect(AuditMode.getReportInputsSectionValues(1, 1).getText()).toEqual('Total Debt % Equity');
      expect(AuditMode.getReportInputsSectionValues(1, 2).getText()).not.toBeNull();
    });

  });

  describe('Test Step ID: 549884', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click();
    });

    it('Verifying that report should not auto calculate', function() {
      PA3MainPage.getReportCalculationDlg().isPresent().then(function(flag) {
        if (flag) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Report is re-calculating');
        }
      });
    });

    it('Verify that the application is displayed in normal mode', function() {
      PA3MainPage.isNormalMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Application is not displayed in normal mode');
        }
      });
    });

  });

  describe('Test Step ID: 761557', function() {
    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Weights', true, 'isSelected');

    it('Should click the "Portfolio" widget search box and type "MSCI:World" and hit enter', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathPortfolioWidget).setText('MSCI:World', protractor.Key.ENTER);
    });

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Portfolio', PA3MainPage.xpathPortfolioWidget, 'MSCI:WORLD');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    // Click on "Economic Sector" Hyperlink and verify if Groupings is selected by default in tile options
    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    it('Should click on the "Groupings" tab on the LHP of tile options view', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Groupings').select();

      // Verifying if "Groupings" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Groupings').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Groupings" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Clear All/X" icon from the  selected section', function() {
      // ThiefHelpers.getButtonClassReference('Clear All').press().then(function() {
      // }, function() {
      //   expect(false).customError('Unable to click on "Clear All/X" icon from the  selected section');
      //   CommonFunctions.takeScreenShot();
      // });

      ThiefHelpers.getTransferBoxReference().target.clear();
    });

    it('Verifying if Selected section is empty', function() {
      ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer).getChildrenText().then(function(children) {
        if (children.length > 0) {
          expect(false).customError('Selected section is not empty');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying that the header title is "MSCI World vs Russell 1000 Growth"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'MSCI World vs Russell 1000 Growth') {
          expect(false).customError('Header title did not displayed as "MSCI World vs Russell 1000 Growth"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 761558', function() {

    it('Scroll the "Zalando SE" into view', function() {
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(eleRef, rowIndex) {
          if (eleRef[0] === 'Zalando SE') {
            SlickGridFunctions.scrollRowToTop('Weights', rowIndex - 1);
          }
        });
      });
    });

    it('Should right click on "Port. Weight" for "Zalando SE" row and select "Audit Value" from the drop down ', function() {
      // Get cell value
      SlickGridFunctions.getCellReference('Weights', 'Zalando SE', '', 'Port. Weight').then(function(reference) {
        // Right click and select "Audit Value"
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying if "Audit Mode" page is opened', function() {
      AuditMode.isAuditMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Audit Mode" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the title if Audit view is set to "Port. Weight"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(text) {
        if (text !== 'Port. Weight') {
          expect(false).customError('Audit view title is not displayed as "Port. Weight", Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

});
