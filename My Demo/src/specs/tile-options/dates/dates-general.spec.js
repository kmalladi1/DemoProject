'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: dates-general', function() {
  // Variable(s)
  var date;
  var month;
  var year;
  var day;
  var todayDate;
  var workingDate;
  var arrayColumn = [];

  describe('Test Step ID: 406915', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

  });

  describe('Test Step ID: 391903', function() {

    // check automatic calculation from wrench menu
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSetAutomaticCalculation(true);

    it('Should enter "spn_sp50" in "Portfolio" widget', function() {
      PA3MainPage.setPortfolio('spn_sp50', 'Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT',
        'CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT').then(function(option) {
          if (!option) {
            expect(false).customError('Not able to Type "spn_sp50" into "Portfolio"' +
              ' widget and select "Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT');
            CommonFunctions.takeScreenShot();
          }
        },
        function(error) {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Should enter "RUSSELL:1000" in "Benchmark" widget', function() {
      ThiefHelpers.getTextBoxClassReference('Benchmark', PA3MainPage.xpathBenchmarkWidget).setText('RUSSELL:1000', protractor.Key.ENTER);

      // Verifying that "RUSSELL:1000" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Benchmark', PA3MainPage.xpathBenchmarkWidget).getText().then(function(text) {
        if (text !== 'RUSSELL:1000') {
          expect(false).customError('"RUSSELL:1000" is not entered in "Benchmark" widget.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var flag = 0;
    var arrColumns = ['Port. Weight', 'Bench. Weight', 'Difference'];
    arrColumns.forEach(function(colName) {
      it('Verifying if the values are displayed from column "' + colName + '" ', function() {
        PA3MainPage.getValueFromCalculatedReport('Weights', 'Commercial Services', colName).then(function(rowVal) {
          if (rowVal === '') {
            flag = flag + 1;
            expect(false).customError('Values are not displayed under "' + colName + '" column');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 386234', function() {

    // Select Dates tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Dates');

    it('Should click on "Report Frequency" drop down and verify all the options are available', function() {
      ThiefHelpers.getDropDownSelectClassReference('Report Frequency', undefined).open();

      // Verify that all options are available
      ThiefHelpers.getAllOptionsFromDropdown().then(function(refs) {
        TileOptionsDates.arrayReportFrequencyOptions.forEach(function(Option) {
          if (refs.indexOf(Option) === -1) {
            expect(false).customError('"Report Frequency" dropd won does not contain' + Option);
            CommonFunctions.takeScreenshot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 386235', function() {

    it('Should select "Single" from the "Report Frequency" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Single', 'Report Frequency:');

      ThiefHelpers.getDropDownSelectClassReference('Report Frequency:').getSelectedText().then(function(text) {
        if (text !== 'Single') {
          expect(false).customError('"Report Frequency:" drop down did not set to "Single"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Month" dropdown in calendar', function() {
      TileOptionsDates.getMonthOrYearDropDown('Single\'s End Date', 'Month').click();
    });

    it('Should select "March" from "Month" dropdown', function() {
      TileOptionsDates.getMonthOrYear('March').click();

      TileOptionsDates.getMonthOrYearDropDown('Single\'s End Date', 'Month').getText().then(function(value) {
        if (value !== 'March') {
          expect(false).customError('"March" is not selected from month dropdown');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should click "Year" dropdown in calendar', function() {
      TileOptionsDates.getMonthOrYearDropDown('Single\'s End Date', 'Year').click();
    });

    it('Should select "2014" from "Year" dropdown', function() {
      TileOptionsDates.getMonthOrYear('2014').click();

      TileOptionsDates.getMonthOrYearDropDown('Single\'s End Date', 'Year').getText().then(function(value) {
        if (value !== '2014') {
          expect(false).customError('"2014" is not selected from "year" dropdown');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should select date as "25" in calender', function() {
      TileOptionsDates.getDay('25', 'Single\'s End Date').click();

      TileOptionsDates.getSelectedDay('Single\'s End Date').getText().then(function(value) {
        if (value !== '25') {
          expect(false).customError('"25" is not selected from calender');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if date is "3/25/2015" in "End Date" edit box', function() {
      TileOptionsDates.getDateField('Single\'s End Date').getAttribute('value').then(function(value) {
        if (value !== '3/25/2014') {
          expect(false).customError('"3/25/2014" is not set in End Date box.Expected value is "3/25/2014", ' +
            'found "' + value + '" ');
          CommonFunctions.takeScreenShot();
        }
      });

    });

  });

  describe('Test Step ID: 386236', function() {

    it('Should click on "Today Date" button in the calender', function() {
      TileOptionsDates.getTodayDateButton('Single\'s End Date').click();
    });

    it('Verifying if "End Date" edit box displays Today\'s date', function() {
      //today's date
      date = new Date();
      year = date.getFullYear();
      month = date.getMonth() + 1;
      workingDate = date.getDate();
      day = date.getDay();
      if (day === 0) {
        workingDate = workingDate - 2;
      } else if (day === 6) {
        workingDate = workingDate - 1;
      }

      todayDate = month + '/' + Utilities.pad(workingDate) + '/' + year;

      // Verifying if today's date set in the "End Date" input field
      ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(text) {
        if (text !== todayDate) {
          expect(false).customError('"End Date" is not set to "' + todayDate + '"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('verifying if Calender box is displays "Today\'s" date', function() {
      // Verifying calender box
      TileOptionsDates.getMonthOrYearDropDown('Single\'s End Date', 'month').getText().then(function(value) {
        if (value !== TileOptionsDates.arrayMonths[month - 1]) {
          expect(false).customError('"' + TileOptionsDates.arrayMonths[month - 1] + '" is not selected from month drop down, Found:' + value);
          CommonFunctions.takeScreenShot();
        }
      });
      TileOptionsDates.getMonthOrYearDropDown('Single\'s End Date', 'year').getText().then(function(value) {
        if (value !== year.toString()) {
          expect(false).customError('"' + year + '" is not selected from "year" dropdown, Found:' + value);
          CommonFunctions.takeScreenShot();
        }
      });
      TileOptionsDates.getSelectedDay('Single\'s End Date').getText().then(function(text) {
        if (text !== workingDate.toString()) {
          expect(false).customError('Calender is not set to today\'s date; ' +
            'Expected: ' + workingDate + ' Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 386263', function() {

    it('Should click on the "End Date" dropdown', function() {
      TileOptionsDates.getDateDropDown('Single\'s End Date').click();
    });

    it('Verifying if Date dropdown list contains all the option', function() {
      var count = 0;

      // Verifying that all options are available
      TileOptionsDates.arrayEndDateOptions.forEach(function(option) {
        TileOptionsDates.getOptionFromDateDropDown(option).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError(option + ' is not present in the "End Date" drop down');
            count = count + 1;
          }
        });
      });
      if (count >= 1) {
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe('Test Step ID: 386265', function() {

    it('Should select "Latest" from the End Date dropdown', function() {
      TileOptionsDates.getOptionFromDateDropDown('Latest').click();

      // Verifying "Latest"  option is selected
      TileOptionsDates.getDateField('Single\'s End Date').getAttribute('value').then(function(value) {
        if (value !== 'Latest') {
          expect(false).customError('"Latest" option is not selected from End Date Dropdown');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should click on "Month" dropdown in the calender', function() {
      TileOptionsDates.getMonthOrYearDropDown('Single\'s End Date', 'Month').click();
    });

    it('Verifying if "Month" dropdown list contains "12months" ie January to December', function() {
      var count = 0;
      TileOptionsDates.arrayMonths.forEach(function(options) {
        TileOptionsDates.getMonthOrYear(options).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError(options + ' is not present in the "Month" drop down');
            count = count + 1;
          }
        });
      });
      if (count >= 1) {
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 386266', function() {

    it('Should click on "Year" dropdown in calender', function() {
      TileOptionsDates.getMonthOrYearDropDown('Single\'s End Date', 'Year').click();
    });

    it('Should move the right side scroll bar to bottom', function() {
      // Scrolling till 1990 as 1985 is not in the DOM
      Utilities.scrollElementToVisibility(TileOptionsDates.getMonthOrYear('1990'));
    });

    it('Verifying if the last year is "1985" in the dropdown', function() {
      // Verifying if 1985 is present in dropdown list
      TileOptionsDates.getMonthOrYear('1985').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"1985" is not present in the "Year" drop down');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if 1984 is not present in dropdown list
      TileOptionsDates.getMonthOrYear('1984').isPresent().then(function(flag) {
        if (flag) {
          expect(false).customError('"1984" is present in the "Year" drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 425617', function() {

    var arrayDates = ['5/30/2014', '6/30/2014', '7/31/2014', '8/29/2014', '9/26/2014'];

    it('should click on "Report Frequency" drop down and select "Monthly" ', function() {
      ThiefHelpers.selectOptionFromDropDown('Monthly', 'Report Frequency:', undefined, '');

      // Verifying if Monthly is selected from the dropdwn
      ThiefHelpers.verifySelectedDropDownText('Monthly', 'Report Frequency:');
    });

    it('Should type "-3M" in "Start Date" field', function() {
      ThiefHelpers.getDatepickerClassReference('Start Date:').setDate('-3M');

      // Verifying if "6/02/2014" is entered into the "Start Date" input field
      ThiefHelpers.getDatepickerClassReference('Start Date:').getDate().then(function(text) {
        if (text !== '-3M') {
          expect(false).customError('"Start Date" is not set to "-3M"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "September 26th 2014" as "End Date"', function() {
      // Select "September" as month
      TileOptionsDates.getMonthOrYearDropDown('End Date', 'Month').click();
      TileOptionsDates.getMonthOrYear('September').click();

      // Select "2014" as year
      TileOptionsDates.getMonthOrYearDropDown('End Date', 'Year').click();

      TileOptionsDates.getMonthOrYear('2014').click();

      // Selecting "26th" as day
      TileOptionsDates.getDay('26', 'End Date').click();

      // Verifying if End Date field contains "9/26/2014"
      // Verifying that "12/31/2014" is typed into the "End Date" field
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(text) {
        if (text !== '9/26/2014') {
          expect(false).customError('End date field does not contain "9/26/2014". Expected value is ' +
            '"9/26/2014" found "' + text + '" ');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should check "Start Date Relative to End Date" check box', function() {
      TileOptionsDates.getCheckBox('Start Date Relative to End Date').click();

      // Verifying if 'Start Date Relative to End Date' check box
      Utilities.isCheckboxSelected(TileOptionsDates.getCheckBox('Start Date Relative to End Date')).then(function(selected) {
        if (!selected) {
          expect(false).customError(' "Start Date Relative to End Date"" check box is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Adding wait time as per the Engineer comment in RPD:41035011
      browser.sleep(1000);
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Collecting all multi header column values', function() {
      PA3MainPage.getAllMultiHeaderColumns('Weights').each(function(element) {
        Utilities.scrollElementToVisibility(element);
        element.getText().then(function(text) {
          arrayColumn.push(text);
        });
      });
    });

    it('Verifying the "Weights" report is calculated for the dates: ' +
      '5/30/2014, 6/30/2014, 7/31/2014, 8/29/2014, 9/26/2014', function() {
      arrayDates.forEach(function(element, index) {
        expect(element).toEqual(arrayColumn[index]);
      });
    });

  });

  describe('Test Step ID: 424274', function() {

    it('Should click on the folder icon on app toolbar', function() {
      PA3MainPage.getFolderDropDown().click();
    });

    it('Should select "New" from list', function() {
      PA3MainPage.getOptionFromFolderMenu('New').click();
    });

    it('Verifying if "Document has changed" pop up is appeared on the screen', function() {
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Document has changed" dialog box has not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 424275', function() {

    it('Should click on "Cancel" button in the dialog', function() {
      PA3MainPage.getButton('Cancel').click();

      // Verifying if dialog is disappeared
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(disapeared) {
        if (disapeared) {
          expect(false).customError('"Document has changed" dialog box is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the folder icon on app toolbar', function() {
      PA3MainPage.getFolderDropDown().click();
    });

    it('Should select "Open" from list', function() {
      PA3MainPage.getOptionFromFolderMenu('Open').click();
    });

    it('Verifying if "Document has changed" pop up is appeared on the screen', function() {
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Document has changed" dialog box has not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 386239', function() {

    it('Should click on "Cancel" button in the dialog', function() {
      PA3MainPage.getButton('Cancel').click();
    });

    it('Should close PA3 application', function() {
      expect(true).toBeTruthy();
    });
  });

});
