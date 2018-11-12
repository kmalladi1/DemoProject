'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: audit-snapshot', function() {

  describe('Test Step ID: 480451', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

  });

  describe('Test Step ID: 480452', function() {

    // Known issue: RPD:38829057 - In Live(v.230) - Type ahead results are not displayed when entered Restore_Test.acct
    // in the portfolio widget
    it('Should type "Client:/pa3/accounts/RESTORE_TEST.ACCT" into the "Portfolio" widget box and select ' +
      '"Client:/pa3/accounts/RESTORE_TEST"', function() {
      expect(PA3MainPage.setPortfolio('Client:/pa3/accounts/RESTORE_TEST.ACCT', 'Client:/pa3/accounts/RESTORE_TEST.ACCT',
        'CLIENT:/PA3/ACCOUNTS/RESTORE_TEST.ACCT')).toBeTruthy();
    });

    it('Should Wait for "Weights" report to calculate', function() {
      // Wait for report to finish calculation (Max. 5 min)
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000);
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
        } else {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Error found while calculating the "Weights" report' + error);
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Calculation Error" popup was appeared');
        }
      });
    });

  });

  describe('Test Step ID: 480453', function() {

    it('Should right click in the "Port Weight" column value for "Commercial Services" grouping and select "Audit Value"', function() {
      PA3MainPage.getValueFromCalculatedReport('Weights', 'Commercial Services', 'Port. Weight',
        'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right', true).then(function(reference) {
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

    it('Should wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying audit section title is "Commercial Services" ', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(value) {
        if (value !== 'Commercial Services') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view section title is not matched with "Commercial Services"; Found: ' + value);
        }
      });
    });

    it('Verifying that "Port. Weight" column displays value for "Commercial Services" grouping', function() {
      var rowClassName = 'slick-pane slick-pane-bottom slick-pane-left';
      var colClassName = 'slick-pane slick-pane-bottom slick-pane-right';
      AuditMode.getValueFromCalculatedReport('Port. Weight', 'Commercial Services', 'Port. Weight',
        rowClassName, colClassName).then(function(value) {
        expect(value).not.toEqual('');
      });
    });

    it('Verifying that "Column Help" section is displayed with title "Port. Ending Weight"', function() {
      AuditMode.getColumnHelpSectionName().getText().then(function(value) {
        if (value !== 'Port. Ending Weight') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Column Help section is not diplayed with Title "Port. Ending Weight"');
        }
      });
    });

  });

  describe('Test Step ID: 480507', function() {

    it('In Audit View Expand "Commercial Services", if not expanded', function() {
      AuditMode.isTreeExpanded('Port. Weight', 'Commercial Services', '', true).then(function(value) {
        if (!value) {
          AuditMode.expandTreeInCalculatedReport('Port. Weight', 'Commercial Services');
        }
      }).then(function() {
        // Verifying that "Communications" is expanded
        AuditMode.checkIfTreeExpandedInCalculatedReport('Port. Weight', 'Commercial Services', undefined, true);
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Expand "Commercial Services > Advertising/Marketing services" from audit view', function() {
      AuditMode.expandTreeInCalculatedReport('Port. Weight', 'Commercial Services|Advertising/Marketing Services',
        'Commercial Services', undefined, true);

      // Verifying that "Commercial Services > Advertising/Marketing Services" is expanded
      AuditMode.checkIfTreeExpandedInCalculatedReport('Port. Weight', 'Commercial Services|Advertising/Marketing Services', undefined, true);
    });

    it('Verifying that "Nielsen Holdings Plc" security is found under "Commercial Services > Advertising/Marketing Services"',
      function() {
        AuditMode.getElementFromCalculatedTree('Port. Weight', 'Commercial Services|Advertising/Marketing Services',
          'Nielsen Holdings Plc', undefined, true).isPresent().then(function(found) {
          if (!found) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('"Nielsen Holdings Plc" is not found in Audit report');
          }
        });
      });

    it('Should click on the "Port. Weight" value for "Nielsen Holdings Plc"', function() {
      AuditMode.getValueFromCalculatedReport('Port. Weight', 'Nielsen Holdings Plc', 'Port. Weight', undefined, undefined, true, true).then(function(reference) {
        reference.click();
      });
    });

    it('Should wait for "Audit" report for "Nielsen Holdings Plc" to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verify Audit View should display the security name as "Nielsen Holdings Plc (NLSN)"', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(value) {
        if (value !== 'Nielsen Holdings Plc  (NLSN)') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view Security name is not matched with "Nielsen Holding Plc (NLSN)"; Found: ' + value);
        }
      });
    });

    var arrOptions = ['Port. Ending Market Value', 'Total Port. Ending Market Value', 'Port. Weight'];
    arrOptions.forEach(function(optionName, index) {
      it('Verifying the report contain value for "' + optionName + '"', function() {
        AuditMode.getReportInputsSectionValues(index + 1, 1).getText().then(function(val) {
          if (val !== arrOptions[index]) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('Audit report does not have value for"' + arrOptions[index] + '"; Found: ' + val);
          }
        });
      });
    });

  });

  describe('Test Step ID: 480508', function() {

    it('Should click on the "left arrow" in the Audit View', function() {
      AuditMode.getArrowButton('left').click();
    });

    it('Verifying Audit section title is "Commercial Services"', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(value) {
        if (value !== 'Commercial Services') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit section title is not matching with "Commercial Services"; Found: ' + value);
        }
      });
    });

  });

  describe('Test Step ID: 480756', function() {

    it('Should click on the "Bench Weight" value for "Communications", In the report View', function() {
      browser.wait(function() {
        return AuditMode.getValueFromCalculatedReport('Weights', 'Communications', 'Bench. Weight', undefined, undefined, true).then(function(ref) {
          return ref.isDisplayed().then(function(found) {
            if (found) {
              ref.click().then(function() {
              }, function(error) {
                expect(false).customError(error);
                CommonFunctions.takeScreenShot();
              });
              return true;
            }
          });
        }, function() {
          return false;
        });
      }, 10000, ' "Bench Weight" value for "Communications" row is not appeared in DOM even after waiting for 10 seconds.').then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying audit section Title is "Bench. Weight"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Bench. Weight') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit section title is not matching with "Bench. Weight": Found: ' + value);
        }
      });
    });

    it('Verifying audit section is populated with "Communications" group', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(value) {
        if (value !== 'Communications') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit section is not populated with "Communications" group');
        }
      });
    });

    it('Verifying audit section title updated with Date', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getWebElement().then(function(value) {
        value.getText().then(function(dateValue) {
          expect(dateValue.split('/').length === 3).customError('Date is not displayed in Audit view');
        });
      });
    });

    it('Verifying that Column Help section is displayed with Title "Bench. Ending Weight"', function() {
      AuditMode.getColumnHelpSectionName().getText().then(function(value) {
        if (value !== 'Bench. Ending Weight') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Column Help section is not diplayed with Title "Bench. Ending Weight": Found: ' + value);
        }
      });
    });

  });

  describe('Test Step ID: 480760', function() {

    it('In Audit View Expand "Communications", if not expanded', function() {
      AuditMode.isTreeExpanded('Bench. Weight', 'Communications', undefined, true).then(function(value) {
        if (!value) {
          AuditMode.expandTreeInCalculatedReport('Bench. Weight', 'Communications', undefined, undefined, true);
        }
      }).then(function() {
        // Verifying that "Communications" is expanded
        AuditMode.checkIfTreeExpandedInCalculatedReport('Bench. Weight', 'Communications', undefined, true);
      });
    });

    it('should expand "Communications" and "Major Telecommunications" and verify AT&T Inc. is present in the tree', function() {
      AuditMode.expandTreeInCalculatedReport('Bench. Weight', 'Communications|Major Telecommunications',
        'Communications', undefined, true);

      // Verifying that "Communications|Major Telecommunications" is expanded
      AuditMode.checkIfTreeExpandedInCalculatedReport('Bench. Weight', 'Communications|Major Telecommunications', undefined, true);

      // Verifying "AT&T Inc." is present in the report
      expect(AuditMode.getElementFromCalculatedTree('Bench. Weight', 'Communications|Major Telecommunications',
        'AT&T Inc.', undefined, true).isPresent()).toBeTruthy();
    });

    it('Should click on the "Bench Weight" value for "AT&T Inc."', function() {
      SlickGridFunctions.getCellReference('Bench. Weight', 'AT&T Inc.', '', 'Bench. Weight', undefined, 'Communications|Major Telecommunications').then(function(reference) {
        reference.click();
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      browser.sleep(2000);
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Should click on "Bench. Ending Market Value" value in Audit View', function() {
      AuditMode.getReportInputsSectionValues(1, 1).getText().then(function(value) {
        if (value !== 'Bench. Ending Market Value') {
          expect(false).customError('"Bench. Ending Market Value" is not present in Audit View; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });

      // Click on Bench. Ending Market Value
      AuditMode.getReportInputsSectionValues(1, 2).click();
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 200000);
    });

    var arrOptions = ['Bench. Ending Price', 'Bench. Ending Quantity Held', 'Bench. Ending Market Value'];
    arrOptions.forEach(function(optionName, index) {
      it('Verfying that "Report Input" section contain value for "' + optionName + '"', function() {
        AuditMode.getReportInputsSectionValues(index + 1, 1).getText().then(function(val) {
          if (val !== arrOptions[index]) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('Audit report does not have value for "' + arrOptions[index] + '";Found: ' + val);
          }
        });

        // Verify that it has value
        expect(AuditMode.getReportInputsSectionValues(index + 1, 2).getText()).not.toBeNull();
      });
    });

  });

  describe('Test Step ID: 480761', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click();
    });

    it('Verifying that "Audit view" is closed without any issue', function() {
      AuditMode.isAuditMode().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit Mode" is not closed.');
        }
      });
    });

    it('Should Wait for "Weights" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000);
    });

  });

  describe('Test Step ID: 511736', function() {

    it('Should click on the "Wrench" icon in the "Weights\'" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click();
    });

    it('Should select "Options" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click();
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(text) {
        if (text !== 'Tile Options - Weights') {
          expect(false).customError('View did not change to "Tile Options - Weights"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Groupings" tab from LHP', function() {
      TileOptions.getLHPOption('Groupings').click();

      // Verifying that view changed to "Groupings"
      TileOptions.getOptionTitle().getText().then(function(text) {
        if (text !== 'Groupings') {
          expect(false).customError('View did not change to "Groupings"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "+" button and select New/Reference', function() {
      TileOptionsGroupings.getNewButton().click();

      // Selecting "New/Reference" option from the drop down.
      TileOptionsGroupings.getNewDropDownItem('New/Reference').click();
    });

    it('Verifying that the "Groupings" dialog is opened', function() {
      ThiefHelpers.isDialogOpen('Groupings', undefined, undefined).then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Groupings" dialog does not appears');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select the "Reference" radio button', function() {
      ThiefHelpers.getRadioClassReference('Reference', undefined).select();

      // Verifying that "Reference" radio button is selected
      ThiefHelpers.getRadioClassReference('Reference', undefined).isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('The "Reference" radio button is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Formula" tab is selected', function() {
      Utilities.isElementSelected(CreateEditCustomGroupings.getTab('Formula')).then(function(bool) {
        if (!bool) {
          expect(false).customError('The "Formula" tab is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Col 3: Port. Ending Weight" to highlight', function() {
      ThiefHelpers.getVirtualListboxClassReference().getItemByText('Col 3: Port. Ending Weight').select();
    });

    it('Should click on "Add" button', function() {
      ThiefHelpers.getButtonClassReference('Add', undefined).press();
    });

    it('Verifying that "COL3" is added to the text area', function() {
      CreateEditCustomGroupings.getTabTextArea().getText().then(function(val) {
        if (val !== 'COL3') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"COL3" is not added to the text area; Found: ' + val);
        }

      });
    });

    it('Should enter "COL3: Grouping" into the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name:', undefined).setText('COL3: Grouping');

      // Verifying that "COL3: Grouping" is entered into the Field
      ThiefHelpers.getTextBoxClassReference('Name:', undefined).getText().then(function(text) {
        if (text !== 'COL3: Grouping') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"COL3: Grouping" is not entered to the "Name:" field; Found: ' + text);
        }
      });
    });

    it('Should click on "Save" button to save the settings', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateEditCustomGroupings.getButton('Save')).press().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Save" button' + err);
      });
    });

    it('Should Wait for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(
        CreateEditCustomGroupings.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that the "Groupings" dialog is no more opened', function() {
      ThiefHelpers.isDialogOpen('Groupings', undefined, undefined).then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Groupings" dialog is still opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "OK" button' + err);
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Tile Options" mode is not closed');
        }
      });
    });

    it('Should Wait for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Error found while calculating the "Weights" report' + error);
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Calculation Error" popup was appeared');
        }
      });
    });

  });

  describe('Test Step ID: 511738', function() {

    it('Should click on "Wrench" Icon from the "Weights" report area', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click();
    });

    it('Should select "Audit" from Wrench menu', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Audit').click();
    });

    it('Verify that application is changed to "AUDIT" mode', function() {
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
          expect(false).customError('"Done" is not appeared on the screen');
        }
      });
    });

  });

  describe('Test Step ID: 505323', function() {

    it('Should click on the warning icon in the "Report" view', function() {
      AuditMode.getCachingAlertIcon('Weights').click();
    });

    it('Verifying that warning note displays "The end date is set to Latest. The data in the report may not match the audit"' +
      ' is displayed', function() {
      AuditMode.getCacheInfoText('Weights').then(function(val) {
        if (val !== 'The end date is set to Latest. The data in the report may not match the audit.') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Warning Info text is not matched with the Expected: "The end date is set to Latest.' +
            ' The data in the report may not match the audit.": Found: ' + val);
        }
      });
    });

  });

  describe('Test Step ID: 511739', function() {

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
      PA3MainPage.isNormalMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Application is not displayed in normal mode');
        }
      });
    });

  });

});
