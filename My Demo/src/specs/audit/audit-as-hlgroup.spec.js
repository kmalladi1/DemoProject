'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: audit-as-hlgroup', function() {

  var verifyAuditPane = function() {

    it('Verifying if the title  is "Total Return"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(text) {
        if (text !== 'Total Return') {
          expect(false).customError('Audit view title is not "Total Return" Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that the value displayed in the "Audit View" header is "1.0812"', function() {
      AuditMode.getAuditViewHeaderValue().getText().then(function(value) {
        if (parseFloat(value) !== 1.0812) {
          expect(false).customError('Audit value is not matched with the expected value. expected:1.0812. Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrReportInputs = ['Port. Beginning Price', 'Port. Ending Price', 'Total Return'];
    var screenShot = 0;
    var arrText = [];
    it('Verifying if Audit view Report Input section contains "' + arrReportInputs + '"', function() {
      browser.call(function() {
        element.all(by.xpath(AuditMode.xpathReportInputsTable + '//td[1]')).each(function(eleRef) {
          eleRef.getText().then(function(text) {
            arrText.push(text);
          });
        });
      }).then(function() {
        arrReportInputs.forEach(function(cellName, index) {
          if (cellName !== arrText[index]) {
            expect(false).customError('Report Input section did not contains "' + cellName + '", found ' + arrText[index]);
            screenShot++;
            if (screenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  };

  describe('Test Step ID: 643721', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Audit/AUDIT_HLGRP_AS', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('audit-hlgrp-as');
    });

    it('Should wait for "Active Share" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Active Share" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Active Share', true).then(function(displayed) {
        expect(displayed).customError('"Active Share" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Active Share')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if "Active Share" report is highlighted in LHP', function() {
      PA3MainPage.getReports('Active Share').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Active Share" did not selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Date" hyperlink value is "30-MAY-2016"', function() {
      PA3MainPage.getDateHyperLink('Active Share').getText().then(function(text) {
        if (text !== '30-MAY-2016') {
          expect(false).customError('Date hyperlink did not set to "30-MAY-2016"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 643724', function() {

    it('Should right click on "5 Highest" group value from "Active Share" column and select "Audit Value"', function() {
      SlickGridFunctions.getCellReference('Active Share', '', 'Ticker', 'Active Share').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying if any error dialog box is not appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if "Audit Mode" page is opened', function() {
      AuditMode.isAuditMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Audit Mode" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "5 Highest" in "Active Share" report', function() {
      AuditMode.expandTreeInCalculatedReport('Active Share', '5 Highest', undefined, undefined, true);

      // Verifying that "Commercial Services|Advertising/Marketing Services" is expanded
      AuditMode.checkIfTreeExpandedInCalculatedReport('Active Share', '5 Highest', undefined, true);

      //waiting for the elements to load in the browser.
      browser.sleep(3000);
    });

    it('Verifying if the title  is "Active Share"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(text) {
        if (text !== 'Active Share') {
          expect(false).customError('Title did not "Active Share" Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "30-MAY-2016"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '30-MAY-2016') {
          expect(false).customError('The Audit date range is not matched with "30-MAY-2016"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "5 Highest" is appear in the report', function() {
      AuditMode.getElementFromSpecifiedLevelOfCalculatedReport('Active Share', 1, '5 Highest', undefined, true)
        .isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"5 Highest" did not present in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if values are displayed for different sceurites within "5 Highest" group in "Active" Share Column', function() {
      AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Active Share', 2, true).getText().then(function(arr) {
        arr.forEach(function(value, index) {
          AuditMode.getValueFromReportOfGivenColumn('Active Share', 'Active Share',
            'slick-pane slick-pane-bottom slick-pane-right', index, true).then(function(value1) {
            value1.getText().then(function(ele) {
              if (value === '' || ele === '') {
                expect(false).customError('Values did not display for different securities in "5 Highest" group');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        });
      });
    });

    it('Verifying if all values for different securities as hyperlink in "5 Highest" group', function() {
      AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Active Share', 2, true).getText().then(function(arr) {
        arr.forEach(function(value, index) {
          AuditMode.getValueFromReportOfGivenColumn('Active Share', 'Active Share',
            'slick-pane slick-pane-bottom slick-pane-right', index, true).then(function(value1) {
            expect(value1.$('a').isPresent()).toBeTruthy();
          });
        });
      });
    });

  });

  describe('Test Step ID: 643722', function() {

    var aaplSecurity;
    it('Should copying "Active Share" column value for "AAPL" security', function() {
      AuditMode.getValueFromCalculatedReport('Active Share', 'AAPL', 'Active Share', undefined, undefined, true, true)
        .then(function(reference) {
          reference.getText().then(function(text) {
            aaplSecurity = text;
          });
        });
    });

    it('Should click on "Active Share" column hyperlink for the security AAPL', function() {
      AuditMode.getValueFromCalculatedReport('Active Share', 'AAPL', 'Active Share', undefined, undefined, true, true)
        .then(function(reference) {
          reference.click().then(function() {
          }, function(err) {

            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        });

    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying if any error dialog box is not appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if the title  is "Active Share"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(text) {
        if (text !== 'Active Share') {
          expect(false).customError('Title did not "Active Share" Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the security is "Apple Inc.  (AAPL)"', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(text) {
        if (text !== 'Apple Inc.  (AAPL)') {
          expect(false).customError('Security value did not "Apple Inc.  (AAPL)"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "30-MAY-2016"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '30-MAY-2016') {
          expect(false).customError('The Audit date range is not matched with "30-MAY-2016"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if copied value is matched with Active Share header value', function() {
      AuditMode.getAuditViewHeaderValue('3', '2').getText().then(function(text) {
        if (text !== aaplSecurity) {
          expect(false).customError('Active Share header value did not match with Copied value; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if formula is displayed as "( Port. Ending Weight  -  Bench. Ending Weight ) ^ 2 ^ 0.5 / 2"', function() {
      AuditMode.getFormulaSection().getText().then(function(text) {
        if (text !== '( Port. Ending Weight  -  Bench. Ending Weight ) ^ 2 ^ 0.5 / 2') {
          expect(false).customError('Formula did not display as "( Port. Ending Weight  -  Bench. Ending Weight ) ^' +
            ' 2 ^ 0.5 / 2"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var rowNum = ['1', '2', '3'];
    var values = ['Port. Ending Weight', 'Bench. Ending Weight', 'Active Share'];

    rowNum.forEach(function(row, index) {

      it('Verifying if  for index "' + row + '" row name is "' + values[index] + '"', function() {
        AuditMode.getReportInputsSectionValues(row, '1').getText().then(function(text) {
          if (text !== values[index]) {
            expect(false).customError('For index "' + row + '" row name did not "' + values[index] + '"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var rowNum1 = ['1', '2'];
    var values1 = ['Port. Ending Weight', 'Bench. Ending Weight'];

    rowNum1.forEach(function(row, index) {

      it('Verifying if value is as hyperlink for  row "' + values1[index] + '"', function() {
        expect(AuditMode.getReportInputsSectionValues(row, '2').$('a').isPresent()).toBeTruthy();
      });

    });

    it('Verifying if copied value is matched with Active Share value', function() {
      AuditMode.getReportInputsSectionValues('3', '2').getText().then(function(text) {
        if (text !== aaplSecurity) {
          expect(false).customError('Active Share value did not match with Copied value; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 643723', function() {

    it('Should click on "Done" button to close the Audit mode', function() {
      ThiefHelpers.getButtonClassReference('Done').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Done" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Active Share" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Active Share" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Active Share', true).then(function(displayed) {
        expect(displayed).customError('"Active Share" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Active Share')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if "Audit Mode" page is close', function() {
      AuditMode.isAuditMode().then(function(flag) {
        if (flag) {
          expect(false).customError('"Audit Mode" page did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Wrench" icon available in Workspace', function() {
      PA3MainPage.selectWrenchIcon('Active Share');
    });

    it('Should select "Options" from the wrench menu drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function() {

        expect(false).customError('Unable to select "Options" from menu drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Option" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Option" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Groupings" tab from the LHP', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Groupings" tab from LHP');
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Groupings" tab is selected in LHP
      TileOptions.getLHPOption('Groupings').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Groupings" tab did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });

      browser.sleep(2000);
    });

    it('Should click on "X" button next to the "High/Low" from Selected section', function() {
      TileOptionsGroupings.getRemoveButtonOfElementInSelectedSection('High/Low').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "X" icon');
        CommonFunctions.takeScreenShot();
      });

    });

    it('Verifying if "Selected" section is empty', function() {
      TileOptionsGroupings.getAllElements('Selected').count().then(function(value) {
        if (value !== 0) {
          expect(false).customError('"Selected" section did not empty');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button to close the Tile Option page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Option" page is closed', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (flag) {
          expect(false).customError('"Tile Option" page did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should right click on "3M Company" group value from "Active Share" column and select "Audit Value"', function() {
      SlickGridFunctions.getCellReference('Active Share', '3M Company', '', 'Active Share').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying if any error dialog box is not appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if "Audit Mode" page is opened', function() {
      AuditMode.isAuditMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Audit Mode" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the title  is "Active Share"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(text) {
        if (text !== 'Active Share') {
          expect(false).customError('Title did not "Active Share" Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the security is "3M Company  (MMM)"', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(text) {
        if (text !== '3M Company  (MMM)') {
          expect(false).customError('Security value did not "3M Company  (MMM)"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "30-MAY-2016"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '30-MAY-2016') {
          expect(false).customError('The Audit date range is not matched with "30-MAY-2016"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var aaplSecurity;
    it('Should copying "Active Share" column value for "MMM" security', function() {
      AuditMode.getValueFromCalculatedReport('Active Share', 'MMM', 'Active Share', undefined, undefined, true)
        .then(function(reference) {
          reference.getText().then(function(text) {
            aaplSecurity = text;
          });
        });
    });

    it('Verifying if copied value is matched with Active Share header value', function() {
      AuditMode.getAuditViewHeaderValue('3', '2').getText().then(function(text) {
        if (parseFloat(text).toFixed(2) !== parseFloat(aaplSecurity).toFixed(2)) {
          expect(false).customError('Active Share header value did not match with Copied value; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if formula is displayed as "( Port. Ending Weight  -  Bench. Ending Weight ) ^ 2 ^ 0.5 / 2"', function() {
      AuditMode.getFormulaSection().getText().then(function(text) {
        if (text !== '( Port. Ending Weight  -  Bench. Ending Weight ) ^ 2 ^ 0.5 / 2') {
          expect(false).customError('Formula did not display as "( Port. Ending Weight  -  Bench. Ending Weight ) ^' +
            ' 2 ^ 0.5 / 2"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var rowNum = ['1', '2', '3'];
    var values = ['Port. Ending Weight', 'Bench. Ending Weight', 'Active Share'];

    rowNum.forEach(function(row, index) {

      it('Verifying if  for index "' + row + '" row name is "' + values[index] + '"', function() {
        AuditMode.getReportInputsSectionValues(row, '1').getText().then(function(text) {
          if (text !== values[index]) {
            expect(false).customError('For index "' + row + '" row name did not "' + values[index] + '"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var rowNum1 = ['1', '2'];
    var values1 = ['Port. Ending Weight', 'Bench. Ending Weight'];

    rowNum1.forEach(function(row, index) {

      it('Verifying if value is as hyperlink for  row "' + values1[index] + '"', function() {
        expect(AuditMode.getReportInputsSectionValues(row, '2').$('a').isPresent()).toBeTruthy();
      });

    });

    it('Verifying if copied value is matched with Active Share value', function() {
      AuditMode.getReportInputsSectionValues('3', '2').getText().then(function(text) {
        if (parseFloat(text).toFixed(2) !== parseFloat(aaplSecurity).toFixed(2)) {
          expect(false).customError('Active Share value did not match with Copied value; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Done" button to close the Audit mode', function() {
      ThiefHelpers.getButtonClassReference('Done').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Done" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Active Share" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Active Share" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Active Share', true).then(function(displayed) {
        expect(displayed).customError('"Active Share" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Active Share')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if "Audit Mode" page is close', function() {
      AuditMode.isAuditMode().then(function(flag) {
        if (flag) {
          expect(false).customError('"Audit Mode" page did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 776568', function() {

    it('Should open PA3 Application with "Client:/PA3/AUDIT/Audit_Asset_Class_grouping', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('audit-asset-class-grouping');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    CommonPageObjectsForPA3.rightClickAndSelectAuditValue('Contribution', 'Zoetis, Inc. Class A', '', 'Total Return', 'Returns');

    verifyAuditPane();

  });

  describe('Test Step ID: 776570', function() {

    it('Should click on "Done" button to close the Audit mode', function() {
      ThiefHelpers.getButtonClassReference('Done').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Done" button');
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should double click on first column cell', function() {
      SlickGridFunctions.getHeaderCellReference('Contribution', '', '').then(function(cellRef) {
        browser.actions().doubleClick(cellRef).perform();
      });
    });

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      SlickGridFunctions.scrollGridElements();
    });

    it('Verifying if "Zoetis, Inc. Class A" row is present in last of the calculated report', function() {
      SlickGridFunctions.scrollCellIntoView('Contribution', 'Zoetis, Inc. Class A', '', 'Total Return');
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', '').then(function(rowNames) {
        if (rowNames[rowNames.length - 1] !== 'Zoetis, Inc. Class A') {
          expect(false).customError('"Zoetis, Inc. Class A" row is not present in last of the calculated report. Expected index ' + (rowNames.length - 1));
          CommonFunctions.takeScreenShot();
        }
      });

    });

    CommonPageObjectsForPA3.rightClickAndSelectAuditValue('Contribution', 'Zoetis, Inc. Class A', '', 'Total Return', 'Returns');

    it('Verifying if the security is "Zoetis, Inc. Class A  (ZTS)"', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(text) {
        if (text !== 'Zoetis, Inc. Class A  (ZTS)') {
          expect(false).customError('Security name in Audit view is not "Zoetis, Inc. Class A  (ZTS)"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    verifyAuditPane();

  });

  describe('Test Step ID: 776571', function() {

    it('Should click on "Done" button to close the Audit mode', function() {
      ThiefHelpers.getButtonClassReference('Done').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Done" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify if the loading icon does not appear', function() {
      ThiefHelpers.getProgressIndicatorClassReference().getProgress().then(function() {
        expect(false).customError('Report is recalculated.');
        CommonFunctions.takeScreenShot();
      }, function() {

        expect(true).toBeTruthy();
      });
    });

    it('Verifying that "Contribution" report is calculated', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Contribution" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(appeared) {
        if (appeared) {
          expect(false).customError('"Calculation Error" dialog appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
