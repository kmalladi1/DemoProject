'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: audit-level', function() {

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  // Local function(s)
  var getValRefFromReportView = function(rowName, colName, isTicker) {
    // Variable(s)
    var defer = protractor.promise.defer();
    var promise = defer.promise;
    browser.driver.executeScript(function() {
      var slickObject;
      var rowIndex;
      var value;
      slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
      var col = slickObject.grid.getColumns();
      var rowlength = slickObject.grid.getDataLength();
      for (var i = 0; i < rowlength; i++) {
        if (arguments[2] === true && slickObject.grid.getDataItem(i)[0] === arguments[0]) {
          rowIndex = i + 1;
        } else if (arguments[2] !== true && slickObject.grid.getDataItem(i)[0] === arguments[0]) {
          rowIndex = i + 1;
        }
      }

      for (var j = 0; j < col.length; j++) {
        if (col[j].name.replace(/&amp;/g, '&').replace(/<br>/g, ' ') === arguments[1]) {
          slickObject.grid.scrollCellIntoView(rowIndex, j);
          value = slickObject.grid.getCellNode(rowIndex, j);
          break;
        }
      }

      return value;
    }, rowName, colName, isTicker).then(function(ref) {
      defer.fulfill(ref);
    });

    return promise;
  };

  var dateRange = ['3/13/2015 to 3/16/2015', '3/12/2015 to 3/13/2015', '3/11/2015 to 3/12/2015',
    '3/10/2015 to 3/11/2015', '3/09/2015 to 3/10/2015', '3/06/2015 to 3/09/2015',
    '3/05/2015 to 3/06/2015', '3/04/2015 to 3/05/2015', '3/03/2015 to 3/04/2015', '3/02/2015 to 3/03/2015', '2/27/2015 to 3/02/2015',];
  var arrDateRange1 = ['4/17/2015 to 4/20/2015', '4/16/2015 to 4/17/2015',
    '4/15/2015 to 4/16/2015', '4/14/2015 to 4/15/2015', '4/13/2015 to 4/14/2015', '4/10/2015 to 4/13/2015',
    '4/09/2015 to 4/10/2015', '4/08/2015 to 4/09/2015', '4/07/2015 to 4/08/2015', '4/06/2015 to 4/07/2015',
    '4/02/2015 to 4/06/2015', '4/01/2015 to 4/02/2015', '3/31/2015 to 4/01/2015',];

  var rowClassName1 = 'slick-pane slick-pane-top slick-pane-left';
  var colClassName1 = 'slick-pane slick-pane-top slick-pane-right';

  describe('Test Step ID: 498321', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch PA3 Application with "Client:;Pa3;Audit;AUDIT_LEVEL" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('audit-level');
    });

    it('Should select "Automatic Calculation" option', function() {
      // Un-check "Automatic Calculation" to force re-check it
      PA3MainPage.getWrenchIcon().click();
      PA3MainPage.setAutomaticCalculation(false);

      // Click on Wrench button to select "Automatic Calculation"
      PA3MainPage.getWrenchIcon().click();
      expect(PA3MainPage.setAutomaticCalculation(true)).toBeTruthy();
    });

    it('Should select "Contribution-Time Series" from the LHP', function() {
      PA3MainPage.getReports('Contribution-Time Series').click();
    });

    it('Should Wait for "Contribution-Time Series" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 200000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Contribution-Time Series" report appeared without any issues', function() {
      // Verifying if "Contribution" report is calculated
      PA3MainPage.isReportCalculated('Contribution').then(function(displayed) {
        expect(displayed).customError('"Contribution" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
        } else {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Error found while calculating the "Contribution" report' + error);
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" popup was appeared');
        }
      });
    });

    it('Verifying that report is grouped by "Economic Sector"', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution').getText().then(function(refVal) {
        if (refVal.indexOf('Economic Sector') === -1) {
          expect(false).customError('The report is not grouped by "Economic Sector"');
          CommonFunctions.takeScreenShot();
        }
      });

      browser.sleep(3000);
    });
  });

  describe('Test Step ID: 498340', function() {

    it('Should right click on the "Total Return" value for "Total" grouping and select "Audit Value"', function() {
      PA3MainPage.getValueFromCalculatedReport('Contribution', 'Total', 'Total Return',
       rowClassName1, colClassName1, true).then(function(reference) {
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

    AuditMode.verifyIfReportIsCalculated('Total Return');

    it('Verify that Date Range from Audit View should match with the Date Range from Report', function() {
      AuditMode.getReportDate('Contribution').getWebElement().then(function(reportDateRef) {
        reportDateRef.getText().then(function(reportDate) {
          element(by.xpath(AuditMode.xpathAuditDate)).getWebElement().getText().then(function(value) {
            if (value !== reportDate) {
              CommonFunctions.takeScreenShot();
              expect(false).customError('The report date range is not matched with audit view');
            }
          });
        });
      });
    });

    it('Verifying that Audit view should display "Total Return" values in Yearly time period.', function() {
      AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Total Return', 1, true).each(function(reference) {
        Utilities.makeElementVisible(reference);
        reference.getText().then(function(value) {
          var arrDate = value.split(' to ').join('/').split('/');
          expect(parseInt(arrDate[5]) - parseInt(arrDate[2])).toEqual(1);
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Verifying that Column Help section is displayed with Title "Portfolio Total Return"', function() {
      expect(AuditMode.getColumnHelpSectionName().getText()).toEqual('Portfolio Total Return');
      AuditMode.getColumnHelpSectionName().getText().then(function(value) {
        if (value !== 'Portfolio Total Return') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Column Help section is not diplayed with Title "Portfolio Total Return"');
        }
      });
    });
  });

  describe('Test Step ID: 498341', function() {

    it('Should click on the "Port. Total Return" value for the date range: 12/31/2014 to 3/16/2015, In the Audit view', function() {
      SlickGridFunctions.getCellReference('Total Return', '12/31/2014 to 3/16/2015',
        '', 'Port. Total Return').then(function(reference) {
        reference.click().then(function() { }, function(err) {

          CommonFunctions.takeScreenShot();
          expect(false).customError('Error found while clicking on the value' + err);
        });
      });
    });

    AuditMode.verifyIfReportIsCalculated('Port. Total Return');

    it('Verifying that Audit view should display "Port. Total Return" values in Monthly time period.', function() {
      AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Port. Total Return', 1, true).each(function(reference) {
        reference.getText().then(function(value) {
          var arrDate = value.split(' to ').join('/').split('/');
          if (parseInt(arrDate[0]) === 12) {
            expect(parseInt(arrDate[3])).toEqual(1);
          } else {
            expect(parseInt(arrDate[3]) - parseInt(arrDate[0])).toEqual(1);
          }
        });
      });

      browser.sleep(3000);
    });
  });

  describe('Test Step ID: 498342', function() {

    it('Should click on the "Port. Total Return" value for the date range:2/27/2015 to 3/16/2015, In Audit view', function() {
      AuditMode.getValueFromCalculatedReport('Port. Total Return', '2/27/2015 to 3/16/2015', 'Port. Total Return',
        'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right', true).then(function(reference) {
        reference.click().then(function() { }, function(err) {

          CommonFunctions.takeScreenShot();
          expect(false).customError('Error found while clicking on the value' + err);
        });
      });
    });

    AuditMode.verifyIfReportIsCalculated('Total Return');

    var flag = 0;
    it('Verifying that Audit view should display Daily date range values', function() {
      AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Port. Total Return', 1).each(function(reference) {
        reference.getText().then(function(value) {
          if (dateRange.indexOf(value) === -1) {
            flag = flag + 1;
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }

            expect(false).customError('Daily date range values are not displayed in the report, Found:' + value);
          }
        });
      });
    });
  });

  describe('Test Step ID: 498343', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Done" button' + err);
      });
    });

    it('Should wait for the report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);

      // Close QA Info box if present
      PA3MainPage.closeQAInfoBox();
    });

    it('Should click on "wrench" icon in the "Contribution" report', function() {
      PA3MainPage.selectWrenchIcon('Contribution');
    });

    it('Verifying if the "wrench" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Wrench" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() { }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Options" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Tile Options" page not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "-3y" into the "Start Date" input field', function() {
      // Enter "-3y" into the "End Date" input field
      ThiefHelpers.getDatepickerClassReference('Start Date:').setDate('-3y');

      // Verifying if "-3y" is entered into the "End Date" input field
      ThiefHelpers.getDatepickerClassReference('Start Date:').getDate().then(function(text) {
        if (text !== '-3y') {
          expect(false).customError('Error: Failed to enter "-3y" into the "End Date" input field');
        }
      });
    });

    // Adding work around as suggested in test step
    it('Should click on "Dates" from LHP to remove the focus on text box', function() {
      ThiefHelpers.getOptionsPaneItemReference('Dates').select();
    });

    it('Should click on "OK" button', function() {
      TileOptions.getHeaderButton('OK').click().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking:' + err);
      });
    });

    it('Should Wait for "Contribution-Time Series" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 200000)).toBeTruthy();
    });

    it('Verify that "Contribution-Time Series" report is calculated', function() {
      // Verifying if Contribution-Time Series report is calculated
      PA3MainPage.isReportCalculated('Contribution-Time Series').then(function(displayed) {
        expect(displayed).customError('"Contribution-Time Series" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution-Time Series')).toBeTruthy();
        }
      });

      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(present) {
        expect(!present).customError('"Calculation Error" dialog box is seen while report calculation.');
        if (present) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Contribution-Time Series" report is grouped by date range: "12/30/2011 - 3/16/2015"', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(value) {
        if (value !== '12/30/2011 - 3/16/2015') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Report was not grouped by date range: "12/30/2011 - 3/16/2015"');
        }
      });

      browser.sleep(3000);
    });
  });

  describe('Test Step ID: 498344', function() {

    it('Should right click on the "Total Return" value for "Total" grouping and select "Audit Value"', function() {
      // Close QA Info Box if it is found
      PA3MainPage.closeQAInfoBox();

      PA3MainPage.getValueFromCalculatedReport('Contribution', 'Total', 'Total Return', rowClassName1, colClassName1, true).then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
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
      browser.sleep(2000);
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verify that Date Range from Audit View should match with the Date Range from report view', function() {
      AuditMode.getReportDate('Contribution').getWebElement().then(function(reportDateRef) {
        reportDateRef.getText().then(function(reportDate) {
          element(by.xpath(AuditMode.xpathAuditDate)).getWebElement().getText().then(function(value) {
            if (value !== reportDate) {
              CommonFunctions.takeScreenShot();
              expect(false).customError('The report date range is not matched with audit view');
            }
          });
        });
      });
    });

    it('Verifying that Audit view should display "Total Return" values in Monthly time period.', function() {
      AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Total Return', 1, true).each(function(reference) {
        Utilities.scrollElementToVisibility(reference);
        reference.getText().then(function(value) {
          var arrDate = value.split(' to ').join('/').split('/');
          if (parseInt(arrDate[0]) === 12) {
            expect(parseInt(arrDate[3])).toEqual(1);
          } else {
            expect(parseInt(arrDate[3]) - parseInt(arrDate[0])).toEqual(1);
          }
        });
      });

      browser.sleep(3000);
    });
  });

  describe('Test Step ID: 498345', function() {

    it('Should click on the "Port. Total Return" value for the date range:"2/27/2015 to 3/16/2015", In Audit view', function() {
      SlickGridFunctions.scrollCellIntoView('Total Return', '2/27/2015 to 3/16/2015', '', 'Port. Total Return');
      SlickGridFunctions.getCellReference('Total Return', '2/27/2015 to 3/16/2015', '', 'Port. Total Return').then(function(reference) {
        reference.click();
      });
    });

    AuditMode.verifyIfReportIsCalculated('Port. Total Return');

    var flag = 0;
    it('Verifying that Audit view should display Daily date range values', function() {
      AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Port. Total Return', 1, true).each(function(reference) {
        // Scrolling element to visibility
        Utilities.scrollElementToVisibility(reference);

        reference.getText().then(function(value) {
          if (dateRange.indexOf(value) === -1) {
            flag = flag + 1;
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }

            CommonFunctions.takeScreenShot();
            expect(false).customError('Daily date range values are not displayed in the report, Found:' + value);
          }
        });
      });
    });
  });

  describe('Test Step ID: 498349', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Done" button' + err);
      });
    });

    it('Should select "Attribution" from the LHP', function() {
      PA3MainPage.getReports('Attribution').click().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking :' + err);
      });
    });

    it('Should Wait for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 200000)).toBeTruthy();
    });

    it('Should click on the "Wrench" icon in the "Attribution" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution').click().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on wrench icon:' + err);
      });
    });

    it('Should select "Options" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while selecting "Options":' + err);
      });
    });

    it('Verifying if view changed to "Tile Options - Attribution" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Attribution') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('view is not changed to "Tile Options - Attribution" mode');
        }
      });
    });

    it('Should select "Columns" tab from LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while selecting "Columns":' + err);
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" option is not seleced from LHP');
        }
      });
    });

    it('Should enter "Bench" into the search field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('Bench');

      // Wait for the Search Result to appear
      browser.sleep(2000);
    });

    it('Should click on "Bench. Average Weight" from search result', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Bench. Average Weight').then(function(item) {
        item.select();
      });

      // Verifying if 'Bench. Average Weight' is selected
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Bench. Average Weight').then(function(item) {
        item.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Bench. Average Weight" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "Right" arrow button', function() {
      TileOptionsColumns.getArrowButton('right').click().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking' + err);
      });
    });

    it('Verifying if "Bench.Average Weight" is added to "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Bench. Average Weight').isPresent().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Bench.Average Weight" is not added to "Selected" section');
        }
      });
    });

    it('Should click on "OK" button', function() {
      TileOptions.getHeaderButton('OK').click().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking' + err);
      });
    });

    it('Waiting for the report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);
    });

    it('Should expand "Communications" in "Attribution" report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Attribution', 'Communications');

      // Verifying that "Communications" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Attribution', 'Communications');
      browser.sleep(3000);
    });

    it('Should right click on the "Port. Total Return" value for "AT&T Inc." and select "Audit Value"', function() {
      PA3MainPage.getValueFromCalculatedReport('Attribution', 'AT&T Inc.', 'Port. Total Return', undefined, undefined, true).then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      browser.sleep(1000);
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    var flag = 0;
    it('Verifying that Audit view should display "Port. Total Return" values in Daily time period', function() {
      AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Port. Total Return', 1, true).each(function(reference) {
        reference.getText().then(function(value) {
          if (arrDateRange1.indexOf(value) === -1) {
            flag = flag + 1;
            expect(false).customError('Daily date range values are not displayed in the report, Found:' + value);
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });

      browser.sleep(3000);
    });

    it('Should click on "Port. Total Return" column value for the date range "4/16/2015 to 4/17/2015" In Audit View', function() {
      SlickGridFunctions.scrollCellIntoView('Port. Total Return', '4/16/2015 to 4/17/2015', '', 'Port. Total Return');
      SlickGridFunctions.getCellReference('Port. Total Return', '4/16/2015 to 4/17/2015', '', 'Port. Total Return').then(function(reference) {
        reference.click();
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verify that the Date Range from Audit View is "4/16/2015 - 4/17/2015"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getWebElement().then(function(value) {
        value.getText().then(function(date) {
          if (date !== '4/16/2015 - 4/17/2015') {
            CommonFunctions.takeScreenShot();
            expect(false).customError('Audit date range does not match with the expected value');
          }
        });
      });
    });

    it('Verifying that the Audit view is calculated for "Port. Total Return"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Port. Total Return') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Port. Total Return"');
        }
      });
    });

    it('Verifying that the security name in the audit view is "AT&T Inc."', function() {
      AuditMode.getAuditViewSubHeaderName().getText().then(function(value) {
        if (value !== 'AT&T Inc.') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Security name in Audit view is not matched with teh expected value');
        }
      });
    });

    var arrOptions = ['Port. Beginning Price', 'Port. Ending Price'];
    arrOptions.forEach(function(optionName, index) {
      it('Verfying that audit view contains "Report Input" values for "' + optionName + '"', function() {
        AuditMode.getReportInputsSectionValues(index + 1, 1).getText().then(function(val) {
          if (val !== optionName) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('Report Input section does not have values for "' + optionName + '"');
          }
        });
      });
    });

    it('Verify that "Port. Total Return" value mentioned below Report Inputs should match the "Port. Total Return" ' + 'value up top', function() {
      AuditMode.getAuditViewHeaderValue().getText().then(function(auditHeaderValue) {
        AuditMode.getReportInputsSectionValues(3, 2).getText().then(function(value) {
          if (value !== auditHeaderValue) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('"Port. Total Return" values did not match in "Audit" view.');
          }
        });
      });
    });
  });

  describe('Test Step ID: 498350', function() {

    it('Should click on the "Bench. Average Weight" value for "Verizon Communications Inc" in report view', function() {
      browser.driver.executeScript('return $( ".tf-slick-grid:eq(0)" ).data( "$tfSlickGridController" )' +
        '.grid.scrollCellIntoView( 1, 13 )');
      AuditMode.getValueFromCalculatedMultiHeaderReport('Attribution', 'Verizon Communications Inc.', 13, 0, true).then(function(reference) {
        reference.click();
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      browser.sleep(2000);
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verify that Date Range from Audit View should match with the Date Range from report step', function() {
      AuditMode.getReportDate('Attribution').getWebElement().then(function(reportDateRef) {
        reportDateRef.getText().then(function(reportDate) {
          element(by.xpath(AuditMode.xpathAuditDate)).getWebElement().getText().then(function(value) {
            if (value !== reportDate) {
              CommonFunctions.takeScreenShot();
              expect(false).customError('The report date range is not matched with Audit view');
            }
          });
        });
      });
    });

    it('Verify that "Bench. Average Weight" column values in audit view should show as blue hyperlinks', function() {
      AuditMode.getAllCellsOfGivenColumn('Bench. Average Weight', 'Bench. Average Weight',
       'slick-pane slick-pane-bottom slick-pane-right', true).then(function(element) {
        element.forEach(function(ele) {
          expect(ele.$('a').getCssValue('color')).toContain('rgba(47, 108, 168, 1)');
        });
      });
    });

    var flag = 0;
    it('Verifying that Audit view should display "Bench. Average Weight" values in Daily time period', function() {
      AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Bench. Average Weight', 1, true).each(function(reference) {
        reference.getText().then(function(value) {
          if (arrDateRange1.indexOf(value) === -1) {
            flag = flag + 1;
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }

            expect(false).customError('Daily date range values are not displayed in the report, Found:' + value);
          }
        });
      });

      browser.sleep(3000);
    });
  });

  describe('Test Step ID: 498351', function() {

    it('Should click on "Bench Average Weight" value for the time period "4/17/2015 to 4/20/2015" In Audit View', function() {
      SlickGridFunctions.scrollCellIntoView('Bench. Average Weight', '4/17/2015 to 4/20/2015', '', 'Bench. Average Weight');
      SlickGridFunctions.getCellReference('Bench. Average Weight', '4/17/2015 to 4/20/2015', '',
        'Bench. Average Weight').then(function(reference) {
        reference.click();
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying that the Date range displayed in Audit view should be "4/17/2015 to 4/20/2015"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '4/17/2015 - 4/20/2015') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Date range did not matched with "4/17/2015 to 4/20/2015"');
        }
      });
    });

    it('Verifying that "Bench. Beginning Market" value should display in "blue" font', function() {
      expect(AuditMode.getReportInputsSectionValues(1, 2).$('a').getCssValue('color')).toContain('rgba(47, 108, 168, 1)');
    });

    it('Verifying that "Total Bench. Beginning Market Value" value should display in "black" font', function() {
      expect(AuditMode.getReportInputsSectionValues(2, 2).getCssValue('color')).toContain('rgba(0, 0, 0, 1)');
    });

    it('Verify that "Bench. Average Weight" shown beneath them with value same as displayed at the top', function() {
      AuditMode.getAuditViewHeaderValue().getText().then(function(auditHeaderValue) {
        AuditMode.getReportInputsSectionValues(3, 2).getText().then(function(value) {
          if (value !== auditHeaderValue) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('"Port. Total Return" values did not match in "Audit" view.');
          }
        });
      });
    });
  });

  describe('Test Step ID: 499757', function() {

    it('Should Click on the left arrow in Audit View', function() {
      AuditMode.getArrowButton('left').click().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking' + err);
      });

      browser.sleep(3000);
    });

    it('Should click on "Bench Average Weight" value for the time period "4/17/2015 to 4/20/2015" in Audit View ', function() {
      SlickGridFunctions.scrollCellIntoView('Bench. Average Weight', '4/17/2015 to 4/20/2015', '', 'Bench. Average Weight');
      SlickGridFunctions.getCellReference('Bench. Average Weight', '4/17/2015 to 4/20/2015', '',
        'Bench. Average Weight').then(function(reference) {
        reference.click();
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying that the Date range displayed in Audit view should be "4/17/2015 to 4/20/2015"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '4/17/2015 - 4/20/2015') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Date range did not matched with "4/17/2015 to 4/20/2015"');
        }
      });
    });

    it('Verifying that "Bench. Beginning Market" value should display in blue font', function() {
      expect(AuditMode.getReportInputsSectionValues(1, 2).$('a').getCssValue('color')).toContain('rgba(47, 108, 168, 1)');
    });

    it('Verifying that "Total Bench. Beginning Market Value" value should display in black font', function() {
      expect(AuditMode.getReportInputsSectionValues(2, 2).getCssValue('color')).toContain('rgba(0, 0, 0, 1)');
    });

    it('Verify that "Bench. Average Weight" shown beneath them with value same as displayed at the top', function() {
      AuditMode.getAuditViewHeaderValue().getText().then(function(auditHeaderValue) {
        AuditMode.getReportInputsSectionValues(3, 2).getText().then(function(value) {
          if (value !== auditHeaderValue) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('"Port. Total Return" values did not match in "Audit" view.');
          }
        });
      });
    });
  });

  describe('Test Step ID: 582081', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Done" button' + err);
      });
    });

    it('Verify that report should not auto calculate', function() {
      PA3MainPage.getReportCalculationDlg().isPresent().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Report is auto calculating');
        }
      });

      // Close QA Info box if present
      PA3MainPage.closeQAInfoBox();
    });

    it('Should click on "Economic Sector" hyperlink', function() {
      PA3MainPage.getGroupingsHyperLink('Attribution').click().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking' + err);
      });
    });

    it('Should click on "X" in the Selected section to remove all groupings', function() {
      // Close QA Info Box if it is found
      PA3MainPage.closeQAInfoBox();
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsGroupings.xpathRemoveAll).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button', function() {
      TileOptions.getHeaderButton('OK').click().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking:' + err);
      });
    });

    it('Should Wait for "Attribution" report to calculate', function() {
      browser.sleep(2000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 200000)).toBeTruthy();
    });

    it('Scroll the "Google Inc. Cl A" into view', function() {
      SlickGridFunctions.getAllRowsFromReport('Attribution').then(function(dataView) {
        dataView.forEach(function(eleRef, rowIndex) {
          if (eleRef[0] === 'Google Inc. Cl A') {
            SlickGridFunctions.scrollRowToTop('Attribution', rowIndex - 1);
          }
        });
      });
    });

    it('Should right click on "Bench. Average Weight" for "Google Inc. Cl A" and select "Audit Value" from the drop down ', function() {
      // Get cell value
      SlickGridFunctions.getCellReference('Attribution', 'Google Inc. Cl A', '',
        'Bench. Average Weight').then(function(reference) {
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

    it('Verifying that the Audit view is calculated for "Bench. Average Weight"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Bench. Average Weight') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Bench. Average Weight"');
        }
      });
    });

    it('Verifying if "Google Inc. Cl A" is displayed in the Audit view', function() {
      element(by.xpath('//*[@data-qa-id="audit-sub-header"]')).getText().then(function(value) {
        if (value !== 'Google Inc. Cl A') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Google Inc. Cl A"');
        }
      });
    });

    it('Verifying if date range is displayed below "Google Inc. Cl A" in the Audit view', function() {
      element(by.xpath('//*[@data-qa-id="audit-sub-header"]//following-sibling::*[@data-qa-id="audit-date-header"]')).isPresent().then(function(present) {
        if (!present) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Date range is not present under "Google Inc. Cl A".');
        }
      });
    });
  });

  describe('Test Step ID: 593426', function() {

    it('Scroll the "3D Systems Corporation" into view', function() {
      SlickGridFunctions.getAllRowsFromReport('Attribution').then(function(dataView) {
        dataView.forEach(function(eleRef, rowIndex) {
          if (eleRef[0] === '3D Systems Corporation') {
            SlickGridFunctions.scrollRowToTop('Attribution', rowIndex - 1);
          }
        });
      });
    });

    it('Should click on "Bench. Total Return" value for the "3D Systems Corporation" , In report view', function() {
      AuditMode.getValueFromCalculatedMultiHeaderReport('Attribution', '3D Systems Corporation', 5, 0, true).then(function(reference) {
        reference.click().then(function() { }, function(err) {
          if (err.name === 'Index out of bound') {
            AuditMode.getValueFromCalculatedMultiHeaderReport('Attribution',
              '3D Systems Corporation', 5, 0, true).then(function(reference) {
              reference.click().then(function() { }, function(err) {

                expect(false).customError(err);
                CommonFunctions.takeScreenShot();
              });
            });
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying that the Audit view is calculated for "Bench. Total Return"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(value) {
        if (value !== 'Bench. Total Return') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit view is not calculated for "Bench. Total Return"');
        }
      });
    });

    it('Verifying that the security name in the audit view is "3D Systems Corporation"', function() {
      AuditMode.getAuditViewSubHeaderName().getText().then(function(value) {
        if (value !== '3D Systems Corporation') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Security name in Audit view is not matched with the expected value');
        }
      });
    });

    // As Per Known Issue RPD:21605784
    xit('Verify that the Audit View is displayed with text "Auditing is unavailable for this column."', function() {
      var errorXapth = '//*[contains(@class, "pa-audit-error-view")]' + '//*[normalize-space(.)="Auditing is unavailable for this column."]';
      element(by.xpath(errorXapth)).isPresent().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Audit View is not displayed with "Auditing is unavailable for this column."');
        }
      });
    });
  });

  describe('Test Step ID: 583256', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Done" button' + err);
      });

      // Close QA Info box if present
      PA3MainPage.closeQAInfoBox();
    });

    it('Should click on "Security Name" hyperlink', function() {
      PA3MainPage.getGroupingsHyperLink('Attribution').click().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking' + err);
      });
    });

    it('Should type "Economic Sector" into "Available" section search box', function() {
      TileOptionsGroupings.getAvailableSectionSearchBox().sendKeys('Economic Sector');

      // Wait for tree to update
      browser.sleep(2000);
    });

    it('Select "Economic Sector" from "Factset| Sector & Industry |Factset"', function() {
      TileOptionsGroupings.getElementFromAvailableSection('FactSet|Sector & Industry|FactSet', 'Economic Sector').click().then(function() { }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Economic Sector" is selected
      TileOptionsGroupings.getElementFromAvailableSection('FactSet|Sector & Industry|FactSet',
        'Economic Sector').getAttribute('class').then(function(value) {
        expect(value.indexOf('selected') > -1).customError('"Economic sector" is not selected.');
        if (value.indexOf('selected') < 0) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Double click on "Economic Sector" to add it to "Selected" container', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('FactSet|Sector & Industry|FactSet',
       'Economic Sector')).perform();
    });

    it('Verifying if "Economic Sector - FactSet" is added to the "Selected" container', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Economic Sector - FactSet').isPresent().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Economic sector" is not added to the "Selected" container');
        }
      });
    });

    it('Should click on the "OK" Button', function() {
      TileOptions.getHeaderButton('OK').click();
    });

    it('Verifying that report is grouped by "Economic Sector"', function() {
      PA3MainPage.getGroupingsHyperLink('Attribution').getText().then(function(refVal) {
        if (refVal.indexOf('Economic Sector') === -1) {
          expect(false).customError('The report is not grouped by "Economic Sector"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 498401', function() {

    it('Should select "Contribution - Audit Tests" from the LHP', function() {
      PA3MainPage.getReports('Contribution - Audit Tests').click().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Done" button' + err);
      });
    });

    it('Should Wait for "Contribution - Audit Tests" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 200000)).toBeTruthy();
    });

    it('Verifying that "Communications" is expanded in the report', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution - Audit Tests', 'Communications');
      browser.sleep(3000);
    });

    it('Should right click on the "Price Change (%)" value for "FTR" ticker and select audit Value', function() {
      PA3MainPage.getValueFromCalculatedReport('Contribution - Audit Tests', 'FTR', 'Price Change (%)',
        'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right', true).then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Verify that application is changed to "AUDIT" mode', function() {
      expect(AuditMode.isAuditMode()).toBeTruthy();
    });

    it('Should Wait for "Audit" report to calculate', function() {
      browser.sleep(2000);
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
      browser.sleep(2000);
    });

    var arrOptions = ['Beginning Price', 'Ending Price'];
    arrOptions.forEach(function(optionName, index) {
      it('Verifying the report contains values for "' + optionName + '"', function() {
        expect(AuditMode.getReportInputsSectionValues(index + 1, 1).getText()).toEqual(arrOptions[index]);
      });
    });

    it('Verifying that Audit window should not contain Formula section', function() {
      AuditMode.getFormulaSection().isPresent().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Formula section is displayed in the Audit window');
        }
      });

      browser.sleep(3000);
    });
  });

  describe('Test Step ID: 498403', function() {

    it('Should click on "Total Return" value for the "FTR" ticker, In report view', function() {
      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'FTR', 'Total Return',
        undefined, undefined, true).then(function(reference) {
        Utilities.scrollElementToVisibility(reference);
        reference.click().then(function() { }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
      browser.sleep(2000);
    });

    it('Verifying that "Audit view" should contain "Report Input" section', function() {
      AuditMode.getReportInputsSection('Total Return').isPresent().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit" is not showing "Report Input" section');
        }
      });
    });

    it('Verifying that Audit window should not contain Formula section', function() {
      AuditMode.getFormulaSection().isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Formula" section is displayed in Audit');
        }
      });
    });
  });

  describe('Test Step ID: 498405', function() {

    it('Should click on "Port. Profit & Loss" value for the "FTR" ticker, In report view', function() {
      getValRefFromReportView('FTR', 'Port. Profit & Loss', true).then(function(ref) {
        ref.click().then(function() { }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
      browser.sleep(3000);
    });

    it('Verifying that "Audit view" should contain "Report Input" section', function() {
      AuditMode.getReportInputsSection('Port. Profit & Loss').isPresent().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit" view is not showing "Report Input" section');
        }
      });
    });

    it('Verifying that Audit window should not contain Formula section', function() {
      AuditMode.getFormulaSection().isPresent().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit" view is showing Formula section');
        }
      });
    });
  });

  describe('Test Step ID: 498407', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Done" button' + err);
      });

      // Close QA Info box if present
      PA3MainPage.closeQAInfoBox();
    });

    it('Should select "Attribution" from the LHP', function() {
      PA3MainPage.getReports('Attribution').click();
    });

    it('Should Wait for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 200000)).toBeTruthy();
    });

    it('Verifying that "Communications" is expanded in "Attribution" report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Attribution', 'Communications');

      // Verifying that "Communications" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Attribution', 'Communications');
      browser.sleep(3000);
    });

    it('Should right click on the "Allocation Effect" value for "AT&T Inc." and select "Audit Value"', function() {
      PA3MainPage.getValueFromCalculatedReport('Attribution', 'AT&T Inc.', 'Allocation Effect',
        undefined, undefined, true, true).then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      browser.sleep(2000);
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Should click on "Allocation Effect" value for the "4/17/2015 to 4/20/2015" ticker, In report view', function() {
      SlickGridFunctions.scrollCellIntoView('Allocation Effect', '4/17/2015 to 4/20/2015', '', 'Allocation Effect');
      SlickGridFunctions.getCellReference('Allocation Effect', '4/17/2015 to 4/20/2015', '',
        'Allocation Effect').then(function(reference) {
        reference.click();
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      browser.sleep(2000);
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying that "Audit view" should contain "Report Input" section', function() {
      AuditMode.getReportInputsSection('Allocation Effect').isPresent().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit" view is not showing "Report Input" section');
        }
      });
    });

    it('Verifying that Audit window should not contain Formula section', function() {
      AuditMode.getFormulaSection().isPresent().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit" is showing "Formula" section');
        }
      });
    });
  });

  describe('Test Step ID: 498408', function() {

    it('Should expand "Consumer Non-Durables" from report View ', function() {
      AuditMode.expandTreeInCalculatedReport('Attribution', 'Consumer Non-Durables');

      // Verifying that "Consumer Durables" is expanded
      AuditMode.checkIfTreeExpandedInCalculatedReport('Attribution', 'Consumer Non-Durables');
      browser.sleep(3000);
    });

    it('Should click on the "Total Effect" value for "Altria Group Inc" in report view', function() {
      getValRefFromReportView('Altria Group Inc', 'Total Effect', false).then(function(ref) {
        ref.click().then(function() { }, function(error) {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    AuditMode.verifyIfReportIsCalculated('Total Effect');

    it('Scroll the element into view', function() {
      SlickGridFunctions.scrollCellIntoView('Total Effect', '4/17/2015 to 4/20/2015', '', 'Total Effect');
    });

    it('Should click on the "Total Effect" value for the time period 4/17/2015 to 4/20/2015 in Audit view', function() {
      SlickGridFunctions.getCellReference('Total Effect', '4/17/2015 to 4/20/2015', '', 'Total Effect').then(function(reference) {
        reference.click();
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          SlickGridFunctions.getCellReference('Total Effect', '4/17/2015 to 4/20/2015', '',
            'Total Effect').then(function(reference) {
            reference.click();
          }, function(error) {

            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
        }

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying that "Audit view" should contain "Report Input" section', function() {
      AuditMode.getReportInputsSection('Total Effect').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Report Input" section is not appeared in Audit window');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that Audit window should not contain Formula section', function() {
      AuditMode.getFormulaSection().isPresent().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit" is showing "Formula" section');
        }
      });
    });
  });

  describe('Test Step ID: 498409', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() { }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Done" button :' + err);
      });

      // Close QA Info box if present
      PA3MainPage.closeQAInfoBox();
    });

    it('Verify that the application is displayed in normal mode', function() {
      expect(PA3MainPage.isNormalMode()).toBeTruthy();
    });
  });
});
