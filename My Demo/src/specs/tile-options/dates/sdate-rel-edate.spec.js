'use strict';

require(__dirname + '/../../../index.js');

var columnNames = ['Total Return', 'Contribution To Return'];
var columnNamesPerformance = ['Total Return', 'Total Return Cumulative'];
var multiHeadersPerformance = ['S&P 500', 'Russell 1000'];

describe('Test Case: sdate-rel-edate', function() {

  describe('Test Step ID: 406891', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

    it('Verifying if "Calculation Error" error dialog is not present', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 385067', function() {

    it('Should click on the "Wrench" icon in the "Weights" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
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

    it('Verifying if "Dates" tab is selected in LHP', function() {
      TileOptions.getLHPOption('Dates').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Dates" tab did not highlight in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 385070', function() {

    it('Should select "Monthly" from "Report Frequency:" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Monthly', 'Report Frequency:');
    });

    it('Verifying if  "Report Frequency:" drop down is set to "Monthly"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Report Frequency:').getSelectedText().then(function(text) {
        if (text !== 'Monthly') {
          expect(false).customError('"Report Frequency:" drop down did not set to "Monthly"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 385117', function() {

    it('Should click on "Start Date" drop down button to open the drop down', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsDates.xpathOfStartDateDropDownIcon).press()
        .then(function() {
        }, function() {

          expect(false).customError('Unable to click on "Start Date" button');
          CommonFunctions.takeScreenShot();
        });
    });

    it('Should select "One Year Ago" from "Start Date" drop down', function() {
      TileOptionsDates.getOptionFromDateDropDown('One Year Ago').click();

      // Verifying "One Year Ago"  option is selected
      ThiefHelpers.getTextBoxClassReference('Start Date:').getText().then(function(value) {
        if (value !== 'One Year Ago') {
          expect(false).customError('"One Year Ago" option is not selected from Start Date Dropdown');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should set "June 5th 2015" from End Date drop down', function() {
      ThiefHelpers.setDateInCalendar('June/5/2015', 2);
    });

    it('Verifying if "Month" drop down is set to "June" for "End Date"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsDates.xpathOfEndDateMonthDropDown).getSelectedText()
        .then(function(text) {
          if (text !== 'June') {
            expect(false).customError('Month drop down did not set to "June" for "End Date"');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if "Year" drop down is set to "2015" for "End Date"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsDates.xpathOfEndDateYearDropDown).getSelectedText()
        .then(function(text) {
          if (text !== '2015') {
            expect(false).customError('Year drop down did not set to "2015" for "End Date"');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if "5" is selected in "End Date" calendar', function() {
      TileOptionsDates.getSelectedDay('End Date').getText().then(function(text) {
        if (text !== '5') {
          expect(false).customError('"5" did not get select in "End Date" calendar');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Start Date Relative To End Date" checkbox to check off', function() {
      ThiefHelpers.getCheckBoxClassReference('Start Date Relative To End Date').check();

      // Verifying if "Start Date Relative To End Date" checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('Start Date Relative To End Date').isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Start Date Relative To End Date" checkbox did not check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Month" drop down is set to "June" for "Start Date"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsDates.xpathOfStartDateMonthDropDown).getSelectedText()
        .then(function(text) {
          if (text !== 'June') {
            expect(false).customError('Month drop down did not set to "June" for "Start Date"');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if "Year" drop down is set to "2014" for "Start Date"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsDates.xpathOfStartDateYearDropDown).getSelectedText()
        .then(function(text) {
          if (text !== '2014') {
            expect(false).customError('Year drop down did not set to "2014" for "Start Date"');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if "5" is selected in "Start Date" calendar', function() {
      TileOptionsDates.getSelectedDay('Start Date').getText().then(function(text) {
        if (text !== '5') {
          expect(false).customError('"5" did not get select in "Start Date" calendar');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from Tile Option Page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button from Tile Options page');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Calculation Error" error dialog is not present', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if date hyperlink is set to "6/05/2014 - 6/05/2015"', function() {
      PA3MainPage.getDateHyperLink('Weights').getText().then(function(text) {
        if (text !== '6/05/2014 - 6/05/2015') {
          expect(false).customError('Date hyperlink did not set to "6/05/2014 - 6/05/2015"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 385120', function() {

    it('Should click on the "Wrench" icon in the "Weights" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
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

    it('Verifying if "Dates" tab is selected in LHP', function() {
      TileOptions.getLHPOption('Dates').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Dates" tab did not highlight in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Start Date Relative To End Date" checkbox to uncheck', function() {
      ThiefHelpers.getCheckBoxClassReference('Start Date Relative To End Date').uncheck();

      // Verifying if "Start Date Relative To End Date" checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('Start Date Relative To End Date').isChecked().then(function(flag) {
        if (flag) {
          expect(false).customError('"Start Date Relative To End Date" checkbox did not uncheck');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from Tile Option Page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button from Tile Options page');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Calculation Error" error dialog is not present', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if date hyperlink is set to "6/5/2015-MM/DD/(YYYY-1)"', function() {
      PA3MainPage.getDateHyperLink('Weights').getText().then(function(text) {
        // Spliting Start and End Date
        var temp = text.split('-');

        // Replacing space from Start Date
        var startDate = temp[0].replace(' ', '');

        // Verifying if "Start Date" in hyperlink is "6/05/2015"
        if (startDate !== '6/05/2015') {
          expect(false).customError('Date hyperlink start date did not set to "6/05/2015"; Found: ' + startDate);
          CommonFunctions.takeScreenShot();
        }

        // Applying logic for taking current date and current month
        // Creating Date object
        var date = new Date();
        var date1 = new Date();

        // Taking current Year
        var year = date.getFullYear();

        // Taking Current month
        var month = date.getMonth();

        // Taking Current Date
        var day = date.getDate();

        // Taking Current Time
        var time = date.getHours();

        // Applying logic for market start
        if (time < 18) {

          day = day - 1;
        }

        date.setDate(day);

        // Taking week day according to market start
        var noOfDay = date.getDay();

        // Applying logic for Saturday
        if (noOfDay === 6) {
          day = day - 1;

          // Applying logic for Sunday
        } else if (noOfDay === 0 || noOfDay === 7) {
          day = day - 2;
        }

        // Setting current date, current month and (current year - 1)
        date1.setYear(year - 1);
        date1.setMonth(month);
        date1.setDate(day);

        // Taking current date
        var day1 = date1.getDate();

        // Taking current month
        var month1 = date1.getMonth() + 1;

        // Taking year as Current Year - 1
        var year1 = date1.getFullYear();
        Utilities.getBusinessDate(date1, '/').then(function(currEndDate) {
          var endDate = temp[1].replace(' ', '');

          // Verifying if end date hyperlink is "MM/DD/2015"
          if (endDate !== currEndDate) {
            expect(false).customError('Date hyperlink end date did not set to "' + currEndDate + '"; Found: ' + endDate);
            CommonFunctions.takeScreenShot();
          }
        });

      });
    });

  });

  describe('Test Step ID: 711478', function() {

    it('Should Click on Dates Hyperlink', function() {
      PA3MainPage.getDateHyperLink('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Single" from "Report Frequency" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Single', 'Report Frequency:');
    });

    it('Verifying if the "Report Frequency" is set to "Single"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Report Frequency:').getSelectedText().then(function(text) {
        if (text !== 'Single') {
          expect(false).customError('"Report Frequency" is not set to "Single"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enter "7/6/16" in the "End Date" widget', function() {
      ThiefHelpers.getDatepickerClassReference('End Date:').setDate('7/6/16');

      // Adding wait time as per the Engineer comment in RPD:41035011
      browser.sleep(1000);

      // Verifying if "7/6/16" is entered into the "End Date" input field
      ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(text) {
        if (text.toString() !== '7/06/2016') {
          expect(false).customError('"End Date" is not set to "7/06/2016"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

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

    it('Should select "Previous Close" from the "End Date" drop down', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsDates.xpathOfStartDateDropDownIcon).press();

      ThiefHelpers.getOptionFromDropdown('Previous Close').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should check "Start Date Relative To End Date" checkbox', function() {
      ThiefHelpers.getCheckBoxClassReference('Start Date Relative To End Date').check();

      // Verifying if "Start Date Relative To End Date" checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('Start Date Relative To End Date').isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Start Date Relative To End Date" checkbox did not check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from Tile Option Page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button from Tile Options page');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      // Verifying tile options mode ic closed
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if date hyperlink is set to "7/05/2016 - 7/06/2016"', function() {
      PA3MainPage.getDateHyperLink('Weights').getText().then(function(text) {
        if (text !== '7/05/2016 - 7/06/2016') {
          expect(false).customError('Date hyperlink did not set to "7/05/2016 - 7/06/2016"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 775156', function() {

    it('Should open "Client:;Pa3;Dates;Previous_close_test" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('previous-close-test');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should Click on Dates Hyperlink from "Contribution" report', function() {
      PA3MainPage.getDateHyperLink('Contribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "End of Last Year" from the Start Date dropdown', function() {
      ThiefHelpers.getTextBoxClassReference('Start Date:').selectOptionByText('Previous Close').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Previous Close" is set to input box
      ThiefHelpers.getTextBoxClassReference('Start Date:').getText().then(function(text) {
        if (text !== 'Previous Close') {
          expect(false).customError('"Previous Close" is not set in "Start Date" input box, Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });

      // Adding wait time as per the Engineer comment in RPD:41035011
      browser.sleep(1000);
    });

    it('Verifying if "End Date" is displayed with "Previous Close" option', function() {
      // Verifying "Previous Close"  is entered in End Date text box
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(value) {
        if (value !== 'Previous Close') {
          expect(false).customError('End Date text box did not contain "Previous Close". Found:"' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Start Date Relative To End Date" checkbox to check off', function() {
      ThiefHelpers.getCheckBoxClassReference('Start Date Relative To End Date').check();

      // Verifying if "Start Date Relative To End Date" checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('Start Date Relative To End Date').isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Start Date Relative To End Date" checkbox did not check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in the date drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Verifying if "' + columnNames + '" are displayed under "Returns" multi-header', function() {
      PA3MainPage.getColumnNumberRangeForMultiHeader('Contribution', 'Returns').then(function(columnNumRange) {
        columnNumRange.forEach(function(colNum) {
          SlickGridFunctions.getColumnNames('Contribution').then(function(arr) {
            if (columnNames.indexOf(arr[colNum]) === -1) {
              expect(false).customError(columnNames + ' are not displayed under the "Returns" multi-header');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if date hyperlink is set to prior to 2 week days ago - 1 week day ago if test ran after 12pm(IST) otherwise they should be equal', function() {
      // Calculating india time
      var time = Utilities.getCurrentTimeOfGivenOffset('+5.5');
      if (time < '12:00') {
        PA3MainPage.getDateHyperLink('Contribution').getText().then(function(text) {
          var temp = text.split(' - ');
          if (temp[0] !== temp[1]) {
            expect(false).customError('Test case ran at ' + time + ' and date hyper link did not displayed with same start and end date');
            CommonFunctions.takeScreenShot();
          }
        });
      } else {
        PA3MainPage.getDateHyperLink('Contribution').getText().then(function(text) {
          var temp = text.split(' - ');
          Utilities.getPreviousOrAfterDateFromADate(-2, undefined, 'MMDDYYYY', '/').then(function(twoDaysAgo) {
            Utilities.getPreviousOrAfterDateFromADate(-1, undefined, 'MMDDYYYY', '/').then(function(oneDayAgo) {
              if ((temp[0].trim()) !== twoDaysAgo || temp[1] !== oneDayAgo) {
                expect(false).customError('Report is not displayed with (2 weekdays ago) - (one week day ago) date, Expected: ' +
                  twoDaysAgo + ' - ' + oneDayAgo + ' Found:' + temp[0].trim() + ' - ' + temp[1]);
                CommonFunctions.takeScreenShot();
              }
            });
          });

        });
      }
    });
  });

  describe('Test Step ID: 775157', function() {

    it('Should Click on Dates Hyperlink from "Contribution" report', function() {
      PA3MainPage.getDateHyperLink('Contribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Start Date" is displayed with "Previous Close" option', function() {
      // Verifying "Previous Close"  is entered in Start Date text box
      ThiefHelpers.getTextBoxClassReference('Start Date:').getText().then(function(value) {
        if (value !== 'Previous Close') {
          expect(false).customError('Start Date text box did not contain "Previous Close". Found:"' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "End of Last Month" from the End Date dropdown', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').selectOptionByText('End of Last Month').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "End of Last Month" is set to input box
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(text) {
        if (text !== 'End of Last Month') {
          expect(false).customError('"End of Last Month" is not set in "End Date" input box, Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });

      // Adding wait time as per the Engineer comment in RPD:41035011
      browser.sleep(1000);
    });

    it('Should click on "OK" button in the date drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Verifying if "' + columnNames + '" are displayed under "Returns" multi-header', function() {
      PA3MainPage.getColumnNumberRangeForMultiHeader('Contribution', 'Returns').then(function(columnNumRange) {
        columnNumRange.forEach(function(colNum) {
          SlickGridFunctions.getColumnNames('Contribution').then(function(arr) {
            if (columnNames.indexOf(arr[colNum]) === -1) {
              expect(false).customError(columnNames + ' are not displayed under the "Returns" multi-header');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if date hyperlink is displayed as (end of last month minus one weekday) - (end of last month)', function() {
      PA3MainPage.getDateHyperLink('Contribution').getText().then(function(text) {
        Utilities.getEndDateOfMonthsAgo(-1).then(function(endDate) {
          Utilities.getFormattedDate(endDate, 'MMDDYYYY', '/').then(function(monthAgoDate) {
            Utilities.getPreviousOrAfterDateFromADate(-1, monthAgoDate, 'MMDDYYYY', '/').then(function(oneDayAgoOfLastMonthDate) {
              var temp = oneDayAgoOfLastMonthDate + ' - ' + monthAgoDate;
              if (text !== temp) {
                expect(false).customError('Report is not displayed with (end of last month minus one weekday) - (end of last month) date, Expected: ' + temp + ', Found: ' + text);
                CommonFunctions.takeScreenShot();
              }
            });
          });
        });
      });
    });
  });

  describe('Test Step ID: 775159', function() {

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Performance', true, 'isSelected');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Performance');

    it('Should Click on Dates Hyperlink from "Performance" report', function() {
      PA3MainPage.getDateHyperLink('Performance').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Start Date" is displayed with "Previous Close" option', function() {
      // Verifying "Previous Close"  is entered in Start Date text box
      ThiefHelpers.getTextBoxClassReference('Start Date:').getText().then(function(value) {
        if (value !== 'Previous Close') {
          expect(false).customError('Start Date text box did not contain "Previous Close". Found:"' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "10/31/2017" in the "End Date" field', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').setText('10/31/2017');

      // Verifying "10/31/2017"  is entered in End Date text box
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(value) {
        if (value !== '10/31/2017') {
          expect(false).customError('End Date text box did not contain "10/31/2017". Found:"' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Added delay to process the request
      browser.sleep(1000);
    });

    it('Should click on "OK" button in the date dialog', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Performance');

    it('Verifying if "' + columnNamesPerformance + '" are displayed under "' + multiHeadersPerformance + '" multi-header', function() {
      multiHeadersPerformance.forEach(function(multiHeader) {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Performance', multiHeader).then(function(columnNumRange) {
          columnNumRange.forEach(function(colNum) {
            SlickGridFunctions.getColumnNames('Performance').then(function(arr) {
              if (columnNamesPerformance.indexOf(arr[colNum]) === -1) {
                expect(false).customError(columnNamesPerformance + ' are not displayed under the "' + multiHeadersPerformance + '" multi-header');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        });
      });
    });

    it('Verifying if date hyperlink is set to 10/30/2017 - 10/31/2017 in "Performance" report', function() {
      PA3MainPage.getDateHyperLink('Performance').getText().then(function(text) {
        PA3MainPage.getDateHyperLink().getText().then(function(value) {
          if (value !== '10/30/2017 - 10/31/2017') {
            expect(false).customError('Date hyperlink in "Performance" report did not set to "10/30/2017 - 10/31/2017"; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 775161', function() {
    var rows = ['Market Capitalization', '# of Securities', 'Dividend Yield', 'Price/Earnings'];

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Characteristics', true, 'isSelected');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Characteristics');

    it('Verifying if "Characteristics" report is displayed with " ' + rows + '" rows', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Characteristics', '', '').then(function(rowsArr) {
        rowsArr.forEach(function(rowName) {
          if (rows.indexOf(rowName) === -1) {
            expect(false).customError(rowName + ' column is not expected to display in the "Characteristics" report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if date hyperlink is set to  (2 weekdays ago) - (1 weekday ago) from current date', function() {
      // Calculating india time
      var time = Utilities.getCurrentTimeOfGivenOffset('+5.5');
      if (time < '12:00') {
        PA3MainPage.getDateHyperLink('Characteristics').getText().then(function(text) {
          var temp = text.split(' - ');
          if (temp[0] !== temp[1]) {
            expect(false).customError('Test case ran at ' + time + ' and date hyper link did not displayed with same start and end date');
            CommonFunctions.takeScreenShot();
          }
        });
      } else {
        PA3MainPage.getDateHyperLink('Characteristics').getText().then(function(text) {
          var temp = text.split(' - ');
          Utilities.getPreviousOrAfterDateFromADate(-2, undefined, 'MMDDYYYY', '/').then(function(twoDaysAgo) {
            Utilities.getPreviousOrAfterDateFromADate(-1, undefined, 'MMDDYYYY', '/').then(function(oneDayAgo) {
              if ((temp[0].trim()) !== twoDaysAgo || temp[1] !== oneDayAgo) {
                expect(false).customError('Report is not displayed with (2 weekdays ago) - (one week day ago) date, Expected: ' +
                  twoDaysAgo + ' - ' + oneDayAgo + ' Found:' + temp[0].trim() + ' - ' + temp[1]);
                CommonFunctions.takeScreenShot();
              }
            });
          });

        });
      }
    });
  });

  describe('Test Step ID: 775162', function() {

    var columns = ['Port. Weight', 'Bench. Weight', 'Difference'];

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Weights', true, 'isSelected');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should Click on Dates Hyperlink from "Weights" report', function() {
      PA3MainPage.getDateHyperLink('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Daily" from "Report Frequency:" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Daily', 'Report Frequency:');
    });

    it('Verifying if  "Report Frequency:" drop down is set to "Daily"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Report Frequency:').getSelectedText().then(function(text) {
        if (text !== 'Daily') {
          expect(false).customError('"Report Frequency:" drop down did not set to "Daily", Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in the date drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Price to Earnings" column added in the reports', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(allColumnName) {
        columns.forEach(function(columnName) {
          if (allColumnName.indexOf(columnName) < 0) {
            expect(false).customError('"' + columnName + '" column is not present in the "Weights" report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if date hyperlink is set to  (2 weekdays ago) - (1 weekday ago) from current date', function() {
      // Calculating india time
      var time = Utilities.getCurrentTimeOfGivenOffset('+5.5');
      if (time < '12:00') {
        PA3MainPage.getDateHyperLink('Weights').getText().then(function(text) {
          var temp = text.split(' - ');
          if (temp[0] !== temp[1]) {
            expect(false).customError('Test case ran at ' + time + ' and date hyper link did not displayed with same start and end date');
            CommonFunctions.takeScreenShot();
          }
        });
      } else {
        PA3MainPage.getDateHyperLink('Weights').getText().then(function(text) {
          var temp = text.split(' - ');
          Utilities.getPreviousOrAfterDateFromADate(-2, undefined, 'MMDDYYYY', '/').then(function(twoDaysAgo) {
            Utilities.getPreviousOrAfterDateFromADate(-1, undefined, 'MMDDYYYY', '/').then(function(oneDayAgo) {
              if ((temp[0].trim()) !== twoDaysAgo || temp[1] !== oneDayAgo) {
                expect(false).customError('Report is not displayed with (2 weekdays ago) - (one week day ago) date, Expected: ' +
                  twoDaysAgo + ' - ' + oneDayAgo + ' Found:' + temp[0].trim() + ' - ' + temp[1]);
                CommonFunctions.takeScreenShot();
              }
            });
          });

        });
      }
    });

  });

});
