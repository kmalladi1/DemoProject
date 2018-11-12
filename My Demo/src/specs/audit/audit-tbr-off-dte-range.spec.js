'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: audit-tbr-off-dte-range', function() {
  // Variable (s)
  //var columnIndex;
  var rowClass = 'slick-pane slick-pane-top slick-pane-left';
  var colClass = 'slick-pane slick-pane-top slick-pane-right';

  describe('Test Step ID: 619086', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:;Pa3;Audit;AUDIT_TBR" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('audit-tbr');
    });

    it('Should Wait for "Characteristics-Summary" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Characteristics-Summary" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Characteristics - Summary').then(function(displayed) {
        expect(displayed).customError('"Characteristics - Summary" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Characteristics - Summary')).toBeTruthy();
        } else {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Error found while calculating the "Characteristics - Summary" report' + error);
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Calculation Error" popup was appeared');
        }
      });
    });

    it('Verifying if "Characteristics - Summary" report is grouped by date range: "5/19/2009"', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(value) {
        if (value !== '5/19/2009') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Report was not grouped by date range: "5/19/2009"');
        }
      });
    });

    it('Should click on "Hamburger" icon next to "Portfolio"', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that the dropdown next to the "FI_TBR_PORT" displays "B&H"', function() {
      PA3MainPage.getDropdownFromAccountsDropdown('Portfolio', 'FI_TBR_PORT').getText().then(function(val) {
        if (val !== 'B&H') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Dropdown next to the "FI_TBR_PORT" contains text:' + val);
        }
      });
    });

    it('Should select "Cancel" button to close the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'Cancel').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class')).not.toContain('active');
    });
  });

  describe('Test Step ID: 619087', function() {

    it('Should right Click on "Port. Ending Market Value" under the column "FI_TBR_PORT > Data" ' + 'and select "Audit Value"', function() {
      SlickGridFunctions.getCellReference('Characteristics - Summary', 'Port. Ending Market Value', '', 'Data', 'FI_TBR_PORT').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    AuditMode.verifyIfReportIsCalculated('Port. Ending Market Value - FI_TBR_PORT');

    it('Verify that application is changed to "AUDIT" mode', function() {
      AuditMode.isAuditMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit Mode" is not appeared on the screen');
        }
      });
    });

    it('Verifying audit section Title is "Port. Ending Market Value - FI_TBR_PORT"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(title) {
        if (title !== 'Port. Ending Market Value - FI_TBR_PORT') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit title is not matched with "Port. Ending Market Value - FI_TBR_PORT"');
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "5/19/2009"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '5/19/2009') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('The Audit date range is not matched with "5/19/2009"');
        }
      });
    });

    it('Verify that Audit View should display "Symbol", "Port. Ending Market Value" columns', function() {
      var arrOptions = ['Symbol', 'Port. Ending Market Value'];
      SlickGridFunctions.getColumnNames('Port. Ending Market Value - FI_TBR_PORT').then(function(columnNames) {
        arrOptions.forEach(function(name) {
          if (columnNames.indexOf(name) < 0) {
            expect(false).customError(name + 'column is not found in the Audit report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verify that "Port. Ending Market Value" displayed against each security.', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Port. Ending Market Value - FI_TBR_PORT', '').then(function(securityArr) {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Port. Ending Market Value - FI_TBR_PORT', 'Port. Ending Market Value').then(function(valueArr) {
          securityArr.forEach(function(rowName, index) {
            if (valueArr[index] === '') {
              expect(false).customError('Null value is displayed for "' + rowName + '"');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verify that Report view "Port. Ending Market Value" value should match with Audit view ' + '"Port. Ending Market Value"', function() {
      SlickGridFunctions.getCellReference('Characteristics - Summary', 'Port. Ending Market Value', '', 'Data', 'FI_TBR_PORT').then(function(reference) {
        reference.getText().then(function(reportValue) {
          SlickGridFunctions.getCellReference('Port. Ending Market Value - FI_TBR_PORT', 'Total', '', 'Port. Ending Market Value').then(function(auditValueRef) {
            auditValueRef.getText().then(function(auditValue) {
              AuditMode.roundAndMatch(reportValue, auditValue);
            });
          });
        });
      });
    });

    it('Verify that the "Port. Ending Market Value" is highlighted in report view', function() {
      SlickGridFunctions.getCellReference('Characteristics - Summary', 'Port. Ending Market Value', '', 'Data', 'FI_TBR_PORT').then(function(reference) {
        reference.getAttribute('class').then(function(val) {
          if (val.indexOf('selected') < 0) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('"Port. Ending Market Value" is not highlighted');
          }
        });
      });
    });
  });

  describe('Test Step ID: 622918', function() {

    it('Should Click on "Port. Ending Price" row value under the column "FI_TBR_PORT > Data",in report view', function() {
      SlickGridFunctions.getCellReference('Characteristics - Summary', 'Port. Ending Price', '', 'Data', 'FI_TBR_PORT').then(function(reference) {
        reference.click().then(function() {
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying audit section Title is "Port. Ending Price - FI_TBR_PORT"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(title) {
        if (title !== 'Port. Ending Price - FI_TBR_PORT') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit title is not matched with "Port. Ending Price - FI_TBR_PORT"');
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "5/19/2009"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '5/19/2009') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('The Audit date range is not matched with "5/19/2009"');
        }
      });
    });

    it('Verify that "Total- Port. Ending Price" in the Audit View matches with the "Port. Ending Price" value ' + 'from report view', function() {
      SlickGridFunctions.getCellReference('Characteristics - Summary', 'Port. Ending Price', '', 'Data', 'FI_TBR_PORT').then(function(reference) {
        reference.getText().then(function(reportValue) {
          SlickGridFunctions.getCellReference('Port. Ending Price - FI_TBR_PORT', 'Total', '', 'Port. Ending Price').then(function(auditValueRef) {
            auditValueRef.getText().then(function(auditValue) {
              AuditMode.roundAndMatch(reportValue, auditValue);
            });
          }, function(error) {
            console.log(error);
          });
        });
      }, function(error) {
        console.log(error);
        if (error.name === 'StaleElementReferenceError') {
          SlickGridFunctions.getCellReference('Characteristics - Summary', 'Port. Ending Price', '', 'Data', 'FI_TBR_PORT').then(function(reference) {
            reference.getText().then(function(reportValue) {
              SlickGridFunctions.getCellReference('Port. Ending Price - FI_TBR_PORT', 'Total', '', 'Port. Ending Price').then(function(auditValueRef) {
                auditValueRef.getText().then(function(auditValue) {
                  AuditMode.roundAndMatch(reportValue, auditValue);
                });
              });
            });
          });
        }
      });
    });

    it('Verify that the "Port. Ending Price" is highlighted in report view', function() {
      SlickGridFunctions.getCellReference('Characteristics - Summary', 'Port. Ending Price', '', 'Data', 'FI_TBR_PORT').then(function(reference) {
        reference.getAttribute('class').then(function(val) {
          if (val.indexOf('selected') < 0) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('"Port. Ending Price" value is not highlighted');
          }
        });
      });
    });
  });

  describe('Test Step ID: 622930', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Done" button' + err);
      });
    });

    it('Should click on the "Wrench" icon in the "Characteristics - Summary" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Characteristics - Summary').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on wrench icon:' + err);
      });
    });

    it('Should select "Options" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while selecting "Options":' + err);
      });
    });

    it('Verifying if view changed to "Tile Options - Characteristics - Summary" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Characteristics - Summary') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('view is not changed to "Tile Options - Characteristics - Summary" mode');
        }
      });
    });

    it('Should verify that view is opened with Dates pane highlighted', function() {
      // Verifying that view displayed is "Dates"
      TileOptions.getOptionTitle().getText().then(function(headerText) {
        expect(headerText === 'Dates').customError('"Dates" pane is not highlighted be default');
        if (headerText !== 'Dates') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Report Frequency" drop down ', function() {
      TileOptionsDates.getReportFrequencyBtn().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Multi-Horizon" from "Report Frequency" dropdown', function() {
      TileOptionsDates.getOption('Multi-Horizon').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verify that "Multi-Horizon" is selected
      TileOptionsDates.getReportFrequencyBtn().getText().then(function(value) {
        if (value !== 'Multi-Horizon') {
          expect(false).customError('"Multi-Horizon" is not selected');
        }
      });
    });

    it('Should verify that "End Date" field contains "One Day Ago"', function() {
      TileOptionsDates.getDateField('multi-horizon end date').getAttribute('value').then(function(val) {
        if (val !== 'One Day Ago') {
          expect(false).customError('"End Date" field does not contains "One Day Ago"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Add" Button', function() {
      TileOptionsDates.getAddButton().click().then(function() {
      }, function(err) {

        expect(false).customError('Error found while clicking on "Add" button ' + err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "One Day Ago" is added to the list box', function() {
      TileOptionsDates.getMultiHorizonListItem('One Day Ago').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"One Day Ago" is not added to the list box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in "Tile Options-Multi Horizon Returns" page', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should Wait for "Characteristics - Summary" report to calculate', function() {
      // Wait for report to start calculation
      browser.sleep(2000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Characteristics - Summary" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Characteristics - Summary').then(function(displayed) {
        expect(displayed).customError('"Characteristics - Summary" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Characteristics - Summary')).toBeTruthy();
        } else {
          CommonFunctions.takeScreenShot();
          expect(false).customError(error);
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(dialogRef) {
        if (dialogRef) {
          expect(false).customError('Calculation Error dialog box is appeared.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for DOM elements to load
      browser.sleep(2000);
    });

    it('Should right click on "Port. Ending Price" row and "FI_TBR_PORT > Data" column', function() {
      var eleRef = SlickGridFunctions.getCellReference('Characteristics - Summary', 'Port. Ending Market Value', '', 'Data', 'FI_TBR_PORT');
      eleRef.then(function() {
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          eleRef = SlickGridFunctions.getCellReference('Characteristics - Summary', 'Port. Ending Market Value', '', 'Data', 'FI_TBR_PORT');
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      eleRef.then(function(reference) {
        PA3MainPage.rightClickOnGivenElement(reference);
      });
    });

    it('Verify that "Audit" option is not available in the right click menu', function() {
      PA3MainPage.getOptionFromCustomMenu('Audit').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Audit" option is available in the right click menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 622940', function() {

    it('Should click on the "Wrench" icon in the "Characteristics - Summary" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Characteristics - Summary').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on wrench icon:' + err);
      });
    });

    it('Should select "Options" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while selecting "Options":' + err);
      });
    });

    it('Verifying if "Tile Options" view appeared', function() {
      TileOptions.isTileOptionsMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Tile Options" view is not appeared');
        }
      });
    });

    it('Should verify that view is opened with Dates pane highlighted', function() {
      // Verifying that view displayed is "Dates"
      TileOptions.getOptionTitle().getText().then(function(headerText) {
        expect(headerText === 'Dates').customError('"Dates" pane is not highlighted be default');
        if (headerText !== 'Dates') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Report Frequency" drop down ', function() {
      TileOptionsDates.getReportFrequencyBtn().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Single" from "Report Frequency" dropdown', function() {
      TileOptionsDates.getOption('Single').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verify that "Multi-Horizon" is selected
      TileOptionsDates.getReportFrequencyBtn().getText().then(function(value) {
        if (value !== 'Single') {
          expect(false).customError('"Multi-Horizon" is not selected');
        }
      });
    });

    it('Should click on "OK" button in "Tile Options" page', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should Wait for "Characteristics - Summary" report to calculate', function() {
      // Wait for report to start calculation
      browser.sleep(2000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Characteristics - Summary" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Characteristics - Summary').then(function(displayed) {
        expect(displayed).customError('"Characteristics - Summary" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Characteristics - Summary')).toBeTruthy();
        } else {
          CommonFunctions.takeScreenShot();
          expect(false).customError(error);
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(dialogRef) {
        if (dialogRef) {
          expect(false).customError('Calculation Error dialog box is appeared.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for DOM elements to load
      browser.sleep(2000);
    });

    it('Should right click on "Port. Ending Price" row and "Russell 1000 Growth > Data" column', function() {
      SlickGridFunctions.getCellReference('Characteristics - Summary', 'Port. Ending Price', '', 'Data', 'Russell 1000 Growth').then(function(reference) {
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

    it('Verifying audit section Title is "Port. Ending Price - Russell 1000 Growth"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(title) {
        if (title !== 'Port. Ending Price - Russell 1000 Growth') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit title is not matched with "Port. Ending Price - Russell 1000 Growth"');
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "5/19/2009"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '5/19/2009') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('The Audit date range is not matched with "5/19/2009"');
        }
      });
    });

    it('Should handle Stale Element Reference error for the next step to get cell value', function() {
      // Handling Stale Element Reference error for the next step to get cell value
      var eleRef = SlickGridFunctions.getCellReference('Characteristics - Summary', 'Port. Ending Price', '', 'Data', 'Russell 1000 Growth');
      eleRef.then(function() {
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          CommonFunctions.waitUntilElementAppears(eleRef, 4000, 'Cell value for "Port. Ending Price" column is not appeared even after waiting for 4 seconds.').then(function() {
          }, function(error) {

            if (error.name === 'StaleElementReferenceError') {
              expect(false).customError('StaleElementReferenceError appeared even after waiting for 4 seconds to make element appear on web page');
            }
          });
        }
      });
    });

    it('Verify that Report view "Port. Ending Price" value should match with Audit view "Port. Ending Price"', function() {
      SlickGridFunctions.getCellReference('Characteristics - Summary', 'Port. Ending Price', '', 'Data', 'Russell 1000 Growth').then(function(reference) {
        reference.getText().then(function(reportValue) {
          SlickGridFunctions.getCellReference('Port. Ending Price - Russell 1000 Growth', 'Total', '', 'Port. Ending Price').then(function(auditValueRef) {
            auditValueRef.getText().then(function(auditValue) {
              AuditMode.roundAndMatch(reportValue, auditValue);
            });
          });
        });
      });
    });

    it('Verify that the "Port. Ending Price" value is highlighted in report view', function() {
      SlickGridFunctions.getCellReference('Characteristics - Summary', 'Port. Ending Price', '', 'Data', 'Russell 1000 Growth').then(function(reference) {
        reference.getAttribute('class').then(function(val) {
          if (val.indexOf('selected') < 0) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('"Port. Ending Price" value is not highlighted');
          }
        });
      });
    });
  });

  describe('Test Step ID: 619088', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Done" button' + err);
      });
    });

    it('Should click on "Hamburger" icon next to "Portfolio"', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "B&H" dropdown next to the "FI_TBR_PORT"', function() {
      PA3MainPage.getDropdownFromAccountsDropdown('Portfolio', 'FI_TBR_PORT').getText().then(function(val) {
        if (val === 'B&H') {
          PA3MainPage.getDropdownFromAccountsDropdown('Portfolio', 'FI_TBR_PORT').click().then(function() {
          }, function(error) {

            CommonFunctions.takeScreenShot();
            expect(false).customError(error);
          });
        } else {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Dropdown next to the "FI_TBR_PORT" contains text:' + val);
        }
      });
    });

    it('Should select "TBR" from the dropdown', function() {
      PA3MainPage.getOption('TBR').click().then(function() {
      }, function(error) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(error);
      });
    });

    it('Should select "OK" button from the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class')).not.toContain('active');
    });

    it('Should handle Stale Element Reference error for the next step to get cell value', function() {
      // Handling Stale Element Reference error for the next step to get cell value
      var eleRef = SlickGridFunctions.getCellReference('Characteristics - Summary', 'Port. Ending Market Value', '', 'Data', 'FI_TBR_PORT');
      eleRef.then(function() {
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          CommonFunctions.waitUntilElementAppears(eleRef, 4000, 'Cell value for "FI_TBR_PORT > Data" column is not appeared even after waiting for 4 seconds.').then(function() {
          }, function(error) {

            if (error.name === 'StaleElementReferenceError') {
              expect(false).customError('StaleElementReferenceError appeared even after waiting for 4 seconds to make element appear on web page');
            }
          });
        }
      });
    });

    it('Should right Click on "Port. Ending Market Value" row value under the column "FI_TBR_PORT > Data" ' + 'and select "Audit Value"', function() {
      SlickGridFunctions.getCellReference('Characteristics - Summary', 'Port. Ending Market Value', '', 'Data', 'FI_TBR_PORT').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    AuditMode.verifyIfReportIsCalculated('Port. Ending Market Value - FI_TBR_PORT');

    it('Verifying audit section Title is "Port. Ending Market Value - FI_TBR_PORT"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(title) {
        if (title !== 'Port. Ending Market Value - FI_TBR_PORT') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit title is not matched with "Port. Ending Market Value - FI_TBR_PORT"');
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "5/19/2009"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '5/19/2009') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('The Audit date range is not matched with "5/19/2009"');
        }
      });
    });

    it('Verify that Report view "Port. Ending Market Value" value should match with Audit view ' + '"Port. Ending Market Value"', function() {
      SlickGridFunctions.getCellReference('Characteristics - Summary', 'Port. Ending Market Value', '', 'Data', 'FI_TBR_PORT').then(function(reference) {
        reference.getText().then(function(reportValue) {
          SlickGridFunctions.getCellReference('Port. Ending Market Value - FI_TBR_PORT', 'Total', '', 'Port. Ending Market Value').then(function(auditValueRef) {
            auditValueRef.getText().then(function(auditValue) {
              AuditMode.roundAndMatch(reportValue, auditValue);
            });
          });
        });
      });
    });

    it('Verify that the "Port. Ending Market Value" is highlighted in report view', function() {
      SlickGridFunctions.getCellReference('Characteristics - Summary', 'Port. Ending Market Value', '', 'Data', 'FI_TBR_PORT').then(function(reference) {
        reference.getAttribute('class').then(function(val) {
          if (val.indexOf('selected') < 0) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('"Port. Ending Market Value" is not highlighted');
          }
        });
      });
    });
  });

  describe('Test Step ID: 619411', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Done" button' + err);
      });
    });

    it('Should launch "Client:;Pa3;Audit;AUDIT_OFF_DT_RANGE" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('audit-off-dt-range');
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
        } else {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Error found while calculating the "Weights" report' + error);
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Calculation Error" popup was appeared');
        }
      });
    });

    it('Verifying if "Weights" report is grouped by date range: "2/02/2016 - 6/02/2016"', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(value) {
        if (value !== '2/02/2016 - 6/02/2016') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Report was not grouped by date range: "2/02/2016 - 6/02/2016"');
        }
      });
    });
  });

  describe('Test Step ID: 619412', function() {

    it('Should right click on the "Total" row value under "Fixed_PE" column and select "Audit Value"', function() {
      PA3MainPage.getValueFromCalculatedReport('Weights', 'Total', 'Fixed_PE', rowClass, colClass, 'true').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });

      browser.sleep(2000);
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

    it('Verifying audit section Title is "Fixed_PE"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(title) {
        if (title !== 'Fixed_PE') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit title is not matched with "Fixed_PE"');
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "2/02/2016 - 6/02/2016"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '2/02/2016 - 6/02/2016') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('The Audit date range is not matched with "2/02/2016 - 6/02/2016"');
        }
      });
    });

    var flag = 0;
    it('Verify that "Audit" view should display "Fixed_PE" against different dates', function() {
      AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Fixed_PE', 1, true).each(function(ele) {
        ele.getText().then(function(text) {
          Utilities.isDate(text).then(function(val) {
            if (!val) {
              expect(false).customError('Audit view is not shown for valid date' + val);
              flag = flag + 1;
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

    it('Verify that Audit View should display "Fixed_PE" column', function() {
      AuditMode.getAllColumnOfCalculatedReport('Fixed_PE', true).each(function(references) {
        references.getText().then(function(value) {
          value = value.replace(/\n/g, ' ');
          if (value !== 'Fixed_PE') {
            CommonFunctions.takeScreenShot();
            expect(false).customError(value + ' Column is not found in the Audit report');
          }
        });
      });
    });
  });

  describe('Test Step ID: 619413', function() {

    it('Should click on the "2/02/2016 > Non-Fix_PE" value for "Total" row in Report View', function() {
      SlickGridFunctions.getCellReference('Weights', 'Total', '', 'Non_Fix_PE', '2/02/2016').then(function(reference) {
        reference.click();
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying audit section Title is "Non_Fix_PE"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(title) {
        if (title !== 'Non_Fix_PE') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit title is not matched with "Non_Fix_PE"');
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "2/02/2016"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '2/02/2016') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('The Audit date range is not matched with "2/02/2016"');
        }
      });
    });

    it('Verify that Report view "Non_Fix_PE-Total" value should match with Audit view ' + '"2/02/2016>Non_Fix_PE-Total"', function() {
      SlickGridFunctions.getCellReference('Weights', 'Total', '', 'Non_Fix_PE', '2/02/2016').then(function(reference) {
        reference.getText().then(function(reportValue) {
          AuditMode.getValueFromCalculatedReport('Non_Fix_PE', 'Total', 'Non_Fix_PE', rowClass, colClass).then(function(auditValue) {
            AuditMode.roundAndMatch(reportValue, auditValue);
          });
        });
      });
    });

    it('Verify that the "2/02/2016>Non_Fix_PE - Total" value is highlighted in report view', function() {
      SlickGridFunctions.getCellReference('Weights', 'Total', '', 'Non_Fix_PE', '2/02/2016').then(function(reference) {
        reference.getAttribute('class').then(function(val) {
          if (val.indexOf('selected') < 0) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('"2/02/2016>Non_Fix_PE - Total" value is not highlighted');
          }
        });
      });
    });
  });

  describe('Test Step ID: 619911', function() {

    it('Should click on the "5/31/2016 > Non-Fix_PE" value for "Total" row in Report View', function() {
      browser.driver.executeScript('return $( ".tf-slick-grid:eq(0)" ).data( "$tfSlickGridController" )' + '.grid.scrollCellIntoView( 1, 8 )');

      SlickGridFunctions.getCellReference('Weights', 'Total', '', 'Non_Fix_PE', '5/31/2016').then(function(reference) {
        reference.click();
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying audit section Title is "Non_Fix_PE"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(title) {
        if (title !== 'Non_Fix_PE') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit title is not matched with "Non_Fix_PE"');
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "5/31/2016"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '5/31/2016') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('The Audit date range is not matched with "5/31/2016"');
        }
      });
    });

    it('Verify that Report view "5/31/2016 > Non-Fix_PE" value should match with Audit view "Non-Fix_PE"', function() {
      SlickGridFunctions.getCellReference('Weights', 'Total', '', 'Non_Fix_PE', '5/31/2016').then(function(reference) {
        reference.getText().then(function(reportValue) {
          SlickGridFunctions.getCellReference('Non_Fix_PE', 'Total', '', 'Non_Fix_PE', '5/31/2016').then(function(auditValueRef) {
            auditValueRef.getText().then(function(auditValue) {
              AuditMode.roundAndMatch(reportValue, auditValue);
            });
          });
        });
      });
    });

    it('Verify that the "5/31/2016 > Non-Fix_PE" is highlighted in report view', function() {
      SlickGridFunctions.getCellReference('Weights', 'Total', '', 'Non_Fix_PE', '5/31/2016').then(function(reference) {
        reference.getAttribute('class').then(function(val) {
          if (val.indexOf('selected') < 0) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('"5/31/2016 > Non-Fix_PE" value is not highlighted');
          }
        });
      });
    });
  });
});
