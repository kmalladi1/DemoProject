'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: rel-date-rolling-period', function() {

  var currentYearofEndDate;
  var arrayColumn = [];
  var arrayDates = [];
  var temp;

  var getArrOfHeaderDatesForVerification = function(i) {
    // taking 6 years as End Year's year is set to previous year
    Utilities.getEndDateYearsAgo(i).then(function(date1) {
      temp = date1;
    });
    Utilities.getEndDateYearsAgo(i - 1).then(function(date2) {
      temp += ' to ' + date2;
      arrayDates.push(temp);
    });
  };

  var arrRollingPeriod = [{vale: '45d', date: '12/31/2015 to 02/14/2016'}, {vale: '2M', date: '12/31/2015 to 02/29/16'},
  {vale: '1Y', date: '12/31/2015 to 12/31/2016'}, {vale: '3W', date: '12/31/2015 to 01/15/2016'},];

  var clickOnHypelinkAndEnter = function(value) {

    it('Should click on date hyperlink in "Contribution" report', function() {
      var xpathInfobox = PA3MainPage.getDateHyperLink('Contribution');
      ThiefHelpers.getInfoboxLinkClassReference(xpathInfobox).press().then(function() {
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    it('Should click on "All Date Options" hyper link from dates pop-up', function() {
      PA3MainPage.getOptionsHyperlink('All Date Options').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "All Date Options" hyper link');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Options - Contribution" view appeared', function() {
      TileOptions.isTileOptionsMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Tile Options - Contribution" view is not appeared');
        }
      });
    });

    it('Should select "' + value + '" to "Rolling Period:" text box and verify the same', function() {
      ThiefHelpers.getTextBoxClassReference('Rolling Period:').setText(value).then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that given value is set in Rolling Period input box
      ThiefHelpers.getTextBoxClassReference('Rolling Period:').getText().then(function(text) {
        if (text !== value) {
          expect(false).customError('"' + value + '" is not set in "Rolling Period" input box. Found ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');
  };

  var clickRefreshAndVerify = function(dateRange) {

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should hover on first multi header cell and verify if displayed date range is "' + dateRange + '"', function() {
      PA3MainPage.getAllMultiHeaderColumns('Contribution').get(0).getWebElement().then(function(dateRangeRef) {

        // Hovering on first multiheader cell reference
        browser.actions().mouseMove(dateRangeRef).perform();

        ChartHelpers.getToolTipText().then(function(text) {
          if (text !== dateRange) {
            expect(false).customError('First period and the tooltip is not displaying "' + dateRange + '". Found ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  };

  describe('Test Step ID: 550509', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });
  });

  describe('Test Step ID: 550510', function() {

    it('Should enter "spn_sp50" in portfolio widget and select "Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT"', function() {
      PA3MainPage.setPortfolio('spn_sp50', 'Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT', 'CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT').then(function(present) {
        if (!present) {
          expect(false).customError('Error while setting portfolio "Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "Russell:1000" in benchmark widget', function() {
      PA3MainPage.getWidgetBox('Benchmark').sendKeys('Russell:1000', protractor.Key.ENTER);

      // Verifying that "Russell: 1000" is entered
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(value) {
        if (value !== 'RUSSELL:1000') {
          expect(false).customError('"RUSSELL:1000" is not entered in benchmark widget.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Contribution', true, 'isSelected');

    it('Should select "Contribution" from LHP', function() {
      PA3MainPage.getReports('Contribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Contribution`);
  });

  describe('Test Step ID: 550511', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Contribution', 'Options');

  });

  describe('Test Step ID: 550512', function() {

    it('Should select "Dates" from LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Dates').select();

      // Verifying if "Dates" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Dates').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Dates" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Report Frequency" drop down and select "Annually"', function() {
      ThiefHelpers.selectOptionFromDropDown('Annually', 'Report Frequency:');

      // Verifying if "Annually" is set
      ThiefHelpers.verifySelectedDropDownText('Annually', 'Report Frequency:');
    });

  });

  describe('Test Step ID: 550513', function() {

    xit('Should click on the End Date dropdown', function() {
      TileOptionsDates.getDateDropDown('End Date').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "End of Last Year" from the End Date dropdown', function() {
      ThiefHelpers.getDatepickerClassReference('End Date:').selectShortcutByText('End of Last Year');

      ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(text) {
        if (text !== 'End of Last Year') {
          expect(false).customError('Expected:"End of Last Month" but Found: "' + text + '" in the Date text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "-5ay" in Start Date field', function() {
      TileOptionsDates.getDateField('Start Date').sendKeys(protractor.Key.HOME, protractor.Key.SHIFT, protractor.Key.END, protractor.Key.NULL, protractor.Key.DELETE, '-5ay');
    });

    it('Should check "Start Date Relative to End Date" check box', function() {
      ThiefHelpers.setCheckBox(`Start Date Relative to End Date`, undefined, true);
    });

    it('Collecting the year from end date Calender', function() {
      //taking the year from end date Calender
      TileOptionsDates.getMonthOrYearDropDown('End Date', 'year').getText().then(function(yearOfEndDate) {
        currentYearofEndDate = yearOfEndDate;
      });
    });

    it('Verifying if Start date calender displays last working day with equal to end date -5 years', function() {
      //Verifying if start date calender is -5 years based on End date
      expect(TileOptionsDates.getMonthOrYearDropDown('Start Date', 'month').getText()).toEqual('December');
      TileOptionsDates.getSelectedDay('Start Date').then(function(date) {
        // taking 6 years as End Year's year is set to previous year
        Utilities.getEndDateYearsAgo(6).then(function(date1) {
          var temp = date1.split('/');
          if (date !== temp[1]) {
            expect(false).customError('Start date calender is not displayed as last working day with equal to end date -5 years expected: "' + temp[1] + '". Found: ' + date);
            CommonFunctions.takeScreenShot();
          }
        });
      });

      // Taking the year from start date calender
      expect(TileOptionsDates.getMonthOrYearDropDown('Start Date', 'year').getText()).toEqual((currentYearofEndDate - 5).toString());
    });
  });

  describe('Test Step ID: 550514', function() {

    it('Should select "One Year" from the Start Date dropdown and verify the same', function() {
      ThiefHelpers.getTextBoxClassReference('Rolling Period:').selectOptionByText('One Year').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "One Year" is set in Rolling Period input box
      ThiefHelpers.getTextBoxClassReference('Rolling Period:').getText().then(function(text) {
        if (text !== '1Y') {
          expect(false).customError('"1Y" is not set in "Rolling Period" input box. Found ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "USe Actual Frequencies" check box', function() {
      ThiefHelpers.setCheckBox(`Use Actual Frequencies`, undefined, true);
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Pushing date range\'s (mm/dd/yyyy(end date year -1) - mm/dd/yyyy(end date)) of last 5 years(excluding the current year)', function() {
      for (var i = 6; i > 1; i--) {
        getArrOfHeaderDatesForVerification(i);
      }
    });

    it('Collecting all multi header column values', function() {
      PA3MainPage.getAllMultiHeaderColumns('Contribution').each(function(element) {
        Utilities.scrollElementToVisibility(element);
        element.getText().then(function(text) {
          arrayColumn.push(text);
        });
      });
    });

    it('Verifying that the contribution report is calculated for 5years in format', function() {
      var needScreenShot = 0;

      // Pushing Total to array for verification.
      arrayDates.push('Total');
      arrayDates.forEach(function(element, index) {
        if (element !== arrayColumn[index]) {
          expect(false).customError('"Contribution" report is calculated for 5years in format with error. ' + 'Expected: "' + element + '" but Found: "' + arrayColumn[index] + '"');
          ++needScreenShot;
          if (needScreenShot === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });
  });

  describe('Test Step ID: 740662', function() {

    it('Should open "Client:;pa3;dates;custom_rolling_period" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('custom-rolling-period');
    });

    clickOnHypelinkAndEnter('45d');

    clickRefreshAndVerify('12/31/2015 to 02/14/2016');

  });

  describe('Test Step ID: 740663', function() {

    clickOnHypelinkAndEnter('2M');

    clickRefreshAndVerify('12/31/2015 to 02/29/2016');

  });

  describe('Test Step ID: 740664', function() {

    clickOnHypelinkAndEnter('1Y');

    clickRefreshAndVerify('12/31/2015 to 12/31/2016');

  });

  describe('Test Step ID: 740665', function() {

    clickOnHypelinkAndEnter('3W');

    clickRefreshAndVerify('12/31/2015 to 01/15/2016');

  });

  describe('Test Step ID: 740666', function() {

    clickOnHypelinkAndEnter('16M');

    it('Verifying if "Calculation Error" dialog is displayed', function() {
      ThiefHelpers.getDialogClassReference('Calculation Error').isOpen().then(function(dialogStatus) {
        if (!dialogStatus) {
          expect(false).customError('"Calculation Error" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the Calculation Error dialog is thrown stating "Calculation Service: Please select a rolling period that is shorter than the report period."', function() {
      ThiefHelpers.getDialogClassReference('Calculation Error', 1).getContent().getText().then(function(content) {
        if (content !== 'Calculation Service: Please select a rolling period that is shorter than the report period.') {
          expect(false).customError('Calculation Error is thrown with the following message "' + content + '" instead of ' + '"Calculation Service: Please select a rolling period that is shorter than the report period."');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 740667', function() {

    it('Should click "OK" in the Calculation Error dialog', function() {
      ThiefHelpers.getDialogButton('Calculation Error', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verify if Calculation Error Dialog is closed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on date hyperlink in "Contribution" report', function() {
      var xpathInfobox = PA3MainPage.getDateHyperLink('Contribution');
      ThiefHelpers.getInfoboxLinkClassReference(xpathInfobox).press().then(function() {
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    it('Should click on "All Date Options" hyper link from dates pop-up', function() {
      PA3MainPage.getOptionsHyperlink('All Date Options').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "All Date Options" hyper link');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Options - Contribution" view appeared', function() {
      TileOptions.isTileOptionsMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Tile Options - Contribution" view is not appeared');
        }
      });
    });

    it('Should set "-2D" to "Rolling Period:" text box and verify the same', function() {
      ThiefHelpers.getTextBoxClassReference('Rolling Period:').setText('-2D').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that given value is set in Rolling Period input box
      ThiefHelpers.getTextBoxClassReference('Rolling Period:').getText().then(function(text) {
        if (text !== '-2D') {
          expect(false).customError('"-2D" is not set in "Rolling Period" input box. Found ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Rolling Period:" text box show red warning icon displays with a message', function() {
      ThiefHelpers.getTextBoxClassReference('Rolling Period').getErrors().then(function(text) {
        console.log(text + ':Please enter a valid postive rolling period. Eg: 1D, 2AY etc.');
        if (text.toString() !== 'Please enter a valid postive rolling period. Eg: 1D, 2AY etc.') {
          expect(false).customError('Warning icon is displayed "' + text + '" instead of ' +
            '"Please enter a valid postive rolling period. Eg: 1D, 2AY etc."');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 740669', function() {

    it('Should select "Daily" from "Report Frequency" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Daily', 'Report Frequency:');
    });

    it('Verifying if the "Report Frequency" is set to "Daily"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Report Frequency:').getSelectedText().then(function(text) {
        if (text !== 'Daily') {
          expect(false).customError('"Report Frequency" is not set to "Daily"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "12/15/2016" in the "End Date" field', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').setText('12/15/2016');

      // Verifying "12/15/2016"  is entered in End Date text box
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(value) {
        if (value !== '12/15/2016') {
          expect(false).customError('End Date text box did not contain "12/15/2016". Found:"' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "-40D" in the "Start Date" field', function() {
      ThiefHelpers.getTextBoxClassReference('Start Date:').setText('-40D');

      // Verifying "-40D"  is entered in Start Date text box
      ThiefHelpers.getTextBoxClassReference('Start Date:').getText().then(function(value) {
        if (value !== '-40D') {
          expect(false).customError('Start Date text box did not contain "-40D". Found:"' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should set "1AM" to "Rolling Period:" text box and verify the same', function() {
      ThiefHelpers.getTextBoxClassReference('Rolling Period:').setText('1AM').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that given value is set in Rolling Period input box
      ThiefHelpers.getTextBoxClassReference('Rolling Period:').getText().then(function(text) {
        if (text !== '1AM') {
          expect(false).customError('"1AM" is not set in "Rolling Period" input box. Found ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should hover on first multi header cell and verify if displayed date range is "11/05/2016 to 12/05/2016"', function() {
      PA3MainPage.getAllMultiHeaderColumns('Contribution').get(0).getWebElement().then(function(dateRangeRef) {

        // Hovering on first multiheader cell reference
        browser.actions().mouseMove(dateRangeRef).perform();

        ChartHelpers.getToolTipText().then(function(text) {
          if (text !== '11/05/2016 to 12/05/2016') {
            expect(false).customError('First period and the tooltip is not displaying "11/05/2016 to 12/05/2016". Found ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should hover on second multi header cell and verify if displayed date range is "11/06/2016 to 12/06/2016"', function() {
      PA3MainPage.getAllMultiHeaderColumns('Contribution').get(1).getWebElement().then(function(dateRangeRef) {

        // Hovering on first multiheader cell reference
        browser.actions().mouseMove(dateRangeRef).perform();

        ChartHelpers.getToolTipText().then(function(text) {
          if (text !== '11/06/2016 to 12/06/2016') {
            expect(false).customError('Second period and the tooltip is not displaying "11/06/2016 to 12/06/2016". Found ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 740671', function() {

    clickOnHypelinkAndEnter('1M');

    clickRefreshAndVerify('11/05/2016 to 11/30/2016');

    it('Should hover on second multi header cell and verify if displayed date range is "11/06/2016 to 11/30/2016"', function() {
      PA3MainPage.getAllMultiHeaderColumns('Contribution').get(1).getWebElement().then(function(dateRangeRef) {

        // Hovering on first multiheader cell reference
        browser.actions().mouseMove(dateRangeRef).perform();

        ChartHelpers.getToolTipText().then(function(text) {
          if (text !== '11/06/2016 to 11/30/2016') {
            expect(false).customError('Second period and the tooltip is not displaying "11/06/2016 to 11/30/2016". Found ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 550515', function() {

    it('Should close PA3 application', function() {
      expect(true).toBeTruthy();
    });
  });
});
