'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: audit-order', function() {

  var rowName;
  var auditValue;

  describe('Test Step ID: 549924', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch PA3 Application with "Client:;Pa3;Audit;AUDIT_DOC" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('audit-doc');
    });

    it('Should select "Automatic Calculation" option', function() {
      // Un-check "Automatic Calculation" to force re-check it
      PA3MainPage.getWrenchIcon().click();
      PA3MainPage.setAutomaticCalculation(false);

      // Click on Wrench button to select "Automatic Calculation"
      PA3MainPage.getWrenchIcon().click();
      expect(PA3MainPage.setAutomaticCalculation(true)).toBeTruthy();
    });

    it('Should Wait for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that report is grouped by "Economic Sector"', function() {
      expect(PA3MainPage.getGroupingsHyperLink('Weights').getText()).toContain('Economic Sector');
    });
  });

  describe('Test Step ID: 549934', function() {

    it('Should click on "Wrench" Icon from the "Weights" report area', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click();
    });

    it('Should select "Options" from Wrench menu', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click();
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      expect(element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText()).toEqual('Tile Options - Weights');
    });

    it('Should verify that view is opened with Dates pane highlighted', function() {
      // Verifying that view displayed is "Dates"
      expect(TileOptions.getOptionTitle().getText()).toEqual('Dates');
    });

    it('Should click on "Report Frequency" drop down ', function() {
      TileOptionsDates.getReportFrequencyBtn().click();
    });

    it('Should select "Multi-Horizon" from Report Frequency dropdown', function() {
      TileOptionsDates.getOption('Multi-Horizon').click();
    });

    it('Should verify that End Date field contains "One Day Ago"', function() {
      expect(TileOptionsDates.getDateField('multi-horizon end date').getAttribute('value')).toEqual('One Day Ago');
    });

    it('Should click on "Add" Button ', function() {
      TileOptionsDates.getAddButton().click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
      browser.sleep(3000);
    });

    it('Verifying that "One Day Ago" is added to the list box', function() {
      TileOptionsDates.getMultiHorizonListItem('One Day Ago').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"One Day Ago" is not added to the list box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button of "Weights Options" dialog', function() {
      TileOptions.getHeaderButton('ok').click();
    });

    it('Should Wait for "Weights" report to calculate', function() {
      browser.sleep(2000);
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any issues', function() {
      // Verifying if "Weights" report is calculated
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(dialogRef) {
        if (dialogRef) {
          expect(false).customError('Calculation Error dialog box is appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Wrench" icon in the "Weights" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click();
    });

    it('Verify that "Audit" is not displayed in the "Weights" report dropdown', function() {
      expect(PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Audit').isPresent()).toBeFalsy();
    });
  });

  describe('Test Step ID: 549925', function() {

    it('Should select "Contribution - Audit Tests" from the LHP', function() {
      PA3MainPage.getReports('Contribution - Audit Tests').click();
    });

    it('Verify that "Contribution - Audit Tests" report calculated', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000);

      // Verifying if "Contribution - Audit Tests" report is calculated
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

    it('Should click on the "Wrench" icon in the "Contribution - Audit Tests" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Contribution - Audit Tests').click();
    });

    it('Select "Audit" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Audit').click();
    });

    it('Verifying if the application changed to "AUDIT" mode', function() {
      expect(AuditMode.isAuditMode()).toBeTruthy();
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying that "Report" and "audit" views contains same "Security Groups"', function() {
      // Wait until elements loaded in DOM
      browser.sleep(3000);

      // Get all security groupings from Contribution - Audit Tests report view
      AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Contribution - Audit Tests', 1).each(function(eleRef, index) {

        // Get the element into visibility
        SlickGridFunctions.scrollRowToTop('Contribution - Audit Tests', index);

        eleRef.getText().then(function(text) {
          // Compare each security name with Average Weight view
          AuditMode.getElementFromSpecifiedLevelOfCalculatedReport('Average Weight', 1, text).isPresent().then(function(present) {
            SlickGridFunctions.scrollRowToTop('Average Weight', index);
            if (!present) {
              expect(false).customError(text + ' is not present in the Audit view.');
              CommonFunctions.takeScreenShot();
            }
          }, function(error) {
            if (error.name === 'StaleElementReferenceError') {
              expect(AuditMode.getElementFromSpecifiedLevelOfCalculatedReport('Average Weight', 1, text).isPresent()).toBeTruthy();
            }
          });
        });
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('In the report View Should click on the "Average Weight" value for "Communications" total value', function() {
      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'Communications', ' Average Weight', undefined, undefined, 'true').then(function(reference) {
        reference.click();
      });
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('In report View Expand "Communications"', function() {
      AuditMode.isTreeExpanded('Contribution - Audit Tests', 'Communications').then(function(value) {
        if (!value) {
          AuditMode.expandTreeInCalculatedReport('Contribution - Audit Tests', 'Communications');
        }
      }).then(function() {
        // Verifying that "Communications" is expanded
        AuditMode.checkIfTreeExpandedInCalculatedReport('Contribution - Audit Tests', 'Communications');
      });
    });

    var ele;
    it('Verifying that Securities in the Report view should match with Securities in the Audit view', function() {
      AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Contribution - Audit Tests', 2).each(function(eleRef) {
        Utilities.scrollElementToVisibility(eleRef);
        ele = eleRef.getText().then(function(text) {
          expect(AuditMode.getElementFromSpecifiedLevelOfCalculatedReport('Average Weight', 2, text).isPresent()).toBeTruthy();
        });
      });
    });

    var noOfContentEle;
    var noOfReportEle;
    it('Verifying that Total number of securities in the report view should match with the total number of securities ' + 'in the Audit view.', function() {
      noOfReportEle = AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Contribution - Audit Tests', 2).count();
      noOfContentEle = AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Average Weight', 2).count();
      expect(noOfReportEle).toEqual(noOfContentEle);
    });
  });

  describe('Test Step ID: 549926', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click();
    });

    it('Should Wait for "Contribution - Audit Tests" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Should click on "Wrench" Icon from the "Contribution - Audit Tests" report area', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Contribution - Audit Tests').click();
    });

    it('Should select "Options" from Wrench menu', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click();
    });

    it('Verifying if view changed to "Tile Options - Contribution - Audit Tests" mode', function() {
      expect(element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText()).toEqual('Tile Options - Contribution - Audit Tests');
    });

    it('Should select "Columns" from LHP', function() {
      TileOptions.getLHPOption('Columns').click();

      // Verifying that view changed to "Columns"
      expect(TileOptions.getOptionTitle().getText()).toEqual('Columns');
    });

    it('Should select "Port. Average Weight" from the "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Port. Average Weight').click();
    });

    it('Should expand "Statistics" in "Options" pane', function() {
      expect(TileOptionsColumns.expandSectionInOptionsPane('Statistics')).toBeTruthy();
    });

    it('Should hover over "Weight" option and click on X icon', function() {
      TileOptionsColumns.getRemoveIconForColumnsInOptionsStatisticsSection().click();
    });

    it('Should click on "OK" button of "Contribution - Audit Tests Options" dialog', function() {
      TileOptions.getHeaderButton('ok').click();
      browser.sleep(4000);
    });

    it('Verify that the Contribution - Audit Tests report is calculated', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000);

      // Verifying if "Contribution - Audit Tests" report is calculated
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
  });

  describe('Test Step ID: 549927', function() {

    var rowIndex = null;

    it('Should Expand "Commercial Services" in "Contribution - Audit Tests" report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Contribution - Audit Tests', 'Commercial Services');

      // Verifying that "Commercial Services|Advertising/Marketing Services" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution - Audit Tests', 'Commercial Services');
    });

    it('Should click on the "Wrench" icon in the "Contribution - Audit Tests\'" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Contribution - Audit Tests').click();
    });

    it('Select "Audit" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Audit').click();
    });

    it('Verifying if the application is changed to "AUDIT" mode', function() {
      expect(AuditMode.isAuditMode()).toBeTruthy();
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Fetching the rowname to which the top most cell value for "Average Weight" is highlighted ', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution - Audit Tests', 'Average Weight').then(function(cellArray) {
        for (var i = 0; i <= cellArray.length; i++) {
          if (cellArray[i] !== '' && cellArray[i] !== '--') {
            rowIndex = i;
            break;
          }
        }
      });
    });

    it('Verify that the top most cell value for "Average Weight" should be highlighted in yellow color', function() {
      AuditMode.getRowWithIndex('Contribution - Audit Tests', 'slick-pane slick-pane-bottom slick-pane-left', rowIndex - 1).then(function(rowName) {
        AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', rowName, 'Average Weight', undefined, undefined, 'true').then(function(value) {
          value.getAttribute('class').then(function(value) {
            if (value.indexOf('selected') === -1) {
              expect(false).customError('"Average Weight" column first cell of security that contains value is not highlighted');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying that Average Weight is displayed at Audit View Header Section and displayed beneath the Report Inputs', function() {
      expect(AuditMode.getReportInputsSectionValues(3, 1).getText()).toEqual('Average Weight');
      expect(AuditMode.getAuditViewHeaderName().getText()).toContain('Average Weight');
    });

    it('Verify that the value highlighted in report view should be same as value displayed in the Audit View"', function() {
      AuditMode.getRowWithIndex('Contribution - Audit Tests', 'slick-pane slick-pane-bottom slick-pane-left', rowIndex - 1).then(function(rowName) {
        AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', rowName, 'Average Weight', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right').then(function(reportValue) {
          AuditMode.getAuditViewHeaderValue().getText().then(function(auditHeaderValue) {
            AuditMode.roundAndMatch(reportValue, auditHeaderValue);
            AuditMode.getReportInputsSectionValues(3, 2).getText().then(function(value) {
              AuditMode.roundAndMatch(reportValue, value);
            });
          });
        });
      });
    });
  });

  describe('Test Step ID: 549928', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click();
    });

    it('Should Wait for "Contribution - Audit Tests" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Should collapse "Communications" grouping in the "Contribution - Audit Tests" report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Contribution - Audit Tests', 'Communications');
    });

    it('Should right click in the "Average Weight Column" value for "Commercial Services|Booz Allen Hamilton Holding Corporation Class A" grouping', function() {
      PA3MainPage.getValueFromCalculatedReport('Contribution - Audit Tests', 'Booz Allen Hamilton Holding Corporation Class A', 'Average Weight', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right', 'true').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Waiting for "Audit" report to calculate', function() {
      browser.sleep(4000);
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 300000);
    });

    it('Verifying audit section Title is "Average Weight"', function() {
      expect(AuditMode.getAuditViewHeaderName().getText()).toContain('Average Weight');
    });

    it('Verifying audit section is populated with "Booz Allen Hamilton Holding Corporation Class A  (BAH)" group', function() {
      expect(AuditMode.getAuditViewSubHeader().getText()).toEqual('Booz Allen Hamilton Holding Corporation Class A  (BAH)');
    });

    it('Verify that the value highlighted in report view should be same as value displayed in the Audit View"', function() {
      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'Booz Allen Hamilton Holding Corporation Class A', 'Average Weight', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right').then(function(reportValue) {
        AuditMode.getAuditViewHeaderValue().getText().then(function(auditHeaderValue) {
          AuditMode.roundAndMatch(reportValue, auditHeaderValue);
          AuditMode.getReportInputsSectionValues(3, 2).getText().then(function(value) {
            AuditMode.roundAndMatch(reportValue, value);
          });
        });
      });
    });
  });

  describe('Test Step ID: 549929', function() {

    var rowIndex;

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click();
    });

    it('Should Wait for "Contribution - Audit Tests" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Expand "Communications" in the calculated report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Contribution - Audit Tests', 'Communications');

      // Verifying that "Commercial Services" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution - Audit Tests', 'Communications');
    });

    it('Should click on the "Wrench" icon in the "Contribution - Audit Tests\'" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Contribution - Audit Tests').click();
    });

    it('Select "Audit" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Audit').click();
    });

    it('Verifying if the Application is launched in "AUDIT" mode', function() {
      expect(AuditMode.isAuditMode()).toBeTruthy();
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);
    });

    it('Fetching the rowname to which the top most cell value for "Average Weight" is highlighted ', function() {
      browser.sleep(3000);
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution - Audit Tests', 'Average Weight').then(function(cellArray) {
        for (var i = 0; i <= cellArray.length; i++) {
          if (cellArray[i] !== '' && cellArray[i] !== '--') {
            rowIndex = i;
            break;
          }
        }
      });
    });

    it('Verify that the top most cell value for "Average Weight" should be highlighted in yellow color', function() {
      AuditMode.getRowWithIndex('Contribution - Audit Tests', 'slick-pane slick-pane-bottom slick-pane-left', rowIndex - 1).then(function(rowName) {
        AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', rowName, 'Average Weight', undefined, undefined, 'true').then(function(value) {
          value.getAttribute('class').then(function(value) {
            if (value.indexOf('selected') === -1) {
              expect(false).customError('"Average Weight" column first cell of security that contains value is not highlighted');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verify that the value highlighted in report view should be same as value displayed in the Audit View"', function() {
      AuditMode.getRowWithIndex('Contribution - Audit Tests', 'slick-pane slick-pane-bottom slick-pane-left', rowIndex - 1).then(function(rowName) {
        AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', rowName, 'Average Weight', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right').then(function(reportValue) {
          AuditMode.getAuditViewHeaderValue().getText().then(function(auditHeaderValue) {
            AuditMode.roundAndMatch(reportValue, auditHeaderValue);
            AuditMode.getReportInputsSectionValues(3, 2).getText().then(function(value) {
              AuditMode.roundAndMatch(reportValue, value);
            });
          });
        });
      });
    });

  });

  describe('Test Step ID: 549930', function() {

    it('In report view should click on the "Price to Earnings" value for "Commercial Services "', function() {
      AuditMode.getAllColumnOfCalculatedReport('Contribution - Audit Tests').then(function(references) {
        references.forEach(function(eleRef, index) {
          if (index <= 11) {
            browser.actions().mouseMove(eleRef).perform();
            browser.sleep(200);
          }
        });
      });
      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'Commercial Services', 'Price to Earnings', undefined, undefined, 'true').then(function(reference) {
        reference.click();
      });
    });

    it('Verify that Audit View displays Price to Earnings, Port. Beginning Weight and Normalized Weight columns.', function() {
      var arrOptions = ['Price to Earnings', 'Port. Beginning Weight', 'Normalized Weight'];
      AuditMode.getAllColumnOfCalculatedReport('Market Capitalization').each(function(eleRef, index) {
        Utilities.scrollElementToVisibility(eleRef);
        eleRef.getText().then(function(value) {
          value = value.replace(/\n/g, ' ');
          if (index >= 1) {
            expect(value).toEqual(arrOptions[index - 1]);
          }
        });
      });
    });
  });

  describe('Test Step ID: 549931', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click();
    });

    it('Should Wait for "Contribution - Audit Tests" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 180000)).toBeTruthy();
      browser.sleep(4000);
    });

    it('Should right click in the "Dividend Yield" value for "Booz Allen Hamilton Holding Corporation Class A" grouping', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Contribution - Audit Tests').then(function(references) {
        references.forEach(function(eleRef, index) {
          if (index <= 11) {
            browser.actions().mouseMove(eleRef).perform();
          }
        });
      });
      PA3MainPage.getValueFromCalculatedReport('Contribution - Audit Tests', 'Booz Allen Hamilton Holding Corporation Class A', 'Dividend Yield', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right', 'true').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Waiting for "Audit" report to calculate', function() {
      browser.sleep(4000);
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000);
      browser.sleep(3000);
    });

    it('Verifying that Audit window should display the formula as  ( AVAIL( FM_DIV( #EM, USD ), FM_DIV( #EM - 1, USD ) )/P_PRICE( #ED, USD ) ) * 100.', function() {
      AuditMode.getFormulaSection().getText().then(function(value) {
        if (value.replace(/\n/g, '') !== '( AVAIL( FM_DIV( #EM, USD ), FM_DIV( #EM - 1, USD ) )/P_PRICE( #ED, USD ) ) * 100') {
          expect(false).customError('Audit window is not displaying the formula as  (AVAIL(FM_DIV(#EM, USD),' + ' FM_DIV(#EM-1, USD))/P_PRICE(USD#ED))*100.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Audit view" should contain "Report Input" section', function() {
      expect(AuditMode.getReportInputsSection('Dividend Yield').isPresent()).toBeTruthy();
    });

    it('Verify that the value highlighted in report view should be same as value displayed in the Audit View"', function() {
      AuditMode.getAllColumnOfCalculatedReport('Contribution - Audit Tests').each(function(eleRef, index) {
        if (index <= 11) {
          browser.actions().mouseMove(eleRef).perform();
        }
      });
      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'Booz Allen Hamilton Holding Corporation Class A', 'Dividend Yield', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right').then(function(reportValue) {
        AuditMode.getReportInputsSectionValues(4, 2).getText().then(function(value) {
          AuditMode.roundAndMatch(reportValue, value);
        });
      });
    });

    it('Verify that "Dividend per Share - M" value in audit view should contain hyperlink', function() {
      element(by.xpath(AuditMode.xpathReportInputsTable + '/tr[1]/td[2]/a')).getWebElement().then(function(value) {
        value.getText().then(function(ele) {
          auditValue = ele;
        });
      });
    });
  });

  describe('Test Step ID: 549932', function() {

    it('Should click on the value for "Dividend Per Share - M Value" ', function() {
      element(by.xpath(AuditMode.xpathReportInputsTable + '/tr[1]/td[2]/a')).click();
    });

    it('Waiting for "Audit" report to calculate', function() {
      browser.sleep(4000);
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000);
    });

    it('Verifying that Audit window should display the formula as FF_DPS_SECS(MON, 01/2015, RP, USD)', function() {
      expect(AuditMode.getFormulaSection().getText()).toEqual('FF_DPS_SECS( MON, 01/2015, RP, USD )');
    });

    var arrOptions = ['Dividends', 'Dividend per Share - M'];
    arrOptions.forEach(function(optionName, index) {
      it('Verifying the report contains values for "' + optionName + '"', function() {
        expect(AuditMode.getReportInputsSectionValues(index + 1, 1).getText()).toEqual(arrOptions[index]);
        expect(AuditMode.getReportInputsSectionValues(index + 1, 2).getText()).not.toBeNull();
      });
    });

    it('Verifying that Dividend per Share - M shows beneath Report Inputs with the same value as previous step', function() {
      expect(AuditMode.getReportInputsSectionValues(2, 1).getText()).toEqual('Dividend per Share - M');
      AuditMode.getReportInputsSectionValues(2, 2).getText().then(function(value) {
        if (value !== auditValue) {
          expect(false).customError('Dividend per Share - M shows beneath Report Inputs with the same value as previous step');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 549933', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click();
    });

    it('Verifying that report should not auto calculate', function() {
      browser.sleep(4000);
      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verify that the application is displayed in normal mode', function() {
      expect(PA3MainPage.isNormalMode()).toBeTruthy();
    });
  });

});
